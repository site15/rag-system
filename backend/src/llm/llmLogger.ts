import { addPayloadToTrace, Trace } from '../trace/trace.module';
import { AttemptsCallbacksOptions, LLMFactory } from './llmFactory';
import { Logger } from './logger';
import {
  ModelExecutionOptions,
  ModelExecutionTracker,
} from './services/modelExecutionTracker';

export interface LLMLogEntry {
  id: string;
  timestamp: Date;
  prompt: string;
  response: string;
  tokensUsed?: {
    input: number;
    output: number;
    total: number;
  };
  executionTime: number;
  metadata?: Record<string, any>;
}

export class LLMLogger {
  /**
   * Calls the LLM with unified request/response logging in LLMFactory.invoke
   */
  @Trace()
  static async callWithLogging({
    prompt,
    metadata,
    dialogId,
    messageId,
    attemptsCallbacks,
  }: {
    prompt: string;
    metadata?: Record<string, any>;
    dialogId: string | undefined;
    messageId: string | undefined;
    attemptsCallbacks?: (options: AttemptsCallbacksOptions) => Promise<any>;
  }): Promise<{ logId: string | undefined; content: string }> {
    addPayloadToTrace({
      messageId,
      dialogId,
    });

    try {
      const modelOptions: ModelExecutionOptions = {};
      await ModelExecutionTracker.startExecution(modelOptions);
    } catch (trackingError) {
      Logger.logError('Failed to start model execution tracking', {
        error:
          trackingError instanceof Error
            ? trackingError.message
            : String(trackingError),
      });
    }

    const logIdRef: { value?: string } = {};

    try {
      const content = await LLMFactory.invoke(
        prompt,
        attemptsCallbacks,
        undefined,
        {
          dialogId,
          messageId,
          metadata,
          logId: logIdRef,
        },
      );

      return { logId: logIdRef.value, content };
    } catch (error) {
      Logger.logError(
        'LLM Request Failed',
        {
          promptLength: prompt?.length,
          error: (error as Error).message,
          metadata,
          dialogId,
          messageId,
        },
        (error as Error).stack,
      );

      throw error;
    }
  }
}
