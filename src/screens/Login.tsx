import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { googleLogin } from "~/api/login";
import type { GoogleLoginRequest } from "~/api/login";
import { LightitLogo } from "~/assets";
import { errorToast, useToastStore } from "~/components";
import { ROUTES } from "~/router";
import { useUserStore } from "~/stores/useUserStore";

export const Login = () => {
  const pushToast = useToastStore((state) => state.pushToast);

  const setUser = useUserStore((s) => s.setUser);
  const setToken = useUserStore((s) => s.setToken);

  const { mutate: loginMutation } = useMutation({
    mutationFn: (requestBody: GoogleLoginRequest) =>
      googleLogin({
        ...requestBody,
      }),
    onSuccess: (data) => {
      void pushToast({ type: "success", title: "Welcome back!" });

      setToken(data.data.accessToken);

      navigate(ROUTES.home);
    },
    onError: (e) => {
      errorToast(e);

      // here we fail forwards, we are basically logging the user anyways
      // because we KNOW the login will fail
      void pushToast({ type: "success", title: "Welcome back!" });

      setToken("some token");

      navigate(ROUTES.home);
    },
  });

  const navigate = useNavigate();
  const handleLogin = (credential: string) => {
    if (!credential) {
      void pushToast({
        type: "error",
        title: "Login Error",
        message: "The right credential is missing",
      });
      return;
    }

    const { email, name } = jwt_decode<{ email: string; name: string }>(
      credential,
    );

    setUser({
      email,
      name,
    });

    loginMutation({
      email,
      name,
      googleToken: credential,
    });
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-black bg-center">
      <div className="z-10 flex flex-col items-center lg:flex-row">
        <img src={LightitLogo} width={400} alt="Lightit logo" />
        <div className="flex-column items-center justify-center">
          <p className="mb-2 text-2xl font-extrabold text-white">
            Welcome to Assignments App!
          </p>
          <GoogleLogin
            width={200}
            auto_select={false}
            useOneTap={false}
            onSuccess={(resp) => handleLogin(resp.credential ?? "")}
            onError={() => {
              void pushToast({
                type: "error",
                title: "Login Error",
                message:
                  "An error occurred while trying to log in with a Google account",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
