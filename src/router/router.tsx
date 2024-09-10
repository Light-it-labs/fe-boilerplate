import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { GuestRouter } from "~/domains";
import { NotFound } from "~/sections";

export const Router = () => {
  return (
    <BrowserRouter>
      <GuestRouter />
      <Route path='*' element={<NotFound />} />
    </BrowserRouter>
  );
};
