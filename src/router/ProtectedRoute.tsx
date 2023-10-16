import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useUserStore } from "~/stores/useUserStore";
import { ROUTES } from "./routes";

type UserState = "loggedIn" | "loggedOut";

const HOME = {
  loggedIn: ROUTES.home,
  loggedOut: ROUTES.login,
} as const;

export const ProtectedRoute = ({
  children,
  expected,
}: {
  children?: ReactNode;
  expected: UserState | UserState[];
}) => {
  const userState = useUserStore((state) =>
    state.token ? "loggedIn" : "loggedOut",
  );

  if (!expected.includes(userState)) {
    return <Navigate to={HOME[userState]} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
