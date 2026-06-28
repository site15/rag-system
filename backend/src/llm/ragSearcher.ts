// ragSearcher.ts
import { PrismaService } from '../services/prisma.service';
import { addPayloadToTrace, Trace } from '../trace/trace.module';
import { getConstant, GetConstantKey } from '../utils/get-constant';
import { RAG_SEARCH_CONFIG } from './constants';
import { Logger } from './logger';
import { DocWithMetadataAndId } from './types';

const EMBEDDING_COLUMNS: Record<number, string> = {
  384: 'embedding384',
  768: 'embedding768',
  1024: 'embedding1024',
  1536: 'embedding1536',
  3072: 'embedding3072',
};

const GRAPH_EMBEDDING_COLUMNS: Record<number, string> = {
  384: 'graphEmbedding384',
  768: 'graphEmbedding768',
  1024: 'graphEmbedding1024',
  1536: 'graphEmbedding1536',
  3072: 'graphEmbedding3072',
};

function mapRowToDoc(row: any): DocWithMetadataAndId {
  const source = row.metadata?.source;
  const meta = row.metadata?.meta || {};
  const graphPart = row.graphContent
    ? getConstant(GetConstantKey.RagSearcher_metadataSeparator) +
      row.graphContent
    : '';
  return {
    id: row.id,
    content: row.content + (graphPart ? '\n\n' + graphPart : ''),
    source: source,
    fromLine: meta.loc?.lines?.from,
    toLine: meta.loc?.lines?.to,
    distance: row.distance != null ? Number(row.distance) : undefined,
  };
}

export class RAGSearcher {
  private static getEmbeddingColumn(length: number): string {
    const column = EMBEDDING_COLUMNS[length];
    if (!column) {
      throw new Error(`Unsupported embedding dimension: ${length}`);
    }
    return column;
  }

  private static getGraphEmbeddingColumn(length: number): string | null {
    return GRAPH_EMBEDDING_COLUMNS[length] || null;
  }

  /** pgvector HNSW on `vector` type is limited to 2000 dims; use halfvec above that */
  private static buildVectorDistanceExpr(
    column: string,
    vectorLiteral: string,
    dimensions: number,
  ): string {
    if (dimensions > 2000) {
      return `"${column}"::halfvec(${dimensions}) <=> '${vectorLiteral}'::halfvec(${dimensions})`;
    }
    return `"${column}" <=> '${vectorLiteral}'::vector`;
  }

  @Trace()
  public static async getDocsByIds({
    ids,
  }: {
    ids: string[];
  }): Promise<DocWithMetadataAndId[]> {
    addPayloadToTrace({ ids });

    if (!ids?.length) {
      return [];
    }

    const r = await PrismaService.instance.$queryRawUnsafe(
      `
SELECT id, content, "graphContent", metadata
FROM "ChatDocumentEmbedding"
WHERE id IN (${ids.map((id) => `'${id}'`).join(', ')})`,
    );

    const results = (r as unknown as any[]).map((row: any) => {
      const source = row.metadata?.source;
      const meta = row.metadata?.meta || {};
      return {
        id: row.id,
        content: getConstant(GetConstantKey.RagSearcher_metadataSeparator, {
          content: row.content,
          graphContent: row.graphContent,
        }),
        source: source,
        fromLine: meta.loc?.lines?.from,
        toLine: meta.loc?.lines?.to,
        distance: undefined,
      };
    });

    Logger.logInfo('Поиск завершен', { found: results?.length });
    return results;
  }

