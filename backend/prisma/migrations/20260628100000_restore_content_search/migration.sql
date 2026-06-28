-- Restore full-text search column dropped by change_decimal_to_float migration
ALTER TABLE "ChatDocumentEmbedding"
ADD COLUMN IF NOT EXISTS "contentSearch" tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('russian', coalesce(content, '')), 'A') ||
  setweight(to_tsvector('simple', lower(coalesce(content, ''))), 'B')
) STORED;

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__CONTENT_SEARCH"
  ON "ChatDocumentEmbedding" USING gin ("contentSearch");

-- Restore HNSW indexes dropped by change_decimal_to_float migration
CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING384_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("embedding384" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING768_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("embedding768" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING1024_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("embedding1024" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING1536_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("embedding1536" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING384_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("graphEmbedding384" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING768_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("graphEmbedding768" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING1024_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("graphEmbedding1024" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING1536_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("graphEmbedding1536" vector_cosine_ops);
