// llmChunkProcessor.ts
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { CATEGORY_PROMPTS } from './category-prompts';
import { DialogManager } from './dialogManager';
import { LLMLogger } from './llmLogger';
import { Logger } from './logger';
import {
  createFinalAnswerPrompt,
  createFriendlyFoundPrompt,
  createFriendlyNotFoundPrompt,
} from './prompt';
import { RAGSearcher } from './ragSearcher';
import { FailureTracker } from './services/failureTracker';
import { Category } from './services/questionTransformer';
import { DocWithMetadataAndId } from './types';
import { getCategoryByDetectedCategory } from './getCategoryByDetectedCategory';

// Question types for classification
enum QuestionType {
  FACT = 'FACT',
  INSTRUCTION = 'INSTRUCTION',
  COMPARISON = 'COMPARISON',
  OPINION = 'OPINION',
  OTHER = 'OTHER',
}

export class LLMChunkProcessor {
  private static classifyQuestion(question: string): QuestionType {
    const lowerQuestion = question.toLowerCase().trim();

    // Opinion keywords
    const opinionKeywords = [
      'как ты относишься',
      'что думаешь',
      'твое мнение',
      'как оцениваешь',
      'как тебе',
      'нравится ли',
      'поддерживаешь ли',
    ];

    // Instruction keywords
    const instructionKeywords = [
      'с чего начать',
      'как начать',
      'как действовать',
      'что делать',
      'как',
      'каким образом',
      'как правильно',
      'что нужно',
      'порядок',
      'алгоритм',
      'инструкция',
      'руководство',
    ];

    // Comparison keywords
    const comparisonKeywords = [
      'чем отличается',
      'что лучше',
      'что выбрать',
      'сравнить',
      'сравнение',
      'разница',
      'какой',
      'какая',
      'какое',
      'vs',
      'или',
      'против',
      'вместо',
      'между',
      'по сравнению с',
      'какой лучше',
      'что использовать',
      'что предпочтительнее',
      'какой выбрать',
    ];

    // Fact keywords
    const factKeywords = [
      'кто',
      'что',
      'где',
      'когда',
      'какой',
      'какая',
      'какое',
      'какого',
      'какие',
      'каких',
      'какую',
      'какую информацию',
      'какой',
      'как',
      'каким',
      'какая',
      'какое',
      'какие',
    ];

    // Check for opinion first
    if (opinionKeywords.some((keyword) => lowerQuestion.includes(keyword))) {
      return QuestionType.OPINION;
    }

    // Check for comparison
    if (comparisonKeywords.some((keyword) => lowerQuestion.includes(keyword))) {
      return QuestionType.COMPARISON;
    }

    // Check for instruction
    if (
      instructionKeywords.some((keyword) => lowerQuestion.includes(keyword))
    ) {
      return QuestionType.INSTRUCTION;
    }

    // Check for fact
    if (factKeywords.some((keyword) => lowerQuestion.startsWith(keyword))) {
      return QuestionType.FACT;
    }

    return QuestionType.OTHER;
  }

