import { AppConfig } from '@/types';
import { ConfigManager } from '../config';
import { Database } from '../database';
import { Logger } from '../logger';

export class FailureTracker {
  private static appConfig: AppConfig | null = null;

  private static getMaxConsecutiveFailuresValue(): number {
    if (!this.appConfig) {
      this.appConfig = ConfigManager.getAppConfig();
    }
    return this.appConfig.maxConsecutiveFailures;
  }

  public static setAppConfig(config: AppConfig) {
    this.appConfig = config;
  }

  /**
   * Record a successful response in chat history
   */
  public static async recordSuccess(
    dialogId: number,
    chatHistoryId: number,
  ): Promise<void> {
    Logger.logInfo('Recording successful response', {
      dialogId,
      chatHistoryId,
    });

    // Reset consecutive failures counter for the dialog
    await Database.getInstance().query(
      `
      UPDATE new_chat_dialogs 
      SET consecutive_failures = 0,
          updated_at = now()
      WHERE id = $1
      `,
      [dialogId],
    );

    // Mark the chat history entry as successful
    await Database.getInstance().query(
      `
      UPDATE new_chat_history 
      SET success = true
      WHERE id = $1
      `,
      [chatHistoryId],
    );

    Logger.logInfo('Success recorded', { dialogId, chatHistoryId });
  }

  /**
   * Record a failed response in chat history
   */
  public static async recordFailure(
    dialogId: number,
    chatHistoryId: number,
  ): Promise<void> {
    Logger.logInfo('Recording failed response', { dialogId, chatHistoryId });

    // Increment consecutive failures counter for the dialog
    const result = await Database.getInstance().query(
      `
      UPDATE new_chat_dialogs 
      SET consecutive_failures = consecutive_failures + 1,
          updated_at = now()
      WHERE id = $1
      RETURNING consecutive_failures
      `,
      [dialogId],
    );

    const currentFailures = result.rows[0]?.consecutive_failures || 0;
    Logger.logInfo('Consecutive failures updated', {
      dialogId,
      currentFailures,
      maxAllowed: this.getMaxConsecutiveFailuresValue(),
    });

    // Mark the chat history entry as failed
    await Database.getInstance().query(
      `
      UPDATE new_chat_history 
      SET success = false
      WHERE id = $1
      `,
      [chatHistoryId],
    );

    // If we've reached the maximum consecutive failures, mark dialog as failed
    if (currentFailures >= this.getMaxConsecutiveFailuresValue()) {
      await Database.getInstance().query(
        `
        UPDATE new_chat_dialogs 
        SET is_failed = true,
            updated_at = now()
        WHERE id = $1
        `,
        [dialogId],
      );
      Logger.logInfo('Dialog marked as failed due to consecutive failures', {
        dialogId,
        failures: currentFailures,
      });
    }
  }

  /**
   * Check if a dialog has reached the maximum consecutive failures
   */
  public static async isDialogFailed(dialogId: number): Promise<boolean> {
    const result = await Database.getInstance().query(
      `
      SELECT is_failed, consecutive_failures
      FROM new_chat_dialogs 
      WHERE id = $1
      `,
      [dialogId],
    );

    const dialog = result.rows[0];
    if (!dialog) {
      return false;
    }

    Logger.logInfo('Dialog failure status checked', {
      dialogId,
      isFailed: dialog.is_failed,
      consecutiveFailures: dialog.consecutive_failures,
    });

    return dialog.is_failed;
  }

  /**
   * Get the current consecutive failure count for a dialog
   */
  public static async getConsecutiveFailures(
    dialogId: number,
  ): Promise<number> {
    const result = await Database.getInstance().query(
      `
      SELECT consecutive_failures
      FROM new_chat_dialogs 
      WHERE id = $1
      `,
      [dialogId],
    );

    return result.rows[0]?.consecutive_failures || 0;
  }

  /**
   * Get the maximum allowed consecutive failures from environment
   */
  public static getMaxConsecutiveFailures(): number {
    return this.getMaxConsecutiveFailuresValue();
  }
}
