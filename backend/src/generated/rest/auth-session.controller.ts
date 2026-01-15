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
import { AuthSessionDto } from './auth-session.dto';
import { AuthSession } from './auth-session.entity';
import { CreateAuthSessionDto } from './create-auth-session.dto';
import { UpdateAuthSessionDto } from './update-auth-session.dto';

export class FindManyAuthSessionArgs extends FindManyArgs {}

export class FindManyAuthSessionResponseMeta {
  @ApiPropertyOptional({ type: Number })
  curPage?: number;

  @ApiPropertyOptional({ type: Number })
  perPage?: number;

  @ApiProperty({ type: Number })
  totalResults!: number;
}

export class FindManyAuthSessionResponse {
  @ApiProperty({ type: () => [AuthSession] })
  authsessions!: AuthSession[];

  @ApiProperty({ type: () => FindManyAuthSessionResponseMeta })
  meta!: FindManyAuthSessionResponseMeta;
}

@ApiTags('authsession')
@Controller('authsessions')
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
    const result = await this.prismaservice.$transaction(async (prisma) => {
      return {
        authsessions: await prisma.authSession.findMany({
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
        totalResults: await prisma.authSession.count({
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
      authsessions: result.authsessions,
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
