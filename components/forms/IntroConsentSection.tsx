"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignMessage, useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email(),
  consent: z.enum(["yes", "no"]),
});

const IntroConsentSection: React.FC = () => {
  const { data: session } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      consent: "",
    },
  });

  const { data, signMessage } = useSignMessage();
  const account = useAccount();

  useEffect(() => {
    if (data && isSubmitting) {
      handleFinalSubmit();
    }
  }, [data]);

  const handleFinalSubmit = async () => {
    const values = form.getValues();
    const userId = session?.user?.id;

    if (!userId || !data) {
      console.error("User ID or signed message data is missing.");
      return;
    }

    const formData = {
      ...values,
      userId,
      account: account.address,
      signedMessage: data,
    };

    try {
      const response = await fetch("/api/introConsentSection", {
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
        setIsSubmitting(false);
      } else {
        console.error("Failed to submit form:", result);
        setError("Failed to submit form.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred during submission.");
    }
  };

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    const jsonString = JSON.stringify(values);
    sessionStorage.setItem("IntroConsentSectionValues", jsonString);

    await signMessage({
      message: jsonString,
      account: account.address,
    });

    if (data) {
      handleFinalSubmit();
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          Register with Academic Accommodation Support - Express Registration
          Option (ERO)
        </div>
        <div>
          <p>
            Thank you for your interest in registering with Toronto Metropolitan
            University&apos;s disability services office, Academic Accommodation
            Support (AAS). We support students who require academic
            accommodation due to disability. If you require accommodations to
            access this form, please email{" "}
            <a
              href="mailto:aasintake1@torontomu.ca"
              target="_blank"
              className="underline text-blue-600"
            >
              aasintake1@torontomu.ca
            </a>
            . Once you submit this form your responses and documentation will be
            reviewed. Sometimes, we may request that you provide additional
            documentation or information. After reviewing your Intake Form and
            documentation, your accommodation plan will be created and emailed
            to you within approximately five to seven business days.
          </p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>1. Email *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div>
            Express Registration Option (ERO) Intake Form This Intake Form:
          </div>
          <ul>
            <li>✔ Takes approximately 20-30 minutes to complete</li>
            <li>
              ✔ Requires you to review the AAS policy and consent agreements
            </li>
            <li>✔ Identifies required disability-related documentation</li>
            <li>
              ✔ Requires you to upload your disability-related documentation
            </li>
            <li>✖ Cannot be saved once in progress.</li>
            <li>
              ✔ Requires you to click &apos;Submit&apos; when you are done.
            </li>
          </ul>
          <p>
            Completion of both Part 1 (disability information and documentation
            upload) and Part 2 (personal information) of the form is required to
            continue through the registration process.
          </p>
          <ul>
            ✔ You will know you submitted the form if you receive a confirmation
            email.
          </ul>
          <p>
            Didn&apos;t receive a confirmation email? Let us know. Let&apos;s
            get started!
          </p>
        </div>
        <div>
          <div>
            Confidentiality and Information Policy Confidentiality & Information
            Privacy Protection
          </div>
          <p>
            Please review the following information carefully. Your registration
            with Academic Accommodation Support (AAS) is voluntary; you may
            discontinue at any time.
          </p>
          <p>
            The information on this form is collected under the authority of the
            Ryerson University Act, 1977 for the purpose of determining a need
            for academic accommodation. All personal information collected will
            be used, stored, protected and destroyed in accordance with the
            university&apos;s Information Protection and Access Policy and
            Section 39(2) of the Freedom of Information and Protection of
            Privacy Act, 1990 (“FIPPA”).
          </p>
          <p>
            The following four circumstances are exceptions where AAS is
            required by law, and in accordance with our policies, to disclose
            your personal information to another department within the
            university or to the appropriate health, safety, police, or legal
            body:
          </p>
          <ul>
            <li>
              1. If you indicate that you may be a danger to yourself or others;
            </li>
            <li>
              2. In the case of apparent, suspected, or potential child abuse;
            </li>
            <li>
              3. If you report sexual abuse by a regulated health-care
              professional;
            </li>
            <li>4. In instances where the court subpoena your records.</li>
          </ul>
          <p>Information Security & Records Retention</p>
          <p>
            Your records are kept securely by Academic Accommodation Support.
            Files are securely archived one year after last active registration.
            Archived files are destroyed after 10 years. Please keep a copy of
            your documentation for your own records.
          </p>
          <p>Notice of Communication with university Staff and Faculty</p>
          <p>
            Once registered, Academic Accommodation Support staff members may
            communicate your accommodation requirements and related matters with
            professors/instructors and/or professional staff at the university
            in order to ensure your accommodation requirements are met, to
            resolve problems and/or to work within the university on your behalf
            regarding related issues.
          </p>
          <p>The nature of information AAS may release includes:</p>
          <ul>
            <li>
              • Confirmation of the presence of a disability that impacts your
              learning.
            </li>
            <li>
              • Confirmation of your registration with our office, Academic
              Accommodation Support.
            </li>
            <li>• Your accommodation requirements.</li>
          </ul>
          <p>Your Responsibilities</p>
          <p>
            There are responsibilities associated with your accommodation plan
            and its implementation. Please review your registration notes, any
            emails and the Academic Accommodations Support website regarding
            specific responsibilities and deadlines associated with your
            accommodations.
          </p>
          <p>
            Your acceptance below affirms that you have read this policy and are
            aware of all its contents. If you have questions about the
            collection, use, and disclosure of this information by the
            university please contact us.
          </p>
        </div>
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                2. I have read and understand the above Confidentiality and
                Information Policy *
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" />
                    <label className="text-sm">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" />
                    <label className="text-sm">No</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
      {data && (
        <div>
          <h3>Signed Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
    </FormProvider>
  );
};

export default IntroConsentSection;
