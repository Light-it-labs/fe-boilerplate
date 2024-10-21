import React from "react";
import { Route } from "react-router-dom";

import { RouterWrapper, ROUTES } from "~/router";
import { Home, Login, Playground } from "./screens";

export const GuestRouter = () => {
  return (
    <RouterWrapper guest>
      <Route element={<Home />} path={ROUTES.home} />
      <Route element={<Login />} path={ROUTES.login} />
      <Route element={<Playground />} path={ROUTES.playground} />
    </RouterWrapper>
  );
};
