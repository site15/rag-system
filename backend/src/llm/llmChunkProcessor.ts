// llmChunkProcessor.ts
import { addPayloadToTrace, Trace } from '../trace/trace.module';
import { getConstant, GetConstantKey } from '../utils/get-constant';
import { DialogManager } from './dialogManager';
import {
  Category,
  getCategoryByDetectedCategory,
} from './getCategoryByDetectedCategory';
import { getCategoryPrompt } from './getCategoryPrompt';
import { AttemptsCallbacksOptions } from './llmFactory';
import { LLMLogger } from './llmLogger';
import { Logger } from './logger';
import {
  createFinalAnswerPrompt,
  createFriendlyFoundPrompt,
  createFriendlyNotFoundPrompt,
} from './prompt';
import { ConfigManager } from './config';
import { TextHelpers } from './textHelpers';
import { DocWithMetadataAndId } from './types';
import { removeCodeWrappers } from './utils';
import {
  sanitizeLlmUserResponse,
  toHumanLlmResponse,
} from './llmResponseSanitizer';

export class LLMChunkProcessor {
  @Trace()
  public static async askLLMChunked({
    dialogId,
    history,
    contextDocs,
    question,
    category,
    detectedCategory,
    attemptsCallbacks,
  }: {
    dialogId: string;
    history: string[];
    contextDocs: DocWithMetadataAndId[];
    question: string;
    category: Category;
    detectedCategory: Category;
    attemptsCallbacks?: (options: AttemptsCallbacksOptions) => Promise<any>;
  }) {
    if (!contextDocs?.length) {
      Logger.logInfo('Нет документов в контексте');
      return { response: null, answerDocumentId: undefined, logIds: [] };
    }

    const sortedDocs = [...contextDocs].sort(
      (a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity),
    );

    const foundLogIds: (string | undefined)[] = [];

    if (attemptsCallbacks) {
      await attemptsCallbacks({
        message: `🕖 Анализ ${sortedDocs.length} документов...`,
      });
    }

    const contextConfig = ConfigManager.getLlmContextConfig();

    const basePrompt = await LLMChunkProcessor.generatePrompt({
      history,
      question,
      source: sortedDocs[0].source,
      detectedCategory,
      dialogId,
    });

    const maxContextLength =
      contextConfig.maxContextChars -
      basePrompt.length -
      contextConfig.promptReserveChars;
    const { combinedContext, primaryDocId, includedDocsCount } =
      LLMChunkProcessor.buildCombinedContext({
        docs: sortedDocs,
        category,
        maxLength: Math.max(maxContextLength, contextConfig.minContextChars),
      });

    addPayloadToTrace({
      contextDocsCount: sortedDocs.length,
      includedDocsCount,
      maxContextChars: contextConfig.maxContextChars,
      combinedContextLength: combinedContext.length,
      primaryDocId,
    });

    const chunkPrompt = await LLMChunkProcessor.generatePrompt({
      chunk: combinedContext,
      history,
      question,
      source: sortedDocs[0].source,
      detectedCategory,
      dialogId,
    });

    const { content: text, logId } = await LLMLogger.callWithLogging({
      prompt: chunkPrompt,
      metadata: {
        operation: 'batch_context_processing',
        dialogId,
        contextDocsCount: sortedDocs.length,
      },
      dialogId,
      messageId: undefined,
      attemptsCallbacks,
    });

    foundLogIds.push(logId);
    addPayloadToTrace({ batchPromptResult: text });

    if (!text?.startsWith('[FOUND]')) {
      Logger.logInfo('Информация по вопросу не найдена в контексте');
      return {
        response: null,
        answerDocumentId: undefined,
        logIds: foundLogIds.filter(Boolean),
      };
    }

    const fact = text.replace(/^\[FOUND]\s*/, '');

    const finalAnswerPrompt = createFinalAnswerPrompt({
      question,
      context: removeCodeWrappers(combinedContext),
      fact,
      category,
      history: removeCodeWrappers(TextHelpers.concat(history)),
    });

    const { content: finalAnswer, logId: finalLogId } =
      await LLMLogger.callWithLogging({
        prompt: finalAnswerPrompt,
        messageId: undefined,
        dialogId,
        attemptsCallbacks,
      });

    foundLogIds.push(finalLogId);

    Logger.logInfo('Найден успешный результат', {
      primaryDocId,
      answerLength: finalAnswer?.length,
    });

    return {
      response: sanitizeLlmUserResponse(finalAnswer),
      answerDocumentId: primaryDocId,
      logIds: foundLogIds.filter(Boolean),
    };
  }

