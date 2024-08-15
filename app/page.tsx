"use client";

import { Courier_Prime } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";

const font = Courier_Prime({
  subsets: ["latin"],
  weight: ["400"],
});

const HomePage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-custom1 via-custom2 to-custom3">
      <div className="space-y-6 text-center">
        {/* <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🎓 educare
        </h1> */}
        <div className="flex items-center justify-center">
          <img src="educare-logo.jpeg" alt="" className="max-h-48" />
        </div>
        <p className={cn("text-white text-lg", font.className)}>
          A blockchain based accessibility service provider for your
          institution.
        </p>
        <div className="space-x-6">
          <LoginButton>
            <Button>Sign in</Button>
          </LoginButton>
          <RegisterButton>
            <Button>Sign up</Button>
          </RegisterButton>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
