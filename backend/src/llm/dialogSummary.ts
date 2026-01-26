// dialogSummary.ts
import { PrismaService } from '../services/prisma.service';
import { Trace } from '../trace/trace.module';
import { DialogManager } from './dialogManager';
import { LLMFactory } from './llmFactory';
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
    messageId,
  }: {
    dialogId: string;
    messageId: string;
  }) {
    Logger.logInfo('Начало суммаризации диалога', { dialogId, messageId });
    const { history } = await DialogManager.getDialogHistory({ dialogId });
    const prompt = createDialogSummaryPrompt(history);
    Logger.logInfo('Отправка запроса на суммаризацию', {
      dialogId,
      promptLength: prompt?.length,
    });

    const { content, logId } = await LLMLogger.callWithLogging({
      prompt,
      metadata: { dialogId, operation: 'summarization' },
      dialogId,
      messageId,
      callback: (prompt) => LLMFactory.invoke(prompt),
    });

    Logger.logInfo('Получен ответ от LLM для суммаризации', {
      dialogId,
      // responseLength: typeof r.content === "string" ? r.content?.length : JSON.stringify(r.content)?.length,
    });

    await PrismaService.instance.chatDialog.update({
      where: {
        id: dialogId,
      },
      data: {
        summary:
          typeof content === 'string'
            ? content?.trim()
            : JSON.stringify(content),
        updatedAt: new Date(),
      },
    });
    Logger.logInfo('Суммаризация сохранена в БД', { dialogId });
    return { content, logId };
  }
}
