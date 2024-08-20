"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAccount, useSignMessage } from "wagmi";
import { useSession } from "next-auth/react";

const isValidDate = (date: any) => {
  return date instanceof Date && !isNaN(date.getTime());
};

const physicianSpecialties = [
  "Audiologist",
  "Ophthalmologist",
  "Chiropractor",
  "Neurologist",
  "Physician – Family",
  "Psychologist or Psychological Associate",
  "Occupational Therapist",
  "Physician – Psychiatrist",
  "Rheumatologist",
  "Optometrist",
  "Physiotherapist",
  "Nurse Practitioner",
];

const disabilityTypes = [
  "Acquired Brain Injury",
  "Attention Deficit Disorder (ADD) / Attention Deficit Hyperactivity Disorder (ADHD)",
  "Autism Spectrum Disorder",
  "Functional / mobility impairment",
  "Hearing impairment",
  "Medical disability",
  "Mental health disability",
  "Learning disability",
  "Visual impairment",
  "Other disability not indicated above",
];

const mobilityImpacts = [
  "Ambulation",
  "Standing",
  "Lifting/carrying/reaching",
  "Sitting",
  "Stair climbing",
  "Grasping/gripping/dexterity",
  "Other",
];

const cognitiveImpacts = [
  "Attention and concentration",
  "Memory",
  "Information processing (verbal and written)",
  "Stress management",
  "Organization and time management",
  "Social interactions",
  "Communication",
  "Other",
];

const disabilityVerificationSchema = z.object({
  patient: z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    dateOfBirth: z.date().refine((date) => !isNaN(date.getTime()), {
      message: "Valid date is required",
    }),
  }),
  physician: z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    specialty: z.string().nonempty("Specialty is required"),
    phoneNumber: z.string().nonempty("Phone number is required"),
    licenseNumber: z.string().nonempty("License number is required"),
    facilityNameAndAddress: z
      .string()
      .nonempty("Facility name and address is required"),
  }),
  disabilityStatus: z.string().nonempty("Disability status is required"),
  disabilities: z
    .array(z.string())
    .nonempty("At least one disability must be selected"),
  psychoEducationalAssessment: z.boolean().optional(),
  assessmentDate: z.date().optional(),
  learningDisabilityConfirmed: z.boolean().optional(),
  mobilityImpacts: z.array(z.string()).optional(),
  cognitiveImpacts: z.array(z.string()).optional(),
  signature: z.string().nonempty("Signature is required"),
  signatureDate: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Valid date is required",
  }),
});

interface FormProps {
  studentId: string;
}

