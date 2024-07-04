"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { format } from 'date-fns';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAccount, useSignMessage } from "wagmi";

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
    dateOfBirth: z.date().refine(date => !isNaN(date.getTime()), { message: "Valid date is required" }),
  }),
  physician: z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    specialty: z.string().nonempty("Specialty is required"),
    phoneNumber: z.string().nonempty("Phone number is required"),
    licenseNumber: z.string().nonempty("License number is required"),
    facilityNameAndAddress: z.string().nonempty("Facility name and address is required"),
  }),
  disabilityStatus: z.string().nonempty("Disability status is required"),
  disabilities: z.array(z.string()).nonempty("At least one disability must be selected"),
  psychoEducationalAssessment: z.boolean().optional(),
  assessmentDate: z.date().optional(),
  learningDisabilityConfirmed: z.boolean().optional(),
  mobilityImpacts: z.array(z.string()).optional(),
  cognitiveImpacts: z.array(z.string()).optional(),
  signature: z.string().nonempty("Signature is required"),
  signatureDate: z.date().refine(date => !isNaN(date.getTime()), { message: "Valid date is required" }),
});

const OSAPDisabilityVerificationForm: React.FC = () => {
  const { data, signMessage } = useSignMessage();
  const account = useAccount();

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValues = sessionStorage.getItem("disabilityVerificationFormValues");
      if (storedValues) {
        form.reset(JSON.parse(storedValues));
      }
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("disabilityVerificationFormValues", JSON.stringify(values));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem("signMessageData", JSON.stringify(data));
    }
  }, [data]);

  function onSubmit(values: z.infer<typeof disabilityVerificationSchema>) {
    const jsonString = JSON.stringify(values);
    signMessage({
      message: jsonString,
      account: account.address
    });
    console.log(jsonString);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormLabel>Section B: Verification of patient&apos;s disability</FormLabel>

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
                      value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  )}
                />
              </FormControl>
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
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
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
                        : field.onChange(field.value.filter((item) => item !== type))
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
                        : field.onChange(field.value.filter((item) => item !== impact))
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
                        : field.onChange(field.value.filter((item) => item !== impact))
                    }
                    ref={field.ref}
                  />
                </FormControl>
                <FormLabel>{impact}</FormLabel>
              </FormItem>
            )}
          />
        ))}

        <FormLabel>Declaration of Physician or Regulated Health Care Professional</FormLabel>
        <FormField
          control={form.control}
          name="signature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Signature of physician or regulated health care professional</FormLabel>
              <FormControl>
                <Input placeholder="Signature" {...field} />
              </FormControl>
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
                      value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  )}
                />
              </FormControl>
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
};

export default OSAPDisabilityVerificationForm;
