// config.ts - Provider-specific configuration management

import { PROVIDER_NAMES } from './constants';
import { AppConfig } from './types';

/**
 * Configuration manager for provider-specific environment variables
 */
export class ConfigManager {
  /**
   * Get general application configuration
   */
  public static getAppConfig(): AppConfig {
    if (!process.env.CHAT_PROVIDER) {
      throw new Error('CHAT_PROVIDER environment variable is missing');
    }
    if (!process.env.EMBEDDINGS_PROVIDER) {
      throw new Error('EMBEDDINGS_PROVIDER environment variable is missing');
    }
    return {
      chatProvider: process.env.CHAT_PROVIDER,
      embeddingsProvider: process.env.EMBEDDINGS_PROVIDER,
    };
  }
  /**
   * Get proxy configuration
   */
  public static getProxyConfig() {
    return {
      httpsProxy: process.env.GLOBAL_HTTPS_PROXY,
      httpProxy: process.env.GLOBAL_HTTP_PROXY,
    };
  }
  /**
   * Get default chat configuration for provider
   */
  public static getChatConfig(provider?: string) {
    provider = provider || ConfigManager.getAppConfig().chatProvider;
    const providerUpper = provider.toUpperCase();
    return {
      provider,
      model: this.getDefaultChatModel(provider),
      temperature: parseFloat(this.getDefaultTemperature(provider)),
      baseUrl: this.getDefaultBaseUrl(provider),
      apiKey: process.env[`${providerUpper}_CHAT_API_KEY`],
      chunkSize: 8000,
    };
  }

  /**
   * Get default embeddings configuration for provider
   */
  public static getEmbeddingsConfig(provider?: string) {
    provider = provider || ConfigManager.getAppConfig().embeddingsProvider;
    const providerUpper = provider.toUpperCase();
    return {
      provider: provider,
      model: this.getDefaultEmbeddingsModel(provider),
      baseUrl: this.getDefaultBaseUrl(provider),
      apiKey: process.env[`${providerUpper}_EMBEDDINGS_API_KEY`],
    };
  }

  /**
   * Get default chat model for provider
   */
  private static getDefaultChatModel(provider: string): string {
    switch (provider) {
      case PROVIDER_NAMES.GROQ:
        return 'llama3-70b-8192';
      case PROVIDER_NAMES.OPENAI:
        return 'gpt-4o';
      case PROVIDER_NAMES.ANTHROPIC:
        return 'claude-3-sonnet-20240229';
      case PROVIDER_NAMES.GEMINI:
        return 'gemini-1.5-pro';
      case PROVIDER_NAMES.HUGGINGFACE:
        return 'mistralai/Mistral-7B-Instruct-v0.1';
      case PROVIDER_NAMES.DEEPSEEK:
        return 'deepseek-chat';
      case PROVIDER_NAMES.A4F:
        return 'provider-2/mistral-small-3.1-24b-instruct';
      case PROVIDER_NAMES.Z_AI:
        return 'GLM-4.6V-Flash';
      case PROVIDER_NAMES.OLLAMA:
      default:
        return 'llama3';
    }
  }

  /**
   * Get default temperature for provider
   */
  private static getDefaultTemperature(provider: string): string {
    switch (provider) {
      case PROVIDER_NAMES.GROQ:
        return '1';
      case PROVIDER_NAMES.OPENAI:
        return '1';
      case PROVIDER_NAMES.Z_AI:
        return '1';
      default:
        return '0.7';
    }
  }

  /**
   * Get default base URL for provider
   */
  private static getDefaultBaseUrl(provider: string): string {
    switch (provider) {
      case PROVIDER_NAMES.GROQ:
        return 'https://api.groq.com/openai/v1';
      case PROVIDER_NAMES.OPENAI:
        return 'https://api.openai.com/v1';
      case PROVIDER_NAMES.ANTHROPIC:
        return 'https://api.anthropic.com';
      case PROVIDER_NAMES.GEMINI:
        return ''; // Gemini doesn't use base URL
      case PROVIDER_NAMES.HUGGINGFACE:
        return 'https://router.huggingface.co/models/';
      case PROVIDER_NAMES.DEEPSEEK:
        return 'https://api.deepseek.com';
      case PROVIDER_NAMES.A4F:
        return 'https://api.a4f.co/v1';
      case PROVIDER_NAMES.Z_AI:
        return 'https://api.z.ai/api/paas/v4';
      case PROVIDER_NAMES.OLLAMA:
      default:
        return 'http://localhost:21434';
    }
  }

  /**
   * Get default embeddings model for provider
   */
  private static getDefaultEmbeddingsModel(provider: string): string {
    switch (provider) {
      case PROVIDER_NAMES.OPENAI:
      case PROVIDER_NAMES.A4F:
      case PROVIDER_NAMES.Z_AI:
      case PROVIDER_NAMES.DEEPSEEK:
        return 'text-embedding-3-small';
      case PROVIDER_NAMES.OLLAMA:
      default:
        return 'nomic-embed-text';
    }
  }
}
