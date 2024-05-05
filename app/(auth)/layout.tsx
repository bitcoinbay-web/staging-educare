import React from "react";
import { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      {/* <Navbar />
      <Sidebar /> */}
      {children}
    </main>
    // <main className="relative">
    //   <Navbar />

    //   <div className="flex">
    //     <Sidebar />

    //     <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
    //       <div className="w-full">{children}</div>
    //     </section>
    //   </div>
    // </main>
  );
};

export default AuthLayout;
