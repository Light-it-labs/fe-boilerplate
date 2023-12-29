import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import type { ConfigEnv, UserConfigExport } from "vite";

const config = ({ mode }: ConfigEnv): UserConfigExport => {
  // Load and merge environment variables
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  
  const baseConfig = {
    plugins: [react()],
    build: {
      sourcemap: true,
      manifest: true,
      rollupOptions: {
        input: "./src/main.tsx",
      },
    },
    server: {
      open: true,
      origin: process.env.VITE_APP_ENV === "local" ? process.env.VITE_APP_URL : "",
    },
    resolve: {
      alias: [{ find: "~", replacement: path.resolve(__dirname, "./src") }],
    },
  };

  const { SENTRY_AUTH_TOKEN, VITE_SENTRY_ORGANIZATION, VITE_SENTRY_PROJECT } = process.env;

  if (SENTRY_AUTH_TOKEN && VITE_SENTRY_ORGANIZATION && VITE_SENTRY_PROJECT) {
    baseConfig.plugins.push(sentryVitePlugin({
      authToken: SENTRY_AUTH_TOKEN,
      org: VITE_SENTRY_ORGANIZATION,
      project: VITE_SENTRY_PROJECT,
    }));
  }

  return defineConfig(baseConfig);
};

export default config;
