/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { CreateChatLlmModelDto, UpdateChatLlmModelDto } from "../client";
import { pickDtoFields } from "./pick-dto-fields";
import {
  chatLlmModelControllerCreateOne,
  chatLlmModelControllerDeleteOne,
  chatLlmModelControllerFindMany,
  chatLlmModelControllerFindOne,
  chatLlmModelControllerUpdateOne,
} from "../client/sdk.gen";

const chatLlmModelCreateDtoFields = [
  "provider",
  "model",
  "temperature",
  "chunkSize",
  "baseUrl",
  "startTime",
  "endTime",
  "lastRequestId",
  "isActive",
] as const;
const chatLlmModelUpdateDtoFields = [
  "provider",
  "model",
  "temperature",
  "chunkSize",
  "baseUrl",
  "startTime",
  "endTime",
  "lastRequestId",
  "isActive",
] as const;

export const ChatLlmModelDataProvider: DataProvider<any> = {
  getList: async (_, params) => {
    const { page, perPage } = params.pagination || {};
    const result = await chatLlmModelControllerFindMany({
      query: {
        curPage: page,
        perPage,
        sort: params.sort
          ? `${params.sort?.field}:${params.sort?.order.toLowerCase()}`
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
    const result = await chatLlmModelControllerFindOne({
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
      chatLlmModelControllerFindOne({
        path: { id: String(id) },
        signal: params.signal,
      }),
    );
    const results = await Promise.all(promises);

    if ((results || []).some((result) => result?.error)) {
      throw Object.assign(
        new Error(),
        results.find((result) => result?.error),
      );
    }

    return { data: results.map((result) => result.data) } as GetManyResult<any>;
  },

  getManyReference: async (_, params) => {
    const { page, perPage } = params.pagination;
    const query = {
      curPage: page,
      perPage,
      sort: params.sort
        ? `${params.sort?.field}:${params.sort?.order.toLowerCase()}`
        : undefined,
      [params.target]: params.id,
      ...params.filter,
    };

    const result = await chatLlmModelControllerFindMany({
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
    const result = await chatLlmModelControllerCreateOne({
      body: pickDtoFields<CreateChatLlmModelDto>(
        params.data,
        chatLlmModelCreateDtoFields,
      ),
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

    return { data: result.data } as CreateResult<any>;
  },

  update: async (_, params) => {
    const result = await chatLlmModelControllerUpdateOne({
      path: { id: params.id },
      body: pickDtoFields<UpdateChatLlmModelDto>(
        params.data,
        chatLlmModelUpdateDtoFields,
      ),
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

    return { data: result.data } as UpdateResult<any>;
  },

  updateMany: async (_, params) => {
    const body = pickDtoFields<UpdateChatLlmModelDto>(
      params.data,
      chatLlmModelUpdateDtoFields,
    );
    const promises = params.ids.map((id) =>
      chatLlmModelControllerUpdateOne({
        path: { id: String(id) },
        body,
      }),
    );
    const results = await Promise.all(promises);

    if ((results || []).some((result) => result?.error)) {
      throw Object.assign(
        new Error(),
        results.find((result) => result.error),
      );
    }

    return {
      data: results.map((result) => result.data),
    } as UpdateManyResult<any>;
  },

  delete: async (_: any, params) => {
    const result = await chatLlmModelControllerDeleteOne({
      path: { id: String(params.id) },
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

    return { data: result.data } as DeleteResult<any>;
  },

  deleteMany: async (_, params) => {
    const promises = params.ids.map((id) =>
      chatLlmModelControllerDeleteOne({
        path: { id: String(id) },
      }),
    );
    const results = await Promise.all(promises);

    if ((results || []).some((result) => result?.error)) {
      throw Object.assign(
        new Error(),
        results.find((result) => result.error),
      );
    }

    return {
      data: results.map((result) => result.data),
    } as DeleteManyResult<any>;
  },
};
