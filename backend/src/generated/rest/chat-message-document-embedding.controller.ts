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
import { ChatMessageDocumentEmbeddingDto } from './chat-message-document-embedding.dto';
import { ChatMessageDocumentEmbedding } from './chat-message-document-embedding.entity';
import { CreateChatMessageDocumentEmbeddingDto } from './create-chat-message-document-embedding.dto';
import { UpdateChatMessageDocumentEmbeddingDto } from './update-chat-message-document-embedding.dto';

export class FindManyChatMessageDocumentEmbeddingArgs extends FindManyArgs {}

export class FindManyChatMessageDocumentEmbeddingResponseMeta {
  @ApiPropertyOptional({ type: Number })
  curPage?: number;

  @ApiPropertyOptional({ type: Number })
  perPage?: number;

  @ApiProperty({ type: Number })
  totalResults!: number;
}

export class FindManyChatMessageDocumentEmbeddingResponse {
  @ApiProperty({ type: () => [ChatMessageDocumentEmbedding] })
  chatmessagedocumentembeddings!: ChatMessageDocumentEmbedding[];

  @ApiProperty({ type: () => FindManyChatMessageDocumentEmbeddingResponseMeta })
  meta!: FindManyChatMessageDocumentEmbeddingResponseMeta;
}

@ApiTags('chatmessagedocumentembedding')
@Controller('chatmessagedocumentembeddings')
export class ChatMessageDocumentEmbeddingController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyChatMessageDocumentEmbeddingResponse })
  async findMany(@Query() args: FindManyChatMessageDocumentEmbeddingArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in
          PrismaSdk.Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );
    const result = await this.prismaservice.$transaction(async (prisma) => {
      return {
        chatmessagedocumentembeddings:
          await prisma.chatMessageDocumentEmbedding.findMany({
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
        totalResults: await prisma.chatMessageDocumentEmbedding.count({
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
      chatmessagedocumentembeddings: result.chatmessagedocumentembeddings,
      meta: {
        totalResults: result.totalResults,
        curPage,
        perPage,
      },
    };
  }

  @Post()
  @ApiCreatedResponse({ type: ChatMessageDocumentEmbeddingDto })
  async createOne(@Body() args: CreateChatMessageDocumentEmbeddingDto) {
    return await this.prismaservice.chatMessageDocumentEmbedding.create({
      data: {
        ...args,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: ChatMessageDocumentEmbeddingDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateChatMessageDocumentEmbeddingDto,
  ) {
    return await this.prismaservice.chatMessageDocumentEmbedding.update({
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
    await this.prismaservice.chatMessageDocumentEmbedding.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: ChatMessageDocumentEmbeddingDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.chatMessageDocumentEmbedding.findFirstOrThrow(
      {
        where: {
          id,
        },
      },
    );
  }
}
