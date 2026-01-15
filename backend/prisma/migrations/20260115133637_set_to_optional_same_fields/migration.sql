-- AlterTable
ALTER TABLE "ChatMessageDocumentEmbedding" ALTER COLUMN "chatHistoryId" DROP NOT NULL,
ALTER COLUMN "embeddingDocumentId" DROP NOT NULL;
