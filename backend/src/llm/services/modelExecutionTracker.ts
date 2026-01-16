// modelExecutionTracker.ts - Service for tracking model execution timing and status
import { Database } from '../database';
import { Logger } from '../logger';

export interface ModelExecutionOptions {
  provider: string;
  model: string;
  temperature?: number;
  chunkSize?: number;
  llmQueryLogId?: number | null;
}

export interface ModelExecutionRecord {
  id: number;
  provider: string;
  model: string;
  temperature?: number;
  chunkSize?: number;
  llmQueryLogId?: number | null;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'success' | 'failure' | 'timeout';
  createdAt: Date;
  updatedAt: Date;
}

export class ModelExecutionTracker {
  /**
   * Start tracking a model execution
   * First checks if record exists, then inserts or updates accordingly
   */
  static async startExecution(options: ModelExecutionOptions): Promise<number> {
    try {
      // First, try to find existing record with same configuration
      const findQuery = `
        SELECT id FROM model_execution_tracking 
        WHERE provider = $1 AND model = $2
        LIMIT 1
      `;

      const findValues = [options.provider, options.model];

      const findResult = await Database.getInstance().query(
        findQuery,
        findValues,
      );

      if (findResult.rows.length > 0) {
        // Record exists, update it
        const recordId = findResult.rows[0].id;
        const updateQuery = `
          UPDATE model_execution_tracking 
          SET start_time = NOW(),
              status = 'running',
              llm_query_log_id = $2,
              updated_at = NOW()
          WHERE id = $1
          RETURNING id
        `;

        const updateResult = await Database.getInstance().query(updateQuery, [
          recordId,
          options.llmQueryLogId || null,
        ]);

        Logger.logInfo('Updated existing model execution tracking', {
          recordId,
          provider: options.provider,
          model: options.model,
          temperature: options.temperature,
          chunkSize: options.chunkSize || 2000,
        });

        return updateResult.rows[0]?.id || recordId;
      } else {
        // Record doesn't exist, insert new one
        const insertQuery = `
          INSERT INTO model_execution_tracking 
          (provider, model, temperature, chunk_size, llm_query_log_id, start_time, status)
          VALUES ($1, $2, $3, $4, $5, NOW(), 'running')
          RETURNING id
        `;

        const insertValues = [
          options.provider,
          options.model,
          options.temperature ? +options.temperature : 1,
          options.chunkSize || 2000,
          options.llmQueryLogId || null,
        ];

        const insertResult = await Database.getInstance().query(
          insertQuery,
          insertValues,
        );
        const recordId = insertResult.rows[0]?.id;

        Logger.logInfo('Inserted new model execution tracking', {
          recordId,
          provider: options.provider,
          model: options.model,
          temperature: options.temperature,
          chunkSize: options.chunkSize || 2000,
        });

        return recordId;
      }
    } catch (error) {
      Logger.logError('Failed to start model execution tracking', {
        error: error instanceof Error ? error.message : String(error),
        provider: options.provider,
        model: options.model,
      });
      throw error;
    }
  }

  /**
   * Complete a model execution with success status
   */
  static async completeExecution(
    recordId: number,
    llmQueryLogId?: number,
  ): Promise<boolean> {
    try {
      const query = `
        UPDATE model_execution_tracking 
        SET end_time = NOW(), status = 'success', updated_at = NOW(), llm_query_log_id = $2
        WHERE id = $1
      `;

      const result = await Database.getInstance().query(query, [
        recordId,
        llmQueryLogId,
      ]);

      Logger.logInfo('Completed model execution tracking', {
        recordId,
        status: 'success',
      });

      return (result.rowCount || 0) > 0;
    } catch (error) {
      Logger.logError('Failed to complete model execution tracking', {
        error: error instanceof Error ? error.message : String(error),
        recordId,
      });
      return false;
    }
  }

  /**
   * Fail a model execution with failure status
   */
  static async failExecution(
    recordId: number,
    errorMessage?: string,
  ): Promise<boolean> {
    try {
      const query = `
        UPDATE model_execution_tracking 
        SET end_time = NOW(), status = 'failure', updated_at = NOW()
        WHERE id = $1
      `;

      const result = await Database.getInstance().query(query, [recordId]);

      Logger.logInfo('Failed model execution tracking', {
        recordId,
        status: 'failure',
        errorMessage,
      });

      return (result.rowCount || 0) > 0;
    } catch (error) {
      Logger.logError('Failed to mark model execution as failed', {
        error: error instanceof Error ? error.message : String(error),
        recordId,
      });
      return false;
    }
  }

  /**
   * Timeout a model execution
   */
  static async timeoutExecution(recordId: number): Promise<boolean> {
    try {
      const query = `
        UPDATE model_execution_tracking 
        SET end_time = NOW(), status = 'timeout', updated_at = NOW()
        WHERE id = $1
      `;

      const result = await Database.getInstance().query(query, [recordId]);

      Logger.logInfo('Timed out model execution tracking', {
        recordId,
        status: 'timeout',
      });

      return (result.rowCount || 0) > 0;
    } catch (error) {
      Logger.logError('Failed to mark model execution as timeout', {
        error: error instanceof Error ? error.message : String(error),
        recordId,
      });
      return false;
    }
  }

  /**
   * Get execution record by ID
   */
  static async getExecution(
    recordId: number,
  ): Promise<ModelExecutionRecord | null> {
    try {
      const query = `
        SELECT id, provider, model, temperature, chunk_size as "chunkSize", 
               llm_query_log_id as "llmQueryLogId",
               start_time as "startTime", end_time as "endTime", status,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM model_execution_tracking 
        WHERE id = $1
      `;

      const result = await Database.getInstance().query(query, [recordId]);
      return result.rows[0] || null;
    } catch (error) {
      Logger.logError('Failed to get model execution record', {
        error: error instanceof Error ? error.message : String(error),
        recordId,
      });
      return null;
    }
  }

  /**
   * Get recent executions with filtering options
   */
  static async getRecentExecutions(
    limit: number = 100,
    status?: string,
  ): Promise<ModelExecutionRecord[]> {
    try {
      let query = `
        SELECT id, provider, model, temperature, chunk_size as "chunkSize", 
               llm_query_log_id as "llmQueryLogId",
               start_time as "startTime", end_time as "endTime", status,
               created_at as "createdAt", updated_at as "updatedAt"
        FROM model_execution_tracking 
      `;

      const params: any[] = [];

      if (status) {
        query += `WHERE status = $1 `;
        params.push(status);
      }

      query += `ORDER BY start_time DESC LIMIT $${params.length + 1}`;
      params.push(limit);

      const result = await Database.getInstance().query(query, params);
      return result.rows;
    } catch (error) {
      Logger.logError('Failed to get recent model executions', {
        error: error instanceof Error ? error.message : String(error),
        limit,
        status,
      });
      return [];
    }
  }
}
