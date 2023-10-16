import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";

import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Toasts } from "./components";
import { env } from "./env";
import { Router } from "./router";

const queryClient = new QueryClient();

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "There's no #root div, something's wrong with our index.html",
  );
}

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={env.VITE_GOOGLE_AUTH_SSO_CLIENT_ID}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        {ReactDOM.createPortal(<Toasts />, document.body)}
      </GoogleOAuthProvider>
      {env.VITE_APP_ENV === "local" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  </StrictMode>,
);
