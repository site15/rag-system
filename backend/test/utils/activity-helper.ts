import { finalize, from, map, mergeMap } from 'rxjs';
import { X_API_KEY } from '../../src/guards/auth.guard';
import { getRandomSha7 } from '../../src/utils/get-random-sha7';
import { AuthUser, Sdk } from '../generated/client';
import { Client, Config, createClient } from '../generated/client/client';
import { client } from '../generated/client/client.gen';

export class ActivityHelper {
  private apiKey: string | null = null;
  private client: Client;

  randomSha7 = getRandomSha7();
  randomUserInfo?: { email: string; password: string };

  authUser: AuthUser | null = null;
  sdk: Sdk;

  constructor(config: Config = {}) {
    this.client = createClient({ ...config, throwOnError: true });
    this.sdk = new Sdk({
      client: this.client,
    });
  }

  sse<T>(...args: Parameters<typeof client.sse.get>) {
    const controller = new AbortController();
    const options = args[0];
    return from(
      this.client.sse.get({
        ...options,
        signal: controller.signal,
      }),
    ).pipe(
      mergeMap(({ stream }) => from(stream)),
      map((e) => e as T),
      finalize(() => controller.abort()),
    );
  }

  async getAuthProfile() {
    const result = await this.sdk.authControllerInfo();
    this.authUser = result.data || null;
    return result.data;
  }

  async loginByApiKey({ apiKey }: { apiKey: string }) {
    try {
      this.apiKey = apiKey;
      this.updateClientConfig();
      const result = await this.sdk.authControllerInfo();
      this.authUser = result.data || null;
      this.updateClientConfig();
      return result.data;
    } catch (error) {
      this.apiKey = null;
      this.authUser = null;
      this.updateClientConfig();
      throw error;
    }
  }

  getOrCreateRandomUserInfo() {
    if (!this.randomUserInfo) {
      this.randomUserInfo = {
        email: `test_${this.randomSha7}@example.com`,
        password: 'validPassword123',
      };
    }
    return this.randomUserInfo;
  }

  async waitForMessageReady({
    dialogId,
    messageId,
    timeoutMs = 120_000,
    pollIntervalMs = 2_000,
  }: {
    dialogId: string;
    messageId: string;
    timeoutMs?: number;
    pollIntervalMs?: number;
  }) {
    const started = Date.now();

    while (Date.now() - started < timeoutMs) {
      const result = await this.sdk.flowControllerDialog({
        query: { dialogId },
      });
      const message = result.data?.items.find((item) => item.id === messageId);

      if (message?.answerSentAt && message.answer) {
        return message;
      }

      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    }

    throw new Error(`Message ${messageId} was not ready within ${timeoutMs}ms`);
  }

  private updateClientConfig() {
    this.client.setConfig({
      headers: {
        [X_API_KEY]: this.apiKey || null,
      },
    });
  }
}
