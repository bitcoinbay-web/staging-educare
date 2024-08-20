"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useAccount, useSignMessage } from "wagmi";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface FormProps {
  studentId: string;
}

const DisabilityNatureInfo = [
  {
    id: "acquired",
    label: "Acquired Brain Injury",
  },
  {
    id: "adhd",
    label: "Attention Deficit (Hyperactivity) Disorder",
  },
  {
    id: "autism",
    label: "Autism Spectrum Disorder",
  },
  {
    id: "chronic",
    label: "Chronic Illness",
  },
  {
    id: "hearing",
    label: "Deaf, Deafened, Hard of Hearing",
  },
  {
    id: "vision",
    label: "Low Vision, Blind",
  },
  {
    id: "mental",
    label: "Mental Health",
  },
  {
    id: "physical",
    label: "Physical Mobility",
  },
  {
    id: "other",
    label: "Other",
  },
];

const AdditionalDiagnosisSchema = z.object({
  diagnosis: z.string(),
  date: z.string(),
  byPractitioner: z.enum(["yes", "no"]),
});

const DisabilitySchema = z.object({
  disability: z.enum(["permanent", "temporary", "persistent"]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  nature: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  primaryNature: z.enum([
    "acquired",
    "adhd",
    "autism",
    "chronic",
    "hearing",
    "vision",
    "mental",
    "physical",
    "other",
  ]),
  additionalDiagnoses: z.array(AdditionalDiagnosisSchema).optional(),
});

const DisabilityConfirmation: React.FC<FormProps> = ({ studentId }) => {
  const [selectedDisability, setSelectedDisability] = useState("permanent");
  const { data, signMessage } = useSignMessage();
  const account = useAccount();
  const { data: session } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const disabilityForm = useForm<z.infer<typeof DisabilitySchema>>({
    resolver: zodResolver(DisabilitySchema),
    defaultValues: {
      disability: "permanent",
      startDate: "",
      endDate: "",
      nature: ["other"],
      primaryNature: "other",
      additionalDiagnoses: Array(4).fill({
        diagnosis: "",
        date: "",
        byPractitioner: "no",
      }),
    },
  });

  const { fields } = useFieldArray({
    control: disabilityForm.control,
    name: "additionalDiagnoses",
  });

  useEffect(() => {
    const storedValues = sessionStorage.getItem("disabilityFormValues");
    if (storedValues) {
      disabilityForm.reset(JSON.parse(storedValues));
    }
  }, [disabilityForm]);

  useEffect(() => {
    if (data && isSubmitting) {
      handleFinalSubmit();
    }
  }, [data]);

  useEffect(() => {
    const subscription = disabilityForm.watch((values) => {
      sessionStorage.setItem("disabilityFormValues", JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [disabilityForm]);

  const handleFinalSubmit = async () => {
    const values = disabilityForm.getValues();
    const userId = studentId;

    if (!userId || !data) {
      console.error("User ID or signed message data is missing.");
      setError("User ID or signed message data is missing.");
      return;
    }

    const formData = {
      ...values,
      userId,
      account: account.address,
      signedMessage: data,
    };

    try {
      const response = await fetch("/api/disabilityConfirmation", {
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

  const onSubmit = async (values: z.infer<typeof DisabilitySchema>) => {
    setIsSubmitting(true);
    const jsonString = JSON.stringify(values);
    sessionStorage.setItem("disabilityFormValues", jsonString);

    await signMessage({
      message: jsonString,
      account: account.address,
    });

    if (data) {
      handleFinalSubmit();
    }
  };

  return (
    <Form {...disabilityForm}>
      <form
        onSubmit={disabilityForm.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6"
      >
        <FormField
          key="disability"
          control={disabilityForm.control}
          name="disability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disability Form</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedDisability(value);
                  }}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem key="permanent">
                    <FormControl>
                      <RadioGroupItem value="permanent" />
                    </FormControl>
                    <FormLabel className="font-normal">Permanent</FormLabel>
                  </FormItem>
                  <FormItem key="temporary">
                    <FormControl>
                      <RadioGroupItem value="temporary" />
                    </FormControl>
                    <FormLabel className="font-normal">Temporary</FormLabel>
                    {selectedDisability === "temporary" && (
                      <div className="flex flex-col space-y-4 mt-2">
                        <FormField
                          key="startDate"
                          control={disabilityForm.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Start Date"
                                  type="date"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          key="endDate"
                          control={disabilityForm.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="End Date"
                                  type="date"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </FormItem>
                  <FormItem key="persistent">
                    <FormControl>
                      <RadioGroupItem value="persistent" />
                    </FormControl>
                    <FormLabel className="font-normal">Persistent</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          key="primaryNature"
          control={disabilityForm.control}
          name="primaryNature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Nature of Disability</FormLabel>
              <FormDescription>(Select only one)</FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  {DisabilityNatureInfo.map((item) => (
                    <FormItem key={item.id}>
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
            </FormItem>
          )}
        />

        <FormField
          key="nature"
          control={disabilityForm.control}
          name="nature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Disabilities</FormLabel>
              <FormDescription>(Select all that apply)</FormDescription>
              {DisabilityNatureInfo.map((item) => (
                <FormItem
                  key={item.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, item.id])
                          : field.onChange(
                              field.value?.filter((value) => value !== item.id)
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              ))}
            </FormItem>
          )}
        />

        <FormLabel>Additional Diagnoses</FormLabel>
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            <FormField
              control={disabilityForm.control}
              name={`additionalDiagnoses.${index}.diagnosis`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosis</FormLabel>
                  <FormControl>
                    <Input placeholder="Diagnosis" type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={disabilityForm.control}
              name={`additionalDiagnoses.${index}.date`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Diagnosis</FormLabel>
                  <FormControl>
                    <Input placeholder="Date" type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={disabilityForm.control}
              name={`additionalDiagnoses.${index}.byPractitioner`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosed by Health Practitioner?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}

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
    </Form>
  );
};

export default DisabilityConfirmation;
