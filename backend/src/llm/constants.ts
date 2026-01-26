/**
 * Constants for the LLM application
 * Contains all hardcoded values, string literals, and numeric constants
 */

export const DEFAULT_ALLOWED_IPS = ['127.0.0.1', '192.168.168.1', '::1'];

// Error Messages
export const ERROR_MESSAGES = {
  MISSING_MODEL: 'Model is required',

  /** Generic unauthorized access message */
  UNAUTHORIZED: 'Unauthorized',

  /** Api key is missing or invalid message */
  INVALID_API_KEY: 'Invalid API key',

  /** IP address not allowed message */
  FORBIDDEN_IP: 'Forbidden: IP address not allowed',

  /** Missing or invalid message parameter */
  INVALID_MESSAGE: 'Message is required and must be a string',

  /** Rate limit exceeded */
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',

  /** Internal server error */
  INTERNAL_SERVER_ERROR: 'Internal server error',

  /** Dialog is already processing */
  DIALOG_IS_ALREADY_PROCESSING: 'Dialog is already processing',

  /** Provider-specific API key requirements */
  PROVIDER_ERRORS: {
    A4F: 'CHAT_API_KEY is required for A4F.co provider',
    Z_AI: 'CHAT_API_KEY is required for Z.AI provider',
    DEEPSEEK: 'CHAT_API_KEY is required for DeepSeek provider',
    ANTHROPIC: 'CHAT_API_KEY is required for Anthropic provider',
    GEMINI: 'CHAT_API_KEY is required for Gemini provider',
    HUGGINGFACE: 'CHAT_API_KEY is required for Hugging Face provider',
    GROQ: 'CHAT_API_KEY is required for Groq provider',
    OLLAMA: 'CHAT_API_KEY is required for Ollama provider',
    GENERIC_OPENAI:
      'CHAT_API_KEY is required for OpenAI and DeepSeek providers',
    EMBEDDINGS_A4F: 'EMBEDDINGS_API_KEY is required for A4F.co provider',
    EMBEDDINGS_Z_AI: 'EMBEDDINGS_API_KEY is required for Z.AI provider',
    EMBEDDINGS_DEEPSEEK: 'EMBEDDINGS_API_KEY is required for DeepSeek provider',
    EMBEDDINGS_GENERIC:
      'EMBEDDINGS_API_KEY is required for OpenAI and DeepSeek providers',
  } as const,

  /** Provider not supporting embeddings */
  UNSUPPORTED_EMBEDDINGS: {
    ANTHROPIC:
      'Anthropic provider does not support embeddings. Please use a different provider for embeddings.',
    GEMINI:
      'Gemini provider does not support embeddings. Please use a different provider for embeddings.',
    HUGGINGFACE:
      'Hugging Face provider does not support embeddings. Please use a different provider for embeddings.',
    GROQ: 'Groq provider does not support embeddings. Please use a different provider for embeddings.',
  } as const,
} as const;

// Provider Names and Identifiers
export const PROVIDER_NAMES = {
  A4F: 'a4f',
  Z_AI: 'z_ai',
  DEEPSEEK: 'deepseek',
  ANTHROPIC: 'anthropic',
  GEMINI: 'gemini',
  HUGGINGFACE: 'huggingface',
  GROQ: 'groq',
  OPENAI: 'openai',
  OLLAMA: 'ollama',
  LM_STUDIO: 'lm_studio',
} as const;

// RAG Search Configuration
export const RAG_SEARCH_CONFIG = {
  /** Default limit for global mode search */
  GLOBAL_SEARCH_LIMIT: 10,

  /** Default limit for telegram mode search */
  TELEGRAM_SEARCH_LIMIT: 10,

  /** Filter pattern for excluding telegram documents in global mode */
  GLOBAL_TELEGRAM_EXCLUDE_PATTERN: '%/telegram/%',

  /** Filter rule for excluding telegram documents */
  GLOBAL_TELEGRAM_EXCLUDE_RULE: 'not ilike' as const,

  /** Filter pattern for including telegram documents */
  TELEGRAM_INCLUDE_PATTERN: '%/telegram/%',

  /** Filter rule for including telegram documents */
  TELEGRAM_INCLUDE_RULE: 'ilike' as const,
} as const;

// LLM Response Processing
export const LLM_RESPONSE_CONSTANTS = {
  /** Response markers */
  MARKERS: {
    FOUND: '[FOUND]',
    ERROR: '[ERROR]',
  } as const,

  /** Modes for LLM processing */
  MODES: {
    GLOBAL: 'global',
    TELEGRAM: 'telegram',
  } as const,

  /** Threshold for considering a response successful */
  SUCCESS_THRESHOLD: {
    /** Minimum length for a non-empty response */
    MIN_RESPONSE_LENGTH: 1,
  } as const,
} as const;

