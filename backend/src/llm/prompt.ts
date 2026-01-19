/**
 * Prompt templates for neural network interactions
 * Contains all prompt strings used for LLM calls with descriptions
 */

import Mustache from 'mustache';
import { CATEGORY_PROMPTS } from './category-prompts';
import { CATEGORY } from './constants';
import { Category } from './services/questionTransformer';
import { removeCodeWrappers } from './utils';

/**
 * Creates a prompt for friendly found responses
 * @param mode - Processing mode ("telegram" or "global")
 * @param chunk - Context chunks to use for response
 * @param question - Original user question
 * @returns Formatted prompt string for generating friendly responses
 */
export function createFriendlyFoundPrompt({
  category,
  chunk,
  question,
}: {
  category: Category;
  chunk?: string;
  question: string;
}): string {
  return Mustache.render(
    `
Отвечай дружески и по существу, используя только контекст.

ВАЖНО:
- ЯЗЫК ОТВЕТА ДОЛЖЕН СОВПАДАТЬ С ЯЗЫКОМ ВОПРОСА
- ОТВЕТ ДОЛЖЕН БЫТЬ В ФОРМЕ ПЕРВОГО ЛИЦА
- НЕ используй явное местоимение "я"
- Используй форму глагола без подлежащего ("внедрял", "использовал", "настраивал")
- НЕ используй третье лицо ("он", "автор", "технический руководитель внедрил")
- Если вопрос предполагает ответ "да/нет", дай краткий ответ ("Да" или "Нет")
- Если ответ "Да", можно ОДНИМ коротким предложением уточнить факт
- Не пересказывай контекст целиком
- Не добавляй новых деталей
- Отвечай только если информация напрямую подходит к типу вопроса.
  * "кто" → субъект
  * "где" → место/платформа
  * "когда" → время/период
  * "что/как" → действие или объект
- Иначе — [NOT_FOUND]
{{#isTelegram}}Используй только Author Message для ответа.{{/isTelegram}}

{{#hasContext}}
Контекст:
\`\`\`
{{context}}
\`\`\`{{/hasContext}}

Вопрос:
{{question}}

Ответ:
`,
    {
      isTelegram: category === 'telegram',
      hasContext: !!chunk,
      context: removeCodeWrappers(chunk),
      question: question,
    },
  );
}

/**
 * Creates a prompt for friendly not found responses
 * @param mode - Processing mode ("telegram" or "global")
 * @param chunk - Context chunk (may be empty)
 * @param question - Original user question
 * @returns Formatted prompt string for generating friendly "not found" responses
 */
