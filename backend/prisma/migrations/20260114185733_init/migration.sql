CREATE EXTENSION IF NOT EXISTS vector;

-- CreateTable
CREATE TABLE "AuthUser" (
    "id" UUID NOT NULL,
    "anonymousId" TEXT,
    "supabaseUserId" TEXT,
    "supabaseUserData" JSONB,
    "isActive" BOOLEAN,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_AUTH_USER" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthSession" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "isActive" BOOLEAN,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_AUTH_SESSION" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatDocumentEmbedding" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "embedding384" VECTOR(384),
    "embedding768" VECTOR(768),
    "embedding1024" VECTOR(1024),
    "embedding1536" VECTOR(1536),
    "embedding3072" VECTOR(3072),
    "metadata" JSONB,
    "contentHash" VARCHAR(64) NOT NULL,
    "embeddingModelId" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_CHAT_DOCUMENT_EMBEDDINGS" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatDialog" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" VARCHAR(255),
    "summary" TEXT,
    "consecutiveFailures" INTEGER NOT NULL DEFAULT 0,
    "isFailed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_CHAT_DIALOGS" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "dialogId" UUID,
    "isFound" BOOLEAN NOT NULL DEFAULT true,
    "category" VARCHAR(50),
    "transformedQuestion" TEXT,
    "transformedEmbeddingQuery" TEXT,
    "provider" VARCHAR(50),
    "model" VARCHAR(100),
    "temperature" DECIMAL(3,2),
    "isGoodResponse" BOOLEAN NOT NULL DEFAULT false,
    "isBadResponse" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_CHAT_MESSAGES" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessageDocumentEmbedding" (
    "id" UUID NOT NULL,
    "chatHistoryId" UUID NOT NULL,
    "embeddingDocumentId" UUID NOT NULL,
    "isFound" BOOLEAN NOT NULL DEFAULT false,
    "relevanceScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_CHAT_MESSAGE_DOCUMENT_EMBEDDINGS" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatLlmRequest" (
    "id" UUID NOT NULL,
    "request" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "requestLength" INTEGER NOT NULL,
    "responseLength" INTEGER NOT NULL,
    "executionTimeMs" INTEGER NOT NULL,
    "provider" VARCHAR(50) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "temperature" DECIMAL(3,2),
    "success" BOOLEAN NOT NULL DEFAULT true,
    "errorMessage" TEXT,
    "dialogId" UUID,
    "historyId" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_CHAT_LLM_REQUESTS" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatLlmModel" (
    "id" UUID NOT NULL,
    "provider" VARCHAR(50) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "temperature" DECIMAL(3,2),
    "chunkSize" INTEGER,
    "startTime" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMPTZ(6),
    "status" VARCHAR(20) NOT NULL DEFAULT 'running',
    "requestId" UUID,
    "isActive" BOOLEAN,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_CHAT_LLM_MODELS" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmbeddingModel" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "provider" VARCHAR(50) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "dimension" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_EMBEDDING_MODELS" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_AUTH_USER__SUPABASE_USER_ID" ON "AuthUser"("supabaseUserId");

-- CreateIndex
CREATE INDEX "IDX_AUTH_SESSION__USER_ID" ON "AuthSession"("userId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_DOCUMENT_EMBEDDINGS__CONTENT_HASH" ON "ChatDocumentEmbedding"("contentHash");

-- CreateIndex
CREATE INDEX "IDX_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING_MODEL_ID" ON "ChatDocumentEmbedding"("embeddingModelId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_DIALOGS__USER_ID" ON "ChatDialog"("userId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_DIALOGS__CONSECUTIVE_FAILURES" ON "ChatDialog"("consecutiveFailures");

-- CreateIndex
CREATE INDEX "IDX_CHAT_DIALOGS__IS_FAILED" ON "ChatDialog"("isFailed");

-- CreateIndex
CREATE INDEX "IDX_CHAT_MESSAGES__USER_ID" ON "ChatMessage"("userId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_MESSAGES__DIALOG_ID" ON "ChatMessage"("dialogId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_MESSAGES__IS_FOUND" ON "ChatMessage"("isFound");

-- CreateIndex
CREATE INDEX "IDX_CHAT_MESSAGES__CATEGORY" ON "ChatMessage"("category");

-- CreateIndex
CREATE INDEX "IDX_CHAT_MESSAGES__PROVIDER" ON "ChatMessage"("provider");

-- CreateIndex
CREATE INDEX "IDX_CHAT_MESSAGES__MODEL" ON "ChatMessage"("model");

-- CreateIndex
CREATE INDEX "IDX_CHAT_MESSAGES__IS_GOOD_RESPONSE" ON "ChatMessage"("isGoodResponse");

-- CreateIndex
CREATE INDEX "IDX_CHAT_MESSAGES__IS_BAD_RESPONSE" ON "ChatMessage"("isBadResponse");

-- CreateIndex
CREATE INDEX "IDX_CHAT_MESSAGE_DOCUMENT_EMBEDDINGS__CHAT_HISTORY_ID" ON "ChatMessageDocumentEmbedding"("chatHistoryId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_MESSAGE_DOCUMENT_EMBEDDINGS__EMBEDDING_DOCUMENT_ID" ON "ChatMessageDocumentEmbedding"("embeddingDocumentId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_MESSAGE_DOCUMENT_EMBEDDINGS__IS_FOUND" ON "ChatMessageDocumentEmbedding"("isFound");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_REQUESTS__CREATED_AT" ON "ChatLlmRequest"("createdAt");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_REQUESTS__PROVIDER" ON "ChatLlmRequest"("provider");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_REQUESTS__MODEL" ON "ChatLlmRequest"("model");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_REQUESTS__IS_SUCCESS" ON "ChatLlmRequest"("success");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_REQUESTS__PROVIDER_MODEL" ON "ChatLlmRequest"("provider", "model");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_REQUESTS__DIALOG_ID" ON "ChatLlmRequest"("dialogId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_REQUESTS__HISTORY_ID" ON "ChatLlmRequest"("historyId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_REQUESTS__DIALOG_HISTORY" ON "ChatLlmRequest"("dialogId", "historyId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_REQUESTS__CREATED_DIALOG" ON "ChatLlmRequest"("createdAt", "dialogId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatLlmModel_requestId_key" ON "ChatLlmModel"("requestId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_MODELS__PROVIDER" ON "ChatLlmModel"("provider");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_MODELS__MODEL" ON "ChatLlmModel"("model");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_MODELS__STATUS" ON "ChatLlmModel"("status");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_MODELS__START_TIME" ON "ChatLlmModel"("startTime");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_MODELS__END_TIME" ON "ChatLlmModel"("endTime");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_MODELS__PROVIDER_MODEL" ON "ChatLlmModel"("provider", "model");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_MODELS__STATUS_TIME" ON "ChatLlmModel"("status", "startTime");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_MODELS__REQUEST_ID" ON "ChatLlmModel"("requestId");

-- CreateIndex
CREATE INDEX "IDX_CHAT_LLM_MODELS__STATUS_REQUEST_ID" ON "ChatLlmModel"("status", "requestId");

-- CreateIndex
CREATE UNIQUE INDEX "UK_CHAT_LLM_MODELS__CONFIG" ON "ChatLlmModel"("provider", "model", "temperature", "chunkSize");

-- CreateIndex
CREATE INDEX "IDX_EMBEDDING_MODELS__PROVIDER" ON "EmbeddingModel"("provider");

-- CreateIndex
CREATE INDEX "IDX_EMBEDDING_MODELS__IS_ACTIVE" ON "EmbeddingModel"("isActive");

-- CreateIndex
CREATE INDEX "IDX_EMBEDDING_MODELS__PROVIDER_MODEL" ON "EmbeddingModel"("provider", "model");

-- CreateIndex
CREATE UNIQUE INDEX "UK_EMBEDDING_MODELS__DIMENSION" ON "EmbeddingModel"("dimension");

-- AddForeignKey
ALTER TABLE "AuthSession" ADD CONSTRAINT "FK_AUTH_SESSION__USER_ID" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChatDocumentEmbedding" ADD CONSTRAINT "FK_CHAT_DOCUMENT_EMBEDDINGS__EMBEDDING_MODEL_ID" FOREIGN KEY ("embeddingModelId") REFERENCES "EmbeddingModel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChatDialog" ADD CONSTRAINT "FK_CHAT_DIALOGS__USER_ID" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "FK_CHAT_MESSAGES__USER_ID" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "FK_CHAT_MESSAGES__DIALOG_ID" FOREIGN KEY ("dialogId") REFERENCES "ChatDialog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChatMessageDocumentEmbedding" ADD CONSTRAINT "FK_CHAT_MESSAGE_DOCUMENT_EMBEDDINGS__CHAT_HISTORY_ID" FOREIGN KEY ("chatHistoryId") REFERENCES "ChatMessage"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChatMessageDocumentEmbedding" ADD CONSTRAINT "FK_CHAT_MESSAGE_DOCUMENT_EMBEDDINGS__EMBEDDING_DOCUMENT_ID" FOREIGN KEY ("embeddingDocumentId") REFERENCES "ChatDocumentEmbedding"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChatLlmRequest" ADD CONSTRAINT "FK_CHAT_LLM_REQUESTS__DIALOG_ID" FOREIGN KEY ("dialogId") REFERENCES "ChatDialog"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChatLlmRequest" ADD CONSTRAINT "FK_CHAT_LLM_REQUESTS__HISTORY_ID" FOREIGN KEY ("historyId") REFERENCES "ChatMessage"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChatLlmModel" ADD CONSTRAINT "FK_CHAT_LLM_MODELS__CHAT_LLM_REQUEST_ID" FOREIGN KEY ("requestId") REFERENCES "ChatLlmRequest"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
