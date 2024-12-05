import "~/providers/sentry/sentry";

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import { Providers } from "./providers";
import { Router } from "./router";

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "There's no #root div, something's wrong with our index.html",
  );
}

createRoot(root).render(
  <StrictMode>
    <Providers>
      <Router />
    </Providers>
  </StrictMode>,
);
