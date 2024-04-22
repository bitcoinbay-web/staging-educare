"use client";

import React from "react";
import "@/app/globals.css";

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
import { Divide } from "lucide-react";

const Navbar: React.FC = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  return (
    <div className="nav">
      <NavigationMenu>
        <NavigationMenuList className="navList">
          <NavigationMenuItem className="nav-logo">
            <Link href="/studentdashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <h1>educare</h1>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* <div className="nav-right"> */}
          <NavigationMenuItem className="nav-dp">
            <Link href="/studentdashboard/profile" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="nav-button">
            {/* <Link href="/studentdashboard/profile" legacyBehavior passHref> */}
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Button onClick={() => open()}>
                {address ? address : "Connect Wallet"}
              </Button>
            </NavigationMenuLink>
            {/* </Link> */}
          </NavigationMenuItem>
          {/* </div> */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
