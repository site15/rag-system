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
import { CurrentAppRequest } from '../../decorators/current-app-request.decorator';
import {
  FindManyArgs,
  FindManyResponseMeta,
  getFirstSkipFromCurPerPage,
  PrismaSdk,
  PrismaService,
} from '../../services/prisma.service';
import { AppRequest } from '../../types/request';
import { StatusResponse } from '../../types/status-response';
import { Prisma } from '../prisma/client';
import { AuthSessionDto } from './auth-session.dto';
import { AuthSession } from './auth-session.entity';
import { CreateAuthSessionDto } from './create-auth-session.dto';
import { UpdateAuthSessionDto } from './update-auth-session.dto';

export class FindManyAuthSessionArgs extends FindManyArgs {}

export class FindManyAuthSessionResponseMeta extends FindManyResponseMeta {}

export class FindManyAuthSessionResponse {
  @ApiProperty({ type: () => [AuthSession] })
  items!: AuthSession[];

  @ApiProperty({ type: () => FindManyAuthSessionResponseMeta })
  meta!: FindManyAuthSessionResponseMeta;
}

@ApiTags('auth')
@Controller('auth/session')
export class AuthSessionController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyAuthSessionResponse })
  async findMany(@Query() args: FindManyAuthSessionArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.AuthSessionScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const authSessionWhereInput: Prisma.AuthSessionWhereInput = {
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
        items: await prisma.authSession.findMany({
          where: authSessionWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.authSession.count({
          where: authSessionWhereInput,
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
  @ApiCreatedResponse({ type: AuthSessionDto })
  async createOne(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: CreateAuthSessionDto,
  ) {
    return await this.prismaservice.authSession.create({
      data: {
        ...args,
        userId: req.user.id,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: AuthSessionDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateAuthSessionDto,
  ) {
    return await this.prismaservice.authSession.update({
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
    await this.prismaservice.authSession.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: AuthSessionDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.authSession.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
