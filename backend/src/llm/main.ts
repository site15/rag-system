// ingest.ts
import { ConfigManager } from './config';
import { RAGApplication } from './ragApplication';

// Load configuration at startup
const appConfig = ConfigManager.getAppConfig();
const chatProvider = appConfig.chatProvider;
const embeddingsProvider = appConfig.embeddingsProvider;
const chatConfig = ConfigManager.getChatConfig(chatProvider);
const embeddingsConfig = ConfigManager.getEmbeddingsConfig(embeddingsProvider);
const fullConfig = {
  app: appConfig,
  providers: {
    chat: chatConfig,
    embeddings: embeddingsConfig,
  },
};

// Run the application with configuration
RAGApplication.main(fullConfig);
