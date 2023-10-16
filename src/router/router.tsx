import { Route, Routes, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";

import { Layout } from "~/layout";
import { Home, Login, NotFound } from "~/screens";
import { ModalRouter } from "./ModalRouter";
import { ProtectedRoute } from "./ProtectedRoute";
import { ROUTES } from "./routes";

export const Router = () => {
  const location = useLocation();
  const { previousLocation } = (location.state ?? {}) as {
    previousLocation?: Location;
  };

  return (
    <>
      <Routes location={previousLocation ?? location}>
        {/* PUBLIC ONLY ROUTES */}
        <Route element={<ProtectedRoute expected="loggedOut" />}>
          <Route element={<Login />} path={ROUTES.login} />
        </Route>
        {/* PRIVATE ONLY ROUTES */}
        <Route element={<ProtectedRoute expected="loggedIn" />}>
          <Route path="*" element={<NotFound />} />

          <Route element={<Layout />}>
            <Route element={<Home />} path={ROUTES.home} />
          </Route>
        </Route>
      </Routes>
      <Routes>
        <Route
          path="*"
          element={<ModalRouter showModal={!!previousLocation} />}
        />
      </Routes>
    </>
  );
};
