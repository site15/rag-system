import { Category } from './services/questionTransformer';
import { getConstant, GetConstantKey } from '../utils/get-constant';

export function getShortCategoryDescription(category: Category): string {
  // Map category to constant key
  const categoryKeyMap: Record<Category, GetConstantKey> = {
    [Category.telegram]: GetConstantKey.CategoryDescription_telegram,
    [Category.spam]: GetConstantKey.CategoryDescription_spam,
    [Category.job]: GetConstantKey.CategoryDescription_job,
    [Category.freelance]: GetConstantKey.CategoryDescription_freelance,
    [Category.consulting]: GetConstantKey.CategoryDescription_consulting,
    [Category.pricing]: GetConstantKey.CategoryDescription_pricing,
    [Category.partnership]: GetConstantKey.CategoryDescription_partnership,
    [Category.investment]: GetConstantKey.CategoryDescription_investment,
    [Category.hiring]: GetConstantKey.CategoryDescription_hiring,
    [Category.interview]: GetConstantKey.CategoryDescription_interview,
    [Category.speaking]: GetConstantKey.CategoryDescription_speaking,
    [Category.media]: GetConstantKey.CategoryDescription_media,
    [Category.support]: GetConstantKey.CategoryDescription_support,
    [Category.review]: GetConstantKey.CategoryDescription_review,
    [Category.decision]: GetConstantKey.CategoryDescription_decision,
    [Category.product]: GetConstantKey.CategoryDescription_product,
    [Category.access]: GetConstantKey.CategoryDescription_access,
    [Category.resume]: GetConstantKey.CategoryDescription_resume,
    [Category.portfolio]: GetConstantKey.CategoryDescription_portfolio,
    [Category.articles]: GetConstantKey.CategoryDescription_articles,
    [Category.life]: GetConstantKey.CategoryDescription_life,
    [Category.intro]: GetConstantKey.CategoryDescription_intro,
    [Category.followup]: GetConstantKey.CategoryDescription_followup,
    [Category.gratitude]: GetConstantKey.CategoryDescription_gratitude,
    [Category.clarification]: GetConstantKey.CategoryDescription_clarification,
    [Category.none]: GetConstantKey.CategoryDescription_none,
    [Category.technology]: GetConstantKey.CategoryDescription_technology,
  };

  // Load description synchronously
  try {
    return getConstant(categoryKeyMap[category]);
  } catch (error) {
    // console.error(`Failed to load description for category ${category}:`, error);
    // Return empty string as fallback (matching original behavior)
    return '';
  }
}
