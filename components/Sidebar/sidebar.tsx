"use client";
import React from "react";
import "@/app/globals.css";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSession, signOut } from "next-auth/react";

// import { signOut } from "@/auth";

import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FaFileWaveform } from "react-icons/fa6";
import { IoQrCode } from "react-icons/io5";

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
          pathname === "/student/dashboard"
            ? "bg-white px-5 py-3 rounded-md"
            : ""
        } `}
      >
        <Link
          href="/student/dashboard"
          className="flex items-center text-[#8290AA] "
        >
          <FaHome className="mr-5 text-[#3E84EC]" />
          Dashboard
        </Link>
      </div>
      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/student/services"
            ? "bg-white px-5 py-3 rounded-md"
            : ""
        } `}
      >
        <Link
          href="/student/services"
          className="flex items-center text-[#8290AA] "
        >
          <AiFillProfile className="mr-5 text-[#3E84EC]" />
          Services
        </Link>
      </div>
      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/student/doctors-directory"
            ? "bg-white px-5 py-3 rounded-md"
            : ""
        } `}
      >
        <Link
          href="/student/doctors-directory"
          className="flex items-center text-[#8290AA] "
        >
          <MdMedicalServices className="mr-5 text-[#3E84EC]" />
          Directory
        </Link>
      </div>
      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/student/profile/user"
            ? "bg-white px-5 py-3 rounded-md"
            : ""
        } `}
      >
        <Link
          href="/student/profile/user"
          className="flex items-center text-[#8290AA] "
        >
          <FaUserCircle className="mr-5 text-[#3E84EC]" />
          Profile
        </Link>
      </div>

      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/student/user" ? "bg-white px-5 py-3 rounded-md" : ""
        } `}
      >
        <Link
          href="/student/user"
          className="flex items-center text-[#8290AA] "
        >
          <FaFileWaveform className="mr-5 text-[#3E84EC]" />
          Student Forms
        </Link>
      </div>
      <div
        className={`mb-10 font-bold text-md text-[#8290AA] ${
          pathname === "/student/share" ? "bg-white px-5 py-3 rounded-md" : ""
        } `}
      >
        <Link
          href="/student/share"
          className="flex items-center text-[#8290AA] "
        >
          <IoQrCode className="mr-5 text-[#3E84EC]" />
          Share QR Code
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
