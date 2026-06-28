-- Full-text search column for BM25-style keyword retrieval
ALTER TABLE "ChatDocumentEmbedding"
ADD COLUMN IF NOT EXISTS "contentSearch" tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('russian', coalesce(content, '')), 'A') ||
  setweight(to_tsvector('simple', lower(coalesce(content, ''))), 'B')
) STORED;

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__CONTENT_SEARCH"
  ON "ChatDocumentEmbedding" USING gin ("contentSearch");
