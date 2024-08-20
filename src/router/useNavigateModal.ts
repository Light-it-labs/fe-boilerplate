/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NavigateOptions } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import type { MODAL_ROUTES } from "./routes";

type ModalRoutes = (typeof MODAL_ROUTES)[keyof typeof MODAL_ROUTES];
type ValidModalUrl<T extends string> = T extends `${infer _}/${infer _}`
  ? never
  : ModalRoutes | `${ModalRoutes}/${T}` | `${ModalRoutes}/${T}/${T}`;

export const useNavigateModal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { previousLocation } = (location.state ?? {}) as {
    previousLocation?: Location;
  };

  return <T extends string, K>(
    // we make normal routing work as well as param routing, but make multiple params invalid
    to:
      | ValidModalUrl<T>
      | {
          pathname: ValidModalUrl<T>;
          search?: string;
          hash?: string;
        },
    options?: Omit<NavigateOptions, "state"> & { state?: K },
  ) => {
    navigate(to, {
      ...options,

      state: {
        ...options?.state,
        previousLocation: previousLocation ?? location,
      },
    });
  };
};
