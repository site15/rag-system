#!/usr/bin/env node
// test-config.js - Test the provider-specific configuration system

import { ConfigManager } from './config';

console.log('=== Provider-Specific Configuration Test ===\n');

// Test all providers
const providers = [
  'groq',
  'ollama',
  'openai',
  'deepseek',
  'a4f',
  'gemini',
  'huggingface',
  'anthropic',
];

console.log('Chat Configurations:');
providers.forEach((provider) => {
  try {
    const config = ConfigManager.getChatConfig(provider);
    console.log(`\n${provider.toUpperCase()}:`);
    console.log(`  Model: ${config.model}`);
    console.log(`  Temperature: ${config.temperature}`);
    console.log(`  Base URL: ${config.baseUrl || 'N/A'}`);
    console.log(`  Has API Key: ${!!config.apiKey}`);
    console.log(`  Chunk Size: ${config.chunkSize}`);
  } catch (error) {
    console.log(
      `\n${provider.toUpperCase()}: ERROR - ${(error as Error).message}`,
    );
  }
});

console.log('\n' + '='.repeat(50) + '\n');

console.log('Embeddings Configurations:');
providers.forEach((provider) => {
  try {
    const config = ConfigManager.getEmbeddingsConfig(provider);
    console.log(`\n${provider.toUpperCase()}:`);
    console.log(`  Model: ${config.model}`);
    console.log(`  Base URL: ${config.baseUrl || 'N/A'}`);
    console.log(`  Has API Key: ${!!config.apiKey}`);
  } catch (error) {
    console.log(
      `\n${provider.toUpperCase()}: ERROR - ${(error as Error).message}`,
    );
  }
});
