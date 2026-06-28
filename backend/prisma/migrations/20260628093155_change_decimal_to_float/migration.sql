/*
  Warnings:

  - You are about to drop the column `contentSearch` on the `ChatDocumentEmbedding` table. All the data in the column will be lost.
  - You are about to alter the column `temperature` on the `ChatLlmModel` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `DoublePrecision`.
  - You are about to alter the column `temperature` on the `ChatLlmRequest` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `DoublePrecision`.
  - You are about to alter the column `temperature` on the `ChatMessage` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `DoublePrecision`.

*/
-- DropIndex
DROP INDEX "IDX_CHAT_DOCUMENT_EMBEDDINGS__CONTENT_SEARCH";

-- DropIndex
DROP INDEX "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING1024_HNSW";

-- DropIndex
DROP INDEX "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING1536_HNSW";

-- DropIndex
DROP INDEX "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING384_HNSW";

-- DropIndex
DROP INDEX "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING768_HNSW";

-- DropIndex
DROP INDEX "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING1024_HNSW";

-- DropIndex
DROP INDEX "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING1536_HNSW";

-- DropIndex
DROP INDEX "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING384_HNSW";

-- DropIndex
DROP INDEX "IDX_CHAT_DOCUMENT_EMBEDDINGS__GRAPH_EMBEDDING768_HNSW";

-- AlterTable
ALTER TABLE "ChatDocumentEmbedding" DROP COLUMN "contentSearch";

-- AlterTable
ALTER TABLE "ChatLlmModel" ALTER COLUMN "temperature" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ChatLlmRequest" ALTER COLUMN "temperature" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ChatMessage" ALTER COLUMN "temperature" SET DATA TYPE DOUBLE PRECISION;
