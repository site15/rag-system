# RAG System Call Chain Analysis and Optimization Targets

## Detailed Call Chain Breakdown

### Primary User Query Processing Chain

```
FlowController.sendMessage() 
├── MessageProcessor.processMessage()
│   ├── QuestionTransformer.transformQuestion() [BOTTLENECK #1]
│   │   ├── detectCategory() → LLM call #1 [~1-2s]
│   │   ├── transformWithLLM() → LLM call #2 [~1-3s] 
│   │   ├── transformToEmbeddedWithLLM(action) → LLM call #3 [~1-2s]
│   │   └── transformToEmbeddedWithLLM(entity) → LLM call #4 [~1-2s]
│   ├── RAGSearcher.similaritySearch() [BOTTLENECK #3]
│   │   └── Complex SQL with 10 distance calculations [~1-3s]
│   └── LLMChunkProcessor.frendlyFound()/frendlyNotFound() → LLM call #5 [~1-3s]
└── Total: 5-6 LLM calls, 6-18 seconds
```

### Document Ingestion Chain

```
RAGApplication.processDocuments()
├── loadDocuments() [~1-2s]
├── embedDocuments() [BOTTLENECK #4]
│   ├── For each document chunk:
│   │   ├── embeddings.embedQuery() [~0.5-1s each]
│   │   ├── Prisma insert operation [~0.1-0.3s each]
│   │   └── Retry logic (if needed)
│   └── Sequential processing: O(n*m) where n=docs, m=chunks/doc
└── fillGraphEmbedDocuments() [BOTTLENECK #2]
    ├── For each unprocessed document:
    │   ├── LLM invoke for metadata extraction [~1-3s each]
    │   ├── embeddings.embedQuery() for graph embedding [~0.5-1s]
    │   └── Prisma update operation [~0.1s]
    └── Sequential processing: O(n) where n=documents
```

## Specific Optimization Targets

### Target 1: LLM Call Parallelization in QuestionTransformer

**File**: `src/llm/services/questionTransformer.ts`
**Lines**: 215-263, 265-337, 338-418

**Current Pattern**:
```typescript
// SLOW: Sequential execution (~6-10 seconds)
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

**Optimized Pattern**:
```typescript
// FAST: Parallel execution (~1-3 seconds)
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

// Post-process results
const category = getCategoryByDetectedCategory(detectCategoryResult.category);
```

### Target 2: Batch Processing in Document Embedding

**File**: `src/llm/ragApplication.ts`
**Lines**: 132-272

**Current Pattern**:
```typescript
// SLOW: Document-by-document processing
for (const doc of docs) {
  const chunks = RAGSearcher.splitTextIntoChunksWithMeta(doc.pageContent, 1600);
  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    // Process each chunk sequentially
    const vector = await embeddings.embedQuery(normalized);
    // Database insert
    await PrismaService.instance.$executeRaw`INSERT...`;
  }
}
```

**Optimized Pattern**:
```typescript
// FAST: Batch processing with concurrency control
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

// Process documents in parallel batches
const batchPromises = docs.map(async (doc) => {
  const chunks = RAGSearcher.splitTextIntoChunksWithMeta(doc.pageContent, 1600);
  const batchResults = await processChunkBatch(chunks, doc);
  
  // Bulk insert for better DB performance
  const insertQueries = batchResults.map(({ chunk, vector, doc }) => 
    PrismaService.instance.$executeRaw`
      INSERT INTO "ChatDocumentEmbedding" (...) VALUES (...)
    `
  );
  await Promise.all(insertQueries);
});

await Promise.all(batchPromises);
```

### Target 3: Efficient Similarity Search

**File**: `src/llm/ragSearcher.ts`
**Lines**: 57-124

**Current Pattern**:
```typescript
// SLOW: Calculates all embedding dimensions
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

**Optimized Pattern**:
```typescript
// FAST: Single dimension with proper indexing
private static getActiveEmbeddingColumn(): string {
  const config = ConfigManager.getAppConfig();
  const dim = config.embeddingDimension || 768; // Default to 768
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

  // ... rest of processing
}
```

### Target 4: Graph Content Processing Optimization

