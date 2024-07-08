"use client";

import * as z from "zod";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DoctorRegisterSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
// import { register } from "@/lib/actions/register";

import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { doctorRegister } from "@/lib/actions/doctor-register";

export const DoctorRegisterForm = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
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
  });

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof DoctorRegisterSchema>>({
    resolver: zodResolver(DoctorRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      walletID: address,
    },
  });

  const onSubmit = (values: z.infer<typeof DoctorRegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      doctorRegister(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div>
      <CardWrapper
        headerLabel=""
        backButtonLabel="Already have an account?"
        backButtonHref="/login"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your Email"
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your Password"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your Full Name"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
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
                          className="bg-[#7C1749]"
                          id="connect-button"
                          onClick={() => open()}
                        >
                          {address ? "CONNECTED" : "CONNECT"}
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              className="w-full bg-[#3E84EC]"
              disabled={isPending}
            >
              SIGN UP
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
