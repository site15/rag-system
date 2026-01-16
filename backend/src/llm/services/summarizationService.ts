import { Worker } from 'worker_threads';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { ChatGroq } from '@langchain/groq';
import { DialogSummary } from '../dialogSummary';
import { Logger } from '../logger';

interface SummarizationTask {
  dialogId: string;
  llmConfig: {
    provider: string;
    model: string;
    temperature: number;
    baseUrl: string;
    apiKey?: string;
  };
}

export class SummarizationService {
  private static activeWorkers = new Map<string, Worker>();
  // Queue for pending summarization tasks
  private static pendingTasks: Array<{
    dialogId: string;
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
  }> = [];

  // Track active summarizations to prevent duplicates
  private static activeSummarizations = new Set<string>();

  public static async queueSummarization({
    dialogId,
    llm,
    provider,
    historyId,
  }: {
    dialogId: string;
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    provider: string;
    historyId: string;
  }) {
    // Don't queue if already active
    if (this.activeSummarizations.has(dialogId)) {
      Logger.logInfo('Суммаризация уже активна, пропуск', { dialogId });
      return;
    }

    // Add to pending tasks
    this.pendingTasks.push({ dialogId, llm });

    Logger.logInfo('Добавление задачи суммаризации в очередь', { dialogId });

    // Process the queue asynchronously without blocking
    this.processQueue(provider, historyId);
  }

  private static processQueue(provider: string, historyId: string) {
    // Process one task at a time from the queue
    if (this.pendingTasks.length > 0 && this.activeSummarizations.size < 5) {
      // Limit concurrent summarizations
      const task = this.pendingTasks.shift();

      if (task) {
        const { dialogId, llm } = task;

        // Mark as active to prevent duplicate processing
        this.activeSummarizations.add(dialogId);

        // Run summarization in the background without blocking
        this.performSummarization({ provider, dialogId, historyId, llm })
          .catch((error) => {
            Logger.logError(
              'Ошибка при суммаризации',
              {
                dialogId,
                error: error.message,
              },
              (error as Error).stack,
            );
          })
          .finally(() => {
            // Remove from active set when done
            this.activeSummarizations.delete(dialogId);
            // Process next task if available
            setImmediate(() => this.processQueue(provider, historyId));
          });
      }
    }
  }

  private static async performSummarization({
    dialogId,
    llm,
    provider,
    historyId,
  }: {
    dialogId: string;
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    provider: string;
    historyId: string;
  }) {
    try {
      Logger.logInfo('Начало суммаризации в фоновом режиме', {
        dialogId,
        historyId,
      });
      const result = await DialogSummary.summarizeDialog({
        provider,
        dialogId,
        llm,
        historyId,
      });
      Logger.logInfo('Суммаризация завершена успешно', { dialogId, historyId });
      return result;
    } catch (error) {
      Logger.logError(
        'Ошибка при выполнении суммаризации',
        {
          dialogId,
          historyId,
          error: (error as Error).message,
        },
        (error as Error).stack,
      );
      throw error;
    }
  }

  public static queueSummarizationWithoutBlocking({
    historyId,
    dialogId,
    llm,
    provider,
  }: {
    historyId: string;
    dialogId: string;
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    provider: string;
  }) {
    // This version doesn't wait for the summarization to complete
    // It just queues the task and returns immediately
    try {
      // Don't queue if already active
      if (this.activeSummarizations.has(dialogId)) {
        Logger.logInfo('Суммаризация уже активна, пропуск', { dialogId });
        return;
      }

      // Add to pending tasks
      this.pendingTasks.push({ dialogId, llm });

      Logger.logInfo(
        'Добавление задачи суммаризации в очередь (без ожидания)',
        { dialogId },
      );

      // Process the queue asynchronously without blocking
      this.processQueue(provider, historyId);
    } catch (error) {
      Logger.logError(
        'Ошибка при постановке задачи суммаризации в очередь',
        {
          dialogId,
          error: (error as Error).message,
        },
        (error as Error).stack,
      );
      if ((error as any).code === 'RATE_LIMIT_EXCEEDED') {
        throw error;
      }
    }
  }

  public static async stopAllWorkers() {
    // For this implementation, we just clear the pending tasks
    this.pendingTasks = [];
    Logger.logInfo('Очередь суммаризации очищена');
  }
}