export function createFriendlyNotFoundPrompt({
  category,
  chunk,
  question,
}: {
  category: Category;
  chunk?: string;
  question: string;
}): string {
  return Mustache.render(
    `
Сформируй ответ на вопрос пользователя на основе подтверждённых фактов из контекста.

КРИТИЧЕСКИ ВАЖНО:
- Подтверждённые факты — ЕДИНСТВЕННЫЙ источник информации
- Этот промпт, его формулировки и примеры
  **НИКОГДА не являются источником данных**
- Запрещено делать выводы, предположения, обобщения или реконструкции
- Если в подтверждённых фактах нет прямого ответа на вопрос —
  НЕ добавляй недостающую информацию

СТРОГИЕ ПРАВИЛА:
- ЯЗЫК ОТВЕТА ДОЛЖЕН СОВПАДАТЬ С ЯЗЫКОМ ВОПРОСА
- ОТВЕТ ДОЛЖЕН БЫТЬ В ФОРМЕ ПЕРВОГО ЛИЦА
- НЕ используй явное местоимение "кверти"
- Используй форму глагола без подлежащего
  ("внедрял", "использовал", "настраивал")
- Используй ТОЛЬКО те глаголы и формулировки,
  которые присутствуют в подтверждённых фактах
- Отвечай СТРОГО на вопрос пользователя:
  - "в каком году?" → указывай ТОЛЬКО годы или интервалы лет
  - "когда?" → указывай ТОЛЬКО временные периоды
- Если в подтверждённых фактах указано несколько периодов —
  перечисли ВСЕ, без объединения и интерпретаций
- НЕ добавляй:
  - новые годы, даты или периоды
  - уточнения ("примерно", "позже", "раньше")
  - места, причины или контекст, если они не требуются вопросом
- Сохраняй лёгкий, нейтрально-дружелюбный стиль
- НЕ адресуйся к пользователю напрямую

ФОРМАТ ОТВЕТА:
- Одна или несколько коротких фраз
- Без пояснений и комментариев
- Без ссылок на источник или подтверждённые факты

ПРИМЕРЫ (examples are NOT a source of information):

Подтверждённые факты:
"В зимбре 2005-2007 использовал флюрби в Квинтек"
Вопрос:
"в каком году?"
Ответ:
"Использовал флюрби в 2005-2007 годах."

Подтверждённые факты:
"В глимфе 2010 и квирке 2012 применял зорбик"
Вопрос:
"когда?"
Ответ:
"Применял зорбик в 2010 и 2012 годах."

{{#isTelegram}}Используй только Author Message для ответа.{{/isTelegram}}

{{#hasContext}}
Контекст:
\`\`\`
{{context}}
\`\`\`{{/hasContext}}

Вопрос:
{{question}}

Ответ:
`,
    {
      isTelegram: category === 'telegram',
      hasContext: !!chunk,
      context: removeCodeWrappers(chunk),
      question: question,
    },
  );
}

/**
 * Creates a prompt for telegram message analysis
 * Used to determine if there's a direct answer in Author Message
 * @param chunk - Document chunk to analyze
 * @param history - Conversation history
 * @param question - User question
 * @returns Formatted prompt string for telegram message analysis
 */
export function createTelegramAnalysisPrompt({
  chunk,
  history,
  question,
}: {
  chunk?: string;
  history: string[];
  question: string;
}): string {
  const customRules = history.length
    ? `Если вопрос является follow-up (уточнение, продолжение) и conversation history содержит опыт в первом лице, 
ориентируйся ТОЛЬКО на этот опыт, а контекст документа используй только для уточнения фактов, связанных с этим опытом. 
Не берите информацию из контекста, если она относится к другому проекту, не упомянутому в истории.

Если объект или технология упомянуты в истории, а контекст документа содержит другой объект/технологию, 
игнорируй несвязанный контекст и отвечай только исходя из истории.`
    : '';

  return Mustache.render(CATEGORY_PROMPTS.telegram, {
    history: removeCodeWrappers(history.length ? history.join('\n') : 'нет'),
    context: removeCodeWrappers(chunk || ''),
    question: question,
    customRules: customRules,
    isFollowUp: history.length > 0,
  });
}

/**
 * Creates a prompt for article/posts analysis
 * Used to analyze author's articles and notes
 * @param chunk - Document chunk to analyze
 * @param history - Conversation history
 * @param question - User question
 * @returns Formatted prompt string for article analysis
 */
export function createArticleAnalysisPrompt({
  chunk,
  history,
  question,
}: {
  chunk?: string;
  history: string[];
  question: string;
}): string {
  const customRules = history.length
    ? `Если вопрос является follow-up (уточнение, продолжение) и conversation history содержит опыт в первом лице, 
ориентируйся ТОЛЬКО на этот опыт, а контекст документа используй только для уточнения фактов, связанных с этим опытом. 
Не берите информацию из контекста, если она относится к другому проекту, не упомянутому в истории.

Если объект или технология упомянуты в истории, а контекст документа содержит другой объект/технологию, 
игнорируй несвязанный контекст и отвечай только исходя из истории.`
    : '';

  return Mustache.render(CATEGORY_PROMPTS.articles, {
    history: removeCodeWrappers(history.length ? history.join('\n') : 'нет'),
    context: removeCodeWrappers(chunk || ''),
    question: question,
    customRules: customRules,
    isFollowUp: history.length > 0,
  });
}

