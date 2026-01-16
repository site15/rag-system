// ragSearcher.ts
import { Database } from './database';
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
    const r = await Database.getInstance().query(
      `
WITH candidates AS (
    SELECT id, content, metadata, embedding <-> $1 AS distance
    FROM new_document_embeddings
    ${
      filterBySource
        ? `WHERE metadata ->> 'source' ${
            filterBySourceRule || 'ilike'
          } '${filterBySource}'`
        : ''
    }
    ORDER BY embedding <-> $1
    LIMIT $2 * 5
)
SELECT id, content, metadata, distance
FROM candidates
ORDER BY distance
LIMIT $2;
      `,
      [`[${queryEmbedding.join(',')}]`, limit],
    );

    const results = r.rows.map((row) => {
      const meta = row.metadata || {};
      return {
        id: row.id,
        content: row.content,
        source: meta.source,
        fromLine: meta.loc?.lines?.from,
        toLine: meta.loc?.lines?.to,
        distance: row.distance,
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
