// questionTransformer.ts
import { addPayloadToTrace, Trace } from '../../trace/trace.module';
import { getConstant, GetConstantKey } from '../../utils/get-constant';
import { RAG_SEARCH_CONFIG } from '../constants';
import { DialogManager } from '../dialogManager';
import { getCategoryByDetectedCategory } from '../getCategoryByDetectedCategory';
import { getShortCategoryDescription } from '../getShortCategoryDescription';
import { LLMFactory } from '../llmFactory';
import { LLMLogger } from '../llmLogger';
import { Logger } from '../logger';
import {
  createContextualRewritePrompt,
  createMinimalTransformationPrompt,
} from '../prompt';
import { TextHelpers } from '../textHelpers';
import { removeCodeWrappers } from '../utils';

export enum Category {
  telegram = 'telegram',
  /**
   *  рекламные, массовые или нерелевантные сообщения;
   */
  spam = 'spam',
  /**
   * предложения о работе на полный рабочий день (штат, фултайм, постоянная занятость);
   */
  job = 'job',
  /**
   * предложения о частичной, проектной или почасовой работе, фриланс-контракты;
   */
  freelance = 'freelance',
  /**
   * запросы на консультации, менторство, разовые созвоны, аудит, экспертную помощь за деньги;
   */
  consulting = 'consulting',
  /**
   * вопросы о стоимости услуг, рейтах, бюджете, условиях оплаты;
   */
  pricing = 'pricing',
  /**
   * предложения о партнёрстве, совместных проектах, стартапах;
   */
  partnership = 'partnership',
  /**
   * инвестиционные предложения, поиск инвестора или предложение инвестиций;
   */
  investment = 'investment',
  /**
   * вопросы о найме, формировании или усилении команды;
   */
  hiring = 'hiring',
  /**
   * вопросы о собеседованиях, подготовке к ним, оценке кандидатов;
   */
  interview = 'interview',
  /**
   * приглашения на выступления, подкасты, стримы, митапы, конференции;
   */
  speaking = 'speaking',
  /**
   * запросы на интервью, статьи, комментарии для СМИ;
   */
  media = 'media',
  /**
   * просьбы помочь с конкретной технической проблемой, багом, ошибкой;
   */
  support = 'support',
  /**
   * запросы на ревью кода, архитектуры, ТЗ, идей;
   */
  review = 'review',
  /**
   * помощь с выбором технологии, инструмента, подхода или решения;
   */
  decision = 'decision',
  /**
   * вопросы о продукте, сервисе или платформе, которые я создал;
   */
  product = 'product',
  /**
   * просьбы о доступе: демо, бета, репозиторий, курс;
   */
  access = 'access',
  /**
   * вопросы о моём профессиональном опыте, навыках, местах работы, технологиях, профессиональных умениях;
   */
  resume = 'resume',
  /**
   * вопросы о моих проектах, результатах, метриках, реализованных решениях, в том числе ИИ-решениях;
   */
  portfolio = 'portfolio',
  /**
   * запросы на объяснения, руководства, разборы, инструкции, обучающие материалы;
   */
  articles = 'articles',
  /**
   * вопросы о личной жизни, хобби, личных интересах и предпочтениях, в том числе в искусстве;
   */
  life = 'life',
  /**
   * запросы на знакомство, рекомендацию или интро;
   */
  intro = 'intro',
  /**
   * продолжение предыдущего диалога без нового запроса;
   */
  followup = 'followup',
  /**
   * благодарности без запроса
   */
  gratitude = 'gratitude',
  /**
   * уточняющие вопросы к предыдущему ответу;
   */
  clarification = 'clarification',
  /**
   * всё остальное
   */
  none = 'none',
  /**
   * вопросы или упоминания технологий, инструментов, фреймворков, языков программирования, архитектурных паттернов и технических терминов без явного запроса на инструкцию, помощь, выбор или решение проблемы, примеры: event sourcing, cqrs, kubernetes, nestjs, grpc
   */
  technology = 'technology',
}

