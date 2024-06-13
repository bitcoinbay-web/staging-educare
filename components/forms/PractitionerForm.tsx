"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { toast } from "@/components/ui/use-toast";
import { useAccount, useSignMessage } from "wagmi";

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

const ProfessionSchema = z.object({
  practitionerName: z.string().min(2).max(50),
  licenseNo: z.coerce
    .number()
    .min(0, { message: "License number must be non-negative" }),
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
});

const PractitionerForm: React.FC = () => {
  const { data, signMessage } = useSignMessage();
  const account = useAccount();

  const professionForm = useForm<z.infer<typeof ProfessionSchema>>({
    resolver: zodResolver(ProfessionSchema),
    defaultValues: {
      practitionerName: "",
      licenseNo: 0,
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

  function onSubmit(values: z.infer<typeof ProfessionSchema>) {
    const jsonString = JSON.stringify(values);
    sessionStorage.setItem("professionFormValues", jsonString);
    signMessage({
      message: jsonString,
      account: account.address,
    });
    console.log(JSON.stringify(values, null, 2));
  }

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
                  <Input
                    placeholder="0"
                    type="number"
                    min="0"
                    {...field}
                    className="no-spinner"
                  />
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
