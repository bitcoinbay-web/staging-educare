"use client";

import { useTransition } from "react";

import { auth } from "@/auth";
import Navbar from "@/components/Navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/lib/actions/settings";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const onClick = () => {
    startTransition(() => {
      settings({
        name: "Athika Fatima",
      }).then(() => {
        update();
      });
    });
  };
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="pt-10 pl-20 ml-64 h-full">
        {/* <div className="bg-white p-10 rounded-xl">
          <button onClick={onClick} type="submit">
            Logout
          </button>
        </div> */}
        <Card className="w-[600px]">
          <CardHeader>
            <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
          </CardHeader>
          <CardContent>
            <Button disabled={isPending} onClick={onClick}>
              Update Name
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SettingsPage;
