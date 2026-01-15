import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import {
  FindManyArgs,
  getFirstSkipFromCurPerPage,
  PrismaSdk,
  PrismaService,
} from '../../services/prisma.service';
import { StatusResponse } from '../../types/status-response';
import { ChatLlmRequestDto } from './chat-llm-request.dto';
import { ChatLlmRequest } from './chat-llm-request.entity';
import { CreateChatLlmRequestDto } from './create-chat-llm-request.dto';
import { UpdateChatLlmRequestDto } from './update-chat-llm-request.dto';

export class FindManyChatLlmRequestArgs extends FindManyArgs {}

export class FindManyChatLlmRequestResponseMeta {
  @ApiPropertyOptional({ type: Number })
  curPage?: number;

  @ApiPropertyOptional({ type: Number })
  perPage?: number;

  @ApiProperty({ type: Number })
  totalResults!: number;
}

export class FindManyChatLlmRequestResponse {
  @ApiProperty({ type: () => [ChatLlmRequest] })
  chatllmrequests!: ChatLlmRequest[];

  @ApiProperty({ type: () => FindManyChatLlmRequestResponseMeta })
  meta!: FindManyChatLlmRequestResponseMeta;
}

@ApiTags('chatllmrequest')
@Controller('chatllmrequests')
export class ChatLlmRequestController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyChatLlmRequestResponse })
  async findMany(@Query() args: FindManyChatLlmRequestArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.ChatLlmRequestScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );
    const result = await this.prismaservice.$transaction(async (prisma) => {
      return {
        chatllmrequests: await prisma.chatLlmRequest.findMany({
          where: {
            ...(searchText
              ? {
                  OR: [
                    ...(isUUID(searchText)
                      ? [{ id: { equals: searchText } }]
                      : []),
                  ],
                }
              : {}),
          },
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.chatLlmRequest.count({
          where: {
            ...(searchText
              ? {
                  OR: [
                    ...(isUUID(searchText)
                      ? [{ id: { equals: searchText } }]
                      : []),
                  ],
                }
              : {}),
          },
        }),
      };
    });
    return {
      chatllmrequests: result.chatllmrequests,
      meta: {
        totalResults: result.totalResults,
        curPage,
        perPage,
      },
    };
  }

  @Post()
  @ApiCreatedResponse({ type: ChatLlmRequestDto })
  async createOne(@Body() args: CreateChatLlmRequestDto) {
    return await this.prismaservice.chatLlmRequest.create({
      data: {
        ...args,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: ChatLlmRequestDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateChatLlmRequestDto,
  ) {
    return await this.prismaservice.chatLlmRequest.update({
      data: {
        ...args,
        updatedAt: new Date(),
      },
      where: {
        id,
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.prismaservice.chatLlmRequest.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: ChatLlmRequestDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.chatLlmRequest.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
