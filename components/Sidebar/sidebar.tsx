"use client";
import React from "react";
import "@/app/globals.css";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSession, signOut } from "next-auth/react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const onClick = () => {
    signOut();
  };
  const pathname = usePathname();

  return (
    <div className="absolute w-64 h-screen text-white p-12 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div
        className={`mb-10 font-bold text-lg ${
          pathname === "/studentdashboard" ? "text-black" : ""
        } `}
      >
        <Link href="/studentdashboard">Home</Link>
      </div>
      <div
        className={`mb-10 font-bold text-lg ${
          pathname === "/studentdashboard/services" ? "text-black" : ""
        } `}
      >
        <Link href="/studentdashboard/services">Services</Link>
      </div>
      <div
        className={`mb-10 font-bold text-lg ${
          pathname === "/studentdashboard/profile" ? "text-black" : ""
        } `}
      >
        <Link href="/studentdashboard/profile">Profile</Link>
      </div>
      <div
        className={`mb-10 font-bold text-lg ${
          pathname === "/admin" ? "text-black" : ""
        } `}
      >
        <Link href="/admin">Admin</Link>
      </div>

      <div className={`mb-10 font-bold text-lg`}>
        <button onClick={onClick} type="submit">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
