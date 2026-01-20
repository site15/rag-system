import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiSecurity } from '@nestjs/swagger';
import { FlowController } from './controllers/flow.controller';
import { CONTROLLERS } from './generated/rest/controllers';
import { AuthGuard } from './guards/auth.guard';
import { DefaultDataBootstrapService } from './services/default-data-bootstrap.service';
import { LlmBootstrapService } from './services/llm-bootstrap.service';
import { LlmDialogService } from './services/llm-dialog.service';
import { LlmSendMessageService } from './services/llm-send-message.service';
import { PrismaService } from './services/prisma.service';
import { TraceModule } from './trace/trace.module';
import { join } from 'path';

const controllers = [...CONTROLLERS, FlowController];
for (const controller of controllers) {
  ApiSecurity('api_key')(controller);
}

@Module({
  imports: [
    JwtModule,
    TraceModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client'),
      exclude: ['/api/{*test}'],
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
  ],
  controllers: [...CONTROLLERS, FlowController],
  providers: [
    PrismaService,
    DefaultDataBootstrapService,
    LlmBootstrapService,
    LlmSendMessageService,
    LlmDialogService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
