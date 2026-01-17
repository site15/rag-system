// questionTransformer.ts
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { CATEGORY, RAG_SEARCH_CONFIG } from '../constants';
import { DialogManager } from '../dialogManager';
import { getCategoryByDetectedCategory } from '../getCategoryByDetectedCategory';
import { LLMLogger } from '../llmLogger';
import { Logger } from '../logger';
import {
  createContextualRewritePrompt,
  createMinimalTransformationPrompt,
} from '../prompt';

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
    llm,
    history,
    provider,
    dialogId,
    messageId,
  }: {
    dialogId: string | undefined;
    messageId: string | undefined;
    question: string;
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    history: string[];
    provider: string;
  }): Promise<CategorizedQuestion> {
    Logger.logInfo('Transforming question', { originalQuestion: question });

    // If we can determine a category from the question itself, apply appropriate filter
    let sourceFilter = null;

    const detectCategoryResult = await this.detectCategory({
      llm,
      text: question,
      history,
      provider,
      dialogId,
      messageId,
    });

    let detectedCategory = detectCategoryResult.category;

    if (
      dialogId &&
      (detectedCategory === Category.clarification ||
        detectedCategory === Category.followup)
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

    let category = getCategoryByDetectedCategory(detectedCategory);

    if (category) {
      sourceFilter = this.getSourceFilterByCategory(category);
    }

    // For regular questions, determine if contextual rewriting is needed
    const isSelfContained = this.isQuestionSelfContained(question, history);

    // Transform the question using appropriate method
    const transformedQuestion = await this.transformWithLLM({
      question,
      llm,
      category: detectedCategory,
      history,
      isSelfContained,
      provider,
      dialogId,
      messageId,
    });

    const transformedEmbedded1 = await this.transformToEmbeddedWithLLM({
      question,
      llm,
      category,
      provider,
      dialogId,
      messageId,
      prompt: `Ты — переписчик пользовательских запросов для entity-based semantic search.

Документы — это короткие сообщения, реплики или утверждения автора.
Поиск осуществляется по факту упоминания или позиции, а не по объяснениям.

Твоя задача — привести вопрос к КОРОТКОМУ поисковому якорю, чтобы:
- смысл и цель НЕ изменялись;
- результат был одной строкой;
- остались только ключевые сущности и термины;
- были удалены вопросы, уточнения, вводные слова и эмоции.

СТРОГО ЗАПРЕЩЕНО:
- добавлять слова "пример", "как", "почему", "стоит ли", "использовать";
- добавлять глаголы действий;
- формировать исследовательские или обучающие формулировки.

КРИТИЧЕСКИ ВАЖНО:
- основной термин БЕРИ из истории переписки;
- если есть альтернативное написание (eng/ru),
  добавь его В КОНЕЦ строки через запятую;
- НЕ заменяй основной термин альтернативным.

Формат:
- одна строка;
- существительные или устойчивые термины;
- допускается перечисление через запятую;
- без пояснений.

ИСТОРИЯ ПЕРЕПИСКИ:
${(history || []).join('\n')}

Входной вопрос:
${question}

Результат:`,
    });

    const transformedEmbedded2 = await this.transformToEmbeddedWithLLM({
      question,
      llm,
      category,
      provider,
      dialogId,
      messageId,
      prompt: `Ты — переписчик пользовательских запросов для action-based semantic search.

Документы — это статьи или развёрнутые сообщения,
где автор описывает применение, опыт или реализацию.

Твоя задача — минимально восстановить поисковый запрос так, чтобы:
- смысл вопроса НЕ изменился;
- результат был одной строкой;
- в формулировке ПРИСУТСТВОВАЛО действие или аспект использования;
- формулировка оставалась нейтральной и краткой.

РАЗРЕШЕНО:
- использовать слова: "пример", "использование", "реализация", "применение";
- восстанавливать ТОЛЬКО action-based уточнения ("например?", "как используется?", "как реализовано?")

КРИТИЧЕСКИ ВАЖНО:
- основной термин БЕРИ из истории переписки;
- если есть альтернативное написание (eng/ru),
  добавь его В КОНЕЦ строки через запятую;
- НЕ добавляй новых фактов или оценок.

Формат:
- одна строка;
- действие + объект;
- без пояснений и кавычек.

ИСТОРИЯ ПЕРЕПИСКИ:
${(history || []).join('\n')}

Входной вопрос:
${question}

Результат:`,
    });

    Logger.logInfo('Question transformation completed', {
      original: question,
      transformedQuestion,
      transformedEmbedded: transformedEmbedded1.question,
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
        transformedEmbedded1.logId,
        transformedEmbedded2.logId,
        detectCategoryResult.logId,
      ],
      transformedEmbedded: `${transformedEmbedded1.question}, ${transformedEmbedded2.question}`,
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
  private static async transformWithLLM({
    question,
    llm,
    category,
    history,
    isSelfContained = true,
    provider,
    dialogId,
    messageId,
  }: {
    dialogId: string | undefined;
    messageId: string | undefined;
    question: string;
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    category: Category;
    history: string[];
    isSelfContained?: boolean;
    provider: string;
  }) {
    // Create a prompt to help the LLM understand and rephrase the question
    const prompt = !isSelfContained
      ? createMinimalTransformationPrompt({ question, category, history })
      : createContextualRewritePrompt({ question, category, history });

    try {
      const { content: transformed, logId } = await LLMLogger.callWithLogging({
        provider,
        llm,
        prompt,
        metadata: {
          operation: 'question_transformation',
          category,
        },
        dialogId,
        messageId,
        callback: (prompt) =>
          llm
            .invoke(prompt)
            .then(async (result) =>
              typeof result === 'string' ? result.trim() : result,
            ),
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
        error.message?.includes('403')
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
  private static async transformToEmbeddedWithLLM({
    question,
    llm,
    category,
    provider,
    dialogId,
    messageId,
    prompt,
  }: {
    dialogId: string | undefined;
    messageId: string | undefined;
    question: string;
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    category: Category;
    provider: string;
    prompt: string;
  }) {
    try {
      const { content: transformed, logId } = await LLMLogger.callWithLogging({
        provider,
        llm,
        prompt,
        metadata: {
          operation: 'question_embedded_transformation',
          category,
        },
        dialogId,
        messageId,
        callback: (prompt) =>
          llm
            .invoke(prompt)
            .then(async (result) =>
              typeof result === 'string' ? result.trim() : result,
            ),
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
        return { question, logId };
      }

      return { question: transformed, logId };
    } catch (error) {
      Logger.logError(
        'Error transforming question with LLM',
        { error: (error as Error).message, question },
        (error as Error).stack,
      );
      if (
        (error as any).code === 'RATE_LIMIT_EXCEEDED' ||
        error.message?.includes('403')
      ) {
        throw error;
      }
      return { question, logId: undefined };
    }
  }

  private static async detectCategory({
    llm,
    text,
    history,
    provider,
    dialogId,
    messageId,
  }: {
    dialogId: string | undefined;
    messageId: string | undefined;
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    text: string;
    history?: string[];
    provider: string;
  }) {
    const prompt = `Ты — классификатор пользовательских запросов.

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
${Object.entries(CATEGORY)
  .map(([key, value]) => `- ${key} — ${value}`)
  .join('\n')}

Очень важно:
- выводи строго одно слово из списка типов;
- не добавляй пояснений;
- если текст является коротким уточнением (например: "почему?", "как?", "в смысле?", "что именно?") и имеет смысл ТОЛЬКО в контексте предыдущего ответа — выбирай clarification;
- используй только нижний регистр.

Вход:
ИСТОРИЯ ПЕРЕПИСКИ (для понимания намерения):
${(history || []).join('\n')}

Текст для классификации:
${text}

Вывод:`;

    try {
      const { content: reconstructed, logId } = await LLMLogger.callWithLogging(
        {
          provider,
          llm,
          prompt,
          metadata: {
            operation: 'question_type_detection',
          },
          dialogId,
          messageId,
          callback: (prompt) =>
            llm
              .invoke(prompt)
              .then(async (result) =>
                typeof result === 'string' ? result.trim() : result,
              ),
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
        error.message?.includes('403')
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
