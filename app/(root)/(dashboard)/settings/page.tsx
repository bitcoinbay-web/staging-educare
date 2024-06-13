"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition, useState } from "react";

import { auth } from "@/auth";
import Navbar from "@/components/Navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SettingSchema } from "@/schemas";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/lib/actions/settings";
import { useSession } from "next-auth/react";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/useCurrentUser";

import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
// import { UserRole } from "@/lib/models/user.model";
import { UserRole } from "@prisma/client";

const SettingsPage = () => {
  const user = useCurrentUser();

  const { update } = useSession();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          // update();
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
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
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="John Doe"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  {user?.isOAuth === false && (
                    <>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="john.doe@gmail.com"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="******"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="******"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </>
                  )}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={UserRole.ADMIN}>
                                Admin
                              </SelectItem>
                              <SelectItem value={UserRole.DOCTOR}>
                                Doctor
                              </SelectItem>
                              <SelectItem value={UserRole.STUDENT}>
                                Student
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button type="submit">Save</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SettingsPage;
