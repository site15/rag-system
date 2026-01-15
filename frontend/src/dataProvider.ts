// in src/dataProvider.ts
import jsonServerProvider from "ra-data-json-server";

export const dataProvider = jsonServerProvider(
  "https://jsonplaceholder.typicode.com",
);
