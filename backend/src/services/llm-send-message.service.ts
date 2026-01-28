// messageController.ts - Main controller for handling chat message requests
// Implements retry logic, provider failover, and comprehensive error handling

import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import Mustache from 'mustache';
import {
  BOT_FALLBACK_MESSAGES,
  createDocumentInfo,
  createSourceReference,
  ERROR_MESSAGES,
  RAG_SEARCH_CONFIG,
} from '../llm/constants';
import { DialogManager } from '../llm/dialogManager';
import { DialogSummary } from '../llm/dialogSummary';
import { EmbeddingsFactory } from '../llm/embeddingsFactory';
import { LLMChunkProcessor } from '../llm/llmChunkProcessor';
import { AttemptsCallbacksOptions, LLMFactory } from '../llm/llmFactory';
import { Logger } from '../llm/logger';
import { RAGSearcher } from '../llm/ragSearcher';
import { DefaultProvidersInitializer } from '../llm/services/defaultProvidersInitializer';
import { FailureTracker } from '../llm/services/failureTracker';
import { LLMQueryLogger } from '../llm/services/llmQueryLogger';
import {
  CategorizedQuestion,
  Category,
  QuestionTransformer,
} from '../llm/services/questionTransformer';
import { SummarizationService } from '../llm/services/summarizationService';
import { TextHelpers } from '../llm/textHelpers';
import { DocWithMetadataAndId } from '../llm/types';
import { addPayloadToTrace, Trace } from '../trace/trace.module';

type ProcessMessageResponse = {
  dialogId: string;
  response: string;
  messageId: string;
};

@Injectable()
export class LlmSendMessageService {
  async createMessage({
    message,
    dialogId,
    userId,
    constants,
  }: {
    message: string;
    dialogId?: string;
    userId: string;
    constants: Record<string, string>;
  }) {
    dialogId = await this.prepareDialog({
      dialogId,
      userId,
    });

    const { messages } = await DialogManager.getDialogHistory({
      dialogId,
    });

    if (messages.find((m) => m.isProcessing)) {
      throw new HttpException(
        {
          error: ERROR_MESSAGES.DIALOG_IS_ALREADY_PROCESSING,
          details: 'Dialog is already processing',
        },
        400,
      );
    }

    return await DialogManager.createMessage({
      dialogId,
      userId,
      question: message,
      constants,
    });
  }

  getRandomFallbackMessage() {
    return BOT_FALLBACK_MESSAGES[
      Math.floor(Math.random() * BOT_FALLBACK_MESSAGES.length)
    ];
  }

