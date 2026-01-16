import { Admin, Resource } from "react-admin";
import { appDataProvider } from "./AppDataProvider";
import { client } from "./generated/client/client.gen";
import { resources } from "./generated/resource/resources";

client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL,
});

export const App = () => {
  const resourceNames = Object.keys(resources);
  console.log(resources);
  return (
    <Admin dataProvider={appDataProvider}>
      {resourceNames.map((resourceName, index) => (
        <Resource
          key={index}
          name={resourceName}
          options={{ label: resources[resourceName]?.label }}
          list={resources[resourceName]?.list}
          create={resources[resourceName]?.create}
          edit={resources[resourceName]?.edit}
        />
      ))}
    </Admin>
  );
};
