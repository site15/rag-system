import { PrismaService } from '../../services/prisma.service';
import { Logger } from '../logger';

export interface LLMQueryLogEntry {
  request: string;
  response: string;
  requestLength: number;
  responseLength: number;
  executionTimeMs: number;
  provider: string;
  model: string;
  temperature?: number;
  success?: boolean;
  errorMessage?: string;
  dialogId: string | undefined;
  messageId: string | undefined;
}

export class LLMQueryLogger {
  /**
   * Logs a low-level LLM query with timing and metrics
   * @param entry - The LLM query log entry with all metrics
   */
  static async logQuery(entry: LLMQueryLogEntry): Promise<string | null> {
    try {
      const chatLlmRequest = await PrismaService.instance.chatLlmRequest.create(
        {
          data: {
            request: entry.request,
            response: entry.response,
            requestLength: entry.requestLength,
            responseLength: entry.responseLength,
            executionTimeMs: entry.executionTimeMs,
            provider: entry.provider,
            model: entry.model,
            temperature: entry.temperature,
            isSuccess: entry.success !== undefined ? entry.success : true,
            errorMessage: entry.errorMessage || null,
            dialogId: entry.dialogId?.toString(),
            messageId: entry.messageId?.toString(),
          },
          select: {
            id: true,
          },
        },
      );

      const recordId = chatLlmRequest.id;

      Logger.logInfo('LLM query logged successfully', {
        recordId,
        provider: entry.provider,
        model: entry.model,
        requestLength: entry.requestLength,
        responseLength: entry.responseLength,
        executionTimeMs: entry.executionTimeMs,
      });

      return recordId;
    } catch (error) {
      Logger.logError(
        'Failed to log LLM query',
        {
          error: error instanceof Error ? error.message : String(error),
          provider: entry.provider,
          model: entry.model,
        },
        (error as Error).stack,
      );
      // Don't throw error to avoid breaking the main flow
      throw error;
    }
  }

  /**
   * Gets query statistics by provider and model
   */
  static async getQueryStats(
    provider?: string,
    model?: string,
    hoursBack: number = 24,
  ): Promise<any[]> {
    try {
      const whereConditions: any = {
        createdAt: {
          gte: new Date(Date.now() - hoursBack * 60 * 60 * 1000),
        },
      };

      if (provider) {
        whereConditions.provider = provider;
      }

      if (model) {
        whereConditions.model = model;
      }

      // Note: Complex aggregations with CASE statements require raw SQL
      // For now, returning simplified grouped data
      const results = await PrismaService.instance.chatLlmRequest.groupBy({
        by: ['provider', 'model'],
        where: whereConditions,
        _count: true,
        _avg: {
          executionTimeMs: true,
          requestLength: true,
          responseLength: true,
        },
        orderBy: {
          provider: 'asc',
          model: 'asc',
        },
      });

      return results.map((result: any) => ({
        provider: result.provider,
        model: result.model,
        total_queries: result._count,
        avg_execution_time: result._avg?.executionTimeMs,
        avg_request_length: result._avg?.requestLength,
        avg_response_length: result._avg?.responseLength,
        successful_queries: 0, // Would need raw SQL for exact counts
        failed_queries: 0, // Would need raw SQL for exact counts
      }));
    } catch (error) {
      Logger.logError('Failed to get LLM query stats', {
        error: error instanceof Error ? error.message : String(error),
      });
      return [];
    }
  }

  /**
   * Updates an existing LLM query log entry with dialog and history references
   */

  static async updateQueryReferences(
    recordIds: (string | undefined)[],
    dialogId: string | undefined,
    messageId: string | undefined,
  ): Promise<boolean> {
    try {
      if (recordIds.length === 0) {
        Logger.logInfo('No record IDs provided for update', {});
        return true;
      }

      const validRecordIds = recordIds.filter(Boolean).map((id) => id!);

      // Update multiple records using Prisma's updateMany
      const result = await PrismaService.instance.chatLlmRequest.updateMany({
        where: {
          id: {
            in: validRecordIds,
          },
        },
        data: {
          dialogId: dialogId || null,
          messageId: messageId || null,
          updatedAt: new Date(),
        },
      });

      Logger.logInfo('LLM query references updated successfully', {
        recordIds,
        dialogId,
        messageId,
        updatedRecords: result.count,
      });

      return result.count > 0;
    } catch (error) {
      Logger.logError('Failed to update LLM query references', {
        error: error instanceof Error ? error.message : String(error),
        recordIds,
        dialogId,
        messageId,
      });
      return false;
    }
  }

  /**
   * Gets recent slow queries (execution time > threshold)
   */
  static async getSlowQueries(
    thresholdMs: number = 5000,
    limit: number = 10,
  ): Promise<any[]> {
    try {
      const slowQueries = await PrismaService.instance.chatLlmRequest.findMany({
        where: {
          executionTimeMs: {
            gt: thresholdMs,
          },
        },
        orderBy: {
          executionTimeMs: 'desc',
        },
        take: limit,
      });

      return slowQueries;
    } catch (error) {
      Logger.logError('Failed to get slow LLM queries', {
        error: error instanceof Error ? error.message : String(error),
      });
      return [];
    }
  }
}
