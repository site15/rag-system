/*
  Warnings:

  - You are about to drop the column `requestId` on the `ChatLlmModel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lastRequestId]` on the table `ChatLlmModel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ChatLlmModel" DROP CONSTRAINT "FK_CHAT_LLM_MODELS__CHAT_LLM_REQUEST_ID";

-- DropIndex
DROP INDEX "ChatLlmModel_requestId_key";

-- DropIndex
DROP INDEX "IDX_CHAT_LLM_MODELS__REQUEST_ID";

-- DropIndex
DROP INDEX "IDX_CHAT_LLM_MODELS__STATUS_REQUEST_ID";

-- AlterTable
ALTER TABLE "ChatLlmModel" DROP COLUMN "requestId",
ADD COLUMN     "lastRequestId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "ChatLlmModel_lastRequestId_key" ON "ChatLlmModel"("lastRequestId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_MODELS__REQUEST_ID" ON "ChatLlmModel"("lastRequestId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_MODELS__STATUS_REQUEST_ID" ON "ChatLlmModel"("status", "lastRequestId");

-- AddForeignKey
ALTER TABLE "ChatLlmModel" ADD CONSTRAINT "FK_CHAT_LLM_MODELS__CHAT_LLM_REQUEST_ID" FOREIGN KEY ("lastRequestId") REFERENCES "ChatLlmRequest"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
