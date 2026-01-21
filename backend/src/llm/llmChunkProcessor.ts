// llmChunkProcessor.ts
import Mustache from 'mustache';
import { addPayloadToTrace, Trace } from '../trace/trace.module';
import { CATEGORY_PROMPTS } from './category-prompts';
import { DialogManager } from './dialogManager';
import { getCategoryByDetectedCategory } from './getCategoryByDetectedCategory';
import { LLMFactory } from './llmFactory';
import { LLMLogger } from './llmLogger';
import { Logger } from './logger';
import {
  createFinalAnswerPrompt,
  createFriendlyFoundPrompt,
  createFriendlyNotFoundPrompt,
} from './prompt';
import { RAGSearcher } from './ragSearcher';
import { DefaultProvidersInitializer } from './services/defaultProvidersInitializer';
import { FailureTracker } from './services/failureTracker';
import { Category } from './services/questionTransformer';
import { DocWithMetadataAndId } from './types';
import { removeCodeWrappers } from './utils';

// Question types for classification
enum QuestionType {
  FACT = 'FACT',
  INSTRUCTION = 'INSTRUCTION',
  COMPARISON = 'COMPARISON',
  OPINION = 'OPINION',
  OTHER = 'OTHER',
}

const AUTHOR_MESSAGE_ANSWER_SOURCE = '### Author Message (Answer Source)';
const THIS_SECTION_MUST_BE_USED_TO_GENERATE_THE_FINAL_ANSWER =
  'This section MUST be used to generate the final answer.';
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
    return chunk.includes(AUTHOR_MESSAGE_ANSWER_SOURCE);
  }

  private static extractAuthorMessageContent(chunk: string): string {
    if (chunk.includes(AUTHOR_MESSAGE_ANSWER_SOURCE)) {
      try {
        const authorMatch = chunk
          .replace(THIS_SECTION_MUST_BE_USED_TO_GENERATE_THE_FINAL_ANSWER, '')
          .split(AUTHOR_MESSAGE_ANSWER_SOURCE)[1]
          .split('\n--\n')[0];
        return authorMatch.trim();
      } catch (error) {
        return chunk.trim();
      }
    }
    return chunk.trim();
  }

  @Trace()
  public static async askLLMChunked({
    dialogId,
    history,
    contextDocs,
    question,
    category,
    detectedCategory,
  }: {
    dialogId: string;
    history: string[];
    contextDocs: DocWithMetadataAndId[];
    question: string;
    category: Category;
    detectedCategory: Category;
  }) {
    const foundLogIds: (string | undefined)[] = [];
    // Process contextDocs in parallel
    const results = await LLMChunkProcessor.processContextDocsInParallel({
      contextDocs,
      question,
      history,
      category,
      dialogId,
      detectedCategory,
    });

    // Find the first successful result
    const successfulResult = results.find(
      (result) => result.success && result.foundText,
    );

    if (successfulResult?.foundText) {
      addPayloadToTrace({ foundText: successfulResult.foundText });

      Logger.logInfo('Найден успешный результат', {
        contextIndex: successfulResult.contextIndex,
        foundText: successfulResult.foundText,
      });

      return {
        response: successfulResult.foundText,
        answerDocumentId: successfulResult.documentId,
        logIds: [
          ...results.map((r) => r.foundLogIds).flat(),
          ...foundLogIds,
        ].filter(Boolean),
      };
    }

    addPayloadToTrace({ foundText: null });

    Logger.logInfo('Информация по вопросу не найдена в контексте');
    return {
      response: null,
      answerDocumentId: undefined,
      logIds: [
        ...results.map((r) => r.foundLogIds).flat(),
        ...foundLogIds,
      ].filter(Boolean),
    };
  }

  @Trace()
  private static async processContextDocsInParallel({
    contextDocs,
    question,
    history,
    category,
    dialogId,
    detectedCategory,
  }: {
    contextDocs: DocWithMetadataAndId[];
    question: string;
    history: string[];
    category: Category;
    dialogId: string;
    detectedCategory: Category;
  }) {
    Logger.logInfo('Начало обработки запроса с чанками', {
      dialogId,
      contextDocsCount: contextDocs.length,
      historyLength: history.length,
      question,
    });

    // Classify the question to determine processing strategy
    const { maxParallelThreads, questionType } =
      LLMChunkProcessor.getProcessContextDocsInParallelOptions(question);

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
    }> = [];

    // Process in batches using a proper worker pool
    // todo: maxParallelThreads not work correct
    for (let i = 0; i < contextDocs.length; i += maxParallelThreads) {
      const batch = contextDocs.slice(i, i + maxParallelThreads);

      // Process batch in parallel
      const batchPromises = batch.map(async (doc, batchIndex) => {
        return LLMChunkProcessor.processSingleContextDoc({
          contextDoc: doc,
          question,
          history,
          category,
          questionType,
          contextIndex: i + batchIndex,
          dialogId,
          contextDocs,
          index: i,
          detectedCategory,
        });
      });

      try {
        const firstSuccess = await Promise.any(
          batchPromises.map((p, idx) =>
            p.then((result) => {
              if (!result.success) {
                throw new Error();
              }
              return { result, batchIndex: idx, completed: true };
            }),
          ),
        );

        addPayloadToTrace({
          firstSuccess,
        });

        if (
          firstSuccess &&
          firstSuccess.result.success &&
          firstSuccess.result.foundText
        ) {
          Logger.logInfo('Найден успешный результат, отмена остальных', {
            contextIndex: firstSuccess.result.contextIndex,
          });

          let surroundingChunks = firstSuccess.result.foundText;

          if (
            firstSuccess.result.chunks &&
            firstSuccess.result.foundChunkIndex !== undefined
          ) {
            const currentChunk =
              firstSuccess.result.chunks[firstSuccess.result.foundChunkIndex];
            surroundingChunks = LLMChunkProcessor.extractAuthorMessageContent(
              currentChunk.content,
            );
          }

          // пока вырубили, так как ранее уже нормальное сформировали
          // const ret = await LLMChunkProcessor.frendlyFound({
          //   category,
          //   surroundingChunks,
          //   question,
          //   dialogId,
          // });
          // const friendlyText = ret.foundText;
          // foundLogIds.push(ret.logId);
          //
          // Logger.logInfo('Дружеский ответ LLM', {
          //   foundText: friendlyText,
          //   chunk: surroundingChunks,
          // });

          // Return a special result indicating that friendly response was already generated
          return [
            {
              success: true,
              foundText: firstSuccess.result.foundText, // Return the friendly response instead of raw found text
              foundLogIds: [
                ...(firstSuccess.result.foundLogIds || []),
                ...foundLogIds,
              ],
              foundChunkIndex: firstSuccess.result.foundChunkIndex,
              chunks: firstSuccess.result.chunks,
              contextIndex: firstSuccess.result.contextIndex,
              documentId: firstSuccess.result.documentId, // Include the document ID
            },
          ];
        }
      } catch (error) {
        if (
          (error as any).code === 'RATE_LIMIT_EXCEEDED' ||
          error.message?.includes('429')
        ) {
          throw error;
        }
        // If race fails, continue with normal processing
      }
    }

    return results;
  }

  private static getProcessContextDocsInParallelOptions(question: string) {
    const questionType = LLMChunkProcessor.classifyQuestion(question);
    Logger.logInfo('Классификация вопроса', { questionType, question });

    // Get the number of parallel threads from parameters, default to 1
    const maxParallelThreads =
      parseInt(process.env.PARALLEL_THREADS || '1', 10) || 1;
    Logger.logInfo('Количество параллельных потоков', { maxParallelThreads });
    return { maxParallelThreads, questionType };
  }

  @Trace()
  private static async processSingleContextDoc({
    contextDoc,
    question,
    history,
    category,
    questionType,
    contextIndex,
    dialogId,
    contextDocs,
    index,
    detectedCategory,
  }: {
    contextDoc: DocWithMetadataAndId;
    question: string;
    history: string[];
    category: Category;
    questionType: QuestionType;
    contextIndex: number;
    dialogId: string;
    contextDocs: DocWithMetadataAndId[];
    index: number;
    detectedCategory: Category;
  }): Promise<{
    success: boolean;
    foundText?: string;
    foundLogIds?: (string | undefined)[];
    foundChunkIndex?: number;
    chunks?: {
      content: string;
      meta: {
        loc: {
          lines: {
            from: number;
            to: number;
          };
        };
      };
    }[];
    contextIndex: number;
    documentId: string;
  }> {
    let foundLogIds: (string | undefined)[] = [];
    try {
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
          const template = `
[{{source}}:{{fromLine}}-{{toLine}}]
### Semantic Search Content
{{semantic}}
### Author Message (Answer Source)
{{author}}`;

          processedContent = Mustache.render(template, {
            source: contextDoc.source,
            fromLine: contextDoc.fromLine,
            toLine: contextDoc.toLine,
            semantic: semantic,
            author: author,
          });
        } else {
          const template = `[{{source}}:{{fromLine}}-{{toLine}}]
{{content}}`;

          processedContent = Mustache.render(template, {
            source: contextDoc.source,
            fromLine: contextDoc.fromLine,
            toLine: contextDoc.toLine,
            content: contextDoc.content,
          });
        }
      } else {
        const template = `[{{source}}:{{fromLine}}-{{toLine}}]
{{content}}`;

        processedContent = Mustache.render(template, {
          source: contextDoc.source,
          fromLine: contextDoc.fromLine,
          toLine: contextDoc.toLine,
          content: contextDoc.content,
        });
      }

      // --- Разбиваем на чанки ---
      const basePrompt = await LLMChunkProcessor.generatePrompt({
        history,
        question,
        source: contextDoc.source,
        detectedCategory,
        dialogId,
      });

      const basePromptLength = basePrompt.length;

      addPayloadToTrace({
        contextDocsCount: contextDocs.length,
        basePromptLength,
        basePrompt,
      });

      if (index === 0) {
        const combinedContent = contextDocs
          .map((doc) => {
            const template = `[id: {{id}}, source: {{source}}, fromLine: {{fromLine}}, toLine: {{toLine}}, distance: {{distance}}]
{{content}}`;
            return Mustache.render(template, {
              id: doc.id,
              source: doc.source,
              fromLine: doc.fromLine,
              toLine: doc.toLine,
              distance: doc.distance,
              content: doc.content,
            });
          })
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

      const provider = await DefaultProvidersInitializer.getActiveProvider();
      Logger.logInfo(
        `chatChunkSize: "${provider.chunkSize}", basePromptLength: "${basePromptLength}"`,
      );
      const max = +provider.chunkSize - basePromptLength - 100;
      const chunks =
        max > 0
          ? RAGSearcher.splitTextIntoChunksWithMeta(processedContent, max)
          : [];
      const totalChunks = chunks.length;

      Logger.logInfo(`Обработка чанков для контекста ${contextIndex}`, {
        totalChunks: totalChunks,
        processedContentLength: processedContent.length,
      });

      addPayloadToTrace({ totalChunks });

      let foundChunkIndex = -1;
      let foundText = '';

      for (let i = 0; i < totalChunks; i++) {
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
          }

          Logger.logInfo(
            `Обработка чанка ${
              i + 1
            }/${totalChunks} для контекста ${contextIndex}`,
            {
              totalChunks: totalChunks,
              chunkLength: chunk.content.length,
            },
          );

          const chunkPrompt = await LLMChunkProcessor.generatePrompt({
            chunk: chunk.content,
            history,
            question,
            source: contextDoc.source,
            detectedCategory,
            dialogId,
          });

          addPayloadToTrace({
            [`chunk${i}Prompt`]: chunkPrompt,
            [`chunk${i}PromptLength`]: chunkPrompt.length,
          });

          const { content: text, logId } = await LLMLogger.callWithLogging({
            prompt: chunkPrompt,
            metadata: {
              contextIndex,
              chunkIndex: i,
              operation: 'chunk_processing',
              dialogId,
            },
            dialogId,
            messageId: undefined,
            callback: (prompt) => LLMFactory.invoke(prompt),
          });

          addPayloadToTrace({
            [`chunk${i}PromptResult`]: text,
          });

          foundLogIds.push(logId);

          Logger.logInfo(
            `Ответ LLM для чанка ${i + 1} контекста ${contextIndex}`,
            { text },
          );

          if (text.startsWith('[FOUND]')) {
            // For telegram mode, ensure the result comes from Author Message
            if (
              category === 'telegram' &&
              !LLMChunkProcessor.isAuthorMessageContent(chunk.content)
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

            const finalAnswerPrompt = createFinalAnswerPrompt({
              question,
              context: removeCodeWrappers(chunk.content),
              fact: foundText,
              category,
              history: removeCodeWrappers(history.join('\n')),
            });

            addPayloadToTrace({
              [`chunk${i}FinalAnswerPrompt`]: finalAnswerPrompt,
            });

            const { content, logId } = await LLMLogger.callWithLogging({
              prompt: finalAnswerPrompt,
              messageId: undefined,
              dialogId,
              callback: (prompt) => LLMFactory.invoke(prompt),
            });

            foundText = content;

            addPayloadToTrace({
              [`chunk${i}FinalAnswerPromptResult`]: foundText,
            });

            foundLogIds.push(logId);
            break;
          }
        }
      }

      Logger.logInfo('foundLogIds', foundLogIds);

      if (foundText) {
        addPayloadToTrace({
          [`chunk${foundChunkIndex}FinalAnswerPromptResult`]: foundText,
        });
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
      if (
        (error as any).code === 'RATE_LIMIT_EXCEEDED' ||
        error.message?.includes('429')
      ) {
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

  @Trace()
  static async frendlyFound({
    category,
    surroundingChunks,
    question,
    dialogId,
  }: {
    category: Category;
    surroundingChunks: string;
    question: string;
    dialogId?: string;
  }) {
    const prompt = createFriendlyFoundPrompt({
      category,
      chunk: surroundingChunks,
      question,
    });

    const { content: foundText, logId } = await LLMLogger.callWithLogging({
      prompt,
      metadata: {
        operation: 'friendly_response',
        dialogId,
      },
      dialogId,
      messageId: undefined,
      callback: (prompt) => LLMFactory.invoke(prompt),
    });

    return { foundText, logId };
  }

  @Trace()
  static async frendlyNotFound({
    category,
    chunk,
    question,
    dialogId,
  }: {
    category: Category;
    chunk?: string;
    question: string;
    dialogId?: string;
  }) {
    const prompt = createFriendlyNotFoundPrompt({ category, chunk, question });

    const { content: foundText, logId } = await LLMLogger.callWithLogging({
      prompt,
      metadata: {
        operation: 'friendly_not_found_response',
        dialogId,
      },
      dialogId,
      messageId: undefined,
      callback: (prompt) => LLMFactory.invoke(prompt),
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
        detectedCategory = getCategoryByDetectedCategory(
          lastHistoryItem[0].detected_category,
        );
      }
    }

    const customRules = history.length
      ? `Если вопрос является follow-up (уточнение, продолжение) и conversation history содержит опыт в первом лице, 
ориентируйся ТОЛЬКО на этот опыт, а контекст документа используй только для уточнения фактов, связанных с этим опытом. 
Не берите информацию из контекста, если она относится к другому проекту, не упомянутому в истории.

Если объект или технология упомянуты в истории, а контекст документа содержит другой объект/технологию, 
игнорируй несвязанный контекст и отвечай только исходя из истории.`
      : '';

    const templateData = {
      history: removeCodeWrappers(history.length ? history.join('\n') : 'нет'),
      context: removeCodeWrappers(chunk || ''),
      question: question,
      customRules: customRules,
      isFollowUp: history?.[0],
    };

    if (CATEGORY_PROMPTS[detectedCategory]) {
      return Mustache.render(CATEGORY_PROMPTS[detectedCategory], templateData);
    }

    return Mustache.render(CATEGORY_PROMPTS.telegram, templateData);
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
