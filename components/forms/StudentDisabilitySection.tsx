"use client";

import React from 'react';
import { useSession } from "next-auth/react";
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignMessage, useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const primaryDisabilities = [
  "Acquired Brain Injury (ABI/TBI)",
  "Attention Deficit Hyperactivity Disorder (ADHD)",
  "Autism Spectrum Disorder (ASD)",
  "Chronic Health/Medical (eg. chronic pain, epilepsy)",
  "Deaf, Deafened, Hard of Hearing",
  "Learning Disability (LD)",
  "Low Vision, Blind",
  "Mental Health (eg. anxiety, depression)",
  "Physical/Functional/Mobility",
  "Mild Intellectual Disability (MID)"
] as const;

const primaryDisabilitySkips = [
  "Skip to question 6",
  "Skip to question 8",
  "Skip to question 14",
  "Skip to question 16",
  "Skip to question 20",
  "Skip to question 10",
  "Skip to question 24",
  "Skip to question 22",
  "Skip to question 18",
  "Skip to question 12",
] as const;

const secondaryDisabilities = [
  "Acquired Brain Injury (ABI/TBI)",
  "Attention Deficit Hyperactivity Disorder (ADHD)",
  "Autism Spectrum Disorder (ASD)",
  "Chronic Health/Medical (eg. chronic pain, epilepsy)",
  "Deaf, Deafened, Hard of Hearing",
  "Learning Disability (LD)",
  "Low Vision, Blind",
  "Mental Health (eg. anxiety, depression)",
  "Physical/Functional/Mobility",
  "Mild Intellectual Disability (MID)",
] as const;

const secondaryDisabilitySkips = [
  "Skip to question 7",
  "Skip to question 9",
  "Skip to question 15",
  "Skip to question 17",
  "Skip to question 21",
  "Skip to question 11",
  "Skip to question 25",
  "Skip to question 23",
  "Skip to question 19",
  "Skip to question 13",
] as const;

const formSchema = z.object({
  primaryDisability: z.enum(primaryDisabilities),
  secondaryDisabilities: z.array(z.string()),
  secondaryDisability: z.enum(secondaryDisabilities).optional(),
  abiFormStatus: z.string().optional(),
  secondaryAbiFormStatus: z.string().optional(),
  adhdFormStatus: z.string().optional(),
  secondaryAdhdFormStatus: z.string().optional(),
  ldFormStatus: z.string().optional(),
  secondaryLdFormStatus: z.string().optional(),
  midFormStatus: z.string().optional(),
  secondaryMidFormStatus: z.string().optional(),
  asdFormStatus: z.string().optional(),
  secondaryAsdFormStatus: z.string().optional(),
  chronicFormStatus: z.string().optional(),
  secondaryChronicFormStatus: z.string().optional(),
  physicalFormStatus: z.string().optional(),
  secondaryPhysicalFormStatus: z.string().optional(),
  deafFormStatus: z.string().optional(),
  secondaryDeafFormStatus: z.string().optional(),
  mentalHealthFormStatus: z.string().optional(),
  secondaryMentalHealthFormStatus: z.string().optional(),
  visionFormStatus: z.string().optional(),
  secondaryVisionFormStatus: z.string().optional(),
});

