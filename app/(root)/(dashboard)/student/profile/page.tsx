"use client"; // This directive is used in Next.js to indicate that the file contains client-side code.

import React from "react"; // Import React library
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"; // Import Button component
import { useRouter } from "next/navigation"; // Import useRouter hook from Next.js for navigation
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import Card components
import { Input } from "@/components/ui/input"; // Import Input component
import { Label } from "@/components/ui/label"; // Import Label component
import WagmiReadContractComponent from "@/components/WagmiReadContractComponent"; // Import WagmiReadContractComponent
import BidirectionalConsentForm from "@/components/forms/BidirectionalConsentForm"; // Import BidirectionalConsentForm component
import FileUpload from "@/components/FileUpload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Image from "next/image";
import UserProfilePage from "@/components/user/user-card";
import ProfileNav from "@/components/user/profile-nav";

const ProfilePage = () => {
  const router = useRouter(); // Initialize useRouter hook for navigation
  const { data: session } = useSession();

  // Function to handle form submission
  function onSubmit() {
    router.push("/studentdashboard"); // Navigate to student dashboard on form submission
  }

  return (
    <>
      <div className=" ml-64 z-0">
        <div className="absolute w-[80%] h-[30%] ml-4 mt-[-80px]">
          <Image
            src="/profile-background.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="relative min-h-screen ml-64 mt-[8rem] flex flex-col items-center z-10">
        <div className="w-[95%] h-[10%]">
          <ProfileNav />
        </div>
        {/* <p>{user.email}</p> */}

        <div className="w-full max-w-5xl">
          <div>
            {/* Tabs component to switch between account and password sections */}
            <Tabs defaultValue="account" className="w-full text-center mt-10">
              <TabsList className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-1">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="consentForm">
                  Bidirectional Consent Form
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <UserProfilePage />
              </TabsContent>
              <TabsContent value="consentForm">
                <BidirectionalConsentForm />
              </TabsContent>
            </Tabs>

            <WagmiReadContractComponent />
            <h2 className="font-bold text-2xl mb-4 text-center">
              Upload Files
            </h2>
            <div className="flex space-x-2 w-[80%]">
              <Card className="flex-1 w-[350px]">
                <CardHeader>
                  <CardTitle>Accessibility Form</CardTitle>
                  <CardDescription>
                    Upload your filled out Accessibility Form
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <FileUpload userId={session.user.id} />
                </CardFooter>
              </Card>
              <Card className="flex-1 w-[350px]">
                <CardHeader>
                  <CardTitle>Student OSAP Form</CardTitle>
                  <CardDescription>
                    Upload your filled out Student OSAP Form
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <FileUpload userId={session.user.id} />
                </CardFooter>
              </Card>
              <Card className="flex-1 w-[350px]">
                <CardHeader>
                  <CardTitle>
                    Express Registration Option (ERO) Intake Form
                  </CardTitle>
                  <CardDescription>
                    Upload your filled out ERO Intake Form
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <FileUpload userId={session.user.id} />
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage; // Export the ProfilePage component as the default export