  @Trace()
  public static async similaritySearch({
    queryEmbedding,
    limit = RAG_SEARCH_CONFIG.GLOBAL_SEARCH_LIMIT,
    filterBySource,
    filterBySourceRule,
    queryEmbeddingText,
    maxDistance = RAG_SEARCH_CONFIG.MAX_COSINE_DISTANCE,
  }: {
    queryEmbedding: number[];
    limit?: number;
    filterBySource?: string;
    filterBySourceRule?: 'not ilike' | 'ilike';
    queryEmbeddingText: string;
    maxDistance?: number;
  }): Promise<DocWithMetadataAndId[]> {
    addPayloadToTrace({ queryEmbeddingText, maxDistance });

    const queryEmbeddingLength = queryEmbedding?.length;
    const embeddingColumn = this.getEmbeddingColumn(queryEmbeddingLength);
    const graphColumn = this.getGraphEmbeddingColumn(queryEmbeddingLength);
    const vectorLiteral = `[${queryEmbedding.join(',')}]`;

    Logger.logInfo('Выполнение поиска по эмбеддингам', {
      limit,
      queryEmbeddingLength,
      maxDistance,
    });

    const sourceFilter = filterBySource
      ? `AND metadata ->> 'source' ${filterBySourceRule || 'ilike'} '${filterBySource.replace(/'/g, "''")}'`
      : '';

    const distanceExpr = graphColumn
      ? `LEAST(
          ${this.buildVectorDistanceExpr(embeddingColumn, vectorLiteral, queryEmbeddingLength)},
          COALESCE(${this.buildVectorDistanceExpr(graphColumn, vectorLiteral, queryEmbeddingLength)}, 2)
        )`
      : this.buildVectorDistanceExpr(
          embeddingColumn,
          vectorLiteral,
          queryEmbeddingLength,
        );

    const r = await PrismaService.instance.$queryRawUnsafe(
      `
    SELECT
      id,
      content,
      "graphContent",
      metadata,
      ${distanceExpr} AS distance
    FROM "ChatDocumentEmbedding"
    WHERE "${embeddingColumn}" IS NOT NULL
      ${sourceFilter}
      AND ${distanceExpr} <= ${maxDistance}
    ORDER BY distance
    LIMIT ${limit}
      `,
    );

    const results = (r as unknown as any[]).map(mapRowToDoc);

    Logger.logInfo('Поиск завершен', {
      found: results?.length,
      bestDistance: results[0]?.distance,
    });
    return results;
  }

  private static buildSourceFilter(
    filterBySource?: string,
    filterBySourceRule?: 'not ilike' | 'ilike',
  ): string {
    if (!filterBySource) {
      return '';
    }
    return `AND metadata ->> 'source' ${filterBySourceRule || 'ilike'} '${filterBySource.replace(/'/g, "''")}'`;
  }

