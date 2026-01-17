-- AlterTable
ALTER TABLE "ChatDocumentEmbedding" ADD COLUMN     "graphContent" TEXT,
ADD COLUMN     "graphEmbedding1024" vector(1024),
ADD COLUMN     "graphEmbedding1536" vector(1536),
ADD COLUMN     "graphEmbedding3072" vector(3072),
ADD COLUMN     "graphEmbedding384" vector(384),
ADD COLUMN     "graphEmbedding768" vector(768);
