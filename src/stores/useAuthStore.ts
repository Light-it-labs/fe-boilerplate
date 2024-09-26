import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthStoreState = {
  token: string | null;
  setToken(token: string | null): void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string | null) => {
        set(() => ({ token }));
      },
    }),
    {
      name: "authStore",
    },
  ),
);
