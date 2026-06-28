// embeddingsFactory.ts
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { OpenAIEmbeddings } from '@langchain/openai';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { ConfigManager } from './config';
import {
  ERROR_MESSAGES,
  PROVIDER_NAMES,
  RATE_LIMIT_CONSTANTS,
} from './constants';
import { Logger } from './logger';
import { EmbeddingsConfig } from './types';

export class EmbeddingsFactory {
  private static cachedInstance: {
    key: string;
    embeddings: OpenAIEmbeddings | OllamaEmbeddings;
  } | null = null;

  public static getEmbeddings(): OpenAIEmbeddings | OllamaEmbeddings {
    const config = ConfigManager.getEmbeddingsConfig();
    const cacheKey = JSON.stringify(config);
    if (
      !EmbeddingsFactory.cachedInstance ||
      EmbeddingsFactory.cachedInstance.key !== cacheKey
    ) {
      EmbeddingsFactory.cachedInstance = {
        key: cacheKey,
        embeddings: EmbeddingsFactory.createEmbeddings(config),
      };
    }
    return EmbeddingsFactory.cachedInstance.embeddings;
  }

  public static async embedQuery(response: string): Promise<number[]> {
    return EmbeddingsFactory.getEmbeddings().embedQuery(response);
  }

  public static async embedDocuments(texts: string[]): Promise<number[][]> {
    if (!texts.length) {
      return [];
    }
    return EmbeddingsFactory.getEmbeddings().embedDocuments(texts);
  }

  public static createEmbeddings(embeddingsConfig: EmbeddingsConfig) {
    const config = embeddingsConfig;
    const embeddingsModel = config.model;
    const embeddingsBaseUrl = config.baseUrl;
    const embeddingsApiKey = config.apiKey;

    Logger.logInfo('Creating Embeddings instance', {
      mbeddingsProvider: embeddingsConfig.provider,
      embeddingsModel,
      embeddingsBaseUrl,
    });

    if (config.provider === PROVIDER_NAMES.A4F) {
      if (!embeddingsApiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.EMBEDDINGS_A4F);
      }

      const proxyUrl =
        ConfigManager.getProxyConfig().httpsProxy ||
        ConfigManager.getProxyConfig().httpProxy;

      let proxyAgent = null;
      if (proxyUrl) {
        try {
          proxyAgent = new HttpsProxyAgent(proxyUrl);
          Logger.logInfo('Created proxy agent for URL:', proxyUrl);
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent:', error);
        }
      }

      const openaiOptions: any = {
        modelName: embeddingsModel,
        openAIApiKey: embeddingsApiKey,
        configuration: {
          baseURL: embeddingsBaseUrl,
        },
      };

      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      return new OpenAIEmbeddings(openaiOptions);
    } else if (config.provider === PROVIDER_NAMES.Z_AI) {
      if (!embeddingsApiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.EMBEDDINGS_Z_AI);
      }

      const proxyUrl =
        ConfigManager.getProxyConfig().httpsProxy ||
        ConfigManager.getProxyConfig().httpProxy;

      let proxyAgent = null;
      if (proxyUrl) {
        try {
          proxyAgent = new HttpsProxyAgent(proxyUrl);
          Logger.logInfo('Created proxy agent for URL:', proxyUrl);
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent:', error);
        }
      }

      const openaiOptions: any = {
        modelName: embeddingsModel,
        openAIApiKey: embeddingsApiKey,
        configuration: {
          baseURL: embeddingsBaseUrl,
        },
      };

      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      return new OpenAIEmbeddings(openaiOptions);
    } else if (config.provider === PROVIDER_NAMES.DEEPSEEK) {
      if (!embeddingsApiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.EMBEDDINGS_DEEPSEEK);
      }

      const proxyUrl =
        ConfigManager.getProxyConfig().httpsProxy ||
        ConfigManager.getProxyConfig().httpProxy;

      let proxyAgent = null;
      if (proxyUrl) {
        try {
          proxyAgent = new HttpsProxyAgent(proxyUrl);
          Logger.logInfo('Created proxy agent for URL:', proxyUrl);
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent:', error);
        }
      }

      const openaiOptions: any = {
        modelName: embeddingsModel,
        openAIApiKey: embeddingsApiKey,
        configuration: {
          baseURL: embeddingsBaseUrl,
        },
      };

      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      return new OpenAIEmbeddings(openaiOptions);
    } else if (config.provider === PROVIDER_NAMES.OPENROUTER) {
      if (!embeddingsApiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.EMBEDDINGS_OPENROUTER);
      }

      const proxyUrl =
        ConfigManager.getProxyConfig().httpsProxy ||
        ConfigManager.getProxyConfig().httpProxy;

      let proxyAgent = null;
      if (proxyUrl) {
        try {
          proxyAgent = new HttpsProxyAgent(proxyUrl);
          Logger.logInfo('Created proxy agent for URL:', proxyUrl);
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent:', error);
        }
      }

      const openaiOptions: any = {
        modelName: embeddingsModel,
        openAIApiKey: embeddingsApiKey,
        configuration: {
          baseURL: embeddingsBaseUrl,
        },
      };

      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      return new OpenAIEmbeddings(openaiOptions);
    } else if (config.provider === PROVIDER_NAMES.ANTHROPIC) {
      throw new Error(ERROR_MESSAGES.UNSUPPORTED_EMBEDDINGS.ANTHROPIC);
    } else if (config.provider === PROVIDER_NAMES.GEMINI) {
      throw new Error(ERROR_MESSAGES.UNSUPPORTED_EMBEDDINGS.GEMINI);
    } else if (config.provider === PROVIDER_NAMES.HUGGINGFACE) {
      throw new Error(ERROR_MESSAGES.UNSUPPORTED_EMBEDDINGS.HUGGINGFACE);
    } else if (config.provider === PROVIDER_NAMES.GROQ) {
      throw new Error(ERROR_MESSAGES.UNSUPPORTED_EMBEDDINGS.GROQ);
    } else if (config.provider === PROVIDER_NAMES.OLLAMA) {
      return new OllamaEmbeddings({
        model: embeddingsModel,
        baseUrl: embeddingsBaseUrl,
      });
    } else {
      if (!embeddingsApiKey) {
        throw new Error(
          'EMBEDDINGS_API_KEY is required for OpenAI and DeepSeek providers',
        );
      }

      const proxyUrl =
        ConfigManager.getProxyConfig().httpsProxy ||
        ConfigManager.getProxyConfig().httpProxy;

      let proxyAgent = null;
      if (proxyUrl) {
        try {
          proxyAgent = new HttpsProxyAgent(proxyUrl);
          Logger.logInfo('Created proxy agent for URL:', proxyUrl);
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent:', error);
        }
      }

      const openaiOptions: any = {
        modelName: embeddingsModel,
        openAIApiKey: embeddingsApiKey,
        configuration: {
          baseURL: embeddingsBaseUrl,
        },
      };

      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      return new OpenAIEmbeddings(openaiOptions);
    }
  }
}
