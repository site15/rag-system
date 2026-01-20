-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "answerSentAt" TIMESTAMP(6),
ADD COLUMN     "isProcessing" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "questionReceivedAt" TIMESTAMP(6);
