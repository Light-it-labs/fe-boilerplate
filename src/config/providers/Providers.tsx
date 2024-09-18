import type { PropsWithChildren } from "react";
import React from "react";

import { ReactQueryProvider } from "./ReactQueryProvider";
import { SentryProvider } from "./SentryProvider";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <SentryProvider>{children}</SentryProvider>
    </ReactQueryProvider>
  );
};
