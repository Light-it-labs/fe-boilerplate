import type { FC } from "react";

export type BaseRoute = {
  screen: FC;
  layout?: FC;
  path: string;
  // Navigation Purposes
  name: string;
  nav: boolean;
  // Revise the type of the `guest` property
  // Redirecting purposes
  guest: boolean;
  permissions: string[];
};
