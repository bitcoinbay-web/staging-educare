"use client";

import React from "react";
import Navbar from "@/components/Navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import WagmiReadContractComponent from "@/components/WagmiReadContractComponent";
import { network } from "@/constants";
import WagmiUseAccount from "@/components/WagmiUseAccount";
import WagmiUseSignMessage from "@/components/WagmiUseSignMessage";
import WagmiVerifyMessage from "@/components/WagmiVerifyMessage";
import WagmiTransactionComponents from "@/components/WagmiTransactionComponents";

const ProfilePage = () => {
  const router = useRouter();
  function onSubmit() {
    router.push("/studentdashboard");
  }

  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className=" pt-10 pl-20 ml-64 h-full">
        <h1 className="font-bold text-2xl mb-4">Profile Information</h1>
        <WagmiUseAccount />
        {/* <WagmiReadContractComponent
          address="0xaB238839D44bc09B5090b85B7F1305cC1eef28b6"
          functionName="tokenURI"
          args={[BigInt(123456789)]}
          currentNetwork={network.sepolia}
        /> */}
        <WagmiTransactionComponents
          // txHash="0xd620b8601a9858ce93cd77d266286c8c4b1236ab809c0d1486e49edb6cb8a57d"
        />
        <WagmiUseSignMessage />
        <WagmiVerifyMessage />
        <div>
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
                    Make changes to your account here. Click save when you are
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
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
                  <Button onClick={() => onSubmit}>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you will be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
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
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
