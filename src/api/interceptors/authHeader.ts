import type { InternalAxiosRequestConfig } from "axios";

import { useUserStore } from "~/stores";

export const authHeaderInterceptor = (config: InternalAxiosRequestConfig) => {
  const { token } = useUserStore.getState();

  config.headers.Authorization = token ? `Bearer ${token}` : undefined;

  return config;
};
