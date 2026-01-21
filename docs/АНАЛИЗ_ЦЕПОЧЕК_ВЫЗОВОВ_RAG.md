# Анализ цепочек вызовов системы RAG и цели оптимизации

## Детальный разбор цепочек вызовов

### Основная цепочка обработки пользовательских запросов

```
FlowController.sendMessage() 
├── MessageProcessor.processMessage()
│   ├── QuestionTransformer.transformQuestion() [УЗКОЕ МЕСТО #1]
│   │   ├── detectCategory() → вызов LLM #1 [~1-2с]
│   │   ├── transformWithLLM() → вызов LLM #2 [~1-3с] 
│   │   ├── transformToEmbeddedWithLLM(action) → вызов LLM #3 [~1-2с]
│   │   └── transformToEmbeddedWithLLM(entity) → вызов LLM #4 [~1-2с]
│   ├── RAGSearcher.similaritySearch() [УЗКОЕ МЕСТО #3]
│   │   └── Сложный SQL с 10 расчетами расстояний [~1-3с]
│   └── LLMChunkProcessor.frendlyFound()/frendlyNotFound() → вызов LLM #5 [~1-3с]
└── Итого: 5-6 вызовов LLM, 6-18 секунд
```

### Цепочка приема документов

```
RAGApplication.processDocuments()
├── loadDocuments() [~1-2с]
├── embedDocuments() [УЗКОЕ МЕСТО #4]
│   ├── Для каждого чанка документа:
│   │   ├── embeddings.embedQuery() [~0.5-1с каждый]
│   │   ├── Операция вставки Prisma [~0.1-0.3с каждая]
│   │   └── Логика повторных попыток (при необходимости)
│   └── Последовательная обработка: O(n*m) где n=документы, m=чанки/документ
└── fillGraphEmbedDocuments() [УЗКОЕ МЕСТО #2]
    ├── Для каждого необработанного документа:
    │   ├── Вызов LLM для извлечения метаданных [~1-3с каждый]
    │   ├── embeddings.embedQuery() для графового эмбеддинга [~0.5-1с]
    │   └── Операция обновления Prisma [~0.1с]
    └── Последовательная обработка: O(n) где n=документы
```

## Конкретные цели оптимизации

### Цель 1: Параллелизация вызовов LLM в QuestionTransformer

**Файл**: `src/llm/services/questionTransformer.ts`
**Строки**: 215-263, 265-337, 338-418

**Текущий паттерн**:
```typescript
// МЕДЛЕННО: Последовательное выполнение (~6-10 секунд)
const detectCategoryResult = await this.detectCategory({...});
let category = getCategoryByDetectedCategory(detectCategoryResult.category);
const isSelfContained = this.isQuestionSelfContained(question, history);
const transformedQuestion = await this.transformWithLLM({...});
const transformedEmbeddedActionBased = await this.transformToEmbeddedWithLLM({
  type: 'action-based', ...
});
const transformedEmbeddedEntityBased = await this.transformToEmbeddedWithLLM({
  type: 'entity-based', ...
});
```

**Оптимизированный паттерн**:
```typescript
// БЫСТРО: Параллельное выполнение (~1-3 секунды)
const [
  detectCategoryResult,
  transformedQuestion,
  transformedEmbeddedActionBased,
  transformedEmbeddedEntityBased
] = await Promise.all([
  this.detectCategory({...}),
  (async () => {
    const isSelfContained = this.isQuestionSelfContained(question, history);
    return await this.transformWithLLM({
      question, llm, category: Category.none, history, isSelfContained, ...
    });
  })(),
  this.transformToEmbeddedWithLLM({ type: 'action-based', ... }),
  this.transformToEmbeddedWithLLM({ type: 'entity-based', ... })
]);

// Постобработка результатов
const category = getCategoryByDetectedCategory(detectCategoryResult.category);
```

### Цель 2: Пакетная обработка при встраивании документов

**Файл**: `src/llm/ragApplication.ts`
**Строки**: 132-272

**Текущий паттерн**:
```typescript
// МЕДЛЕННО: Обработка документ за документом
for (const doc of docs) {
  const chunks = RAGSearcher.splitTextIntoChunksWithMeta(doc.pageContent, 1600);
  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    // Последовательная обработка каждого чанка
    const vector = await embeddings.embedQuery(normalized);
    // Вставка в базу данных
    await PrismaService.instance.$executeRaw`INSERT...`;
  }
}
```