  @Trace()
  async processMessage({
    dialogId,
    messageId,
    userId,
  }: {
    dialogId: string;
    messageId: string;
    userId: string;
  }): Promise<{
    messageId: string;
    dialogId: string;
    response: string;
    sources: {
      id: string;
      source: string;
      fromLine: number | undefined;
      toLine: number | undefined;
      position: number;
      type: string | undefined;
    }[];
  }> {
    const { history } = await DialogManager.getDialogHistory({
      dialogId,
    });
    const message = (await DialogManager.getMessage(messageId))?.question || '';
    const foundLogIds: (string | undefined)[] = [];

    const attemptsCallbacks = async (options: AttemptsCallbacksOptions) => {
      const maxRetriesGreaterThanCurrentAttempt =
        options.maxRetries !== undefined &&
        options.currentAttempt !== undefined &&
        options.maxRetries >= options.currentAttempt;
      await DialogManager.updateMessage({
        messageId,
        answer:
          options.message ||
          (maxRetriesGreaterThanCurrentAttempt
            ? Mustache.render(
                `🔄 Переключаемся на {{provider}}/{{model}}… ({{attempt}}/{{max}})`,
                {
                  provider: options.provider,
                  model: options.model,
                  attempt: options.currentAttempt,
                  max: options.maxRetries,
                },
              )
            : this.getRandomFallbackMessage()),
        llmModel: options.model,
        llmProvider: options.provider,
        llmTemperature: options.temperature,
        isSuccess: undefined,
        isProcessing: undefined,
      });
    };

    await LLMFactory.ping(attemptsCallbacks);

    let contextDocs: DocWithMetadataAndId[] = [];
    try {
      addPayloadToTrace({ dialogId, userId, history });

      let llmConfig = await DefaultProvidersInitializer.getActiveProvider();

      Logger.logInfo('Создание эмбеддинга для вопроса', {
        messageLength: message.length,
        message,
      });

      await attemptsCallbacks({
        message: '❔Трансформация вопроса...',
        model: llmConfig.model,
        provider: llmConfig.provider,
        temperature: llmConfig.temperature,
      });

      // Transform the question using the QuestionTransformer to categorize and optimize it
      const categorizedQuestion = await QuestionTransformer.transformQuestion({
        dialogId,
        messageId: undefined,
        question: message,
        history,
      });

      if (!categorizedQuestion) {
        const answer = this.getRandomFallbackMessage();

        await DialogManager.updateMessage({
          messageId,
          answer,
          selectedDocumentIds: [],
          isSuccess: undefined,
          isProcessing: undefined,
          llmModel: undefined,
          llmProvider: undefined,
          llmTemperature: undefined,
        });

        return {
          //  success: true,
          dialogId,
          response: answer || 'No response generated',
          sources: [],
          messageId,
        };
      }

      const processedQuestion = categorizedQuestion.transformedQuestion;

      addPayloadToTrace({
        userMessage: message,
        transformedUserMessage: processedQuestion,
        detectedUserMessageCategory: categorizedQuestion.detectedCategory,
        commonUserMessageCategory: categorizedQuestion.category,
      });

      Logger.logInfo('Question transformation completed', {
        original: message,
        transformed: processedQuestion,
        category: categorizedQuestion.category,
        sourceFilter: categorizedQuestion.sourceFilter,
      });

      const normalizedQuestionArray = TextHelpers.normalizeTextMy(
        categorizedQuestion.transformedEmbedded,
      ).split(', ');

      addPayloadToTrace({
        normalizedUserMessageArray: normalizedQuestionArray,
      });

      const getDialogFoundDocuments =
        await DialogManager.getDialogFoundDocuments(dialogId);

      contextDocs =
        (await RAGSearcher.getDocsByIds({
          ids:
            getDialogFoundDocuments
              .map((doc) => doc?.id)
              .filter((id) => id !== null && id !== undefined) || [],
        })) || [];

      for (let index = 0; index < normalizedQuestionArray.length; index++) {
        let docsWithMeta = await this.searchContextDocs({
          normalizedQuestion: normalizedQuestionArray[index],
          categorizedQuestion,
        });

        // Update prompt log data with context documents
        contextDocs = contextDocs.concat(docsWithMeta);
      }

      Logger.logInfo('[GLOBAL] Отправка запроса к LLM', {
        contextDocsCount: contextDocs.length,
        historyLength: history.length,
      });

      await attemptsCallbacks({
        message: '❗️Поиска ответа...',
        model: llmConfig.model,
        provider: llmConfig.provider,
        temperature: llmConfig.temperature,
      });

      const llmResult = await LLMChunkProcessor.askLLMChunked({
        dialogId,
        history,
        contextDocs,
        question: processedQuestion,
        category: categorizedQuestion.category,
        detectedCategory: categorizedQuestion.detectedCategory,
        attemptsCallbacks,
      });

      let answer = llmResult.response;
      let isSuccess =
        answer !== null && answer !== undefined && answer?.trim() !== '';

      addPayloadToTrace({
        isSuccess,
      });

      // Prepare document info for logging
      const documentInfo = contextDocs
        .map((doc, index) => createDocumentInfo({ doc, index }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});

      await attemptsCallbacks({
        message: '🌟 Ответ получен...',
        model: llmConfig.model,
        provider: llmConfig.provider,
        temperature: llmConfig.temperature,
      });

      Logger.logInfo('[GLOBAL] Получен ответ от LLM', {
        documentCount: contextDocs.length,
        ...documentInfo,
      });
      /**
       * NOT FOUND
       */
      if (
        !answer ||
        answer.trim() === 'undefined' ||
        answer.trim() === 'null'
      ) {
        // No answer found in both global and telegram modes

        const noAnswerResponse = await LLMChunkProcessor.frendlyNotFound({
          category: Category.none,
          chunk: TextHelpers.concat(history), // Use dialog summary as chunk, or empty if none
          question: message,
        });

        answer = noAnswerResponse.foundText;
        foundLogIds.push(noAnswerResponse.logId);
      }

      ///
      // Extract document IDs from the contextDocs array
      const selectedDocumentIds = contextDocs.map((doc) => doc.id);

      llmConfig = await DefaultProvidersInitializer.getActiveProvider();

      await DialogManager.updateMessage({
        messageId,
        answer,
        selectedDocumentIds,
        answerDocumentId: llmResult.answerDocumentId,
        isSuccess,
        detectedCategory: categorizedQuestion.detectedCategory,
        transformedQuestion: categorizedQuestion.transformedQuestion,
        transformedEmbeddingQuery: categorizedQuestion.transformedEmbedded,
        isProcessing: false,
        llmModel: undefined,
        llmProvider: undefined,
        llmTemperature: undefined,
      });

      LLMQueryLogger.updateQueryReferences(
        [
          ...(llmResult.logIds || []),
          ...categorizedQuestion.logIds,
          ...foundLogIds,
        ],
        dialogId,
        messageId,
      ).catch((err) => Logger.logError(err));

      await this.summarizeIfNeeded(dialogId, messageId);

      Logger.logInfo('Ответ пользователю сформирован');
      console.log('\n🧠 Ответ:\n', answer);
      console.log('\n📂 Источники:');
      contextDocs.forEach((d, i) =>
        console.log(`  ${i + 1}) ${d.source}:${d.fromLine}-${d.toLine}`),
      );

      // Prepare source references for the response
      const sourceReferences = contextDocs.map((doc, index) =>
        createSourceReference({
          doc,
          index,
          type: LLMChunkProcessor.getDocTypeBySource(doc.source),
        }),
      );

      return {
        //  success: true,
        dialogId,
        response: answer || 'No response generated',
        sources: sourceReferences,
        messageId,
      };
    } catch (error: any) {
      // Check if it's a rate limit error
      this.handleAfterProcessMessageError(error, contextDocs);
      throw error;
    }
  }

