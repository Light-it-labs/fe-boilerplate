import axios from "axios";

import { env } from "~/env";
import { useUserStore } from "~/stores/useUserStore";
import { errorResponseInterceptor } from "./interceptors";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAuthHeaders = () => {
  const userToken = useUserStore.getState().token;

  return {
    Authorization: `Bearer ${userToken}`,
  };
};

// interceptor was based on this article
// https://dev.to/franciscomendes10866/how-to-use-axios-interceptors-b7d
api.interceptors.response.use((response) => response, errorResponseInterceptor);

export interface ServiceResponse<T> {
  status: number;
  success: boolean;
  data: T;
  pagination?: {
    count: number;
    total: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
    links: {
      previous: string;
      next: string;
    };
  };
}
