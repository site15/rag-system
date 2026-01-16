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
import { AppRequest, CurrentAppRequest } from '../../types/request';
import { StatusResponse } from '../../types/status-response';
import { Prisma } from '../prisma/client';
import { ChatDialogDto } from './chat-dialog.dto';
import { ChatDialog } from './chat-dialog.entity';
import { CreateChatDialogDto } from './create-chat-dialog.dto';
import { UpdateChatDialogDto } from './update-chat-dialog.dto';

export class FindManyChatDialogArgs extends FindManyArgs {}

export class FindManyChatDialogResponseMeta extends FindManyResponseMeta {}

export class FindManyChatDialogResponse {
  @ApiProperty({ type: () => [ChatDialog] })
  items!: ChatDialog[];

  @ApiProperty({ type: () => FindManyChatDialogResponseMeta })
  meta!: FindManyChatDialogResponseMeta;
}

@ApiTags('chat')
@Controller('chat/dialog')
export class ChatDialogController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyChatDialogResponse })
  async findMany(@Query() args: FindManyChatDialogArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.ChatDialogScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const chatDialogWhereInput: Prisma.ChatDialogWhereInput = {
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
        items: await prisma.chatDialog.findMany({
          where: chatDialogWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.chatDialog.count({
          where: chatDialogWhereInput,
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
  @ApiCreatedResponse({ type: ChatDialogDto })
  async createOne(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: CreateChatDialogDto,
  ) {
    return await this.prismaservice.chatDialog.create({
      data: {
        ...args,
        userId: req.user.id,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: ChatDialogDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateChatDialogDto,
  ) {
    return await this.prismaservice.chatDialog.update({
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
    await this.prismaservice.chatDialog.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: ChatDialogDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.chatDialog.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
