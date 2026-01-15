import { Admin, Resource } from "react-admin";
import { client } from "./generated/client/client.gen";
import { chatLlmModelDataProvider } from "./generated/resource/ChatLlmModelDataProvider";
import {
  ChatLlmModelCreateForm,
  ChatLlmModelEditForm,
  ChatLlmModelShowForm,
} from "./generated/resource/ChatLlmModelForm";
import { ChatLlmModelList } from "./generated/resource/ChatLlmModelList";
import { Prisma } from "./generated/prisma/browser";

client.setConfig({
  baseUrl: "http://localhost:23000",
});

export const App = () => (
  <Admin dataProvider={chatLlmModelDataProvider}>
    <Resource
      name={Prisma.ModelName.ChatLlmModel}
      options={{ label: "Chat Llm Model" }}
      list={ChatLlmModelList}
      create={ChatLlmModelCreateForm}
      edit={ChatLlmModelEditForm}
      show={ChatLlmModelShowForm}
    />
  </Admin>
);
