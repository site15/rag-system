// dialogManager.ts
import Mustache from 'mustache';
import { PrismaService } from '../services/prisma.service';
import { TraceNode } from '../trace/trace.module';
import { Logger } from './logger';
import { FailureTracker } from './services/failureTracker';
import { Category } from './services/questionTransformer';
import { getConstant, GetConstantKey } from '../utils/get-constant';

export class DialogManager {
  public static async createDialog(userId: string): Promise<string> {
    Logger.logInfo('Создание нового диалога', { userId });

    const dialog = await PrismaService.instance.chatDialog.create({
      data: {
        userId: userId,
        title: 'Новый диалог',
      },
      select: {
        id: true,
      },
    });

    Logger.logInfo('Диалог создан', { dialogId: dialog.id });
    return dialog.id;
  }

  public static async setMessageTrace(
    messageId: string,
    trace: TraceNode[] | null,
  ): Promise<void> {
    Logger.logInfo('Setting message trace', {
      messageId,
    });

    await PrismaService.instance.chatDialog.updateMany({
      where: {
        ChatMessage: { some: { id: messageId } },
      },
      data: {
        consecutiveFailures: 0,
        updatedAt: new Date(),
      },
    });

    // Mark the chat history entry as successful
    await PrismaService.instance.chatMessage.update({
      where: { deletedAt: null, id: messageId },
      data: {
        trace: trace as any,
        updatedAt: new Date(),
      },
    });

    Logger.logInfo('Message trace set', { messageId });
  }

  public static async createMessage({
    dialogId,
    userId,
    question,
  }: {
    dialogId: string;
    userId: string;
    question: string;
  }) {
    dialogId = await DialogManager.getGetOrCreateDialogId({ dialogId, userId });

    const chatMessage = await PrismaService.instance.chatMessage.create({
      data: {
        dialogId: dialogId,
        userId: userId,
        question: question,
        answer: '',
        isProcessing: true,
        questionReceivedAt: question ? new Date() : null,
      },
    });

    return chatMessage;
  }

  private static async getGetOrCreateDialogId({
    dialogId,
    userId,
  }: {
    dialogId: string;
    userId: string;
  }) {
    const dialog = await PrismaService.instance.chatDialog.findUnique({
      where: {
        id: dialogId,
      },
      select: {
        id: true,
      },
    });

    Logger.logInfo('Диалог найден', { dialogId: dialog?.id });
    // проверяем существование диалога по ид в базе и если нет то создаем
    if (!dialog?.id) {
      dialogId = await DialogManager.createDialog(userId);
    } else {
      // Check if dialog is marked as failed
      const isFailed = await FailureTracker.isDialogFailed(dialogId);
      if (isFailed) {
        Logger.logInfo('Dialog is marked as failed, creating new dialog', {
          oldDialogId: dialogId,
        });
        dialogId = await DialogManager.createDialog(userId);
      }
    }
    return dialogId;
  }

  public static async updateMessage({
    messageId,
    answer,
    selectedDocumentIds = [],
    answerDocumentId,
    isSuccess,
    detectedCategory,
    transformedQuestion,
    transformedEmbeddingQuery,
    isProcessing,
    llmProvider,
    llmModel,
    llmTemperature,
  }: {
    messageId: string;
    answer: string;
    selectedDocumentIds?: string[];
    answerDocumentId?: string;
    isSuccess: boolean;
    detectedCategory?: string;
    transformedQuestion?: string;
    transformedEmbeddingQuery?: string;
    isProcessing?: boolean;
    llmProvider?: string;
    llmModel?: string;
    llmTemperature?: number;
  }) {
    // Insert the chat history record and get the ID
    const chatMessage = await PrismaService.instance.chatMessage.update({
      data: {
        provider: llmProvider,
        model: llmModel,
        temperature: llmTemperature,
        answer: answer,
        category: detectedCategory,
        transformedQuestion: transformedQuestion,
        transformedEmbeddingQuery: transformedEmbeddingQuery,
        isProcessing,
        answerSentAt: answer ? new Date() : null,
      },
      select: {
        id: true,
        dialogId: true,
      },
      where: { id: messageId },
    });

    if (chatMessage.dialogId) {
      // Track success/failure
      if (isSuccess) {
        await FailureTracker.recordSuccess(chatMessage.dialogId, messageId);
      } else {
        await FailureTracker.recordFailure(chatMessage.dialogId, messageId);
      }
    }

    // Save associations between chat history and embedding documents
    if (selectedDocumentIds && selectedDocumentIds.length > 0) {
      const documentAssociations = [];
      for (const docId of selectedDocumentIds) {
        documentAssociations.push(
          PrismaService.instance.chatMessageDocumentEmbedding.create({
            data: {
              messageId: messageId,
              embeddingDocumentId: docId,
              isFound: answerDocumentId === docId, // Mark as found if it matches answerDocumentId
            },
          }),
        );
      }

      // Wait for all document associations to be saved
      await Promise.all(documentAssociations);
      Logger.logInfo('Связи с документами сохранены', {
        messageId,
        documentCount: selectedDocumentIds.length,
        answerDocumentId,
      });
    }

    return { dialogId: chatMessage.dialogId, messageId: messageId };
  }