  @Trace()
  public static async fullTextSearch({
    queryText,
    limit = RAG_SEARCH_CONFIG.GLOBAL_SEARCH_LIMIT,
    filterBySource,
    filterBySourceRule,
  }: {
    queryText: string;
    limit?: number;
    filterBySource?: string;
    filterBySourceRule?: 'not ilike' | 'ilike';
  }): Promise<DocWithMetadataAndId[]> {
    const trimmed = queryText?.trim();
    if (!trimmed) {
      return [];
    }

    addPayloadToTrace({ fullTextQuery: trimmed });

    const escaped = trimmed.replace(/'/g, "''");
    const sourceFilter = this.buildSourceFilter(
      filterBySource,
      filterBySourceRule,
    );

    const tsQuery = `
      plainto_tsquery('russian', '${escaped}') ||
      plainto_tsquery('simple', '${escaped.toLowerCase()}')
    `;

    const r = await PrismaService.instance.$queryRawUnsafe(
      `
    SELECT
      id,
      content,
      "graphContent",
      metadata,
      ts_rank_cd("contentSearch", ${tsQuery}) AS rank
    FROM "ChatDocumentEmbedding"
    WHERE "contentSearch" @@ (${tsQuery})
      ${sourceFilter}
    ORDER BY rank DESC
    LIMIT ${limit}
      `,
    );

    const results = (r as unknown as any[]).map((row) => {
      const doc = mapRowToDoc(row);
      const rank = row.rank != null ? Number(row.rank) : 0;
      return {
        ...doc,
        distance: rank > 0 ? 1 / rank : undefined,
      };
    });

    Logger.logInfo('BM25-поиск завершен', {
      found: results.length,
      bestRank: results[0] ? 1 / (results[0].distance || 1) : undefined,
    });

    return results;
  }

  public static reciprocalRankFusion(
    rankedLists: DocWithMetadataAndId[][],
    limit: number = RAG_SEARCH_CONFIG.GLOBAL_SEARCH_LIMIT,
    k: number = RAG_SEARCH_CONFIG.RRF_K,
  ): DocWithMetadataAndId[] {
    const scores = new Map<
      string,
      { doc: DocWithMetadataAndId; score: number }
    >();

    for (const list of rankedLists) {
      list.forEach((doc, rank) => {
        const contribution = 1 / (k + rank + 1);
        const existing = scores.get(doc.id);
        if (existing) {
          existing.score += contribution;
          if (
            (doc.distance ?? Infinity) < (existing.doc.distance ?? Infinity)
          ) {
            existing.doc = { ...existing.doc, ...doc };
          }
        } else {
          scores.set(doc.id, { doc: { ...doc }, score: contribution });
        }
      });
    }

    return [...scores.values()]
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ doc, score }) => ({
        ...doc,
        distance: 1 / score,
      }));
  }

  @Trace()
  public static async hybridSearch({
    queryEmbedding,
    queryText,
    limit = RAG_SEARCH_CONFIG.GLOBAL_SEARCH_LIMIT,
    filterBySource,
    filterBySourceRule,
    maxDistance = RAG_SEARCH_CONFIG.MAX_COSINE_DISTANCE,
  }: {
    queryEmbedding: number[];
    queryText: string;
    limit?: number;
    filterBySource?: string;
    filterBySourceRule?: 'not ilike' | 'ilike';
    maxDistance?: number;
  }): Promise<DocWithMetadataAndId[]> {
    const fetchLimit = limit * RAG_SEARCH_CONFIG.HYBRID_FETCH_MULTIPLIER;

    const searchParams = {
      limit: fetchLimit,
      filterBySource,
      filterBySourceRule,
    };

    const [vectorResults, textResults] = await Promise.all([
      this.similaritySearch({
        queryEmbedding,
        queryEmbeddingText: queryText,
        maxDistance,
        ...searchParams,
      }),
      this.fullTextSearch({
        queryText,
        ...searchParams,
      }),
    ]);

    const fused = this.reciprocalRankFusion(
      [vectorResults, textResults],
      limit,
    );

    addPayloadToTrace({
      hybridVectorCount: vectorResults.length,
      hybridTextCount: textResults.length,
      hybridFusedCount: fused.length,
    });

    Logger.logInfo('Гибридный поиск завершен', {
      vectorHits: vectorResults.length,
      textHits: textResults.length,
      fused: fused.length,
    });

    return fused;
  }

  public static dedupeAndRankDocs(
    docs: DocWithMetadataAndId[],
    limit: number = RAG_SEARCH_CONFIG.GLOBAL_SEARCH_LIMIT,
  ): DocWithMetadataAndId[] {
    const byId = new Map<string, DocWithMetadataAndId>();
    for (const doc of docs) {
      const existing = byId.get(doc.id);
      if (
        !existing ||
        (doc.distance ?? Infinity) < (existing.distance ?? Infinity)
      ) {
        byId.set(doc.id, doc);
      }
    }
    return [...byId.values()]
      .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity))
      .slice(0, limit);
  }

  public static splitTextIntoChunksBasic(
    text: string,
    maxLength: number = 1000,
    offset: number = 0,
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
    while (start < text?.length) {
      const end = Math.min(start + maxLength, text?.length);
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
    const firstDelimiterChunks = this.trySplitByDelimiter(
      text,
      '\n',
      maxLength,
      offset,
    );
    if (firstDelimiterChunks?.length > 1) {
      return firstDelimiterChunks;
    }

    const secondDelimiterChunks = this.trySplitByDelimiter(
      text,
      ' ',
      maxLength,
      offset,
    );
    if (secondDelimiterChunks?.length > 1) {
      return secondDelimiterChunks;
    }

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

    for (let i = 0; i < parts?.length; i++) {
      const token = (i === 0 ? '' : delimiter) + parts[i];
      const tokenLength = token?.length;

      if (current?.length === 0) {
        current = token;
        currentStartOffset = currentPosition;
        currentPosition += tokenLength;
        continue;
      }

      if (current?.length + token?.length > maxLength) {
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

      current += token;
      currentPosition += tokenLength;
    }

    if (current?.length > 0) {
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
    offset: number = 0,
  ): Array<{
    content: string;
    meta: { loc: { lines: { from: number; to: number } } };
  }> {
    if (depth <= 0) {
      return [
        {
          content: text,
          meta: {
            loc: {
              lines: {
                from: offset,
                to: offset + text?.length,
              },
            },
          },
        },
      ];
    }
    if (showLog) {
      Logger.logInfo('Разделение текста на чанки', {
        textLength: text?.length,
        maxLength: chunkSize,
      });
    }
    const parts = text.split(delimiter);
    const chunks: Array<{
      content: string;
      meta: { loc: { lines: { from: number; to: number } } };
    }> = [];

    let current = '';
    let currentStartOffset = offset;
    let currentPosition = offset;

    for (let i = 0; i < parts?.length; i++) {
      const token = (i === 0 ? '' : delimiter) + parts[i];
      const tokenLength = token?.length;

      if (current?.length === 0) {
        current = token;
        currentStartOffset = currentPosition;
        currentPosition += tokenLength;
        continue;
      }

      if (current?.length + token?.length > chunkSize) {
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

      current += token;
      currentPosition += tokenLength;
    }

    if (current?.length > 0) {
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
        chunkObj.content?.length > chunkSize
          ? RAGSearcher.splitTextIntoChunksWithMeta(
              chunkObj.content,
              chunkSize,
              `\n\n`,
              false,
              depth - 1,
              chunkObj.meta.loc.lines.from,
            )
              .map((subChunkObj) =>
                subChunkObj.content?.length > chunkSize
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
        chunkCount: chunks?.length,
        fixChunksCount: fixChunks?.length,
      });
    }
    return fixChunks;
  }
}
