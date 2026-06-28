import { beforeAll, describe, expect, it } from '@jest/globals';
import { ActivityHelper } from './utils/activity-helper';

describe('Flow: FlowController (e2e)', () => {
  const activity = new ActivityHelper({
    baseUrl: process.env.API_URL,
  });
  const firstAdminApiKey = process.env.ADMIN_API_KEYS?.split(',')[0] || '';

  let dialogId = '';
  let messageId = '';

  beforeAll(async () => {
    await activity.loginByApiKey({ apiKey: firstAdminApiKey });
  });

  describe('GET /flow/dialog', () => {
    it('returns empty list for null dialogId', async () => {
      const result = await activity.sdk.flowControllerDialog({
        query: { dialogId: 'null' },
      });

      expect(result.data?.items).toEqual([]);
      expect(result.data?.meta).toMatchObject({
        curPage: 1,
        perPage: 5,
        totalResults: 0,
      });
    });

    it('returns paginated messages with custom curPage and perPage', async () => {
      const sendResult = await activity.sdk.flowControllerMessageSend({
        body: {
          message: `E2E pagination test ${activity.randomSha7}`,
        },
      });

      dialogId = sendResult.data!.dialogId;
      messageId = sendResult.data!.id;

      const result = await activity.sdk.flowControllerDialog({
        query: {
          dialogId,
          curPage: 1,
          perPage: 10,
        },
      });

      expect(result.data?.meta).toMatchObject({
        curPage: 1,
        perPage: 10,
        totalResults: 1,
      });
      expect(result.data?.items).toHaveLength(1);
      expect(result.data?.items[0]).toMatchObject({
        id: messageId,
        dialogId,
        question: expect.stringContaining('E2E pagination test'),
        isProcessing: true,
      });
    });

    it('includes prompts when showPrompts=true', async () => {
      const result = await activity.sdk.flowControllerDialog({
        query: {
          dialogId,
          showPrompts: true,
        },
      });

      expect(result.data?.items[0]?.prompts).toBeDefined();
    });

    it('does not include prompts when showPrompts=false', async () => {
      const result = await activity.sdk.flowControllerDialog({
        query: {
          dialogId,
          showPrompts: false,
        },
      });

      expect(result.data?.items[0]?.prompts).toBeUndefined();
    });
  });

  describe('POST /flow/message/send', () => {
    it('starts new dialog without dialogId', async () => {
      const result = await activity.sdk.flowControllerMessageSend({
        body: {
          message: `E2E new dialog ${activity.randomSha7}`,
        },
      });

      expect(result.data).toMatchObject({
        id: expect.any(String),
        dialogId: expect.any(String),
        question: expect.stringContaining('E2E new dialog'),
        answer: '',
        isProcessing: true,
        questionReceivedAt: expect.any(String),
        answerSentAt: null,
      });
    });

    it('creates new dialog when dialogId is not a valid UUID', async () => {
      const result = await activity.sdk.flowControllerMessageSend({
        body: {
          message: `E2E invalid dialogId ${activity.randomSha7}`,
          dialogId: 'not-a-uuid',
        },
      });

      expect(result.data?.dialogId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      );
    });

    it('accepts provider, model, temperature and constants', async () => {
      const result = await activity.sdk.flowControllerMessageSend({
        body: {
          message: `E2E with options ${activity.randomSha7}`,
          provider: process.env.CHAT_PROVIDER || undefined,
          model: process.env.GROQ_CHAT_MODEL || undefined,
          temperature: 0.7,
          constants: [{ key: 'testKey', constant: 'testValue' }],
        },
      });

      expect(result.data?.id).toBeTruthy();
      expect(result.data?.dialogId).toBeTruthy();
    });

    it('rejects when dialog is already processing', async () => {
      try {
        await activity.sdk.flowControllerMessageSend({
          body: {
            message: 'Second message while processing',
            dialogId,
          },
        });
      } catch (error) {
        expect(error).toMatchObject({
          error: 'Dialog is already processing',
        });
      }
    });

    it('continues existing dialog after previous message is ready', async () => {
      await activity.waitForMessageReady({ dialogId, messageId });

      const result = await activity.sdk.flowControllerMessageSend({
        body: {
          message: `E2E continue dialog ${activity.randomSha7}`,
          dialogId,
        },
      });

      expect(result.data?.dialogId).toBe(dialogId);

      const dialog = await activity.sdk.flowControllerDialog({
        query: { dialogId },
      });

      expect(dialog.data?.meta.totalResults).toBeGreaterThanOrEqual(2);
    });
  });

  describe('GET /flow/message/trace', () => {
    it('returns trace for existing message', async () => {
      const result = await activity.sdk.flowControllerGetMessageTrace({
        query: { messageId },
      });

      expect(result.data).toMatchObject({
        messageId,
      });
      expect(result.data?.trace).toBeDefined();
    });

    it('returns null trace for nonexistent message', async () => {
      const result = await activity.sdk.flowControllerGetMessageTrace({
        query: { messageId: '00000000-0000-0000-0000-000000000099' },
      });

      expect(result.data).toMatchObject({
        messageId: '00000000-0000-0000-0000-000000000099',
        trace: null,
      });
    });
  });

  describe('POST /flow/message/cancel', () => {
    it('soft deletes message and removes it from dialog', async () => {
      const sendResult = await activity.sdk.flowControllerMessageSend({
        body: {
          message: `E2E cancel test ${activity.randomSha7}`,
        },
      });

      const cancelDialogId = sendResult.data!.dialogId;
      const cancelMessageId = sendResult.data!.id;

      const cancelResult = await activity.sdk.flowControllerCancelMessage({
        body: { messageId: cancelMessageId },
      });

      expect(cancelResult.data).toMatchObject({ message: 'ok' });

      const dialog = await activity.sdk.flowControllerDialog({
        query: { dialogId: cancelDialogId },
      });

      expect(dialog.data?.items).toEqual([]);
      expect(dialog.data?.meta.totalResults).toBe(0);
    });
  });
});
