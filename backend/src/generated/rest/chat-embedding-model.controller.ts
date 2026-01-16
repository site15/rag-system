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
import { ChatEmbeddingModelDto } from './chat-embedding-model.dto';
import { ChatEmbeddingModel } from './chat-embedding-model.entity';
import { CreateChatEmbeddingModelDto } from './create-chat-embedding-model.dto';
import { UpdateChatEmbeddingModelDto } from './update-chat-embedding-model.dto';

export class FindManyChatEmbeddingModelArgs extends FindManyArgs {}

export class FindManyChatEmbeddingModelResponseMeta extends FindManyResponseMeta {}

export class FindManyChatEmbeddingModelResponse {
  @ApiProperty({ type: () => [ChatEmbeddingModel] })
  items!: ChatEmbeddingModel[];

  @ApiProperty({ type: () => FindManyChatEmbeddingModelResponseMeta })
  meta!: FindManyChatEmbeddingModelResponseMeta;
}

@ApiTags('chat')
@Controller('chat/embedding-model')
export class ChatEmbeddingModelController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyChatEmbeddingModelResponse })
  async findMany(@Query() args: FindManyChatEmbeddingModelArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.ChatEmbeddingModelScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const chatEmbeddingModelWhereInput: Prisma.ChatEmbeddingModelWhereInput = {
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
        items: await prisma.chatEmbeddingModel.findMany({
          where: chatEmbeddingModelWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.chatEmbeddingModel.count({
          where: chatEmbeddingModelWhereInput,
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
  @ApiCreatedResponse({ type: ChatEmbeddingModelDto })
  async createOne(@Body() args: CreateChatEmbeddingModelDto) {
    return await this.prismaservice.chatEmbeddingModel.create({
      data: {
        ...args,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: ChatEmbeddingModelDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateChatEmbeddingModelDto,
  ) {
    return await this.prismaservice.chatEmbeddingModel.update({
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
    await this.prismaservice.chatEmbeddingModel.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: ChatEmbeddingModelDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.chatEmbeddingModel.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
