import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsOptional } from 'class-validator';
import { LlmDialogService } from '../services/llm-dialog.service';
import { LlmSendMessageService } from '../services/llm-send-message.service';
import {
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
} from '../services/prisma.service';
import { Trace } from '../trace/trace.module';
import { AppRequest, CurrentAppRequest } from '../types/request';

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
}

export class SendMessageFlowArgs {
  @ApiProperty({ type: String })
  @IsDefined()
  message!: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  dialogId?: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @Type(() => Boolean)
  goodResponse?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @Type(() => Boolean)
  badResponse?: boolean;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  provider?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  temperature?: number;
}

///////////

export class DialogFlowArgs extends FindManyArgs {
  @ApiProperty({ type: String })
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

@ApiTags('flow')
@Controller('flow')
export class FlowController {
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

  @Post('send-message')
  @ApiCreatedResponse({ type: SendMessageFlowResponse })
  @Trace()
  async sendMessage(
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

    return {
      dialogId: result.dialogId,
      question: args.message,
      answer: result.response,
    };
  }
}
