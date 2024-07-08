"use client";
import { currentUser } from "@/lib/auth";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { PiFilesFill } from "react-icons/pi";
import { IoMdCube } from "react-icons/io";

import { useSession } from "next-auth/react";

import Image from "next/image";
import UserTabs from "./user-tabs";

const ProfileNav = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="bg-white bg-opacity-90 w-full h-full shadow-lg p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <Image
            src="/profile-pic.avif"
            alt="Background"
            width={75}
            height={75}
            className="rounded-lg"
          />
          <div>
            <h1 className="font-bold">{session.user.name}</h1>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
          <div className="w-full flex justify-end items-center">
            {/* <Tabs defaultValue="account" className="w-full text-center">
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <TabsTrigger value="account">
                  <HiMiniWrenchScrewdriver className="mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="password">
                  <PiFilesFill className="mr-2" />
                  Forms
                </TabsTrigger>
                <TabsTrigger value="consentForm">
                  <IoMdCube className="mr-2" />
                  Bidirectional Consent Form
                </TabsTrigger>
              </TabsList>
            </Tabs> */}
            <UserTabs />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileNav;
