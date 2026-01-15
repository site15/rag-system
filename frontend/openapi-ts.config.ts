import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "../backend/swagger.json",
  output: "src/generated/client",
});
