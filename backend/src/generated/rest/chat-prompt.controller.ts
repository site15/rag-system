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
import { ChatPromptDto } from './chat-prompt.dto';
import { ChatPrompt } from './chat-prompt.entity';
import { CreateChatPromptDto } from './create-chat-prompt.dto';
import { UpdateChatPromptDto } from './update-chat-prompt.dto';

export class FindManyChatPromptArgs extends FindManyArgs {}

export class FindManyChatPromptResponseMeta extends FindManyResponseMeta {}

export class FindManyChatPromptResponse {
  @ApiProperty({ type: () => [ChatPrompt] })
  items!: ChatPrompt[];

  @ApiProperty({ type: () => FindManyChatPromptResponseMeta })
  meta!: FindManyChatPromptResponseMeta;
}

@ApiTags('chat')
@Controller('chat/prompt')
export class ChatPromptController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyChatPromptResponse })
  async findMany(@Query() args: FindManyChatPromptArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.ChatPromptScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const chatPromptWhereInput: Prisma.ChatPromptWhereInput = {
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
        items: await prisma.chatPrompt.findMany({
          where: chatPromptWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.chatPrompt.count({
          where: chatPromptWhereInput,
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
  @ApiCreatedResponse({ type: ChatPromptDto })
  async createOne(@Body() args: CreateChatPromptDto) {
    return await this.prismaservice.chatPrompt.create({
      data: {
        ...args,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: ChatPromptDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateChatPromptDto,
  ) {
    return await this.prismaservice.chatPrompt.update({
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
    await this.prismaservice.chatPrompt.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: ChatPromptDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.chatPrompt.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
