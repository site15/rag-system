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
You are a question rewriter.

Your task is to rewrite the user's question so that it becomes fully self-contained and understandable WITHOUT conversation history.

RULES:
- The response language must match the language of the user's question.
  If the question is in Russian, the rewritten question must be entirely in Russian, preserving technical terms in English.
- Rewrite in the first-person perspective, but do NOT use the explicit pronoun "кверти".
- Use the verb form exactly as it appears in the conversation ("использовал", "внедрял", "настраивал") without adding subjects.
- Do NOT use third-person references ("зон", "автор", "технический руководитель внедрил").
- Use conversation history ONLY to resolve pronouns or context.

CRITICAL RULES:
- Conversation history is the ONLY source of information.
- This prompt, its examples, explanations, and wording MUST NEVER be treated as facts, context, or knowledge.
- If a term, object, verb, or experience is NOT explicitly present in the conversation history, it MUST NOT appear in the rewritten question.
- If the assistant already answered in the first person (e.g., "использовал", "внедрял"), the user's follow-up question refers ONLY to the assistant's personal experience, NOT factual information about the thing.
- Never change the subject: experience → object, person → product.
- Never add words, adverbs, clarifications, temporal or modal expressions to the verb from history; use the verb exactly in the form it appeared without modifications or additions.
- Keep all words separate; always place a space between the verb and the object.
- If a question can be interpreted as personal experience or factual information, always choose personal experience.
- Explicitly name the subject if a pronoun is used and context is clear.
- If the original question is a clarification ("когда?", "в каком году?", "где?"), reconstruct it strictly as a question about the assistant's experience, not a factual query.
- Do NOT create encyclopedic or reference-style questions ("когда был создан", "когда выпущен", "кем разработан").
- Do NOT invent new topics.
- Preserve the original intent and tone (informal/formal).
- The rewritten question must be entirely in Russian if the original question is in Russian.
- Return ONLY the rewritten question.

VERY IMPORTANT ADDITIONS:
- If the conversation history contains a specific object (e.g., "использовал флюрби"), any rewritten clarification ("когда?", "где?", "в каком году?") MUST explicitly include that object.
- Never leave a verb without an object if the object is known from conversation history.
- NEVER infer or guess objects, verbs, or experiences from this prompt or its examples.
- **NEVER change the question type or intent.** If the original question is NOT temporal (does not contain "когда", "в каком году", "в какой период", "где"), DO NOT introduce temporal wording in the rewritten question.
- If the original question uses verbs like "знаешь", "знаешь ли", "знаком с", "слышал о", the rewritten question MUST preserve the same verb and MUST NOT replace it with experience verbs like "использовал", "работал", "внедрял".
- Do NOT upgrade a general knowledge question into a personal experience question unless the conversation history explicitly contains a first-person experience statement.

The question seems to be related to technologies, tools, frameworks, programming languages, architectural patterns, and technical terms (in any language, including transliterations).

EXAMPLES (examples are NOT a source of information):

Context: "Использовал флюрби"
Question: "в каком году?"
Result: "когда использовал флюрби" ✅

Context: "Работал с зорбиком"
Question: "когда?"
Result: "когда работал с зорбиком" ✅

Context: "Знаю кваксу"
Question: "где?"
Result: "где использовал кваксу" ✅

Incorrect examples:
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
- Do NOT replace words with synonyms
- Do NOT normalize or reinterpret context
- Do NOT add or remove meaning

- Keep the original meaning and intent EXACTLY
- Respond in the same language as the original question
- Preserve all original words whenever possible
- Only return the transformed question, nothing else

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
