/*
  Warnings:

  - You are about to alter the column `relevanceScore` on the `ChatMessageDocumentEmbedding` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(3,2)`.

*/
-- AlterTable
ALTER TABLE "ChatMessageDocumentEmbedding" ALTER COLUMN "relevanceScore" SET DATA TYPE DECIMAL(3,2);