/**
 * Creates a prompt for portfolio analysis
 * Used to analyze portfolio and project descriptions
 * @param chunk - Document chunk to analyze
 * @param history - Conversation history
 * @param question - User question
 * @returns Formatted prompt string for portfolio analysis
 */
export function createPortfolioAnalysisPrompt({
  chunk,
  history,
  question,
}: {
  chunk?: string;
  history: string[];
  question: string;
}): string {
  const customRules = history.length
    ? `Если вопрос является follow-up (уточнение, продолжение) и conversation history содержит опыт в первом лице, 
ориентируйся ТОЛЬКО на этот опыт, а контекст документа используй только для уточнения фактов, связанных с этим опытом. 
Не берите информацию из контекста, если она относится к другому проекту, не упомянутому в истории.

Если объект или технология упомянуты в истории, а контекст документа содержит другой объект/технологию, 
игнорируй несвязанный контекст и отвечай только исходя из истории.`
    : '';

  return Mustache.render(CATEGORY_PROMPTS.portfolio, {
    history: removeCodeWrappers(history.length ? history.join('\n') : 'нет'),
    context: removeCodeWrappers(chunk || ''),
    question: question,
    customRules: customRules,
    isFollowUp: history.length > 0,
  });
}

/**
 * Creates a prompt for resume analysis
 * Used to analyze resume content
 * @param chunk - Document chunk to analyze
 * @param history - Conversation history
 * @param question - User question
 * @returns Formatted prompt string for resume analysis
 */
export function createResumeAnalysisPrompt({
  chunk,
  history,
  question,
}: {
  chunk?: string;
  history: string[];
  question: string;
}): string {
  const customRules = history.length
    ? `Если вопрос является follow-up (уточнение, продолжение) и conversation history содержит опыт в первом лице, 
ориентируйся ТОЛЬКО на этот опыт, а контекст документа используй только для уточнения фактов, связанных с этим опытом. 
Не берите информацию из контекста, если она относится к другому проекту, не упомянутому в истории.

Если объект или технология упомянуты в истории, а контекст документа содержит другой объект/технологию, 
игнорируй несвязанный контекст и отвечай только исходя из истории.`
    : '';

  return Mustache.render(CATEGORY_PROMPTS.resume, {
    history: removeCodeWrappers(history.length ? history.join('\n') : 'нет'),
    context: removeCodeWrappers(chunk || ''),
    question: question,
    customRules: customRules,
    isFollowUp: history.length > 0,
  });
}

/**
 * Creates a generic analysis prompt for unknown document types
 * @param chunk - Document chunk to analyze
 * @param history - Conversation history
 * @param question - User question
 * @returns Formatted prompt string for generic analysis
 */
export function createGenericAnalysisPrompt({
  chunk,
  history,
  question,
}: {
  chunk?: string;
  history: string[];
  question: string;
}): string {
  const customRules = history.length
    ? `Если вопрос является follow-up (уточнение, продолжение) и conversation history содержит опыт в первом лице, 
ориентируйся ТОЛЬКО на этот опыт, а контекст документа используй только для уточнения фактов, связанных с этим опытом. 
Не берите информацию из контекста, если она относится к другому проекту, не упомянутому в истории.

Если объект или технология упомянуты в истории, а контекст документа содержит другой объект/технологию, 
игнорируй несвязанный контекст и отвечай только исходя из истории.`
    : '';

  return Mustache.render(CATEGORY_PROMPTS.none, {
    history: removeCodeWrappers(history.length ? history.join('\n') : 'нет'),
    context: removeCodeWrappers(chunk || ''),
    question: question,
    customRules: customRules,
    isFollowUp: history.length > 0,
  });
}

