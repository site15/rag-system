// ragApplication.ts
import { writeFile } from 'fs/promises';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { resolve } from 'path';
import { ChatDocumentEmbeddingDumpService } from '../services/chat-document-embedding-dump.service';
import { PrismaService } from '../services/prisma.service';
import { EmbeddingsDB } from './embeddingsDB';
import { EmbeddingsFactory } from './embeddingsFactory';
import { GraphEmbedService } from './graphEmbedService';
import { Logger } from './logger';
import { RAG_SEARCH_CONFIG } from './constants';
import { RAGSearcher } from './ragSearcher';

import {
  getConstant,
  GetConstantKey,
  loadConstantsFromFiles,
} from '../utils/get-constant';
import { DefaultProvidersInitializer } from './services/defaultProvidersInitializer';
import { TextHelpers } from './textHelpers';
import { EmbedingMetadata } from './types';

export class RAGApplication {
  public static async start() {
    Logger.logInfo('Запуск ingestion и RAG');

    try {
      // Load constants from files
      await loadConstantsFromFiles();

      // Initialize default providers
      await DefaultProvidersInitializer.initializeDefaultProviders();

      if (process.env.PROCESS_DOCUMENTS === 'true') {
        // Load and process documents
        await RAGApplication.processDocuments();
      }
      if (process.env.CREATE_DUMP_DOCUMENTS === 'true') {
        // Create dump of documents
        await writeFile(
          'dump.sql',
          (await ChatDocumentEmbeddingDumpService.createFullDump()).dumpSql,
        );
      }
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

  private static async processDocuments() {
    const docs = await RAGApplication.loadDocuments();
    await RAGApplication.embedDocuments({ docs });

    Logger.logInfo(
      'Индексация завершена. Для graphContent запустите offline: npm run fill-graph-content',
    );
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
    Logger.logInfo('Документы загружены', { documentCount: docs?.length });

    return docs;
  }

  private static async embedDocuments({ docs }: { docs: any[] }) {
    Logger.logInfo('Начало процесса вставки эмбеддингов');

    type PendingChunk = {
      normalized: string;
      metadata: EmbedingMetadata;
      hash: string;
    };

    const pending: PendingChunk[] = [];

    for (const doc of docs) {
      const isTelegramDoc = doc.metadata.source?.includes('/telegram/');

      Logger.logInfo('Разделение документа', { source: doc.metadata.source });
      const chunks = RAGSearcher.splitTextIntoChunksWithMeta(
        doc.pageContent,
        1600,
      );

      for (let chunkIndex = 0; chunkIndex < chunks?.length; chunkIndex++) {
        const chunk = chunks[chunkIndex];
        const normalized = TextHelpers.normalizeTextMy(chunk.content);

        if (
          !normalized ||
          (isTelegramDoc &&
            !chunk.content.includes(
              getConstant(
                GetConstantKey.RagApplication_telegramMessageIdentifier,
              ),
            ))
        ) {
          continue;
        }

        const hash = TextHelpers.hashContent(normalized);
        if (hash.substring(0, 8) === 'c2ac0e84') {
          continue;
        }

        if (await EmbeddingsDB.chunkExists(hash, doc.metadata.source)) {
          continue;
        }

        pending.push({
          normalized,
          metadata: {
            ...(doc.metadata || {}),
            meta: { ...chunk.meta, chunkIndex },
          },
          hash,
        });
      }
    }

    Logger.logInfo('Чанков к индексации', { count: pending.length });

    let totalChunks = 0;
    const batchSize = RAG_SEARCH_CONFIG.EMBED_BATCH_SIZE;

    for (let i = 0; i < pending.length; i += batchSize) {
      const batch = pending.slice(i, i + batchSize);
      let retryCount = 0;
      const maxRetries = 2;

      while (retryCount <= maxRetries) {
        try {
          const vectors = await EmbeddingsFactory.embedDocuments(
            batch.map((item) => item.normalized),
          );

          for (let j = 0; j < batch.length; j++) {
            await RAGApplication.insertEmbedding({
              content: batch[j].normalized,
              vector: vectors[j],
              metadata: batch[j].metadata,
              hash: batch[j].hash,
            });
            totalChunks++;
          }
          break;
        } catch (error) {
          retryCount++;
          if (retryCount <= maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          } else {
            Logger.logError(
              'Ошибка батча эмбеддингов',
              { batchStart: i, error: (error as Error).message },
              (error as Error).stack,
            );
          }
        }
      }
    }

    Logger.logInfo('Процесс вставки эмбеддингов завершен', { totalChunks });
  }

  private static async insertEmbedding({
    content,
    vector,
    metadata,
    hash,
  }: {
    content: string;
    vector: number[];
    metadata: EmbedingMetadata;
    hash: string;
  }) {
    const vectorValue = `[${vector.join(',')}]`;

    if (vector?.length === 384) {
      await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding384, metadata, "contentHash")
VALUES (${content}, ${vectorValue}::vector, ${metadata || '{}'}, ${hash})
`;
    } else if (vector?.length === 768) {
      await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding768, metadata, "contentHash")
VALUES (${content}, ${vectorValue}::vector, ${metadata || '{}'}, ${hash})
`;
    } else if (vector?.length === 1024) {
      await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding1024, metadata, "contentHash")
VALUES (${content}, ${vectorValue}::vector, ${metadata || '{}'}, ${hash})
`;
    } else if (vector?.length === 1536) {
      await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding1536, metadata, "contentHash")
VALUES (${content}, ${vectorValue}::vector, ${metadata || '{}'}, ${hash})
`;
    } else if (vector?.length === 3072) {
      await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding3072, metadata, "contentHash")
VALUES (${content}, ${vectorValue}::vector, ${metadata || '{}'}, ${hash})
`;
    } else {
      throw new Error(`Unsupported embedding dimension: ${vector?.length}`);
    }
  }

  public static async fillGraphEmbedDocuments() {
    return GraphEmbedService.fillGraphEmbedDocuments();
  }

  private static async cleanup() {
    // Prisma handles connection cleanup automatically
    Logger.logInfo('Соединение с БД закрыто');
  }
}
