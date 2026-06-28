// graphEmbedService.ts — offline graph metadata extraction for document embeddings
import Mustache from 'mustache';
import { PrismaService } from '../services/prisma.service';
import { getConstant, GetConstantKey } from '../utils/get-constant';
import { EmbeddingsFactory } from './embeddingsFactory';
import { LLMFactory } from './llmFactory';
import { Logger } from './logger';

export type GraphEmbedResult = {
  success: boolean;
  processedCount: number;
  totalCount: number;
  errors: string[];
};

export class GraphEmbedService {
  public static async fillGraphEmbedDocuments(): Promise<GraphEmbedResult> {
    Logger.logInfo(
      'Начало заполнения graphContent и graphEmbeddings для документов',
    );

    const documents =
      await PrismaService.instance.chatDocumentEmbedding.findMany({
        where: {
          graphContent: null,
        },
        select: {
          id: true,
          content: true,
          graphContent: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

    Logger.logInfo('Найдено документов для обработки', {
      count: documents?.length,
    });

    let processedCount = 0;
    const errors: string[] = [];
    const delayMs = parseInt(process.env.GRAPH_EMBED_DELAY_MS || '0', 10);

    for (const doc of documents) {
      try {
        if (doc.graphContent) {
          continue;
        }

        Logger.logInfo('Обработка документа', {
          id: doc.id,
          contentLength: doc.content?.length,
        });

        const prompt = getConstant(
          GetConstantKey.Prompt_documentAnalysisTemplate,
          { content: doc.content },
        );

        let response = await LLMFactory.invoke(prompt, undefined, undefined, {
          metadata: {
            operation: 'graph_embed',
            documentId: doc.id,
          },
        });

        if (!response) {
          throw new Error('LLM did not return a response');
        }

        try {
          JSON.parse(response);
        } catch {
          Logger.logError('Invalid JSON in response', { response });
          response = Mustache.render('ERROR: {{response}}', { response });
        }

        const graphVector = await EmbeddingsFactory.embedQuery(response);
        const graphVectorValue = `[${graphVector.join(',')}]`;

        await GraphEmbedService.updateGraphEmbedding({
          id: doc.id,
          graphContent: response,
          graphVector,
          graphVectorValue,
        });

        processedCount++;
        Logger.logInfo('Документ успешно обработан', {
          id: doc.id,
          processedCount,
          total: documents?.length,
        });

        if (delayMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      } catch (error) {
        const errorMsg = `Ошибка обработки документа ${doc.id}: ${(error as Error).message}`;
        Logger.logError(errorMsg, { error });
        errors.push(errorMsg);
      }
    }

    Logger.logInfo('Завершена обработка документов', {
      totalProcessed: processedCount,
      totalDocuments: documents?.length,
      errorsCount: errors?.length,
    });

    if (errors?.length > 0) {
      Logger.logError('Ошибки при обработке документов', { errors });
    }

    return {
      success: errors.length === 0,
      processedCount,
      totalCount: documents?.length,
      errors,
    };
  }

  private static async updateGraphEmbedding({
    id,
    graphContent,
    graphVector,
    graphVectorValue,
  }: {
    id: string;
    graphContent: string;
    graphVector: number[];
    graphVectorValue: string;
  }) {
    if (graphVector?.length === 384) {
      await PrismaService.instance.$executeRaw`
        UPDATE "ChatDocumentEmbedding"
        SET "graphContent" = ${graphContent}, "graphEmbedding384" = ${graphVectorValue}::vector
        WHERE id = ${id}
      `;
    } else if (graphVector?.length === 768) {
      await PrismaService.instance.$executeRaw`
        UPDATE "ChatDocumentEmbedding"
        SET "graphContent" = ${graphContent}, "graphEmbedding768" = ${graphVectorValue}::vector
        WHERE id = ${id}
      `;
    } else if (graphVector?.length === 1024) {
      await PrismaService.instance.$executeRaw`
        UPDATE "ChatDocumentEmbedding"
        SET "graphContent" = ${graphContent}, "graphEmbedding1024" = ${graphVectorValue}::vector
        WHERE id = ${id}
      `;
    } else if (graphVector?.length === 1536) {
      await PrismaService.instance.$executeRaw`
        UPDATE "ChatDocumentEmbedding"
        SET "graphContent" = ${graphContent}, "graphEmbedding1536" = ${graphVectorValue}::vector
        WHERE id = ${id}
      `;
    } else if (graphVector?.length === 3072) {
      await PrismaService.instance.$executeRaw`
        UPDATE "ChatDocumentEmbedding"
        SET "graphContent" = ${graphContent}, "graphEmbedding3072" = ${graphVectorValue}::vector
        WHERE id = ${id}
      `;
    } else {
      throw new Error(
        `Unsupported graph embedding dimension: ${graphVector?.length}`,
      );
    }
  }
}
