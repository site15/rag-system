// messageController.ts - Main controller for handling chat message requests
// Implements retry logic, provider failover, and comprehensive error handling

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// Core services and managers
import { DialogManager } from '../dialogManager';
import { DialogSummary } from '../dialogSummary';
import { EmbeddingsFactory } from '../embeddingsFactory';
import { LLMChunkProcessor } from '../llmChunkProcessor';
import { LLMFactory } from '../llmFactory';
import { Logger } from '../logger';
import { RAGSearcher } from '../ragSearcher';

// Supporting services
import { DefaultProvidersInitializer } from '../services/defaultProvidersInitializer';
import { FailureTracker } from '../services/failureTracker';
import { LLMQueryLogger } from '../services/llmQueryLogger';
import { PromptLogData } from '../services/promptLogger';
import { Category, QuestionTransformer } from '../services/questionTransformer';
import { RequestManager } from '../services/requestManager';
import { SummarizationService } from '../services/summarizationService';

// Utilities and helpers
import { ConfigManager } from '../config';
import { TextHelpers } from '../textHelpers';
import { DocWithMetadataAndId } from '../types';

// Constants and configuration
import {
  createDocumentInfo,
  createSourceReference,
  DIALOG_CONSTANTS,
  ERROR_MESSAGES,
  HTTP_STATUS_CODES,
  RAG_SEARCH_CONFIG,
  SECURITY_CONSTANTS,
} from '../constants';

// Security configuration
const AUTH_TOKEN =
  ConfigManager.getSecurityConfig().hardCodedToken ||
  SECURITY_CONSTANTS.DEFAULT_AUTH_TOKEN;

// List of allowed IP addresses for security filtering
const ALLOWED_IPS =
  ConfigManager.getSecurityConfig().allowedIps.length > 0
    ? ConfigManager.getSecurityConfig().allowedIps
    : [...SECURITY_CONSTANTS.DEFAULT_ALLOWED_IPS];

// Request interface definition
export interface MessageRequest {
  message: string;
  dialogId?: number;
  goodResponse?: boolean;
  badResponse?: boolean;
  provider?: string;
  model?: string;
  temperature?: number;
  chunkSize?: number;
}

/**
 * Processes a message request with retry logic for provider failures
 * @param request - Fastify request object
 * @param reply - Fastify reply object
 * @param maxRetries - Maximum number of retry attempts
 */
async function processMessageWithRetry(
  request: FastifyRequest<{ Body: MessageRequest }>,
  reply: FastifyReply,
  maxRetries: number = 3,
): Promise<FastifyReply> {
  let currentAttempt = 0;
  let currentProvider = request.body.provider;
  let currentModel = request.body.model;

  // Store original request body for reference
  const originalRequestBody = { ...request.body };

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

  while (currentAttempt < maxRetries) {
    try {
      Logger.logInfo(
        `Processing message attempt ${currentAttempt + 1}/${maxRetries}`,
        {
          provider: currentProvider,
          model: currentModel,
          attempt: currentAttempt + 1,
        },
      );

      // Process the message with current provider configuration
      const result = await processMessage(
        request,
        reply,
        currentProvider,
        currentModel,
      );
      return result;
    } catch (error: any) {
      currentAttempt++;
      Logger.logError(
        `Message processing failed on attempt ${currentAttempt}`,
        {
          error: error.message,
          provider: currentProvider,
          model: currentModel,
          attempt: currentAttempt,
        },
      );

      // If this was the last attempt, return the error
      if (currentAttempt >= maxRetries) {
        Logger.logError('Max retry attempts reached, returning error', {
          maxRetries,
          originalProvider: originalRequestBody.provider,
          originalModel: originalRequestBody.model,
        });
        return reply.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
          error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          details: `Failed after ${maxRetries} attempts`,
          lastError: error.message,
        });
      }

      // If no provider was specified originally, try to get the next active provider
      if (!originalRequestBody.provider) {
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
          request.body = {
            ...originalRequestBody,
            provider: nextProvider.provider,
            model: nextProvider.model,
            temperature: nextProvider.temperature,
            chunkSize:
              nextProvider.chunkSize !== null
                ? nextProvider.chunkSize
                : undefined,
          };

          // Wait a bit before retrying
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * currentAttempt),
          );
          continue;
        } else {
          Logger.logError('No active providers available for retry', {
            currentAttempt,
            maxRetries,
          });
          return reply.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
            error: 'No active providers available',
            details: 'All configured providers are currently unavailable',
          });
        }
      } else {
        // If a specific provider was requested and it failed, don't retry with different providers
        Logger.logError(
          'Specific provider failed, not retrying with different provider',
          {
            provider: originalRequestBody.provider,
            model: originalRequestBody.model,
          },
        );
        return reply.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
          error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          details: `Provider ${originalRequestBody.provider} failed and no fallback available`,
          provider: originalRequestBody.provider,
        });
      }
    }
  }

  // This should never be reached due to the while loop condition
  return reply
    .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    .send({ error: 'Unexpected error in retry logic' });
}