  public static async getDialogRawHistory(
    dialogId: string,
    limit = 20,
  ): Promise<
    {
      id: string;
      question: string;
      answer: string;
      detected_category: Category;
    }[]
  > {
    Logger.logInfo('Получение истории диалога', { dialogId, limit });

    const messages = await PrismaService.instance.chatMessage.findMany({
      where: { deletedAt: null, dialogId: dialogId },
      select: {
        id: true,
        question: true,
        answer: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    const result = messages.map((msg) => ({
      id: msg.id,
      question: msg.question,
      answer: msg.answer,
      detected_category: msg.category as Category,
    }));

    Logger.logInfo('История диалога получена', { count: result.length });
    return result;
  }

  public static async getDialogFoundDocuments(dialogId: string) {
    const messages = (
      await PrismaService.instance.chatMessage.findMany({
        include: {
          ChatMessageDocumentEmbedding: {
            include: {
              embeddingDocument: true,
            },
            where: { isFound: true },
          },
        },
        where: { dialogId },
      })
    ).filter((c) => c.ChatMessageDocumentEmbedding.find((d) => d.isFound));

    return messages
      .map((m) =>
        m.ChatMessageDocumentEmbedding.map((d) => d.embeddingDocument),
      )
      .flat();
  }

  public static async getDialogHistory({
    dialogId,
    limit = 20,
  }: {
    dialogId: string;
    limit?: number;
  }) {
    Logger.logInfo('Получение истории диалога', { dialogId, limit });

    const messages = await DialogManager.getDialogHistoryRaw({
      dialogId,
      limit,
    });

    const history = messages.reverse().map((x) =>
      Mustache.render(
        getConstant(GetConstantKey.DialogManager_historyTemplate),
        {
          question: x.question,
          answer: x.answer,
        },
      ),
    );

    Logger.logInfo('История диалога получена', { count: history.length });
    return { history, messages };
  }

  public static async getDialogHistoryRaw({
    dialogId,
    limit = 20,
  }: {
    dialogId: string;
    limit: number;
  }) {
    return await PrismaService.instance.chatMessage.findMany({
      where: { deletedAt: null, dialogId: dialogId },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  public static async getDialogSummary(
    dialogId: string,
  ): Promise<string | null> {
    Logger.logInfo('Получение суммаризации диалога', { dialogId });

    const dialog = await PrismaService.instance.chatDialog.findUnique({
      where: {
        id: dialogId,
      },
      select: {
        summary: true,
      },
    });

    const summary = dialog?.summary || null;
    Logger.logInfo('Суммаризация диалога получена', {
      dialogId,
      hasSummary: !!summary,
      summaryLength: summary ? summary.length : 0,
    });

    return summary;
  }

  public static async getMessageTrace(messageId: string): Promise<any> {
    Logger.logInfo('Getting message trace', {
      messageId,
    });

    const message = await PrismaService.instance.chatMessage.findFirst({
      where: { deletedAt: null, id: messageId },
      select: {
        trace: true,
      },
    });

    if (!message) {
      Logger.logInfo('Message not found', { messageId });
      return null;
    }

    Logger.logInfo('Message trace retrieved', {
      messageId,
      hasTrace: !!message.trace,
    });

    return message.trace;
  }

  public static async deleteMessage(
    messageId: string,
  ): Promise<{ success: boolean; dialogId?: string }> {
    Logger.logInfo('Soft deleting message', {
      messageId,
    });

    try {
      // First, get the message with its dialog relationship
      const message = await PrismaService.instance.chatMessage.findFirst({
        where: { deletedAt: null, id: messageId },
        select: {
          id: true,
          dialogId: true,
          deletedAt: true,
        },
      });

      if (!message) {
        Logger.logInfo('Message not found for deletion', { messageId });
        return { success: false };
      }

      if (message.deletedAt) {
        Logger.logInfo('Message already deleted', { messageId });
        return { success: false };
      }

      // Soft delete the message by setting deletedAt
      await PrismaService.instance.chatMessage.update({
        where: { deletedAt: null, id: messageId },
        data: {
          deletedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // Reset dialog parameters if message had a dialog
      if (message.dialogId) {
        await PrismaService.instance.chatDialog.update({
          where: {
            id: message.dialogId,
          },
          data: {
            consecutiveFailures: 0,
            isFailed: false,
            updatedAt: new Date(),
          },
        });

        Logger.logInfo('Message deleted and dialog parameters reset', {
          messageId,
          dialogId: message.dialogId,
        });

        return { success: true, dialogId: message.dialogId };
      }

      Logger.logInfo('Message deleted without dialog', { messageId });
      return { success: true };
    } catch (error) {
      Logger.logError('Error deleting message', {
        messageId,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  public static async getMessage(messageId: string) {
    return await PrismaService.instance.chatMessage.findFirst({
      where: { deletedAt: null, id: messageId },
    });
  }
}
