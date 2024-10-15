import type { InternalAxiosRequestConfig } from "axios";

import { authStore } from "~/stores";

export const authHeaderInterceptor = (config: InternalAxiosRequestConfig) => {
  const { token } = authStore.getState();

  config.headers.Authorization = token ? `Bearer ${token}` : undefined;

  return config;
};
