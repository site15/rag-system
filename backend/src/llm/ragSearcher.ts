// ragSearcher.ts
import { PrismaService } from '../services/prisma.service';
import { Logger } from './logger';
import { DocWithMetadataAndId } from './types';

export class RAGSearcher {
  public static async similaritySearch({
    queryEmbedding,
    limit = 5,
    filterBySource,
    filterBySourceRule,
  }: {
    queryEmbedding: number[];
    limit?: number;
    filterBySource?: string;
    filterBySourceRule?: 'not ilike' | 'ilike';
  }): Promise<DocWithMetadataAndId[]> {
    Logger.logInfo('Выполнение поиска по эмбеддингам', {
      limit,
      queryEmbeddingLength: queryEmbedding.length,
    });

    // Note: Vector similarity search requires raw SQL due to unsupported vector operations in Prisma
    // For now, we'll do a basic metadata-based search
    const embeddings =
      await PrismaService.instance.chatDocumentEmbedding.findMany({
        where: {
          metadata: filterBySource
            ? {
                path: ['source'],
                string_contains: filterBySource.replace('%', ''),
              }
            : undefined,
        },
        take: limit,
      });

    const results = embeddings.map((embedding) => {
      const meta: any = embedding.metadata || {};
      return {
        id: embedding.id,
        content: embedding.content || '',
        source: meta.source,
        fromLine: meta.loc?.lines?.from,
        toLine: meta.loc?.lines?.to,
        distance: 0, // Placeholder since we're not doing actual vector similarity
      };
    });

    Logger.logInfo('Поиск завершен', { found: results.length });
    return results;
  }

  public static splitTextIntoChunks(text: string, maxLength: number = 1000) {
    Logger.logInfo('Разделение текста на чанки', {
      textLength: text.length,
      maxLength,
    });
    const chunks: string[] = [];
    let start = 0;
    while (start < text.length) {
      const end = Math.min(start + maxLength, text.length);
      chunks.push(text.slice(start, end));
      start = end;
    }
    Logger.logInfo('Разделение завершено', { chunkCount: chunks.length });
    return chunks;
  }
}
