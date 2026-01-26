import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { concatMap, from, map, merge, of, Subject } from 'rxjs';
import { RAGApplication } from '../llm/ragApplication';
import { getTraceStorage, TraceStore } from '../trace/trace.module';
import { EventType } from '../types/event-type';
import { globalConstants } from '../utils/get-constant';
import { LlmSendMessageService } from './llm-send-message.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class LlmBootstrapService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(LlmBootstrapService.name);
  private readonly events$ = new Subject<EventType>();

  constructor(
    private readonly llmSendMessageService: LlmSendMessageService,
    private readonly prismaService: PrismaService,
  ) {}

  async onApplicationBootstrap() {
    await RAGApplication.start();

    const dbEvents = await this.prismaService.chatMessage
      .findMany({
        where: {
          isProcessing: true,
        },
      })
      .then((messages) =>
        messages.map(
          (message) =>
            ({
              messageId: message.id,
              dialogId: message.dialogId || '',
              userId: message.userId,
              model: message.model || '',
              provider: message.provider || '',
              temperature: +(message.temperature || 0),
            }) satisfies EventType,
        ),
      );

    merge(dbEvents.length ? from(dbEvents) : of(null), this.events$)
      .pipe(
        concatMap(async (event: EventType | null) => {
          if (!event) return;
          const message = await this.prismaService.chatMessage.findFirst({
            select: { constants: true },
            where: { id: event.messageId },
          });
          const storage = getTraceStorage();
          const store: TraceStore = storage.getStore() || { stack: [] };
          store.constants = {
            ...globalConstants,
            ...((message?.constants as any) || {}),
          };

          await storage.run(store, async () => {
            try {
              try {
                return await this.llmSendMessageService.processMessage({
                  messageId: event.messageId,
                  dialogId: event.dialogId,
                  userId: event.userId,
                });
              } catch (error) {
                return this.logger.error(error, error.stack);
              }
            } catch (error) {
              this.logger.error(error, error.stack);
              return Promise.resolve();
            }
          });
        }),
      )
      .subscribe();
  }

  async onApplicationShutdown(signal?: string) {
    await RAGApplication.stop();
  }

  addMessageToProccess(event: EventType) {
    this.events$.next(event);
  }
}
