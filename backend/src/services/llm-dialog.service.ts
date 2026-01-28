// dialogMessagesController.ts - Controller for retrieving dialog messages by dialog ID
// Provides endpoints to fetch message history for specific dialogs

import { HttpException, Injectable } from '@nestjs/common';
import { ERROR_MESSAGES } from '../llm/constants';
import { Logger } from '../llm/logger';
import { TraceNode } from '../trace/trace.module';
import { DialogMessage, DialogMessagePrompt } from '../types/flow';
import { PrismaService } from './prisma.service';

@Injectable()
export class LlmDialogService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDialogMessages({
    dialogId,
    take,
    skip,
    userId,
    showPrompts,
  }: {
    dialogId: string;
    take: number;
    skip: number;
    userId: string;
    showPrompts: boolean;
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
          question: true,
          answer: true,
          isProcessing: true,
          answerSentAt: true,
          questionReceivedAt: true,
          dialogId: true,
          provider: true,
          model: true,
          temperature: true,
          ...(showPrompts ? { trace: true } : {}),
        },
        orderBy: {
          createdAt: 'asc',
        },
        take,
        skip,
      });

      const getPrompts = (
        trace: TraceNode[],
        prompts: DialogMessagePrompt[] = [],
      ): DialogMessagePrompt[] => {
        for (let index = 0; index < trace.length; index++) {
          if (trace[index]?.children?.length) {
            getPrompts(trace[index]?.children, prompts);
          }
          if (trace[index].payload?.prompt) {
            prompts.push({
              duration:
                trace[index].end && trace[index].start
                  ? trace[index].end! - trace[index].start
                  : 0,
              ...(trace[index].payload?.provider &&
              trace[index].payload?.model &&
              trace[index].payload?.temperature
                ? {
                    info: `${trace[index].payload?.provider}/${trace[index].payload?.model}:${trace[index].payload?.temperature}`,
                  }
                : { info: '' }),
              prompt: trace[index].payload?.prompt,
              result: trace[index].payload?.result,
            });
          }
        }
        return prompts;
      };

      const messages: DialogMessage[] = messagesResult.map((row) => ({
        id: row.id,
        isProcessing: row.isProcessing,
        answerSentAt: row.answerSentAt,
        questionReceivedAt: row.questionReceivedAt,
        question: row.question,
        answer: row.answer,
        dialogId: row.dialogId!,
        ...(row.provider && row.model && row.temperature
          ? { info: `${row.provider}/${row.model}:${row.temperature}` }
          : { info: '' }),
        ...(showPrompts
          ? { prompts: getPrompts((row.trace as unknown as TraceNode[]) || []) }
          : {}),
      }));

      Logger.logInfo('Dialog messages retrieved successfully', {
        dialogId,
        messageCount: messages.length,
        totalCount,
      });

      const response = {
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
