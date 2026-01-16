// embeddingsDB.ts
import { Database } from './database';
import { Logger } from './logger';

export class EmbeddingsDB {
  public static async chunkExists(
    hash: string,
    source: string,
  ): Promise<boolean> {
    const r = await Database.getInstance().query(
      `SELECT EXISTS (
       SELECT 1 
       FROM new_document_embeddings 
       WHERE "contentHash" = $1 
         AND metadata ->> 'source' ilike '%${source.split('/').at(-1)}'
    ) AS "exists"`,
      [hash],
    );

    // r.rows[0].exists будет true или false
    return r?.rows?.[0]?.exists ?? false;
  }

  public static async clearEmbeddings() {
    Logger.logWarn('Очистка таблицы эмбеддингов (reindex)');
    await Database.getInstance().query(
      `TRUNCATE TABLE new_document_embeddings`,
    );
  }
}
