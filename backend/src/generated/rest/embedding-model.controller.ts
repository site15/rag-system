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
import { EmbeddingModelDto } from './embedding-model.dto';
import { EmbeddingModel } from './embedding-model.entity';
import { CreateEmbeddingModelDto } from './create-embedding-model.dto';
import { UpdateEmbeddingModelDto } from './update-embedding-model.dto';

export class FindManyEmbeddingModelArgs extends FindManyArgs {}

export class FindManyEmbeddingModelResponseMeta {
  @ApiPropertyOptional({ type: Number })
  curPage?: number;

  @ApiPropertyOptional({ type: Number })
  perPage?: number;

  @ApiProperty({ type: Number })
  totalResults!: number;
}

export class FindManyEmbeddingModelResponse {
  @ApiProperty({ type: () => [EmbeddingModel] })
  embeddingmodels!: EmbeddingModel[];

  @ApiProperty({ type: () => FindManyEmbeddingModelResponseMeta })
  meta!: FindManyEmbeddingModelResponseMeta;
}

@ApiTags('embeddingmodel')
@Controller('embeddingmodels')
export class EmbeddingModelController {
  constructor(private readonly prismaservice: PrismaService) {}

  @Get()
  @ApiOkResponse({ type: FindManyEmbeddingModelResponse })
  async findMany(@Query() args: FindManyEmbeddingModelArgs) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.EmbeddingModelScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );
    const result = await this.prismaservice.$transaction(async (prisma) => {
      return {
        embeddingmodels: await prisma.embeddingModel.findMany({
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
        totalResults: await prisma.embeddingModel.count({
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
      embeddingmodels: result.embeddingmodels,
      meta: {
        totalResults: result.totalResults,
        curPage,
        perPage,
      },
    };
  }

  @Post()
  @ApiCreatedResponse({ type: EmbeddingModelDto })
  async createOne(@Body() args: CreateEmbeddingModelDto) {
    return await this.prismaservice.embeddingModel.create({
      data: {
        ...args,
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: EmbeddingModelDto })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateEmbeddingModelDto,
  ) {
    return await this.prismaservice.embeddingModel.update({
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
    await this.prismaservice.embeddingModel.delete({
      where: {
        id,
      },
    });
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: EmbeddingModelDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.prismaservice.embeddingModel.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
