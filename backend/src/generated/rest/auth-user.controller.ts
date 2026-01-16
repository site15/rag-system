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
import { AuthUserDto } from './auth-user.dto';
import { AuthUser } from './auth-user.entity';
import { CreateAuthUserDto } from './create-auth-user.dto';
import { UpdateAuthUserDto } from './update-auth-user.dto';

export class FindManyAuthUserArgs extends FindManyArgs {}

export class FindManyAuthUserResponseMeta extends FindManyResponseMeta {}

export class FindManyAuthUserResponse {
  @ApiProperty({ type: () => [AuthUser] })
  items!: AuthUser[];

  @ApiProperty({ type: () => FindManyAuthUserResponseMeta })
  meta!: FindManyAuthUserResponseMeta;
}

@ApiTags('auth')
@Controller('auth/user')
export class AuthUserController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyAuthUserResponse })
  async findMany(@Query() args: FindManyAuthUserArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.AuthUserScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const authUserWhereInput: Prisma.AuthUserWhereInput = {
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
        items: await prisma.authUser.findMany({
          where: authUserWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.authUser.count({
          where: authUserWhereInput,
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
  @ApiCreatedResponse({ type: AuthUserDto })
  async createOne(@Body() args: CreateAuthUserDto) {
    return await this.prismaservice.authUser.create({
      data: {
        ...args,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: AuthUserDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateAuthUserDto,
  ) {
    return await this.prismaservice.authUser.update({
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
    await this.prismaservice.authUser.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: AuthUserDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.authUser.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