  private static preFilterChunk(
    chunk: string,
    question: string,
    questionType: QuestionType,
  ): boolean {
    // Extract keywords from question for matching
    const questionWords = question
      .toLowerCase()
      .replace(/[.,!?;:()\[\]{}]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 2); // Only consider words longer than 2 characters

    const chunkLower = chunk.toLowerCase();

    // Check if any significant question keywords exist in the chunk
    const hasKeywords = questionWords.some(
      (word) =>
        chunkLower.includes(word) &&
        ![
          'как',
          'что',
          'где',
          'когда',
          'кто',
          'почему',
          'зачем',
          'какой',
        ].includes(word), // Exclude common question words
    );

    // For opinion questions, only pass chunk if the entity from question exists in the chunk
    if (questionType === QuestionType.OPINION) {
      // Extract entity from question (the main topic being asked about)
      // For questions like "как ты относишься к DDD?" we need to find the entity after "к"
      const entityMatch = question.match(/к\s+(\w+)/i);
      const entity = entityMatch ? entityMatch[1].toLowerCase() : null;

      if (entity) {
        // For opinion questions, the entity must be present in the chunk
        return chunkLower.includes(entity.toLowerCase());
      } else {
        // If no clear entity found, fall back to keyword matching
        return hasKeywords;
      }
    }

    // For instruction questions, check for instruction-related content
    if (questionType === QuestionType.INSTRUCTION) {
      const instructionTriggers = [
        'начать',
        'первый шаг',
        'рекомендуется',
        'следует',
        'нужно',
        'алгоритм',
        'инструкция',
        'порядок',
        'руководство',
        'способ',
        'метод',
        'подход',
        'как действовать',
        'что делать',
      ];
      const hasInstructionContent = instructionTriggers.some((trigger) =>
        chunkLower.includes(trigger),
      );
      return hasKeywords || hasInstructionContent;
    }

    // For comparison questions, check for comparison-related content
    if (questionType === QuestionType.COMPARISON) {
      const comparisonTriggers = [
        'сравнение',
        'чем отличается',
        'в отличие от',
        'в то время как',
        'лучше чем',
        'хуже чем',
        'преимущества',
        'недостатки',
        'плюсы и минусы',
        'разница между',
        'против',
        'vs',
        'какой выбрать',
        'что выбрать',
        'рекомендация',
        'совет',
      ];
      const hasComparisonContent = comparisonTriggers.some((trigger) =>
        chunkLower.includes(trigger),
      );
      return hasKeywords || hasComparisonContent;
    }

    return hasKeywords;
  }

  private static validateFoundResult(
    foundText: string,
    chunk: string,
    question: string,
    questionType: QuestionType,
  ): boolean {
    if (!foundText.startsWith('[FOUND]')) {
      return false;
    }

    const actualText = foundText.replace(/^\[FOUND]\s*/, '');

    // Hard filter: reject any meta-answers that describe absence of information
    const metaAnswerTriggers = [
      'не упоминается',
      'нет информации',
      'в контексте нет',
      'отсутствует',
      'не найдено',
      'нет упоминания',
      'не говорится',
      'не сказано',
      'ничего не говорится',
      'ничего не сказано',
      'нет ничего',
      'ничего нет',
    ];

    const actualTextLower = actualText.toLowerCase();
    if (
      metaAnswerTriggers.some((trigger) => actualTextLower.includes(trigger))
    ) {
      Logger.logInfo(
        'Отброшен ложный [FOUND] - мета-ответ описывает отсутствие информации',
        {
          question,
          foundText: actualText,
        },
      );
      return false;
    }

    // For opinion questions, check if the chunk contains explicit author position markers
    if (questionType === QuestionType.OPINION) {
      const opinionTriggers = [
        'я считаю',
        'я придерживаюсь',
        'я использую',
        'я не использую',
        'мне нравится',
        'мне не нравится',
        'я сторонник',
        'я против',
        'на моей практике',
        'по моему опыту',
        'мое мнение',
        'мое отношение',
        'я думаю',
        'я полагаю',
        'я верю',
        'я предпочитаю',
        'мой выбор',
        'моя позиция',
        'мой взгляд',
        'мое убеждение',
      ];

      const chunkLower = chunk.toLowerCase();
      const hasOpinionContent = opinionTriggers.some((trigger) =>
        chunkLower.includes(trigger),
      );

      if (!hasOpinionContent) {
        Logger.logInfo(
          'Отброшен ложный [FOUND] для опроса мнения - нет явной авторской позиции',
          {
            question,
            chunk: chunk.substring(0, 200),
            foundText: actualText,
          },
        );
        return false;
      }
    }

    // For instruction questions, check if the chunk contains actual instruction content
    if (questionType === QuestionType.INSTRUCTION) {
      const instructionTriggers = [
        'начать стоит',
        'первым шагом',
        'рекомендуется',
        'следует',
        'нужно',
        'алгоритм',
        'инструкция',
        'порядок',
        'руководство',
        'способ',
        'метод',
        'подход',
        'как действовать',
        'что делать',
      ];

      const chunkLower = chunk.toLowerCase();
      const hasInstructionTrigger = instructionTriggers.some((trigger) =>
        chunkLower.includes(trigger),
      );

      if (!hasInstructionTrigger) {
        Logger.logInfo('Отброшен ложный [FOUND] для инструктивного вопроса', {
          question,
          chunk: chunk.substring(0, 200),
          foundText: actualText,
        });
        return false;
      }
    }

    // Check if the found text is not just a question or example
    if (
      actualText.trim().endsWith('?') ||
      actualText.trim().startsWith('например')
    ) {
      Logger.logInfo(
        'Отброшен ложный [FOUND] - текст является вопросом или примером',
        {
          question,
          foundText: actualText,
        },
      );
      return false;
    }

    // For comparison questions, check if the chunk contains explicit comparison content
    if (questionType === QuestionType.COMPARISON) {
      const comparisonTriggers = [
        'сравнение',
        'чем отличается',
        'в отличие от',
        'в то время как',
        'лучше чем',
        'хуже чем',
        'преимущества',
        'недостатки',
        'плюсы и минусы',
        'разница между',
        'против',
        'vs',
        'какой выбрать',
        'что выбрать',
        'рекомендация',
        'совет',
      ];

      const chunkLower = chunk.toLowerCase();
      const hasComparisonContent = comparisonTriggers.some((trigger) =>
        chunkLower.includes(trigger),
      );

      if (!hasComparisonContent) {
        Logger.logInfo(
          'Отброшен ложный [FOUND] для сравнительного вопроса - нет явного содержания сравнения',
          {
            question,
            chunk: chunk.substring(0, 200),
            foundText: actualText,
          },
        );
        return false;
      }
    }

    return true;
  }

