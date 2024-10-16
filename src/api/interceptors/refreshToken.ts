import mem from "mem";

import { authStore } from "~/stores";
import type { ServiceResponse } from "../api.types";
import { api } from "../axios";

export interface UserToken {
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

// refresh token was based on this article
// https://dev.to/franciscomendes10866/how-to-use-axios-interceptors-b7d

const refreshToken = async () => {
  let refreshWasSuccessful = false;
  try {
    const response = await api.post<ServiceResponse<UserToken>>(
      "/auth/refresh",
      {},
    );
    const { data: userToken } = response.data;
    if (!userToken.refresh_token) {
      authStore.setToken(null);
    } else {
      refreshWasSuccessful = true;
      authStore.setToken(userToken.refresh_token);
    }
  } catch (error) {
    authStore.setToken(null);
  }
  return refreshWasSuccessful;
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshToken, {
  maxAge,
});
