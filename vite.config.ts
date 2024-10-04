import path from "path";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv, UserConfigExport } from "vite";

const config = ({ mode }: ConfigEnv): UserConfigExport => {
  // Load and merge environment variables
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const {
    VITE_SENTRY_AUTH_TOKEN,
    VITE_SENTRY_ORGANIZATION,
    VITE_SENTRY_PROJECT,
    VITE_APP_ENV,
    VITE_APP_URL,
  } = process.env;

  const baseConfig = {
    plugins: [
      react(),
      sentryVitePlugin({
        authToken: VITE_SENTRY_AUTH_TOKEN,
        org: VITE_SENTRY_ORGANIZATION,
        project: VITE_SENTRY_PROJECT,
      }),
    ].filter(Boolean),
    build: {
      sourcemap: true,
      manifest: true,
    },
    server: {
      open: true,
      origin: VITE_APP_ENV === "local" ? VITE_APP_URL : "",
    },
    resolve: {
      alias: [
        {
          find: "~/assets",
          replacement: path.resolve(__dirname, "./src/shared/assets"),
        },
        {
          find: "~/components",
          replacement: path.resolve(__dirname, "./src/shared/components/ui"),
        },
        {
          find: "~/hooks",
          replacement: path.resolve(__dirname, "./src/shared/hooks"),
        },
        {
          find: "~/icons",
          replacement: path.resolve(__dirname, "./src/shared/components/icons"),
        },
        {
          find: "~/sections",
          replacement: path.resolve(__dirname, "./src/shared/sections"),
        },
        {
          find: "~/utils",
          replacement: path.resolve(__dirname, "./src/shared/utils"),
        },
        { find: "~", replacement: path.resolve(__dirname, "./src") },
      ],
    },
  };

  return defineConfig(baseConfig);
};

export default config;