**Оптимизированный паттерн**:
```typescript
// БЫСТРО: Пакетная обработка с управлением конкурентностью
const BATCH_SIZE = 5;
const semaphore = new Semaphore(BATCH_SIZE);

const processChunkBatch = async (chunks: Chunk[], doc: Document) => {
  return Promise.all(chunks.map(async (chunk, index) => {
    return semaphore.use(async () => {
      const vector = await embeddings.embedQuery(chunk.content);
      return { chunk, vector, doc, index };
    });
  }));
};

// Параллельная обработка документов партиями
const batchPromises = docs.map(async (doc) => {
  const chunks = RAGSearcher.splitTextIntoChunksWithMeta(doc.pageContent, 1600);
  const batchResults = await processChunkBatch(chunks, doc);
  
  // Массовая вставка для лучшей производительности БД
  const insertQueries = batchResults.map(({ chunk, vector, doc }) => 
    PrismaService.instance.$executeRaw`
      INSERT INTO "ChatDocumentEmbedding" (...) VALUES (...)
    `
  );
  await Promise.all(insertQueries);
});

await Promise.all(batchPromises);
```

### Цель 3: Эффективный поиск сходства

**Файл**: `src/llm/ragSearcher.ts`
**Строки**: 57-124

**Текущий паттерн**:
```typescript
// МЕДЛЕННО: Рассчитывает все размерности эмбеддингов
const r = await PrismaService.instance.$queryRawUnsafe(`
  WITH candidates AS (
    SELECT id, content, "graphContent", metadata,
           "embedding384" <-> '[...]' AS "distance384",
           "embedding768" <-> '[...]' AS "distance768",
           "embedding1024" <-> '[...]' AS "distance1024",
           "embedding1536" <-> '[...]' AS "distance1536",
           "embedding3072" <-> '[...]' AS "distance3072",
           "graphEmbedding384" <-> '[...]' AS "graphDistance384",
           "graphEmbedding768" <-> '[...]' AS "graphDistance768",
           "graphEmbedding1024" <-> '[...]' AS "graphDistance1024",
           "graphEmbedding1536" <-> '[...]' AS "graphDistance1536",
           "graphEmbedding3072" <-> '[...]' AS "graphDistance3072"
    FROM "ChatDocumentEmbedding"
    ORDER BY distance384, distance768, distance1024, distance1536, distance3072,
             graphDistance384, graphDistance768, graphDistance1024, graphDistance1536, graphDistance3072
    LIMIT ${limit} * 5
  )
`);
```

**Оптимизированный паттерн**:
```typescript
// БЫСТРО: Одна размерность с правильным индексированием
private static getActiveEmbeddingColumn(): string {
  const config = ConfigManager.getAppConfig();
  const dim = config.embeddingDimension || 768; // По умолчанию 768
  return `"embedding${dim}"`;
}

public static async similaritySearch({
  queryEmbedding,
  limit = 5,
  filterBySource,
}: {
  queryEmbedding: number[];
  limit?: number;
  filterBySource?: string;
}): Promise<DocWithMetadataAndId[]> {
  const embeddingColumn = this.getActiveEmbeddingColumn();
  
  const r = await PrismaService.instance.$queryRawUnsafe(`
    SELECT id, content, "graphContent", metadata,
           ${embeddingColumn} <-> $1 AS distance
    FROM "ChatDocumentEmbedding"
    WHERE ($2::text IS NULL OR metadata ->> 'source' ILIKE $2)
    ORDER BY distance
    LIMIT $3
  `, 
  `[${queryEmbedding.join(',')}]`,
  filterBySource,
  limit
  );

  // ... остальная обработка
}
```

### Цель 4: Оптимизация обработки графового контента

**Файл**: `src/llm/ragApplication.ts`
**Строки**: 275-519

**Текущий паттерн**:
```typescript
// МЕДЛЕННО: Последовательная обработка документов
for (const doc of documents) {
  try {
    const prompt = Mustache.render(graphPromptTemplate, { content: doc.content });
    const result = await llm.invoke(prompt); // ~1-3с
    const response = LLMLogger.getResponseString(result);
    const graphVector = await embeddingModel.embedQuery(response); // ~0.5-1с
    // Обновление базы данных
    await PrismaService.instance.$executeRaw`UPDATE...`;
  } catch (error) {
    errors.push(error.message);
    continue;
  }
}
```

