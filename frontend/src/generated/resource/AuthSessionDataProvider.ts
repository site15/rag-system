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
import { CreateAuthSessionDto } from "../client";
import {
  authSessionControllerCreateOne,
  authSessionControllerDeleteOne,
  authSessionControllerFindMany,
  authSessionControllerFindOne,
  authSessionControllerUpdateOne,
} from "../client/sdk.gen";

export const AuthSessionDataProvider: DataProvider<any> = {
  getList: async (_, params) => {
    const { page, perPage } = params.pagination || {};
    const result = await authSessionControllerFindMany({
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
    const result = await authSessionControllerFindOne({
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
      authSessionControllerFindOne({
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

    const result = await authSessionControllerFindMany({
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
    const result = await authSessionControllerCreateOne({
      body: params.data as CreateAuthSessionDto,
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

    return { data: result.data } as CreateResult<any>;
  },

  update: async (_, params) => {
    const result = await authSessionControllerUpdateOne({
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
      authSessionControllerUpdateOne({
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
    const result = await authSessionControllerDeleteOne({
      path: { id: String(params.id) },
    });

    if (result?.error) {
      throw Object.assign(new Error(), result.error);
    }

    return { data: result.data } as DeleteResult<any>;
  },

  deleteMany: async (_, params) => {
    const promises = params.ids.map((id) =>
      authSessionControllerDeleteOne({
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
