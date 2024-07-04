"use client";
import React from "react";
import "@/app/globals.css";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSession, signOut } from "next-auth/react";

// import { signOut } from "@/auth";

import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
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
          pathname === "/studentdashboard"
            ? "bg-white px-5 py-3 rounded-md"
            : ""
        } `}
      >
        <Link
          href="/studentdashboard"
          className="flex items-center text-[#8290AA] "
        >
          <FaHome className="mr-5 text-[#3E84EC]" />
          Dashboard
        </Link>
      </div>
      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/studentdashboard/services"
            ? "bg-white px-5 py-3 rounded-md"
            : ""
        } `}
      >
        <Link
          href="/studentdashboard/services"
          className="flex items-center text-[#8290AA] "
        >
          <FaUser className="mr-5 text-[#3E84EC]" />
          Services
        </Link>
      </div>
      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/studentdashboard/profile"
            ? "bg-white px-5 py-3 rounded-md"
            : ""
        } `}
      >
        <Link
          href="/studentdashboard/profile"
          className="flex items-center text-[#8290AA] "
        >
          <FaUser className="mr-5 text-[#3E84EC]" />
          Profile
        </Link>
      </div>
      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/doctor" ? "bg-white px-5 py-3 rounded-md" : ""
        } `}
      >
        <Link href="/doctor" className="flex items-center text-[#8290AA] ">
          <IoIosRocket className="mr-5 text-[#3E84EC]" />
          Doctor
        </Link>
      </div>
      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/user" ? "bg-white px-5 py-3 rounded-md" : ""
        } `}
      >
        <Link href="/user" className="flex items-center text-[#8290AA] ">
          <FaUser className="mr-5 text-[#3E84EC]" />
          Student Forms
        </Link>
      </div>
      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/share" ? "bg-white px-5 py-3 rounded-md" : ""
        } `}
      >
        <Link href="/share" className="flex items-center text-[#8290AA] ">
          <FaUser className="mr-5 text-[#3E84EC]" />
          Share QR Code
        </Link>
      </div>
      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/admin" ? "bg-white px-5 py-3 rounded-md" : ""
        } `}
      >
        <Link href="/admin" className="flex items-center text-[#8290AA] ">
          <FaUser className="mr-5 text-[#3E84EC]" />
          Admin
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

export default Sidebar;
