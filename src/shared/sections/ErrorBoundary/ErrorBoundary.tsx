import React from "react";

import { Logo } from "~/components";

export const ErrorBoundary = () => {
  return (
    <main className='flex h-screen flex-col items-center justify-center'>
      <div className='mb-20'>
        <Logo className='bg-violet-400 text-white' />
      </div>
      <h2 className='mb-10 text-2xl'>Something went terribly wrong!</h2>
    </main>
  );
};
