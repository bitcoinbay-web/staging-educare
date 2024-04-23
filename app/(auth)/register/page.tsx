"use client";

// import "@/app/globals.css";
import { Inter } from "next/font/google";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import React, { useState, useEffect } from "react";

import { useRouter, usePathname } from "next/navigation";
import accountsData from "@/db/accounts.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAccount } from "wagmi";
// import { connectToDB } from "@/lib/mongoose";

import { Button } from "@/components/ui/button"
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
import { updateUser } from "@/lib/actions/user.actions";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  stdID: z.string().min(5, { message: "Must be 5 or more characters long" }),
  walletID: z
    .string()
    .min(26, { message: "Must be 26 or more characters long" }),
});

const Login: React.FC = () => {
  // ...

  const { open } = useWeb3Modal();
  const { address } = useAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      stdID: "",
      walletID: address,
    },
  });

  /* create local state to save account information after signin */
  const [account, setAccount] = useState<String>("");

  // State to store connected account

  useEffect(() => {
    if (address) {
      // If the address exists (i.e., connected), set the input field value
      //@ts-ignore
      document.getElementById("wallet-input").value = address;
      // Change the button text to "Connected"
      //@ts-ignore
      document.getElementById("connect-button").innerText = "Connected";
    }
  }, [address]);
  const router = useRouter();
  const pathname = usePathname();

  // 2. Define a submit handler.
  // async
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateUser({
      username: values.username,
      email: values.email,
      stdID: values.stdID,
      walletID: values.walletID,
      path: pathname,
    });

    if (pathname === "/register") {
      router.push("/studentdashboard");
    }
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
    //   } else {
    //     console.error("Failed to submit form:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
  };

  return (
    <div className="main">
      <div className="register-screen">
        <h1>Registration Form</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Full Name" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stdID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Student ID" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="walletID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="Enter Your Student ID" /> */}
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        id="wallet-input"
                        placeholder="Click on the button to connect to your wallet"
                        value={address || ""} // Ensure a default empty string if address is null/undefined
                        readOnly

                        // onChange={(e) => setAccount(e.target.value)}
                      />
                      <Button
                        type="button"
                        id="connect-button"
                        onClick={() => open()}
                      >
                        {address ? "Connected" : "Connect Wallet"}
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="button">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
