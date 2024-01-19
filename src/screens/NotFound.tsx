import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

import { LightitLogo } from "~/assets";
import { Button } from "~/ui";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="mb-20">
        <img src={LightitLogo} alt="logo" />
      </div>

      <p className="mb-10 text-2xl">
        Looks like the page you are trying to access does not exist.
      </p>

      <Button
        variant="primary"
        size="sm"
        left={<ArrowLeftIcon />}
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </Button>
    </main>
  );
};
