// llmFactory.ts
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { HttpsProxyAgent } from 'https-proxy-agent';
import Mustache from 'mustache';
import { addPayloadToTrace, Trace } from '../trace/trace.module';
import { ConfigManager } from './config';
import {
  ERROR_MESSAGES,
  PROVIDER_NAMES,
  RATE_LIMIT_CONSTANTS,
} from './constants';
import { Logger } from './logger';
import {
  isLlmSafeMisfireResponse,
  isLlmUnsafeContentResponse,
  ProhibitedContentError,
} from './llmResponseSanitizer';
import { DefaultProvidersInitializer } from './services/defaultProvidersInitializer';
import { LLMQueryLogger } from './services/llmQueryLogger';
import { ModelExecutionTracker } from './services/modelExecutionTracker';
import { ChatConfig } from './types';

export type AttemptsCallbacksOptions = {
  message?: string;
  chunkSize?: number;
  temperature?: number;
  model?: string;
  provider?: string;
  baseUrl?: string;
  currentAttempt?: number;
  maxRetries?: number;
};

export type InvokeOptions = {
  dialogId?: string;
  messageId?: string;
  metadata?: Record<string, unknown>;
  persistToDb?: boolean;
  logId?: { value?: string };
};

type LlmConfigSlice = {
  id?: string;
  chunkSize?: number;
  temperature?: number;
  model?: string;
  provider?: string;
  baseUrl?: string;
};

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
    } else if (chatConfig.provider === PROVIDER_NAMES.OPENROUTER) {
      // OpenRouter uses OpenAI-compatible API
      if (!apiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.OPENROUTER);
      }

      const proxyUrl =
        ConfigManager.getProxyConfig().httpsProxy ||
        ConfigManager.getProxyConfig().httpProxy;

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

      if (proxyAgent) {
        openaiOptions.configuration.httpAgent = proxyAgent;
        openaiOptions.configuration.httpsAgent = proxyAgent;
      }

      Logger.logInfo('Creating ChatOpenAI instance for OpenRouter');
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

    let contentFromObject: any;

    try {
      contentFromObject = result.kwargs.content;
    } catch (error) {
      // Ignore error
    }

    try {
      contentFromObject = result.content;
    } catch (error) {
      // Ignore error
    }

    if (contentFromObject) {
      result = contentFromObject;
    }

    if (typeof result === 'string') {
      response = result;
    } else {
      if (typeof result === 'object' && result.content) {
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

      try {
        Logger.logInfo('Trying to parse response as JSON 1', { response });
        response = JSON.parse(response as any);
      } catch (error) {
        // Logger.logError('Failed to parse response as JSON', { response, error });
        // Ignore JSON parse error
      }

      try {
        Logger.logInfo('Trying to parse response as JSON 2', { response });
        response = JSON.parse((response as any).content);
      } catch (error) {
        // Logger.logError('Failed to parse response as JSON', { response, error });
        // Ignore JSON parse error
      }

      try {
        Logger.logInfo('Trying to parse response as JSON 3', { response });
        response = JSON.parse(response).content;
      } catch (error) {
        // Logger.logError('Failed to parse response as JSON', { response, error });
        // Ignore JSON parse error
      }
    }

    if (typeof response !== 'string') {
      // некий кривой случай бывает который ломает флоу, его отдельно обработаю
      try {
        contentFromObject = (response as any).kwargs.content;
      } catch (error) {
        response = '';
      }

      if (contentFromObject) {
        response = contentFromObject;
      }
    }
    if (response === '') {
      response = '[NOT_FOUND]';
    }

    if (typeof response === 'string') {
      response = response?.trim();
    }

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
      Logger.logInfo(`${label} OK`, { [label]: pingResult });
      return pingResult;
    } catch (error) {
      Logger.logError(`${label} failed`, error);
      throw error;
    } finally {
      clearTimeout(setTimeoutRef);
    }
  }

  static async ping(
    attemptsCallbacks?: (options: AttemptsCallbacksOptions) => Promise<void>,
  ) {
    const rawResult = LLMFactory.pingWrapper({
      ping: async (controller: AbortController) =>
        LLMFactory.invoke('ping', attemptsCallbacks, controller),
    });
    return LLMFactory.getResponseString(rawResult);
  }

  private static redactForConsole<T>(value: T): T | '[redacted]' {
    if (ConfigManager.getLlmLoggingConfig().logFullPromptInConsole) {
      return value;
    }
    if (value === undefined || value === null || value === '') {
      return value;
    }
    return '[redacted]';
  }

  private static buildInvokeLogContext({
    llmConfig,
    attempt,
    maxRetries,
    prompt,
    isPing,
    options,
  }: {
    llmConfig: LlmConfigSlice | undefined;
    attempt: number;
    maxRetries: number;
    prompt: string;
    isPing: boolean;
    options?: InvokeOptions;
  }) {
    return {
      provider: llmConfig?.provider,
      model: llmConfig?.model,
      temperature: llmConfig?.temperature,
      chunkSize: llmConfig?.chunkSize,
      baseUrl: llmConfig?.baseUrl,
      attempt: `${attempt}/${maxRetries}`,
      prompt: isPing ? '[ping]' : LLMFactory.redactForConsole(prompt),
      promptLength: isPing ? undefined : prompt?.length,
      metadata: options?.metadata,
      dialogId: options?.dialogId,
      messageId: options?.messageId,
    };
  }

  private static shouldPersistInvokeLog(
    isPing: boolean,
    options?: InvokeOptions,
  ): boolean {
    return !isPing && !!options && options.persistToDb !== false;
  }

  private static async persistInvokeLog({
    prompt,
    response,
    startTime,
    llmConfig,
    success,
    errorMessage,
    isPing,
    options,
  }: {
    prompt: string;
    response: string;
    startTime: number;
    llmConfig: LlmConfigSlice | undefined;
    success: boolean;
    errorMessage?: string;
    isPing: boolean;
    options?: InvokeOptions;
  }): Promise<string | null> {
    if (!LLMFactory.shouldPersistInvokeLog(isPing, options)) {
      return null;
    }

    try {
      const logId = await LLMQueryLogger.logQuery({
        request: prompt,
        response,
        requestLength: prompt?.length,
        responseLength: response?.length,
        executionTimeMs: Date.now() - startTime,
        success,
        errorMessage,
        dialogId: options?.dialogId,
        messageId: options?.messageId,
        provider: llmConfig?.provider,
        model: llmConfig?.model,
        temperature: llmConfig?.temperature,
      });

      if (logId && options?.logId) {
        options.logId.value = logId;
      }

      return logId;
    } catch (dbError) {
      Logger.logError('Failed to log LLM query to database', {
        error: (dbError as Error).message,
        promptLength: prompt?.length,
      });
      return null;
    }
  }

  @Trace()
  static async invoke(
    prompt: string | 'ping',
    attemptsCallbacks?: (options: AttemptsCallbacksOptions) => Promise<any>,
    abortController?: AbortController,
    options?: InvokeOptions,
  ) {
    const isPing = prompt === 'ping';
    if (isPing) {
      prompt = `Return exactly two characters: OK
No quotes. No period. No newline. No extra text.`;
    }
    const maxRetries = 3;
    const requestPrompt = prompt;
    let invokeStartTime = Date.now();

    let currentAttempt = 0;
    let providerIndex = 0;
    let apiKey: string | undefined = undefined;
    let llmConfig: LlmConfigSlice | undefined = undefined;

    ({ apiKey, ...llmConfig } =
      await DefaultProvidersInitializer.getActiveProviderAtIndex(
        providerIndex,
      ));

    while (currentAttempt < maxRetries) {
      try {
        const llm = LLMFactory.createLLM({ ...llmConfig, apiKey } as any);

        if (attemptsCallbacks && !isPing) {
          await attemptsCallbacks({
            message: `🔍 Поиск ответа в чанке (попытка: ${currentAttempt + 1}/${maxRetries})...`,
          });
        }

        const attemptNumber = currentAttempt + 1;
        invokeStartTime = Date.now();

        Logger.logInfo('LLM Request Initiated', {
          ...LLMFactory.buildInvokeLogContext({
            llmConfig,
            attempt: attemptNumber,
            maxRetries,
            prompt: requestPrompt,
            isPing,
            options,
          }),
        });

        addPayloadToTrace({
          currentAttempt,
          maxRetries,
        });

        addPayloadToTrace({
          provider: llmConfig?.provider,
          model: llmConfig?.model,
          temperature: llmConfig?.temperature,
          chunkSize: llmConfig?.chunkSize,
          baseUrl: llmConfig?.baseUrl,
        });
        const rawResult = await LLMFactory.pingWrapper({
          ping: async (controller: AbortController) =>
            llm.invoke(prompt, {
              ...(abortController
                ? { signal: controller.signal || abortController?.signal }
                : {}),
              ...(isPing
                ? {
                    temperature: 0,
                    max_tokens: 2,
                  }
                : {}),
            }),
          label: 'Invoke',
          timeout: 40_000,
        });

        const result = LLMFactory.getResponseString(rawResult);

        if (isLlmSafeMisfireResponse(result)) {
          // groq и safeguard-модели иногда отдают "safe" вместо нормального ответа
          throw new Error('Safe content detected');
        }

        if (result && isLlmUnsafeContentResponse(result)) {
          throw new ProhibitedContentError();
        }

        if (!result) {
          Logger.logInfo('LLM did not return a response', {
            rawResult,
            result,
          });
        }
        addPayloadToTrace({
          rawResult,
          prompt,
          result,
        });
        if (attemptsCallbacks && !isPing) {
          if (!result) {
            await attemptsCallbacks({
              message: `❌ Ответ в чанке не найден (попытка: ${currentAttempt + 1}/${maxRetries})...`,
            });
          } else {
            await attemptsCallbacks({
              message: `✅ Ответ в чанке найден (попытка: ${currentAttempt + 1}/${maxRetries})...${result}`,
            });
          }
        }
        Logger.logInfo('LLM Request Completed', {
          ...LLMFactory.buildInvokeLogContext({
            llmConfig,
            attempt: attemptNumber,
            maxRetries,
            prompt: requestPrompt,
            isPing,
            options,
          }),
          result: LLMFactory.redactForConsole(result),
          responseLength: result?.length,
          executionTime: Date.now() - invokeStartTime,
        });

        await LLMFactory.persistInvokeLog({
          prompt: requestPrompt,
          response: result,
          startTime: invokeStartTime,
          llmConfig,
          success: true,
          isPing,
          options,
        });

        // Mark execution as successful
        if (llmConfig?.id) {
          await ModelExecutionTracker.completeExecution(llmConfig?.id);
        }

        return result;
      } catch (error: any) {
        if (error instanceof ProhibitedContentError) {
          throw error;
        }

        if (attemptsCallbacks && !isPing) {
          await attemptsCallbacks({
            message: `⚠️ Ошибка при поиске ответа в чанках (попытка: ${currentAttempt + 1}/${maxRetries})...`,
          });
        }

        Logger.logError(
          `Message processing failed on attempt ${currentAttempt}`,
          {
            error: error.message,
            llmConfig: llmConfig,
            attempt: currentAttempt,
          },
        );
        // Mark execution as failed for other errors
        if (llmConfig?.id) {
          await ModelExecutionTracker.failExecution(
            llmConfig?.id,
            error instanceof Error ? error.message : String(error),
          );
        }
        currentAttempt++;

        if (currentAttempt > maxRetries) {
          Logger.logError('Max retry attempts reached, returning error', {
            maxRetries: maxRetries,
            currentAttempt,
          });

          await LLMFactory.persistInvokeLog({
            prompt: requestPrompt,
            response: Mustache.render('ERROR: {{errorMessage}}', {
              errorMessage: error.message,
            }),
            startTime: invokeStartTime,
            llmConfig,
            success: false,
            errorMessage: error.message,
            isPing,
            options,
          });

          if (attemptsCallbacks && !isPing) {
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

        providerIndex++;
        try {
          ({ apiKey, ...llmConfig } =
            await DefaultProvidersInitializer.getActiveProviderAtIndex(
              providerIndex,
            ));
        } catch {
          throw error;
        }
        if (attemptsCallbacks && !isPing) {
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
