/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataProvider } from "react-admin";
import { AuthUserDataProvider } from "./AuthUserDataProvider";
import { AuthApiKeyDataProvider } from "./AuthApiKeyDataProvider";
import { AuthSessionDataProvider } from "./AuthSessionDataProvider";
import { ChatPromptDataProvider } from "./ChatPromptDataProvider";
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
  AuthApiKeyCreateForm,
  AuthApiKeyEditForm,
  AuthApiKeyShowForm,
} from "./AuthApiKeyForm";
import {
  AuthSessionCreateForm,
  AuthSessionEditForm,
  AuthSessionShowForm,
} from "./AuthSessionForm";
import {
  ChatPromptCreateForm,
  ChatPromptEditForm,
  ChatPromptShowForm,
} from "./ChatPromptForm";
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
import { AuthApiKeyList } from "./AuthApiKeyList";
import { AuthSessionList } from "./AuthSessionList";
import { ChatPromptList } from "./ChatPromptList";
import { ChatDocumentEmbeddingList } from "./ChatDocumentEmbeddingList";
import { ChatDialogList } from "./ChatDialogList";
import { ChatMessageList } from "./ChatMessageList";
import { ChatMessageDocumentEmbeddingList } from "./ChatMessageDocumentEmbeddingList";
import { ChatLlmRequestList } from "./ChatLlmRequestList";
import { ChatLlmModelList } from "./ChatLlmModelList";
import { ChatEmbeddingModelList } from "./ChatEmbeddingModelList";

export const resources: Partial<
  Record<
    string,
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
  AuthApiKey: {
    dataProvider: AuthApiKeyDataProvider,
    label: "Auth Api Key",
    list: AuthApiKeyList,
    create: AuthApiKeyCreateForm,
    edit: AuthApiKeyEditForm,
    show: AuthApiKeyShowForm,
  },
  AuthSession: {
    dataProvider: AuthSessionDataProvider,
    label: "Auth Session",
    list: AuthSessionList,
    create: AuthSessionCreateForm,
    edit: AuthSessionEditForm,
    show: AuthSessionShowForm,
  },
  ChatPrompt: {
    dataProvider: ChatPromptDataProvider,
    label: "Chat Prompt",
    list: ChatPromptList,
    create: ChatPromptCreateForm,
    edit: ChatPromptEditForm,
    show: ChatPromptShowForm,
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