export interface CategorizedQuestion {
  originalQuestion: string;
  transformedQuestion: string;
  transformedEmbedded: string;
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
  /**
   * Check if a question is self-contained (doesn't need context resolution)
   */
  private static isQuestionSelfContained(
    question: string,
    history?: string[],
  ): boolean {
    const trimmedQuestion = question?.trim().toLowerCase();

    // If there's no history, question is self-contained by definition
    if (!history || history?.length === 0) {
      return true;
    }

    // Check for pronouns and ambiguous references that need context
    const hasAmbiguousReferences =
      trimmedQuestion.includes('него') ||
      trimmedQuestion.includes('нем') ||
      trimmedQuestion.includes('нему') ||
      trimmedQuestion.includes('него') ||
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

    // If the question contains ambiguous references, it's not self-contained
    return !hasAmbiguousReferences;
  }

  /**
   * Transform the incoming question to be better understood by the neural network
   * and categorize it based on document source types
   */
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
  }): Promise<CategorizedQuestion | undefined> {
    Logger.logInfo('Transforming question', { originalQuestion: question });

    // If we can determine a category from the question itself, apply appropriate filter
    let sourceFilter = null;

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
      Logger.logInfo('Last history item', lastHistoryItem);

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
        /**
         * Если слишком много уточнений, то меняем категорию на resume
         */
        detectedCategory = Category.resume;
      }
    }

    let category = getCategoryByDetectedCategory(detectedCategory);

    if (category) {
      sourceFilter = this.getSourceFilterByCategory(category);
    }

    // For regular questions, determine if contextual rewriting is needed
    const isSelfContained = this.isQuestionSelfContained(question, history);

    const [transformedQuestion, transformedEmbeddedActionBased] =
      await Promise.all([
        this.transformWithLLM({
          question,
          category: detectedCategory,
          history,
          isSelfContained,
          dialogId,
          messageId,
        }),
        this.transformToEmbeddedWithLLM({
          question,
          category,
          dialogId,
          messageId,
          prompt: getConstant(
            GetConstantKey.QuestionTransformer_transformQuestion_1,
            {
              history: removeCodeWrappers(TextHelpers.concat(history)),
              question: question,
            },
          ),
        }),
      ]);

    Logger.logInfo('Question transformation completed', {
      original: question,
      transformedQuestion,
      transformedEmbedded: transformedEmbeddedActionBased.result,
      category,
      detectedCategory,
      sourceFilter,
    });
    if (
      !transformedQuestion.question ||
      !transformedEmbeddedActionBased.result?.actionBased ||
      !transformedEmbeddedActionBased.result?.actionBased
    ) {
      return undefined;
    }
    return {
      detectedCategory,
      originalQuestion: question,
      transformedQuestion: transformedQuestion.question,
      logIds: [
        transformedQuestion.logId,
        transformedEmbeddedActionBased.logId,
        detectCategoryResult.logId,
      ],
      transformedEmbedded: getConstant(
        GetConstantKey.QuestionTransformer_transformQuestion_2,
        transformedEmbeddedActionBased.result,
      ),
      category,
      sourceFilter,
      searchLimit:
        category === Category.telegram
          ? RAG_SEARCH_CONFIG.TELEGRAM_SEARCH_LIMIT
          : RAG_SEARCH_CONFIG.GLOBAL_SEARCH_LIMIT,
    };
  }

  /**
   * Get the appropriate source filter based on the category
   */
  private static getSourceFilterByCategory(category: Category): {
    pattern: string;
    rule: 'ilike' | 'not ilike';
  } {
    switch (category) {
      case 'resume':
        // For resume, we might want to exclude telegram messages and focus on structured documents
        return { pattern: '%/resume/%', rule: 'ilike' };

      case 'portfolio':
        // For portfolio, look for project-related documents
        return { pattern: '%/portfolio/%', rule: 'ilike' };

      case 'articles':
        // For articles, look for blog posts, articles, etc.
        return { pattern: '%/articles/%', rule: 'ilike' };

      case 'telegram':
        // For telegram chats, look specifically for telegram message files
        return { pattern: '%/telegram/%', rule: 'ilike' };

      case 'none':
        // For telegram chats, look specifically for telegram message files
        return { pattern: '%/telegram/%', rule: 'ilike' };

      default:
        return { pattern: '%', rule: 'ilike' }; // Match all
    }
  }

  /**
   * Transform the question using LLM to make it more specific and better understood
   */
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
    // Create a prompt to help the LLM understand and rephrase the question
    const prompt = !isSelfContained
      ? createMinimalTransformationPrompt({ question, category, history })
      : createContextualRewritePrompt({ question, category, history });

    addPayloadToTrace({
      isSelfContained,
    });

    try {
      const { content: transformed, logId } = await LLMLogger.callWithLogging({
        prompt,
        metadata: {
          operation: 'question_transformation',
          category,
        },
        dialogId,
        messageId,
        callback: (prompt) => LLMFactory.invoke(prompt),
      });

      // If the transformation result seems invalid (empty, same as original, or an error), return the original
      if (!transformed || transformed.includes('[ERROR]')) {
        Logger.logInfo('LLM transformation failed, using original question', {
          original: question,
          transformed: transformed,
        });
        return { question: undefined, logId };
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
      // Return original question if transformation fails
      return { question: undefined, logId: undefined };
    }
  }

  /**
   * Transform the question using LLM to make it more specific and better understood
   */
  @Trace()
  private static async transformToEmbeddedWithLLM({
    question,
    category,
    dialogId,
    messageId,
    prompt,
  }: {
    dialogId: string | undefined;
    messageId: string | undefined;
    question: string;
    category: Category;
    prompt: string;
  }): Promise<{
    result: {
      actionBased?: string;
      entityBased?: string;
    };
    logId?: string;
  }> {
    try {
      const { content: transformed, logId } = await LLMLogger.callWithLogging({
        prompt,
        metadata: {
          operation: 'question_embedded_transformation',
          category,
        },
        dialogId,
        messageId,
        callback: (prompt) => LLMFactory.invoke(prompt),
      });

      Logger.logInfo('LLM transformation successful', {
        original: question,
        transformed,
      });

      // Возвращаем оригинальный вопрос, если результат пустой или некорректный
      if (
        !transformed ||
        (typeof transformed === 'string' && transformed?.includes('[ERROR]'))
      ) {
        Logger.logInfo('LLM transformation failed, using original question', {
          original: question,
          transformed,
        });
        return {
          result: {
            actionBased: undefined,
            entityBased: undefined,
          },
          logId,
        };
      }

      try {
        return {
          result:
            typeof transformed === 'string'
              ? JSON.parse(
                  transformed.replace('```json', '').replace('```', ''),
                )
              : transformed,
          logId,
        };
      } catch (error) {
        return {
          result: {
            actionBased: undefined,
            entityBased: undefined,
          },
          logId,
        };
      }
    } catch (error) {
      Logger.logError(
        'Error transforming question with LLM',
        { error: (error as Error).message, question },
        (error as Error).stack,
      );
      if (
        (error as any).code === 'RATE_LIMIT_EXCEEDED' ||
        error.message?.includes('429')
      ) {
        throw error;
      }
      return {
        result: {
          actionBased: undefined,
          entityBased: undefined,
        },
        logId: undefined,
      };
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
          callback: (prompt) => LLMFactory.invoke(prompt),
        },
      );

      // If reconstruction fails, return a simple fallback
      if (!reconstructed || reconstructed.includes('[ERROR]')) {
        Logger.logInfo('Question type detection failed, using fallback', {
          original: text,
        });
        return { category: Category.none, logId }; // Return original if no good heuristic
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
