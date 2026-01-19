/*
  Warnings:

  - You are about to drop the column `embeddingModelId` on the `ChatDocumentEmbedding` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatDocumentEmbedding" DROP CONSTRAINT "FK_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING_MODEL_ID";

-- DropForeignKey
ALTER TABLE "ChatLlmModel" DROP CONSTRAINT "FK_CHAT_LLM_MODELS__CHAT_LLM_REQUEST_ID";

-- DropIndex
DROP INDEX "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING_MODEL_ID";

-- DropIndex
DROP INDEX "IDX_CHAT_LLM_REQUESTS__MODEL";

-- AlterTable
ALTER TABLE "ChatDocumentEmbedding" DROP COLUMN "embeddingModelId",
ADD COLUMN     "model" VARCHAR(100),
ADD COLUMN     "provider" VARCHAR(50);
