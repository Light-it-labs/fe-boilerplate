import React from "react";

import { LightitLogo } from "~/assets";

interface ErrorBoundaryFallbackProps {
  errorCode?: string | number;
  title: string;
  children?: React.ReactNode;
}
export const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({ errorCode, title, children }) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="mb-20">
        <img src={LightitLogo} alt="logo" />
      </div>
      <h1 className="mb-5 text-5xl font-bold">{errorCode}</h1>
      <h2 className="mb-10 text-2xl">{title}</h2>
      {children && <p className="mb-10 text-xl text-gray-500">{children}</p>}
    </main>
  );
};
