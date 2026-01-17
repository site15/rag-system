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
    const r = await PrismaService.instance.$queryRawUnsafe(
      `
WITH candidates AS (
    SELECT 
    id, 
    content, 
    "graphContent", 
    metadata, 
    "embedding384" <-> '[${queryEmbedding.join(',')}]' AS "distance384", 
    "embedding768" <-> '[${queryEmbedding.join(',')}]' AS "distance768", 
    "embedding1024" <-> '[${queryEmbedding.join(',')}]' AS "distance1024", 
    "embedding1536" <-> '[${queryEmbedding.join(',')}]' AS "distance1536", 
    "embedding3072" <-> '[${queryEmbedding.join(',')}]' AS "distance3072", 
    "graphEmbedding384" <-> '[${queryEmbedding.join(',')}]' AS "graphDistance384", 
    "graphEmbedding768" <-> '[${queryEmbedding.join(',')}]' AS "graphDistance768", 
    "graphEmbedding1024" <-> '[${queryEmbedding.join(',')}]' AS "graphDistance1024", 
    "graphEmbedding1536" <-> '[${queryEmbedding.join(',')}]' AS "graphDistance1536", 
    "graphEmbedding3072" <-> '[${queryEmbedding.join(',')}]' AS "graphDistance3072"
    FROM "ChatDocumentEmbedding"
    ${
      filterBySource
        ? `WHERE metadata ->> 'source' ${
            filterBySourceRule || 'ilike'
          } '${filterBySource}'`
        : ''
    }
    ORDER BY 
    "embedding384" <-> '[${queryEmbedding.join(',')}]', 
    "embedding768" <-> '[${queryEmbedding.join(',')}]', 
    "embedding1024" <-> '[${queryEmbedding.join(',')}]', 
    "embedding1536" <-> '[${queryEmbedding.join(',')}]',
    "embedding3072" <-> '[${queryEmbedding.join(',')}]',
    "graphEmbedding384" <-> '[${queryEmbedding.join(',')}]', 
    "graphEmbedding768" <-> '[${queryEmbedding.join(',')}]', 
    "graphEmbedding1024" <-> '[${queryEmbedding.join(',')}]', 
    "graphEmbedding1536" <-> '[${queryEmbedding.join(',')}]',
    "graphEmbedding3072" <-> '[${queryEmbedding.join(',')}]'
    LIMIT ${limit}* 5
)
SELECT 
id, 
content,
"graphContent", 
metadata, 
"distance384", 
"distance768", 
"distance1024", 
"distance1536", 
"distance3072", 
"graphDistance384", 
"graphDistance768", 
"graphDistance1024", 
"graphDistance1536", 
"graphDistance3072"
FROM candidates
ORDER BY 
"distance384", 
"distance768", 
"distance1024", 
"distance1536", 
"distance3072", 
"graphDistance384", 
"graphDistance768", 
"graphDistance1024", 
"graphDistance1536", 
"graphDistance3072"
LIMIT ${limit};
      `,
    );
    const results = (r as unknown as any[]).map((row: any) => {
      const meta = row.metadata || {};
      return {
        id: row.id,
        content: row.content + '\n\nМЕТАДАННЫЕ:\n' + row.graphContent,
        source: meta.source,
        fromLine: meta.loc?.lines?.from,
        toLine: meta.loc?.lines?.to,
        distance: row.distance,
      };
    });

    Logger.logInfo('Поиск завершен', { found: results.length });
    return results;
  }

  public static splitTextIntoChunksBasic(
    text: string,
    maxLength: number = 1000,
  ) {
    const chunks: string[] = [];
    let start = 0;
    while (start < text.length) {
      const end = Math.min(start + maxLength, text.length);
      chunks.push(text.slice(start, end));
      start = end;
    }
    return chunks;
  }

  public static splitTextIntoChunks(
    text: string,
    chunkSize: number = 1000,
    delimiter = `\n--\n`,
    showLog = true,
  ): string[] {
    if (showLog) {
      Logger.logInfo('Разделение текста на чанки', {
        textLength: text.length,
        maxLength: chunkSize,
      });
    }
    const parts = text.split(delimiter);
    const chunks: string[] = [];

    let current = '';

    for (let i = 0; i < parts.length; i++) {
      const token = (i === 0 ? '' : delimiter) + parts[i];

      // если текущий пуст — просто кладём
      if (current.length === 0) {
        current = token;
        continue;
      }

      // если добавление превышает лимит — закрываем текущий
      if (current.length + token.length > chunkSize) {
        chunks.push(current);
        current = token;
        continue;
      }

      // иначе спокойно добавляем
      current += token;
    }

    if (current.length > 0) {
      chunks.push(current);
    }

    const fixChunks = chunks
      .map((chunk) =>
        chunk.length > chunkSize
          ? RAGSearcher.splitTextIntoChunks(
              chunk,
              chunkSize,
              (delimiter = `\n\n`),
            )
              .map((chunk) =>
                chunk.length > chunkSize
                  ? RAGSearcher.splitTextIntoChunksBasic(chunk, chunkSize)
                  : [chunk],
              )
              .flat()
          : [chunk],
      )
      .flat();

    if (showLog) {
      Logger.logInfo('Разделение завершено', {
        chunkCount: chunks.length,
        fixChunksCount: fixChunks.length,
      });
    }
    return fixChunks;
  }
}
