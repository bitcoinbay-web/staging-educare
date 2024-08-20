"use client"; // This directive is used in Next.js to indicate that the file contains client-side code.

import React, { useEffect, useState } from "react"; // Import React and hooks
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver for form validation
import { useForm } from "react-hook-form"; // Import React Hook Form utilities
import { z } from "zod"; // Import zod for schema validation

import { Button } from "@/components/ui/button"; // Import Button component
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Import form components
import { Input } from "@/components/ui/input"; // Import Input component

import { useAccount, useSignMessage } from "wagmi"; // Import wagmi hooks for account and message signing
import { useSession } from "next-auth/react"; // Import useSession from next-auth/react

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
  const { data: signedData, signMessage, isError } = useSignMessage(); // Initialize wagmi hooks
  const { address } = useAccount(); // Get the current account address
  const { data: session } = useSession(); // Get the session data

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values and validation schema
  const form = useForm<z.infer<typeof BidirectionalConsentFormSchema>>({
    resolver: zodResolver(BidirectionalConsentFormSchema),
    defaultValues: {
      email: "",
      studentNumber: "",
      externalPartyName: "",
      relationship: "",
      confirmName: "",
    },
  });

  // Load stored values from session storage on component mount
  useEffect(() => {
    const storedValues = sessionStorage.getItem(
      "BidirectionalConsentFormValues"
    );
    if (storedValues) {
      form.reset(JSON.parse(storedValues));
      console.log("Form initialized or reset.");
    }
  }, [form]);

  // Save form values to session storage on value change
  useEffect(() => {
    const subscription = form.watch((values) => {
      sessionStorage.setItem(
        "BidirectionalConsentFormValues",
        JSON.stringify(values)
      );
      console.log("Watching form changes.");
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Handle form submission
  const onSubmit = async (
    values: z.infer<typeof BidirectionalConsentFormSchema>
  ) => {
    setIsSubmitting(true);
    setError(undefined);
    setSuccess(undefined);

    if (!address || !session?.user?.id) {
      setError(
        "User account address or session ID is missing. Please try again."
      );
      setIsSubmitting(false);
      return;
    }

    console.log("Form submitted with values:", values);

    const jsonString = JSON.stringify(values);
    console.log("JSON stringified form data for signing:", jsonString);

    try {
      await signMessage({
        message: jsonString,
        account: address,
      });
    } catch (error) {
      setError("Failed to sign the message. Please try again.");
      console.error("Error during signing:", error);
      setIsSubmitting(false);
      return;
    }
  };

  useEffect(() => {
    if (isError) {
      console.error("Error occurred during message signing");
      setError("Failed to sign the message. Please try again.");
      setIsSubmitting(false);
    }

    if (signedData) {
      console.log("Message signed successfully:", signedData);

      const userId = session?.user?.id;
      if (!userId) {
        setError("User ID is missing. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const formData = {
        ...form.getValues(),
        userId,
        account: address,
        signedMessage: signedData,
      };

      const submitForm = async () => {
        try {
          const response = await fetch("/api/bidirectionalConsentForm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const result = await response.json();
          if (response.ok) {
            console.log("Form submitted successfully:", result);
            setSuccess("Form submitted successfully!");
          } else {
            console.error("Failed to submit form:", result);
            setError("Failed to submit form.");
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          setError("An unexpected error occurred. Please try again later.");
        } finally {
          setIsSubmitting(false);
        }
      };

      submitForm();
    }
  }, [signedData, isError, form, address, session?.user?.id]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <div className="text-base">
            <FormLabel>
              AAS Bidirectional Consent for Release of Student Information
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormLabel>Email*</FormLabel>
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
                Please type your name below to indicate that you have read and
                understand the bi-directional consent release of information *
              </FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
      {signedData && (
        <div>
          <h3>Signed Data:</h3>
          <pre>{JSON.stringify(signedData, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
};

export default BidirectionalConsentForm;