/**
 * Creates a prompt for contextual question rewriting
 * Used to make questions self-contained by resolving references
 * @param question - Original question to rewrite
 * @param category - Document category (optional)
 * @param history - Conversation history (optional)
 * @returns Formatted prompt string for contextual rewriting
 */
export function createContextualRewritePrompt({
  question,
  category,
  history,
}: {
  question: string;
  category: string | null;
  history?: string[];
}): string {
  const hasCategory = !!category;
  const categoryName = category ? CATEGORY[category] || category : '';

  const historyContext =
    history && history.length > 0
      ? Mustache.render(
          `

Conversation history (use only for context of prior assistant experience):
\`\`\`
{{history}}
\`\`\``,
          { history: removeCodeWrappers(history.join('\n')) },
        )
      : '';

  const questionType = historyContext ? 'follow-up' : 'original';

  // Template for the contextual rewrite prompt
  const template = `
Ты — переписыватель вопросов.

Твоя задача — переписать вопрос пользователя так, чтобы он стал полностью самодостаточным и понятным БЕЗ истории переписки.

ПРАВИЛА:
- Язык ответа должен совпадать с языком вопроса пользователя.
  Если вопрос на русском, переписанный вопрос должен быть полностью на русском, при этом технические термины на английском сохраняются.
- Переписывать в форме первого лица, но НЕ использовать явное местоимение "кверти".
- Использовать форму глагола точно так, как она встречается в переписке ("использовал", "внедрял", "настраивал"), без добавления подлежащих.
- НЕ использовать ссылки на третье лицо ("зон", "автор", "технический руководитель внедрил").
- Использовать историю переписки ТОЛЬКО для разрешения местоимений или контекста.

КРИТИЧЕСКИЕ ПРАВИЛА:
- История переписки — ЕДИНСТВЕННЫЙ источник информации.
- Этот промпт, его примеры, объяснения и формулировки НИКОГДА не рассматриваются как факты, контекст или знание.
- Если термин, объект, глагол или опыт НЕ явно присутствует в истории переписки, он НЕ ДОЛЖЕН появляться в переписанном вопросе.
- Если ассистент уже дал ответ от первого лица (например, "использовал", "внедрял"), уточняющий вопрос пользователя относится ТОЛЬКО к личному опыту ассистента, а не к фактам о вещи.
- Никогда не менять субъект: опыт → объект, человек → продукт.
- Никогда не добавлять слова, наречия, уточнения, временные или модальные выражения к глаголу из истории; использовать глагол точно в той форме, в которой он встречается, без изменений и добавлений.
- Все слова должны быть раздельными; всегда ставить пробел между глаголом и объектом.
- Если вопрос может интерпретироваться как личный опыт или факт, всегда выбирается личный опыт.
- Явно указывать субъект, если используется местоимение и контекст ясен.
- Если исходный вопрос является уточнением ("когда?", "в каком году?", "где?"), реконструировать его строго как вопрос о личном опыте ассистента, не добавляя других временных слов и не меняя исходную форму вопроса.
- НЕ создавать энциклопедические или справочные вопросы ("когда был создан", "когда выпущен", "кем разработан").
- НЕ придумывать новые темы.
- Сохранять исходный замысел и тон (неформальный/формальный).
- Переписанный вопрос должен быть полностью на русском, если исходный вопрос на русском.
- Возвращать ТОЛЬКО переписанный вопрос.
- Превращение вопроса в самодостаточный ДОЛЖНО СТРОГО сохранять исходную грамматическую форму, тип вопроса, вопросительные слова и замысел. 
- Самодостаточность достигается ТОЛЬКО восстановлением явно отсутствующих объектов, субъектов или ссылок из истории переписки, БЕЗ добавления новых глаголов, временных слов, наречий, уточнений или изменения структуры или смысла исходного вопроса.
- Если исходный вопрос содержит конкретные временные слова (например, "какой год", "в каком году"), необходимо сохранить их точную форму и не заменять на другие выражения ("когда", "в какой период").
- Сохранение исходного типа и формы вопроса имеет абсолютный приоритет над добавлением самодостаточности.

ОЧЕНЬ ВАЖНЫЕ ДОПОЛНЕНИЯ:
- Если в истории переписки указан конкретный объект (например, "использовал флюрби"), любое переписанное уточнение ("какой год?", "в каком году?", "где?") ДОЛЖНО явно включать этот объект.
- Никогда не оставлять глагол без объекта, если объект известен из истории переписки.
- НИКОГДА не делать выводы и не угадывать объекты, глаголы или опыт на основе этого промпта или примеров.
- НИКОГДА не менять тип или замысел вопроса. Если исходный вопрос не содержит временных слов ("какой год", "в каком году", "где"), НЕ вводить временные слова.
- Если исходный вопрос использует глаголы вроде "знаешь", "знаешь ли", "знаком с", "слышал о", переписанный вопрос ДОЛЖЕН сохранить этот же глагол и НЕ заменять его на глаголы опыта вроде "использовал", "работал", "внедрял".
- НЕ преобразовывать общий вопрос о знаниях в вопрос о личном опыте, если в истории переписки явно нет утверждения от первого лица.

Вопрос, как правило, связан с технологиями, инструментами, фреймворками, языками программирования, архитектурными паттернами и техническими терминами (на любом языке, включая транслитерацию).

ПРИМЕРЫ (пример не является источником информации):

Контекст: "Использовал флюрби"
Вопрос: "в каком году?"
Результат: "в каком году использовал флюрби" ✅

Контекст: "Работал с зорбиком"
Вопрос: "когда?"
Результат: "когда работал с зорбиком" ✅

Контекст: "Знаю кваксу"
Вопрос: "где?"
Результат: "где использовал кваксу" ✅

Некорректные примеры:
- "когда использовал" ❌ (нет объекта)
- "когда работал" ❌ (нет объекта)
- "где" ❌ (нет ни глагола, ни объекта)

{{categoryInstruction}}{{historyContext}}

{{#isFollowUp}}Original question (follow-up): {{question}}{{/isFollowUp}}{{^isFollowUp}}Original question: {{question}}{{/isFollowUp}}

Rewritten self-contained question:
`;

  return Mustache.render(template, {
    hasCategory: hasCategory,
    categoryName: categoryName,
    historyContext: historyContext,
    isFollowUp: !!historyContext,
    question: question,
  });
}

