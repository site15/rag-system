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
import { AuthApiKeyDto } from './auth-api-key.dto';
import { AuthApiKey } from './auth-api-key.entity';
import { CreateAuthApiKeyDto } from './create-auth-api-key.dto';
import { UpdateAuthApiKeyDto } from './update-auth-api-key.dto';

export class FindManyAuthApiKeyArgs extends FindManyArgs {}

export class FindManyAuthApiKeyResponseMeta extends FindManyResponseMeta {}

export class FindManyAuthApiKeyResponse {
  @ApiProperty({ type: () => [AuthApiKey] })
  items!: AuthApiKey[];

  @ApiProperty({ type: () => FindManyAuthApiKeyResponseMeta })
  meta!: FindManyAuthApiKeyResponseMeta;
}

@ApiTags('auth')
@Controller('auth/api-key')
export class AuthApiKeyController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyAuthApiKeyResponse })
  async findMany(@Query() args: FindManyAuthApiKeyArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.AuthApiKeyScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const authApiKeyWhereInput: Prisma.AuthApiKeyWhereInput = {
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
        items: await prisma.authApiKey.findMany({
          where: authApiKeyWhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.authApiKey.count({
          where: authApiKeyWhereInput,
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
  @ApiCreatedResponse({ type: AuthApiKeyDto })
  async createOne(
    @CurrentAppRequest() req: AppRequest,
    @Body() args: CreateAuthApiKeyDto,
  ) {
    return await this.prismaservice.authApiKey.create({
      data: {
        ...args,
        userId: req.user.id,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: AuthApiKeyDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateAuthApiKeyDto,
  ) {
    return await this.prismaservice.authApiKey.update({
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
    await this.prismaservice.authApiKey.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: AuthApiKeyDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.authApiKey.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
