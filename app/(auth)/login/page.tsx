"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
// import "@/app/globals.css";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginForm } from "@/components/auth/login-form";
import AuthNav from "@/components/Navbar/auth-nav";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  walletID: z
    .string()
    .min(26, { message: "Must be 26 or more characters long" }),
});

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      walletID: address,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // try {
    //   // Send the form data to the API endpoint
    //   const response = await fetch("api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   });

    // if (response.ok) {
    // Redirect to student dashboard if the form submission is successful
    router.push("/studentdashboard");
    //   } else {
    //     console.error("Failed to submit form:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
  }

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-custom1 via-custom2 to-custom3">
        <AuthNav />
        {/* <h1>Login Page</h1> */}

        {/* <img src="educare-img.jpeg" alt="" layout="fill" /> */}
        <div className="p-2 text-white text-center">
          <h1 className="text-4xl font-bold mb-8">Welcome Back!</h1>
          <p className="text-xl mx-8">Enter your credentials to login</p>
        </div>

        <div className="w-1/2 flex items-center justify-center p-8">
          <LoginForm />
        </div>
      </main>
    </>
    // <div className="main">
    //   <div className="register-screen">
    //     <h1>Login</h1>
    //     <Form {...form}>
    //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //         <FormField
    //           control={form.control}
    //           name="username"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Name</FormLabel>
    //               <FormControl>
    //                 <Input placeholder="Enter Your Full Name" {...field} />
    //               </FormControl>
    //               {/* <FormDescription>
    //             This is your public display name.
    //           </FormDescription> */}
    //               {/* <FormMessage /> */}
    //             </FormItem>
    //           )}
    //         />

    //         <FormField
    //           control={form.control}
    //           name="walletID"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Wallet Address</FormLabel>
    //               <FormControl>
    //                 {/* <Input placeholder="Enter Your Student ID" /> */}
    //                 <div className="flex w-full items-center space-x-2">
    //                   <Input
    //                     id="wallet-input"
    //                     placeholder="Click on the button to connect to your wallet"
    //                     value={address || ""} // Ensure a default empty string if address is null/undefined
    //                     readOnly

    //                     // onChange={(e) => setAccount(e.target.value)}
    //                   />
    //                   <Button
    //                     type="button"
    //                     id="connect-button"
    //                     onClick={() => open()}
    //                   >
    //                     {address ? "Connected" : "Connect Wallet"}
    //                   </Button>
    //                 </div>
    //               </FormControl>
    //             </FormItem>
    //           )}
    //         />
    //         <div className="button">
    //           <Button type="submit">Submit</Button>
    //         </div>
    //       </form>
    //     </Form>
    //   </div>
    // </div>
  );
};

export default LoginPage;