/**
 * Creates a prompt for minimal question transformation
 * Used for slight grammatical improvements without changing meaning
 * @param question - Original question to transform
 * @param category - Document category (optional)
 * @param history - Conversation history (optional)
 * @returns Formatted prompt string for minimal transformation
 */
export function createMinimalTransformationPrompt({
  question,
  category,
  history,
}: {
  question: string;
  category: Category;
  history: string[];
}): string {
  const hasCategory = !!category;
  const categoryName = category ? CATEGORY[category] || category : '';

  const historyContext =
    history && history.length > 0
      ? Mustache.render(
          `

Conversation history:
\`\`\`
{{history}}
\`\`\``,
          { history: removeCodeWrappers(history.join('\n')) },
        )
      : '';

  // Template for the minimal transformation prompt
  const template = `
You are a question transformer. Your task is to slightly rephrase the question ONLY to improve grammatical clarity.

STRICT RULES:
- ЯЗЫК ОТВЕТА ДОЛЖЕН СОВПАДАТЬ С ЯЗЫКОМ ВОПРОСА
- ОТВЕТ ДОЛЖЕН БЫТЬ В ФОРМЕ ПЕРВОГО ЛИЦА
- НЕ используй явное местоимение "я"
- Используй форму глагола без подлежащего ("внедрял", "использовал", "настраивал")
- НЕ используй третье лицо ("он", "автор", "технический руководитель внедрил")
- Do NOT change the speaker or the addressee of the question
- Do NOT change grammatical person (e.g., "ты", "вы", "я")
- Do NOT change the communication style (informal/formal)
- Do NOT replace words with synonyms or narrow general verbs into more specific ones
- Do NOT normalize or reinterpret context
- Do NOT add or remove meaning

- Keep the original meaning and intent EXACTLY
- Respond in the same language as the original question
- Preserve all original words whenever possible
- Only return the transformed question, nothing else
- If the original question is already grammatically correct, return it unchanged except for removing explicit subject pronouns


Conversation history is provided ONLY to understand references (e.g., "он", "нём"), NOT to change wording or roles.

{{categoryInstruction}}{{historyContext}}

Original question: {{question}}

Transformed question:
`;

  return Mustache.render(template, {
    hasCategory: hasCategory,
    categoryName: categoryName,
    historyContext: historyContext,
    question: question,
  });
}

