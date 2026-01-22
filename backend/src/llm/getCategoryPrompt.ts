import { Category } from './services/questionTransformer';
import { getConstant, GetConstantKey } from '../utils/get-constant';

export function getCategoryPrompt(category: Category, context?: any): string {
  // Map category to constant key
  const categoryKeyMap: Record<Category, GetConstantKey> = {
    [Category.telegram]: GetConstantKey.CategoryPrompt_telegram,
    [Category.spam]: GetConstantKey.CategoryPrompt_spam,
    [Category.job]: GetConstantKey.CategoryPrompt_job,
    [Category.freelance]: GetConstantKey.CategoryPrompt_freelance,
    [Category.consulting]: GetConstantKey.CategoryPrompt_consulting,
    [Category.pricing]: GetConstantKey.CategoryPrompt_pricing,
    [Category.partnership]: GetConstantKey.CategoryPrompt_partnership,
    [Category.investment]: GetConstantKey.CategoryPrompt_investment,
    [Category.hiring]: GetConstantKey.CategoryPrompt_hiring,
    [Category.interview]: GetConstantKey.CategoryPrompt_interview,
    [Category.speaking]: GetConstantKey.CategoryPrompt_speaking,
    [Category.media]: GetConstantKey.CategoryPrompt_media,
    [Category.support]: GetConstantKey.CategoryPrompt_support,
    [Category.review]: GetConstantKey.CategoryPrompt_review,
    [Category.decision]: GetConstantKey.CategoryPrompt_decision,
    [Category.product]: GetConstantKey.CategoryPrompt_product,
    [Category.access]: GetConstantKey.CategoryPrompt_access,
    [Category.resume]: GetConstantKey.CategoryPrompt_resume,
    [Category.portfolio]: GetConstantKey.CategoryPrompt_portfolio,
    [Category.articles]: GetConstantKey.CategoryPrompt_articles,
    [Category.life]: GetConstantKey.CategoryPrompt_life,
    [Category.intro]: GetConstantKey.CategoryPrompt_intro,
    [Category.followup]: GetConstantKey.CategoryPrompt_followup,
    [Category.gratitude]: GetConstantKey.CategoryPrompt_gratitude,
    [Category.clarification]: GetConstantKey.CategoryPrompt_clarification,
    [Category.none]: GetConstantKey.CategoryPrompt_none,
    [Category.technology]: GetConstantKey.CategoryPrompt_technology,
  };

  // Load template synchronously
  try {
    return getConstant(categoryKeyMap[category], context);
  } catch (error) {
    // console.error(`Failed to load template for category ${category}:`, error);
    // Fallback to telegram template
    return getConstant(GetConstantKey.CategoryPrompt_telegram, context);
  }
}
