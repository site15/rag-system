// messageController.ts - Main controller for handling chat message requests
// Implements retry logic, provider failover, and comprehensive error handling

import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { OpenAIEmbeddings } from '@langchain/openai';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ConfigManager } from '../llm/config';
import {
  ERROR_MESSAGES,
  RAG_SEARCH_CONFIG,
  createDocumentInfo,
  createSourceReference,
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
import { PromptLogData } from '../llm/services/promptLogger';
import {
  CategorizedQuestion,
  Category,
  QuestionTransformer,
} from '../llm/services/questionTransformer';
import { SummarizationService } from '../llm/services/summarizationService';
import { TextHelpers } from '../llm/textHelpers';
import { DocWithMetadataAndId } from '../llm/types';
import { isUUID } from 'class-validator';
import { addPayloadToTrace, Trace } from '../trace/trace.module';

// Request interface definition
export interface MessageRequest {
  message: string;
  dialogId?: string;
  goodResponse?: boolean;
  badResponse?: boolean;
  provider?: string;
  model?: string;
  temperature?: number;
  chunkSize?: number;
}

type ProcessMessageArgs = {
  messageRequest: MessageRequest;
  userId: string;
  overrideProvider?: string;
  overrideModel?: string;
};

type ProcessMessageResponse = {
  dialogId: string;
  response: string;
};

@Injectable()
export class LlmSendMessageService {
  @Trace()
  async processMessageWithRetry({
    messageRequest,
    userId,
    maxRetries,
  }: {
    messageRequest: MessageRequest;
    userId: string;
    maxRetries: number;
  }): Promise<ProcessMessageResponse> {
    let currentAttempt = 0;

    let { currentProvider, currentModel } =
      await this.prepareProcessMessageWithRetry(messageRequest);

    while (currentAttempt < maxRetries) {
      try {
        this.logBeforeProcessMessage(
          currentAttempt,
          maxRetries,
          currentProvider,
          currentModel,
        );

        addPayloadToTrace({
          currentAttempt,
          maxRetries,
          currentProvider,
          currentModel,
        });
        return await this.processMessage({
          messageRequest,
          userId,
        });
      } catch (error: any) {
        currentAttempt++;

        if (error.message.includes('403')) {
          throw error;
        }

        this.logAfterProcessMessage(
          currentAttempt,
          error,
          currentProvider,
          currentModel,
        );

        this.throwErrorIfCurrentAttemptGreatOrEqualsThanMaxRetries({
          currentAttempt,
          maxRetries,
          messageRequest,
          error,
        });

        const nextProvider = await this.swithToNextProvider(
          messageRequest,
          currentProvider,
          currentModel,
        );

        if (nextProvider) {
          currentProvider = nextProvider.currentProvider;
          currentModel = nextProvider.currentModel;

          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * currentAttempt),
          );

          continue;
        } else {
          this.throwErrorIfNoActiveProvidersAvailableForRetry(
            currentAttempt,
            maxRetries,
          );
        }
      }
    }

    throw new HttpException({ error: 'Unexpected error in retry logic' }, 500);
  }

  private throwErrorIfNoActiveProvidersAvailableForRetry(
    currentAttempt: number,
    maxRetries: number,
  ) {
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

  private throwErrorIfCurrentAttemptGreatOrEqualsThanMaxRetries({
    currentAttempt,
    maxRetries,
    messageRequest,
    error,
  }: {
    currentAttempt: number;
    maxRetries: number;
    messageRequest: MessageRequest;
    error: any;
  }) {
    if (currentAttempt >= maxRetries) {
      Logger.logError('Max retry attempts reached, returning error', {
        maxRetries: maxRetries,
        originalProvider: messageRequest.provider,
        originalModel: messageRequest.model,
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
  }

  async swithToNextProvider(
    messageRequest: MessageRequest,
    currentProvider: string | undefined,
    currentModel: string | undefined,
  ) {
    const originalMessageRequest = messageRequest;

    // If no provider was specified originally, try to get the next active provider
    if (!originalMessageRequest.provider) {
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
        messageRequest = {
          ...originalMessageRequest,
          provider: nextProvider.provider,
          model: nextProvider.model,
          temperature: nextProvider.temperature,
          chunkSize:
            nextProvider.chunkSize !== null
              ? nextProvider.chunkSize
              : undefined,
        };

        return {
          currentProvider,
          currentModel,
        };
      }
    } else {
      // If a specific provider was requested and it failed, don't retry with different providers
      Logger.logError(
        'Specific provider failed, not retrying with different provider',
        {
          provider: originalMessageRequest.provider,
          model: originalMessageRequest.model,
        },
      );
      throw new HttpException(
        {
          error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          details: `Provider ${originalMessageRequest.provider} failed and no fallback available`,
          provider: originalMessageRequest.provider,
        },
        500,
      );
    }
    return null;
  }

  private logAfterProcessMessage(
    currentAttempt: number,
    error: any,
    currentProvider: string | undefined,
    currentModel: string | undefined,
  ) {
    Logger.logError(`Message processing failed on attempt ${currentAttempt}`, {
      error: error.message,
      provider: currentProvider,
      model: currentModel,
      attempt: currentAttempt,
    });
  }

  private logBeforeProcessMessage(
    currentAttempt: number,
    maxRetries: number,
    currentProvider: string | undefined,
    currentModel: string | undefined,
  ) {
    Logger.logInfo(
      `Processing message attempt ${currentAttempt + 1}/${maxRetries}`,
      {
        provider: currentProvider,
        model: currentModel,
        attempt: currentAttempt + 1,
      },
    );
  }

  private async prepareProcessMessageWithRetry(messageRequest: MessageRequest) {
    let currentProvider = messageRequest.provider;
    let currentModel = messageRequest.model;

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
    messageRequest,
    userId,
    overrideProvider,
    overrideModel,
  }: ProcessMessageArgs): Promise<{
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
    const foundLogIds: (string | undefined)[] = [];

    let docsWithMeta: DocWithMetadataAndId[] = [];
    try {
      // === REQUEST VALIDATION AND DIALOG MANAGEMENT ===
      const { message, goodResponse, badResponse } = messageRequest;

      // Create new dialog if dialogId is not provided
      let dialogId = await this.prepareDialog({
        dialogId: messageRequest.dialogId,
        userId,
      });

      addPayloadToTrace({ dialogId, userId });

      // Get LLM configuration - use request parameters if provided, otherwise use defaults
      const { appConfig, fullConfig } = this.prepareConfigs({
        messageRequest,
        overrideProvider,
        overrideModel,
      });

      const embeddings = EmbeddingsFactory.createEmbeddings(
        appConfig.embeddingsProvider,
        fullConfig.providers.embeddings,
      );

      const llm = LLMFactory.createLLM(
        appConfig.chatProvider,
        fullConfig.providers.chat,
      );

      const history = await DialogManager.getDialogHistory(dialogId);

      addPayloadToTrace({ history });

      this.logBeforeTransformQuestion(message);

      // Transform the question using the QuestionTransformer to categorize and optimize it
      const categorizedQuestion = await QuestionTransformer.transformQuestion({
        dialogId,
        messageId: undefined,
        question: message,
        llm,
        history,
        provider: appConfig.chatProvider,
      });
      const processedQuestion = categorizedQuestion.transformedQuestion;

      addPayloadToTrace({
        userMessage: message,
        transformedUserMessage: processedQuestion,
        detectedUserMessageCategory: categorizedQuestion.detectedCategory,
        commonUserMessageCategory: categorizedQuestion.category,
      });
      this.logAfterTransformQuestion(
        dialogId,
        message,
        processedQuestion,
        categorizedQuestion,
        history,
        llm,
        appConfig,
      );

      const normalizedQuestionArray = TextHelpers.normalizeTextMy(
        categorizedQuestion.transformedEmbedded,
      ).split(', ');

      addPayloadToTrace({
        normalizedUserMessageArray: normalizedQuestionArray,
      });

      let contextDocs: DocWithMetadataAndId[] = [];

      for (let index = 0; index < normalizedQuestionArray.length; index++) {
        docsWithMeta = await this.searchContextDocs({
          embeddings,
          normalizedQuestion: normalizedQuestionArray[index],
          categorizedQuestion,
          docsWithMeta,
        });

        // Update prompt log data with context documents
        contextDocs = contextDocs.concat(docsWithMeta);
      }

      // Create prompt log file with all context information
      //  PromptLogger.logFullPrompt(promptLogData).catch((logError) => {
      //    Logger.logError("Failed to create prompt log", {
      //      error: (logError as Error).message,
      //      dialogId,
      //    });
      //  });

      this.logBeforeAskLLMChunked(docsWithMeta, history);

      const llmResult = await LLMChunkProcessor.askLLMChunked({
        llm,
        dialogId,
        history,
        contextDocs: docsWithMeta,
        question: processedQuestion,
        category: categorizedQuestion.category,
        provider: appConfig.chatProvider,
        chatChunkSize: fullConfig.providers.chat.chunkSize,
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
      const documentInfo = docsWithMeta
        .map((doc, index) => createDocumentInfo({ doc, index }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});

      this.logAfterAskLLMChunked(llmResult, docsWithMeta, documentInfo);

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
          provider: appConfig.chatProvider,
          detectedCategory: categorizedQuestion.detectedCategory,
        });

        answer = noAnswerResponse.foundText;
        foundLogIds.push(noAnswerResponse.logId);
        // Clear sources for "not found" responses
        // docsWithMeta = [];
      }

      ///

      const { messageId, ...saveDialogMessageResult } =
        await this.saveDialogMessage(
          dialogId,
          userId,
          isSuccess,
          docsWithMeta,
          llmResult.answerDocumentId,
          message,
          answer,
          categorizedQuestion,
          appConfig,
          fullConfig,
          goodResponse,
          badResponse,
        );
      dialogId = saveDialogMessageResult.dialogId;

      LLMQueryLogger.updateQueryReferences(
        [
          ...(llmResult.logIds || []),
          ...categorizedQuestion.logIds,
          ...foundLogIds,
        ],
        dialogId,
        messageId,
      ).catch((err) => Logger.logError(err));

      await this.summarizeIfNeeded(dialogId, messageId, llm, appConfig);

      this.logSuccessResult(answer, docsWithMeta);

      // Prepare source references for the response
      const sourceReferences = docsWithMeta.map((doc, index) =>
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
      };
    } catch (error: any) {
      // Check if it's a rate limit error
      this.handleAfterProcessMessageError(error, docsWithMeta);
      throw error;
    }
  }

  private handleAfterProcessMessageError(
    error: any,
    docsWithMeta: DocWithMetadataAndId[],
  ) {
    if (
      error.code === 'RATE_LIMIT_EXCEEDED' ||
      error.message?.includes('403')
    ) {
      // Prepare source references for the response
      const sourceReferences = docsWithMeta.map((doc, index) => ({
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

  private logSuccessResult(
    answer: string,
    docsWithMeta: DocWithMetadataAndId[],
  ) {
    Logger.logInfo('Ответ пользователю сформирован');
    console.log('\n🧠 Ответ:\n', answer);
    console.log('\n📂 Источники:');
    docsWithMeta.forEach((d, i) =>
      console.log(`  ${i + 1}) ${d.source}:${d.fromLine}-${d.toLine}`),
    );
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

  private async saveDialogMessage(
    dialogId: string,
    userId: string,
    isSuccess: boolean,
    docsWithMeta: DocWithMetadataAndId[],
    answerDocumentId: string | undefined,
    message: string,
    answer: string,
    categorizedQuestion: CategorizedQuestion,
    appConfig: { chatProvider: string; embeddingsProvider: string },
    fullConfig: {
      providers: {
        chat: {
          provider: string;
          model: string;
          temperature: number;
          baseUrl: string;
          apiKey: string | undefined;
          chunkSize: number;
        };
        embeddings: {
          provider: string;
          model: string;
          baseUrl: string;
          apiKey: string | undefined;
        };
      };
    },
    goodResponse: boolean | undefined,
    badResponse: boolean | undefined,
  ) {
    Logger.logInfo('Сохранение сообщения', {
      dialogId,
      userId: userId,
    });

    // Extract document IDs from the docsWithMeta array
    const selectedDocumentIds = docsWithMeta.map((doc) => doc.id);

    const saveResult = await DialogManager.saveMessage({
      dialogId,
      userId: userId,
      question: message,
      answer,
      selectedDocumentIds,
      answerDocumentId,
      isSuccess,
      detectedCategory: categorizedQuestion.detectedCategory,
      transformedQuestion: categorizedQuestion.transformedQuestion,
      transformedEmbeddingQuery: categorizedQuestion.transformedEmbedded,
      llmProvider: appConfig.chatProvider,
      llmModel: fullConfig.providers.chat.model,
      llmTemperature: fullConfig.providers.chat.temperature,
      goodResponse,
      badResponse,
    });

    dialogId = saveResult.dialogId;
    const messageId = saveResult.messageId;

    Logger.logInfo('Сохранение сообщения завершено', {
      dialogId,
      messageId,
    });

    return { messageId, dialogId };
  }

  private logAfterAskLLMChunked(
    globalResult:
      | {
          response: string;
          answerDocumentId: string | undefined;
          logIds: (string | undefined)[];
        }
      | {
          response: null;
          answerDocumentId: undefined;
          logIds: (string | undefined)[];
        },
    docsWithMeta: DocWithMetadataAndId[],
    documentInfo: { [x: string]: string },
  ) {
    Logger.logInfo('[GLOBAL] Получен ответ от LLM', {
      answerLength: globalResult.response?.length,
      documentCount: docsWithMeta.length,
      logIds: globalResult.logIds,
      ...documentInfo,
    });
  }

  private logBeforeAskLLMChunked(
    docsWithMeta: DocWithMetadataAndId[],
    history: string[],
  ) {
    Logger.logInfo('[GLOBAL] Отправка запроса к LLM', {
      contextDocsCount: docsWithMeta.length,
      historyLength: history.length,
    });
  }

  @Trace()
  private async searchContextDocs({
    embeddings,
    normalizedQuestion,
    categorizedQuestion,
    docsWithMeta,
  }: {
    embeddings: OpenAIEmbeddings | OllamaEmbeddings;
    normalizedQuestion: string;
    categorizedQuestion: CategorizedQuestion;
    docsWithMeta: DocWithMetadataAndId[];
  }) {
    const qEmbedding = await embeddings.embedQuery(normalizedQuestion);

    this.logBeforeSimilaritySearch(qEmbedding, normalizedQuestion);

    /**
     * GLOBAL MODE
     */
    // Use the transformed question and apply category-based filtering if available
    if (categorizedQuestion.sourceFilter) {
      docsWithMeta = await RAGSearcher.similaritySearch({
        queryEmbedding: qEmbedding,
        limit: categorizedQuestion.searchLimit,
        filterBySource: categorizedQuestion.sourceFilter.pattern,
        filterBySourceRule: categorizedQuestion.sourceFilter.rule,
      });
    } else {
      docsWithMeta = await RAGSearcher.similaritySearch({
        queryEmbedding: qEmbedding,
        limit: RAG_SEARCH_CONFIG.TELEGRAM_SEARCH_LIMIT,
        filterBySource: RAG_SEARCH_CONFIG.GLOBAL_TELEGRAM_EXCLUDE_PATTERN,
        filterBySourceRule: RAG_SEARCH_CONFIG.GLOBAL_TELEGRAM_EXCLUDE_RULE,
      });
    }
    return docsWithMeta;
  }

  private logBeforeSimilaritySearch(
    qEmbedding: number[],
    normalizedQuestion: string,
  ) {
    Logger.logInfo('Поиск похожих документов', {
      embeddingLength: qEmbedding.length,
      normalizedQuestion,
    });
  }

  private logAfterTransformQuestion(
    dialogId: string,
    message: string,
    processedQuestion: string,
    categorizedQuestion: CategorizedQuestion,
    history: string[],
    llm: any,
    appConfig: { chatProvider: string; embeddingsProvider: string },
  ) {
    const promptLogData: PromptLogData = {
      dialogId,
      question: message,
      transformedQuestion: processedQuestion,
      category: categorizedQuestion.category,
      sourceFilter: categorizedQuestion.sourceFilter?.pattern,
      contextDocs: [], // Will be filled after RAG search
      history,
      llmModel: (llm as any).modelName || (llm as any).model,
      llmProvider: appConfig.chatProvider,
      timestamp: new Date(),
      // todo: move to controller
      // userAgent: request.headers['user-agent'] as string,
      // clientIp: request.ip,
    };

    Logger.logInfo('Question transformation completed', {
      original: message,
      transformed: processedQuestion,
      category: categorizedQuestion.category,
      sourceFilter: categorizedQuestion.sourceFilter,
    });
    return promptLogData;
  }

  private logBeforeTransformQuestion(message: string) {
    Logger.logInfo('Создание эмбеддинга для вопроса', {
      messageLength: message.length,
      message,
    });
  }

  private prepareConfigs({
    messageRequest,
    overrideProvider,
    overrideModel,
  }: {
    messageRequest: MessageRequest;
    overrideProvider: string | undefined;
    overrideModel: string | undefined;
  }) {
    const userOptions = messageRequest;

    // Use override parameters if provided (from retry logic)
    const effectiveProvider = overrideProvider || userOptions.provider;
    const effectiveModel = overrideModel || userOptions.model;

    const appConfig = {
      ...ConfigManager.getAppConfig(),
      chatProvider:
        effectiveProvider || ConfigManager.getAppConfig().chatProvider,
      embeddingsProvider: ConfigManager.getAppConfig().embeddingsProvider,
    };

    const fullConfig = {
      providers: {
        chat: ConfigManager.getChatConfig(appConfig.chatProvider),
        embeddings: ConfigManager.getEmbeddingsConfig(
          appConfig.embeddingsProvider,
        ),
      },
    };

    if (effectiveModel) {
      fullConfig.providers.chat.model = effectiveModel;
    }

    if (userOptions.temperature) {
      fullConfig.providers.chat.temperature = userOptions.temperature;
    }

    if (userOptions.chunkSize) {
      fullConfig.providers.chat.chunkSize = userOptions.chunkSize;
    }

    // Initialize models with configuration
    if (!fullConfig.providers.embeddings || !fullConfig.providers.chat) {
      const errorMsg =
        'Provider configurations are required in messageController';
      Logger.logError(errorMsg);
      throw new Error(errorMsg);
    }
    return { appConfig, fullConfig };
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
