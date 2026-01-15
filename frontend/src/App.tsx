import { Admin, Resource } from "react-admin";
import { appDataProvider } from "./AppDataProvider";
import { client } from "./generated/client/client.gen";
import { Prisma } from "./generated/prisma/browser";
import { resources } from "./generated/resource/resources";

client.setConfig({
  baseUrl: "http://localhost:23000",
});

export const App = () => (
  <Admin dataProvider={appDataProvider}>
    <Resource
      name={Prisma.ModelName.ChatLlmModel}
      options={{ label: resources.ChatLlmModel?.label }}
      list={resources.ChatLlmModel?.list}
      create={resources.ChatLlmModel?.create}
      edit={resources.ChatLlmModel?.edit}
      show={resources.ChatLlmModel?.show}
    />
  </Admin>
);
