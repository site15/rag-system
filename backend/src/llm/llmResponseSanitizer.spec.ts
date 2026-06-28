import { describe, expect, it } from '@jest/globals';
import {
  getLlmSafetyMisfireMessage,
  getLlmSafetyVerdict,
  getProhibitedContentMessage,
  isLlmSafeMisfireResponse,
  isLlmSafetyClassifierResponse,
  isLlmUnsafeContentResponse,
  sanitizeLlmUserResponse,
  toHumanLlmResponse,
} from './llmResponseSanitizer';

describe('llmResponseSanitizer', () => {
  describe('getLlmSafetyVerdict', () => {
    it.each([
      ['safe', 'safe_misfire'],
      ['User Safety: safe', 'safe_misfire'],
      ['{"violation": 0, "category": null}', 'safe_misfire'],
      ['{"violation": 1, "category": "S1"}', 'unsafe_content'],
      ['unsafe\nS1', 'unsafe_content'],
      ['User Safety: unsafe\nS2', 'unsafe_content'],
      ['Привет!', 'none'],
    ] as const)('classifies %s as %s', (response, verdict) => {
      expect(getLlmSafetyVerdict(response)).toBe(verdict);
    });
  });

  describe('isLlmSafetyClassifierResponse', () => {
    it.each([
      'safe',
      'User Safety: safe',
      'unsafe\nS1',
      'User Safety: unsafe\nS2',
      '{"violation": 0, "category": null}',
    ])('detects safety classifier response: %s', (response) => {
      expect(isLlmSafetyClassifierResponse(response)).toBe(true);
    });

    it.each([
      'Привет! Чем могу помочь?',
      '[FOUND] Кандидат работал в NestJS',
      'unsafe content but long answer with details',
      '{"answer": "safe"}',
    ])('does not flag normal response: %s', (response) => {
      expect(isLlmSafetyClassifierResponse(response)).toBe(false);
    });
  });

  describe('isLlmUnsafeContentResponse', () => {
    it('detects unsafe verdicts', () => {
      expect(isLlmUnsafeContentResponse('unsafe\nS1')).toBe(true);
      expect(isLlmUnsafeContentResponse('User Safety: unsafe')).toBe(true);
    });

    it('does not flag safe misfire', () => {
      expect(isLlmUnsafeContentResponse('safe')).toBe(false);
      expect(isLlmSafeMisfireResponse('safe')).toBe(true);
    });
  });

  describe('sanitizeLlmUserResponse', () => {
    it('returns prohibited message for unsafe content', () => {
      expect(sanitizeLlmUserResponse('unsafe\nS1')).toBe(
        getProhibitedContentMessage(),
      );
    });

    it('returns null for safe misfire', () => {
      expect(sanitizeLlmUserResponse('User Safety: safe')).toBeNull();
    });

    it('returns trimmed normal response', () => {
      expect(sanitizeLlmUserResponse('  Привет!  ')).toBe('Привет!');
    });
  });

  describe('toHumanLlmResponse', () => {
    it('returns prohibited message for unsafe content', () => {
      expect(toHumanLlmResponse('User Safety: unsafe\nS1')).toBe(
        getProhibitedContentMessage(),
      );
    });

    it('returns user message with reason for safe misfire', () => {
      expect(toHumanLlmResponse('safe')).toBe(getLlmSafetyMisfireMessage());
      expect(toHumanLlmResponse('User Safety: safe')).toBe(
        getLlmSafetyMisfireMessage(),
      );
    });

    it('returns original response when it is valid', () => {
      expect(toHumanLlmResponse('Нормальный ответ')).toBe('Нормальный ответ');
    });
  });
});