// Rate Limiting Constants
export const RATE_LIMIT_CONSTANTS = {
  /** Error code for rate limit exceeded */
  ERROR_CODE: 'RATE_LIMIT_EXCEEDED',

  /** Maximum delay in milliseconds before throwing rate limit error */
  MAX_DELAY_MS: 60000,
} as const;

// Logging Constants
export const LOGGING_CONSTANTS = {
  /** Log levels */
  LEVELS: {
    INFO: 'info',
    ERROR: 'error',
    WARN: 'warn',
  } as const,
} as const;

// Utility Functions for Dynamic Constants

/**
 * Creates a document info object for logging purposes
 * @param doc - Document with metadata
 * @param index - Index of the document in the list
 * @returns Formatted document info object
 */
export function createDocumentInfo({
  doc,
  index,
}: {
  doc: { source: string; fromLine?: number; toLine?: number };
  index: number;
}) {
  return {
    [`doc_${index + 1}`]: `${doc.source}:${doc.fromLine}-${doc.toLine}`,
  };
}

/**
 * Creates source reference object for API responses
 * @param doc - Document with metadata
 * @param index - Index of the document in the list
 * @param type - Document type
 * @returns Source reference object
 */
export function createSourceReference({
  doc,
  index,
  type,
}: {
  doc: { id: string; source: string; fromLine?: number; toLine?: number };
  index: number;
  type?: string;
}) {
  return {
    id: doc.id,
    source: doc.source,
    fromLine: doc.fromLine,
    toLine: doc.toLine,
    position: index + 1,
    type: type,
  };
}

/**
 * Formats a rate limit error message
 * @param model - Model name
 * @param limit - Rate limit
 * @param used - Used amount
 * @param requested - Requested amount
 * @param delay - Delay time string
 * @returns Formatted error message
 */
export function formatRateLimitErrorMessage({
  model,
  limit,
  used,
  requested,
  delay,
}: {
  model: string;
  limit: number | null;
  used: number | null;
  requested: number | null;
  delay: string;
}): string {
  return `Rate limit reached for model '${model}'. Limit: ${limit}, Used: ${used}, Requested: ${requested}. Please try again in ${delay}.`;
}

export const BOT_FALLBACK_MESSAGES = [
  'Ой, я сейчас не могу ответить 🙏 Попробуйте чуть позже.',
  'Кажется, у меня небольшой перерыв. Скоро вернусь 🙂',
  'Я тут немного завис 🤖 Давайте попробуем позже.',
  'Что-то пошло не так, но мы уже разбираемся.',
  'Сейчас не получается ответить, извините за неудобства.',
  'Я временно недоступен, но совсем ненадолго!',
  'Похоже, у меня техническая пауза. Загляните позже.',
  'Ответить не получилось, давайте попробуем чуть позже.',
  'Я получил сообщение, но ответить пока не могу.',
  'Небольшой сбой, уже чиним ⚙️',
  'Упс! Сейчас я не на связи.',
  'Я здесь, но без ответов 😅 Попробуйте позже.',
  'Кажется, мне нужен короткий перерыв. Скоро продолжим!',
  'Не удалось ответить прямо сейчас, но мы рядом 🙂',
  'Чуть-чуть не получилось ответить. Повторим позже?',
  'Моя логика сейчас отдыхает 😴 Скоро вернусь.',
  'Сегодня я немного торможу, извините 🙈',
  'Сервис на минутной паузе. Спасибо за терпение!',
  'Я временно не могу помочь, но это ненадолго.',
  'Что-то пошло не по плану, уже исправляем.',
  'Ответ сейчас недоступен, попробуйте ещё раз позже.',
  'Небольшие технические трудности, скоро всё заработает.',
  'Я не пропал, просто временно недоступен 🙂',
  'Похоже, сейчас не мой лучший момент. Попробуйте позже.',
  'Я вас слышу, но ответить не могу.',
  'Система взяла короткий тайм-аут ⏸️',
  'Ещё немного, и я снова смогу отвечать!',
  'Сейчас не получилось обработать сообщение.',
  'Я на техническом перерыве, скоро вернусь.',
  'Давайте попробуем снова чуть позже 👍',
];

/**
 * Checks if a response is considered successful
 * @param response - Response string to check
 * @returns Boolean indicating if response is successful
 */
export function isSuccessfulResponse(
  response: string | null | undefined,
): boolean {
  return response !== null && response !== undefined && response?.trim() !== '';
}
