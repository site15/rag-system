/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataProvider } from "react-admin";
import { Prisma } from "./generated/prisma/browser";
import { resources } from "./generated/resource/resources";

export const appDataProvider: DataProvider<any> = {
  getList: async (resource, params) => {
    console.log({
      resource,
      params,
    });
    const dataProvider = resources[resource as Prisma.ModelName]?.dataProvider;

    if (!dataProvider) {
      throw new Error(`No data provider found for resource ${resource}`);
    }
    return await dataProvider.getList(resource, params);
  },

  getOne: async (resource, params) => {
    console.log({
      resource,
      params,
    });
    const dataProvider = resources[resource as Prisma.ModelName]?.dataProvider;

    if (!dataProvider) {
      throw new Error(`No data provider found for resource ${resource}`);
    }
    return await dataProvider.getOne(resource, params);
  },

  getMany: async (resource, params) => {
    console.log({
      resource,
      params,
    });
    const dataProvider = resources[resource as Prisma.ModelName]?.dataProvider;

    if (!dataProvider) {
      throw new Error(`No data provider found for resource ${resource}`);
    }
    return await dataProvider.getMany(resource, params);
  },

  getManyReference: async (resource, params) => {
    console.log({
      resource,
      params,
    });
    const dataProvider = resources[resource as Prisma.ModelName]?.dataProvider;

    if (!dataProvider) {
      throw new Error(`No data provider found for resource ${resource}`);
    }
    return await dataProvider.getManyReference(resource, params);
  },

  create: async (resource: any, params) => {
    console.log({
      resource,
      params,
    });
    const dataProvider = resources[resource as Prisma.ModelName]?.dataProvider;

    if (!dataProvider) {
      throw new Error(`No data provider found for resource ${resource}`);
    }
    return await dataProvider.create(resource, params);
  },

  update: async (resource, params) => {
    console.log({
      resource,
      params,
    });
    const dataProvider = resources[resource as Prisma.ModelName]?.dataProvider;

    if (!dataProvider) {
      throw new Error(`No data provider found for resource ${resource}`);
    }
    return await dataProvider.update(resource, params);
  },

  updateMany: async (resource, params) => {
    console.log({
      resource,
      params,
    });
    const dataProvider = resources[resource as Prisma.ModelName]?.dataProvider;

    if (!dataProvider) {
      throw new Error(`No data provider found for resource ${resource}`);
    }
    return await dataProvider.updateMany(resource, params);
  },

  delete: async (resource: any, params: { id: any }) => {
    console.log({
      resource,
      params,
    });
    const dataProvider = resources[resource as Prisma.ModelName]?.dataProvider;

    if (!dataProvider) {
      throw new Error(`No data provider found for resource ${resource}`);
    }
    return await dataProvider.delete(resource, params);
  },

  deleteMany: async (resource, params) => {
    console.log({
      resource,
      params,
    });
    const dataProvider = resources[resource as Prisma.ModelName]?.dataProvider;

    if (!dataProvider) {
      throw new Error(`No data provider found for resource ${resource}`);
    }
    return await dataProvider.deleteMany(resource, params);
  },
};
