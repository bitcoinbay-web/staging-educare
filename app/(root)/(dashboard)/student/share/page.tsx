"use client"; // This directive is used in Next.js to indicate that the file contains client-side code.

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import QRCode from "react-qr-code";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const emailSchema = z.object({
  email: z.string().email(),
});

const Page = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const studentId = session.user.id;
  const value = `${process.env.NEXT_PUBLIC_BASE_URL}/doctor/${studentId}`;

  const onSubmit = async (data: { email: string }) => {
    const email = data.email;
    const urlLink = value;
    const toName = "Healthcare Provider";

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ toEmail: email, toName: toName, urlLink: urlLink }),
      });
      console.log(response);

      if (response.ok) {
        console.log('Email sent successfully');
        setOpen(false); // Close the dialog on success
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="dashboard-main">
      <p>Choose Sharing Method</p>
      <div className="flex space-x-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Send via Email</CardTitle>
            <CardDescription>Share your QR code by email for quick access</CardDescription>
          </CardHeader>
          <CardFooter>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">Select Method</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send QR Code via Email</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="email">Recipient Email</label>
                    <Input id="email" {...form.register('email')} />
                    {form.formState.errors.email && (
                      <p className="text-red-600">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <DialogFooter>
                    <Button type="submit">Send</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Send on OCEAN MD</CardTitle>
            <CardDescription>Connect with OCEAN MD to share your QR code</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">Select Method</Button>
          </CardFooter>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Show in Person</CardTitle>
            <CardDescription>Display the QR code in person for immediate access</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">Select Method</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex mt-8">
        <div style={{ height: "auto", maxWidth: 256, width: "100%" }}>
          <div>QR Code Display</div>
          <p>Your generated QR code for sharing with healthcare practitioners</p>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={value}
            viewBox={`0 0 256 256`}
          />
          <Link href={value} className="text-blue-700 underline">{value}</Link>
        </div>
        <div className="ml-8">
          <h2 className="font-bold text-lg">Additional Information</h2>
          <p>We ensure the highest security measures to protect your data shared via the QR code</p>
          <h3 className="font-bold mt-4">FAQ</h3>
          <ul className="list-disc ml-5">
            <li>How secure is sharing my medical records?</li>
            <li>Can I track who accessed my QR code?</li>
            <li>What if I need to revoke access to my records?</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
