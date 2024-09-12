import type { PropsWithChildren } from "react";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { MainLayout } from "~/router/layouts";
import { useUserStore } from "~/stores";

type Props = PropsWithChildren & {
  guest?: boolean;
};

export const RouterWrapper = ({ guest = false, children }: Props) => {
  const isAuthenticated = useUserStore((state) => state.token);

  if (!guest && !isAuthenticated) {
    return <Navigate to='/404' />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>{children}</Route>
    </Routes>
  );
};
