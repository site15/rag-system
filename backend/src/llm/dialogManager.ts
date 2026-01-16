// dialogManager.ts
import { Database } from './database';
import { Logger } from './logger';
import { FailureTracker } from './services/failureTracker';
import { Category } from './services/questionTransformer';

export class DialogManager {
  public static async createDialog(userId: string): Promise<number> {
    Logger.logInfo('Создание нового диалога', { userId });
    const r = await Database.getInstance().query(
      `
      INSERT INTO new_chat_dialogs (user_id, title)
      VALUES ($1, 'Новый диалог')
      RETURNING id
      `,
      [userId],
    );
    Logger.logInfo('Диалог создан', { dialogId: r.rows[0].id });
    return +r.rows[0].id;
  }

  public static async saveMessage({
    dialogId,
    userId,
    question,
    answer,
    ignored = false,
    selectedDocumentIds = [],
    answerDocumentId,
    isSuccess = true,
    detectedCategory,
    transformedQuestion,
    transformedEmbeddingQuery,
    llmProvider,
    llmModel,
    llmTemperature,
    goodResponse,
    badResponse,
  }: {
    dialogId: number;
    userId: string;
    question: string;
    answer: string;
    ignored?: boolean;
    selectedDocumentIds?: number[];
    answerDocumentId?: number;
    isSuccess?: boolean;
    detectedCategory?: string;
    transformedQuestion?: string;
    transformedEmbeddingQuery?: string;
    llmProvider?: string;
    llmModel?: string;
    llmTemperature?: number;
    goodResponse?: boolean;
    badResponse?: boolean;
  }) {
    const dialog = await Database.getInstance().query(
      'SELECT id FROM new_chat_dialogs WHERE id = $1',
      [dialogId],
    );
    Logger.logInfo('Диалог найден', { dialogId: dialog.rows?.[0]?.id });
    // проверяем существование диалога по ид в базе и если нет то создаем
    if (!dialog.rows?.[0]?.id) {
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

    Logger.logInfo('Сохранение сообщения в историю', {
      dialogId,
      userId,
      ignored,
    });

    // Insert the chat history record and get the ID
    const insertResult = await Database.getInstance().query(
      `
      INSERT INTO new_chat_history
        (dialog_id, user_id, question, answer, ignored, detected_category, transformed_question, transformed_embedding_query, llm_provider, llm_model, llm_temperature, good_response, bad_response)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id
      `,
      [
        dialogId,
        userId,
        question,
        answer,
        ignored,
        detectedCategory,
        transformedQuestion,
        transformedEmbeddingQuery,
        llmProvider,
        llmModel,
        llmTemperature,
        goodResponse,
        badResponse,
      ],
    );

    const chatHistoryId = insertResult.rows[0].id;
    Logger.logInfo('Сообщение сохранено', { chatHistoryId });

    // Track success/failure
    if (isSuccess) {
      await FailureTracker.recordSuccess(dialogId, chatHistoryId);
    } else {
      await FailureTracker.recordFailure(dialogId, chatHistoryId);
    }

    // Save associations between chat history and embedding documents
    if (selectedDocumentIds && selectedDocumentIds.length > 0) {
      const documentAssociations = [];
      for (const docId of selectedDocumentIds) {
        documentAssociations.push(
          Database.getInstance().query(
            `
            INSERT INTO new_chat_history_documents
              (chat_history_id, embedding_document_id, is_answer_document)
            VALUES ($1, $2, $3)
            `,
            [chatHistoryId, docId, answerDocumentId === docId], // Mark as answer document if it matches answerDocumentId
          ),
        );
      }

      // Wait for all document associations to be saved
      await Promise.all(documentAssociations);
      Logger.logInfo('Связи с документами сохранены', {
        chatHistoryId,
        documentCount: selectedDocumentIds.length,
        answerDocumentId,
      });
    }

    return { dialogId, historyId: chatHistoryId };
  }

  public static async getDialogRawHistory(
    dialogId: number,
    limit = 20,
  ): Promise<
    {
      id: number;
      question: string;
      answer: string;
      detected_category: Category;
    }[]
  > {
    Logger.logInfo('Получение истории диалога', { dialogId, limit });
    const r = await Database.getInstance().query(
      `
      SELECT id, question, answer, detected_category
      FROM new_chat_history
      WHERE dialog_id = $1
        AND ignored = false
      ORDER BY created_at DESC
      LIMIT $2
      `,
      [dialogId, limit],
    );

    Logger.logInfo('История диалога получена', { count: r.rows.length });
    return r.rows;
  }

  public static async getDialogHistory(
    dialogId: number,
    limit = 20,
  ): Promise<string[]> {
    Logger.logInfo('Получение истории диалога', { dialogId, limit });
    const r = await Database.getInstance().query(
      `
      SELECT question, answer
      FROM new_chat_history
      WHERE dialog_id = $1
        AND ignored = false
      ORDER BY created_at DESC
      LIMIT $2
      `,
      [dialogId, limit],
    );

    const history = r.rows
      .reverse()
      .map((x) => `Пользователь: ${x.question}\nАссистент: ${x.answer}`);

    Logger.logInfo('История диалога получена', { count: history.length });
    return history;
  }

  public static async getDialogSummary(
    dialogId: number,
  ): Promise<string | null> {
    Logger.logInfo('Получение суммаризации диалога', { dialogId });
    const r = await Database.getInstance().query(
      `
      SELECT summary
      FROM new_chat_dialogs
      WHERE id = $1
      `,
      [dialogId],
    );

    const summary = r.rows?.[0]?.summary || null;
    Logger.logInfo('Суммаризация диалога получена', {
      dialogId,
      hasSummary: !!summary,
      summaryLength: summary ? summary.length : 0,
    });

    return summary;
  }
}
