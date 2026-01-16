// embeddingsDB.ts
import { PrismaService } from '../services/prisma.service';
import { Logger } from './logger';

export class EmbeddingsDB {
  public static async chunkExists(
    hash: string,
    source: string,
  ): Promise<boolean> {
    const fileName = source.split('/').at(-1);
    const exists = await PrismaService.instance.chatDocumentEmbedding.findFirst(
      {
        where: {
          contentHash: hash,
          metadata: { path: ['source'], string_contains: fileName },
        },
      },
    );

    return exists !== null;
  }

  public static async clearEmbeddings() {
    Logger.logWarn('Очистка таблицы эмбеддингов (reindex)');
    await PrismaService.instance.chatDocumentEmbedding.deleteMany();
  }
}
