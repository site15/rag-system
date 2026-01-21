// messageController.ts - Main controller for handling chat message requests
// Implements retry logic, provider failover, and comprehensive error handling

import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { OpenAIEmbeddings } from '@langchain/openai';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { ConfigManager } from '../llm/config';
import {
  createDocumentInfo,
  createSourceReference,
  ERROR_MESSAGES,
  RAG_SEARCH_CONFIG,
} from '../llm/constants';
import { DialogManager } from '../llm/dialogManager';
import { DialogSummary } from '../llm/dialogSummary';
import { EmbeddingsFactory } from '../llm/embeddingsFactory';
import { LLMChunkProcessor } from '../llm/llmChunkProcessor';
import { LLMFactory } from '../llm/llmFactory';
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
import {
  ChatConfig,
  DocWithMetadataAndId,
  EmbeddingsConfig,
} from '../llm/types';
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
  }: {
    message: string;
    dialogId?: string;
    userId: string;
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
    });
  }

  @Trace()
  async processMessageWithRetry({
    messageId,
    dialogId,
    userId,
    maxRetries,
    provider,
    model,
    temperature,
    chunkSize,
  }: {
    messageId: string;
    dialogId: string;
    userId: string;
    maxRetries: number;
    provider?: string;
    model?: string;
    temperature?: number;
    chunkSize?: number;
  }): Promise<ProcessMessageResponse> {
    const { history } = await DialogManager.getDialogHistory({
      dialogId,
    });

    let { currentProvider, currentModel } = await this.prepareProviderAndModel({
      provider,
      model,
    });

    let currentAttempt = 0;

    while (currentAttempt < maxRetries) {
      const appConfig = {
        ...ConfigManager.getAppConfig(),
        ...(provider ? { chatProvider: provider } : {}),
      };

      const modelConfig = {
        providers: {
          chat: {
            ...ConfigManager.getChatConfig(appConfig.chatProvider),
            ...(model ? { model } : {}),
            ...(temperature ? { temperature } : {}),
            ...(chunkSize ? { chunkSize } : {}),
          },
          embeddings: ConfigManager.getEmbeddingsConfig(
            appConfig.embeddingsProvider,
          ),
        },
      };

      // Initialize models with configuration
      if (!modelConfig.providers.embeddings || !modelConfig.providers.chat) {
        const errorMsg =
          'Provider configurations are required in messageController';
        Logger.logError(errorMsg);
        throw new Error(errorMsg);
      }

      try {
        Logger.logInfo(
          `Processing message attempt ${currentAttempt + 1}/${maxRetries}`,
          {
            provider: currentProvider,
            model: currentModel,
            attempt: currentAttempt + 1,
          },
        );

        addPayloadToTrace({
          currentAttempt,
          maxRetries,
          currentProvider,
          currentModel,
        });

        return await this.processMessage({
          userId,
          dialogId,
          messageId,
          embeddingsConfig: modelConfig.providers.embeddings,
          llmConfig: modelConfig.providers.chat,
          history,
        });
      } catch (error: any) {
        currentAttempt++;

        if (error.message.includes('403')) {
          throw error;
        }

        Logger.logError(
          `Message processing failed on attempt ${currentAttempt}`,
          {
            error: error.message,
            provider: currentProvider,
            model: currentModel,
            attempt: currentAttempt,
          },
        );

        if (currentAttempt >= maxRetries) {
          Logger.logError('Max retry attempts reached, returning error', {
            maxRetries: maxRetries,
            currentAttempt,
            originalProvider: provider,
            originalModel: model,
          });
          throw new HttpException(
            {
              error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
              details: `Failed after ${maxRetries} attempts`,
              lastError: error.message,
            },
            500,
          );
        }

        const nextProvider = await this.switchToNextProvider(provider, model);

        if (nextProvider) {
          currentProvider = nextProvider.provider;
          currentModel = nextProvider.model;

          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * currentAttempt),
          );

          continue;
        } else {
          Logger.logError('No active providers available for retry', {
            currentAttempt,
            maxRetries: maxRetries,
          });
          throw new HttpException(
            {
              error: 'No active providers available',
              details: 'All configured providers are currently unavailable',
            },
            500,
          );
        }
      }
    }

    throw new HttpException({ error: 'Unexpected error in retry logic' }, 500);
  }

  async switchToNextProvider(
    currentProvider: string | undefined,
    currentModel: string | undefined,
  ) {
    const nextProvider =
      await DefaultProvidersInitializer.getNextActiveProvider(
        currentProvider || '',
        currentModel || '',
      );

    if (nextProvider) {
      Logger.logInfo('Switching to next active provider', {
        fromProvider: currentProvider,
        fromModel: currentModel,
        toProvider: nextProvider.provider,
        toModel: nextProvider.model,
      });

      currentProvider = nextProvider.provider;
      currentModel = nextProvider.model;

      // Update request body for the next attempt
      return {
        provider: nextProvider.provider,
        model: nextProvider.model,
        temperature: nextProvider.temperature,
        chunkSize:
          nextProvider.chunkSize !== null ? nextProvider.chunkSize : undefined,
      };
    }
    return null;
  }

  private async prepareProviderAndModel(options: {
    provider?: string;
    model?: string;
  }) {
    let currentProvider = options.provider;
    let currentModel = options.model;

    const activeProviders =
      await DefaultProvidersInitializer.getSortedActiveProviders();
    if (
      !activeProviders.find(
        (a) => a.provider === currentProvider && a.model === currentModel,
      )
    ) {
      const nextProvider =
        await DefaultProvidersInitializer.getNextActiveProvider(
          currentProvider || '',
          currentModel || '',
        );
      if (nextProvider?.provider && nextProvider?.model) {
        currentProvider = nextProvider?.provider;
        currentModel = nextProvider?.model;
      }
    }
    return {
      currentProvider,
      currentModel,
    };
  }

  @Trace()
  async processMessage({
    dialogId,
    messageId,
    userId,
    embeddingsConfig,
    llmConfig,
    history,
  }: {
    dialogId: string;
    messageId: string;
    userId: string;
    embeddingsConfig: EmbeddingsConfig;
    llmConfig: ChatConfig;
    history: string[];
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
    const message = (await DialogManager.getMessage(messageId))?.question || '';
    const foundLogIds: (string | undefined)[] = [];

    let contextDocs: DocWithMetadataAndId[] = [];
    try {
      addPayloadToTrace({ dialogId, userId });

      const embeddings = EmbeddingsFactory.createEmbeddings(embeddingsConfig);

      const llm = LLMFactory.createLLM(llmConfig);

      addPayloadToTrace({ history });

      Logger.logInfo('Создание эмбеддинга для вопроса', {
        messageLength: message.length,
        message,
      });

      // Transform the question using the QuestionTransformer to categorize and optimize it
      const categorizedQuestion = await QuestionTransformer.transformQuestion({
        dialogId,
        messageId: undefined,
        question: message,
        llm,
        history,
        provider: llmConfig.provider,
      });
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
          embeddings,
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

      const llmResult = await LLMChunkProcessor.askLLMChunked({
        llm,
        dialogId,
        history,
        contextDocs,
        question: processedQuestion,
        category: categorizedQuestion.category,
        provider: llmConfig.provider,
        chatChunkSize: llmConfig.chunkSize,
        detectedCategory: categorizedQuestion.detectedCategory,
      });

      let answer = llmResult.response;
      let isSuccess =
        answer !== null && answer !== undefined && answer.trim() !== '';

      addPayloadToTrace({
        answer,
        isSuccess,
      });

      // Prepare document info for logging
      const documentInfo = contextDocs
        .map((doc, index) => createDocumentInfo({ doc, index }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});

      Logger.logInfo('[GLOBAL] Получен ответ от LLM', {
        documentCount: contextDocs.length,
        ...documentInfo,
      });
      /**
       * NOT FOUND
       */
      if (!answer) {
        // No answer found in both global and telegram modes

        const noAnswerResponse = await LLMChunkProcessor.frendlyNotFound({
          category: Category.none,
          chunk: history.join('\n') || '', // Use dialog summary as chunk, or empty if none
          question: message,
          llm,
          provider: llmConfig.provider,
          detectedCategory: categorizedQuestion.detectedCategory,
        });

        answer = noAnswerResponse.foundText;
        foundLogIds.push(noAnswerResponse.logId);
      }

      ///
      // Extract document IDs from the contextDocs array
      const selectedDocumentIds = contextDocs.map((doc) => doc.id);

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

      await this.summarizeIfNeeded(dialogId, messageId, llm, {
        chatProvider: llmConfig.provider,
        embeddingsProvider: embeddingsConfig.provider,
      });

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
      error.message?.includes('403')
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

  private async summarizeIfNeeded(
    dialogId: string,
    messageId: string,
    llm: any,
    appConfig: { chatProvider: string; embeddingsProvider: string },
  ) {
    if (await DialogSummary.shouldSummarize(dialogId)) {
      Logger.logInfo('Диалог требует суммаризации', { dialogId });
      // Run summarization in background to avoid blocking user request
      SummarizationService.queueSummarizationWithoutBlocking({
        messageId,
        dialogId,
        llm,
        provider: appConfig.chatProvider,
      });
    } else {
      Logger.logInfo('Суммаризация не требуется', { dialogId });
    }
  }

  @Trace()
  private async searchContextDocs({
    embeddings,
    normalizedQuestion,
    categorizedQuestion,
  }: {
    embeddings: OpenAIEmbeddings | OllamaEmbeddings;
    normalizedQuestion: string;
    categorizedQuestion: CategorizedQuestion;
  }) {
    let contextDocs: DocWithMetadataAndId[] = [];
    addPayloadToTrace({ normalizedQuestion });
    const qEmbedding = await embeddings.embedQuery(normalizedQuestion);

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