  private static isAuthorMessageContent(chunk: string): boolean {
    // Check if the chunk contains Author Message content
    return (
      chunk.includes('### Author Message') ||
      chunk.includes('Author Message (Answer Source)')
    );
  }

  private static extractAuthorMessageContent(chunk: string): string {
    if (chunk.includes('### Author Message')) {
      const authorMatch = chunk.match(
        /### Author Message \(Answer Source\)([\s\S]*)$/,
      );
      if (authorMatch && authorMatch[1]) {
        return authorMatch[1].trim();
      }
    }
    return chunk; // Return original chunk if no Author Message section
  }
  public static async askLLMChunked({
    llm,
    dialogId,
    history,
    contextDocs,
    question,
    frendlyNotFound,
    frendlyFound,
    category,
    provider,
    chatChunkSize,
    parallelThreads,
    abortController,
    detectedCategory,
  }: {
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    dialogId: string;
    history: string[];
    contextDocs: DocWithMetadataAndId[];
    question: string;
    frendlyNotFound?: boolean;
    frendlyFound?: boolean;
    category: Category;
    provider: string;
    chatChunkSize: number;
    parallelThreads?: number;
    abortController?: AbortController;
    detectedCategory: Category;
  }) {
    const foundLogIds: (string | undefined)[] = [];
    frendlyNotFound = frendlyNotFound ?? true;
    frendlyFound = frendlyFound ?? true;
    Logger.logInfo('Начало обработки запроса с чанками', {
      dialogId,
      contextDocsCount: contextDocs.length,
      historyLength: history.length,
      question,
    });
    if (category === 'telegram') {
      const combinedContent = contextDocs
        .map(
          (doc) =>
            `[id: ${doc.id}, source: ${doc.source}, fromLine: ${doc.fromLine}, toLine: ${doc.toLine}, distance: ${doc.distance}]\n${doc.content}`,
        )
        .join('\n');
      contextDocs = [
        {
          id: 'empty',
          content: combinedContent,
          source: 'Combined',
          fromLine: 0,
          toLine: 0,
          distance: 0,
        },
      ];
    }

    // Classify the question to determine processing strategy
    const questionType = LLMChunkProcessor.classifyQuestion(question);
    Logger.logInfo('Классификация вопроса', { questionType, question });

    // Get the number of parallel threads from parameters, default to 1
    const effectiveParallelThreads =
      parseInt(process.env.PARALLEL_THREADS || '1', 10) || 1;
    Logger.logInfo('Количество параллельных потоков', { parallelThreads });

    // Process contextDocs in parallel
    const results = await LLMChunkProcessor.processContextDocsInParallel({
      provider,
      llm,
      contextDocs,
      question,
      history,
      category,
      questionType,
      maxParallelThreads: effectiveParallelThreads,
      frendlyNotFound,
      frendlyFound,
      dialogId,
      chatChunkSize,
      abortController,
      detectedCategory,
    });

    // Find the first successful result
    const successfulResult = results.find(
      (result) => result.success && result.foundText,
    );

    if (successfulResult && successfulResult.foundText) {
      Logger.logInfo('Найден успешный результат', {
        contextIndex: successfulResult.contextIndex,
        foundText: successfulResult.foundText,
      });

      // If the result already contains a friendly response (generated during parallel processing), return it directly
      if (successfulResult.alreadyProcessed && successfulResult.foundText) {
        // The friendly response was already generated during parallel processing
        return {
          response: successfulResult.foundText,
          answerDocumentId: successfulResult.documentId,
          logIds: [
            ...results.map((r) => r.foundLogIds).flat(),
            ...foundLogIds,
          ].filter(Boolean),
        };
      }

      if (!frendlyFound) {
        return {
          response: successfulResult.foundText,
          answerDocumentId: successfulResult.documentId,
          logIds: [
            ...results.map((r) => r.foundLogIds).flat(),
            ...foundLogIds,
          ].filter(Boolean),
        };
      }

      // Generate friendly response using the chunks and foundChunkIndex from successful result
      let friendlyText;
      if (
        successfulResult.chunks &&
        successfulResult.foundChunkIndex !== undefined
      ) {
        const currentChunk =
          successfulResult.chunks[successfulResult.foundChunkIndex];

        // Extract only Author Message content for friendly response
        const authorContent =
          LLMChunkProcessor.extractAuthorMessageContent(currentChunk);

        // Limit context to Author Message only
        const surroundingChunks = authorContent;

        const ret = await LLMChunkProcessor.frendlyFound({
          category,
          surroundingChunks,
          question,
          llm,
          provider,
          dialogId,
          abortController,
        });
        friendlyText = ret.foundText;
        foundLogIds.push(ret.logId);

        Logger.logInfo('Дружеский ответ LLM', {
          foundText: friendlyText,
          chunk: currentChunk,
        });
      } else {
        // Fallback if chunks or foundChunkIndex are not available
        // Use the found text directly
        const ret = await LLMChunkProcessor.frendlyFound({
          category,
          surroundingChunks: successfulResult.foundText,
          question,
          llm,
          provider,
          dialogId,
          abortController,
        });
        friendlyText = ret.foundText;
        foundLogIds.push(ret.logId);

        Logger.logInfo('Дружеский ответ LLM', {
          foundText: friendlyText,
        });
      }

      // Return the document ID of the source that provided the answer
      return {
        response: friendlyText,
        answerDocumentId: successfulResult.documentId,
        logIds: [
          ...results.map((r) => r.foundLogIds).flat(),
          ...foundLogIds,
        ].filter(Boolean),
      };
    }

    Logger.logInfo('Информация по вопросу не найдена в контексте');
    if (!frendlyNotFound) {
      return {
        response: null,
        answerDocumentId: undefined,
        logIds: [
          ...results.map((r) => r.foundLogIds).flat(),
          ...foundLogIds,
        ].filter(Boolean),
      };
    }

    const notFoundText = await LLMChunkProcessor.frendlyNotFound({
      category,
      question,
      llm,
      provider,
      dialogId,
      abortController,
      detectedCategory,
    });

    Logger.logInfo('Дружеский отрицательный ответ LLM', {
      foundText: notFoundText,
    });

    foundLogIds.push(notFoundText.logId);

    return {
      response: notFoundText.foundText,
      answerDocumentId: undefined,
      logIds: [
        ...results.map((r) => r.foundLogIds).flat(),
        ...foundLogIds,
      ].filter(Boolean),
    };
  }

