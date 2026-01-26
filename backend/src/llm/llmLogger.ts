import Mustache from 'mustache';
import { addPayloadToTrace, Trace } from '../trace/trace.module';
import { Logger } from './logger';
import { LLMQueryLogger } from './services/llmQueryLogger';
import {
  ModelExecutionOptions,
  ModelExecutionTracker,
} from './services/modelExecutionTracker';
import { getConstant, GetConstantKey } from '../utils/get-constant';

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
   * Calls the LLM and logs the full request/response
   */
  @Trace()
  static async callWithLogging({
    prompt,
    metadata,
    dialogId,
    messageId,
    callback,
  }: {
    prompt: string;
    metadata?: Record<string, any>;
    dialogId: string | undefined;
    messageId: string | undefined;
    callback: (prompt: string) => Promise<any>;
  }): Promise<{ logId: string | undefined; content: string }> {
    addPayloadToTrace({
      messageId,
      dialogId,
    });

    const startTime = Date.now();
    let executionTrackingId: string | null = null;

    try {
      Logger.logInfo('LLM Request Initiated', {
        promptLength: prompt?.length,
        metadata,
      });

      // Start model execution tracking with the logId
      try {
        const modelOptions: ModelExecutionOptions = {};

        executionTrackingId =
          await ModelExecutionTracker.startExecution(modelOptions);
      } catch (trackingError) {
        Logger.logError('Failed to start model execution tracking', {
          error:
            trackingError instanceof Error
              ? trackingError.message
              : String(trackingError),
        });
        // Continue execution even if tracking fails
      }

      const response = await callback(prompt);

      // Also log to database for analytics
      const logId =
        (await this.logToDatabase({
          prompt,
          response,
          startTime,
          metadata,
          success: true,
          dialogId,
          messageId,
        })) || undefined;

      // Mark execution as successful
      if (executionTrackingId) {
        await ModelExecutionTracker.completeExecution(
          executionTrackingId,
          logId,
        );
      }

      return { logId, content: response };
    } catch (error) {
      const executionTime = Date.now() - startTime;

      // Handle timeout specifically
      let isTimeout = false;
      if (error instanceof Error && error.message.includes('timed out')) {
        isTimeout = true;
        // Mark execution as timeout
        if (executionTrackingId) {
          await ModelExecutionTracker.timeoutExecution(executionTrackingId);
        }
      } else {
        // Mark execution as failed for other errors
        if (executionTrackingId) {
          await ModelExecutionTracker.failExecution(
            executionTrackingId,
            error instanceof Error ? error.message : String(error),
          );
        }
      }

      Logger.logError(
        'LLM Request Failed',
        {
          promptLength: prompt?.length,
          executionTime,
          error: (error as Error).message,
          metadata,
        },
        (error as Error).stack,
      );

      // Also log failure to database
      const logId = await this.logToDatabase({
        prompt,
        response: Mustache.render('ERROR: {{errorMessage}}', {
          errorMessage: (error as Error).message,
        }),
        startTime,
        metadata: {
          ...metadata,
          error: (error as Error).message,
          failed: true,
        },
        success: false,
        errorMessage: (error as Error).message,
        dialogId,
        messageId,
      });

      throw error;
    }
  }

  /**
   * Logs LLM query to database for analytics
   */
  private static async logToDatabase({
    prompt,
    response,
    startTime,
    metadata,
    success = true,
    errorMessage,
    dialogId,
    messageId,
  }: {
    prompt: string;
    response: string;
    startTime: number;
    metadata?: Record<string, any>;
    success?: boolean;
    errorMessage?: string;
    dialogId: string | undefined;
    messageId: string | undefined;
  }): Promise<string | null> {
    try {
      // Calculate execution time
      const executionTimeMs = Date.now() - startTime;

      // Create database log entry
      const logId = await LLMQueryLogger.logQuery({
        request: prompt,
        response: response,
        requestLength: prompt?.length,
        responseLength: response?.length,
        executionTimeMs: executionTimeMs,
        success: success,
        errorMessage: errorMessage,
        dialogId,
        messageId,
      });

      return logId;
    } catch (dbError) {
      // Don't let database logging errors break the main flow
      Logger.logError('Failed to log LLM query to database', {
        error: (dbError as Error).message,
        promptLength: prompt?.length,
      });
      return null;
    }
  }
}
