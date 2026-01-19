// dialogMessagesController.ts - Controller for retrieving dialog messages by dialog ID
// Provides endpoints to fetch message history for specific dialogs

import { HttpException, Injectable } from '@nestjs/common';
import { ERROR_MESSAGES } from '../llm/constants';
import { Logger } from '../llm/logger';
import { PrismaService } from './prisma.service';

// Request interface for getting dialog messages
export interface DialogMessagesParams {
  dialogId: string;
}

export interface DialogMessagesQuery {
  limit?: string;
  offset?: string;
}

// Response interface for individual messages
export interface DialogMessage {
  id: string;
  createdAt: Date;
  question: string;
  answer: string;
}

// Response interface for the endpoint
export interface DialogMessagesResponse {
  success: boolean;
  dialogId: string;
  messages: DialogMessage[];
  totalCount: number;
  skip: number;
  take: number;
}

@Injectable()
export class LlmDialogService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDialogMessages({
    dialogId,
    take,
    skip,
    userId,
  }: {
    dialogId: string;
    take: number;
    skip: number;
    userId: string;
  }) {
    try {
      Logger.logInfo('Fetching dialog messages', {
        dialogId,
        take,
        skip,
      });

      // === DATABASE QUERIES ===
      // First get total count of messages for this dialog
      const totalCount = await this.prismaService.chatMessage.count({
        where: { deletedAt: null, dialogId: dialogId, userId },
      });

      // Then get the paginated messages
      const messagesResult = await this.prismaService.chatMessage.findMany({
        where: { deletedAt: null, dialogId: dialogId, userId },
        select: {
          id: true,
          createdAt: true,
          question: true,
          answer: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
        take,
        skip,
      });

      const messages: DialogMessage[] = messagesResult.map((row) => ({
        id: row.id,
        createdAt: row.createdAt,
        question: row.question,
        answer: row.answer,
      }));

      Logger.logInfo('Dialog messages retrieved successfully', {
        dialogId,
        messageCount: messages.length,
        totalCount,
      });

      const response: DialogMessagesResponse = {
        success: true,
        dialogId,
        messages,
        totalCount,
        take,
        skip,
      };

      return response;
    } catch (error: any) {
      Logger.logError('Error fetching dialog messages', {
        error: error.message,
        dialogId: dialogId,
      });

      throw new HttpException(
        {
          error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          details: error.message,
        },
        500,
      );
    }
  }
}
