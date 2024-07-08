"use client";

import React from "react";
import "@/app/globals.css";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import Image from "next/image";

import Link from "next/link";

const Navbar: React.FC = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  return (
    <div className="w-full p-5 r-10 md:p-6 flex justify-end">
      <NavigationMenu>
        <NavigationMenuList className={cn("flex items-center gap-x-4")}>
          <div className="flex items-center">
            <NavigationMenuItem className={cn("nav-dp ml-4 mt-1.5")}>
              <Link href="/studentdashboard/profile" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className={cn("nav-button ml-4")}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <div className="text-black bg-white">
                  <Button variant="outline" onClick={() => open()}>
                    {address ? address : "Connect Wallet"}
                  </Button>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
