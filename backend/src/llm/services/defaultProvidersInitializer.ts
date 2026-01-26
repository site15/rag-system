// defaultProvidersInitializer.ts - Service to initialize default providers in "ChatLlmModel" table
import { PrismaService } from '../../services/prisma.service';
import { ConfigManager } from '../config';
import { PROVIDER_NAMES } from '../constants';
import { Logger } from '../logger';

export interface ProviderConfig {
  provider: string;
  model: string;
  temperature: number;
  chunkSize: number;
}

export class DefaultProvidersInitializer {
  /**
   * Initialize default providers in "ChatLlmModel" table
   * This should be called at system startup to populate the table with
   * default configurations for all supported providers
   */
  static async initializeDefaultProviders(): Promise<void> {
    Logger.logInfo('Initializing default providers in "ChatLlmModel" table');

    // Get all supported providers from ConfigManager
    const supportedProviders = Object.values(PROVIDER_NAMES);

    for (const provider of supportedProviders) {
      try {
        // Get configuration for this provider
        const config = ConfigManager.getChatConfig(provider);

        await this.createProviderIfNotExists({
          provider,
          model: config.model,
          temperature: config.temperature,
          baseUrl: config.baseUrl,

          chunkSize: config.chunkSize,
          isActive:
            !!config.apiKey ||
            !!process.env.CHAT_PROVIDER?.split(',')?.includes(provider),
        });
      } catch (error) {
        Logger.logError(`Failed to initialize provider ${provider}`, {
          error: error instanceof Error ? error.message : String(error),
        });
        // Continue with other providers even if one fails
      }
    }

    Logger.logInfo('Default providers initialization completed');
  }

  private static async createProviderIfNotExists({
    provider,
    model,
    temperature,
    chunkSize,
    baseUrl,
    isActive,
  }: {
    provider: string;
    model: string;
    temperature: number;
    chunkSize: number;
    baseUrl: string;
    isActive: boolean;
  }): Promise<void> {
    try {
      // First, try to find existing record with same configuration
      const existingRecord =
        await PrismaService.instance.chatLlmModel.findFirst({
          where: {
            provider,
            model,
            temperature,
            chunkSize,
            baseUrl,
          },
          select: {
            id: true,
          },
        });

      const status = 'deactivated'; // Always set to deactivated when calling this method

      if (!existingRecord) {
        // Record doesn't exist, insert new one
        await PrismaService.instance.chatLlmModel.create({
          data: {
            provider: provider,
            model: model,
            temperature: temperature,
            chunkSize: chunkSize || null,
            status: status,
            isActive,
            baseUrl,
          },
        });
      }
    } catch (error) {
      Logger.logError(
        'Failed to create provider',
        {
          error: error instanceof Error ? error.message : String(error),
          provider,
          model,
        },
        (error as Error).stack,
      );
      throw error;
    }
  }

  static async getSortedActiveProviders() {
    try {
      // Note: Complex time-based filtering and aggregations require raw SQL
      // For now, using simplified Prisma query with basic filtering
      const activeProviders =
        await PrismaService.instance.chatLlmModel.findMany({
          where: {
            isActive: true,
          },
          orderBy: [
            {
              endTime: 'desc',
            },
            {
              provider: 'asc',
            },
            {
              model: 'asc',
            },
          ],
        });

      return activeProviders.map((row) => ({
        provider: row.provider,
        model: row.model,
        temperature: row.temperature
          ? parseFloat(row.temperature.toString())
          : 1,
        baseUrl: row.baseUrl,
        chunkSize: row.chunkSize,
        id: row.id,
      }));
    } catch (error) {
      Logger.logError('Failed to get sorted active providers', {
        error: error instanceof Error ? error.message : String(error),
      });
      return [];
    }
  }

  static async getNextActiveProvider() {
    try {
      const activeProviders = await this.getSortedActiveProviders();

      Logger.logInfo('activeProviders', activeProviders);

      const provider = activeProviders?.[1] || null;

      return {
        ...ConfigManager.getChatConfig(provider?.provider),
        ...(provider?.provider ? { provider: provider?.provider } : {}),
        ...(provider?.model ? { model: provider.model } : {}),
        ...(provider?.temperature ? { temperature: provider.temperature } : {}),
        ...(provider?.chunkSize ? { chunkSize: provider.chunkSize } : {}),
        ...(provider?.baseUrl ? { baseUrl: provider.baseUrl } : {}),
        ...(provider?.id ? { id: provider.id } : {}),
      };
    } catch (error) {
      Logger.logError('Failed to get next active provider', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  static async getActiveProvider(skipDefault = false) {
    try {
      const activeProviders = await this.getSortedActiveProviders();

      Logger.logInfo('activeProviders', activeProviders);

      const provider = activeProviders?.[0] || null;

      Logger.logInfo('provider', provider);
      return {
        ...(!skipDefault
          ? ConfigManager.getChatConfig(provider?.provider)
          : {}),
        ...(provider?.provider ? { provider: provider.provider } : {}),
        ...(provider?.model ? { model: provider.model } : {}),
        ...(provider?.temperature ? { temperature: provider.temperature } : {}),
        ...(provider?.chunkSize ? { chunkSize: provider.chunkSize } : {}),
        ...(provider?.baseUrl ? { baseUrl: provider.baseUrl } : {}),
        ...(provider?.id ? { id: provider.id } : {}),
      };
    } catch (error) {
      Logger.logError('Failed to get next active provider', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }
}