const DisabilityFormSection: React.FC<{ disability: string; type: string; fieldName: string; control: any }> = ({ disability, type, fieldName, control }) => {
  const labels = {
    "Acquired Brain Injury (ABI/TBI)": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
    "Attention Deficit Hyperactivity Disorder (ADHD)": `You selected "${disability}". For this condition, we require our Disability Assessment Form or Psychoeducational Assessment:`,
    "Learning Disability (LD)": `You selected "${disability}". For this condition, we require a Psychoeducational Assessment. Please note: an IEP on its own is not a sufficient document for registration. If you have an IEP but not a Psychoeducational Assessment, select 'I do not have a completed Psychoeducational Assessment' below.`,
    "Mild Intellectual Disability (MID)": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
    "Autism Spectrum Disorder (ASD)": `You selected "${disability}". For this condition, we require our Disability Assessment Form or Psychoeducational Assessment:`,
    "Chronic Health/Medical (eg. chronic pain, epilepsy)": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
    "Physical/Functional/Mobility": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
    "Deaf, Deafened, Hard of Hearing": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
    "Mental Health (eg. anxiety, depression)": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
    "Low Vision, Blind": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
  };

  const options = {
    "Acquired Brain Injury (ABI/TBI)": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Attention Deficit Hyperactivity Disorder (ADHD)": [
      { value: "I have a Disability Assessment Form or Psychoeducational Assessment to upload", label: "I have a Disability Assessment Form or Psychoeducational Assessment to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form or Psychoeducational Assessment", label: "I do not have a completed Disability Assessment Form or Psychoeducational Assessment", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Learning Disability (LD)": [
      { value: "I have a Psychoeducational Assessment to upload", label: "I have a Psychoeducational Assessment to upload", skip: "Skip to question 30" },
      { value: "I do not have a completed Psychoeducational Assessment", label: "I do not have a completed Psychoeducational Assessment", skip: "Skip to section 33 (Missing Documentation: Psychoeducational Assessment)" }
    ],
    "Mild Intellectual Disability (MID)": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Autism Spectrum Disorder (ASD)": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Chronic Health/Medical (eg. chronic pain, epilepsy)": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Physical/Functional/Mobility": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Deaf, Deafened, Hard of Hearing": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Mental Health (eg. anxiety, depression)": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Low Vision, Blind": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
  };

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{labels[disability]}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="space-y-2"
            >
              {options[disability].map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} />
                  <span>{option.label}</span>
                  <p className="ml-6">{option.skip}</p>
                </label>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const StudentDisabilitySection: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryDisability: undefined,
      secondaryDisabilities: [],
      secondaryDisability: undefined,
      abiFormStatus: undefined,
      secondaryAbiFormStatus: undefined,
      adhdFormStatus: undefined,
      secondaryAdhdFormStatus: undefined,
      ldFormStatus: undefined,
      secondaryLdFormStatus: undefined,
      midFormStatus: undefined,
      secondaryMidFormStatus: undefined,
      asdFormStatus: undefined,
      secondaryAsdFormStatus: undefined,
      chronicFormStatus: undefined,
      secondaryChronicFormStatus: undefined,
      physicalFormStatus: undefined,
      secondaryPhysicalFormStatus: undefined,
      deafFormStatus: undefined,
      secondaryDeafFormStatus: undefined,
      mentalHealthFormStatus: undefined,
      secondaryMentalHealthFormStatus: undefined,
      visionFormStatus: undefined,
      secondaryVisionFormStatus: undefined,
    },
  });

  const { data, signMessage } = useSignMessage();
  const { data: session } = useSession();

  const account = useAccount();

  const onSubmit = async (values: any) => {
    const jsonString = JSON.stringify(values);
    sessionStorage.setItem("StudentDisabilitySectionValues", jsonString);
    signMessage({
      message: jsonString,
      account: account.address
    });

    const userId = session.user.id;
    const formData = {
      ...values,
      userId,
      account: account.address,
      signedMessage: data
    };

    try {
      const response = await fetch('/api/studentDisabilitySection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Form submitted successfully:', result);
      } else {
        console.error('Failed to submit form:', result);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const { control, watch } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          Intake Form: Part 1 <br />
          <p>
            In this section we ask about your disability(ies) and guide you through identifying and
            submitting the appropriate documentation.
            <br />
            <p>
              Note: Your disability-related documentation is a key piece to your registration. This interactive
              form will identify the requirements for your specific disability and request that documents be
              uploaded. If you need to exit the form in order to obtain and/or digitize your documentation,
              you can always return and re-start this intake form again.
              <br />
              <p>For more information, visit our <a className='underline text-blue-600' href='https://www.torontomu.ca/accommodations/' rel='noreferrer'>website</a>.</p>
            </p>
          </p>
        </div>
        <FormField
          control={control}
          name="primaryDisability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>3. Please indicate the primary disability that affects your academics (select one): *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {primaryDisabilities.map((disability, index) => (
                    <div key={disability}>
                      <label className="flex items-center space-x-2">
                        <RadioGroupItem value={disability} />
                        <span>{disability}</span>
                      </label>
                      <p className="ml-6">{primaryDisabilitySkips[index]}</p>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="secondaryDisabilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>4. Please indicate all other (secondary) disabilities that affect your academics: *</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {secondaryDisabilities.map((disability) => (
                    <div key={disability} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value.includes(disability)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, disability]
                            : field.value.filter((value) => value !== disability);
                          field.onChange(newValue);
                        }}
                      />
                      <span>{disability}</span>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="secondaryDisability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>5. Please indicate the secondary disability that affects your academics (select one): *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {secondaryDisabilities.map((disability, index) => (
                    <div key={disability}>
                      <label className="flex items-center space-x-2">
                        <RadioGroupItem value={disability} />
                        <span>{disability}</span>
                      </label>
                      <p className="ml-6">{secondaryDisabilitySkips[index]}</p>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {watch("primaryDisability") && (
          <DisabilityFormSection
            disability={watch("primaryDisability")}
            type="primary"
            control={control}
            fieldName={`${watch("primaryDisability").toLowerCase().replace(/\s/g, '')}FormStatus`}
          />
        )}
        {watch("secondaryDisability") && (
          <DisabilityFormSection
            disability={watch("secondaryDisability")}
            type="secondary"
            control={control}
            fieldName={`secondary${watch("secondaryDisability").toLowerCase().replace(/\s/g, '')}FormStatus`}
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
    </FormProvider>
  );
};

export default StudentDisabilitySection;
