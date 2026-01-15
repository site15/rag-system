/*
  Warnings:

  - You are about to drop the `EmbeddingModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatDocumentEmbedding" DROP CONSTRAINT "FK_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING_MODEL_ID";

-- DropTable
DROP TABLE "EmbeddingModel";

-- CreateTable
CREATE TABLE "ChatEmbeddingModel" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "provider" VARCHAR(50) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "dimension" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_CHAT_EMBEDDING_MODELS" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_CHAT_EMBEDDING_MODELS__PROVIDER" ON "ChatEmbeddingModel"("provider");

-- CreateIndex
CREATE INDEX "IDX_CHAT_EMBEDDING_MODELS__IS_ACTIVE" ON "ChatEmbeddingModel"("isActive");

-- CreateIndex
CREATE INDEX "IDX_CHAT_EMBEDDING_MODELS__PROVIDER_MODEL" ON "ChatEmbeddingModel"("provider", "model");

-- CreateIndex
CREATE UNIQUE INDEX "UK_CHAT_EMBEDDING_MODELS__DIMENSION" ON "ChatEmbeddingModel"("dimension");

-- AddForeignKey
ALTER TABLE "ChatDocumentEmbedding" ADD CONSTRAINT "FK_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING_MODEL_ID" FOREIGN KEY ("embeddingModelId") REFERENCES "ChatEmbeddingModel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
