import { kebab, pascal } from 'case';
import { TemplateHelpers } from './template-helpers';
import { ModelParams } from './types';

export const generateDataProvider = ({
  controller,
  templateHelpers,
}: ModelParams & { templateHelpers: TemplateHelpers }): string => {
  const { model } = controller;
  const { entityName, createDtoName } = templateHelpers;

  const modelName = model.name;
  const entityClassName = entityName(modelName);
  const createDtoClassName = createDtoName(modelName);
  const dataProviderName = `${entityClassName}DataProvider`;
  const kebabModelName = kebab(modelName).toLowerCase();

  // Convert to camelCase for SDK method names
  const camelModelName = modelName.charAt(0).toLowerCase() + modelName.slice(1);

  return `import {
  CreateResult,
  DataProvider,
  DeleteManyResult,
  DeleteResult,
  GetListResult,
  GetManyReferenceResult,
  GetManyResult,
  GetOneResult,
  UpdateManyResult,
  UpdateResult,
} from "react-admin";
import { ${createDtoClassName} } from "../client";
import {
  ${camelModelName}ControllerCreateOne,
  ${camelModelName}ControllerDeleteOne,
  ${camelModelName}ControllerFindMany,
  ${camelModelName}ControllerFindOne,
  ${camelModelName}ControllerUpdateOne,
} from "../client/sdk.gen";

export const ${dataProviderName}: DataProvider<any> = {
  getList: async (_, params) => {
    const { page, perPage } = params.pagination || {};
    const result = await ${camelModelName}ControllerFindMany({
      query: { curPage: page, perPage },
      signal: params.signal,
    });
    return {
      data: result.data?.items || [],
      total: result.data?.meta.totalResults || 0,
    } as GetListResult<any>;
  },

  getOne: async (_, params) => {
    const result = await ${camelModelName}ControllerFindOne({
      path: { id: String(params.id) },
      signal: params.signal,
    });
    return { data: result.data } as GetOneResult<any>;
  },

  getMany: async (_, params) => {
    const promises = params.ids.map((id) =>
      ${camelModelName}ControllerFindOne({
        path: { id: String(id) },
        signal: params.signal,
      }),
    );
    const results = await Promise.all(promises);
    return { data: results.map((result) => result.data) } as GetManyResult<any>;
  },

  getManyReference: async (_, params) => {
    const { page, perPage } = params.pagination;
    const query = {
      curPage: page,
      perPage,
      [params.target]: params.id,
      ...params.filter,
    };

    const result = await ${camelModelName}ControllerFindMany({
      query,
      signal: params.signal,
    });

    return {
      data: result.data?.items || [],
      total: result.data?.meta.totalResults || 0,
    } as GetManyReferenceResult<any>;
  },

  create: async (_, params) => {
    const result = await ${camelModelName}ControllerCreateOne({
      body: params.data as ${createDtoClassName},
    });
    return { data: result.data } as CreateResult<any>;
  },

  update: async (_, params) => {
    const result = await ${camelModelName}ControllerUpdateOne({
      path: { id: params.id },
      body: params.data,
    });
    return { data: result.data } as UpdateResult<any>;
  },

  updateMany: async (_, params) => {
    const promises = params.ids.map((id) =>
      ${camelModelName}ControllerUpdateOne({
        path: { id: String(id) },
        body: params.data,
      }),
    );
    const results = await Promise.all(promises);
    return {
      data: results.map((result) => result.data),
    } as UpdateManyResult<any>;
  },

  delete: async (_: any, params) => {
    const result = await ${camelModelName}ControllerDeleteOne({
      path: { id: String(params.id) },
    });
    return { data: result.data } as DeleteResult<any>;
  },

  deleteMany: async (_, params) => {
    const promises = params.ids.map((id) =>
      ${camelModelName}ControllerDeleteOne({
        path: { id: String(id) },
      }),
    );
    const results = await Promise.all(promises);
    return {
      data: results.map((result) => result.data),
    } as DeleteManyResult<any>;
  },
};
`;
};
