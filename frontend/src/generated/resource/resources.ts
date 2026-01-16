/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataProvider } from "react-admin";
import { Prisma } from "../prisma/browser";
import { AuthUserDataProvider } from "./AuthUserDataProvider";
import { AuthSessionDataProvider } from "./AuthSessionDataProvider";
import { ChatDocumentEmbeddingDataProvider } from "./ChatDocumentEmbeddingDataProvider";
import { ChatDialogDataProvider } from "./ChatDialogDataProvider";
import { ChatMessageDataProvider } from "./ChatMessageDataProvider";
import { ChatMessageDocumentEmbeddingDataProvider } from "./ChatMessageDocumentEmbeddingDataProvider";
import { ChatLlmRequestDataProvider } from "./ChatLlmRequestDataProvider";
import { ChatLlmModelDataProvider } from "./ChatLlmModelDataProvider";
import { ChatEmbeddingModelDataProvider } from "./ChatEmbeddingModelDataProvider";
import {
  AuthUserCreateForm,
  AuthUserEditForm,
  AuthUserShowForm,
} from "./AuthUserForm";
import {
  AuthSessionCreateForm,
  AuthSessionEditForm,
  AuthSessionShowForm,
} from "./AuthSessionForm";
import {
  ChatDocumentEmbeddingCreateForm,
  ChatDocumentEmbeddingEditForm,
  ChatDocumentEmbeddingShowForm,
} from "./ChatDocumentEmbeddingForm";
import {
  ChatDialogCreateForm,
  ChatDialogEditForm,
  ChatDialogShowForm,
} from "./ChatDialogForm";
import {
  ChatMessageCreateForm,
  ChatMessageEditForm,
  ChatMessageShowForm,
} from "./ChatMessageForm";
import {
  ChatMessageDocumentEmbeddingCreateForm,
  ChatMessageDocumentEmbeddingEditForm,
  ChatMessageDocumentEmbeddingShowForm,
} from "./ChatMessageDocumentEmbeddingForm";
import {
  ChatLlmRequestCreateForm,
  ChatLlmRequestEditForm,
  ChatLlmRequestShowForm,
} from "./ChatLlmRequestForm";
import {
  ChatLlmModelCreateForm,
  ChatLlmModelEditForm,
  ChatLlmModelShowForm,
} from "./ChatLlmModelForm";
import {
  ChatEmbeddingModelCreateForm,
  ChatEmbeddingModelEditForm,
  ChatEmbeddingModelShowForm,
} from "./ChatEmbeddingModelForm";
import { AuthUserList } from "./AuthUserList";
import { AuthSessionList } from "./AuthSessionList";
import { ChatDocumentEmbeddingList } from "./ChatDocumentEmbeddingList";
import { ChatDialogList } from "./ChatDialogList";
import { ChatMessageList } from "./ChatMessageList";
import { ChatMessageDocumentEmbeddingList } from "./ChatMessageDocumentEmbeddingList";
import { ChatLlmRequestList } from "./ChatLlmRequestList";
import { ChatLlmModelList } from "./ChatLlmModelList";
import { ChatEmbeddingModelList } from "./ChatEmbeddingModelList";

export const resources: Partial<
  Record<
    Prisma.ModelName,
    {
      dataProvider: DataProvider<any>;
      label: string;
      list: any;
      create: any;
      edit: any;
      show: any;
    }
  >
> = {
  AuthUser: {
    dataProvider: AuthUserDataProvider,
    label: "Auth User",
    list: AuthUserList,
    create: AuthUserCreateForm,
    edit: AuthUserEditForm,
    show: AuthUserShowForm,
  },
  AuthSession: {
    dataProvider: AuthSessionDataProvider,
    label: "Auth Session",
    list: AuthSessionList,
    create: AuthSessionCreateForm,
    edit: AuthSessionEditForm,
    show: AuthSessionShowForm,
  },
  ChatDocumentEmbedding: {
    dataProvider: ChatDocumentEmbeddingDataProvider,
    label: "Chat Document Embedding",
    list: ChatDocumentEmbeddingList,
    create: ChatDocumentEmbeddingCreateForm,
    edit: ChatDocumentEmbeddingEditForm,
    show: ChatDocumentEmbeddingShowForm,
  },
  ChatDialog: {
    dataProvider: ChatDialogDataProvider,
    label: "Chat Dialog",
    list: ChatDialogList,
    create: ChatDialogCreateForm,
    edit: ChatDialogEditForm,
    show: ChatDialogShowForm,
  },
  ChatMessage: {
    dataProvider: ChatMessageDataProvider,
    label: "Chat Message",
    list: ChatMessageList,
    create: ChatMessageCreateForm,
    edit: ChatMessageEditForm,
    show: ChatMessageShowForm,
  },
  ChatMessageDocumentEmbedding: {
    dataProvider: ChatMessageDocumentEmbeddingDataProvider,
    label: "Chat Message Document Embedding",
    list: ChatMessageDocumentEmbeddingList,
    create: ChatMessageDocumentEmbeddingCreateForm,
    edit: ChatMessageDocumentEmbeddingEditForm,
    show: ChatMessageDocumentEmbeddingShowForm,
  },
  ChatLlmRequest: {
    dataProvider: ChatLlmRequestDataProvider,
    label: "Chat Llm Request",
    list: ChatLlmRequestList,
    create: ChatLlmRequestCreateForm,
    edit: ChatLlmRequestEditForm,
    show: ChatLlmRequestShowForm,
  },
  ChatLlmModel: {
    dataProvider: ChatLlmModelDataProvider,
    label: "Chat Llm Model",
    list: ChatLlmModelList,
    create: ChatLlmModelCreateForm,
    edit: ChatLlmModelEditForm,
    show: ChatLlmModelShowForm,
  },
  ChatEmbeddingModel: {
    dataProvider: ChatEmbeddingModelDataProvider,
    label: "Chat Embedding Model",
    list: ChatEmbeddingModelList,
    create: ChatEmbeddingModelCreateForm,
    edit: ChatEmbeddingModelEditForm,
    show: ChatEmbeddingModelShowForm,
  },
};
