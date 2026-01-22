// config.ts - Provider-specific configuration management

import { PROVIDER_NAMES } from './constants';

/**
 * Configuration manager for provider-specific environment variables
 */
export class ConfigManager {
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
    provider = provider || process.env.CHAT_PROVIDER?.split(',')?.[0] || '';
    const providerUpper = provider.toUpperCase();
    return {
      provider,
      model: this.getDefaultChatModel(provider),
      temperature: parseFloat(this.getDefaultTemperature(provider)),
      baseUrl:
        process.env[`${providerUpper}_CHAT_BASE_URL`] ||
        this.getDefaultBaseUrl(provider),
      apiKey: process.env[`${providerUpper}_CHAT_API_KEY`],
      chunkSize: 8000,
    };
  }

  /**
   * Get default embeddings configuration for provider
   */
  public static getEmbeddingsConfig(provider?: string) {
    provider = provider || process.env.EMBEDDINGS_PROVIDER || '';
    const providerUpper = provider.toUpperCase();
    return {
      provider: provider,
      model: this.getDefaultEmbeddingsModel(provider),
      baseUrl:
        process.env[`${providerUpper}_EMBEDDINGS_BASE_URL`] ||
        this.getDefaultBaseUrl(provider),
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
      case PROVIDER_NAMES.LM_STUDIO:
        return 'qwen2.5-7b-instruct';
      default:
        return 'mistral';
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
      case PROVIDER_NAMES.LM_STUDIO:
        return '0.7';
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
      case PROVIDER_NAMES.LM_STUDIO:
        return 'http://localhost:1234/v1';
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
