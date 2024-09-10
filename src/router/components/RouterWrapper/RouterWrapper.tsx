import type { PropsWithChildren } from "react";
import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { MainLayout } from "~/router/layouts";
import { useUserStore } from "~/stores";

type Props = PropsWithChildren & {
  guest?: boolean;
};

export const RouterWrapper = ({ guest = false, children }: Props) => {
  const location = useLocation();
  const { previousLocation } = (location.state ?? {}) as {
    previousLocation?: Location;
  };

  const isAuthenticated = useUserStore((state) => state.token);

  if (!guest && !isAuthenticated) {
    return <Navigate to='/404' />;
  }

  return (
    <Routes location={previousLocation ?? location}>
      <Route element={<MainLayout />}>{children}</Route>
    </Routes>
  );
};
