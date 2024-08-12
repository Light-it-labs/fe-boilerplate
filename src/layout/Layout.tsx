import React from "react";
import { useOutlet } from "react-router-dom";

import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  const outlet = useOutlet();

  return (
    <div>
      <Sidebar />

      <div className='lg:pl-72'>
        <Navbar />

        <main className='py-10'>
          <div className='px-4 sm:px-6 lg:px-8'>{outlet}</div>
        </main>
      </div>
    </div>
  );
};
