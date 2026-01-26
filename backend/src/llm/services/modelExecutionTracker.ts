// modelExecutionTracker.ts - Service for tracking model execution timing and status
import { PrismaService } from '../../services/prisma.service';
import { Logger } from '../logger';
import { DefaultProvidersInitializer } from './defaultProvidersInitializer';

export interface ModelExecutionOptions {
  llmQueryLogId?: string | null;
}

export interface ModelExecutionRecord {
  id: string;
  provider: string;
  model: string;
  temperature?: number;
  chunkSize?: number;
  llmQueryLogId?: string | null;
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
  static async startExecution(options: ModelExecutionOptions): Promise<string> {
    const provider = await DefaultProvidersInitializer.getActiveProvider();
    try {
      if (provider.id) {
        // Record exists, update it
        await PrismaService.instance.chatLlmModel.update({
          where: {
            id: provider.id,
          },
          data: {
            startTime: new Date(),
            status: 'running',
            lastRequestId: options.llmQueryLogId?.toString(),
            updatedAt: new Date(),
          },
          select: {
            id: true,
          },
        });

        const recordId = provider.id;

        Logger.logInfo('Updated existing model execution tracking', {
          recordId,
          provider: provider.provider || '',
          model: provider.model || '',
          temperature: provider.temperature,
          chunkSize: provider.chunkSize,
        });

        return recordId;
      } else {
        // Record doesn't exist, insert new one
        const newRecord = await PrismaService.instance.chatLlmModel.create({
          data: {
            baseUrl: provider.baseUrl || '',
            temperature: provider.temperature,
            chunkSize: provider.chunkSize,
            provider: provider.provider || '',
            model: provider.model || '',
            lastRequestId: options.llmQueryLogId?.toString(),
            startTime: new Date(),
            status: 'running',
          },
          select: {
            id: true,
          },
        });

        const recordId = newRecord.id;

        Logger.logInfo('Inserted new model execution tracking', {
          recordId,
          provider: provider.provider,
          model: provider.model,
          temperature: provider.temperature,
          chunkSize: provider.chunkSize,
        });

        return recordId;
      }
    } catch (error) {
      Logger.logError('Failed to start model execution tracking', {
        error: error instanceof Error ? error.message : String(error),
        provider: provider.provider,
        model: provider.model,
      });
      throw error;
    }
  }

  /**
   * Complete a model execution with success status
   */
  static async completeExecution(
    recordId: string,
    llmQueryLogId?: string,
  ): Promise<boolean> {
    try {
      const result = await PrismaService.instance.chatLlmModel.update({
        where: {
          id: recordId,
        },
        data: {
          endTime: new Date(),
          status: 'success',
          lastRequestId: llmQueryLogId?.toString(),
          updatedAt: new Date(),
        },
      });

      Logger.logInfo('Completed model execution tracking', {
        recordId,
        status: 'success',
      });

      return result !== null;
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
    recordId: string,
    errorMessage?: string,
  ): Promise<boolean> {
    try {
      const result = await PrismaService.instance.chatLlmModel.update({
        where: {
          id: recordId,
        },
        data: {
          endTime: new Date(),
          status: 'failure',
          updatedAt: new Date(),
        },
      });

      Logger.logInfo('Failed model execution tracking', {
        recordId,
        status: 'failure',
        errorMessage,
      });

      return result !== null;
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
  static async timeoutExecution(recordId: string): Promise<boolean> {
    try {
      const result = await PrismaService.instance.chatLlmModel.update({
        where: {
          id: recordId,
        },
        data: {
          endTime: new Date(),
          status: 'timeout',
          updatedAt: new Date(),
        },
      });

      Logger.logInfo('Timed out model execution tracking', {
        recordId,
        status: 'timeout',
      });

      return result !== null;
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
    recordId: string,
  ): Promise<ModelExecutionRecord | null> {
    try {
      const execution = await PrismaService.instance.chatLlmModel.findFirst({
        where: {
          id: recordId,
        },
      });

      if (!execution) return null;

      return {
        id: execution.id,
        provider: execution.provider,
        model: execution.model,
        temperature: execution.temperature
          ? parseFloat(execution.temperature.toString())
          : undefined,
        chunkSize: execution.chunkSize || undefined,
        llmQueryLogId: execution.lastRequestId
          ? execution.lastRequestId
          : undefined,
        startTime: execution.startTime || new Date(),
        endTime: execution.endTime || undefined,
        status: execution.status as
          | 'running'
          | 'success'
          | 'failure'
          | 'timeout',
        createdAt: execution.createdAt,
        updatedAt: execution.updatedAt,
      };
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
      const whereConditions: any = {};

      if (status) {
        whereConditions.status = status;
      }

      const executions = await PrismaService.instance.chatLlmModel.findMany({
        where: whereConditions,
        orderBy: {
          startTime: 'desc',
        },
        take: limit,
      });

      return executions.map((execution) => ({
        id: execution.id,
        provider: execution.provider,
        model: execution.model,
        temperature: execution.temperature
          ? parseFloat(execution.temperature.toString())
          : undefined,
        chunkSize: execution.chunkSize || undefined,
        llmQueryLogId: execution.lastRequestId
          ? execution.lastRequestId
          : undefined,
        startTime: execution.startTime || new Date(),
        endTime: execution.endTime || undefined,
        status: execution.status as
          | 'running'
          | 'success'
          | 'failure'
          | 'timeout',
        createdAt: execution.createdAt,
        updatedAt: execution.updatedAt,
      }));
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