/**
 * Creates a prompt for dialog summarization
 * Used to summarize conversation history
 * @param history - Array of conversation history entries
 * @returns Formatted prompt string for dialog summarization
 */
export function createDialogSummaryPrompt(history: string[]): string {
  return Mustache.render(
    `
Суммируй диалог кратко (3–5 предложений).
Только факты, без интерпретаций.

Диалог:
\`\`\`
{{history}}
\`\`\` 

Summary:
`,
    { history: removeCodeWrappers(history.join('\n\n')) },
  );
}

export function createFinalAnswerPrompt({
  question,
  context,
  fact,
  category,
  history,
}: {
  question: string;
  context: string;
  fact: string;
  category: Category;
  history: string;
}): string {
  return Mustache.render(
    `
Ты формируешь ОКОНЧАТЕЛЬНЫЙ ОТВЕТ ПОЛЬЗОВАТЕЛЮ.

ВАЖНО:
- ЯЗЫК ОТВЕТА ДОЛЖЕН СОВПАДАТЬ С ЯЗЫКОМ ВОПРОСА
- ОТВЕТ ДОЛЖЕН БЫТЬ В ФОРМЕ ПЕРВОГО ЛИЦА
- НЕ используй явное местоимение "я"
- Используй форму глагола без подлежащего ("внедрял", "использовал", "настраивал")
- НЕ используй третье лицо ("он", "автор", "технический руководитель внедрил")
- НЕ используй резюме-стиль или заголовки ролей
- Если упоминается роль, вписывай её в предложение естественно
- После слова «как» роль ВСЕГДА ставь в творительном падеже (кем? чем?)

ПРАВИЛА:
- ЯЗЫК ОТВЕТА ДОЛЖЕН СОВПАДАТЬ С ЯЗЫКОМ ВОПРОСА
- ОТВЕТ ДОЛЖЕН БЫТЬ В ФОРМЕ ПЕРВОГО ЛИЦА
- НЕ используй явное местоимение "я"
- Используй форму глагола без подлежащего
- НЕ используй третье лицо
- Отвечай именно на вопрос, а не пересказывай факт
- Если вопрос предполагает "да/нет" — ответь "да" или "нет"
- Если ответ "да", можно ОДНИМ коротким предложением подтвердить фактом
- Не добавляй новой информации
- Не используй рассуждения
- Стиль краткий, разговорный, не формально-документальный
{{#isTelegram}}- Используй только Author Message{{/isTelegram}}

Вопрос:
{{question}}

Conversation history:
\`\`\`
{{history}}
\`\`\` 

Контекст:
\`\`\`
{{context}}
\`\`\`

Подтверждённый факт:
\`\`\`
{{fact}}
\`\`\`

Ответ:
`,
    {
      isTelegram: category === 'telegram',
      question: question,
      context: removeCodeWrappers(context),
      history: removeCodeWrappers(history),
      fact: removeCodeWrappers(fact),
    },
  );
}
