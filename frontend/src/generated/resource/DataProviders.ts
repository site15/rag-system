import { DataProvider } from "react-admin";
import { Prisma } from "../prisma/browser";
import { chatLlmModelDataProvider } from "./ChatLlmModelDataProvider";

export const DataProviders: Partial<
  Record<Prisma.ModelName, DataProvider<any>>
> = {
  ChatLlmModel: chatLlmModelDataProvider,
};
