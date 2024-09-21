import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  email: string;
  name: string;
};

export type AuthStoreState = {
  user: User | null;
  setUser(user: User | null): void;
  token: string | null;
  setToken(token: string | null): void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user: User | null) => {
        set(() => ({ user }));
      },
      setToken: (token: string | null) => {
        set(() => ({ token }));
      },
    }),
    {
      name: "feedbackAuthStore",
    },
  ),
);