  private static formatDocContent(
    doc: DocWithMetadataAndId,
    category: Category,
  ): string {
    if (category === 'telegram') {
      const semanticMatch = doc.content.match(
        new RegExp(
          getConstant(GetConstantKey.LlmChunkProcessor_semanticSearchRegex),
        ),
      );
      const authorMatch = doc.content.match(
        new RegExp(
          getConstant(GetConstantKey.LlmChunkProcessor_authorMessageRegex),
        ),
      );

      const semantic = semanticMatch ? semanticMatch[1]?.trim() : '';
      const author = authorMatch ? authorMatch[1]?.trim() : '';

      if (semantic || author) {
        return getConstant(GetConstantKey.LlmChunkProcessor_semanticTemplate, {
          source: doc.source,
          fromLine: doc.fromLine,
          toLine: doc.toLine,
          semantic,
          author,
        });
      }
    }

    return getConstant(GetConstantKey.LlmChunkProcessor_simpleTemplate, {
      source: doc.source,
      fromLine: doc.fromLine,
      toLine: doc.toLine,
      content: doc.content,
    });
  }

  private static buildCombinedContext({
    docs,
    category,
    maxLength,
  }: {
    docs: DocWithMetadataAndId[];
    category: Category;
    maxLength: number;
  }): {
    combinedContext: string;
    primaryDocId: string;
    includedDocsCount: number;
  } {
    const parts: string[] = [];
    let totalLength = 0;
    let primaryDocId = docs[0].id;

    for (const doc of docs) {
      const header = `\n---\n[id: ${doc.id}, source: ${doc.source}, distance: ${doc.distance ?? 'n/a'}]\n`;
      const body = LLMChunkProcessor.formatDocContent(doc, category);
      const block = header + body;

      if (parts.length > 0 && totalLength + block.length > maxLength) {
        break;
      }

      parts.push(block);
      totalLength += block.length;
      primaryDocId = doc.id;
    }

    return {
      combinedContext: parts.join('\n'),
      primaryDocId,
      includedDocsCount: parts.length,
    };
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
    });

    return { foundText: toHumanLlmResponse(foundText), logId };
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
    });

    return { foundText: toHumanLlmResponse(foundText), logId };
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
      const lastHistory = await DialogManager.getDialogRawHistory(dialogId, 5);
      const lastHistoryItem = lastHistory.filter((r) => r.answer);

      if (lastHistoryItem?.length) {
        detectedCategory = getCategoryByDetectedCategory(
          lastHistoryItem[0].detected_category,
        );
      }

      if (
        lastHistory.filter(
          (r) =>
            r.answer &&
            (r.detected_category === Category.clarification ||
              r.detected_category === Category.followup),
        ).length > 3
      ) {
        const summary = await DialogManager.getDialogSummary(dialogId);
        if (summary) {
          history = [summary];
        }
        detectedCategory = Category.resume;
      }
    }

    const templateData = {
      history: removeCodeWrappers(TextHelpers.concat(history)),
      context: removeCodeWrappers(chunk || ''),
      question: question,
      isFollowUp: history?.[0],
    };

    const prompt = getCategoryPrompt(detectedCategory);
    if (prompt) {
      return getCategoryPrompt(detectedCategory, templateData);
    }

    return getCategoryPrompt(Category.telegram, templateData);
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
