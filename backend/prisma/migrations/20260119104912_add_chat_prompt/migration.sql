-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "deletedAt" TIMESTAMP(6),
ADD COLUMN     "trace" JSONB;

-- CreateTable
CREATE TABLE "ChatPrompt" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "key" VARCHAR(255),
    "prompt" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_CHAT_PROMPTS" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_CHAT_PROMPTS__KEY" ON "ChatPrompt"("key");

-- CreateIndex
CREATE INDEX "IDX_CHAT_PROMPTS__PROMPT" ON "ChatPrompt"("prompt");
