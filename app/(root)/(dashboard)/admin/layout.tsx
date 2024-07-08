import { Metadata } from "next";
import { ReactNode } from "react";

import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/Sidebar/admin-sidebar";

export const metadata: Metadata = {
  title: "EduCare",
  description: "Development.",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <div className="flex">
        <section className="flex min-h-screen flex-1 flex-col  ">
          <Navbar />
          <AdminSidebar />
          <div className="w-full">{children}</div>
          {/* <Footer /> */}
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
