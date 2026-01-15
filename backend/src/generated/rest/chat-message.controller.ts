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
import { AppRequest, CurrentAppRequest } from '../../types/request';
import { StatusResponse } from '../../types/status-response';
import { ChatMessageDto } from './chat-message.dto';
import { ChatMessage } from './chat-message.entity';
import { CreateChatMessageDto } from './create-chat-message.dto';
import { UpdateChatMessageDto } from './update-chat-message.dto';

export class FindManyChatMessageArgs extends FindManyArgs {}

export class FindManyChatMessageResponseMeta {
  @ApiPropertyOptional({ type: Number })
  curPage?: number;

  @ApiPropertyOptional({ type: Number })
  perPage?: number;

  @ApiProperty({ type: Number })
  totalResults!: number;
}

export class FindManyChatMessageResponse {
  @ApiProperty({ type: () => [ChatMessage] })
  chatmessages!: ChatMessage[];

  @ApiProperty({ type: () => FindManyChatMessageResponseMeta })
  meta!: FindManyChatMessageResponseMeta;
}

@ApiTags('chatmessage')
@Controller('chatmessages')
export class ChatMessageController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyChatMessageResponse })
  async findMany(@Query() args: FindManyChatMessageArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.ChatMessageScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );
    const result = await this.prismaservice.$transaction(async (prisma) => {
      return {
        chatmessages: await prisma.chatMessage.findMany({
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
        totalResults: await prisma.chatMessage.count({
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
      chatmessages: result.chatmessages,
      meta: {
        totalResults: result.totalResults,
        curPage,
        perPage,
      },
    };
  }

  @Post()
  @ApiCreatedResponse({ type: ChatMessageDto })
  async createOne(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: CreateChatMessageDto,
  ) {
    return await this.prismaservice.chatMessage.create({
      data: {
        ...args,
        userId: req.user.id,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: ChatMessageDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateChatMessageDto,
  ) {
    return await this.prismaservice.chatMessage.update({
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
    await this.prismaservice.chatMessage.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: ChatMessageDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.chatMessage.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