  private static async processContextDocsInParallel({
    llm,
    contextDocs,
    question,
    history,
    category,
    questionType,
    maxParallelThreads,
    frendlyNotFound,
    frendlyFound,
    dialogId,
    provider,
    chatChunkSize,
    abortController: externalAbortController,
    detectedCategory,
  }: {
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    contextDocs: DocWithMetadataAndId[];
    question: string;
    history: string[];
    category: Category;
    questionType: QuestionType;
    maxParallelThreads: number;
    frendlyNotFound: boolean;
    frendlyFound: boolean;
    dialogId: string;
    provider: string;
    chatChunkSize: number;
    abortController?: AbortController;
    detectedCategory: Category;
  }) {
    const foundLogIds: (string | undefined)[] = [];
    // Process each context doc in parallel, up to maxParallelThreads at a time
    const results: Array<{
      success: boolean;
      foundText?: string;
      foundLogIds: (string | undefined)[];
      foundChunkIndex?: number;
      chunks?: string[];
      contextIndex?: number;
      documentId?: string;
      alreadyProcessed?: boolean;
    }> = [];

    // Process in batches using a proper worker pool
    for (let i = 0; i < contextDocs.length; i += maxParallelThreads) {
      const batch = contextDocs.slice(i, i + maxParallelThreads);

      // Create abort controller for this batch to allow cancellation when first success is found
      // Combine with external abort controller if provided
      const abortController = new AbortController();

      // If external abort controller signals abortion, abort our local controller too
      if (externalAbortController) {
        if (externalAbortController.signal.aborted) {
          abortController.abort();
        } else {
          externalAbortController.signal.addEventListener('abort', () => {
            abortController.abort();
          });
        }
      }

      // Process batch in parallel
      const batchPromises = batch.map(async (doc, batchIndex) => {
        return LLMChunkProcessor.processSingleContextDoc({
          llm,
          contextDoc: doc,
          question,
          history,
          category,
          questionType,
          abortController,
          contextIndex: i + batchIndex,
          dialogId,
          contextDocs,
          index: i,
          provider,
          chatChunkSize,
          detectedCategory,
        });
      });

      // Use Promise.race to detect first success faster and generate friendly response immediately
      const racePromise = Promise.race(
        batchPromises.map((p, idx) =>
          p.then((result) => ({ result, batchIndex: idx, completed: true })),
        ),
      );

      try {
        const firstSuccess = await racePromise;
        if (
          firstSuccess &&
          firstSuccess.result.success &&
          firstSuccess.result.foundText
        ) {
          Logger.logInfo('Найден успешный результат, отмена остальных', {
            contextIndex: firstSuccess.result.contextIndex,
          });
          abortController.abort(); // Cancel other ongoing operations in this batch

          // Generate friendly response immediately using the question and found answer
          let friendlyText = firstSuccess.result.foundText;
          if (frendlyFound) {
            if (
              firstSuccess.result.chunks &&
              firstSuccess.result.foundChunkIndex !== undefined
            ) {
              const currentChunk =
                firstSuccess.result.chunks[firstSuccess.result.foundChunkIndex];

              // Extract only Author Message content for friendly response
              const authorContent =
                LLMChunkProcessor.extractAuthorMessageContent(currentChunk);

              // Limit context to Author Message only
              const surroundingChunks = authorContent;

              const ret = await LLMChunkProcessor.frendlyFound({
                category,
                surroundingChunks,
                question,
                llm,
                provider,
                dialogId,
                abortController: externalAbortController,
              });
              friendlyText = ret.foundText;
              foundLogIds.push(ret.logId);

              Logger.logInfo('Дружеский ответ LLM', {
                foundText: friendlyText,
                chunk: currentChunk,
              });
            } else {
              // Fallback if chunks or foundChunkIndex are not available
              const ret = await LLMChunkProcessor.frendlyFound({
                category,
                surroundingChunks: firstSuccess.result.foundText,
                question,
                llm,
                provider,
                dialogId,
                abortController: externalAbortController,
              });
              friendlyText = ret.foundText;
              foundLogIds.push(ret.logId);

              Logger.logInfo('Дружеский ответ LLM', {
                foundText: friendlyText,
              });
            }
          }

          // Return a special result indicating that friendly response was already generated
          return [
            {
              success: true,
              foundText: friendlyText, // Return the friendly response instead of raw found text
              foundLogIds: [
                ...(firstSuccess.result.foundLogIds || []),
                ...foundLogIds,
              ],
              foundChunkIndex: firstSuccess.result.foundChunkIndex,
              chunks: firstSuccess.result.chunks,
              contextIndex: firstSuccess.result.contextIndex,
              documentId: firstSuccess.result.documentId, // Include the document ID
              alreadyProcessed: true, // Flag to indicate the friendly response was already generated
            },
          ];
        }
      } catch (error) {
        if ((error as any).code === 'RATE_LIMIT_EXCEEDED') {
          throw error;
        }
        // If race fails, continue with normal processing
      }

      // Wait for all promises in the batch to settle
      const batchResults = await Promise.allSettled(batchPromises);

      // Process the settled results
      const settledResults = batchResults.map((result) =>
        result.status === 'fulfilled'
          ? {
              ...result.value,
              foundLogIds: [
                ...(result.value.foundLogIds || []),
                ...foundLogIds,
              ],
            }
          : {
              success: false,
              foundText: undefined,
              foundLogIds,
              foundChunkIndex: undefined,
              chunks: undefined,
              contextIndex: -1,
              documentId: undefined,
              alreadyProcessed: undefined,
            },
      );

      // Add batch results to overall results
      results.push(...settledResults);

      // Check if any result in this batch was successful
      const successfulResult = settledResults.find(
        (result) => result.success && result.foundText,
      );
      if (successfulResult) {
        Logger.logInfo('Найден успешный результат, отмена остальных', {
          contextIndex: successfulResult.contextIndex,
        });
        abortController.abort(); // Cancel other ongoing operations
        break; // Stop processing further batches
      }
    }

    return results;
  }

