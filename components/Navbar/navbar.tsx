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

import Link from "next/link";

const Navbar: React.FC = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  return (
    <div className="w-full p-2 md:p-10 bg-black">
      <NavigationMenu>
        <NavigationMenuList
          className={cn("flex justify-between items-center gap-x-10 bg-black")}
        >
          <NavigationMenuItem className="nav-logo">
            <Link href="/studentdashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <h1>🎓 Educare</h1>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <div className="flex items-center">
            <NavigationMenuItem className={cn("nav-dp ml-4")}>
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
              {/* <Link href="/studentdashboard/profile" legacyBehavior passHref> */}
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <div className="text-black bg-white">
                  <Button variant="outline" onClick={() => open()}>
                    {address ? address : "Connect Wallet"}
                  </Button>
                </div>
              </NavigationMenuLink>
              {/* </Link> */}
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
