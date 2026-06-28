// questionTransformer.ts
import { addPayloadToTrace, Trace } from '../../trace/trace.module';
import { getConstant, GetConstantKey } from '../../utils/get-constant';
import { RAG_SEARCH_CONFIG } from '../constants';
import { DialogManager } from '../dialogManager';
import {
  Category,
  getCategoryByDetectedCategory,
} from '../getCategoryByDetectedCategory';
import { getShortCategoryDescription } from '../getShortCategoryDescription';
import { LLMLogger } from '../llmLogger';
import { Logger } from '../logger';
import {
  createContextualRewritePrompt,
  createMinimalTransformationPrompt,
} from '../prompt';
import { TextHelpers } from '../textHelpers';
import { removeCodeWrappers } from '../utils';

export interface CategorizedQuestion {
  originalQuestion: string;
  transformedQuestion: string;
  searchQuery: string;
  detectedCategory: Category;
  category: Category;
  sourceFilter: {
    pattern: string;
    rule: 'ilike' | 'not ilike';
  } | null;
  searchLimit: number;
  logIds: (string | undefined)[];
}

export class QuestionTransformer {
  private static isQuestionSelfContained(
    question: string,
    history?: string[],
  ): boolean {
    const trimmedQuestion = question?.trim().toLowerCase();

    if (!history || history?.length === 0) {
      return true;
    }

    const hasAmbiguousReferences =
      trimmedQuestion.includes('него') ||
      trimmedQuestion.includes('нем') ||
      trimmedQuestion.includes('нему') ||
      trimmedQuestion.includes('этом') ||
      trimmedQuestion.includes('этому') ||
      trimmedQuestion.includes('тот') ||
      trimmedQuestion.includes('та') ||
      trimmedQuestion.includes('то') ||
      trimmedQuestion.includes('он') ||
      trimmedQuestion.includes('она') ||
      trimmedQuestion.includes('оно') ||
      trimmedQuestion.includes('они') ||
      trimmedQuestion.includes('ты') ||
      trimmedQuestion.includes('вы') ||
      trimmedQuestion.includes('вас') ||
      trimmedQuestion.includes('тебя') ||
      trimmedQuestion.includes('ему') ||
      trimmedQuestion.includes('им') ||
      trimmedQuestion.includes('ими');

    return !hasAmbiguousReferences;
  }

  static async transformQuestion({
    question,
    history,
    dialogId,
    messageId,
  }: {
    dialogId: string | undefined;
    messageId: string | undefined;
    question: string;
    history: string[];
  }): Promise<CategorizedQuestion> {
    Logger.logInfo('Transforming question', { originalQuestion: question });

    const detectCategoryResult = await this.detectCategory({
      text: question,
      history,
      dialogId,
      messageId,
    });

    let detectedCategory = detectCategoryResult.category;

    if (
      dialogId &&
      (detectedCategory === Category.clarification ||
        detectedCategory === Category.followup)
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

    const category = getCategoryByDetectedCategory(detectedCategory);
    const sourceFilter = this.getSourceFilterByCategory(category);

    const isSelfContained = this.isQuestionSelfContained(question, history);

    const transformWithLLMQuestion = await this.transformWithLLM({
      question,
      category: detectedCategory,
      history,
      isSelfContained,
      dialogId,
      messageId,
    });

    const transformedQuestion =
      transformWithLLMQuestion.question?.trim() || question.trim();
    const searchQuery = TextHelpers.normalizeTextMy(transformedQuestion);

    Logger.logInfo('Question transformation completed', {
      original: question,
      transformedQuestion,
      searchQuery,
      category,
      detectedCategory,
      sourceFilter,
    });

    return {
      detectedCategory,
      originalQuestion: question,
      transformedQuestion,
      searchQuery,
      logIds: [transformWithLLMQuestion.logId, detectCategoryResult.logId],
      category,
      sourceFilter,
      searchLimit:
        category === Category.telegram
          ? RAG_SEARCH_CONFIG.TELEGRAM_SEARCH_LIMIT
          : RAG_SEARCH_CONFIG.GLOBAL_SEARCH_LIMIT,
    };
  }

  private static getSourceFilterByCategory(
    category: Category,
  ): { pattern: string; rule: 'ilike' | 'not ilike' } | null {
    switch (category) {
      case Category.resume:
        return { pattern: '%/resume/%', rule: 'ilike' };

      case Category.portfolio:
        return { pattern: '%/portfolio/%', rule: 'ilike' };

      case Category.articles:
        return { pattern: '%/articles/%', rule: 'ilike' };

      case Category.telegram:
        return { pattern: '%/telegram/%', rule: 'ilike' };

      case Category.none:
      case Category.spam:
      case Category.gratitude:
        return null;

      default:
        return null;
    }
  }

  @Trace()
  private static async transformWithLLM({
    question,
    category,
    history,
    isSelfContained = true,
    dialogId,
    messageId,
  }: {
    dialogId: string | undefined;
    messageId: string | undefined;
    question: string;
    category: Category;
    history: string[];
    isSelfContained?: boolean;
  }) {
    const prompt = !isSelfContained
      ? createMinimalTransformationPrompt({ question, category, history })
      : createContextualRewritePrompt({ question, category, history });

    addPayloadToTrace({ isSelfContained });

    try {
      const { content: transformed, logId } = await LLMLogger.callWithLogging({
        prompt,
        metadata: {
          operation: 'question_transformation',
          category,
        },
        dialogId,
        messageId,
      });

      if (!transformed || transformed.includes('[ERROR]')) {
        Logger.logInfo('LLM transformation failed, using original question', {
          original: question,
          transformed,
        });
        return { question, logId };
      }

      return { question: transformed, logId };
    } catch (error) {
      Logger.logError(
        'Error transforming question with LLM',
        {
          error: (error as Error).message,
          question,
        },
        (error as Error).stack,
      );
      if (
        (error as any).code === 'RATE_LIMIT_EXCEEDED' ||
        error.message?.includes('429')
      ) {
        throw error;
      }
      return { question, logId: undefined };
    }
  }

  @Trace()
  private static async detectCategory({
    text,
    history,
    dialogId,
    messageId,
  }: {
    dialogId: string | undefined;
    messageId: string | undefined;
    text: string;
    history: string[];
  }) {
    const prompt = getConstant(
      GetConstantKey.QuestionTransformer_transformQuestion_3,
      {
        categoryList: TextHelpers.concat(
          Object.keys(Category)
            .filter((key) => key != Category.telegram)
            .map(
              (key) =>
                `- ${key} — ${getShortCategoryDescription(key as Category)}`,
            ),
        ),
        history: removeCodeWrappers(TextHelpers.concat(history)),
        text: text,
      },
    );

    try {
      const { content: reconstructed, logId } = await LLMLogger.callWithLogging(
        {
          prompt,
          metadata: {
            operation: 'question_type_detection',
          },
          dialogId,
          messageId,
        },
      );

      if (!reconstructed || reconstructed.includes('[ERROR]')) {
        Logger.logInfo('Question type detection failed, using fallback', {
          original: text,
        });
        return { category: Category.none, logId };
      }

      if (Object.values(Category).includes(reconstructed as Category)) {
        return { category: reconstructed as Category, logId };
      }
    } catch (error) {
      if (
        (error as any).code === 'RATE_LIMIT_EXCEEDED' ||
        error.message?.includes('429')
      ) {
        throw error;
      }
      Logger.logError('Error detecting question type', {
        error: (error as Error).message,
        text,
      });
    }
    return { category: Category.none, logId: undefined };
  }
}
