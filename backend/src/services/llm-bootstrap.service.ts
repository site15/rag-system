import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { catchError, concatMap, Subject } from 'rxjs';
import { ConfigManager } from '../llm/config';
import { DialogManager } from '../llm/dialogManager';
import { RAGApplication } from '../llm/ragApplication';
import { getTraceStack } from '../trace/trace.module';
import { EventType } from '../types/event-type';
import { LlmSendMessageService } from './llm-send-message.service';
import { error } from 'node:console';

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
          await this.llmSendMessageService.processMessageWithRetry({
            messageId: event.messageId,
            dialogId: event.dialogId,
            provider: event.provider,
            model: event.model,
            temperature: event.temperature,
            userId: event.userId,
            maxRetries: 3,
          });

          DialogManager.setMessageTrace(event.messageId, getTraceStack()).catch(
            (error) => this.logger.error(error, error.stack),
          );
        }),
        catchError((error) => {
          this.logger.error(error, error.stack);
          return [];
        }),
      )
      .subscribe();

    await RAGApplication.start({
      app: ConfigManager.getAppConfig(),
      providers: {
        embeddings: ConfigManager.getEmbeddingsConfig(
          ConfigManager.getAppConfig().embeddingsProvider,
        ),
      },
    });
  }

  async onApplicationShutdown(signal?: string) {
    await RAGApplication.stop();
  }

  addMessageToProccess(event: EventType) {
    this.events$.next(event);
  }
}
