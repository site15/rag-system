import { Database } from '../database';
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
  dialogId: number | undefined;
  historyId: number | undefined;
}

export class LLMQueryLogger {
  /**
   * Logs a low-level LLM query with timing and metrics
   * @param entry - The LLM query log entry with all metrics
   */
  static async logQuery(entry: LLMQueryLogEntry): Promise<number | null> {
    try {
      const query = `
        INSERT INTO llm_query_log 
        (request, response, request_length, response_length, execution_time_ms, 
         provider, model, temperature, success, error_message, dialog_id, history_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `;

      const values = [
        entry.request,
        entry.response,
        entry.requestLength,
        entry.responseLength,
        entry.executionTimeMs,
        entry.provider,
        entry.model,
        entry.temperature ? +entry.temperature : 0,
        entry.success !== undefined ? entry.success : true,
        entry.errorMessage || null,
        entry.dialogId || null,
        entry.historyId || null,
      ];

      const result = await Database.getInstance().query(
        query + ' RETURNING id',
        values,
      );
      const recordId = result.rows[0]?.id;

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
      let query = `
        SELECT 
          provider,
          model,
          COUNT(*) as total_queries,
          AVG(execution_time_ms) as avg_execution_time,
          AVG(request_length) as avg_request_length,
          AVG(response_length) as avg_response_length,
          SUM(CASE WHEN success = true THEN 1 ELSE 0 END) as successful_queries,
          SUM(CASE WHEN success = false THEN 1 ELSE 0 END) as failed_queries
        FROM llm_query_log
        WHERE created_at >= NOW() - INTERVAL '${hoursBack} hours'
      `;

      const conditions = [];
      const params = [];

      if (provider) {
        conditions.push(`provider = $${params.length + 1}`);
        params.push(provider);
      }

      if (model) {
        conditions.push(`model = $${params.length + 1}`);
        params.push(model);
      }

      if (conditions.length > 0) {
        query += ' AND ' + conditions.join(' AND ');
      }

      query += `
        GROUP BY provider, model
        ORDER BY total_queries DESC
      `;

      const result = await Database.getInstance().query(query, params);
      return result.rows;
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
    recordIds: (number | undefined)[],
    dialogId: number | undefined,
    historyId: number | undefined,
  ): Promise<boolean> {
    try {
      if (recordIds.length === 0) {
        Logger.logInfo('No record IDs provided for update', {});
        return true;
      }

      // Create placeholders for the IN clause: $1, $2, $3, etc.
      const query = `
        UPDATE llm_query_log 
        SET dialog_id = $2, 
            history_id = $3
        WHERE id = ANY($1)
      `;

      const values = [
        recordIds.filter(Boolean).map((n) => +n!),
        dialogId || null,
        historyId || null,
      ];

      const result = await Database.getInstance().query(query, values);

      Logger.logInfo('LLM query references updated successfully', {
        recordIds,
        dialogId,
        historyId,
        updatedRecords: result.rowCount || 0,
      });

      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      Logger.logError('Failed to update LLM query references', {
        error: error instanceof Error ? error.message : String(error),
        recordIds,
        dialogId,
        historyId,
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
      const query = `
        SELECT *
        FROM llm_query_log
        WHERE execution_time_ms > $1
        ORDER BY execution_time_ms DESC
        LIMIT $2
      `;

      const result = await Database.getInstance().query(query, [
        thresholdMs,
        limit,
      ]);
      return result.rows;
    } catch (error) {
      Logger.logError('Failed to get slow LLM queries', {
        error: error instanceof Error ? error.message : String(error),
      });
      return [];
    }
  }
}
