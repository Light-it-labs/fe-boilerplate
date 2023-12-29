import { StrictMode } from "react";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";

import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom";
import { BrowserRouter, createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from "react-router-dom";

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

Sentry.init({
  dsn: "https://81034eae5db8757aa05042f8afaaa360@o4506473427238912.ingest.sentry.io/4506473447424000",
  integrations: [
    new Sentry.BrowserTracing({
      // See docs for support of different versions of variation of react router
      // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
    new Sentry.Replay()
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});



createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={env.VITE_GOOGLE_AUTH_SSO_CLIENT_ID}>
        <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Sentry.ErrorBoundary>
        {ReactDOM.createPortal(<Toasts />, document.body)}
      </GoogleOAuthProvider>
      {env.VITE_APP_ENV === "local" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  </StrictMode>,
);
