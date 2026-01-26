// llmFactory.ts
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { addPayloadToTrace, Trace } from '../trace/trace.module';
import { ConfigManager } from './config';
import {
  ERROR_MESSAGES,
  PROVIDER_NAMES,
  RATE_LIMIT_CONSTANTS,
} from './constants';
import { Logger } from './logger';
import { DefaultProvidersInitializer } from './services/defaultProvidersInitializer';
import { ChatConfig } from './types';

export class LLMFactory {
  public static createLLM(chatConfig: ChatConfig) {
    const model = chatConfig.model;
    const temperature = chatConfig.temperature ? +chatConfig.temperature : 1;
    const baseUrl = chatConfig.baseUrl;
    const apiKey = chatConfig.apiKey;
    if (!model) {
      throw new Error(ERROR_MESSAGES.MISSING_MODEL);
    }

    Logger.logInfo('Creating LLM instance', {
      llmProvider: chatConfig.provider,
      model,
      temperature,
      baseUrl,
      hasApiKey: !!apiKey,
    });

    if (chatConfig.provider === PROVIDER_NAMES.A4F) {
      // A4F.co uses OpenAI-compatible API
      if (!apiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.A4F);
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
          Logger.logInfo('Created proxy agent');
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent');
          // Continue without proxy
        }
      }

      const openaiOptions: any = {
        modelName: model,
        temperature: temperature ? +temperature : 1,
        openAIApiKey: apiKey,
        configuration: {
          baseURL: baseUrl,
        },
      };

