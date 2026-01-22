/**
 * Prompt templates for neural network interactions
 * Contains all prompt strings used for LLM calls with descriptions
 */

import { getConstant, GetConstantKey } from '../utils/get-constant';
import { getCategoryPrompt } from './getCategoryPrompt';
import { getShortCategoryDescription } from './getShortCategoryDescription';
import { Category } from './services/questionTransformer';
import { TextHelpers } from './textHelpers';
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
  return getConstant(GetConstantKey.Prompt_friendlyFoundTemplate, {
    isTelegram: category === 'telegram',
    hasContext: !!chunk,
    context: removeCodeWrappers(chunk),
    question: question,
  });
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
  return getConstant(GetConstantKey.Prompt_friendlyNotFoundTemplate, {
    isTelegram: category === 'telegram',
    hasContext: !!chunk,
    context: removeCodeWrappers(chunk),
    question: question,
  });
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
  return getCategoryPrompt(Category.telegram, {
    history: removeCodeWrappers(TextHelpers.concat(history, 'нет')),
    context: removeCodeWrappers(chunk || ''),
    question: question,
    isFollowUp: history?.[0],
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
  return getCategoryPrompt(Category.articles, {
    context: removeCodeWrappers(chunk || ''),
    question: question,
    isFollowUp: history?.[0],
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
  return getCategoryPrompt(Category.portfolio, {
    history: removeCodeWrappers(TextHelpers.concat(history, 'нет')),
    context: removeCodeWrappers(chunk || ''),
    question: question,
    isFollowUp: history?.[0],
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
  return getCategoryPrompt(Category.resume, {
    history: removeCodeWrappers(TextHelpers.concat(history, 'нет')),
    context: removeCodeWrappers(chunk || ''),
    question: question,
    isFollowUp: history?.[0],
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
  return getCategoryPrompt(Category.none, {
    history: removeCodeWrappers(TextHelpers.concat(history, 'нет')),
    context: removeCodeWrappers(chunk || ''),
    question: question,
    isFollowUp: history?.[0],
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
  const categoryName = getShortCategoryDescription(category as Category);

  const isFollowUp = history?.[0];

  const historyContext = isFollowUp
    ? getConstant(GetConstantKey.Prompt_contextualRewriteHistoryTemplate, {
        history: removeCodeWrappers(TextHelpers.concat(history)),
      })
    : '';

  return getConstant(GetConstantKey.Prompt_contextualRewriteTemplate, {
    hasCategory: hasCategory,
    categoryName: categoryName,
    historyContext: historyContext,
    isFollowUp,
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

  const historyContext =
    history && history.length > 0
      ? getConstant(
          GetConstantKey.Prompt_minimalTransformationHistoryTemplate,
          { history: removeCodeWrappers(TextHelpers.concat(history)) },
        )
      : '';

  return getConstant(GetConstantKey.Prompt_minimalTransformationTemplate, {
    hasCategory: hasCategory,
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
  return getConstant(GetConstantKey.Prompt_dialogSummaryTemplate, {
    history: removeCodeWrappers(history.join('\n\n')),
  });
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
  return getConstant(GetConstantKey.Prompt_finalAnswerTemplate, {
    isTelegram: category === 'telegram',
    question: question,
    context: removeCodeWrappers(context),
    history: removeCodeWrappers(history),
    fact: removeCodeWrappers(fact),
  });
}
