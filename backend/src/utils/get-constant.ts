import { resolve } from 'path';
import { getTraceStorage } from '../trace/trace.module';
import { readFile } from 'fs/promises';
import Mustache from 'mustache';

export const globalConstants: Record<string, string> = {} as const;

export enum GetConstantKey {
  QuestionTransformer_transformQuestion_1 = 'QuestionTransformer_transformQuestion_1',
  QuestionTransformer_transformQuestion_2 = 'QuestionTransformer_transformQuestion_2',
  QuestionTransformer_transformQuestion_3 = 'QuestionTransformer_transformQuestion_3',
  LlmChunkProcessor_semanticTemplate = 'LlmChunkProcessor_semanticTemplate',
  LlmChunkProcessor_simpleTemplate = 'LlmChunkProcessor_simpleTemplate',
  Prompt_friendlyFoundTemplate = 'Prompt_friendlyFoundTemplate',
  Prompt_friendlyNotFoundTemplate = 'Prompt_friendlyNotFoundTemplate',
  Prompt_contextualRewriteTemplate = 'Prompt_contextualRewriteTemplate',
  Prompt_contextualRewriteHistoryTemplate = 'Prompt_contextualRewriteHistoryTemplate',
  Prompt_minimalTransformationTemplate = 'Prompt_minimalTransformationTemplate',
  Prompt_minimalTransformationHistoryTemplate = 'Prompt_minimalTransformationHistoryTemplate',
  Prompt_dialogSummaryTemplate = 'Prompt_dialogSummaryTemplate',
  Prompt_finalAnswerTemplate = 'Prompt_finalAnswerTemplate',
  Prompt_documentAnalysisTemplate = 'Prompt_documentAnalysisTemplate',
  DialogManager_historyTemplate = 'DialogManager_historyTemplate',
  // Category prompt templates
  CategoryPrompt_telegram = 'CategoryPrompt_telegram',
  CategoryPrompt_spam = 'CategoryPrompt_spam',
  CategoryPrompt_job = 'CategoryPrompt_job',
  CategoryPrompt_freelance = 'CategoryPrompt_freelance',
  CategoryPrompt_consulting = 'CategoryPrompt_consulting',
  CategoryPrompt_pricing = 'CategoryPrompt_pricing',
  CategoryPrompt_partnership = 'CategoryPrompt_partnership',
  CategoryPrompt_investment = 'CategoryPrompt_investment',
  CategoryPrompt_hiring = 'CategoryPrompt_hiring',
  CategoryPrompt_interview = 'CategoryPrompt_interview',
  CategoryPrompt_speaking = 'CategoryPrompt_speaking',
  CategoryPrompt_media = 'CategoryPrompt_media',
  CategoryPrompt_support = 'CategoryPrompt_support',
  CategoryPrompt_review = 'CategoryPrompt_review',
  CategoryPrompt_decision = 'CategoryPrompt_decision',
  CategoryPrompt_product = 'CategoryPrompt_product',
  CategoryPrompt_access = 'CategoryPrompt_access',
  CategoryPrompt_resume = 'CategoryPrompt_resume',
  CategoryPrompt_portfolio = 'CategoryPrompt_portfolio',
  CategoryPrompt_articles = 'CategoryPrompt_articles',
  CategoryPrompt_life = 'CategoryPrompt_life',
  CategoryPrompt_greeting = 'CategoryPrompt_greeting',
  CategoryPrompt_intro = 'CategoryPrompt_intro',
  CategoryPrompt_followup = 'CategoryPrompt_followup',
  CategoryPrompt_gratitude = 'CategoryPrompt_gratitude',
  CategoryPrompt_clarification = 'CategoryPrompt_clarification',
  CategoryPrompt_none = 'CategoryPrompt_none',
  CategoryPrompt_technology = 'CategoryPrompt_technology',
  // Category description templates
  CategoryDescription_telegram = '',
  CategoryDescription_spam = 'рекламные, массовые, автоматические или нерелевантные сообщения',
  CategoryDescription_job = 'предложения о работе на полный рабочий день, штатную позицию, постоянную занятость, трудоустройство в компанию',
  CategoryDescription_freelance = 'предложения о проектной, контрактной, частичной или почасовой работе, разовые коммерческие задачи',
  CategoryDescription_consulting = 'запросы на консультации, аудит, экспертную помощь, менторство, code review, архитектурный разбор, созвон или сопровождение за деньги либо с явным предложением коммерческого взаимодействия',
  CategoryDescription_pricing = 'вопросы о стоимости услуг, рейтах, бюджете, оплате, компенсации, зарплате, финансовых условиях сотрудничества',
  CategoryDescription_partnership = 'предложения о партнёрстве, совместном бизнесе, совместном запуске продукта, кофаундерстве или долгосрочном сотрудничестве',
  CategoryDescription_investment = 'инвестиционные предложения, поиск инвестора, предложение инвестиций, участие в раунде финансирования',
  CategoryDescription_hiring = 'вопросы о найме сотрудников, поиске кандидатов, формировании команды, усилении команды, рынке специалистов. Если работу предлагают лично мне — job или freelance по приоритету',
  CategoryDescription_interview = 'вопросы о собеседованиях, подготовке к ним, оценке кандидатов, проведении интервью, найме через интервью',
  CategoryDescription_speaking = 'приглашения выступить на конференции, митапе, вебинаре, подкасте, стриме, AMA-сессии или другом публичном мероприятии',
  CategoryDescription_media = 'запросы на интервью, комментарии, цитаты, экспертное мнение, участие в публикациях, исследованиях, статьях, обзорах или материалах СМИ',
  CategoryDescription_support = 'просьбы помочь с конкретной технической проблемой, ошибкой, багом, неисправностью, неожиданным поведением системы, диагностикой или поиском причины независимо от языка написания (русский, английский, транслитерация)',
  CategoryDescription_review = 'запросы на ревью кода, архитектуры, ТЗ, дизайна, документации, идеи, решения или подхода',
  CategoryDescription_decision = 'помощь с выбором технологии, инструмента, подхода, архитектуры, поставщика, сервиса или решения независимо от языка написания (русский, английский, транслитерация)',
  CategoryDescription_product = 'вопросы о продукте, сервисе, платформе, библиотеке, курсе, сообществе или проекте, которые я создал или поддерживаю, включая возможности, ограничения, использование, документацию и роадмап',
  CategoryDescription_access = 'просьбы о доступе: демо, бета, репозиторий, курс, закрытое сообщество, материалы или тестирование',
  CategoryDescription_resume = 'вопросы о моём профессиональном опыте, навыках, местах работы, технологиях, профессиональных умениях независимо от языка написания (русский, английский, транслитерация), включая вопросы вида "ты знаешь X?", "работал с X?", "есть опыт с X?", "используешь X?", "сколько лет с X?", "насколько хорошо знаешь X?"',
  CategoryDescription_portfolio = 'вопросы о моих проектах, кейсах, достижениях, результатах, реализованных решениях, внедрениях, клиентах, метриках и практическом опыте, в том числе ИИ-решениях',
  CategoryDescription_articles = 'запросы на объяснения, руководства, инструкции, обучение, разборы, примеры, best practices, сравнения или образовательные материалы независимо от языка написания (русский, английский, транслитерация), если нет конкретной проблемы (support) или выбора между вариантами (decision)',
  CategoryDescription_life = 'вопросы о личной жизни, хобби, интересах, привычках, предпочтениях, увлечениях, искусстве и непрофессиональных темах',
  CategoryDescription_greeting = 'приветствия, начало разговора, установление контакта без содержательного запроса',
  CategoryDescription_intro = 'представление человека, рекомендация специалиста, знакомство людей между собой, краткое описание человека для новой аудитории',
  CategoryDescription_followup = 'продолжение предыдущего диалога, которое содержит новый осмысленный запрос, но не содержит достаточного контекста для самостоятельной классификации',
  CategoryDescription_gratitude = 'благодарности без запроса и без необходимости ответа по существу',
  CategoryDescription_clarification = 'короткие уточняющие вопросы к предыдущему сообщению или ответу, которые теряют смысл вне контекста',
  CategoryDescription_none = 'всё остальное',
  CategoryDescription_technology = 'вопросы или упоминания технологий, инструментов, фреймворков, языков программирования, архитектурных паттернов и технических терминов независимо от языка написания (русский, английский, транслитерация), если вопрос не относится к моему опыту, проектам, выбору решения, инструкции или решению проблемы',
  // LLM Chunk Processor regex patterns
  LlmChunkProcessor_authorMessageHeader = 'LlmChunkProcessor_authorMessageHeader',
  LlmChunkProcessor_semanticSearchRegex = 'LlmChunkProcessor_semanticSearchRegex',
  LlmChunkProcessor_authorMessageRegex = 'LlmChunkProcessor_authorMessageRegex',
  LlmChunkProcessor_finalAnswerInstruction = 'LlmChunkProcessor_finalAnswerInstruction',
  // RAG Application constants
  RagApplication_telegramMessageIdentifier = 'RagApplication_telegramMessageIdentifier',
  // RAG Searcher constants
  RagSearcher_metadataSeparator = 'RagSearcher_metadataSeparator',
}

