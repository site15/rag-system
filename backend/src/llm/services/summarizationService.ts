import { Worker } from 'worker_threads';
import { DialogSummary } from '../dialogSummary';
import { Logger } from '../logger';

export class SummarizationService {
  private static activeWorkers = new Map<string, Worker>();
  // Queue for pending summarization tasks
  private static pendingTasks: Array<{
    dialogId: string;
  }> = [];

  // Track active summarizations to prevent duplicates
  private static activeSummarizations = new Set<string>();

  public static async queueSummarization({
    dialogId,
    messageId,
  }: {
    dialogId: string;
    messageId: string;
  }) {
    // Don't queue if already active
    if (this.activeSummarizations.has(dialogId)) {
      Logger.logInfo('Суммаризация уже активна, пропуск', { dialogId });
      return;
    }

    // Add to pending tasks
    this.pendingTasks.push({ dialogId });

    Logger.logInfo('Добавление задачи суммаризации в очередь', { dialogId });

    // Process the queue asynchronously without blocking
    this.processQueue(messageId);
  }

  private static processQueue(messageId: string) {
    // Process one task at a time from the queue
    if (this.pendingTasks?.length > 0 && this.activeSummarizations.size < 5) {
      // Limit concurrent summarizations
      const task = this.pendingTasks.shift();

      if (task) {
        const { dialogId } = task;

        // Mark as active to prevent duplicate processing
        this.activeSummarizations.add(dialogId);

        // Run summarization in the background without blocking
        this.performSummarization({ dialogId, messageId })
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
            setImmediate(() => this.processQueue(messageId));
          });
      }
    }
  }

  private static async performSummarization({
    dialogId,
    messageId,
  }: {
    dialogId: string;
    messageId: string;
  }) {
    try {
      Logger.logInfo('Начало суммаризации в фоновом режиме', {
        dialogId,
        messageId,
      });
      const result = await DialogSummary.summarizeDialog({
        dialogId,
        messageId,
      });
      Logger.logInfo('Суммаризация завершена успешно', { dialogId, messageId });
      return result;
    } catch (error) {
      Logger.logError(
        'Ошибка при выполнении суммаризации',
        {
          dialogId,
          messageId,
          error: (error as Error).message,
        },
        (error as Error).stack,
      );
      throw error;
    }
  }

  public static queueSummarizationWithoutBlocking({
    messageId,
    dialogId,
  }: {
    messageId: string;
    dialogId: string;
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
      this.pendingTasks.push({ dialogId });

      Logger.logInfo(
        'Добавление задачи суммаризации в очередь (без ожидания)',
        { dialogId },
      );

      // Process the queue asynchronously without blocking
      this.processQueue(messageId);
    } catch (error) {
      Logger.logError(
        'Ошибка при постановке задачи суммаризации в очередь',
        {
          dialogId,
          error: (error as Error).message,
        },
        (error as Error).stack,
      );
      if (
        (error as any).code === 'RATE_LIMIT_EXCEEDED' ||
        error.message?.includes('429')
      ) {
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
