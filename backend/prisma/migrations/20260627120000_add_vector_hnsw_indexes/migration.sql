-- HNSW indexes for vector similarity search (cosine distance)
-- pgvector HNSW/IVFFlat on `vector` type: max 2000 dimensions.
-- For 3072-dim columns use halfvec cast (supports up to 4000).

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING384_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("embedding384" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING768_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("embedding768" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING1024_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("embedding1024" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING1536_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("embedding1536" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING3072_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw (("embedding3072"::halfvec(3072)) halfvec_cosine_ops)
  WHERE "embedding3072" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING384_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("graphEmbedding384" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING768_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("graphEmbedding768" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING1024_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("graphEmbedding1024" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING1536_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw ("graphEmbedding1536" vector_cosine_ops);

CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING3072_HNSW"
  ON "ChatDocumentEmbedding" USING hnsw (("graphEmbedding3072"::halfvec(3072)) halfvec_cosine_ops)
  WHERE "graphEmbedding3072" IS NOT NULL;

-- B-tree index for metadata source filtering
CREATE INDEX IF NOT EXISTS "IDX_CHAT_DOCUMENT_EMBEDDINGS__METADATA_SOURCE"
  ON "ChatDocumentEmbedding" ((metadata ->> 'source'));
