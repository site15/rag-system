import { Admin, Resource } from "react-admin";
import { appAuthProvider } from "./AppAuthProvider";
import { appDataProvider } from "./AppDataProvider";
import { CustomLoginPage } from "./forms/CustomLoginPage";
import { client } from "./generated/client/client.gen";
import { resources } from "./generated/resource/resources";
import { authService } from "./services/AuthService";

client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: { "x-api-key": authService.getApiKey() },
});

export const App = () => {
  const resourceNames = Object.keys(resources);

  return (
    <Admin
      requireAuth
      loginPage={CustomLoginPage}
      authProvider={appAuthProvider}
      dataProvider={appDataProvider}
    >
      {resourceNames.map((resourceName, index) => (
        <Resource
          key={index}
          name={resourceName}
          options={{ label: resources[resourceName]?.label }}
          list={resources[resourceName]?.list}
          show={resources[resourceName]?.show}
          create={resources[resourceName]?.create}
          edit={resources[resourceName]?.edit}
        />
      ))}
    </Admin>
  );
};