**File**: `src/llm/ragApplication.ts`
**Lines**: 275-519

**Current Pattern**:
```typescript
// SLOW: Sequential document processing
for (const doc of documents) {
  try {
    const prompt = Mustache.render(graphPromptTemplate, { content: doc.content });
    const result = await llm.invoke(prompt); // ~1-3s
    const response = LLMLogger.getResponseString(result);
    const graphVector = await embeddingModel.embedQuery(response); // ~0.5-1s
    // Database update
    await PrismaService.instance.$executeRaw`UPDATE...`;
  } catch (error) {
    errors.push(error.message);
    continue;
  }
}
```

**Optimized Pattern**:
```typescript
// FAST: Batch with error isolation and progress tracking
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

// Process in chunks with progress reporting
const CHUNK_SIZE = 20;
for (let i = 0; i < documents.length; i += CHUNK_SIZE) {
  const chunk = documents.slice(i, i + CHUNK_SIZE);
  const results = await processDocumentBatch(chunk);
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  Logger.logInfo('Batch processed', {
    processed: successful.length,
    failed: failed.length,
    totalProgress: i + chunk.length
  });
}
```

## Database Optimization Queries

### Index Creation for Better Performance

```sql
-- Drop redundant indexes and create optimized ones
DROP INDEX IF EXISTS idx_embedding_all_dimensions;

-- Create targeted indexes based on actual usage
CREATE INDEX CONCURRENTLY idx_embedding_768_active 
ON "ChatDocumentEmbedding" 
USING ivfflat ("embedding768" vector_cosine_ops)
WITH (lists = 100);

CREATE INDEX CONCURRENTLY idx_graph_embedding_768_active
ON "ChatDocumentEmbedding" 
USING ivfflat ("graphEmbedding768" vector_cosine_ops)
WITH (lists = 50);

-- Add composite indexes for common filter patterns
CREATE INDEX CONCURRENTLY idx_metadata_source_created 
ON "ChatDocumentEmbedding" ((metadata->>'source'), "createdAt");
```

### Query Plan Analysis Commands

```sql
-- Analyze current query performance
EXPLAIN (ANALYZE, BUFFERS) 
SELECT id, content, "embedding768" <-> '[0.1,0.2,...]' AS distance
FROM "ChatDocumentEmbedding" 
ORDER BY distance 
LIMIT 10;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes 
WHERE tablename = 'ChatDocumentEmbedding';
```

## Configuration Recommendations

### Environment Variables for Optimization

```bash
# LLM Configuration
LLM_CONCURRENCY_LIMIT=4
LLM_TIMEOUT_SECONDS=30
LLM_RETRY_ATTEMPTS=2

# Database Configuration  
DB_CONNECTION_POOL_MIN=5
DB_CONNECTION_POOL_MAX=20
DB_QUERY_TIMEOUT=5000

# Processing Configuration
BATCH_PROCESSING_SIZE=10
CHUNK_SIZE_BYTES=1600
EMBEDDING_DIMENSION=768

# Caching Configuration
CACHE_TTL_SECONDS=300
CACHE_MAX_ENTRIES=1000
```

## Monitoring Endpoints to Add

```typescript
// Add performance monitoring endpoints
@Controller('monitoring')
export class MonitoringController {
  @Get('performance')
  async getPerformanceMetrics() {
    return {
      avgResponseTime: await this.metrics.getAvgResponseTime(),
      llmCallCount: await this.metrics.getLLMCallCount(),
      cacheHitRate: await this.metrics.getCacheHitRate(),
      dbQueryStats: await this.metrics.getDBQueryStats(),
      processingQueueLength: await this.metrics.getQueueLength()
    };
  }
  
  @Get('health')
  async healthCheck() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: await this.db.ping(),
        llm: await this.llm.healthCheck(),
        cache: await this.cache.ping()
      }
    };
  }
}
```

## Testing Strategy for Optimizations

### Performance Benchmark Script

```typescript
// benchmark.ts
async function runBenchmark() {
  const testQueries = [
    "What is your experience with React?",
    "How do you implement authentication?",
    "Tell me about your projects",
    "What technologies do you use?"
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

This analysis provides concrete targets for optimization with specific code patterns and measurable improvements.