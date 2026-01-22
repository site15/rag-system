// llmChunkProcessor.ts
import Mustache from 'mustache';
import { addPayloadToTrace, Trace } from '../trace/trace.module';
import { getConstant, GetConstantKey } from '../utils/get-constant';
import { DialogManager } from './dialogManager';
import { getCategoryByDetectedCategory } from './getCategoryByDetectedCategory';
import { getCategoryPrompt } from './getCategoryPrompt';
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
import { TextHelpers } from './textHelpers';
import { DocWithMetadataAndId } from './types';
import { removeCodeWrappers } from './utils';

// Constants are now loaded externally via getConstant()
export class LLMChunkProcessor {
  private static isAuthorMessageContent(chunk: string): boolean {
    // Check if the chunk contains Author Message content
    return chunk.includes(
      getConstant(GetConstantKey.LlmChunkProcessor_authorMessageHeader),
    );
  }

  private static extractAuthorMessageContent(chunk: string): string {
    const authorMessageHeader = getConstant(
      GetConstantKey.LlmChunkProcessor_authorMessageHeader,
    );
    const finalAnswerInstruction = getConstant(
      GetConstantKey.LlmChunkProcessor_finalAnswerInstruction,
    );

    if (chunk.includes(authorMessageHeader)) {
      try {
        const authorMatch = chunk
          .replace(finalAnswerInstruction, '')
          .split(authorMessageHeader)[1]
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

    const maxParallelThreads =
      parseInt(process.env.PARALLEL_THREADS || '1', 10) || 1;
    Logger.logInfo('Количество параллельных потоков', { maxParallelThreads });

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

  @Trace()
  private static async processSingleContextDoc({
    contextDoc,
    question,
    history,
    category,
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
          new RegExp(
            getConstant(GetConstantKey.LlmChunkProcessor_semanticSearchRegex),
          ),
        );
        const authorMatch = contextDoc.content.match(
          new RegExp(
            getConstant(GetConstantKey.LlmChunkProcessor_authorMessageRegex),
          ),
        );

        const semantic = semanticMatch ? semanticMatch[1].trim() : '';
        const author = authorMatch ? authorMatch[1].trim() : '';

        if (semantic || author) {
          processedContent = Mustache.render(
            getConstant(GetConstantKey.LlmChunkProcessor_semanticTemplate),
            {
              source: contextDoc.source,
              fromLine: contextDoc.fromLine,
              toLine: contextDoc.toLine,
              semantic: semantic,
              author: author,
            },
          );
        } else {
          processedContent = Mustache.render(
            getConstant(GetConstantKey.LlmChunkProcessor_simpleTemplate),
            {
              source: contextDoc.source,
              fromLine: contextDoc.fromLine,
              toLine: contextDoc.toLine,
              content: contextDoc.content,
            },
          );
        }
      } else {
        processedContent = Mustache.render(
          getConstant(GetConstantKey.LlmChunkProcessor_simpleTemplate),
          {
            source: contextDoc.source,
            fromLine: contextDoc.fromLine,
            toLine: contextDoc.toLine,
            content: contextDoc.content,
          },
        );
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
        const combinedContent = TextHelpers.concat(
          contextDocs.map((doc) => {
            return Mustache.render(
              '[id: {{id}}, source: {{source}}, fromLine: {{fromLine}}, toLine: {{toLine}}, distance: {{distance}}]\n{{content}}',
              {
                id: doc.id,
                source: doc.source,
                fromLine: doc.fromLine,
                toLine: doc.toLine,
                distance: doc.distance,
                content: doc.content,
              },
            );
          }),
        );
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
              history: removeCodeWrappers(TextHelpers.concat(history)),
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
      const lastHistoryItem = (
        await DialogManager.getDialogRawHistory(dialogId, 5)
      ).filter((r) => r.answer);
      Logger.logInfo('Last history item', lastHistoryItem);

      if (lastHistoryItem.length) {
        detectedCategory = getCategoryByDetectedCategory(
          lastHistoryItem[0].detected_category,
        );
      }
    }

    const templateData = {
      history: removeCodeWrappers(TextHelpers.concat(history, 'нет')),
      context: removeCodeWrappers(chunk || ''),
      question: question,
      isFollowUp: history?.[0],
    };

    const prompt = getCategoryPrompt(detectedCategory);
    if (prompt) {
      return Mustache.render(prompt, templateData);
    }

    return Mustache.render(getCategoryPrompt(Category.telegram), templateData);
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
