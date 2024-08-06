"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAccount, useSignMessage } from "wagmi";
import { useSession } from "next-auth/react";

interface FormProps {
  studentId: string;
}

const specialtyInfo = [
  {
    id: "family",
    label: "Family Medicine",
  },
  {
    id: "psychiatrist",
    label: "Psychiatrist",
  },
  {
    id: "psychologist",
    label: "Psychologist",
  },
  {
    id: "otherPhysician",
    label: "Other Specialist Physician (specify)",
  },
  {
    id: "other",
    label: "Other (specify)",
  },
] as const;

const ProfessionSchema = z
  .object({
    practitionerName: z.string().min(2).max(50),
    licenseNo: z.string().min(1, { message: "License number is required" }),
    qualified: z.enum(["true", "false"]).transform((value) => value === "true"),
    specialty: z.enum([
      "family",
      "psychiatrist",
      "psychologist",
      "otherPhysician",
      "other",
    ]),
    otherSpecialty: z.string().optional(),
    otherSpecialistPhysician: z.string().optional(),
  })
  .refine(
    (data) =>
      (data.specialty !== "other" || data.otherSpecialty !== undefined) &&
      (data.specialty !== "otherPhysician" ||
        data.otherSpecialistPhysician !== undefined),
    {
      message:
        "Other Specialty must be specified if specialty is 'other', and Other Specialist Physician must be specified if specialty is 'otherPhysician'.",
      path: ["specialty"], // Set the path of the error to specialty
    }
  );

const PractitionerForm: React.FC<FormProps> = ({studentId}) => {
  const { data, signMessage } = useSignMessage();
  const { data: session } = useSession();
  const account = useAccount();

  const professionForm = useForm<z.infer<typeof ProfessionSchema>>({
    resolver: zodResolver(ProfessionSchema),
    defaultValues: {
      practitionerName: "",
      licenseNo: "",
      qualified: false,
      specialty: "family",
    },
  });

  const [showOtherSpecialty, setShowOtherSpecialty] = useState(false);
  const [showOtherSpecialistPhysician, setShowOtherSpecialistPhysician] =
    useState(false);

  useEffect(() => {
    const savedValues = sessionStorage.getItem("professionFormValues");
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues);
      professionForm.reset(parsedValues);
      setShowOtherSpecialty(parsedValues.specialty === "other");
      setShowOtherSpecialistPhysician(
        parsedValues.specialty === "otherPhysician"
      );
    }
    const savedData = sessionStorage.getItem("signMessageData");
    if (savedData) {
      signMessage(JSON.parse(savedData));
    }
  }, [professionForm, signMessage]);

  useEffect(() => {
    if (!showOtherSpecialty) {
      professionForm.setValue("otherSpecialty", "");
    }
    if (!showOtherSpecialistPhysician) {
      professionForm.setValue("otherSpecialistPhysician", "");
    }
  }, [showOtherSpecialty, showOtherSpecialistPhysician, professionForm]);

  const onSubmit = async (values: z.infer<typeof ProfessionSchema>) => {
    const jsonString = JSON.stringify(values);
    await signMessage({
      message: jsonString,
      account: account.address,
    });

    const userId = studentId;

    const formData = {
      ...values,
      userId,
      account: account.address,
      signedMessage: data
    };

    sessionStorage.setItem("professionFormValues", jsonString);

    try {
      const response = await fetch("/api/practitionerForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Form submitted successfully:", result);
      } else {
        console.error("Failed to submit form:", result);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (data) {
      sessionStorage.setItem("signMessageData", JSON.stringify(data));
    }
  }, [data]);

  return (
    <Form {...professionForm}>
      <form
        onSubmit={professionForm.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6"
      >
        <div>
          <p>
            SECTION B: INFORMATION FOR REGISTERED HEALTH CARE PRACTITIONER
            Academic Accommodation Support (AAS) at Toronto Metropolitan University facilitates the provision of
            reasonable and appropriate academic accommodations and supports for students with disabilities.
            To determine these accommodations and supports, AAS must verify that a student has a disability and
            understand the impact(s) of the student’s disability on their academic functioning.
            The student is required to provide the university with documentation that is:
          </p>
          <br />
          <li>● Based on a current, thorough and appropriate assessment;</li>
          <li>● Provided by a registered practitioner, qualified to diagnose the condition; and</li>
          <li>● Supportive of the accommodation(s) being considered or requested.</li>
          <br />
          <p>
            Please note that a student’s mental health diagnosis is not required to receive accommodations and
            support from AAS but full details of the impact(s) of the disability on the student’s academic functioning
            must be included (see Part III). If the student consents to or requests that you provide a diagnosis
            statement in section A, this information is kept confidential in accordance with the university’s
            Information Protection and Access Policy.
            All relevant sections must be completed thoroughly and objectively to ensure accurate assessment of
            the student’s disability-related needs, which may include access to support services and government
            and school bursaries while attending university.
            Careful completion of all relevant sections also ensures that a student who is currently receiving interim
            accommodations will have a full and appropriate accommodation and support plan once disability
            documentation is obtained.
            AAS supports are available to students with documented disabilities. If no disability is present, students
            will be referred to other supports at the university.
          </p>
        </div>
        <FormField
          key="practitionerName"
          control={professionForm.control}
          name="practitionerName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Practitioner Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          key="licenseNo"
          control={professionForm.control}
          name="licenseNo"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>License Number</FormLabel>
                <FormControl>
                  <Input placeholder="License Number" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          key="qualified"
          control={professionForm.control}
          name="qualified"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Qualified to make relevant diagnosis</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          key="specialty"
          control={professionForm.control}
          name="specialty"
          render={({ field }) => {
            return (
              <FormItem key="specialty">
                <FormLabel>Specialty</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      setShowOtherSpecialty(value === "other");
                      setShowOtherSpecialistPhysician(
                        value === "otherPhysician"
                      );
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {specialtyInfo.map((item) => (
                      <FormItem
                        key={item.id}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={item.id} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {showOtherSpecialty && (
          <FormField
            key="otherSpecialty"
            control={professionForm.control}
            name="otherSpecialty"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Other Specialty</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please specify"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}

        {showOtherSpecialistPhysician && (
          <FormField
            key="otherSpecialistPhysician"
            control={professionForm.control}
            name="otherSpecialistPhysician"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Other Specialist Physician</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please specify"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}

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

export default PractitionerForm;
