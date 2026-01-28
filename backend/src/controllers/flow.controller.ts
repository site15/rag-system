import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentAppRequest } from '../decorators/current-app-request.decorator';
import { DialogManager } from '../llm/dialogManager';
import { LlmBootstrapService } from '../services/llm-bootstrap.service';
import { LlmDialogService } from '../services/llm-dialog.service';
import { LlmSendMessageService } from '../services/llm-send-message.service';
import { getFirstSkipFromCurPerPage } from '../services/prisma.service';
import {
  CancelMessageArgs,
  DialogFlowArgs,
  DialogFlowResponse,
  DialogMessage,
  GetMessageTraceArgs,
  GetMessageTraceResponse,
  SendMessageFlowArgs,
} from '../types/flow';
import { AppRequest } from '../types/request';
import { StatusResponse } from '../types/status-response';

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
            showPrompts: !!args.showPrompts,
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
        info: m.info,
        prompts: m.prompts,
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
      ...(result.provider && result.model && result.temperature
        ? { info: `${result.provider}/${result.model}:${result.temperature}` }
        : { info: '' }),
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
