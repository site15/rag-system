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
import { ConfigManager } from './config';
import { LLMLogger } from './llmLogger';

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

  public static async fillGraphEmbedDocuments() {
    Logger.logInfo('Начало заполнения graphContent для документов');

    try {
      // Get chat configuration for LLM
      const appConfig = ConfigManager.getAppConfig();
      const chatConfig = ConfigManager.getChatConfig(appConfig.chatProvider);
      const llm = LLMFactory.createLLM(chatConfig.provider, chatConfig);

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
          const prompt = `You are an expert in semantic metadata extraction and document classification.

Your task is to analyze the provided text and produce a structured JSON object
containing metadata that best represents the content, as well as a classification
of the type of response this content would require.

Rules:
- Return ONLY valid JSON
- Do NOT use markdown, explanations, or comments
- Field names must be in lowerCamelCase
- Include only fields that are relevant to this specific document
- Always include the mandatory base fields (see below)
- Include optional fields only if relevant
- Determine the classification label according to the user request classification rules
  (see classification rules below)
- If multiple classification types apply, choose the one with the HIGHEST priority
- If the message is not a direct user request (e.g. article, documentation, log, metadata),
  set classification to "none"

Mandatory base fields (always include):
- title: short descriptive title (2–7 words)
- summary: concise summary of the document (1–3 sentences)
- documentType: one of "note", "instruction", "article", "code", "log", "resume", "cv", "spec", "unknown"
- language: "ru", "en", or "other"

Optional fields (include only if relevant):
- topics: array of high-level themes or domains
- entities: array of important named entities, technologies, tools, companies, people
- technologies: array of technical tools, frameworks, languages, platforms
- infrastructure: object describing local/cloud infrastructure components
- problems: array of problems or pain points described
- solutions: array of solutions or approaches described
- limitations: array of constraints or drawbacks
- steps: ordered array of implementation or procedural steps
- tags: short categorical labels
- publishedAt: ISO 8601 date string if present
- source: object with origin information (e.g. url, platform)
- importance: number from 0.0 to 1.0 indicating overall relevance and completeness

Classification rules:

- Determine the type of data that a correct response to this message would belong to, NOT the type of the text itself.
- Return a single classification label as a string.
- Priorities (high → low):

spam, job, freelance, consulting, pricing, partnership, investment, hiring, interview, speaking, media, support, review, decision, technology, product, access, resume, portfolio, articles, life, intro, followup, gratitude, clarification, none

- Definitions:

technology — mentions of technologies, tools, frameworks, programming languages, architecture patterns, or technical concepts WITHOUT an explicit request for help, decision, review, or instruction.

articles — requests for explanations, guides, tutorials, walkthroughs, educational content, or how-to materials.

support — requests for help with a specific technical problem, bug, error, or failure.

review — requests to review code, architecture, ideas, technical documents, or designs.

decision — requests for help choosing between technologies, tools, approaches, or solutions.

job — full-time employment offers or discussions.

freelance — project-based, part-time, or contract work offers.

consulting — paid expert help, audits, mentoring, or advisory requests.

pricing — questions about rates, costs, budgets, or payment terms.

partnership — proposals for collaboration, joint ventures, or startups.

investment — investment offers or requests for funding.

hiring — questions about recruiting, building, or strengthening a team.

interview — interview-related questions or preparation.

speaking — invitations to speak at events, podcasts, streams, or conferences.

media — requests for interviews, articles, or comments for media.

product — questions about products or services I created.

access — requests for access to demos, betas, repositories, or courses.

resume — questions about my professional experience, skills, or background.

portfolio — questions about my projects, achievements, or case studies.

intro — requests for introductions or networking.

followup — continuation of previous conversation without a new intent.

gratitude — expressions of thanks without a request.

clarification — questions asking to clarify or explain a previous response.

life — questions about personal life, hobbies, or preferences.

spam — promotional, bulk, or irrelevant messages.

none — anything that does not fit the above or is not a user request.

Additional guidelines:
- Do NOT invent information that is not explicitly or implicitly present
- Prefer semantic meaning over exact wording
- Group related information into structured objects when appropriate
- Avoid overly generic fields if more specific structure is possible
- If information is partial or unclear, omit the field entirely
- If no optional fields are clearly applicable, return only the mandatory base fields

Output format:

{
  "title": "...",
  "summary": "...",
  "documentType": "...",
  "language": "...",
  "topics": [...],
  "entities": [...],
  "technologies": [...],
  "infrastructure": {...},
  "problems": [...],
  "solutions": [...],
  "limitations": [...],
  "steps": [...],
  "tags": [...],
  "publishedAt": "...",
  "source": {...},
  "importance": 0.0-1.0,
  "classification": "..." 
}

Text to analyze: ${doc.content}`;

          // Call LLM
          const result = await llm.invoke(prompt);
          const response = LLMLogger.getResponseString(result);

          // Validate JSON structure
          try {
            JSON.parse(response);
          } catch (jsonError) {
            throw new Error(
              `Invalid JSON in response: ${(jsonError as Error).message}`,
            );
          }

          // Update the document with graphContent
          await PrismaService.instance.chatDocumentEmbedding.update({
            where: { id: doc.id },
            data: { graphContent: response },
          });

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
