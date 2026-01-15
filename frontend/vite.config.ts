import react from "@vitejs/plugin-react";
import "dotenv/config";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: true,
    port: parseInt(process.env.PORT ?? "3000", 10) || 3000,
  },
  build: {
    sourcemap: mode === "development",
  },
  base: "./",
}));
