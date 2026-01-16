// defaultProvidersInitializer.ts - Service to initialize default providers in model_execution_tracking table
import { ConfigManager } from '../config';
import { Database } from '../database';
import { Logger } from '../logger';

export interface ProviderConfig {
  provider: string;
  model: string;
  temperature: number;
  chunkSize?: number;
}

export class DefaultProvidersInitializer {
  /**
   * Initialize default providers in model_execution_tracking table
   * This should be called at system startup to populate the table with
   * default configurations for all supported providers
   */
  static async initializeDefaultProviders(): Promise<void> {
    try {
      Logger.logInfo(
        'Initializing default providers in model_execution_tracking table',
      );

      // Get all supported providers from ConfigManager
      const supportedProviders = [
        'groq',
        'openai',
        'a4f',
        'z_ai',
        'ollama',
        'anthropic',
        'gemini',
        'huggingface',
        'deepseek',
      ];

      for (const provider of supportedProviders) {
        try {
          // Get configuration for this provider
          const config = ConfigManager.getChatConfig(provider);

          Logger.logInfo(`Processing provider ${provider}`, config);

          // Skip if essential config is missing
          if (!config.model) {
            Logger.logInfo(
              `Skipping provider ${provider} - no model configured`,
            );
            continue;
          }

          // Check if provider requires API key and if it's present
          const requiresApiKey = this.requiresApiKey(provider);
          const hasApiKey = !!config.apiKey && config.apiKey.trim().length > 0;

          if (requiresApiKey) {
            if (hasApiKey) {
              Logger.logInfo(
                `Activating provider ${provider} - missing API key`,
              );
            } else {
              Logger.logInfo(
                `Deactivating provider ${provider} - missing API key`,
              );
            }
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
    const apiKeyRequiredProviders = [
      'groq',
      'openai',
      'a4f',
      'z_ai',
      'anthropic',
      'gemini',
      'huggingface',
      'deepseek',
    ];

    // These providers don't require API keys (typically local/self-hosted)
    const noApiKeyProviders = ['ollama'];

    return apiKeyRequiredProviders.includes(provider.toLowerCase());
  }

  /**
   * Activate or deactivate a provider in the model_execution_tracking table
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
    chunkSize?: number,
    activate?: boolean,
  ): Promise<void> {
    try {
      // First, try to find existing record with same configuration
      const findQuery = `
        SELECT id, active FROM model_execution_tracking 
        WHERE provider = $1 AND model = $2
        LIMIT 1
      `;

      const findResult = await Database.getInstance().query(findQuery, [
        provider,
        model,
      ]);

      const isActive =
        activate === undefined ? null : activate === true ? true : false;
      const status = 'deactivated'; // Always set to deactivated when calling this method

      if (findResult.rows.length > 0) {
        // Record exists, update it
        const recordId = findResult.rows[0].id;

        if (
          findResult.rows[0].active !== true &&
          findResult.rows[0].active !== false
        ) {
          const updateQuery = `
          UPDATE model_execution_tracking 
          SET 
            updated_at = NOW(),
            active = $2,
            status = $3
          WHERE id = $1
        `;

          await Database.getInstance().query(updateQuery, [
            recordId,
            isActive,
            status,
          ]);

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
        const insertQuery = `
          INSERT INTO model_execution_tracking 
          (provider, model, temperature, chunk_size, start_time, status, active)
          VALUES ($1, $2, $3, $4, NOW(), $5, $6)
        `;

        await Database.getInstance().query(insertQuery, [
          provider,
          model,
          temperature ? +temperature : 1,
          chunkSize || null,
          status,
          isActive,
        ]);

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
   * Create or update a provider entry in the model_execution_tracking table
   * First checks if record exists, then inserts or updates accordingly
   */
  private static async createOrUpdateProviderEntry(
    config: ProviderConfig,
  ): Promise<void> {
    try {
      // First, try to find existing record with same provider and model
      const findQuery = `
        SELECT id FROM model_execution_tracking 
        WHERE provider = $1 AND model = $2
        LIMIT 1
      `;

      const findResult = await Database.getInstance().query(findQuery, [
        config.provider,
        config.model,
      ]);

      if (findResult.rows.length > 0) {
        // Record exists, update it
        const updateQuery = `
          UPDATE model_execution_tracking 
          SET 
            temperature = $2,
            chunk_size = $3,
            updated_at = NOW(),
            status = CASE 
              WHEN status = 'initialized' THEN 'initialized'
              ELSE status
            END,
            active = CASE
              WHEN active IS NULL THEN TRUE
              ELSE active
            END
          WHERE id = $1
        `;

        await Database.getInstance().query(updateQuery, [
          findResult.rows[0].id,
          config.temperature ? +config.temperature : 1,
          config.chunkSize || 2000,
        ]);

        Logger.logInfo('Provider entry updated', {
          provider: config.provider,
          model: config.model,
          temperature: config.temperature,
          chunkSize: config.chunkSize,
        });
      } else {
        // Record doesn't exist, insert new one
        const insertQuery = `
          INSERT INTO model_execution_tracking 
          (provider, model, temperature, chunk_size, start_time, status, active)
          VALUES ($1, $2, $3, $4, NOW(), 'initialized', TRUE)
        `;

        await Database.getInstance().query(insertQuery, [
          config.provider,
          config.model,
          config.temperature ? +config.temperature : 1,
          config.chunkSize || 2000,
        ]);

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
      const query = `
SELECT provider,
       model,
       temperature,
       chunk_size    as "chunkSize",
       MAX(end_time) as "lastSuccess"
FROM model_execution_tracking
WHERE active = TRUE
  AND (status != 'failure' OR
       (status = 'failure' AND end_time IS NOT NULL AND end_time < NOW() - INTERVAL '2 minutes') OR
       (status = 'failure' AND start_time IS NOT NULL AND start_time < NOW() - INTERVAL '4 minutes')
    )
GROUP BY provider, model, temperature, chunk_size
ORDER BY MAX(end_time) DESC NULLS LAST,
         provider,
         model
      `;

      const result = await Database.getInstance().query(query);

      return result.rows.map((row) => ({
        provider: row.provider,
        model: row.model,
        temperature: row.temperature ? +row.temperature : 1,
        chunkSize: row.chunkSize,
        lastSuccess: row.lastSuccess,
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
    chunkSize?: number,
  ): Promise<boolean> {
    try {
      const query = `
        SELECT 1 FROM model_execution_tracking 
        WHERE provider = $1 AND model = $2
      `;

      const result = await Database.getInstance().query(query, [
        provider,
        model,
      ]);

      return result.rows.length > 0;
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
