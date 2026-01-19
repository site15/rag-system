import { kebab } from 'case';
import { TemplateHelpers } from './template-helpers';
import { ControllerParams } from './types';

export const generateController = ({
  model,
  fields,
  imports,
  apiExtraModels,
  templateHelpers,
}: ControllerParams & { templateHelpers: TemplateHelpers }): string => {
  const { entityName, createDtoName, updateDtoName, plainDtoName } =
    templateHelpers;

  const modelName = model.name;
  const entityClassName = entityName(modelName);
  const createDtoClassName = createDtoName(modelName);
  const updateDtoClassName = updateDtoName(modelName);
  const plainDtoClassName = plainDtoName(modelName);

  const controllerName = `${entityClassName}Controller`;
  const serviceName = 'PrismaService';
  const findManyArgsName = `FindMany${entityClassName}Args`;
  const findManyResponseName = `FindMany${entityClassName}Response`;
  const findManyResponseMetaName = `FindMany${entityClassName}ResponseMeta`;

  // Determine base path for controller
  const kebabModelName = kebab(modelName).toLowerCase();
  const kebabModelNameArray = kebabModelName.split('-');
  const apiTagName = kebabModelNameArray[0];
  const basePath = `${apiTagName}/${kebabModelNameArray.slice(1).join('-')}`;

  // Convert PascalCase model name to camelCase for Prisma calls
  const prismaModelName =
    modelName.charAt(0).toLowerCase() + modelName.slice(1);

  // Check if model has deletedAt field for soft delete support
  const hasDeletedAt = fields.some((f) => f.name === 'deletedAt');

  return `import {
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
${
  fields.find((f) => f.name === 'userId')
    ? `import { AppRequest, CurrentAppRequest } from '../../types/request';`
    : ''
}import { StatusResponse } from '../../types/status-response';
import { Prisma } from '../prisma/client';
import { ${plainDtoClassName} } from './${templateHelpers.plainDtoFilename(modelName, false).replace('.ts', '')}';
import { ${entityClassName} } from './${templateHelpers.entityFilename(modelName, false).replace('.ts', '')}';
import { ${createDtoClassName} } from './${templateHelpers.createDtoFilename(modelName, false).replace('.ts', '')}';
import { ${updateDtoClassName} } from './${templateHelpers.updateDtoFilename(modelName, false).replace('.ts', '')}';

export class ${findManyArgsName} extends FindManyArgs {}

export class ${findManyResponseMetaName} extends FindManyResponseMeta {}

export class ${findManyResponseName} {
  @ApiProperty({ type: () => [${entityClassName}] })
  items!: ${entityClassName}[];

  @ApiProperty({ type: () => ${findManyResponseMetaName} })
  meta!: ${findManyResponseMetaName};
}

@ApiTags('${apiTagName}')
@Controller('${basePath}')
export class ${controllerName} {
  constructor(private readonly ${serviceName.toLowerCase()}: ${serviceName}) {}

  @Get()
  @ApiOkResponse({ type: ${findManyResponseName} })
  async findMany(@Query() args: ${findManyArgsName}) {
    const { skip, take, curPage, perPage } = getFirstSkipFromCurPerPage(args);
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in PrismaSdk.Prisma.${entityClassName}ScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );

    const ${prismaModelName}WhereInput: Prisma.${entityClassName}WhereInput = {
      ...(searchText
        ? {
            OR: [
              ...(isUUID(searchText) ? [{ id: { equals: searchText } }] : []),
            ],
          }
        : {}),
      ${hasDeletedAt ? 'deletedAt: null,' : ''}
    };

    const result = await this.${serviceName.toLowerCase()}.$transaction(async (prisma) => {
      return {
        items: await prisma.${prismaModelName}.findMany({
          where: ${prismaModelName}WhereInput,
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.${prismaModelName}.count({
          where: ${prismaModelName}WhereInput,
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
  @ApiCreatedResponse({ type: ${plainDtoClassName} })
  async createOne(${
    fields.find((f) => f.name === 'userId')
      ? `
    @CurrentAppRequest() req: AppRequest,`
      : ''
  }
    @Body() args: ${createDtoClassName},
  ) {    
    return await this.${serviceName.toLowerCase()}.${prismaModelName}.create({
      data: { 
        ...args,
        ${fields.find((f) => f.name === 'userId') ? `userId: req.user.id` : ''}
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: ${plainDtoClassName} })
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: ${updateDtoClassName},
  ) {
    return await this.${serviceName.toLowerCase()}.${prismaModelName}.update({
      data: {
        ...args,
        updatedAt: new Date(),
        ${hasDeletedAt ? 'deletedAt: null,' : ''}
      },
      where: {
        id,
        ${hasDeletedAt ? 'deletedAt: null,' : ''}
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    ${
      hasDeletedAt
        ? `await this.${serviceName.toLowerCase()}.${prismaModelName}.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });`
        : `await this.${serviceName.toLowerCase()}.${prismaModelName}.delete({
      where: {
        id,
      },
    });`
    }
    return { message: 'ok' };
  }

  @Get(':id')
  @ApiOkResponse({ type: ${plainDtoClassName} })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.${serviceName.toLowerCase()}.${prismaModelName}.findFirstOrThrow({
      where: {
        id,
        ${hasDeletedAt ? 'deletedAt: null,' : ''}
      },
    });
  }
}
`;
};
