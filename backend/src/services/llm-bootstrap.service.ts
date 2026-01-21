import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { concatMap, Subject } from 'rxjs';
import { DialogManager } from '../llm/dialogManager';
import { RAGApplication } from '../llm/ragApplication';
import { getTraceStack } from '../trace/trace.module';
import { EventType } from '../types/event-type';
import { LlmSendMessageService } from './llm-send-message.service';

@Injectable()
export class LlmBootstrapService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(LlmBootstrapService.name);
  private readonly events$ = new Subject<EventType>();

  constructor(private readonly llmSendMessageService: LlmSendMessageService) {}

  async onApplicationBootstrap() {
    this.events$
      .pipe(
        concatMap(async (event: EventType) => {
          try {
            await this.llmSendMessageService.processMessageWithRetry({
              messageId: event.messageId,
              dialogId: event.dialogId,
              userId: event.userId,
              maxRetries: 3,
            });

            DialogManager.setMessageTrace(
              event.messageId,
              getTraceStack(),
            ).catch((error) => this.logger.error(error, error.stack));
          } catch (error) {
            this.logger.error(error, error.stack);
          }
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