**Оптимизированный паттерн**:
```typescript
// БЫСТРО: Пакетная обработка с изоляцией ошибок и отслеживанием прогресса
const CONCURRENT_DOCUMENTS = 3;
const semaphore = new Semaphore(CONCURRENT_DOCUMENTS);

const processDocumentBatch = async (docs: Document[]) => {
  const promises = docs.map(doc => 
    semaphore.use(async () => {
      try {
        const prompt = Mustache.render(graphPromptTemplate, { content: doc.content });
        const [result, response] = await Promise.all([
          llm.invoke(prompt),
          (async () => {
            const res = await llm.invoke(prompt);
            return LLMLogger.getResponseString(res);
          })()
        ]);
        
        const graphVector = await embeddingModel.embedQuery(response);
        await this.updateDocumentGraphContent(doc.id, response, graphVector);
        return { success: true, docId: doc.id };
      } catch (error) {
        return { success: false, docId: doc.id, error: error.message };
      }
    })
  );
  
  return Promise.all(promises);
};

// Обработка партиями с отчетом о прогрессе
const CHUNK_SIZE = 20;
for (let i = 0; i < documents.length; i += CHUNK_SIZE) {
  const chunk = documents.slice(i, i + CHUNK_SIZE);
  const results = await processDocumentBatch(chunk);
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  Logger.logInfo('Партия обработана', {
    processed: successful.length,
    failed: failed.length,
    totalProgress: i + chunk.length
  });
}
```

## Оптимизации запросов к базе данных

### Создание индексов для лучшей производительности

```sql
-- Удалить избыточные индексы и создать оптимизированные
DROP INDEX IF EXISTS idx_embedding_all_dimensions;

-- Создать целевые индексы на основе фактического использования
CREATE INDEX CONCURRENTLY idx_embedding_768_active 
ON "ChatDocumentEmbedding" 
USING ivfflat ("embedding768" vector_cosine_ops)
WITH (lists = 100);

CREATE INDEX CONCURRENTLY idx_graph_embedding_768_active
ON "ChatDocumentEmbedding" 
USING ivfflat ("graphEmbedding768" vector_cosine_ops)
WITH (lists = 50);

-- Добавить составные индексы для распространенных паттернов фильтрации
CREATE INDEX CONCURRENTLY idx_metadata_source_created 
ON "ChatDocumentEmbedding" ((metadata->>'source'), "createdAt");
```

### Команды анализа плана запросов

```sql
-- Анализ текущей производительности запросов
EXPLAIN (ANALYZE, BUFFERS) 
SELECT id, content, "embedding768" <-> '[0.1,0.2,...]' AS distance
FROM "ChatDocumentEmbedding" 
ORDER BY distance 
LIMIT 10;

-- Проверка использования индексов
SELECT schemaname, tablename, indexname, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes 
WHERE tablename = 'ChatDocumentEmbedding';
```

## Рекомендации по конфигурации

### Переменные окружения для оптимизации

```bash
# Конфигурация LLM
LLM_CONCURRENCY_LIMIT=4
LLM_TIMEOUT_SECONDS=30
LLM_RETRY_ATTEMPTS=2

# Конфигурация базы данных  
DB_CONNECTION_POOL_MIN=5
DB_CONNECTION_POOL_MAX=20
DB_QUERY_TIMEOUT=5000

# Конфигурация обработки
BATCH_PROCESSING_SIZE=10
CHUNK_SIZE_BYTES=1600
EMBEDDING_DIMENSION=768

# Конфигурация кэширования
CACHE_TTL_SECONDS=300
CACHE_MAX_ENTRIES=1000
```

## Тестирование оптимизаций

### Скрипт тестирования производительности

```typescript
// benchmark.ts
async function runBenchmark() {
  const testQueries = [
    "Каков ваш опыт работы с React?",
    "Как реализовать аутентификацию?",
    "Расскажите о ваших проектах",
    "Какие технологии вы используете?"
  ];

  const results = [];
  
  for (const query of testQueries) {
    const startTime = Date.now();
    try {
      const response = await flowController.sendMessage({
        message: query,
        dialogId: null
      });
      const endTime = Date.now();
      
      results.push({
        query,
        responseTime: endTime - startTime,
        responseLength: response.answer.length,
        success: true
      });
    } catch (error) {
      results.push({
        query,
        responseTime: Date.now() - startTime,
        error: error.message,
        success: false
      });
    }
  }
  
  console.table(results);
  return results;
}
```

Этот анализ предоставляет конкретные цели для оптимизации с конкретными паттернами кода и измеримыми улучшениями.