      // Add proxy agent if available
      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      Logger.logInfo('Creating ChatOpenAI instance');
      return new ChatOpenAI(openaiOptions);
    } else if (chatConfig.provider === PROVIDER_NAMES.Z_AI) {
      // Z.AI uses OpenAI-compatible API
      if (!apiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.Z_AI);
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
          Logger.logInfo('Created proxy agent');
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent');
          // Continue without proxy
        }
      }

      const openaiOptions: any = {
        modelName: model,
        temperature: temperature ? +temperature : 1,
        openAIApiKey: apiKey,
        configuration: {
          baseURL: baseUrl,
        },
      };

      // Add proxy agent if available
      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      return new ChatOpenAI(openaiOptions);
    } else if (chatConfig.provider === PROVIDER_NAMES.DEEPSEEK) {
      // DeepSeek uses OpenAI-compatible API
      if (!apiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.DEEPSEEK);
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
          Logger.logInfo('Created proxy agent');
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent');
          // Continue without proxy
        }
      }

      const openaiOptions: any = {
        modelName: model,
        temperature: temperature ? +temperature : 1,
        openAIApiKey: apiKey,
        configuration: {
          baseURL: baseUrl,
        },
      };

      // Add proxy agent if available
      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      return new ChatOpenAI(openaiOptions);
    } else if (chatConfig.provider === PROVIDER_NAMES.ANTHROPIC) {
      // Anthropic uses Anthropic API
      if (!apiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.ANTHROPIC);
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
          Logger.logInfo('Created proxy agent');
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent');
          // Continue without proxy
        }
      }

      const anthropicOptions: any = {
        modelName: model,
        temperature: temperature ? +temperature : 1,
        anthropicApiKey: apiKey,
      };

      // Add proxy agent if available
      if (proxyAgent) {
        anthropicOptions.httpAgent = proxyAgent;
      }

      Logger.logInfo('Creating ChatAnthropic instance');
      return new ChatAnthropic(anthropicOptions);
    } else if (chatConfig.provider === PROVIDER_NAMES.GEMINI) {
      // Google Gemini uses Google Generative AI API
      if (!apiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.GEMINI);
      }

      // Proxy settings are handled through ConfigManager.getProxyConfig().httpsProxy || ConfigManager.getProxyConfig().httpProxy function

      Logger.logInfo('Creating ChatGoogleGenerativeAI instance');

      return new ChatGoogleGenerativeAI({
        model,
        temperature: temperature ? +temperature : 1,
        apiKey: apiKey,
        apiVersion: 'v1',
      });
    } else if (chatConfig.provider === PROVIDER_NAMES.HUGGINGFACE) {
      // Hugging Face uses Hugging Face Inference API
      if (!apiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.HUGGINGFACE);
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
          Logger.logInfo('Created proxy agent');
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent');
          // Continue without proxy
        }
      }

      const hfOptions: any = {
        model: model,
        temperature: temperature ? +temperature : 1,
        apiKey: apiKey,
      };

      // Note: HuggingFaceInference is an LLM, not a ChatModel
      // Add proxy agent if available
      if (proxyAgent) {
        hfOptions.httpAgent = proxyAgent;
      }

      Logger.logInfo('Creating HuggingFaceInference instance');
      return new HuggingFaceInference(hfOptions);
    } else if (chatConfig.provider === PROVIDER_NAMES.GROQ) {
      // Groq uses Groq API
      if (!apiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.GROQ);
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
          Logger.logInfo('Created proxy agent');
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent');
          // Continue without proxy
        }
      }

      const groqOptions: any = {
        model: model,
        temperature: temperature ? +temperature : 1,
        apiKey: apiKey,
      };

      // Add proxy agent if available
      if (proxyAgent) {
        groqOptions.httpAgent = proxyAgent;
      }

      return new ChatGroq(groqOptions);
    } else if (chatConfig.provider === PROVIDER_NAMES.OLLAMA) {
      Logger.logInfo('Creating ChatOllama instance', {
        model: model,
        temperature: temperature ? +temperature : 1,
        baseUrl: baseUrl,
      });
      return new ChatOllama({
        model: model,
        temperature: temperature ? +temperature : 1,
        baseUrl: baseUrl,
      });
    } else {
      // For other providers like openai or deepseek, use ChatOpenAI
      if (!apiKey) {
        throw new Error('apiKey is required for OpenAI and DeepSeek providers');
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
          Logger.logInfo('Created proxy agent');
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent');
          // Continue without proxy
        }
      }

      const openaiOptions: any = {
        modelName: model,
        temperature: temperature ? +temperature : 1,
        openAIApiKey: apiKey,
        configuration: {
          baseURL: baseUrl,
        },
      };

      // Add proxy agent if available
      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      Logger.logInfo('Creating ChatOpenAI instance');
      return new ChatOpenAI(openaiOptions);
    }
  }

  static getResponseString(result: any) {
    let response: string;

    if (typeof result === 'string') {
      response = result;
    } else if (typeof result === 'object' && result.content) {
      // Handle different content types
      if (typeof result.content === 'string') {
        response = result.content;
      } else if (Array.isArray(result.content)) {
        // For complex content arrays, convert to string
        response = result.content
          .map((item: any) => {
            if (typeof item === 'string') return item;
            if (item.type === 'text' && item.text) return item.text;
            return JSON.stringify(item);
          })
          .join(' ');
      } else {
        response = JSON.stringify(result.content);
      }
    } else {
      response = JSON.stringify(result);
    }

    response = response?.trim();

    if (!response) {
      response = '';
    }

    return response;
  }

  static async pingWrapper({
    ping,
    timeout = 10000,
    label = 'Ping',
  }: {
    ping: (controller: AbortController) => Promise<any>;
    timeout?: number;
    label?: string;
  }) {
    Logger.logInfo(`${label} started`);
    const controller = new AbortController();
    const setTimeoutRef = setTimeout(() => controller.abort(), timeout);
    try {
      const pingResult = await ping(controller);
      Logger.logInfo(`${label} OK`, { ping: pingResult });
      return pingResult;
    } catch (error) {
      Logger.logError(`${label} failed`, error);
      throw error;
    } finally {
      clearTimeout(setTimeoutRef);
    }
  }

  static async ping(
    attemptsCallbacks?: (options: {
      chunkSize?: number;
      temperature?: number;
      model?: string;
      provider?: string;
      baseUrl?: string;
      currentAttempt: number;
      maxRetries: number;
    }) => Promise<void>,
  ) {
    return LLMFactory.pingWrapper({
      ping: async (controller: AbortController) =>
        LLMFactory.invoke('ping', attemptsCallbacks, controller),
    });
  }

  @Trace()
  static async invoke(
    prompt: string,
    attemptsCallbacks?: (options: {
      chunkSize?: number;
      temperature?: number;
      model?: string;
      provider?: string;
      baseUrl?: string;
      currentAttempt: number;
      maxRetries: number;
    }) => Promise<any>,
    abortController?: AbortController,
  ) {
    const maxRetries = 3;

    let currentAttempt = 0;
    let apiKey: string | undefined = undefined;
    let llmConfig:
      | {
          chunkSize?: number;
          temperature?: number;
          model?: string;
          provider?: string;
          baseUrl?: string;
        }
      | undefined = undefined;

    ({ apiKey, ...llmConfig } =
      await DefaultProvidersInitializer.getActiveProvider(true));

    if (!llmConfig?.provider || (llmConfig?.provider && !apiKey)) {
      ({ apiKey, ...llmConfig } =
        await DefaultProvidersInitializer.getNextActiveProvider());
    }

    while (currentAttempt < maxRetries) {
      const llm = LLMFactory.createLLM({ ...llmConfig, apiKey } as any);

      try {
        Logger.logInfo(
          `Processing message attempt ${currentAttempt + 1}/${maxRetries}`,
          {
            llmConfig: llmConfig,
            attempt: currentAttempt + 1,
          },
        );

        addPayloadToTrace({
          currentAttempt,
          maxRetries,
        });

        const startTime = Date.now();
        const rawResult = await LLMFactory.pingWrapper({
          ping: async (controller: AbortController) =>
            llm.invoke(
              prompt,
              abortController
                ? { signal: controller.signal || abortController?.signal }
                : undefined,
            ),
          label: 'Invoke',
          timeout: 40_000,
        });

        const result = LLMFactory.getResponseString(rawResult);
        if (!result) {
          Logger.logInfo('LLM did not return a response', {
            rawResult,
            result,
          });
        }
        addPayloadToTrace({ rawResult, prompt, result });
        Logger.logInfo('LLM Request Completed', {
          prompt,
          result,
          executionTime: Date.now() - startTime,
        });
        return result;
      } catch (error: any) {
        currentAttempt++;

        if (currentAttempt > maxRetries) {
          Logger.logError('Max retry attempts reached, returning error', {
            maxRetries: maxRetries,
            currentAttempt,
          });
          if (attemptsCallbacks) {
            await attemptsCallbacks({
              ...llmConfig,
              currentAttempt,
              maxRetries,
            });
          }
          throw error;
        } else {
          Logger.logError(
            `Message processing failed on attempt ${currentAttempt}`,
            {
              error: error.message,
              llmConfig: llmConfig,
              attempt: currentAttempt,
            },
          );
        }

        ({ apiKey, ...llmConfig } =
          await DefaultProvidersInitializer.getNextActiveProvider());
        if (attemptsCallbacks) {
          await attemptsCallbacks({
            ...llmConfig,
            currentAttempt,
            maxRetries,
          });
        }
      }
    }
    return '';
  }
}