  private static async processSingleContextDoc({
    llm,
    contextDoc,
    question,
    history,
    category,
    questionType,
    abortController,
    contextIndex,
    dialogId,
    contextDocs,
    index,
    provider,
    chatChunkSize,
    detectedCategory,
  }: {
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    contextDoc: DocWithMetadataAndId;
    question: string;
    history: string[];
    category: Category;
    questionType: QuestionType;
    abortController: AbortController;
    contextIndex: number;
    dialogId: string;
    contextDocs: DocWithMetadataAndId[];
    index: number;
    provider: string;
    chatChunkSize: number;
    detectedCategory: Category;
  }): Promise<{
    success: boolean;
    foundText?: string;
    foundLogIds?: (string | undefined)[];
    foundChunkIndex?: number;
    chunks?: string[];
    contextIndex: number;
    documentId: string;
    alreadyProcessed?: boolean;
  }> {
    let foundLogIds: (string | undefined)[] = [];
    try {
      // Check if we should abort
      if (abortController.signal.aborted) {
        return {
          success: false,
          foundLogIds,
          foundChunkIndex: undefined,
          chunks: undefined,
          contextIndex,
          documentId: contextDoc.id,
          alreadyProcessed: undefined,
        };
      }

      // --- Разделяем контент на Semantic Search Content и Author Message ---
      let processedContent = '';
      if (category === 'telegram') {
        const semanticMatch = contextDoc.content.match(
          /### Semantic Search Content([\s\S]*?)### Author Message/,
        );
        const authorMatch = contextDoc.content.match(
          /### Author Message \(Answer Source\)([\s\S]*)$/,
        );

        const semantic = semanticMatch ? semanticMatch[1].trim() : '';
        const author = authorMatch ? authorMatch[1].trim() : '';

        if (semantic || author) {
          processedContent =
            `[${contextDoc.source}:${contextDoc.fromLine}-${contextDoc.toLine}]\n` +
            `### Semantic Search Content\n${semantic}\n` +
            `### Author Message (Answer Source)\n${author}`;
        } else {
          processedContent = `[${contextDoc.source}:${contextDoc.fromLine}-${contextDoc.toLine}]\n${contextDoc.content}`;
        }
      } else {
        processedContent = `[${contextDoc.source}:${contextDoc.fromLine}-${contextDoc.toLine}]\n${contextDoc.content}`;
      }

      // --- Разбиваем на чанки ---
      const basePromptLength = (
        await LLMChunkProcessor.generatePrompt({
          history,
          question,
          source: contextDoc.source,
          detectedCategory,
          dialogId,
        })
      ).length;

      if (index === 0) {
        const combinedContent = contextDocs
          .map(
            (doc) =>
              `[id: ${doc.id}, source: ${doc.source}, fromLine: ${doc.fromLine}, toLine: ${doc.toLine}, distance: ${doc.distance}]\n${doc.content}`,
          )
          .join('\n');
        contextDocs = [
          {
            id: 'empty',
            content: combinedContent,
            source: 'Combined',
            fromLine: 0,
            toLine: 0,
            distance: 0,
          },
        ];
        // PromptLogger.logPrompt({
        //   dialogId,
        //   mode,
        //   prompt: LLMChunkProcessor.generatePrompt({
        //     chunk: combinedContent,
        //     history,
        //     question,
        //     source: contextDoc.source,
        //   }),
        // }).catch((logError) => {
        //   Logger.logError("Failed to create prompt log", {
        //     error: (logError as Error).message,
        //     dialogId,
        //   });
        // });
      }

      Logger.logInfo(
        `chatChunkSize: "${chatChunkSize}", basePromptLength: "${basePromptLength}"`,
      );
      const max = +(chatChunkSize || 2000) - basePromptLength - 100;
      const chunks =
        max > 0 ? RAGSearcher.splitTextIntoChunks(processedContent, max) : [];
      const totalChunks = chunks.length;

      Logger.logInfo(`Обработка чанков для контекста ${contextIndex}`, {
        totalChunks: totalChunks,
        processedContentLength: processedContent.length,
      });

      let foundChunkIndex = -1;
      let foundText = '';

      for (let i = 0; i < totalChunks; i++) {
        // Check if we should abort
        if (abortController.signal.aborted) {
          break;
        }

        if (foundChunkIndex === -1) {
          const chunk = chunks[i];

          // Check consecutive failures to determine if we should bypass pre-filter
          let bypassPreFilter = false;
          try {
            const consecutiveFailures =
              await FailureTracker.getConsecutiveFailures(dialogId);
            bypassPreFilter = consecutiveFailures >= 3;

            if (bypassPreFilter) {
              Logger.logInfo(
                `Bypassing pre-filter due to ${consecutiveFailures} consecutive failures`,
                { dialogId, consecutiveFailures, contextIndex },
              );
            }
          } catch (error) {
            Logger.logError('Failed to check consecutive failures', {
              error: (error as Error).message,
              dialogId,
            });
            // Continue with normal pre-filter behavior on error
          }

          // Pre-filter chunk to reduce LLM calls (unless bypassed due to consecutive failures)
          // if (
          //   !bypassPreFilter &&
          //   LLMChunkProcessor.getDocTypeBySource(contextDoc.source) !==
          //     "portfolio" &&
          //   LLMChunkProcessor.getDocTypeBySource(contextDoc.source) !==
          //     "resume" &&
          //   !LLMChunkProcessor.preFilterChunk(chunk, question, questionType)
          // ) {
          //   Logger.logInfo(
          //     `Чанк ${i + 1}/${totalChunks} отфильтрован по ключевым словам`,
          //     { contextIndex }
          //   );
          //   continue;
          // }

          Logger.logInfo(
            `Обработка чанка ${
              i + 1
            }/${totalChunks} для контекста ${contextIndex}`,
            {
              chunkLength: totalChunks,
              chunk,
            },
          );

          const mainPrompt = await LLMChunkProcessor.generatePrompt({
            chunk,
            history,
            question,
            source: contextDoc.source,
            detectedCategory,
            dialogId,
          });

          const { content: text, logId } = await LLMLogger.callWithLogging({
            provider,
            llm,
            prompt: mainPrompt,
            metadata: {
              contextIndex,
              chunkIndex: i,
              operation: 'chunk_processing',
              dialogId,
            },
            dialogId,
            historyId: undefined,
          });

          foundLogIds.push(logId);

          Logger.logInfo(
            `Ответ LLM для чанка ${i + 1} контекста ${contextIndex}`,
            { text },
          );

          if (text.startsWith('[FOUND]')) {
            // Validate the [FOUND] result to ensure it's not a false positive
            if (
              LLMChunkProcessor.validateFoundResult(
                text,
                chunk,
                question,
                questionType,
              )
            ) {
              // For telegram mode, ensure the result comes from Author Message
              if (
                category === 'telegram' &&
                !LLMChunkProcessor.isAuthorMessageContent(chunk)
              ) {
                Logger.logInfo(
                  'Отброшен [FOUND] из Semantic Search Content, разрешены только Author Message',
                  {
                    contextIndex,
                    chunkIndex: i,
                  },
                );
                continue; // Skip this result, continue looking
              }

              foundText = text.replace(/^\[FOUND]\s*/, '');
              foundChunkIndex = i;

              // Cancel other operations since we found a valid result
              abortController.abort();

              const { content, logId } = await LLMLogger.callWithLogging({
                provider,
                llm,
                prompt: createFinalAnswerPrompt({
                  question,
                  fact: foundText,
                  category,
                }),
                historyId: undefined,
                dialogId,
              });
              foundText = content;
              foundLogIds.push(logId);
              break;
            } else {
              Logger.logInfo('Отброшен невалидный [FOUND] результат', {
                contextIndex,
                chunkIndex: i,
                text,
              });
              continue; // Continue looking for valid results
            }
          }
        }
      }

      Logger.logInfo('foundLogIds', foundLogIds);

      if (foundText) {
        return {
          foundLogIds,
          success: true,
          foundText,
          foundChunkIndex,
          chunks,
          contextIndex,
          documentId: contextDoc.id, // Include the document ID for tracking
        };
      }

      return {
        foundLogIds,
        success: false,
        contextIndex,
        documentId: contextDoc.id, // Include the document ID for tracking
      };
    } catch (error) {
      if ((error as any).code === 'RATE_LIMIT_EXCEEDED') {
        throw error;
      }
      Logger.logError(`Ошибка при обработке контекста ${contextIndex}`, {
        error: (error as Error).message,
      });
      Logger.logInfo('foundLogId', foundLogIds);
      return {
        foundLogIds,
        success: false,
        foundText: undefined,
        foundChunkIndex: undefined,
        chunks: undefined,
        contextIndex,
        documentId: contextDoc.id,
      };
    }
  }

