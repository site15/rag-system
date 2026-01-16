// embeddingsFactory.ts
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { OpenAIEmbeddings } from '@langchain/openai';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { ConfigManager } from './config';
import {
  ERROR_MESSAGES,
  PROVIDER_DOMAINS,
  PROVIDER_NAMES,
  RATE_LIMIT_CONSTANTS,
} from './constants';
import { Logger } from './logger';
import { EmbeddingsConfig } from './types';

export class EmbeddingsFactory {
  public static createEmbeddings(
    embeddingsProvider: string,
    embeddingsConfig: EmbeddingsConfig,
  ) {
    // Get provider-specific configuration
    const config = embeddingsConfig;
    const embeddingsModel = config.model;
    const embeddingsBaseUrl = config.baseUrl;
    const embeddingsApiKey = config.apiKey;

    Logger.logInfo('Creating Embeddings instance', {
      embeddingsProvider,
      embeddingsModel,
      embeddingsBaseUrl,
    });

    if (
      embeddingsProvider === PROVIDER_NAMES.A4F ||
      embeddingsBaseUrl.includes(PROVIDER_DOMAINS.A4F)
    ) {
      // A4F.co uses OpenAI-compatible API for embeddings
      if (!embeddingsApiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.EMBEDDINGS_A4F);
      }

      // Determine which proxy URL to use
      const proxyUrl =
        ConfigManager.getProxyConfig().httpsProxy ||
        ConfigManager.getProxyConfig().httpProxy;

      // Create proxy agent if proxy is configured
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
          // Continue without proxy
        }
      }

      const openaiOptions: any = {
        modelName: embeddingsModel,
        openAIApiKey: embeddingsApiKey,
        configuration: {
          baseURL: embeddingsBaseUrl,
        },
      };

      // Add proxy agent if available
      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      return new OpenAIEmbeddings(openaiOptions);
    } else if (
      embeddingsProvider === PROVIDER_NAMES.Z_AI ||
      embeddingsBaseUrl.includes(PROVIDER_DOMAINS.Z_AI)
    ) {
      // Z.AI uses OpenAI-compatible API for embeddings
      if (!embeddingsApiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.EMBEDDINGS_Z_AI);
      }

      // Determine which proxy URL to use
      const proxyUrl =
        ConfigManager.getProxyConfig().httpsProxy ||
        ConfigManager.getProxyConfig().httpProxy;

      // Create proxy agent if proxy is configured
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
          // Continue without proxy
        }
      }

      const openaiOptions: any = {
        modelName: embeddingsModel,
        openAIApiKey: embeddingsApiKey,
        configuration: {
          baseURL: embeddingsBaseUrl,
        },
      };

      // Add proxy agent if available
      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      return new OpenAIEmbeddings(openaiOptions);
    } else if (
      embeddingsProvider === PROVIDER_NAMES.DEEPSEEK ||
      embeddingsBaseUrl.includes(PROVIDER_DOMAINS.DEEPSEEK)
    ) {
      // DeepSeek uses OpenAI-compatible API for embeddings
      if (!embeddingsApiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.EMBEDDINGS_DEEPSEEK);
      }

      // Determine which proxy URL to use
      const proxyUrl =
        ConfigManager.getProxyConfig().httpsProxy ||
        ConfigManager.getProxyConfig().httpProxy;

      // Create proxy agent if proxy is configured
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
          // Continue without proxy
        }
      }

      const openaiOptions: any = {
        modelName: embeddingsModel,
        openAIApiKey: embeddingsApiKey,
        configuration: {
          baseURL: embeddingsBaseUrl,
        },
      };

      // Add proxy agent if available
      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      return new OpenAIEmbeddings(openaiOptions);
    } else if (embeddingsProvider === PROVIDER_NAMES.ANTHROPIC) {
      // Anthropic does not provide embedding services, so throw an error
      throw new Error(ERROR_MESSAGES.UNSUPPORTED_EMBEDDINGS.ANTHROPIC);
    } else if (embeddingsProvider === PROVIDER_NAMES.GEMINI) {
      // Google Gemini does not provide embedding services in the same way, so throw an error
      throw new Error(ERROR_MESSAGES.UNSUPPORTED_EMBEDDINGS.GEMINI);
    } else if (embeddingsProvider === PROVIDER_NAMES.HUGGINGFACE) {
      // Hugging Face does not provide embedding services in the same way, so throw an error
      throw new Error(ERROR_MESSAGES.UNSUPPORTED_EMBEDDINGS.HUGGINGFACE);
    } else if (embeddingsProvider === PROVIDER_NAMES.GROQ) {
      // Groq does not provide embedding services in the same way, so throw an error
      throw new Error(ERROR_MESSAGES.UNSUPPORTED_EMBEDDINGS.GROQ);
    } else if (embeddingsProvider === PROVIDER_NAMES.OLLAMA) {
      return new OllamaEmbeddings({
        model: embeddingsModel,
        baseUrl: embeddingsBaseUrl,
      });
    } else {
      // For other providers like openai or deepseek, use OpenAIEmbeddings
      if (!embeddingsApiKey) {
        throw new Error(
          'EMBEDDINGS_API_KEY is required for OpenAI and DeepSeek providers',
        );
      }

      // Determine which proxy URL to use
      const proxyUrl =
        ConfigManager.getProxyConfig().httpsProxy ||
        ConfigManager.getProxyConfig().httpProxy;

      // Create proxy agent if proxy is configured
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
          // Continue without proxy
        }
      }

      const openaiOptions: any = {
        modelName: embeddingsModel,
        openAIApiKey: embeddingsApiKey,
        configuration: {
          baseURL: embeddingsBaseUrl,
        },
      };

      // Add proxy agent if available
      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      return new OpenAIEmbeddings(openaiOptions);
    }
  }
}
