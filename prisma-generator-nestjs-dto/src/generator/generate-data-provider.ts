/* eslint-disable @typescript-eslint/no-unused-vars */
import { kebab } from 'case';
import { TemplateHelpers } from './template-helpers';
import { ModelParams } from './types';

const formatDtoFieldNames = (fieldNames: string[]) =>
  fieldNames.length
    ? `[${fieldNames.map((name) => `'${name}'`).join(', ')}] as const`
    : '[] as const';

export const generateDataProvider = ({
  controller,
  create,
  update,
  templateHelpers,
}: ModelParams & { templateHelpers: TemplateHelpers }): string => {
  const { model } = controller;
  const { entityName, createDtoName, updateDtoName } = templateHelpers;

  const modelName = model.name;
  const entityClassName = entityName(modelName);
  const createDtoClassName = createDtoName(modelName);
  const updateDtoClassName = updateDtoName(modelName);
  const createDtoFieldNames = formatDtoFieldNames(
    create.fields.map((field) => field.name),
  );
  const updateDtoFieldNames = formatDtoFieldNames(
    update.fields.map((field) => field.name),
  );
  const dataProviderName = `${entityClassName}DataProvider`;
  const kebabModelName = kebab(modelName).toLowerCase();

  // Convert to camelCase for SDK method names
  const camelModelName = modelName.charAt(0).toLowerCase() + modelName.slice(1);

  return `/* eslint-disable @typescript-eslint/no-explicit-any */
  import {
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
import { ${createDtoClassName}, ${updateDtoClassName} } from "../client";
import { pickDtoFields } from "./pick-dto-fields";
import {
  ${camelModelName}ControllerCreateOne,
  ${camelModelName}ControllerDeleteOne,
  ${camelModelName}ControllerFindMany,
  ${camelModelName}ControllerFindOne,
  ${camelModelName}ControllerUpdateOne,
} from "../client/sdk.gen";

const ${camelModelName}CreateDtoFields = ${createDtoFieldNames};
const ${camelModelName}UpdateDtoFields = ${updateDtoFieldNames};

export const ${dataProviderName}: DataProvider<any> = {
  getList: async (_, params) => {
    const { page, perPage } = params.pagination || {};
    const result = await ${camelModelName}ControllerFindMany({
      query: {
        curPage: page,
        perPage,
        sort: params.sort
          ? \`\${params.sort?.field}:\${params.sort?.order.toLowerCase()}\`
          : undefined,
      },
      signal: params.signal,
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

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

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

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

    if ((results||[]).some((result) => result?.error)) {
      throw Object.assign(new Error(), results.find((result) => result?.error));
    }

    return { data: results.map((result) => result.data) } as GetManyResult<any>;
  },

  getManyReference: async (_, params) => {
    const { page, perPage } = params.pagination;
    const query = {
      curPage: page,
      perPage,
      sort: params.sort
        ? \`\${params.sort?.field}:\${params.sort?.order.toLowerCase()}\`
        : undefined,
      [params.target]: params.id,
      ...params.filter,
    };

    const result = await ${camelModelName}ControllerFindMany({
      query,
      signal: params.signal,
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

    return {
      data: result.data?.items || [],
      total: result.data?.meta.totalResults || 0,
    } as GetManyReferenceResult<any>;
  },

  create: async (_, params) => {
    const result = await ${camelModelName}ControllerCreateOne({
      body: pickDtoFields<${createDtoClassName}>(
        params.data,
        ${camelModelName}CreateDtoFields,
      ),
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

    return { data: result.data } as CreateResult<any>;
  },

  update: async (_, params) => {
    const result = await ${camelModelName}ControllerUpdateOne({
      path: { id: params.id },
      body: pickDtoFields<${updateDtoClassName}>(
        params.data,
        ${camelModelName}UpdateDtoFields,
      ),
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

    return { data: result.data } as UpdateResult<any>;
  },

  updateMany: async (_, params) => {
    const body = pickDtoFields<${updateDtoClassName}>(
      params.data,
      ${camelModelName}UpdateDtoFields,
    );
    const promises = params.ids.map((id) =>
      ${camelModelName}ControllerUpdateOne({
        path: { id: String(id) },
        body,
      }),
    );
    const results = await Promise.all(promises);
    
    if ((results||[]).some((result) => result?.error)) {
      throw Object.assign(new Error(), results.find((result) => result.error));
    }

    return {
      data: results.map((result) => result.data),
    } as UpdateManyResult<any>;
  },

  delete: async (_: any, params) => {
    const result = await ${camelModelName}ControllerDeleteOne({
      path: { id: String(params.id) },
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

    return { data: result.data } as DeleteResult<any>;
  },

  deleteMany: async (_, params) => {
    const promises = params.ids.map((id) =>
      ${camelModelName}ControllerDeleteOne({
        path: { id: String(id) },
      }),
    );
    const results = await Promise.all(promises);
    
    if ((results||[]).some((result) => result?.error)) {
      throw Object.assign(new Error(), results.find((result) => result.error));
    }

    return {
      data: results.map((result) => result.data),
    } as DeleteManyResult<any>;
  },
};
`;
};
