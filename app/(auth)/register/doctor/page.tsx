"use client";

import React from "react";

import AuthNav from "@/components/Navbar/auth-nav";
import Image from "next/image";
import { PiStudentFill } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import Link from "next/link";
import { DoctorRegisterForm } from "@/components/auth/doctor-register";

const ChooseRegister: React.FC = () => {
  return (
    <>
      <main className="relative w-full h-screen bg-white">
        <div className="relative z-0 w-full h-[50vh]">
          <Image
            src="/auth-bg.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute top-20 right-0 bottom-0 left-0 flex flex-col justify-center items-center z-10">
          <AuthNav />

          <div className="text-white text-center">
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <p className="text-sm mx-8">
              Fill the below information to register new account with EDUCARE.
            </p>
          </div>

          <div className="w-full max-w-md mt-8 mb-20">
            <DoctorRegisterForm />
          </div>
        </div>
      </main>
    </>
  );
};

export default ChooseRegister;