export async function messageController(fastify: FastifyInstance) {
  fastify.post<{ Body: MessageRequest }>(
    '/api/dialog/send-message',
    async (
      request: FastifyRequest<{ Body: MessageRequest }>,
      reply: FastifyReply,
    ) => {
      // Use the retry wrapper for processing
      return await processMessageWithRetry(request, reply, 3);
    },
  );
}

/**
 * Core message processing logic (extracted for retry functionality)
 * Handles the complete RAG pipeline: authentication, validation, embedding, search, LLM processing
 */
async function processMessage(
  request: FastifyRequest<{ Body: MessageRequest }>,
  reply: FastifyReply,
  overrideProvider?: string,
  overrideModel?: string,
): Promise<FastifyReply> {
  const foundLogIds: (number | undefined)[] = [];
  let dialogId: number | undefined;

  let docsWithMeta: DocWithMetadataAndId[] = [];
  try {
    // === SECURITY CHECKS ===
    // Check for authorization token in header
    const authHeader = request.headers.authorization;
    if (
      !authHeader ||
      authHeader !== `${SECURITY_CONSTANTS.AUTH_HEADER_PREFIX}${AUTH_TOKEN}`
    ) {
      return reply
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .send({ error: ERROR_MESSAGES.UNAUTHORIZED });
    }

    // Check if IP address is allowed
    const clientIp = request.ip;
    if (!ALLOWED_IPS.includes(clientIp)) {
      Logger.logInfo('Blocked request from unauthorized IP', {
        clientIp,
        allowedIps: ALLOWED_IPS,
      });
      return reply
        .status(HTTP_STATUS_CODES.FORBIDDEN)
        .send({ error: ERROR_MESSAGES.FORBIDDEN_IP });
    }

    // === REQUEST VALIDATION AND DIALOG MANAGEMENT ===
    const { message, goodResponse, badResponse } = request.body;

    dialogId = request.body.dialogId;

    // Validate request body
    if (!message || typeof message !== 'string') {
      return reply
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .send({ error: ERROR_MESSAGES.INVALID_MESSAGE });
    }

    // Create new dialog if dialogId is not provided
    if (!dialogId || typeof dialogId !== 'number') {
      dialogId = await DialogManager.createDialog(AUTH_TOKEN);
      Logger.logInfo('New dialog created', { dialogId });
    } else {
      // Check if the dialog has reached max consecutive failures
      const consecutiveFailures =
        await FailureTracker.getConsecutiveFailures(dialogId);
      const maxFailures = FailureTracker.getMaxConsecutiveFailures();
      if (consecutiveFailures >= maxFailures - 1) {
        dialogId = await DialogManager.createDialog(AUTH_TOKEN);
        Logger.logInfo('New dialog created', { dialogId });
        // -1 because this will be the next failure
        // This is likely to be the 5th consecutive failure, so we'll create a new dialog
        // and include information about the failed dialog
        const answer = DIALOG_CONSTANTS.MAX_FAILURES_WARNING;
        Logger.logInfo(
          'Dialog reached max failures, new dialog will be created',
          {
            dialogId,
            consecutiveFailures,
            maxFailures,
          },
        );
        return reply.status(HTTP_STATUS_CODES.OK).send({
          success: false,
          dialogId,
          response: answer || 'No response generated',
          consecutiveFailures,
          maxFailures,
        });
      }
    }

    // === CONFIGURATION AND MODEL INITIALIZATION ===
    // Register this request and cancel any existing request for this dialog
    const abortController = RequestManager.registerRequest(dialogId);

    // Check if request was aborted during registration
    if (abortController.signal.aborted) {
      Logger.logInfo('Request was aborted during registration', { dialogId });
      return reply
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .send({ error: 'Request cancelled due to newer request' });
    }

    // Get LLM configuration - use request parameters if provided, otherwise use defaults
    const userOptions = request.body;

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

    const embeddings = EmbeddingsFactory.createEmbeddings(
      appConfig.embeddingsProvider,
      fullConfig.providers.embeddings,
    );

    const llm = LLMFactory.createLLM(
      appConfig.chatProvider,
      fullConfig.providers.chat,
    );

    const history = await DialogManager.getDialogHistory(dialogId);

    Logger.logInfo('Создание эмбеддинга для вопроса', {
      questionLength: message.length,
    });

    Logger.logInfo('Начало обработки чата', { message });

    // Transform the question using the QuestionTransformer to categorize and optimize it
    const categorizedQuestion = await QuestionTransformer.transformQuestion({
      dialogId,
      historyId: undefined,
      question: message,
      llm,
      history,
      provider: appConfig.chatProvider,
    });
    const processedQuestion = categorizedQuestion.transformedQuestion;

    // Prepare prompt log data
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
      userAgent: request.headers['user-agent'] as string,
      clientIp: request.ip,
    };

    Logger.logInfo('Question transformation completed', {
      original: message,
      transformed: processedQuestion,
      category: categorizedQuestion.category,
      sourceFilter: categorizedQuestion.sourceFilter,
    });

    const normalizedQuestionArray = TextHelpers.normalizeTextMy(
      categorizedQuestion.transformedEmbedded,
    ).split(', ');

    promptLogData.contextDocs = [];

    for (let index = 0; index < normalizedQuestionArray.length; index++) {
      const normalizedQuestion = normalizedQuestionArray[index];

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

      // Update prompt log data with context documents
      promptLogData.contextDocs =
        promptLogData.contextDocs.concat(docsWithMeta);
    }

    // Create prompt log file with all context information
    //  PromptLogger.logFullPrompt(promptLogData).catch((logError) => {
    //    Logger.logError("Failed to create prompt log", {
    //      error: (logError as Error).message,
    //      dialogId,
    //    });
    //  });

    Logger.logInfo('[GLOBAL] Отправка запроса к LLM', {
      contextDocsCount: docsWithMeta.length,
      historyLength: history.length,
    });

    // Measure LLM execution time
    const startTime = Date.now();

    const globalResult = await LLMChunkProcessor.askLLMChunked({
      llm,
      dialogId,
      history,
      contextDocs: docsWithMeta,
      question: processedQuestion,
      category: categorizedQuestion.category,
      frendlyFound: false,
      frendlyNotFound: false,
      provider: appConfig.chatProvider,
      chatChunkSize: fullConfig.providers.chat.chunkSize,
      parallelThreads: appConfig.parallelThreads,
      abortController,
      detectedCategory: categorizedQuestion.detectedCategory,
    });

    Logger.logInfo('[GLOBAL] Получен ответ от LLM', {
      answerLength: globalResult.response?.length,
      documentCount: docsWithMeta.length,
      logIds: globalResult.logIds,
    });

    const endTime = Date.now();
    const executionTimeMs = endTime - startTime;
    let answer = globalResult.response;
    let telegramResult:
      | { response: string | null; answerDocumentId?: number }
      | undefined;
    let isGlobalSuccess =
      answer !== null && answer !== undefined && answer.trim() !== '';

    // Prepare document info for logging
    const documentInfo = docsWithMeta
      .map((doc, index) => createDocumentInfo({ doc, index }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    Logger.logInfo('[GLOBAL] Получен ответ от LLM', {
      answerLength: answer?.length,
      documentCount: docsWithMeta.length,
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
        provider: appConfig.chatProvider,
        abortController,
        detectedCategory: categorizedQuestion.detectedCategory,
      });

      answer = noAnswerResponse.foundText;
      foundLogIds.push(noAnswerResponse.logId);
      // Clear sources for "not found" responses
      // docsWithMeta = [];
    }

    // Prepare document info for logging
    const finalDocumentInfo = docsWithMeta
      .map((doc, index) => createDocumentInfo({ doc, index }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    Logger.logInfo('Получен ответ от LLM', {
      answerLength: answer?.length,
      documentCount: docsWithMeta.length,
      ...finalDocumentInfo,
    });

    ///

    Logger.logInfo('Сохранение сообщения', {
      dialogId,
      userId: AUTH_TOKEN,
    });

    // Extract document IDs from the docsWithMeta array
    const selectedDocumentIds = docsWithMeta.map((doc) => doc.id);

    // Determine the answer document ID based on which mode provided the answer
    let answerDocumentId: number | undefined;
    if (globalResult.answerDocumentId) {
      answerDocumentId = globalResult.answerDocumentId;
    } else if (telegramResult && telegramResult.answerDocumentId) {
      answerDocumentId = telegramResult.answerDocumentId;
    }

    // Determine if the response was successful
    let isSuccess = false;
    if (
      isGlobalSuccess ||
      (telegramResult &&
        telegramResult.response !== null &&
        telegramResult.response !== undefined &&
        telegramResult.response.trim() !== '')
    ) {
      isSuccess = true;
    } else {
      // If no answer was found in both modes, check if it's a "not found" response vs no response
      // A "not found" response from frendlyNotFound is considered a response, but not a successful one
      // since no actual information was found in the documents
      isSuccess = false;
    }

    const saveResult = await DialogManager.saveMessage({
      dialogId,
      userId: AUTH_TOKEN,
      question: message,
      answer,
      ignored: false,
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
    const historyId = saveResult.historyId;

    Logger.logInfo('Сохранение сообщения завершено', {
      dialogId,
      historyId,
    });

    LLMQueryLogger.updateQueryReferences(
      [
        ...(globalResult.logIds || []),
        ...categorizedQuestion.logIds,
        ...foundLogIds,
      ],
      dialogId,
      historyId,
    ).catch((err) => Logger.logError(err));

    // Always get failure tracking info for the response (after saveMessage may have updated dialogId)
    const finalConsecutiveFailures =
      await FailureTracker.getConsecutiveFailures(dialogId);
    const finalMaxFailures = FailureTracker.getMaxConsecutiveFailures();

    if (await DialogSummary.shouldSummarize(dialogId)) {
      Logger.logInfo('Диалог требует суммаризации', { dialogId });
      // Run summarization in background to avoid blocking user request
      SummarizationService.queueSummarizationWithoutBlocking({
        historyId,
        dialogId,
        llm,
        provider: appConfig.chatProvider,
      });
    } else {
      Logger.logInfo('Суммаризация не требуется', { dialogId });
    }

    Logger.logInfo('Ответ пользователю сформирован');
    console.log('\n🧠 Ответ:\n', answer);
    console.log('\n📂 Источники:');
    docsWithMeta.forEach((d, i) =>
      console.log(`  ${i + 1}) ${d.source}:${d.fromLine}-${d.toLine}`),
    );

    // Prepare source references for the response
    const sourceReferences = docsWithMeta.map((doc, index) =>
      createSourceReference({
        doc,
        index,
        type: LLMChunkProcessor.getDocTypeBySource(doc.source),
      }),
    );

    // Unregister the completed request
    RequestManager.unregisterRequest(dialogId);

    return reply.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      dialogId,
      response: answer || 'No response generated',
      consecutiveFailures: finalConsecutiveFailures,
      maxFailures: finalMaxFailures,
      sources: sourceReferences,
    });
  } catch (error: any) {
    // Clean up request on error
    if (dialogId) {
      RequestManager.unregisterRequest(dialogId);
    }

    // Check if it's a rate limit error
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
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

      // await reply.status(HTTP_STATUS_CODES.TOO_MANY_REQUESTS).send({
      //   error: "Rate limit exceeded",
      //   model: error.model,
      //   provider: error.provider,
      //   delaySeconds: error.delaySeconds,
      //   limit: error.limit,
      //   used: error.used,
      //   requested: error.requested,
      //   sources: sourceReferences,
      // });
      throw error;
    }

    Logger.logError(
      'Error processing message request',
      {
        error: error.message,
      },
      (error as Error).stack,
    );
    // await reply
    //   .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    //   .send({ error: error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    throw error;
  }
}
