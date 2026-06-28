import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './swagger.json',
  output: 'test/generated/client',
  plugins: [
    {
      name: '@hey-api/sdk',
      operations: {
        strategy: 'single',
      },
    },
  ],
});
