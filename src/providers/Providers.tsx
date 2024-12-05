import type { PropsWithChildren } from "react";
import React from "react";
import { I18nProvider } from "react-aria-components";

import { ReactQueryProvider } from "./ReactQueryProvider";
import { SentryProvider } from "./sentry/SentryProvider";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <I18nProvider locale='en-US'>
        <SentryProvider>{children}</SentryProvider>
      </I18nProvider>
    </ReactQueryProvider>
  );
};
