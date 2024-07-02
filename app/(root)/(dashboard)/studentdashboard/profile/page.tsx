"use client"; // This directive is used in Next.js to indicate that the file contains client-side code.

import React from "react"; // Import React library
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

const ProfilePage = () => {
  const router = useRouter(); // Initialize useRouter hook for navigation

  // Function to handle form submission
  function onSubmit() {
    router.push("/studentdashboard"); // Navigate to student dashboard on form submission
  }

  return (
    <div>
      <div className="pt-10 pl-20 ml-64 h-full">
        <h1 className="font-bold text-2xl mb-4">Profile Information</h1>
        <div>
          {/* Tabs component to switch between account and password sections */}
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
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
          </Tabs>
          <WagmiReadContractComponent />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; // Export the ProfilePage component as the default export
