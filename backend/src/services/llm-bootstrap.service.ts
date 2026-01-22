import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { concatMap, Subject } from 'rxjs';
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
    this.events$
      .pipe(
        concatMap(async (event: EventType) => {
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

          storage.run(store, () => {
            try {
              this.llmSendMessageService
                .processMessageWithRetry({
                  messageId: event.messageId,
                  dialogId: event.dialogId,
                  userId: event.userId,
                  maxRetries: 3,
                })
                .catch((error) => this.logger.error(error, error.stack));
            } catch (error) {
              this.logger.error(error, error.stack);
            }
          });
        }),
      )
      .subscribe();

    await RAGApplication.start();
  }

  async onApplicationShutdown(signal?: string) {
    await RAGApplication.stop();
  }

  addMessageToProccess(event: EventType) {
    this.events$.next(event);
  }
}
