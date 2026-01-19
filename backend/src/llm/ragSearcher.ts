// ragSearcher.ts
import { PrismaService } from '../services/prisma.service';
import { Logger } from './logger';
import { DocWithMetadataAndId } from './types';

export class RAGSearcher {
  public static async getDocsByIds({
    ids,
  }: {
    ids: string[];
  }): Promise<DocWithMetadataAndId[]> {
    if (!ids.length) {
      return [];
    }

    const r = await PrismaService.instance.$queryRawUnsafe(
      `
SELECT id,
       content,
       "graphContent",
       metadata
FROM "ChatDocumentEmbedding"
WHERE id IN (${ids.map((id) => `'${id}'`).join(', ')})`,
    );
    const results = (r as unknown as any[]).map((row: any) => {
      const source = row.metadata?.source;
      const meta = row.metadata?.meta || {};
      return {
        id: row.id,
        content: row.content + '\n\nМЕТАДАННЫЕ:\n' + row.graphContent,
        source: source,
        fromLine: meta.loc?.lines?.from,
        toLine: meta.loc?.lines?.to,
        distance: row.distance,
      };
    });

    Logger.logInfo('Поиск завершен', { found: results.length });
    return results;
  }

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
      const source = row.metadata?.source;
      const meta = row.metadata?.meta || {};
      return {
        id: row.id,
        content: row.content + '\n\nМЕТАДАННЫЕ:\n' + row.graphContent,
        source: source,
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
    offset: number = 0, // Track position relative to original text
  ): Array<{
    content: string;
    meta: { loc: { lines: { from: number; to: number } } };
  }> {
    const chunks: Array<{
      content: string;
      meta: { loc: { lines: { from: number; to: number } } };
    }> = [];
    let start = 0;
    let currentOffset = offset;
    while (start < text.length) {
      const end = Math.min(start + maxLength, text.length);
      const chunkContent = text.slice(start, end);
      chunks.push({
        content: chunkContent,
        meta: {
          loc: {
            lines: {
              from: currentOffset + start,
              to: currentOffset + end,
            },
          },
        },
      });
      start = end;
    }
    return chunks;
  }

  private static splitTextWithHierarchicalDelimiters(
    text: string,
    maxLength: number = 1000,
    offset: number = 0,
  ): Array<{
    content: string;
    meta: { loc: { lines: { from: number; to: number } } };
  }> {
    // Try first delimiter: \n
    const firstDelimiterChunks = this.trySplitByDelimiter(
      text,
      '\n',
      maxLength,
      offset,
    );
    if (firstDelimiterChunks.length > 1) {
      return firstDelimiterChunks;
    }

    // Try second delimiter: space
    const secondDelimiterChunks = this.trySplitByDelimiter(
      text,
      ' ',
      maxLength,
      offset,
    );
    if (secondDelimiterChunks.length > 1) {
      return secondDelimiterChunks;
    }

    // Fall back to basic chunking
    return this.splitTextIntoChunksBasic(text, maxLength, offset);
  }

  private static trySplitByDelimiter(
    text: string,
    delimiter: string,
    maxLength: number,
    offset: number,
  ): Array<{
    content: string;
    meta: { loc: { lines: { from: number; to: number } } };
  }> {
    const parts = text.split(delimiter);
    const chunks: Array<{
      content: string;
      meta: { loc: { lines: { from: number; to: number } } };
    }> = [];

    let current = '';
    let currentStartOffset = offset;
    let currentPosition = offset;

    for (let i = 0; i < parts.length; i++) {
      const token = (i === 0 ? '' : delimiter) + parts[i];
      const tokenLength = token.length;

      // If current is empty, just put the token
      if (current.length === 0) {
        current = token;
        currentStartOffset = currentPosition;
        currentPosition += tokenLength;
        continue;
      }

      // If adding exceeds limit, close current chunk
      if (current.length + token.length > maxLength) {
        chunks.push({
          content: current,
          meta: {
            loc: {
              lines: {
                from: currentStartOffset,
                to: currentPosition,
              },
            },
          },
        });
        current = token;
        currentStartOffset = currentPosition;
        currentPosition += tokenLength;
        continue;
      }

      // Otherwise add normally
      current += token;
      currentPosition += tokenLength;
    }

    // Add remaining content
    if (current.length > 0) {
      chunks.push({
        content: current,
        meta: {
          loc: {
            lines: {
              from: currentStartOffset,
              to: currentPosition,
            },
          },
        },
      });
    }

    return chunks;
  }

  public static splitTextIntoChunks(
    text: string,
    chunkSize: number = 1000,
    delimiter = `\n--\n`,
    showLog = true,
    depth = 5,
  ): string[] {
    // Call the new method and extract just the content
    const chunkObjects = this.splitTextIntoChunksWithMeta(
      text,
      chunkSize,
      delimiter,
      showLog,
      depth,
    );
    return chunkObjects.map((obj) => obj.content);
  }

  public static splitTextIntoChunksWithMeta(
    text: string,
    chunkSize: number = 1000,
    delimiter = `\n--\n`,
    showLog = true,
    depth = 5,
    offset: number = 0, // Track position relative to original text
  ): Array<{
    content: string;
    meta: { loc: { lines: { from: number; to: number } } };
  }> {
    if (depth <= 0) {
      // Return object with position tracking
      return [
        {
          content: text,
          meta: {
            loc: {
              lines: {
                from: offset,
                to: offset + text.length,
              },
            },
          },
        },
      ];
    }
    if (showLog) {
      Logger.logInfo('Разделение текста на чанки', {
        textLength: text.length,
        maxLength: chunkSize,
      });
    }
    const parts = text.split(delimiter);
    const chunks: Array<{
      content: string;
      meta: { loc: { lines: { from: number; to: number } } };
    }> = [];

    let current = '';
    let currentStartOffset = offset; // Track start position of current chunk

    let currentPosition = offset; // Track current position in original text

    for (let i = 0; i < parts.length; i++) {
      const token = (i === 0 ? '' : delimiter) + parts[i];
      const tokenLength = token.length;

      // если текущий пуст — просто кладём
      if (current.length === 0) {
        current = token;
        currentStartOffset = currentPosition;
        currentPosition += tokenLength;
        continue;
      }

      // если добавление превышает лимит — закрываем текущий
      if (current.length + token.length > chunkSize) {
        chunks.push({
          content: current,
          meta: {
            loc: {
              lines: {
                from: currentStartOffset,
                to: currentPosition,
              },
            },
          },
        });
        current = token;
        currentStartOffset = currentPosition;
        currentPosition += tokenLength;
        continue;
      }

      // иначе спокойно добавляем
      current += token;
      currentPosition += tokenLength;
    }

    if (current.length > 0) {
      chunks.push({
        content: current,
        meta: {
          loc: {
            lines: {
              from: currentStartOffset,
              to: currentPosition,
            },
          },
        },
      });
    }

    const fixChunks = chunks
      .map((chunkObj) =>
        chunkObj.content.length > chunkSize
          ? RAGSearcher.splitTextIntoChunksWithMeta(
              chunkObj.content,
              chunkSize,
              `\n\n`, // Fixed assignment
              false,
              depth - 1,
              chunkObj.meta.loc.lines.from, // Pass the original offset
            )
              .map((subChunkObj) =>
                subChunkObj.content.length > chunkSize
                  ? RAGSearcher.splitTextWithHierarchicalDelimiters(
                      subChunkObj.content,
                      chunkSize,
                      subChunkObj.meta.loc.lines.from,
                    )
                  : [subChunkObj],
              )
              .flat()
          : [chunkObj],
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
