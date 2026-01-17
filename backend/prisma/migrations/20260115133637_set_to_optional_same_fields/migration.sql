-- AlterTable
ALTER TABLE "ChatMessageDocumentEmbedding" ALTER COLUMN "messageId" DROP NOT NULL,
ALTER COLUMN "embeddingDocumentId" DROP NOT NULL;
