import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { DialogManager } from '../llm/dialogManager';
import { LlmBootstrapService } from '../services/llm-bootstrap.service';
import { LlmDialogService } from '../services/llm-dialog.service';
import { LlmSendMessageService } from '../services/llm-send-message.service';
import {
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
} from '../services/prisma.service';
import { AppRequest } from '../types/request';
import { StatusResponse } from '../types/status-response';

///////////

export class Constant {
  @ApiProperty({ type: 'string', required: true })
  @IsDefined()
  @IsString()
  key!: string;

  @ApiProperty({ type: 'string', required: true })
  @IsDefined()
  @IsString()
  constant!: string;
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

  @ApiPropertyOptional({
    type: () => [Constant],
    required: false,
    nullable: true,
  })
  @IsOptional()
  @Type(() => Constant)
  constants?: Constant[];
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
    type: 'boolean',
  })
  @IsDefined()
  isProcessing!: boolean;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsDefined()
  questionReceivedAt!: Date | null;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsDefined()
  answerSentAt!: Date | null;

  @ApiProperty({ type: 'string' })
  @IsString()
  dialogId!: string;
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
    private readonly llmBootstrapService: LlmBootstrapService,
  ) {}

  @Get('dialog')
  @ApiOkResponse({ type: DialogFlowResponse })
  async dialog(
    @CurrentAppRequest() req: AppRequest,
    @Query() args: DialogFlowArgs,
  ): Promise<DialogFlowResponse> {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const response =
      !args.dialogId || args.dialogId === 'null'
        ? { messages: [], totalCount: 0 }
        : await this.llmDialogService.getDialogMessages({
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
        isProcessing: m.isProcessing,
        questionReceivedAt: m.questionReceivedAt,
        answerSentAt: m.answerSentAt,
        dialogId: m.dialogId,
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
  @ApiCreatedResponse({ type: DialogMessage })
  async messageSend(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: SendMessageFlowArgs,
  ): Promise<DialogMessage> {
    const result = await this.llmSendMessageService.createMessage({
      message: args.message,
      dialogId: args.dialogId,
      constants: args.constants
        ? Object.fromEntries(args.constants.map((c) => [c.key, c.constant]))
        : {},
      userId: req.userId,
    });

    this.llmBootstrapService.addMessageToProccess({
      messageId: result.id,
      dialogId: result.dialogId!,
      userId: req.userId,
      maxRetries: 3,
      provider: args.provider,
      model: args.model,
      temperature: args.temperature,
    });

    return {
      id: result.id,
      answerSentAt: result.answerSentAt,
      questionReceivedAt: result.questionReceivedAt,
      question: result.question,
      answer: result.answer,
      isProcessing: result.isProcessing,
      dialogId: result.dialogId!,
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
