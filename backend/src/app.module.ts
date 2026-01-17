import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { FlowController } from './controllers/flow.controller';
import { CONTROLLERS } from './generated/rest/controllers';
import { AuthGuard } from './guards/auth.guard';
import { LlmBootstrapService } from './services/llm-bootstrap.service';
import { LlmDialogService } from './services/llm-dialog.service';
import { LlmSendMessageService } from './services/llm-send-message.service';
import { PrismaService } from './services/prisma.service';
import { TraceModule } from './trace/trace.module';

@Module({
  imports: [
    JwtModule,
    TraceModule.forRoot({
      saveTracesAsMermaid: true,
    }),
  ],
  controllers: [...CONTROLLERS, FlowController],
  providers: [
    PrismaService,
    LlmBootstrapService,
    LlmSendMessageService,
    LlmDialogService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
