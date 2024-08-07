"use client";
import React from "react";
import "@/app/globals.css";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSession, signOut } from "next-auth/react";

// import { signOut } from "@/auth";

import { FaHome, FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DoctorSidebar: React.FC = () => {
  const onClick = () => {
    signOut({
      callbackUrl: "/login",
    });
  };
  const pathname = usePathname();

  return (
    <div className="fixed w-64 h-screen text-white px-12 py-5 bg-[#F7F8F9] ">
      <div className="mb-20">
        <Image
          src="/educare-logo.jpeg"
          alt="educare-logo"
          width={200}
          height={100}
          className="mb-5"
        />
        <hr />
      </div>

      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/doctor/dashboard"
            ? "bg-white px-5 py-3 rounded-md"
            : ""
        } `}
      >
        <Link
          href="/doctor/dashboard"
          className="flex items-center text-[#8290AA] "
        >
          <FaHome className="mr-5 text-[#3E84EC]" />
          Dashboard
        </Link>
      </div>
      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/doctor/profile" ? "bg-white px-5 py-3 rounded-md" : ""
        } `}
      >
        <Link
          href="/doctor/profile"
          className="flex items-center text-[#8290AA] "
        >
          <FaUserCircle className="mr-5 text-[#3E84EC]" />
          Profile
        </Link>
      </div>

      <div className={`mb-10 font-bold text-md text-[#8290AA]`}>
        <button
          onClick={onClick}
          type="submit"
          className="flex items-center text-[#8290AA] "
        >
          <IoLogOut className="mr-5 text-[#3E84EC]" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DoctorSidebar;
