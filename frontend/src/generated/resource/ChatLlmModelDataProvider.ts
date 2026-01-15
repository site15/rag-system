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
import { CreateChatLlmModelDto } from "../client";
import {
  chatLlmModelControllerCreateOne,
  chatLlmModelControllerDeleteOne,
  chatLlmModelControllerFindMany,
  chatLlmModelControllerFindOne,
  chatLlmModelControllerUpdateOne,
} from "../client/sdk.gen";

export const chatLlmModelDataProvider: DataProvider<any> = {
  getList: async (_, params) => {
    console.log({
      getList: params,
    });
    const { page, perPage } = params.pagination || {};
    const result = await chatLlmModelControllerFindMany({
      query: { curPage: page, perPage },
      signal: params.signal,
    });
    return {
      data: result.data?.items || [],
      total: result.data?.meta.totalResults || 0,
    } as GetListResult<any>;
  },

  getOne: async (_, params) => {
    console.log({
      getOne: params,
    });
    const result = await chatLlmModelControllerFindOne({
      path: { id: String(params.id) },
      signal: params.signal,
    });
    return { data: result.data } as GetOneResult<any>;
  },

  getMany: async (_, params) => {
    console.log({
      getMany: params,
    });
    const promises = params.ids.map((id) =>
      chatLlmModelControllerFindOne({
        path: { id: String(id) },
        signal: params.signal,
      }),
    );
    const results = await Promise.all(promises);
    return { data: results.map((result) => result.data) } as GetManyResult<any>;
  },

  getManyReference: async (_, params) => {
    console.log({
      getManyReference: params,
    });
    const { page, perPage } = params.pagination;
    const query = {
      curPage: page,
      perPage,
      [params.target]: params.id,
      ...params.filter,
    };

    const result = await chatLlmModelControllerFindMany({
      query,
      signal: params.signal,
    });

    return {
      data: result.data?.items || [],
      total: result.data?.meta.totalResults || 0,
    } as GetManyReferenceResult<any>;
  },

  create: async (_, params) => {
    console.log({
      create: params,
    });
    const result = await chatLlmModelControllerCreateOne({
      body: params.data as CreateChatLlmModelDto,
    });
    return { data: result.data } as CreateResult<any>;
  },

  update: async (_, params) => {
    console.log({
      update: params,
    });
    const result = await chatLlmModelControllerUpdateOne({
      path: { id: params.id },
      body: params.data,
    });
    return { data: result.data } as UpdateResult<any>;
  },

  updateMany: async (_, params) => {
    console.log({
      updateMany: params,
    });
    const promises = params.ids.map((id) =>
      chatLlmModelControllerUpdateOne({
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
    console.log({
      delete: params,
    });
    const result = await chatLlmModelControllerDeleteOne({
      path: { id: String(params.id) },
    });
    return { data: result.data } as DeleteResult<any>;
  },

  deleteMany: async (_, params) => {
    console.log({
      deleteMany: params,
    });
    const promises = params.ids.map((id) =>
      chatLlmModelControllerDeleteOne({
        path: { id: String(id) },
      }),
    );
    const results = await Promise.all(promises);
    return {
      data: results.map((result) => result.data),
    } as DeleteManyResult<any>;
  },
};
