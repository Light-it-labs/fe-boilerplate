import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import type { ConfigEnv, UserConfigExport } from "vite";

const config = ({ mode }: ConfigEnv): UserConfigExport => {
  // Load and merge environment variables
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const {
    VITE_SENTRY_AUTH_TOKEN,
    VITE_SENTRY_ORGANIZATION,
    VITE_SENTRY_PROJECT,
    VITE_APP_ENV,
    VITE_APP_URL
   } = process.env;

  const baseConfig = {
    plugins: [
      react(),
      sentryVitePlugin({
        authToken: VITE_SENTRY_AUTH_TOKEN,
        org: VITE_SENTRY_ORGANIZATION,
        project: VITE_SENTRY_PROJECT,
      })
    ].filter(Boolean),
    build: {
      sourcemap: true,
      manifest: true,
/*       rollupOptions: {
        input: "./src/main.tsx",
      }, */
    },
    server: {
      open: true,
      origin: VITE_APP_ENV === "local" ? VITE_APP_URL : "",
    },
    resolve: {
      alias: [{ find: "~", replacement: path.resolve(__dirname, "./src") }],
    },
  };

  return defineConfig(baseConfig);
};

export default config;
