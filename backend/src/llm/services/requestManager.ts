// requestManager.ts - Manages concurrent requests per dialog ID
import { Logger } from '../logger';

interface ActiveRequest {
  dialogId: number;
  requestId: string;
  startTime: Date;
  abortController: AbortController;
}

export class RequestManager {
  // Track active requests by dialog ID
  private static activeRequests = new Map<number, ActiveRequest>();

  /**
   * Registers a new request for a dialog and cancels any existing request for the same dialog
   * @param dialogId - The dialog ID to register the request for
   * @returns AbortController for the new request
   */
  public static registerRequest(dialogId: number): AbortController {
    // Cancel existing request for this dialog if one exists
    const existingRequest = this.activeRequests.get(dialogId);
    if (existingRequest) {
      Logger.logInfo('Canceling existing request for dialog', {
        dialogId,
        existingRequestId: existingRequest.requestId,
        durationMs: Date.now() - existingRequest.startTime.getTime(),
      });

      // Abort the existing request
      existingRequest.abortController.abort();
      this.activeRequests.delete(dialogId);
    }

    // Create new request
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const abortController = new AbortController();

    const newRequest: ActiveRequest = {
      dialogId,
      requestId,
      startTime: new Date(),
      abortController,
    };

    this.activeRequests.set(dialogId, newRequest);

    Logger.logInfo('Registered new request for dialog', {
      dialogId,
      requestId,
    });

    return abortController;
  }

  /**
   * Unregisters a completed request
   * @param dialogId - The dialog ID of the completed request
   */
  public static unregisterRequest(dialogId: number): void {
    const request = this.activeRequests.get(dialogId);
    if (request) {
      Logger.logInfo('Unregistered completed request for dialog', {
        dialogId,
        requestId: request.requestId,
        durationMs: Date.now() - request.startTime.getTime(),
      });
      this.activeRequests.delete(dialogId);
    }
  }

  /**
   * Checks if there's an active request for a dialog
   * @param dialogId - The dialog ID to check
   * @returns boolean indicating if there's an active request
   */
  public static hasActiveRequest(dialogId: number): boolean {
    return this.activeRequests.has(dialogId);
  }

  /**
   * Gets the active request for a dialog (if any)
   * @param dialogId - The dialog ID to get the request for
   * @returns ActiveRequest or undefined
   */
  public static getActiveRequest(dialogId: number): ActiveRequest | undefined {
    return this.activeRequests.get(dialogId);
  }

  /**
   * Gets all active requests for debugging
   * @returns Array of active requests
   */
  public static getAllActiveRequests(): ActiveRequest[] {
    return Array.from(this.activeRequests.values());
  }

  /**
   * Cleans up old/stale requests (requests older than 10 minutes)
   */
  public static cleanupStaleRequests(): void {
    const now = Date.now();
    const staleThreshold = 10 * 60 * 1000; // 10 minutes

    for (const [dialogId, request] of this.activeRequests.entries()) {
      const age = now - request.startTime.getTime();
      if (age > staleThreshold) {
        Logger.logWarn('Cleaning up stale request', {
          dialogId,
          requestId: request.requestId,
          ageMinutes: Math.round(age / 60000),
        });
        this.activeRequests.delete(dialogId);
      }
    }
  }

  /**
   * Gets statistics about active requests
   * @returns Statistics object
   */
  public static getStatistics(): {
    totalActive: number;
    requestsByDialog: Record<number, number>;
  } {
    const stats = {
      totalActive: this.activeRequests.size,
      requestsByDialog: {} as Record<number, number>,
    };

    for (const [dialogId] of this.activeRequests.entries()) {
      stats.requestsByDialog[dialogId] =
        (stats.requestsByDialog[dialogId] || 0) + 1;
    }

    return stats;
  }
}
