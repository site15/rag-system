import { Logger } from './logger';
import { Category } from './services/questionTransformer';

export function getCategoryByDetectedCategory(detectedCategory: Category) {
  let category: Category | undefined = undefined;
  if (detectedCategory === Category.articles) {
    category = Category.articles;
  }

  if (
    detectedCategory === Category.pricing ||
    detectedCategory === Category.resume ||
    detectedCategory === Category.interview ||
    detectedCategory === Category.hiring ||
    detectedCategory === Category.job ||
    detectedCategory === Category.freelance ||
    detectedCategory === Category.consulting ||
    detectedCategory === Category.partnership ||
    detectedCategory === Category.investment ||
    detectedCategory === Category.intro ||
    detectedCategory === Category.life
  ) {
    category = Category.resume;
  }

  if (
    detectedCategory === Category.decision ||
    detectedCategory === Category.portfolio ||
    detectedCategory === Category.product ||
    detectedCategory === Category.media
  ) {
    category = Category.portfolio;
  }

  if (detectedCategory === Category.spam) {
    category = Category.none;
  }

  if (
    detectedCategory === Category.review ||
    detectedCategory === Category.access ||
    detectedCategory === Category.technology
  ) {
    category = Category.telegram;
  }

  if (
    detectedCategory === Category.clarification ||
    detectedCategory === Category.followup
  ) {
    category = detectedCategory;
  }

  if (!category) {
    category = Category.telegram;
    Logger.logInfo(
      'Not detected category, use telegram message for search answer',
    );
  }
  return category;
}
