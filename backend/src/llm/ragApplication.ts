// ragApplication.ts
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { OpenAIEmbeddings } from '@langchain/openai';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { resolve } from 'path';
import { PrismaService } from '../services/prisma.service';
import { EmbeddingsDB } from './embeddingsDB';
import { EmbeddingsFactory } from './embeddingsFactory';
import { LLMFactory } from './llmFactory';
import { Logger } from './logger';
import { DefaultProvidersInitializer } from './services/defaultProvidersInitializer';
import { TextHelpers } from './textHelpers';
import { AppConfig, ChatConfig, EmbeddingsConfig } from './types';

export class RAGApplication {
  public static async start(fullConfig: {
    app: AppConfig;
    providers: {
      embeddings: EmbeddingsConfig;
    };
  }) {
    Logger.logInfo('Запуск ingestion и RAG');

    try {
      await DefaultProvidersInitializer.initializeDefaultProviders();

      // Initialize models with configuration
      const models = await RAGApplication.initializeModels(fullConfig);

      // Load and process documents
      await RAGApplication.processDocuments(models.embeddings);
    } catch (e) {
      Logger.logError(
        'Критическая ошибка',
        {
          error: String(e),
          stack: (e as any).stack,
        },
        (e as Error).stack,
      );
      throw e;
    }
  }

  public static async stop() {
    Logger.logInfo('Остановка ingestion и RAG');
    await RAGApplication.cleanup();
  }

  private static async initializeModels(fullConfig: {
    app: AppConfig;
    providers: {
      chat?: ChatConfig;
      embeddings: EmbeddingsConfig;
    };
  }) {
    Logger.logInfo('Инициализация моделей', fullConfig);
    const embeddings = EmbeddingsFactory.createEmbeddings(
      fullConfig.app.embeddingsProvider,
      fullConfig.providers.embeddings,
    );
    if (fullConfig.providers.chat) {
      // Use the new function that supports multiple providers
      const llm = LLMFactory.createLLM(
        fullConfig.app.chatProvider,
        fullConfig.providers.chat,
      ); // Use the new function that supports multiple providers
      Logger.logInfo('Модели инициализированы');
      return { embeddings, llm };
    }
    return { embeddings, llm: undefined };
  }

  private static async processDocuments(
    embeddings: OpenAIEmbeddings | OllamaEmbeddings,
  ) {
    // Load documents
    const docs = await RAGApplication.loadDocuments();

    // Process and embed documents
    await RAGApplication.embedDocuments(docs, embeddings);
  }

  private static async loadDocuments() {
    const sourcesPath = resolve(process.env.SOURCES_PATH!);
    Logger.logInfo(`Загрузка документов из директории ${sourcesPath}`);
    const loader = new DirectoryLoader(
      sourcesPath,
      { '.txt': (p) => new TextLoader(p), '.md': (p) => new TextLoader(p) },
      true,
    );
    const docs = await loader.load();
    Logger.logInfo('Документы загружены', { documentCount: docs.length });

    return docs;
  }

  private static async embedDocuments(
    docs: any[],
    embeddings: OpenAIEmbeddings | OllamaEmbeddings,
  ) {
    // === Вставка эмбеддингов ===
    Logger.logInfo('Начало процесса вставки эмбеддингов');
    const splitterTelegram = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 0,
      separators: ['\n--\n'],
    });

    const splitterGlobal = new RecursiveCharacterTextSplitter({
      chunkSize: 1500,
      chunkOverlap: 250,
      separators: ['\n--\n', '\n\n', '\n', ' ', ''],
    });

    let totalChunks = 0;
    for (const doc of docs) {
      const isTelegramDoc = doc.metadata.source?.includes('/telegram/');
      const splitter = isTelegramDoc ? splitterTelegram : splitterGlobal;

      if (!doc.metadata) doc.metadata = {};
      doc.metadata.source = doc.metadata.source;
      Logger.logInfo('Разделение документа', { source: doc.metadata.source });
      const chunks = await splitter.splitDocuments([doc]);

      for (const chunk of chunks) {
        if (!chunk.metadata) chunk.metadata = {};
        chunk.metadata.source = doc.metadata.source;
        const normalized = TextHelpers.normalizeTextMy(chunk.pageContent);
        if (
          !normalized ||
          (isTelegramDoc && !chunk.pageContent.includes('My telegram message'))
        ) {
          Logger.logInfo('Пропуск пустого чанка', {
            source: chunk.metadata.source,
          });
          continue;
        }
        const hash = TextHelpers.hashContent(normalized);
        if (await EmbeddingsDB.chunkExists(hash, doc.metadata.source)) {
          Logger.logInfo('Чанк уже существует, пропуск', {
            hash: hash.substring(0, 8),
          });
          continue;
        }
        Logger.logInfo('Создание эмбеддинга для чанка', {
          source: chunk.metadata.source,
          hash: hash.substring(0, 8),
          normalizedLength: normalized.length,
        });
        const vector = await embeddings.embedQuery(normalized);
        const vectorValue = `[${vector.join(',')}]`;

        if (vector.length === 384) {
          await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding384, metadata, "contentHash")
VALUES (${chunk.pageContent}, ${vectorValue}::vector, ${chunk.metadata || '{}'}, ${hash})
`;
        } else if (vector.length === 768) {
          await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding768, metadata, "contentHash")
VALUES (${chunk.pageContent}, ${vectorValue}::vector, ${chunk.metadata || '{}'}, ${hash})
`;
        } else if (vector.length === 1024) {
          await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding1024, metadata, "contentHash")
VALUES (${chunk.pageContent}, ${vectorValue}::vector, ${chunk.metadata || '{}'}, ${hash})
`;
        } else if (vector.length === 1536) {
          await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding1536, metadata, "contentHash")
VALUES (${chunk.pageContent}, ${vectorValue}::vector, ${chunk.metadata || '{}'}, ${hash})
`;
        } else if (vector.length === 3072) {
          await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding3072, metadata, "contentHash")
VALUES (${chunk.pageContent}, ${vectorValue}::vector, ${chunk.metadata || '{}'}, ${hash})
`;
        }

        totalChunks++;
        Logger.logInfo('Эмбеддинг сохранен', {
          chunkNumber: totalChunks,
          hash: hash.substring(0, 8),
        });
      }
    }
    Logger.logInfo('Процесс вставки эмбеддингов завершен', { totalChunks });
  }

  private static async cleanup() {
    // Prisma handles connection cleanup automatically
    Logger.logInfo('Соединение с БД закрыто');
  }
}
