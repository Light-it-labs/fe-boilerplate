import "~/services/monitoring/SentryInit";

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import { SentryProvider } from "~/services/monitoring";
import { ReactQueryProvider } from "~/services/query";
import { Router } from "~/services/router";

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "There's no #root div, something's wrong with our index.html",
  );
}

createRoot(root).render(
  <StrictMode>
    <ReactQueryProvider>
      <SentryProvider>
        <Router />
      </SentryProvider>
    </ReactQueryProvider>
  </StrictMode>,
);
