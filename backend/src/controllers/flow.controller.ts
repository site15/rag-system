import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { DialogManager } from '../llm/dialogManager';
import { LlmDialogService } from '../services/llm-dialog.service';
import { LlmSendMessageService } from '../services/llm-send-message.service';
import {
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
} from '../services/prisma.service';
import { getTraceStack } from '../trace/trace.module';
import { AppRequest } from '../types/request';
import { StatusResponse } from '../types/status-response';

///////////
export class SendMessageFlowResponse {
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  @IsDefined()
  dialogId!: string | null;

  @ApiProperty({
    type: 'string',
  })
  @IsDefined()
  question!: string;

  @ApiProperty({
    type: 'string',
  })
  @IsDefined()
  answer!: string;

  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  @IsDefined()
  messageId!: string | null;
}

export class SendMessageFlowArgs {
  @ApiProperty({ type: 'string', required: true })
  @IsDefined()
  @IsString()
  message!: string;

  @ApiPropertyOptional({ type: 'string', required: false, nullable: true })
  @IsOptional()
  @IsString()
  dialogId?: string;

  @ApiPropertyOptional({ type: 'boolean', required: false, nullable: true })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  goodResponse?: boolean;

  @ApiPropertyOptional({ type: 'boolean', required: false, nullable: true })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  badResponse?: boolean;

  @ApiPropertyOptional({ type: 'string', required: false, nullable: true })
  @IsOptional()
  provider?: string;

  @ApiPropertyOptional({ type: 'string', required: false, nullable: true })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ type: 'number', required: false, nullable: true })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  temperature?: number;
}

///////////

export class DialogFlowArgs extends FindManyArgs {
  @ApiProperty({ type: 'string' })
  @IsDefined()
  dialogId!: string;
}

export class DialogFlowResponseMeta extends FindManyResponseMeta {}

export class DialogMessage {
  @ApiProperty({
    type: 'string',
  })
  @IsDefined()
  id!: string;

  @ApiProperty({
    type: 'string',
  })
  @IsDefined()
  question!: string;

  @ApiProperty({
    type: 'string',
  })
  @IsDefined()
  answer!: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsDefined()
  createdAt!: Date;
}

export class DialogFlowResponse {
  @ApiProperty({ type: () => [DialogMessage] })
  @IsDefined()
  items!: DialogMessage[];

  @ApiProperty({ type: () => DialogFlowResponseMeta })
  @IsDefined()
  meta!: DialogFlowResponseMeta;
}

///////////

export class GetMessageTraceArgs {
  @ApiProperty({ type: 'string', required: true })
  @IsDefined()
  @IsString()
  messageId!: string;
}

export class GetMessageTraceResponse {
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  @IsDefined()
  messageId!: string | null;

  @ApiProperty({
    type: 'object',
    nullable: true,
    description: 'Trace data for the message',
    additionalProperties: true,
  })
  @IsDefined()
  trace!: any | null;
}

///////////

export class CancelMessageArgs {
  @ApiProperty({ type: 'string', required: true })
  @IsDefined()
  @IsString()
  messageId!: string;
}

///////////

@ApiTags('flow')
@Controller('flow')
export class FlowController {
  private readonly logger = new Logger(FlowController.name);

  constructor(
    private readonly llmDialogService: LlmDialogService,
    private readonly llmSendMessageService: LlmSendMessageService,
  ) {}

  @Get('dialog')
  @ApiOkResponse({ type: DialogFlowResponse })
  async dialog(
    @CurrentAppRequest() req: AppRequest,
    @Query() args: DialogFlowArgs,
  ): Promise<DialogFlowResponse> {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const response = await this.llmDialogService.getDialogMessages({
      dialogId: args.dialogId,
      take,
      skip,
      userId: req.userId,
    });
    return {
      items: (response.messages || []).map((m) => ({
        id: m.id,
        question: m.question,
        answer: m.answer,
        createdAt: m.createdAt,
      })),
      meta: { curPage, perPage, totalResults: response.totalCount },
    };
  }

  @Get('message/trace')
  @ApiOkResponse({ type: GetMessageTraceResponse })
  async getMessageTrace(
    @CurrentAppRequest() req: AppRequest,
    @Query() args: GetMessageTraceArgs,
  ): Promise<GetMessageTraceResponse> {
    const trace = await DialogManager.getMessageTrace(args.messageId);

    return {
      messageId: args.messageId,
      trace: trace,
    };
  }

  @Post('message/send')
  @ApiCreatedResponse({ type: SendMessageFlowResponse })
  async messageSend(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SendMessageFlowArgs,
  ): Promise<SendMessageFlowResponse> {
    const result = await this.llmSendMessageService.processMessageWithRetry({
      messageRequest: {
        message: args.message,
        dialogId: args.dialogId,
        goodResponse: args.goodResponse,
        badResponse: args.badResponse,
        provider: args.provider,
        model: args.model,
        temperature: args.temperature,
      },
      userId: req.userId,
      maxRetries: 3,
    });

    DialogManager.setMessageTrace(result.messageId, getTraceStack()).catch(
      (error) => this.logger.error(error, error.stack),
    );

    return {
      messageId: result.messageId,
      dialogId: result.dialogId,
      question: args.message,
      answer: result.response,
    };
  }

  @Post('message/cancel')
  @ApiCreatedResponse({ type: StatusResponse })
  async cancelMessage(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: CancelMessageArgs,
  ): Promise<StatusResponse> {
    await DialogManager.deleteMessage(args.messageId);

    return {
      message: 'ok',
    };
  }
}
