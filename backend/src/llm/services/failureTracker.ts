import { PrismaService } from '../../services/prisma.service';
import { Logger } from '../logger';

export class FailureTracker {
  /**
   * Record a successful response in chat history
   */
  public static async recordSuccess(
    dialogId: string,
    messageId: string,
  ): Promise<void> {
    Logger.logInfo('Recording successful response', {
      dialogId,
      messageId,
    });

    // Reset consecutive failures counter for the dialog
    await PrismaService.instance.chatDialog.update({
      where: {
        id: dialogId,
      },
      data: {
        consecutiveFailures: 0,
      },
    });

    // Mark the chat history entry as successful
    await PrismaService.instance.chatMessage.update({
      where: { deletedAt: null, id: messageId },
      data: {
        isGoodResponse: true,
      },
    });

    Logger.logInfo('Success recorded', { dialogId, messageId });
  }

  /**
   * Record a failed response in chat history
   */
  public static async recordFailure(
    dialogId: string,
    messageId: string,
  ): Promise<void> {
    Logger.logInfo('Recording failed response', { dialogId, messageId });

    // Increment consecutive failures counter for the dialog
    const updatedDialog = await PrismaService.instance.chatDialog.update({
      where: {
        id: dialogId,
      },
      data: {
        consecutiveFailures: {
          increment: 1,
        },
      },
      select: {
        consecutiveFailures: true,
      },
    });

    const currentFailures = updatedDialog.consecutiveFailures || 0;
    Logger.logInfo('Consecutive failures updated', {
      dialogId,
      currentFailures,
      maxAllowed: this.getMaxConsecutiveFailures(),
    });

    // Mark the chat history entry as failed
    await PrismaService.instance.chatMessage.update({
      where: { deletedAt: null, id: messageId },
      data: {
        isBadResponse: true,
      },
    });

    // If we've reached the maximum consecutive failures, mark dialog as failed
    if (currentFailures >= this.getMaxConsecutiveFailures()) {
      await PrismaService.instance.chatDialog.update({
        where: {
          id: dialogId,
        },
        data: {
          isFailed: true,
        },
      });
      Logger.logInfo('Dialog marked as failed due to consecutive failures', {
        dialogId,
        failures: currentFailures,
      });
    }
  }

  /**
   * Check if a dialog has reached the maximum consecutive failures
   */
  public static async isDialogFailed(dialogId: string): Promise<boolean> {
    const dialog = await PrismaService.instance.chatDialog.findUnique({
      where: {
        id: dialogId,
      },
      select: {
        isFailed: true,
        consecutiveFailures: true,
      },
    });

    if (!dialog) {
      return false;
    }

    Logger.logInfo('Dialog failure status checked', {
      dialogId,
      isFailed: dialog.isFailed,
      consecutiveFailures: dialog.consecutiveFailures,
    });

    return dialog.isFailed;
  }

  /**
   * Get the current consecutive failure count for a dialog
   */
  public static async getConsecutiveFailures(
    dialogId: string,
  ): Promise<number> {
    const dialog = await PrismaService.instance.chatDialog.findUnique({
      where: {
        id: dialogId,
      },
      select: {
        consecutiveFailures: true,
      },
    });

    return dialog?.consecutiveFailures || 0;
  }

  /**
   * Get the maximum allowed consecutive failures from environment
   */
  public static getMaxConsecutiveFailures(): number {
    return parseInt(process.env.MAX_CONSECUTIVE_FAILURES || '5', 10);
  }
}