const OSAPDisabilityVerificationForm: React.FC<FormProps> = ({ studentId }) => {
  const { data: signedData, signMessage, isError } = useSignMessage();
  const account = useAccount();
  const { data: session } = useSession();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof disabilityVerificationSchema>>({
    resolver: zodResolver(disabilityVerificationSchema),
    defaultValues: {
      patient: {
        firstName: "",
        lastName: "",
        dateOfBirth: new Date(),
      },
      physician: {
        firstName: "",
        lastName: "",
        specialty: "",
        phoneNumber: "",
        licenseNumber: "",
        facilityNameAndAddress: "",
      },
      disabilityStatus: "",
      disabilities: [],
      psychoEducationalAssessment: false,
      assessmentDate: new Date(),
      learningDisabilityConfirmed: false,
      mobilityImpacts: [],
      cognitiveImpacts: [],
      signature: "",
      signatureDate: new Date(),
    },
  });

  const onSubmit = async (
    values: z.infer<typeof disabilityVerificationSchema>
  ) => {
    setIsSubmitting(true);
    setError(undefined);
    setSuccess(undefined);

    console.log("Form submitted with values:", values);

    const jsonString = JSON.stringify(values);
    console.log("JSON stringified form data for signing:", jsonString);

    try {
      await signMessage({
        message: jsonString,
        account: account.address,
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

      const userId = studentId || session?.user?.id || "";
      if (!userId) {
        setError("User ID is missing. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const formData = {
        ...form.getValues(), // Assuming form.getValues() gets the current form state
        userId,
        account: account.address,
        signedMessage: signedData,
      };

      const submitForm = async () => {
        try {
          const response = await fetch("/api/osapDisabilityConfirmation", {
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
  }, [
    signedData,
    isError,
    form,
    account.address,
    studentId,
    session?.user?.id,
  ]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormLabel>
          Section B: Verification of patient&apos;s disability
        </FormLabel>

        <FormLabel>Patient Information</FormLabel>
        <FormField
          control={form.control}
          name="patient.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patient.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patient.dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Controller
                  control={form.control}
                  name="patient.dateOfBirth"
                  render={({ field }) => (
                    <Input
                      placeholder="Date"
                      type="date"
                      value={
                        isValidDate(field.value)
                          ? format(field.value, "yyyy-MM-dd")
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>Physician or Health Care Professional Information</FormLabel>
        <FormField
          control={form.control}
          name="physician.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="physician.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="physician.specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialty</FormLabel>
              <FormControl>
                <Input placeholder="Specialty" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="physician.phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area code and telephone number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="physician.licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ontario Licence #</FormLabel>
              <FormControl>
                <Input placeholder="Licence Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="physician.facilityNameAndAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Official stamp of facility name and address</FormLabel>
              <FormControl>
                <Input placeholder="Facility Name and Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>Patient&apos;s Disability Status</FormLabel>
        <FormField
          control={form.control}
          name="disabilityStatus"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value === "permanent"}
                  onCheckedChange={() => field.onChange("permanent")}
                  ref={field.ref}
                />
              </FormControl>
              <FormLabel>Patient&apos;s disability is permanent</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value === "temporary"}
                  onCheckedChange={() => field.onChange("temporary")}
                  ref={field.ref}
                />
              </FormControl>
              <FormLabel>Patient&apos;s disability is temporary</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>Nature of Patient&apos;s Disability</FormLabel>
        {disabilityTypes.map((type) => (
          <FormField
            key={type}
            control={form.control}
            name="disabilities"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value.includes(type)}
                    onCheckedChange={(checked) =>
                      checked
                        ? field.onChange([...field.value, type])
                        : field.onChange(
                            field.value.filter((item) => item !== type)
                          )
                    }
                    ref={field.ref}
                  />
                </FormControl>
                <FormLabel>{type}</FormLabel>
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={form.control}
          name="disabilities"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Other disability" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel>Mobility and Movement Impacts</FormLabel>
        {mobilityImpacts.map((impact) => (
          <FormField
            key={impact}
            control={form.control}
            name="mobilityImpacts"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value.includes(impact)}
                    onCheckedChange={(checked) =>
                      checked
                        ? field.onChange([...field.value, impact])
                        : field.onChange(
                            field.value.filter((item) => item !== impact)
                          )
                    }
                    ref={field.ref}
                  />
                </FormControl>
                <FormLabel>{impact}</FormLabel>
              </FormItem>
            )}
          />
        ))}

        <FormLabel>Cognitive and/or Behavioural Impacts</FormLabel>
        {cognitiveImpacts.map((impact) => (
          <FormField
            key={impact}
            control={form.control}
            name="cognitiveImpacts"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value.includes(impact)}
                    onCheckedChange={(checked) =>
                      checked
                        ? field.onChange([...field.value, impact])
                        : field.onChange(
                            field.value.filter((item) => item !== impact)
                          )
                    }
                    ref={field.ref}
                  />
                </FormControl>
                <FormLabel>{impact}</FormLabel>
              </FormItem>
            )}
          />
        ))}

        <FormLabel>
          Declaration of Physician or Regulated Health Care Professional
        </FormLabel>
        <FormField
          control={form.control}
          name="signature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Signature of physician or regulated health care professional
              </FormLabel>
              <FormControl>
                <Input placeholder="Signature" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="signatureDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Controller
                  control={form.control}
                  name="signatureDate"
                  render={({ field }) => (
                    <Input
                      placeholder="Date"
                      type="date"
                      value={
                        isValidDate(field.value)
                          ? format(field.value, "yyyy-MM-dd")
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  )}
                />
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

export default OSAPDisabilityVerificationForm;
