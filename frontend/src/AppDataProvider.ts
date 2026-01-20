/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataProvider } from "react-admin";
import { Prisma } from "./generated/prisma/browser";
import { resources } from "./generated/resource/resources";
import { authService } from "./services/AuthService";

export const appDataProvider: DataProvider<any> = {
  getList: async (resource, params) => {
    try {
      console.log({
        resource,
        params,
      });
      const dataProvider =
        resources[resource as Prisma.ModelName]?.dataProvider;

      if (!dataProvider) {
        throw new Error(`No data provider found for resource ${resource}`);
      }
      return await dataProvider.getList(resource, params);
    } catch (error: any) {
      if (error.code === "INVALID_API_KEY" || error.code === "UNAUTHORIZED") {
        await authService.logout();
      }
      throw error;
    }
  },

  getOne: async (resource, params) => {
    try {
      console.log({
        resource,
        params,
      });
      const dataProvider =
        resources[resource as Prisma.ModelName]?.dataProvider;

      if (!dataProvider) {
        throw new Error(`No data provider found for resource ${resource}`);
      }
      return await dataProvider.getOne(resource, params);
    } catch (error: any) {
      if (error.code === "INVALID_API_KEY" || error.code === "UNAUTHORIZED") {
        await authService.logout();
      }
      throw error;
    }
  },

  getMany: async (resource, params) => {
    try {
      console.log({
        resource,
        params,
      });
      const dataProvider =
        resources[resource as Prisma.ModelName]?.dataProvider;

      if (!dataProvider) {
        throw new Error(`No data provider found for resource ${resource}`);
      }
      return await dataProvider.getMany(resource, params);
    } catch (error: any) {
      if (error.code === "INVALID_API_KEY" || error.code === "UNAUTHORIZED") {
        await authService.logout();
      }
      throw error;
    }
  },

  getManyReference: async (resource, params) => {
    try {
      console.log({
        resource,
        params,
      });
      const dataProvider =
        resources[resource as Prisma.ModelName]?.dataProvider;

      if (!dataProvider) {
        throw new Error(`No data provider found for resource ${resource}`);
      }
      return await dataProvider.getManyReference(resource, params);
    } catch (error: any) {
      if (error.code === "INVALID_API_KEY" || error.code === "UNAUTHORIZED") {
        await authService.logout();
      }
      throw error;
    }
  },

  create: async (resource: any, params) => {
    try {
      console.log({
        resource,
        params,
      });
      const dataProvider =
        resources[resource as Prisma.ModelName]?.dataProvider;

      if (!dataProvider) {
        throw new Error(`No data provider found for resource ${resource}`);
      }
      return await dataProvider.create(resource, params);
    } catch (error: any) {
      if (error.code === "INVALID_API_KEY" || error.code === "UNAUTHORIZED") {
        await authService.logout();
      }
      throw error;
    }
  },

  update: async (resource, params) => {
    try {
      console.log({
        resource,
        params,
      });
      const dataProvider =
        resources[resource as Prisma.ModelName]?.dataProvider;

      if (!dataProvider) {
        throw new Error(`No data provider found for resource ${resource}`);
      }
      return await dataProvider.update(resource, params);
    } catch (error: any) {
      if (error.code === "INVALID_API_KEY" || error.code === "UNAUTHORIZED") {
        await authService.logout();
      }
      throw error;
    }
  },

  updateMany: async (resource, params) => {
    try {
      console.log({
        resource,
        params,
      });
      const dataProvider =
        resources[resource as Prisma.ModelName]?.dataProvider;

      if (!dataProvider) {
        throw new Error(`No data provider found for resource ${resource}`);
      }
      return await dataProvider.updateMany(resource, params);
    } catch (error: any) {
      if (error.code === "INVALID_API_KEY" || error.code === "UNAUTHORIZED") {
        await authService.logout();
      }
      throw error;
    }
  },

  delete: async (resource: any, params: { id: any }) => {
    try {
      console.log({
        resource,
        params,
      });
      const dataProvider =
        resources[resource as Prisma.ModelName]?.dataProvider;

      if (!dataProvider) {
        throw new Error(`No data provider found for resource ${resource}`);
      }
      return await dataProvider.delete(resource, params);
    } catch (error: any) {
      if (error.code === "INVALID_API_KEY" || error.code === "UNAUTHORIZED") {
        await authService.logout();
      }
      throw error;
    }
  },

  deleteMany: async (resource, params) => {
    try {
      console.log({
        resource,
        params,
      });
      const dataProvider =
        resources[resource as Prisma.ModelName]?.dataProvider;

      if (!dataProvider) {
        throw new Error(`No data provider found for resource ${resource}`);
      }
      return await dataProvider.deleteMany(resource, params);
    } catch (error: any) {
      if (error.code === "INVALID_API_KEY" || error.code === "UNAUTHORIZED") {
        await authService.logout();
      }
      throw error;
    }
  },
};
