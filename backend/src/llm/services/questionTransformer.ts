// questionTransformer.ts
import Mustache from 'mustache';
import { addPayloadToTrace, Trace } from '../../trace/trace.module';
import { CATEGORY, RAG_SEARCH_CONFIG } from '../constants';
import { DialogManager } from '../dialogManager';
import { getCategoryByDetectedCategory } from '../getCategoryByDetectedCategory';
import { LLMFactory } from '../llmFactory';
import { LLMLogger } from '../llmLogger';
import { Logger } from '../logger';
import {
  createContextualRewritePrompt,
  createMinimalTransformationPrompt,
} from '../prompt';
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
    const trimmedQuestion = question.trim().toLowerCase();

    // If there's no history, question is self-contained by definition
    if (!history || history.length === 0) {
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
  }): Promise<CategorizedQuestion> {
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
          prompt: Mustache.render(
            `Ты — переписчик пользовательских запросов для semantic search.
Ты работаешь в ДВУХ РЕЖИМАХ ОДНОВРЕМЕННО: entity-based и action-based.

Твоя задача — на основе контекста диалога и входного вопроса:
1. Извлечь ИМЯ СУЩНОСТИ (entity-based)
2. Сформировать ПОИСКОВЫЙ ЗАПРОС ОБ ОПЫТЕ ИСПОЛЬЗОВАНИЯ (action-based)

Ты НИКОГДА не отвечаешь на вопрос пользователя.
Ты ТОЛЬКО готовишь поисковые якоря.

────────────────────
ENTITY-BASED ПРАВИЛА:
────────────────────
1. Результат — ТОЛЬКО имена сущностей (существительные, термины, технологии)
2. НИКОГДА не добавляй:
   - годы
   - даты
   - числа
   - версии
   - места
   - временные периоды
3. Не используй:
   - глаголы
   - предлоги
   - местоимения
4. Для вопросов:
   - "когда?"
   - "в каком году?"
   - "где?"
   - "какой?"
   результат ВСЕГДА — ТОЛЬКО имя сущности

Пример:
Контекст: "Использовал NestJS"
Вопрос: "в каком году?"
entity-based → "nestjs"

────────────────────
ACTION-BASED ПРАВИЛА:
────────────────────
1. Результат — "ДЕЙСТВИЕ + СУЩНОСТЬ"
2. Разрешённые действия (ТОЛЬКО ОНИ):
   - использование
   - применение
   - опыт
   - пример
   - реализация
3. НИКОГДА не добавляй:
   - годы
   - даты
   - числа
   - места
   - временные периоды
4. Не отвечай на вопрос — ищи ДОКУМЕНТЫ ОБ ОПЫТЕ

Правила сопоставления вопросов:
- "когда?" / "в каком году?" → "использование [сущность]" или "опыт [сущность]"
- "где?" → "применение [сущность]"
- "какой?" → "опыт [сущность]"

Пример:
Контекст: "Использовал NestJS"
Вопрос: "в каком году?"
action-based → "опыт nestjs"

────────────────────
ФОРМАТ ВЫХОДА (СТРОГО):
────────────────────
- Всегда возвращай JSON
- Всегда два поля
- Строчными буквами
- Без пояснений
- Без лишних символов

Формат:
{
  "actionBased": "<сущность>",
  "entityBased": "<действие + сущность>"
}

────────────────────
Контекст диалога:
{{history}}

Вопрос пользователя:
{{question}}

Результат:`,
            {
              history: removeCodeWrappers((history || []).join('\n')),
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

    return {
      detectedCategory,
      originalQuestion: question,
      transformedQuestion: transformedQuestion.question,
      logIds: [
        transformedQuestion.logId,
        transformedEmbeddedActionBased.logId,
        detectCategoryResult.logId,
      ],
      transformedEmbedded: Mustache.render(
        `{{actionBased}}, {{entityBased}}`,
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
      if (
        !transformed ||
        transformed === question ||
        transformed.includes('[ERROR]')
      ) {
        Logger.logInfo('LLM transformation failed, using original question', {
          original: question,
          transformed: transformed,
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
      // Return original question if transformation fails
      return { question, logId: undefined };
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
  }) {
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

      // Возвращаем оригинальный вопрос, если результат пустой или некорректный
      if (
        !transformed ||
        transformed === question ||
        transformed.includes('[ERROR]')
      ) {
        Logger.logInfo('LLM transformation failed, using original question', {
          original: question,
          transformed,
        });
        return {
          result: {
            actionBased: question,
            entityBased: question,
          },
          logId,
        };
      }

      try {
        return {
          result: JSON.parse(
            transformed.replace('```json', '').replace('```', ''),
          ),
          logId,
        };
      } catch (error) {
        return {
          result: {
            actionBased: question,
            entityBased: question,
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
          actionBased: question,
          entityBased: question,
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
    const prompt = Mustache.render(
      `Ты — классификатор пользовательских запросов.

Определи, **к какому типу данных относится корректный ответ на этот текст**, а не тип самого текста.

Если запрос подходит под несколько типов, **выбирай тип с более высоким приоритетом**.
Правило: если текст является **вопросом**, он **не может** быть job, freelance, partnership или investment без явного предложения или оффера.
Правило: вопросы про деньги, зарплату, компенсацию или рейты → pricing, если нет оффера или описания вакансии.

Приоритеты (от высокого к низкому):
1. spam
2. job
3. freelance
4. consulting
5. pricing
6. partnership
7. investment
8. hiring
9. interview
10. speaking
11. media
12. support
13. review
14. decision
15. technology
16. product
17. access
18. resume
19. portfolio
20. articles
21. life
22. intro
23. followup
24. gratitude
25. clarification
26. none

Типы:
{{categoryList}}

Очень важно:
- выводи строго одно слово из списка типов;
- не добавляй пояснений;
- если текст является коротким уточнением (например: "почему?", "как?", "в смысле?", "что именно?")и не содержит названий технологий, продуктов или предметных сущностей, и имеет смысл ТОЛЬКО в контексте предыдущего ответа — выбирай clarification;
- используй только нижний регистр;

Вход:
ИСТОРИЯ ПЕРЕПИСКИ (для понимания намерения):
\`\`\`
{{history}}
\`\`\` 

Текст для классификации:
{{text}}

Вывод:`,
      {
        categoryList: Object.entries(CATEGORY)
          .map(([key, value]) => `- ${key} — ${value}`)
          .join('\n'),
        history: removeCodeWrappers((history || []).join('\n')),
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
