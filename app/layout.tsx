// "use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
// import { useState } from "react";
import { ethers } from "ethers";
// import { Web3Modal } from "../context/web3modal";
import ContextProvider from "../lib/wagmiContextProvider";
import { cookieToInitialState } from "wagmi";
import { config } from "../lib/config";
import { headers } from "next/headers";
import type { Metadata } from "next";

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
          </ContextProvider>
        </body>
      </html>
    </SessionProvider>
  );

  /* create local state to save account information after signin */
  // const [account, setAccount] = useState<String>("");
  // const router = useRouter();

  /* web3Modal configuration for enabling wallet access */
  // async function getWeb3Modal() {
  //   const web3Modal = new Web3Modal({
  //     cacheProvider: false,
  //     providerOptions: {
  //       walletconnect: {
  //         package: WalletConnectProvider,
  //         options: {
  //           infuraId: "your-infura-id",
  //         },
  //       },
  //     },
  //   });
  //   return web3Modal;
  // }

  /* the connect function uses web3 modal to connect to the user's wallet */
  // async function connect() {
  //   try {
  //     const web3Modal = await getWeb3Modal();
  //     const connection = await web3Modal.connect();
  //     const provider = new ethers.providers.Web3Provider(connection);
  //     const accounts = await provider.listAccounts();
  //     const userAddress = accounts[0];

  //     // Check if user already exists
  //     const existingUser = accountsData.find(
  //       (user) => user.account === userAddress
  //     );

  //     if (existingUser) {
  //       // Redirect to student dashboard if user exists
  //       router.push("/studentdashboard");
  //     } else {
  //       // Redirect to registration form if user is new
  //       router.push("/registrationform");
  //     }

  //     // Update state and local storage
  //     setAccount(userAddress);
  //     localStorage.setItem("isWalletConnected", "true");
  //   } catch (err) {
  //     console.log("error:", err);
  //   }
  // }

  // <main className="main">
  //   <div className="login-screen">
  //     <h1>
  //       Welcome to <span className="green">Educare</span>
  //     </h1>
  //     <p>
  //       Providing Accessibility through
  //       <span className="red"> Blockchain Technology</span>
  //     </p>
  //     <p className="p2">Please connect your wallet to proceed.</p>

  //     <div className="connect">
  //       {/* {!account && ( */}
  //       <div className="accountInfo">
  //         {/* <button
  //             className="buttonStyle"
  //             // onClick={connect}
  //           >
  //             Connect
  //           </button> */}
  //         <ContextProvider initialState={initialState}>
  //           {children}
  //         </ContextProvider>
  //       </div>
  //       {/* )} */}
  //       {/* {account && <p className="accountInfo">{account}</p>}

  //     <AccountContext.Provider value={account}>
  //       {children}
  //     </AccountContext.Provider> */}
  //     </div>
  //   </div>
  // </main>
}
