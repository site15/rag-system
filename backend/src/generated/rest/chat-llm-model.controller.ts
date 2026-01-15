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
import { Prisma } from '../prisma/client';
import { ChatLlmModelDto } from './chat-llm-model.dto';
import { ChatLlmModel } from './chat-llm-model.entity';
import { CreateChatLlmModelDto } from './create-chat-llm-model.dto';
import { UpdateChatLlmModelDto } from './update-chat-llm-model.dto';

export class FindManyChatLlmModelArgs extends FindManyArgs {}

export class FindManyChatLlmModelResponseMeta {
  @ApiPropertyOptional({ type: Number })
  curPage?: number;

  @ApiPropertyOptional({ type: Number })
  perPage?: number;

  @ApiProperty({ type: Number })
  totalResults!: number;
}

export class FindManyChatLlmModelResponse {
  @ApiProperty({ type: () => [ChatLlmModel] })
  items!: ChatLlmModel[];

  @ApiProperty({ type: () => FindManyChatLlmModelResponseMeta })
  meta!: FindManyChatLlmModelResponseMeta;
}

@ApiTags('chat')
@Controller('chat/llm-model')
export class ChatLlmModelController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyChatLlmModelResponse })
  async findMany(@Query() args: FindManyChatLlmModelArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.ChatLlmModelScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const chatLlmModelWhereInput: Prisma.ChatLlmModelWhereInput = {
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
        items: await prisma.chatLlmModel.findMany({
          where: chatLlmModelWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.chatLlmModel.count({
          where: chatLlmModelWhereInput,
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
  @ApiCreatedResponse({ type: ChatLlmModelDto })
  async createOne(@Body() args: CreateChatLlmModelDto) {
    return await this.prismaservice.chatLlmModel.create({
      data: {
        ...args,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: ChatLlmModelDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateChatLlmModelDto,
  ) {
    return await this.prismaservice.chatLlmModel.update({
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
    await this.prismaservice.chatLlmModel.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: ChatLlmModelDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.chatLlmModel.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