  private handleAfterProcessMessageError(
    error: any,
    contextDocs: DocWithMetadataAndId[],
  ) {
    if (
      error.code === 'RATE_LIMIT_EXCEEDED' ||
      error.message?.includes('429')
    ) {
      // Prepare source references for the response
      const sourceReferences = contextDocs.map((doc, index) => ({
        id: doc.id,
        source: doc.source,
        fromLine: doc.fromLine,
        toLine: doc.toLine,
        position: index + 1,
        type: LLMChunkProcessor.getDocTypeBySource(doc.source),
      }));

      Logger.logError(
        'Rate limit exceeded',
        {
          model: error.model,
          provider: error.provider,
          delaySeconds: error.delaySeconds,
          limit: error.limit,
          used: error.used,
          requested: error.requested,
          error: error.message,
        },
        (error as Error).stack,
      );

      throw error;
    } else {
      Logger.logError(
        'Error processing message request',
        {
          error: error.message,
        },
        (error as Error).stack,
      );
    }
  }

  private async summarizeIfNeeded(dialogId: string, messageId: string) {
    if (await DialogSummary.shouldSummarize(dialogId)) {
      Logger.logInfo('Диалог требует суммаризации', { dialogId });
      // Run summarization in background to avoid blocking user request
      SummarizationService.queueSummarizationWithoutBlocking({
        messageId,
        dialogId,
      });
    } else {
      Logger.logInfo('Суммаризация не требуется', { dialogId });
    }
  }

  @Trace()
  private async searchContextDocs({
    normalizedQuestion,
    categorizedQuestion,
  }: {
    normalizedQuestion: string;
    categorizedQuestion: CategorizedQuestion;
  }) {
    let contextDocs: DocWithMetadataAndId[] = [];
    addPayloadToTrace({ normalizedQuestion });
    const qEmbedding = await EmbeddingsFactory.embedQuery(normalizedQuestion);

    Logger.logInfo('Поиск похожих документов', {
      embeddingLength: qEmbedding.length,
      normalizedQuestion,
    });
    /**
     * GLOBAL MODE
     */
    // Use the transformed question and apply category-based filtering if available
    if (categorizedQuestion.sourceFilter) {
      contextDocs = await RAGSearcher.similaritySearch({
        queryEmbedding: qEmbedding,
        limit: categorizedQuestion.searchLimit,
        filterBySource: categorizedQuestion.sourceFilter.pattern,
        filterBySourceRule: categorizedQuestion.sourceFilter.rule,
        queryEmbeddingText: normalizedQuestion,
      });
    } else {
      contextDocs = await RAGSearcher.similaritySearch({
        queryEmbedding: qEmbedding,
        limit: RAG_SEARCH_CONFIG.TELEGRAM_SEARCH_LIMIT,
        filterBySource: RAG_SEARCH_CONFIG.GLOBAL_TELEGRAM_EXCLUDE_PATTERN,
        filterBySourceRule: RAG_SEARCH_CONFIG.GLOBAL_TELEGRAM_EXCLUDE_RULE,
        queryEmbeddingText: normalizedQuestion,
      });
    }
    return contextDocs;
  }

  private async prepareDialog({
    dialogId,
    userId,
  }: {
    dialogId: string | undefined;
    userId: string;
  }) {
    if (!dialogId || !isUUID(dialogId)) {
      dialogId = await DialogManager.createDialog(userId);
      Logger.logInfo('New dialog created', { dialogId });
    } else {
      // Check if the dialog has reached max consecutive failures
      const consecutiveFailures =
        await FailureTracker.getConsecutiveFailures(dialogId);
      const maxFailures = FailureTracker.getMaxConsecutiveFailures();
      if (consecutiveFailures >= maxFailures - 1) {
        dialogId = await DialogManager.createDialog(userId);
        Logger.logInfo('New dialog created', { dialogId });
        // -1 because this will be the next failure
        // This is likely to be the 5th consecutive failure, so we'll create a new dialog
        // and include information about the failed dialog
        const answer =
          'Извините, но по текущему диалогу невозможно получить ответ. Пришлось создать новый диалог, так как старый диалог больше не может быть продолжен из-за неудачных попыток.';
        Logger.logInfo(
          'Dialog reached max failures, new dialog will be created',
          {
            dialogId,
            consecutiveFailures,
            maxFailures,
          },
        );
        throw new BadRequestException({
          //  success: false,
          code: 'DIALOG_REACHED_MAX_FAILURES',
          dialogId,
          response: answer || 'No response generated',
          //    consecutiveFailures,
          //    maxFailures,
        });
      }
    }
    return dialogId;
  }
}
