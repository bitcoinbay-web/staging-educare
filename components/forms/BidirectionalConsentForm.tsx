"use client"; // This directive is used in Next.js to indicate that the file contains client-side code.

import React, { useEffect } from 'react'; // Import React and hooks
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver for form validation
import { useForm } from "react-hook-form"; // Import React Hook Form utilities
import { z } from "zod"; // Import zod for schema validation

import { Button } from "@/components/ui/button"; // Import Button component
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Import form components
import { Input } from "@/components/ui/input"; // Import Input component

import { useAccount, useSignMessage } from "wagmi"; // Import wagmi hooks for account and message signing

// Define the schema for the form using zod
const BidirectionalConsentFormSchema = z.object({
  email: z.string().email().nonempty(),
  studentNumber: z.string().min(1, "Student number is required"),
  externalPartyName: z.string().min(1, "External party name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  confirmName: z.string().min(1, "Confirmation name is required"),
});

// BidirectionalConsentForm component
const BidirectionalConsentForm: React.FC = () => {
  const { data, signMessage } = useSignMessage(); // Initialize wagmi hooks
  const account = useAccount(); // Get the current account

  // Initialize form with default values and validation schema
  const form = useForm<z.infer<typeof BidirectionalConsentFormSchema>>({
    resolver: zodResolver(BidirectionalConsentFormSchema),
    defaultValues: {
      email: '',
      studentNumber: '',
      externalPartyName: '',
      relationship: '',
      confirmName: '',
    },
  });

  // Load stored values from session storage on component mount
  useEffect(() => {
    const storedValues = sessionStorage.getItem('BidirectionalConsentFormValues');
    if (storedValues) {
      form.reset(JSON.parse(storedValues));
    }
  }, [form]);

  // Save form values to session storage on value change
  useEffect(() => {
    const subscription = form.watch((values) => {
      sessionStorage.setItem('BidirectionalConsentFormValues', JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Handle form submission
  function onSubmit(values: z.infer<typeof BidirectionalConsentFormSchema>) {
    const jsonString = JSON.stringify(values);
    sessionStorage.setItem("BidirectionalConsentFormValues", jsonString);
    signMessage({
      message: jsonString,
      account: account.address,
    });
    console.log(JSON.stringify(values, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <div className="text-base">
            <FormLabel>AAS Bidirectional Consent for Release of Student Information</FormLabel>
            <FormDescription>
              In order to share a student&apos;s information with their family members, guardians, and/or
              service providers, TMU&apos;s Academic Accommodation Support (AAS) needs written consent.
              By completing and submitting this form, you are consenting to sharing your
              information with the person(s) you identify below.
              If you have questions about confidentiality and information sharing, please contact our
              administrative team at aasadmin@torontomu.ca.
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentNumber"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormLabel>TMU Student Number *</FormLabel>
              <FormControl>
                <Input placeholder="Student Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="externalPartyName"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormLabel>Name of external party/ies *</FormLabel>
              <FormControl>
                <Input placeholder="External Party Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relationship"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormLabel>Relationship to you *</FormLabel>
              <FormControl>
                <Input placeholder="Relationship" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmName"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormLabel>
                Please type your name below to indicate that you have read and understand the bi-directional consent release of information *
              </FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      {data && (
        <div>
          <h3>Signed Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}

export default BidirectionalConsentForm; // Export the BidirectionalConsentForm component as the default export
