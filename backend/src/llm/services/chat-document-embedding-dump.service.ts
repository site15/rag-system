// chatDocumentEmbeddingDump.service.ts - Service for creating dumps of ChatDocumentEmbedding table
// Provides methods to export table data in INSERT SQL format

import { HttpException } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { Logger } from '../logger';

// Response interface for dump creation
export interface ChatDocumentEmbeddingDumpResponse {
  success: boolean;
  message: string;
  recordCount: number;
  dumpSql: string;
}

export class ChatDocumentEmbeddingDumpService {
  /**
   * Creates a SQL dump of all records in ChatDocumentEmbedding table
   * Returns INSERT statements for all records
   */
  async createFullDump(): Promise<ChatDocumentEmbeddingDumpResponse> {
    try {
      Logger.logInfo('Creating full dump of ChatDocumentEmbedding table');

      // Fetch all records from ChatDocumentEmbedding table
      const records =
        await PrismaService.instance.chatDocumentEmbedding.findMany({
          orderBy: {
            createdAt: 'asc',
          },
        });

      const recordCount = records.length;

      if (recordCount === 0) {
        return {
          success: true,
          message: 'No records found in ChatDocumentEmbedding table',
          recordCount: 0,
          dumpSql: '-- No records to dump\n',
        };
      }

      // Generate INSERT statements for all records
      const insertStatements = records.map((record) =>
        this.generateInsertStatement(record),
      );

      const dumpSql = [
        '-- ChatDocumentEmbedding table dump',
        '-- Generated at: ' + new Date().toISOString(),
        '-- Total records: ' + recordCount,
        '',
        ...insertStatements,
      ].join('\n');

      Logger.logInfo('ChatDocumentEmbedding dump created successfully', {
        recordCount,
      });

      return {
        success: true,
        message: `Successfully created dump with ${recordCount} records`,
        recordCount,
        dumpSql,
      };
    } catch (error: any) {
      Logger.logError('Error creating ChatDocumentEmbedding dump', {
        error: error.message,
      });

      throw new HttpException(
        {
          error: 'Failed to create dump',
          details: error.message,
        },
        500,
      );
    }
  }

  /**
   * Generates a single INSERT statement for a ChatDocumentEmbedding record
   */
  private generateInsertStatement(record: any): string {
    // Escape single quotes in string values
    const escapeString = (str: string | null): string => {
      if (str === null || str === undefined) {
        return 'NULL';
      }
      return `'${str.replace(/'/g, "''")}'`;
    };

    // Handle JSON values
    const escapeJson = (json: any): string => {
      if (json === null || json === undefined) {
        return 'NULL';
      }
      return escapeString(JSON.stringify(json));
    };

    // Handle vector/array values (embedding fields)
    const escapeVector = (vector: any): string => {
      if (vector === null || vector === undefined) {
        return 'NULL';
      }
      // Convert array to PostgreSQL vector format
      if (Array.isArray(vector)) {
        return `'${JSON.stringify(vector)}'`;
      }
      return escapeString(vector.toString());
    };

    // Handle date values
    const escapeDate = (date: Date | null): string => {
      if (date === null || date === undefined) {
        return 'NULL';
      }
      return `'${date.toISOString()}'`;
    };

    const values = [
      escapeString(record.id),
      escapeString(record.content),
      escapeVector(record.embedding384),
      escapeVector(record.embedding768),
      escapeVector(record.embedding1024),
      escapeVector(record.embedding1536),
      escapeVector(record.embedding3072),
      escapeJson(record.metadata),
      escapeString(record.contentHash),
      escapeDate(record.createdAt),
      escapeDate(record.updatedAt),
      escapeString(record.graphContent),
      escapeVector(record.graphEmbedding1024),
      escapeVector(record.graphEmbedding1536),
      escapeVector(record.graphEmbedding3072),
      escapeVector(record.graphEmbedding384),
      escapeVector(record.graphEmbedding768),
      escapeString(record.model),
      escapeString(record.provider),
    ];

    return `INSERT INTO "ChatDocumentEmbedding" ("id", "content", "embedding384", "embedding768", "embedding1024", "embedding1536", "embedding3072", "metadata", "contentHash", "createdAt", "updatedAt", "graphContent", "graphEmbedding1024", "graphEmbedding1536", "graphEmbedding3072", "graphEmbedding384", "graphEmbedding768", "model", "provider") VALUES (${values.join(', ')});`;
  }
}
