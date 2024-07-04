"use client"; // This directive is used in Next.js to indicate that the file contains client-side code.

import React from "react"; // Import React library
import { useSession } from 'next-auth/react';
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
import FileUpload from '@/components/FileUpload';

const ProfilePage = () => {
  const router = useRouter(); // Initialize useRouter hook for navigation
  const { data: session } = useSession();

  // Function to handle form submission
  function onSubmit() {
    router.push("/studentdashboard"); // Navigate to student dashboard on form submission
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl p-4">
        <h1 className="font-bold text-2xl mb-4">Profile Information</h1>
        <div>
          {/* Tabs component to switch between account and password sections */}
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="consentForm">Bidirectional Consent Form</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you are done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Input fields for name and username */}
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => onSubmit()}>Save changes</Button> {/* Save button to submit form */}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you will be logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Input fields for current and new passwords */}
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button> {/* Save button to change password */}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="consentForm">
              <BidirectionalConsentForm />
            </TabsContent>
          </Tabs>
          <WagmiReadContractComponent />
          <FileUpload userId={session.user.id} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; // Export the ProfilePage component as the default export