  static async frendlyFound({
    category,
    surroundingChunks,
    question,
    llm,
    provider,
    dialogId,
    abortController,
  }: {
    category: Category;
    surroundingChunks: string;
    question: string;
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    provider: string;
    dialogId?: string;
    abortController?: AbortController;
  }) {
    const prompt = createFriendlyFoundPrompt({
      category,
      chunk: surroundingChunks,
      question,
    });

    const { content: foundText, logId } = await LLMLogger.callWithLogging({
      provider,
      llm,
      prompt,
      metadata: {
        operation: 'friendly_response',
        dialogId,
      },
      dialogId,
      historyId: undefined,
      abortController,
    });
    return { foundText, logId };
  }

  static async frendlyNotFound({
    category,
    chunk,
    question,
    llm,
    provider,
    dialogId,
    abortController,
    detectedCategory,
  }: {
    category: Category;
    chunk?: string;
    question: string;
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    provider: string;
    dialogId?: string;
    abortController?: AbortController;
    detectedCategory: Category;
  }) {
    const prompt = createFriendlyNotFoundPrompt({ category, chunk, question });

    const { content: foundText, logId } = await LLMLogger.callWithLogging({
      provider,
      llm,
      prompt,
      metadata: {
        operation: 'friendly_not_found_response',
        dialogId,
      },
      dialogId,
      historyId: undefined,
      abortController,
    });

    return { foundText, logId };
  }

