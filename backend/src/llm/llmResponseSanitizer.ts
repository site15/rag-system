import { BOT_FALLBACK_MESSAGES } from './constants';

export const PROHIBITED_CONTENT_ERROR = 'PROHIBITED_CONTENT';

const SAFETY_PREFIX_PATTERN = /^(?:user|assistant|content)?\s*safety\s*:\s*/i;

const UNSAFE_VERDICT_PATTERN =
  /^unsafe(?:\s*[\n\r]+\s*S\d+(?:\s*,\s*S\d+)*)?$/i;

const SAFE_MISFIRE_PATTERN = /^safe$/i;

export type LlmSafetyVerdict = 'none' | 'safe_misfire' | 'unsafe_content';

export class ProhibitedContentError extends Error {
  constructor() {
    super(PROHIBITED_CONTENT_ERROR);
    this.name = 'ProhibitedContentError';
  }
}

export function isProhibitedContentError(
  error: unknown,
): error is ProhibitedContentError {
  return (
    error instanceof ProhibitedContentError ||
    (error instanceof Error && error.message === PROHIBITED_CONTENT_ERROR)
  );
}

export function getProhibitedContentMessage(): string {
  return 'Ваш запрос не может быть обработан, так как он содержит запрещённый контент. Пожалуйста, переформулируйте вопрос.';
}

export function getLlmSafetyMisfireMessage(): string {
  return 'Не удалось сформировать ответ: модель вернула служебный результат проверки безопасности вместо текста. Попробуйте переформулировать вопрос.';
}

export function getLlmSafetyReplacementReason(
  verdict: Exclude<LlmSafetyVerdict, 'none'>,
): string {
  if (verdict === 'unsafe_content') {
    return 'Модель классифицировала ответ как небезопасный';
  }

  return 'Модель вернула служебный вердикт безопасности вместо ответа';
}

function stripSafetyPrefix(response: string): string {
  return response.replace(SAFETY_PREFIX_PATTERN, '').trim();
}

function isUnsafeVerdictText(response: string): boolean {
  return UNSAFE_VERDICT_PATTERN.test(response);
}

function isSafeMisfireText(response: string): boolean {
  return SAFE_MISFIRE_PATTERN.test(response);
}

function normalizeLlmResponseText(response: unknown): string {
  if (response === null || response === undefined) {
    return '';
  }

  if (typeof response === 'string') {
    return response;
  }

  if (
    typeof response === 'number' ||
    typeof response === 'boolean' ||
    typeof response === 'bigint'
  ) {
    return String(response);
  }

  if (typeof response === 'object') {
    const record = response as Record<string, unknown>;
    for (const key of ['content', 'text', 'answer'] as const) {
      const value = record[key];
      if (typeof value === 'string') {
        return value;
      }
    }

    try {
      return JSON.stringify(response);
    } catch {
      return '';
    }
  }

  return '';
}

function getJsonSafetyVerdict(response: string): LlmSafetyVerdict | null {
  try {
    const parsed = JSON.parse(response) as { violation?: unknown };
    if (!parsed || typeof parsed !== 'object' || !('violation' in parsed)) {
      return null;
    }

    if ('answer' in parsed || 'content' in parsed || 'text' in parsed) {
      return null;
    }

    if (parsed.violation === 0) {
      return 'safe_misfire';
    }

    if (typeof parsed.violation === 'number' && parsed.violation > 0) {
      return 'unsafe_content';
    }
  } catch {
    return null;
  }

  return null;
}

export function getLlmSafetyVerdict(response: unknown): LlmSafetyVerdict {
  const trimmed = normalizeLlmResponseText(response).trim();
  if (!trimmed) {
    return 'none';
  }

  const jsonVerdict = getJsonSafetyVerdict(trimmed);
  if (jsonVerdict) {
    return jsonVerdict;
  }

  if (isUnsafeVerdictText(trimmed)) {
    return 'unsafe_content';
  }

  if (isSafeMisfireText(trimmed)) {
    return 'safe_misfire';
  }

  const withoutPrefix = stripSafetyPrefix(trimmed);
  if (withoutPrefix !== trimmed) {
    return getLlmSafetyVerdict(withoutPrefix);
  }

  return 'none';
}

/**
 * Ответы Llama Guard и аналогичных safeguard-моделей, которые иногда
 * попадают вместо нормального текста для пользователя.
 */
export function isLlmSafetyClassifierResponse(response: unknown): boolean {
  const verdict = getLlmSafetyVerdict(response);
  return verdict !== 'none';
}

export function isLlmUnsafeContentResponse(response: unknown): boolean {
  return getLlmSafetyVerdict(response) === 'unsafe_content';
}

export function isLlmSafeMisfireResponse(response: unknown): boolean {
  return getLlmSafetyVerdict(response) === 'safe_misfire';
}

export function getBotFallbackMessage(): string {
  return BOT_FALLBACK_MESSAGES[
    Math.floor(Math.random() * BOT_FALLBACK_MESSAGES.length)
  ];
}

export function sanitizeLlmUserResponse(response: unknown): string | null {
  const trimmed = normalizeLlmResponseText(response).trim();
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
    return null;
  }

  const verdict = getLlmSafetyVerdict(trimmed);
  if (verdict === 'unsafe_content') {
    return getProhibitedContentMessage();
  }

  if (verdict === 'safe_misfire') {
    return null;
  }

  return trimmed;
}

export function toHumanLlmResponse(response: unknown): string {
  const verdict = getLlmSafetyVerdict(response);
  if (verdict === 'unsafe_content') {
    return getProhibitedContentMessage();
  }

  return sanitizeLlmUserResponse(response) ?? getLlmSafetyMisfireMessage();
}
