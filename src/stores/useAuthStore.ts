/**
 * The `persist` middleware automatically saves the `token` to localStorage under the key "authStore".
 * We only store the `token` here to comply with HIPAA regulations, ensuring that no sensitive user information
 * beyond authentication tokens is persisted.
 *
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthStoreState = {
  token: string | null;
};

const useAuthStore = create<AuthStoreState>()(
  persist(
    (_) => ({
      token: null,
    }),
    {
      name: "authStore",
    },
  ),
);

export const getState = () => useAuthStore.getState();

export const getToken = () => useAuthStore((state) => state.token);

export const setToken = (token: string | null) =>
  useAuthStore.setState(() => ({ token }));
