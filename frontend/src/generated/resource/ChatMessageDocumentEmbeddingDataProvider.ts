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
import { CreateChatMessageDocumentEmbeddingDto } from "../client";
import {
  chatMessageDocumentEmbeddingControllerCreateOne,
  chatMessageDocumentEmbeddingControllerDeleteOne,
  chatMessageDocumentEmbeddingControllerFindMany,
  chatMessageDocumentEmbeddingControllerFindOne,
  chatMessageDocumentEmbeddingControllerUpdateOne,
} from "../client/sdk.gen";

export const ChatMessageDocumentEmbeddingDataProvider: DataProvider<any> = {
  getList: async (_, params) => {
    const { page, perPage } = params.pagination || {};
    const result = await chatMessageDocumentEmbeddingControllerFindMany({
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
    const result = await chatMessageDocumentEmbeddingControllerFindOne({
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
      chatMessageDocumentEmbeddingControllerFindOne({
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

    const result = await chatMessageDocumentEmbeddingControllerFindMany({
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
    const result = await chatMessageDocumentEmbeddingControllerCreateOne({
      body: params.data as CreateChatMessageDocumentEmbeddingDto,
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

    return { data: result.data } as CreateResult<any>;
  },

  update: async (_, params) => {
    const result = await chatMessageDocumentEmbeddingControllerUpdateOne({
      path: { id: params.id },
      body: params.data,
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

    return { data: result.data } as UpdateResult<any>;
  },

  updateMany: async (_, params) => {
    const promises = params.ids.map((id) =>
      chatMessageDocumentEmbeddingControllerUpdateOne({
        path: { id: String(id) },
        body: params.data,
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
    const result = await chatMessageDocumentEmbeddingControllerDeleteOne({
      path: { id: String(params.id) },
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

    return { data: result.data } as DeleteResult<any>;
  },

  deleteMany: async (_, params) => {
    const promises = params.ids.map((id) =>
      chatMessageDocumentEmbeddingControllerDeleteOne({
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
