import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv, UserConfigExport } from "vite";

const config = ({ mode }: ConfigEnv): UserConfigExport => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    build: {
      manifest: true,
      rollupOptions: {
        input: "./src/main.tsx",
      },
    },
    server: {
      open: true,
      origin:
        process.env.VITE_APP_ENV === "local" ? process.env.VITE_APP_URL : "",
    },
    resolve: {
      alias: [{ find: "~", replacement: path.resolve(__dirname, "./src") }],
    },
  });
};

export default config;
