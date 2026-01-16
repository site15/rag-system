-- AlterTable
ALTER TABLE "AuthSession" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "AuthUser" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "ChatDialog" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "ChatDocumentEmbedding" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "ChatEmbeddingModel" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "ChatLlmModel" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "ChatLlmRequest" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "ChatMessage" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "ChatMessageDocumentEmbedding" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();
