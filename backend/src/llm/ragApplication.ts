// ragApplication.ts
import { writeFile } from 'fs/promises';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import Mustache from 'mustache';
import { resolve } from 'path';
import { ChatDocumentEmbeddingDumpService } from '../services/chat-document-embedding-dump.service';
import { PrismaService } from '../services/prisma.service';
import { EmbeddingsDB } from './embeddingsDB';
import { EmbeddingsFactory } from './embeddingsFactory';
import { LLMFactory } from './llmFactory';
import { Logger } from './logger';
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
    // Load documents
    const docs = await RAGApplication.loadDocuments();

    // Process and embed documents
    await RAGApplication.embedDocuments({ docs });

    Logger.logInfo('Запуск заполнения graphContent для документов');

    const result = await RAGApplication.fillGraphEmbedDocuments();
    Logger.logInfo('Результат выполнения:', result);
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

  private static async embedDocuments({ docs }: { docs: any[] }) {
    // === Вставка эмбеддингов ===
    Logger.logInfo('Начало процесса вставки эмбеддингов');

    let totalChunks = 0;
    for (const doc of docs) {
      const isTelegramDoc = doc.metadata.source?.includes('/telegram/');
      // const splitter = isTelegramDoc ? splitterTelegram : splitterGlobal;

      Logger.logInfo('Разделение документа', { source: doc.metadata.source });
      const chunks = RAGSearcher.splitTextIntoChunksWithMeta(
        doc.pageContent,
        1600,
      ); // await splitter.splitDocuments([doc]);

      for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
        let retryCount = 0;
        const maxRetries = 1;

        while (retryCount <= maxRetries) {
          try {
            const chunk = chunks[chunkIndex];

            const trimmedContent = chunk.content
              .split(`\n--\n`)
              .join('')
              .split(`\n\n\n`)
              .join('')
              ?.trim();
            const metadata: EmbedingMetadata = {
              ...(doc.metadata || {}),
              meta: { ...chunk.meta, chunkIndex },
            };
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
              Logger.logInfo('Пропуск пустого чанка', {
                metadata,
              });
              break; // Exit the retry loop for this chunk
            }
            const hash = TextHelpers.hashContent(normalized);
            const skippedChunks = ['c2ac0e84'];
            if (skippedChunks.includes(hash.substring(0, 8))) {
              Logger.logInfo('Пропуск чанка по хешу', {
                hash: hash.substring(0, 8),
                skippedChunks,
                normalizedLength: normalized.length,
                normalized,
              });
              break; // Exit the retry loop for this chunk
            }
            if (await EmbeddingsDB.chunkExists(hash, doc.metadata.source)) {
              Logger.logInfo('Чанк уже существует, пропуск', {
                hash: hash.substring(0, 8),
                normalizedLength: normalized.length,
              });
              break; // Exit the retry loop for this chunk
            }
            Logger.logInfo('Создание эмбеддинга для чанка', {
              source: metadata.source,
              hash: hash.substring(0, 8),
              normalizedLength: normalized.length,
            });

            const vector = await EmbeddingsFactory.embedQuery(normalized);
            const vectorValue = `[${vector.join(',')}]`;

            if (vector.length === 384) {
              await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding384, metadata, "contentHash")
VALUES (${trimmedContent}, ${vectorValue}::vector, ${metadata || '{}'}, ${hash})
`;
            } else if (vector.length === 768) {
              await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding768, metadata, "contentHash")
VALUES (${trimmedContent}, ${vectorValue}::vector, ${metadata || '{}'}, ${hash})
`;
            } else if (vector.length === 1024) {
              await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding1024, metadata, "contentHash")
VALUES (${trimmedContent}, ${vectorValue}::vector, ${metadata || '{}'}, ${hash})
`;
            } else if (vector.length === 1536) {
              await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding1536, metadata, "contentHash")
VALUES (${trimmedContent}, ${vectorValue}::vector, ${metadata || '{}'}, ${hash})
`;
            } else if (vector.length === 3072) {
              await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding3072, metadata, "contentHash")
VALUES (${trimmedContent}, ${vectorValue}::vector, ${metadata || '{}'}, ${hash})
`;
            }

            totalChunks++;
            Logger.logInfo('Эмбеддинг сохранен', {
              chunkNumber: totalChunks,
              hash: hash.substring(0, 8),
            });

            // Success - exit the retry loop
            break;
          } catch (error) {
            retryCount++;

            if (retryCount <= maxRetries) {
              // Log retry attempt
              Logger.logWarn(
                'Ошибка при создании эмбеддинга для чанка, повторная попытка через 0.5 секунды',
                {
                  chunkNumber: totalChunks,
                  retryAttempt: retryCount,
                  error: error.message,
                },
              );

              // Wait 2 seconds before retry
              await new Promise((resolve) => setTimeout(resolve, 500));
            } else {
              // Max retries exceeded - log final error and move to next chunk
              Logger.logError(
                'Ошибка при создании эмбеддинга для чанка после всех попыток',
                {
                  chunkNumber: totalChunks,
                  error: error.message,
                  maxRetries: maxRetries,
                },
                error.stack,
              );
              // Don't throw - continue with next chunk
              break;
            }
          }
        }
      }
    }
    Logger.logInfo('Процесс вставки эмбеддингов завершен', { totalChunks });
  }

  public static async fillGraphEmbedDocuments() {
    Logger.logInfo(
      'Начало заполнения graphContent и graphEmbeddings для документов',
    );

    try {
      // Find all documents without graphContent
      const documents =
        await PrismaService.instance.chatDocumentEmbedding.findMany({
          where: {
            graphContent: null,
          },
          select: {
            id: true,
            content: true,
            graphContent: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        });

      Logger.logInfo('Найдено документов для обработки', {
        count: documents.length,
      });

      let processedCount = 0;
      const errors: string[] = [];

      for (const doc of documents) {
        try {
          Logger.logInfo('Обработка документа', {
            id: doc.id,
            contentLength: doc.content.length,
          });
          let graphContent: string | undefined;
          try {
            graphContent = doc.graphContent
              ? JSON.parse(doc.graphContent)
              : undefined;
          } catch (jsonError) {
            graphContent = undefined;
          }
          if (graphContent) {
            continue;
          }

          // Create the prompt with the document content
          const prompt = getConstant(
            GetConstantKey.Prompt_documentAnalysisTemplate,
            { content: doc.content },
          );

          // Call LLM
          let response = await LLMFactory.invoke(prompt);

          // Validate JSON structure
          try {
            JSON.parse(response);
          } catch (jsonError) {
            Logger.logError('Invalid JSON in response', {
              response,
            });
            response = Mustache.render('ERROR: {{response}}', { response });
          }

          // Generate embedding for the graph content (JSON string)
          const graphVector = await EmbeddingsFactory.embedQuery(response);
          const graphVectorValue = `[${graphVector.join(',')}]`;

          // Use raw SQL for vector operations since Prisma doesn't support vectors natively
          if (graphVector.length === 384) {
            await PrismaService.instance.$executeRaw`
              UPDATE "ChatDocumentEmbedding" 
              SET "graphContent" = ${response}, "graphEmbedding384" = ${graphVectorValue}::vector 
              WHERE id = ${doc.id}
            `;
          } else if (graphVector.length === 768) {
            await PrismaService.instance.$executeRaw`
              UPDATE "ChatDocumentEmbedding" 
              SET "graphContent" = ${response}, "graphEmbedding768" = ${graphVectorValue}::vector 
              WHERE id = ${doc.id}
            `;
          } else if (graphVector.length === 1024) {
            await PrismaService.instance.$executeRaw`
              UPDATE "ChatDocumentEmbedding" 
              SET "graphContent" = ${response}, "graphEmbedding1024" = ${graphVectorValue}::vector 
              WHERE id = ${doc.id}
            `;
          } else if (graphVector.length === 1536) {
            await PrismaService.instance.$executeRaw`
              UPDATE "ChatDocumentEmbedding" 
              SET "graphContent" = ${response}, "graphEmbedding1536" = ${graphVectorValue}::vector 
              WHERE id = ${doc.id}
            `;
          } else if (graphVector.length === 3072) {
            await PrismaService.instance.$executeRaw`
              UPDATE "ChatDocumentEmbedding" 
              SET "graphContent" = ${response}, "graphEmbedding3072" = ${graphVectorValue}::vector 
              WHERE id = ${doc.id}
            `;
          }

          processedCount++;
          Logger.logInfo('Документ успешно обработан', {
            id: doc.id,
            processedCount,
            total: documents.length,
          });

          // Add small delay to avoid rate limiting
          // await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          const errorMsg = `Ошибка обработки документа ${doc.id}: ${(error as Error).message}`;
          Logger.logError(errorMsg, { error: error });
          errors.push(errorMsg);

          // Continue processing other documents
          continue;
        }
      }

      Logger.logInfo('Завершена обработка документов', {
        totalProcessed: processedCount,
        totalDocuments: documents.length,
        errorsCount: errors.length,
      });

      if (errors.length > 0) {
        Logger.logError('Ошибки при обработке документов', { errors });
      }

      return {
        success: true,
        processedCount,
        totalCount: documents.length,
        errors,
      };
    } catch (error) {
      Logger.logError('Критическая ошибка при заполнении graphContent', {
        error: (error as Error).message,
        stack: (error as Error).stack,
      });
      throw error;
    }
  }

  private static async cleanup() {
    // Prisma handles connection cleanup automatically
    Logger.logInfo('Соединение с БД закрыто');
  }
}
