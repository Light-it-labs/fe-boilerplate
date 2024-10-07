import React from "react";
import { BrowserRouter } from "react-router-dom";

import { GuestRouter } from "~/domains";

export const Router = () => {
  return (
    <BrowserRouter>
      <GuestRouter />
    </BrowserRouter>
  );
};