  private static async generatePrompt({
    chunk,
    history,
    question,
    source,
    detectedCategory,
    dialogId,
  }: {
    chunk?: string;
    history: string[];
    question: string;
    source: string;
    detectedCategory: Category;
    dialogId: string;
  }) {
    if (
      detectedCategory === Category.clarification ||
      detectedCategory === Category.followup
    ) {
      const lastHistoryItem = await DialogManager.getDialogRawHistory(
        dialogId,
        1,
      );
      Logger.logInfo('Last history item', lastHistoryItem);

      if (lastHistoryItem.length) {
        detectedCategory = lastHistoryItem[0].detected_category;
      }
    }

    if (CATEGORY_PROMPTS[detectedCategory]) {
      return CATEGORY_PROMPTS[detectedCategory]
        .replace('{{history}}', history.length ? history.join('\n') : 'нет')
        .replace('{{context}}', chunk || '')
        .replace('{{question}}', question);
    }

    return CATEGORY_PROMPTS.telegram
      .replace('{{history}}', history.length ? history.join('\n') : 'нет')
      .replace('{{context}}', chunk || '')
      .replace('{{question}}', question);
  }

  static getDocTypeBySource(source: string) {
    let docType: Category | undefined = undefined;

    if (source.includes('/articles/')) docType = Category.articles;
    else if (source.includes('/telegram/')) docType = Category.telegram;
    else if (source.includes('/resume/')) docType = Category.resume;
    else if (source.includes('/portfolio/')) docType = Category.portfolio;
    return docType;
  }
}
