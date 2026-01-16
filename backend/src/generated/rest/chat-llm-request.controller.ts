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
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
  PrismaSdk,
  PrismaService,
} from '../../services/prisma.service';
import { StatusResponse } from '../../types/status-response';
import { Prisma } from '../prisma/client';
import { ChatLlmRequestDto } from './chat-llm-request.dto';
import { ChatLlmRequest } from './chat-llm-request.entity';
import { CreateChatLlmRequestDto } from './create-chat-llm-request.dto';
import { UpdateChatLlmRequestDto } from './update-chat-llm-request.dto';

export class FindManyChatLlmRequestArgs extends FindManyArgs {}

export class FindManyChatLlmRequestResponseMeta extends FindManyResponseMeta {}

export class FindManyChatLlmRequestResponse {
  @ApiProperty({ type: () => [ChatLlmRequest] })
  items!: ChatLlmRequest[];

  @ApiProperty({ type: () => FindManyChatLlmRequestResponseMeta })
  meta!: FindManyChatLlmRequestResponseMeta;
}

@ApiTags('chat')
@Controller('chat/llm-request')
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

    const chatLlmRequestWhereInput: Prisma.ChatLlmRequestWhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
            ],
          }
        : {}),
    };

    const result = await this.prismaservice.$transaction(async (prisma) => {
      return {
        items: await prisma.chatLlmRequest.findMany({
          where: chatLlmRequestWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.chatLlmRequest.count({
          where: chatLlmRequestWhereInput,
        }),
      };
    });
    return {
      items: result.items,
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
