"use client";

import React from "react";

import AuthNav from "@/components/Navbar/auth-nav";
import Image from "next/image";
import { PiStudentFill } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";

const Register: React.FC = () => {
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
            <RegisterForm />
          </div>

          {/* <div className="bg-white shadow-lg w-[50%] h-[50%] text-center rounded-lg p-20 flex flex-col">
            <h1 className="font-bold text-[25px] mb-10">
              Empowering Education and Healthcare
            </h1>
            <div className="flex space-x-4 mb-4">
              <Link href="/register/student">
                <div className="border rounded-sm flex flex-col items-center text-center p-4 transition duration-300 hover:bg-blue-500 hover:text-white">
                  <PiStudentFill className="text-[70px] mb-2 mt-4" />
                  <h1 className="font-bold">Student Register</h1>
                  <p className="text-sm">
                    Unlock exclusive educational resources
                  </p>
                </div>
              </Link>
              <Link href="/register/doctor">
                <div className="border rounded-sm flex flex-col items-center text-center p-4 transition duration-300 hover:bg-blue-500 hover:text-white">
                  <FaUserDoctor className="text-[50px] mb-4 mt-4" />
                  <h1 className="font-bold">
                    Healthcare Practitioner Register
                  </h1>
                  <p className="text-sm">
                    Access medical records and collaborate with students
                  </p>
                </div>
              </Link>
              
            </div>
            <p className="mt-auto">
              Already have an account?{" "}
              <Link
                className="text-blue-500 font-bold hover:underline"
                href="/login"
              >
                Signin
              </Link>
            </p>
          </div> */}
        </div>
      </main>
    </>
  );
};

export default Register;
