// ragApplication.ts
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { CLIConfig } from './cliConfig';
import { Database } from './database';
import { DialogManager } from './dialogManager';
import { DialogSummary } from './dialogSummary';
import { EmbeddingsDB } from './embeddingsDB';
import { EmbeddingsFactory } from './embeddingsFactory';
import { LLMChunkProcessor } from './llmChunkProcessor';
import { LLMFactory } from './llmFactory';
import { Logger } from './logger';
import { RAGSearcher } from './ragSearcher';
import { DefaultProvidersInitializer } from './services/defaultProvidersInitializer';
import { Category, QuestionTransformer } from './services/questionTransformer';
import { SummarizationService } from './services/summarizationService';
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

  public static async main(fullConfig: {
    app: AppConfig;
    providers: {
      chat: ChatConfig;
      embeddings: EmbeddingsConfig;
    };
  }) {
    Logger.logInfo('Запуск ingestion и RAG');

    try {
      await DefaultProvidersInitializer.initializeDefaultProviders();

      // Initialize models with configuration
      const { embeddings, llm } =
        await RAGApplication.initializeModels(fullConfig);
      const llmProvider = fullConfig.app.chatProvider;

      // Load and process documents
      await RAGApplication.processDocuments(embeddings);

      // Process chat interaction
      await RAGApplication.processChat({
        embeddings,
        llm,
        provider: llmProvider,
        appConfig: fullConfig.app,
      });
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
    } finally {
      await RAGApplication.cleanup();
    }
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
    Logger.logInfo('Загрузка документов из директории ./sources');
    const loader = new DirectoryLoader(
      './sources',
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
        if (
          !CLIConfig.REINDEX &&
          (await EmbeddingsDB.chunkExists(hash, doc.metadata.source))
        ) {
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
        await Database.getInstance().query(
          `
          INSERT INTO new_document_embeddings
            (content, embedding, metadata, "contentHash")
          VALUES ($1, $2, $3, $4)
          `,
          [
            chunk.pageContent,
            `[${vector.join(',')}]`,
            chunk.metadata ?? {},
            hash,
          ],
        );
        totalChunks++;
        Logger.logInfo('Эмбеддинг сохранен', {
          chunkNumber: totalChunks,
          hash: hash.substring(0, 8),
        });
      }
    }
    Logger.logInfo('Процесс вставки эмбеддингов завершен', { totalChunks });
  }

  private static async processChat({
    embeddings,
    llm,
    provider,
    appConfig,
  }: {
    embeddings: OpenAIEmbeddings | OllamaEmbeddings;
    llm:
      | ChatOpenAI
      | ChatOllama
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    provider: string;
    appConfig: AppConfig;
  }) {
    // === Chat ===
    Logger.logInfo('Начало процесса чата');
    const userId = 'user123';
    const dialogId = await DialogManager.createDialog(userId);
    const question = 'например?';

    Logger.logInfo('Получение истории диалога', { dialogId });
    const history = await DialogManager.getDialogHistory(dialogId);

    Logger.logInfo('Создание эмбеддинга для вопроса', {
      questionLength: question.length,
    });

    Logger.logInfo('Начало обработки чата', { question });

    // Transform the question using the QuestionTransformer to categorize and optimize it
    const categorizedQuestion = await QuestionTransformer.transformQuestion({
      dialogId,
      historyId: undefined,
      question,
      llm,
      history,
      provider,
    });
    const processedQuestion = categorizedQuestion.transformedQuestion;

    Logger.logInfo('Question transformation completed', {
      original: question,
      transformed: processedQuestion,
      category: categorizedQuestion.category,
      sourceFilter: categorizedQuestion.sourceFilter,
    });

    const qEmbedding = await embeddings.embedQuery(
      TextHelpers.normalizeTextMy(processedQuestion),
    );

    Logger.logInfo('Поиск похожих документов', {
      embeddingLength: qEmbedding.length,
    });

    /**
     * GLOBAL MODE
     */
    // Use the transformed question and apply category-based filtering if available
    let docsWithMeta;
    if (categorizedQuestion.sourceFilter) {
      docsWithMeta = await RAGSearcher.similaritySearch({
        queryEmbedding: qEmbedding,
        limit: 10,
        filterBySource: categorizedQuestion.sourceFilter.pattern,
        filterBySourceRule: categorizedQuestion.sourceFilter.rule,
      });
    } else {
      docsWithMeta = await RAGSearcher.similaritySearch({
        queryEmbedding: qEmbedding,
        limit: 10,
        filterBySource: '%/telegram/%',
        filterBySourceRule: 'not ilike',
      });
    }

    Logger.logInfo('[GLOBAL] Отправка запроса к LLM', {
      contextDocsCount: docsWithMeta.length,
      historyLength: history.length,
    });

    const globalResult = await LLMChunkProcessor.askLLMChunked({
      llm,
      dialogId,
      history,
      contextDocs: docsWithMeta,
      question: processedQuestion,
      category: categorizedQuestion.category,
      frendlyNotFound: false,
      provider,
      // todo: нужно докинуть поле
      chatChunkSize: 8000,
      parallelThreads: appConfig.parallelThreads,
      detectedCategory: categorizedQuestion.detectedCategory,
    });
    let answer = globalResult.response;
    let telegramResult:
      | { response: string | null; answerDocumentId?: number }
      | undefined;

    Logger.logInfo('[GLOBAL] Получен ответ от LLM', {
      answerLength: answer?.length,
    });

    if (!answer) {
      /**
       * TELEGRAM MODE
       */
      // For telegram mode, if we have a specific category filter that's not telegram,
      // we should use the original telegram filter, otherwise use the category filter if it's telegram
      if (
        categorizedQuestion.sourceFilter &&
        categorizedQuestion.sourceFilter.pattern.includes('/telegram/')
      ) {
        docsWithMeta = await RAGSearcher.similaritySearch({
          queryEmbedding: qEmbedding,
          limit: 20,
          filterBySource: categorizedQuestion.sourceFilter.pattern,
          filterBySourceRule: categorizedQuestion.sourceFilter.rule,
        });
      } else {
        docsWithMeta = await RAGSearcher.similaritySearch({
          queryEmbedding: qEmbedding,
          limit: 20,
          filterBySource: '%/telegram/%',
          filterBySourceRule: 'ilike',
        });
      }
      Logger.logInfo('[TELEGRAM] Отправка запроса к LLM', {
        contextDocsCount: docsWithMeta.length,
        historyLength: history.length,
      });

      const telegramResult = await LLMChunkProcessor.askLLMChunked({
        llm,
        dialogId,
        history,
        contextDocs: docsWithMeta,
        question: processedQuestion,
        category: categorizedQuestion.category,
        provider,
        // todo: нужно докинуть поле
        chatChunkSize: 8000,
        parallelThreads: appConfig.parallelThreads,
        detectedCategory: categorizedQuestion.detectedCategory,
      });
      answer = telegramResult.response;
      Logger.logInfo('[TELEGRAM] Получен ответ от LLM', {
        answerLength: answer?.length,
      });
    }

    /**
     * TELEGRAM AND GLOBAL MODE NOT FOUND
     */
    if (!answer) {
      const ret = await LLMChunkProcessor.frendlyNotFound({
        category: Category.none,
        question,
        llm,
        provider,
        detectedCategory: categorizedQuestion.detectedCategory,
      });
      answer = ret.foundText;
    }

    // Prepare document info for logging
    const documentInfo = docsWithMeta
      .map((doc, index) => ({
        [`doc_${index + 1}`]: `${doc.source}:${doc.fromLine}-${doc.toLine}`,
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    Logger.logInfo('Получен ответ от LLM', {
      answerLength: answer?.length,
      documentCount: docsWithMeta.length,
      ...documentInfo,
    });

    ///

    Logger.logInfo('Сохранение сообщения', { dialogId, userId });
    // For CLI application, we can still pass the document metadata if available
    const selectedDocumentIds = docsWithMeta.map((doc) => doc.id);
    let answerDocumentId: number | undefined;
    if (globalResult.answerDocumentId) {
      answerDocumentId = globalResult.answerDocumentId;
    } else if (telegramResult && telegramResult.answerDocumentId) {
      answerDocumentId = telegramResult.answerDocumentId;
    }
    const result = await DialogManager.saveMessage({
      dialogId,
      userId,
      question,
      answer,
      ignored: false,
      selectedDocumentIds,
      answerDocumentId,
    });

    if (await DialogSummary.shouldSummarize(dialogId)) {
      Logger.logInfo('Диалог требует суммаризации', { dialogId });
      // Run summarization in background to avoid blocking user request
      SummarizationService.queueSummarizationWithoutBlocking({
        dialogId: result.dialogId,
        llm,
        provider,
        historyId: result.historyId,
      });
    } else {
      Logger.logInfo('Суммаризация не требуется', { dialogId });
    }

    Logger.logInfo('Ответ пользователю сформирован');
    console.log('\n🧠 Ответ:\n', answer);
    console.log('\n📂 Источники:');
    docsWithMeta.forEach((d, i) =>
      console.log(`  ${i + 1}) ${d.source}:${d.fromLine}-${d.toLine}`),
    );
  }

  private static async cleanup() {
    Database.getInstance().close();
    Logger.logInfo('Соединение с БД закрыто');
  }
}
