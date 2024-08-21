"use client";

import Image from "next/image";
import { IoIosCube } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { Button } from "../ui/button";

const AuthNav = () => {
  return (
    <>
      <main className="flex flex-col items-center py-10 h-[30%] text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div>
            <Image
              src="/educare-logo.jpeg"
              alt="Profile Photo"
              width={200}
              height={200}
              className=""
            />
          </div>
          <div className="px-20">
            <div className="flex space-x-8">
              <div className="flex items-center space-x-2 hover:text-black">
                <IoIosCube className="text-md" />
                <p className="text-md">DASHBOARD</p>{" "}
              </div>
              <div className="flex items-center space-x-2 hover:text-black">
                <FaUser className="text-md" />
                <p className="text-md">PROFILE</p>{" "}
              </div>
              <div className="flex items-center space-x-2 hover:text-black">
                <FaUserCircle className="text-md" />{" "}
                <p className="text-md">SIGN UP</p>{" "}
              </div>
              <div className="flex items-center space-x-2 hover:text-black">
                <FaKey className="text-md" />
                <p className="text-md">SIGN IN</p>{" "}
              </div>
            </div>
          </div>
          <div>
            <w3m-button size="md" />
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthNav;
