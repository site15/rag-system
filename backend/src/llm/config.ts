// config.ts - Provider-specific configuration management

import { PROVIDER_NAMES } from './constants';

import dotenv from 'dotenv';

/**
 * Configuration manager for provider-specific environment variables
 */
export class ConfigManager {
  /**
   * Get provider-specific configuration for chat services
   * @param provider - Provider name (e.g., 'groq', 'openai', 'ollama')
   * @returns Object with provider-specific configuration
   */
  public static getChatConfig(provider: string) {
    const providerUpper = provider.toUpperCase();

    return {
      provider,
      model:
        process.env[`${providerUpper}_CHAT_MODEL`] ||
        this.getDefaultChatModel(provider),
      temperature: parseFloat(
        process.env[`${providerUpper}_CHAT_TEMPERATURE`] ||
          this.getDefaultTemperature(provider),
      ),
      baseUrl:
        process.env[`${providerUpper}_CHAT_BASE_URL`] ||
        this.getDefaultBaseUrl(provider),
      apiKey: process.env[`${providerUpper}_CHAT_API_KEY`],
      chunkSize: parseInt(
        process.env[`${providerUpper}_CHAT_CHUNK_SIZE`] || '2000',
      ),
    };
  }

  /**
   * Get provider-specific configuration for embeddings services
   * @param provider - Provider name (e.g., 'groq', 'openai', 'ollama')
   * @returns Object with provider-specific configuration
   */
  public static getEmbeddingsConfig(provider: string) {
    const providerUpper = provider.toUpperCase();

    return {
      provider: process.env[`${providerUpper}_EMBEDDINGS_PROVIDER`] || provider,
      model:
        process.env[`${providerUpper}_EMBEDDINGS_MODEL`] ||
        this.getDefaultEmbeddingsModel(provider),
      baseUrl:
        process.env[`${providerUpper}_EMBEDDINGS_BASE_URL`] ||
        this.getDefaultEmbeddingsBaseUrl(provider),
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
        return 'http://localhost:11434';
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

  /**
   * Get default embeddings base URL for provider
   */
  private static getDefaultEmbeddingsBaseUrl(provider: string): string {
    switch (provider) {
      case PROVIDER_NAMES.OPENAI:
        return 'https://api.openai.com/v1';
      case PROVIDER_NAMES.A4F:
        return 'https://api.a4f.co/v1';
      case PROVIDER_NAMES.Z_AI:
        return 'https://api.z.ai/api/paas/v4';
      case PROVIDER_NAMES.DEEPSEEK:
        return 'https://api.deepseek.com';
      case PROVIDER_NAMES.OLLAMA:
      default:
        return 'http://localhost:11434';
    }
  }

  /**
   * Get general application configuration
   */
  public static getAppConfig() {
    dotenv.config();
    if (!process.env.CHAT_PROVIDER) {
      throw new Error('CHAT_PROVIDER environment variable is missing');
    }
    if (!process.env.EMBEDDINGS_PROVIDER) {
      throw new Error('EMBEDDINGS_PROVIDER environment variable is missing');
    }
    const config = {
      port: parseInt(process.env.PORT || '23005', 10),
      host: process.env.HOST || '0.0.0.0',
      chatProvider: process.env.CHAT_PROVIDER,
      embeddingsProvider: process.env.EMBEDDINGS_PROVIDER,
      parallelThreads: parseInt(process.env.PARALLEL_THREADS || '1', 10),
      maxConsecutiveFailures: parseInt(
        process.env.MAX_CONSECUTIVE_FAILURES || '5',
        10,
      ),
      enableFileLogging: process.env.ENABLE_FILE_LOGGING === 'true',
    };
    return config;
  }

  /**
   * Get security configuration
   */
  public static getSecurityConfig() {
    return {
      hardCodedToken: process.env.HARD_CODED_TOKEN,
      allowedIps: process.env.ALLOWED_IPS?.split(',') || [],
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
   * Get LLM configuration
   */
  public static getLLMConfig() {
    return {
      timeoutMs: parseInt(process.env.LLM_TIMEOUT_MS || '180000', 10), // 3 minutes default
    };
  }

  /**
   * Get all available provider configurations for documentation
   */
  public static getProviderConfigs() {
    const providers = Object.values(PROVIDER_NAMES);
    const configs: Record<string, any> = {};

    for (const provider of providers) {
      configs[provider] = {
        chat: this.getChatConfig(provider),
        embeddings: this.getEmbeddingsConfig(provider),
      };
    }

    return configs;
  }
}
