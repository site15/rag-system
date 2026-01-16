import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { ConfigManager } from './config';
import { Database } from './database';
import { Logger } from './logger';
import { LLMQueryLogger } from './services/llmQueryLogger';
import {
  ModelExecutionOptions,
  ModelExecutionTracker,
} from './services/modelExecutionTracker';

export interface LLMLogEntry {
  id: string;
  timestamp: Date;
  model: string;
  provider: string;
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
  private static logEntries: LLMLogEntry[] = [];

  /**
   * Logs an LLM request and response
   */
  static async logLLMCall({
    llm,
    prompt,
    response,
    startTime,
    metadata,
    provider,
  }: {
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    prompt: string;
    response: string;
    startTime: number;
    metadata?: Record<string, any>;
    provider: string;
  }): Promise<void> {
    // Extract model information
    const modelName = (llm as any).modelName || (llm as any).model;

    // Calculate execution time
    const executionTime = Date.now() - startTime;

    // Create log entry
    const logEntry: LLMLogEntry = {
      id: `llm_call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      model: modelName,
      provider,
      prompt,
      response,
      executionTime,
      metadata: metadata || {},
    };

    try {
      // Add to log entries
      this.logEntries.push(logEntry);

      // Log to console/file/database as needed
      Logger.logInfo('LLM Request Completed', {
        id: logEntry.id,
        model: logEntry.model,
        provider: logEntry.provider,
        promptLength: logEntry.prompt.length,
        responseLength: logEntry.response.length,
        executionTime: logEntry.executionTime,
        metadata: logEntry.metadata,
      });

      // All logging is now handled by the main logger, which writes to both console and file

      // Optional: Save to file or database
      // This could be implemented to persist logs
    } catch (error) {
      Logger.logError('Error logging LLM call', {
        error: (error as Error).message,
      });

      // All logging is now handled by the main logger, which writes to both console and file
    }
  }

  /**
   * Calls the LLM and logs the full request/response
   */
  static async callWithLogging({
    llm,
    prompt,
    metadata,
    provider,
    dialogId,
    historyId,
    abortController,
  }: {
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    prompt: string;
    metadata?: Record<string, any>;
    provider: string;
    dialogId: number | undefined;
    historyId: number | undefined;
    abortController?: AbortController;
  }): Promise<{ logId: number | undefined; content: string }> {
    const startTime = Date.now();
    let timeoutId: NodeJS.Timeout | null = null;
    let executionTrackingId: number | null = null;

    try {
      Logger.logInfo('LLM Request Initiated', {
        model: (llm as any).modelName || (llm as any).model,
        promptLength: prompt.length,
        prompt,
        metadata,
      });

      // Set up timeout handling
      const TIMEOUT_MS = ConfigManager.getLLMConfig().timeoutMs; // 3 minutes default

      // Start model execution tracking with the logId
      try {
        const modelOptions: ModelExecutionOptions = {
          provider,
          model: (llm as any).modelName || (llm as any).model,
          temperature: (llm as any).temperature,
          chunkSize: metadata?.chunkSize,
        };

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

      // Create promise that rejects on timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error(`LLM call timed out after ${TIMEOUT_MS}ms`));
        }, TIMEOUT_MS);
      });

      // Check if the LLM is blocked before making the call
      const modelName = (llm as any).modelName || (llm as any).model;
      const temperature = (llm as any).temperature
        ? +(llm as any).temperature
        : 1;
      const chunkSize = metadata?.chunkSize;

      const isBlocked = await this.isLLMBlocked(
        provider,
        modelName,
        temperature,
        chunkSize,
      );

      if (isBlocked) {
        const errorMsg = `LLM call blocked: ${provider}/${modelName} is deactivated`;
        Logger.logError(errorMsg, {
          provider,
          model: modelName,
          temperature,
          chunkSize,
        });

        // Mark execution as failed
        if (executionTrackingId) {
          await ModelExecutionTracker.failExecution(
            executionTrackingId,
            errorMsg,
          );
        }

        throw new Error(errorMsg);
      }

      // Call the LLM with abort signal if provided
      const llmCallPromise = abortController
        ? llm
            .invoke(prompt, { signal: abortController.signal })
            .then(async (result) =>
              typeof result === 'string' ? result.trim() : result,
            )
        : llm
            .invoke(prompt)
            .then(async (result) =>
              typeof result === 'string' ? result.trim() : result,
            );

      // Race between LLM call and timeout
      const result = await Promise.race([llmCallPromise, timeoutPromise]);
      let response: string;
      if (typeof result === 'string') {
        response = result;
      } else if (typeof result === 'object' && result.content) {
        // Handle different content types
        if (typeof result.content === 'string') {
          response = result.content;
        } else if (Array.isArray(result.content)) {
          // For complex content arrays, convert to string
          response = result.content
            .map((item: any) => {
              if (typeof item === 'string') return item;
              if (item.type === 'text' && item.text) return item.text;
              return JSON.stringify(item);
            })
            .join(' ');
        } else {
          response = JSON.stringify(result.content);
        }
      } else {
        response = JSON.stringify(result);
      }

      response = response.trim();

      // Log the successful call
      await this.logLLMCall({
        provider,
        llm,
        prompt,
        response,
        startTime,
        metadata,
      });

      // Also log to database for analytics
      const logId =
        (await this.logToDatabase({
          provider,
          llm,
          prompt,
          response,
          startTime,
          metadata,
          success: true,
          dialogId,
          historyId,
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
          model: (llm as any).modelName || (llm as any).model,
          promptLength: prompt.length,
          executionTime,
          error: (error as Error).message,
          metadata,
        },
        (error as Error).stack,
      );

      // Log the failed call as well
      await this.logLLMCall({
        provider,
        llm,
        prompt,
        response: `ERROR: ${(error as Error).message}`,
        startTime,
        metadata: {
          ...metadata,
          error: (error as Error).message,
          failed: true,
        },
      });

      // Also log failure to database
      const logId = await this.logToDatabase({
        provider,
        llm,
        prompt,
        response: `ERROR: ${(error as Error).message}`,
        startTime,
        metadata: {
          ...metadata,
          error: (error as Error).message,
          failed: true,
        },
        success: false,
        errorMessage: (error as Error).message,
        dialogId,
        historyId,
      });

      throw error;
    } finally {
      // Clean up timeout if it exists
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }

  /**
   * Gets all logged LLM calls
   */
  static getLogEntries(): LLMLogEntry[] {
    return [...this.logEntries];
  }

  /**
   * Clears all log entries
   */
  static clearLogEntries(): void {
    this.logEntries = [];
  }

  /**
   * Gets recent log entries (last N entries)
   */
  static getRecentLogEntries(count: number = 10): LLMLogEntry[] {
    return this.logEntries.slice(-count);
  }

  /**
   * Checks if the LLM with specific options is blocked (active field is not true)
   * @param provider - LLM provider name
   * @param model - Model name
   * @param temperature - Temperature setting
   * @param chunkSize - Chunk size (optional)
   * @returns Promise<boolean> - true if blocked, false if active or not found
   */
  private static async isLLMBlocked(
    provider: string,
    model: string,
    temperature: number,
    chunkSize?: number,
  ): Promise<boolean> {
    try {
      const query = `
        SELECT active 
        FROM model_execution_tracking 
        WHERE provider = $1 
          AND model = $2 
        LIMIT 1
      `;

      const result = await Database.getInstance().query(query, [
        provider,
        model,
      ]);

      Logger.logInfo('LLM Blocked Check', {
        provider,
        model,
        temperature,
        chunkSize,
        result,
      });

      // If no record found, assume it's not blocked (default behavior)
      if (result.rows.length === 0) {
        return false;
      }

      // Return true if active is false or null (blocked), false if active is true
      const active = result.rows[0].active;
      return active !== true;
    } catch (error) {
      Logger.logError('Failed to check LLM blocked status', {
        error: error instanceof Error ? error.message : String(error),
        provider,
        model,
        temperature,
        chunkSize,
      });
      // On error, assume not blocked to avoid preventing legitimate requests
      return false;
    }
  }

  /**
   * Logs LLM query to database for analytics
   */
  private static async logToDatabase({
    llm,
    prompt,
    response,
    startTime,
    metadata,
    success = true,
    errorMessage,
    provider,
    dialogId,
    historyId,
  }: {
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    prompt: string;
    response: string;
    startTime: number;
    metadata?: Record<string, any>;
    success?: boolean;
    errorMessage?: string;
    provider: string;
    dialogId: number | undefined;
    historyId: number | undefined;
  }): Promise<number | null> {
    try {
      // Extract provider and model information
      const modelName = (llm as any).modelName || (llm as any).model;
      const temperature = (llm as any).temperature;

      // Calculate execution time
      const executionTimeMs = Date.now() - startTime;

      // Create database log entry
      const logId = await LLMQueryLogger.logQuery({
        request: prompt,
        response: response,
        requestLength: prompt.length,
        responseLength: response.length,
        executionTimeMs: executionTimeMs,
        provider,
        model: modelName,
        temperature: temperature,
        success: success,
        errorMessage: errorMessage,
        dialogId,
        historyId,
      });

      return logId;
    } catch (dbError) {
      // Don't let database logging errors break the main flow
      Logger.logError('Failed to log LLM query to database', {
        error: (dbError as Error).message,
        promptLength: prompt.length,
      });
      return null;
    }
  }
}
