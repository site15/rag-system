/**
 * Prompt templates for neural network interactions
 * Contains all prompt strings used for LLM calls with descriptions
 */

import { CATEGORY_PROMPTS } from './category-prompts';
import { CATEGORY } from './constants';
import { Category } from './services/questionTransformer';

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
  return `
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
${category === 'telegram' ? 'Используй только Author Message для ответа.' : ''}

${
  chunk
    ? `
Контекст:
${chunk}`
    : ''
}

Вопрос:
${question}

Ответ:
`;
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
  return `
Ответь дружелюбно и строго по фактам, ТОЛЬКО если в контексте
есть прямые данные для ответа на данный вопрос.

СТРОГИЕ ПРАВИЛА:
- ЯЗЫК ОТВЕТА ДОЛЖЕН СОВПАДАТЬ С ЯЗЫКОМ ВОПРОСА
- ОТВЕТ ДОЛЖЕН БЫТЬ В ФОРМЕ ПЕРВОГО ЛИЦА
- НЕ используй явное местоимение "я"
- Используй форму глагола без подлежащего ("внедрял", "использовал", "настраивал")
- НЕ используй третье лицо ("он", "автор", "технический руководитель внедрил")
- НЕ обращайся к пользователю во 2-м лице ("ты", "твой" и т.п.)
- НЕ добавляй новую информацию, которой нет напрямую в контексте
- НЕ переформулируй и НЕ расширяй ответ, если вопрос является мета-вопросом
  ("разверни", "подробнее", "поясни", "можешь раскрыть")
- Если прямого ответа нет, формулируй нейтрально: "По вопросу данных нет"
- Для вопросов про имя/идентификацию: "Имя не указано"
- Сохраняй лёгкий дружелюбный стиль без предположений и оценок
- Отвечай ТОЛЬКО если информация напрямую подходит к типу вопроса:
  * "кто" → субъект
  * "где" → место / платформа
  * "когда" → время / период
  * "что / как" → действие или объект
- Если вопрос является мета-вопросом или не соответствует типу факта —
  всегда отвечай: "По вопросу данных нет"
- Во всех остальных случаях — "По вопросу данных нет"

${category === 'telegram' ? 'Используй только Author Message для ответа.' : ''}

${
  chunk
    ? `
Контекст:
${chunk}`
    : ''
}

Вопрос:
${question}

Ответ:
`;
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
  return CATEGORY_PROMPTS.telegram
    .replace('{{history}}', history.length ? history.join('\n') : 'нет')
    .replace('{{context}}', chunk || '')
    .replace('{{question}}', question);
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
  return CATEGORY_PROMPTS.articles
    .replace('{{history}}', history.length ? history.join('\n') : 'нет')
    .replace('{{context}}', chunk || '')
    .replace('{{question}}', question);
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
  return CATEGORY_PROMPTS.portfolio
    .replace('{{history}}', history.length ? history.join('\n') : 'нет')
    .replace('{{context}}', chunk || '')
    .replace('{{question}}', question);
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
  return CATEGORY_PROMPTS.resume
    .replace('{{history}}', history.length ? history.join('\n') : 'нет')
    .replace('{{context}}', chunk || '')
    .replace('{{question}}', question);
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
  return CATEGORY_PROMPTS.none
    .replace('{{history}}', history.length ? history.join('\n') : 'нет')
    .replace('{{context}}', chunk || '')
    .replace('{{question}}', question);
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
  let categoryInstruction = '';
  if (category) {
    categoryInstruction = `The question seems to be related to '${CATEGORY[category] || category}'. Keep the focus on this category.`;
  }

  let historyContext = '';
  if (history && history.length > 0) {
    const historyText = history.join('\n');
    historyContext = `

Conversation history:
${historyText}`;
  }

  return `
You are a question rewriter.

Your task is to rewrite the user's question so that it becomes fully self-contained and understandable WITHOUT conversation history.

RULES:
- ЯЗЫК ОТВЕТА ДОЛЖЕН СОВПАДАТЬ С ЯЗЫКОМ ВОПРОСА
- ОТВЕТ ДОЛЖЕН БЫТЬ В ФОРМЕ ПЕРВОГО ЛИЦА
- НЕ используй явное местоимение "я"
- Используй форму глагола без подлежащего ("внедрял", "использовал", "настраивал")
- НЕ используй третье лицо ("он", "автор", "технический руководитель внедрил")
- Use conversation history ONLY to resolve references (e.g., "он", "нём")
- Explicitly name the subject when a pronoun is used and the context is known (e.g., "Ильшат")
- Consider the general topic of the conversation to correctly interpret technical terms (e.g., Python is a programming language)
- If the original question contains pronouns or context that cannot be resolved from the available information, rewrite it to indicate that the subject or context is unclear
- Do NOT invent new topics
- Preserve the original intent and tone (informal/formal)
- Do NOT address the user directly (no "ты", "вы")
- Respond in the same language as the original question
- Return ONLY the rewritten question

${categoryInstruction}${historyContext}

Original question: ${question}

Rewritten self-contained question:
`;
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
  let categoryInstruction = '';
  if (category) {
    categoryInstruction = `The question seems to be related to '${CATEGORY[category] || category}'. Keep the focus on this category.`;
  }

  let historyContext = '';
  if (history && history.length > 0) {
    const historyText = history.join('\n');
    historyContext = `

Conversation history:
${historyText}`;
  }

  return `
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

${categoryInstruction}${historyContext}

Original question: ${question}

Transformed question:
`;
}

/**
 * Creates a prompt for dialog summarization
 * Used to summarize conversation history
 * @param history - Array of conversation history entries
 * @returns Formatted prompt string for dialog summarization
 */
export function createDialogSummaryPrompt(history: string[]): string {
  return `
Суммируй диалог кратко (3–5 предложений).
Только факты, без интерпретаций.

Диалог:
${history.join('\n\n')}

Summary:
`;
}

export function createFinalAnswerPrompt({
  question,
  fact,
  category,
}: {
  question: string;
  fact: string;
  category: Category;
}): string {
  return `
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

Вопрос:
${question}

Подтверждённый факт:
${fact}

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
${category === 'telegram' ? '- Используй только Author Message' : ''}

Ответ:
`;
}
