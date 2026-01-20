// dialogSummary.ts
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { PrismaService } from '../services/prisma.service';
import { addPayloadToTrace, Trace } from '../trace/trace.module';
import { DialogManager } from './dialogManager';
import { LLMLogger } from './llmLogger';
import { Logger } from './logger';
import { createDialogSummaryPrompt } from './prompt';

export class DialogSummary {
  public static async shouldSummarize(dialogId: string): Promise<boolean> {
    Logger.logInfo('Проверка необходимости суммаризации', { dialogId });

    const messageCount = await PrismaService.instance.chatMessage.count({
      where: { deletedAt: null, dialogId: dialogId },
    });

    const should = messageCount >= 1;
    Logger.logInfo('Проверка завершена', {
      dialogId,
      shouldSummarize: should,
      messageCount: messageCount,
    });
    return should;
  }

  @Trace()
  public static async summarizeDialog({
    dialogId,
    llm,
    provider,
    messageId,
  }: {
    dialogId: string;
    llm:
      | ChatOllama
      | ChatOpenAI
      | ChatAnthropic
      | ChatGoogleGenerativeAI
      | HuggingFaceInference
      | ChatGroq;
    provider: string;
    messageId: string;
  }) {
    Logger.logInfo('Начало суммаризации диалога', { dialogId, messageId });
    const history = await DialogManager.getDialogHistory(dialogId);
    const prompt = createDialogSummaryPrompt(history);
    Logger.logInfo('Отправка запроса на суммаризацию', {
      dialogId,
      promptLength: prompt.length,
    });

    addPayloadToTrace({
      prompt,
    });

    const { content, logId } = await LLMLogger.callWithLogging({
      provider,
      llm,
      prompt,
      metadata: { dialogId, operation: 'summarization' },
      dialogId,
      messageId,
      callback: (prompt) =>
        llm
          .invoke(prompt)
          .then(async (result) =>
            typeof result === 'string' ? result.trim() : result,
          ),
    });

    addPayloadToTrace({
      content,
    });

    Logger.logInfo('Получен ответ от LLM для суммаризации', {
      dialogId,
      // responseLength: typeof r.content === "string" ? r.content.length : JSON.stringify(r.content).length,
    });

    await PrismaService.instance.chatDialog.update({
      where: {
        id: dialogId,
      },
      data: {
        summary:
          typeof content === 'string'
            ? content.trim()
            : JSON.stringify(content),
        updatedAt: new Date(),
      },
    });
    Logger.logInfo('Суммаризация сохранена в БД', { dialogId });
    return { content, logId };
  }
}
