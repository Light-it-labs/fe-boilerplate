import { env } from "~/env";

export const isLocal = env.VITE_APP_ENV === "local";

export * from "./common.types";
export * from "./storybook.types";
