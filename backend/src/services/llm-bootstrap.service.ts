import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigManager } from '../llm/config';
import { RAGApplication } from '../llm/ragApplication';

@Injectable()
export class LlmBootstrapService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  async onApplicationBootstrap() {
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
}
