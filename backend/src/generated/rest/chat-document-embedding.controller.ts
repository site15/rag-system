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
import { ChatDocumentEmbeddingDto } from './chat-document-embedding.dto';
import { ChatDocumentEmbedding } from './chat-document-embedding.entity';
import { CreateChatDocumentEmbeddingDto } from './create-chat-document-embedding.dto';
import { UpdateChatDocumentEmbeddingDto } from './update-chat-document-embedding.dto';

export class FindManyChatDocumentEmbeddingArgs extends FindManyArgs {}

export class FindManyChatDocumentEmbeddingResponseMeta extends FindManyResponseMeta {}

export class FindManyChatDocumentEmbeddingResponse {
  @ApiProperty({ type: () => [ChatDocumentEmbedding] })
  items!: ChatDocumentEmbedding[];

  @ApiProperty({ type: () => FindManyChatDocumentEmbeddingResponseMeta })
  meta!: FindManyChatDocumentEmbeddingResponseMeta;
}

@ApiTags('chat')
@Controller('chat/document-embedding')
export class ChatDocumentEmbeddingController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyChatDocumentEmbeddingResponse })
  async findMany(@Query() args: FindManyChatDocumentEmbeddingArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.ChatDocumentEmbeddingScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const chatDocumentEmbeddingWhereInput: Prisma.ChatDocumentEmbeddingWhereInput =
      {
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
        items: await prisma.chatDocumentEmbedding.findMany({
          where: chatDocumentEmbeddingWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.chatDocumentEmbedding.count({
          where: chatDocumentEmbeddingWhereInput,
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
  @ApiCreatedResponse({ type: ChatDocumentEmbeddingDto })
  async createOne(@Body() args: CreateChatDocumentEmbeddingDto) {
    return await this.prismaservice.chatDocumentEmbedding.create({
      data: {
        ...args,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: ChatDocumentEmbeddingDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateChatDocumentEmbeddingDto,
  ) {
    return await this.prismaservice.chatDocumentEmbedding.update({
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
    await this.prismaservice.chatDocumentEmbedding.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: ChatDocumentEmbeddingDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.chatDocumentEmbedding.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
