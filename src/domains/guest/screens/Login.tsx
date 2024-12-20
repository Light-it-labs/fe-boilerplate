import React from "react";

import { Logo } from "~/shared";

export const Login = () => {
  return (
    <div className='relative flex h-screen w-screen items-center justify-center overflow-hidden bg-black bg-center'>
      <div className='z-10 flex flex-col items-center lg:flex-row'>
        <Logo />

        <div className='flex flex-col items-center justify-center'>
          <p className='mb-2 text-2xl font-extrabold text-white'>
            Frontend Boilerplate Login!
          </p>
        </div>
      </div>
    </div>
  );
};