export const loadConstantsFromFiles = async () => {
  for (const key of Object.keys(GetConstantKey)) {
    if (key.startsWith('CategoryDescription_')) {
      globalConstants[key] = GetConstantKey[key as keyof typeof GetConstantKey];
      continue;
    }
    globalConstants[key] = await readFile(
      resolve(process.cwd(), '..', 'constants', `${key}.txt`),
      'utf-8',
    );
  }
};

export const getConstants = () => {
  const store = getTraceStorage().getStore();

  if (!store) {
    return { ...globalConstants };
  }

  if (!store.constants) {
    store.constants = { ...globalConstants };
  }

  return store.constants;
};

export const patchConstants = (constants: Record<string, string>) => {
  Object.assign(getConstants(), constants);
};

function prepareMustacheContext(
  context: Record<string, unknown>,
): Record<string, unknown> {
  const prepared: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(context)) {
    if (typeof value === 'string') {
      prepared[key] = value.trim();
      continue;
    }

    if (value == null) {
      prepared[key] = '';
      continue;
    }

    prepared[key] = value;
  }

  return prepared;
}

export const getConstant = (key: GetConstantKey, context?: any) => {
  const content = getConstants()[key];
  if (!context) {
    return content;
  }
  return Mustache.render(content, prepareMustacheContext(context));
};
