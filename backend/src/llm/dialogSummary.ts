// dialogSummary.ts
import { Database } from './database';
import { Logger } from './logger';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { ChatGroq } from '@langchain/groq';
import { DialogManager } from './dialogManager';
import { LLMLogger } from './llmLogger';
import { createDialogSummaryPrompt } from './prompt';

export class DialogSummary {
  public static async shouldSummarize(dialogId: number): Promise<boolean> {
    Logger.logInfo('Проверка необходимости суммаризации', { dialogId });
    const r = await Database.getInstance().query(
      `
      SELECT COUNT(*)::int AS cnt
      FROM new_chat_history
      WHERE dialog_id = $1
        AND ignored = false
      `,
      [dialogId],
    );
    const should = r.rows[0].cnt >= 1;
    Logger.logInfo('Проверка завершена', {
      dialogId,
      shouldSummarize: should,
      messageCount: r.rows[0].cnt,
    });
    return should;
  }

  public static async summarizeDialog({
    dialogId,
    llm,
    provider,
    historyId,
  }: {
    dialogId: number;
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    provider: string;
    historyId: number;
  }) {
    Logger.logInfo('Начало суммаризации диалога', { dialogId, historyId });
    const history = await DialogManager.getDialogHistory(dialogId);
    const prompt = createDialogSummaryPrompt(history);
    Logger.logInfo('Отправка запроса на суммаризацию', {
      dialogId,
      promptLength: prompt.length,
    });
    const { content, logId } = await LLMLogger.callWithLogging({
      provider,
      llm,
      prompt,
      metadata: { dialogId, operation: 'summarization' },
      dialogId,
      historyId,
    });
    Logger.logInfo('Получен ответ от LLM для суммаризации', {
      dialogId,
      // responseLength: typeof r.content === "string" ? r.content.length : JSON.stringify(r.content).length,
    });

    await Database.getInstance().query(
      `
      UPDATE new_chat_dialogs
      SET summary = $1,
          updated_at = now()
      WHERE id = $2
      `,
      [
        typeof content === 'string' ? content.trim() : JSON.stringify(content),
        dialogId,
      ],
    );
    Logger.logInfo('Суммаризация сохранена в БД', { dialogId });
    return { content, logId };
  }
}
