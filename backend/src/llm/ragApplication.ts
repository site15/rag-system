// ragApplication.ts
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { OpenAIEmbeddings } from '@langchain/openai';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { resolve } from 'path';
import { PrismaService } from '../services/prisma.service';
import { ConfigManager } from './config';
import { EmbeddingsDB } from './embeddingsDB';
import { EmbeddingsFactory } from './embeddingsFactory';
import { LLMFactory } from './llmFactory';
import { LLMLogger } from './llmLogger';
import { Logger } from './logger';
import { DefaultProvidersInitializer } from './services/defaultProvidersInitializer';
import { TextHelpers } from './textHelpers';
import { AppConfig, ChatConfig, EmbeddingsConfig } from './types';
import { RAGSearcher } from './ragSearcher';

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

  private static async embedDocuments(
    docs: any[],
    embeddings: OpenAIEmbeddings | OllamaEmbeddings,
  ) {
    // === Вставка эмбеддингов ===
    Logger.logInfo('Начало процесса вставки эмбеддингов');
    // const splitterTelegram = new RecursiveCharacterTextSplitter({
    //   chunkSize: 2000,
    //   chunkOverlap: 0,
    //   separators: ['\n--\n'],
    // });
    //
    // const splitterGlobal = new RecursiveCharacterTextSplitter({
    //   chunkSize: 1500,
    //   chunkOverlap: 250,
    //   separators: ['\n--\n', '\n\n', '\n', ' ', ''],
    // });

    let totalChunks = 0;
    for (const doc of docs) {
      const isTelegramDoc = doc.metadata.source?.includes('/telegram/');
      // const splitter = isTelegramDoc ? splitterTelegram : splitterGlobal;

      if (!doc.metadata) doc.metadata = {};
      doc.metadata.source = doc.metadata.source;
      Logger.logInfo('Разделение документа', { source: doc.metadata.source });
      const chunks = RAGSearcher.splitTextIntoChunks(doc.pageContent, 1700); // await splitter.splitDocuments([doc]);

      for (const chunk of chunks) {
        const source = doc.metadata.source;
        const normalized = TextHelpers.normalizeTextMy(chunk);
        if (
          !normalized ||
          (isTelegramDoc && !chunk.includes('My telegram message'))
        ) {
          Logger.logInfo('Пропуск пустого чанка', {
            source,
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
          source: source,
          hash: hash.substring(0, 8),
          normalizedLength: normalized.length,
        });
        const vector = await embeddings.embedQuery(normalized);
        const vectorValue = `[${vector.join(',')}]`;

        if (vector.length === 384) {
          await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding384, metadata, "contentHash")
VALUES (${chunk}, ${vectorValue}::vector, ${doc.metadata || '{}'}, ${hash})
`;
        } else if (vector.length === 768) {
          await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding768, metadata, "contentHash")
VALUES (${chunk}, ${vectorValue}::vector, ${doc.metadata || '{}'}, ${hash})
`;
        } else if (vector.length === 1024) {
          await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding1024, metadata, "contentHash")
VALUES (${chunk}, ${vectorValue}::vector, ${doc.metadata || '{}'}, ${hash})
`;
        } else if (vector.length === 1536) {
          await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding1536, metadata, "contentHash")
VALUES (${chunk}, ${vectorValue}::vector, ${doc.metadata || '{}'}, ${hash})
`;
        } else if (vector.length === 3072) {
          await PrismaService.instance.$executeRaw`
INSERT INTO "ChatDocumentEmbedding"
(content, embedding3072, metadata, "contentHash")
VALUES (${chunk}, ${vectorValue}::vector, ${doc.metadata || '{}'}, ${hash})
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

  public static async fillGraphEmbedDocuments(
    embeddings?: OpenAIEmbeddings | OllamaEmbeddings,
  ) {
    Logger.logInfo(
      'Начало заполнения graphContent и graphEmbeddings для документов',
    );

    try {
      // Get chat configuration for LLM
      const appConfig = ConfigManager.getAppConfig();
      const chatConfig = ConfigManager.getChatConfig(appConfig.chatProvider);
      const llm = LLMFactory.createLLM(chatConfig.provider, chatConfig);

      // If embeddings not provided, initialize them
      let embeddingModel: OpenAIEmbeddings | OllamaEmbeddings;
      if (embeddings) {
        embeddingModel = embeddings;
      } else {
        const embeddingsConfig = ConfigManager.getEmbeddingsConfig(
          appConfig.embeddingsProvider,
        );
        embeddingModel = EmbeddingsFactory.createEmbeddings(
          appConfig.embeddingsProvider,
          embeddingsConfig,
        );
      }

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
          const prompt = `You are an expert system for semantic metadata extraction and document classification.

Your task is to analyze the provided text and return a SINGLE valid JSON object
that represents the document metadata and the required response classification.

STRICT OUTPUT RULES:
- Output ONLY valid JSON
- Do NOT include markdown, explanations, comments, or extra text
- If the output is not valid JSON, the response is invalid
- Field names must be in lowerCamelCase
- Do NOT include fields that are not relevant
- Always include all mandatory base fields
- Optional fields must be included ONLY if clearly applicable
- If the input text is NOT a direct user request, set classification to "none"

LANGUAGE RULE:
- All textual values in the JSON MUST be in RUSSIAN
- EXCEPTIONS (do NOT translate):
  - proper names
  - company names
  - technologies, tools, frameworks, programming languages
  - widely accepted technical terms

MANDATORY BASE FIELDS (always include):
- title: short descriptive title (2–7 words)
- summary: concise summary (1–3 sentences)
- documentType: one of ["note","instruction","article","code","log","resume","cv","spec","unknown"]
- language: "ru", "en", or "other"
- classification: string (see rules below)

OPTIONAL FIELDS (include only if relevant):
- topics
- entities
- technologies
- infrastructure
- problems
- solutions
- limitations
- steps
- tags
- publishedAt
- source
- importance

CLASSIFICATION RULES:
- Classification refers to the type of a CORRECT RESPONSE to this message,
  NOT the type of the document itself.
- Return ONE classification label.
- If multiple labels apply, choose the HIGHEST priority.

PRIORITY ORDER (high → low):
spam, job, freelance, consulting, pricing, partnership, investment, hiring,
interview, speaking, media, support, review, decision, technology, product,
access, resume, portfolio, articles, life, intro, followup, gratitude,
clarification, none

CLASSIFICATION DEFINITIONS (key ones):
- technology: mentions of technical concepts WITHOUT asking for help or decisions
- articles: requests for explanations, guides, tutorials, or how-to content
- support: requests for help with a specific technical problem
- review: requests to review code, architecture, or documents
- decision: requests to choose between options
- none: not a user request (articles, docs, logs, metadata, etc.)

ADDITIONAL RULES:
- Do NOT invent information
- Prefer semantic meaning over exact wording
- Omit fields if information is missing or unclear
- If no optional fields apply, return ONLY mandatory base fields

OUTPUT FORMAT:
{
  "title": "...",
  "summary": "...",
  "documentType": "...",
  "language": "...",
  "classification": "...",
  "...": "other relevant fields"
}

TEXT TO ANALYZE: ${doc.content}`;

          // Call LLM
          const result = await llm.invoke(prompt);
          const response = LLMLogger.getResponseString(result);

          // Validate JSON structure
          try {
            JSON.parse(response);
          } catch (jsonError) {
            Logger.logError('Invalid JSON in response', {
              response,
              error: jsonError,
            });
            throw new Error(
              `Invalid JSON in response: ${(jsonError as Error).message}`,
            );
          }

          // Generate embedding for the graph content (JSON string)
          const graphVector = await embeddingModel.embedQuery(response);
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
          await new Promise((resolve) => setTimeout(resolve, 1000));
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
