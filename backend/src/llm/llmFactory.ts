// llmFactory.ts
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { ConfigManager } from './config';
import {
  ERROR_MESSAGES,
  PROVIDER_DOMAINS,
  PROVIDER_NAMES,
  RATE_LIMIT_CONSTANTS,
} from './constants';
import { Logger } from './logger';
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

    if (
      chatConfig.provider === PROVIDER_NAMES.A4F ||
      baseUrl?.includes(PROVIDER_DOMAINS.A4F)
    ) {
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
    } else if (
      chatConfig.provider === PROVIDER_NAMES.Z_AI ||
      baseUrl?.includes(PROVIDER_DOMAINS.Z_AI)
    ) {
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
    } else if (
      chatConfig.provider === PROVIDER_NAMES.DEEPSEEK ||
      baseUrl?.includes(PROVIDER_DOMAINS.DEEPSEEK)
    ) {
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
    } else if (
      chatConfig.provider === PROVIDER_NAMES.ANTHROPIC ||
      baseUrl?.includes(PROVIDER_DOMAINS.ANTHROPIC)
    ) {
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
          Logger.logInfo('Created proxy agent for URL:', proxyUrl);
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent:', error);
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

      return new ChatAnthropic(anthropicOptions);
    } else if (chatConfig.provider === PROVIDER_NAMES.GEMINI) {
      // Google Gemini uses Google Generative AI API
      if (!apiKey) {
        throw new Error(ERROR_MESSAGES.PROVIDER_ERRORS.GEMINI);
      }

      // Proxy settings are handled through ConfigManager.getProxyConfig().httpsProxy || ConfigManager.getProxyConfig().httpProxy function

      return new ChatGoogleGenerativeAI({
        model,
        temperature: temperature ? +temperature : 1,
        apiKey: apiKey,
        apiVersion: 'v1',
      });
    } else if (
      chatConfig.provider === PROVIDER_NAMES.HUGGINGFACE ||
      (baseUrl && baseUrl.includes(PROVIDER_DOMAINS.HUGGINGFACE))
    ) {
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
          Logger.logInfo('Created proxy agent for URL:', proxyUrl);
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent:', error);
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

      return new HuggingFaceInference(hfOptions);
    } else if (
      chatConfig.provider === PROVIDER_NAMES.GROQ ||
      (baseUrl && baseUrl.includes('groq.com'))
    ) {
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
          Logger.logInfo('Created proxy agent for URL:', proxyUrl);
        } catch (error) {
          if ((error as any).code === RATE_LIMIT_CONSTANTS.ERROR_CODE) {
            throw error;
          }
          Logger.logError('Failed to create proxy agent:', error);
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

      // Create Groq LLM with rate limiting wrapper
      const baseGroq = new ChatGroq(groqOptions);

      // Wrap the invoke method to handle rate limiting
      const wrappedGroq = Object.create(baseGroq);

      wrappedGroq.invoke = async function (prompt: string) {
        try {
          return await baseGroq.invoke(prompt);
        } catch (error) {
          const errorMessage = (error as Error).message;

          // Check if this is a Groq rate limit error
          if (
            errorMessage.includes('rate_limit_exceeded') &&
            (errorMessage.includes('Please try again in') ||
              errorMessage.includes('Request too large'))
          ) {
            // Parse delay time from error message
            const delayMatch =
              errorMessage.match(/Please try again in ([0-9]+m)?([0-9.]+s)/i) ||
              0;
            // Parse rate limit information
            const limitMatch = errorMessage.match(/Limit ([0-9]+)/);
            const usedMatch = errorMessage.match(/Used ([0-9]+)/);
            const requestedMatch = errorMessage.match(/Requested ([0-9]+)/);
            const modelMatch = errorMessage.match(/model `([^`]+)`/);

            if (delayMatch) {
              const minutes = delayMatch[1] ? parseInt(delayMatch[1]) : 0;
              const seconds = parseFloat(delayMatch[2]);
              const delayMs = (minutes * 60 + seconds) * 1000;

              // Extract rate limit information
              const limit = limitMatch ? parseInt(limitMatch[1]) : null;
              const used = usedMatch ? parseInt(usedMatch[1]) : null;
              const requested = requestedMatch
                ? parseInt(requestedMatch[1])
                : null;
              const model = modelMatch ? modelMatch[1] : '';

              Logger.logInfo('Groq rate limit detected', {
                delayMs,
                delaySeconds: Math.round(delayMs / 1000),
                limit,
                used,
                requested,
                model,
                error: errorMessage,
              });

              // If delay is more than 1 minute, throw error instead of waiting
              if (delayMs > 30000 || delayMs === 0) {
                const error =
                  delayMs > 0
                    ? new Error(
                        `Rate limit reached for model '${model}'. Limit: ${limit}, Used: ${used}, Requested: ${requested}. Please try again in ${
                          delayMatch[1] || ''
                        }${delayMatch[2]}.`,
                      )
                    : new Error(
                        `Rate limit reached for model '${model}'. Limit: ${limit}, Used: ${used}, Requested: ${requested}.`,
                      );

                (error as any).code = 'RATE_LIMIT_EXCEEDED';
                (error as any).delaySeconds = Math.round(delayMs / 1000);
                (error as any).limit = limit;
                (error as any).used = used;
                (error as any).requested = requested;
                (error as any).model = model;
                (error as any).provider = 'groq';
                throw error;
              }

              // Wait for the specified delay (less than 1 minute)
              await new Promise((resolve) => setTimeout(resolve, delayMs));

              Logger.logInfo('Retrying Groq call after rate limit delay', {
                waitedMs: delayMs,
              });

              // Retry the call
              return await baseGroq.invoke(prompt);
            }
          }

          // Re-throw if not a rate limit error or parsing failed
          throw error;
        }
      };

      return wrappedGroq;
    } else if (chatConfig.provider === PROVIDER_NAMES.OLLAMA) {
      return new ChatOllama({
        model: model,
        temperature: temperature ? +temperature : 1,
        baseUrl: baseUrl,
      });
    } else {
      // For other providers like openai or deepseek, use ChatOpenAI
      if (!apiKey) {
        throw new Error(
          'CHAT_API_KEY is required for OpenAI and DeepSeek providers',
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

      Logger.logInfo('Creating ChatOpenAI instance', openaiOptions);
      return new ChatOpenAI(openaiOptions);
    }
  }
}
