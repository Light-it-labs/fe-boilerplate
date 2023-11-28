import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";

import { Layout } from "~/layout";
import { Home, Login, NotFound } from "~/screens";
import { ModalRouter } from "./ModalRouter";
import { ROUTES } from "./routes";
import { useUserStore } from "~/stores";

export const Router = () => {
  const location = useLocation();
  const { previousLocation } = (location.state ?? {}) as {
    previousLocation?: Location;
  };

  const userState = useUserStore((state) =>
    state.token ? "loggedIn" : "loggedOut",
  );

  return (
    <>
      <Routes location={previousLocation ?? location}>
        {/* PUBLIC ONLY ROUTES */}
        {userState === "loggedOut" && (
          <>
           <Route
              element={<Navigate to={ROUTES.login} replace />}
              path={"*"}
            />
            <Route element={<Login />} path={ROUTES.login} />
          </>
        )}
        {/* PRIVATE ONLY ROUTES */}
        {userState === "loggedIn" && (
         <>
            <Route
                element={<Navigate to={ROUTES.home} />}
                path={"*"}
              />
            <Route path="*" element={<NotFound />} />
            <Route element={<Layout />}>
              <Route element={<Home />} path={ROUTES.home} />
            </Route>
          </>     
            )}
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
