import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ethers } from "ethers";
import ContextProvider from "../lib/wagmiContextProvider";
import { cookieToInitialState } from "wagmi";
import { config } from "../lib/config";
import { headers } from "next/headers";
import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js App",
  description: "Next.js App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ContextProvider initialState={initialState}>
            {children}
            <Toaster />
          </ContextProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
