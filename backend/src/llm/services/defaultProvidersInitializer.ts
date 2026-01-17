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
    try {
      Logger.logInfo('Initializing default providers in "ChatLlmModel" table');

      // Get all supported providers from ConfigManager
      const supportedProviders = Object.values(PROVIDER_NAMES);

      for (const provider of supportedProviders) {
        try {
          // Get configuration for this provider
          const config = ConfigManager.getChatConfig(provider);

          // Logger.logInfo(`Processing provider ${provider}`, config);

          // Skip if essential config is missing
          // if (!config.model) {
          //   Logger.logInfo(
          //     `Skipping provider ${provider} - no model configured`,
          //   );
          //   continue;
          // }

          // Check if provider requires API key and if it's present
          const requiresApiKey = this.requiresApiKey(provider);
          const hasApiKey = !!config.apiKey && config.apiKey.trim().length > 0;

          if (requiresApiKey) {
            //  if (hasApiKey) {
            //    Logger.logInfo(
            //      `Activating provider ${provider} - missing API key`,
            //    );
            //  } else {
            //    Logger.logInfo(
            //      `Deactivating provider ${provider} - missing API key`,
            //    );
            //  }
            await this.activateOrDeactivateProvider(
              provider,
              config.model,
              config.temperature,
              config.chunkSize,
              hasApiKey,
            );
            continue;
          }

          // Create default provider entry
          const providerConfig: ProviderConfig = {
            provider: config.provider,
            model: config.model,
            temperature: config.temperature ? +config.temperature : 1,
            chunkSize: config.chunkSize,
          };

          await this.createOrUpdateProviderEntry(providerConfig);
        } catch (error) {
          Logger.logError(`Failed to initialize provider ${provider}`, {
            error: error instanceof Error ? error.message : String(error),
          });
          // Continue with other providers even if one fails
        }
      }

      Logger.logInfo('Default providers initialization completed');
    } catch (error) {
      Logger.logError(
        'Failed to initialize default providers',
        {
          error: error instanceof Error ? error.message : String(error),
        },
        (error as Error).stack,
      );
      throw error;
    }
  }

  /**
   * Check if a provider requires an API key to function
   * @param provider - Provider name
   * @returns boolean indicating if API key is required
   */
  private static requiresApiKey(provider: string): boolean {
    // These providers require API keys
    const apiKeyRequiredProviders = Object.values(PROVIDER_NAMES) as string[];

    return apiKeyRequiredProviders.includes(provider.toLowerCase());
  }

  /**
   * Activate or deactivate a provider in the "ChatLlmModel" table
   * First checks if record exists, then inserts or updates accordingly
   * @param provider - Provider name
   * @param model - Model name
   * @param temperature - Temperature setting
   * @param chunkSize - Chunk size
   * @param activate - Whether to activate (true) or deactivate (false)
   */
  private static async activateOrDeactivateProvider(
    provider: string,
    model: string,
    temperature: number,
    chunkSize: number,
    activate?: boolean,
  ): Promise<void> {
    try {
      // First, try to find existing record with same configuration
      const existingRecord =
        await PrismaService.instance.chatLlmModel.findFirst({
          where: {
            provider: provider,
            model: model,
          },
          select: {
            id: true,
            isActive: true,
          },
        });

      const isActive =
        activate === undefined ? null : activate === true ? true : false;
      const status = 'deactivated'; // Always set to deactivated when calling this method

      if (existingRecord) {
        // Record exists, update it
        const recordId = existingRecord.id;

        if (
          existingRecord.isActive !== true &&
          existingRecord.isActive !== false
        ) {
          await PrismaService.instance.chatLlmModel.update({
            where: {
              id: recordId,
            },
            data: {
              isActive: isActive,
              status: status,
            },
          });

          Logger.logInfo('Provider entry updated for activation/deactivation', {
            provider,
            model,
            temperature,
            chunkSize,
            active: isActive,
            status,
          });
        }
      } else {
        // Record doesn't exist, insert new one
        await PrismaService.instance.chatLlmModel.create({
          data: {
            provider: provider,
            model: model,
            temperature: temperature,
            chunkSize: chunkSize || null,
            status: status,
            isActive: isActive,
          },
        });

        Logger.logInfo('Provider entry created for activation/deactivation', {
          provider,
          model,
          temperature,
          chunkSize,
          active: isActive,
          status,
        });
      }
    } catch (error) {
      Logger.logError(
        'Failed to activate/deactivate provider',
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

  /**
   * Create or update a provider entry in the "ChatLlmModel" table
   * First checks if record exists, then inserts or updates accordingly
   */
  private static async createOrUpdateProviderEntry(
    config: ProviderConfig,
  ): Promise<void> {
    try {
      // First, try to find existing record with same provider and model
      const existingRecord =
        await PrismaService.instance.chatLlmModel.findFirst({
          where: {
            provider: config.provider,
            model: config.model,
          },
          select: {
            id: true,
          },
        });

      if (existingRecord) {
        // Record exists, update it
        await PrismaService.instance.chatLlmModel.update({
          where: {
            id: existingRecord.id,
          },
          data: {
            temperature: config.temperature,
            chunkSize: config.chunkSize,
            isActive: true, // Default to active if not set
          },
        });

        Logger.logInfo('Provider entry updated', {
          provider: config.provider,
          model: config.model,
          temperature: config.temperature,
          chunkSize: config.chunkSize,
        });
      } else {
        // Record doesn't exist, insert new one
        await PrismaService.instance.chatLlmModel.create({
          data: {
            provider: config.provider,
            model: config.model,
            temperature: config.temperature,
            chunkSize: config.chunkSize,
            status: 'initialized',
            isActive: true,
          },
        });

        Logger.logInfo('Provider entry created', {
          provider: config.provider,
          model: config.model,
          temperature: config.temperature,
          chunkSize: config.chunkSize,
        });
      }
    } catch (error) {
      Logger.logError(
        'Failed to create/update provider entry',
        {
          error: error instanceof Error ? error.message : String(error),
          provider: config.provider,
          model: config.model,
        },
        (error as Error).stack,
      );
      throw error;
    }
  }

  /**
   * Get sorted list of active providers based on last successful execution
   * @returns Promise<Array<{provider: string, model: string, lastSuccess: Date | null}>>
   */
  static async getSortedActiveProviders(): Promise<
    Array<{
      provider: string;
      model: string;
      temperature: number;
      chunkSize: number | null;
      lastSuccess: Date | null;
    }>
  > {
    try {
      // Note: Complex time-based filtering and aggregations require raw SQL
      // For now, using simplified Prisma query with basic filtering
      const activeProviders =
        await PrismaService.instance.chatLlmModel.findMany({
          where: {
            isActive: true,
            // Simplified status filtering - would need raw SQL for complex time conditions
            status: {
              not: 'failure',
            },
          },
          select: {
            provider: true,
            model: true,
            temperature: true,
            chunkSize: true,
            endTime: true,
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
        chunkSize: row.chunkSize,
        lastSuccess: row.endTime,
      }));
    } catch (error) {
      Logger.logError('Failed to get sorted active providers', {
        error: error instanceof Error ? error.message : String(error),
      });
      return [];
    }
  }

  /**
   * Get the next active provider after the current one
   * @param currentProvider - Current provider name
   * @param currentModel - Current model name
   * @returns Promise<{provider: string, model: string, temperature: number, chunkSize: number | null} | null>
   */
  static async getNextActiveProvider(
    currentProvider: string,
    currentModel: string,
  ): Promise<{
    provider: string;
    model: string;
    temperature: number;
    chunkSize: number | null;
  } | null> {
    try {
      const activeProviders = await this.getSortedActiveProviders();

      Logger.logInfo('activeProviders', activeProviders);

      if (activeProviders.length === 0) {
        return null;
      }

      // Find current provider index
      const currentIndex = activeProviders.findIndex(
        (p) => p.provider === currentProvider && p.model === currentModel,
      );

      // If current provider not found or is the last one, return the first provider
      if (currentIndex === -1 || currentIndex === activeProviders.length - 1) {
        return {
          provider: activeProviders[0].provider,
          model: activeProviders[0].model,
          temperature: activeProviders[0].temperature
            ? +activeProviders[0].temperature
            : 1,
          chunkSize: activeProviders[0].chunkSize,
        };
      }

      // Return the next provider
      const nextProvider = activeProviders[currentIndex + 1];
      return {
        provider: nextProvider.provider,
        model: nextProvider.model,
        temperature: nextProvider.temperature ? +nextProvider.temperature : 1,
        chunkSize: nextProvider.chunkSize,
      };
    } catch (error) {
      Logger.logError('Failed to get next active provider', {
        error: error instanceof Error ? error.message : String(error),
        currentProvider,
        currentModel,
      });
      return null;
    }
  }

  /**
   * Check if a specific provider configuration exists
   */
  static async providerExists(
    provider: string,
    model: string,
    temperature: number,
    chunkSize: number,
  ): Promise<boolean> {
    try {
      const existingProvider =
        await PrismaService.instance.chatLlmModel.findFirst({
          where: {
            provider: provider,
            model: model,
          },
        });

      return existingProvider !== null;
    } catch (error) {
      Logger.logError('Failed to check provider existence', {
        error: error instanceof Error ? error.message : String(error),
        provider,
        model,
      });
      return false;
    }
  }
}
