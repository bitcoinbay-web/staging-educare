"use client";

import React, { useState } from "react";
import { useForm, FormProvider, Controller, FormProps } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { useSession } from "next-auth/react"; // Import useSession

// interface FormProps {
//   studentId: string;
// }

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.enum(["Male", "Female", "Other"]),
  emailAddress: z.string().email(),
  phoneNumber: z.string().min(1),
  healthCarePractitionerType: z.string().min(1),
  licenseNumber: z.string().min(1),
  acceptingNewClients: z.enum(["Yes", "No"]),
  languages: z.array(z.string()),
  appointmentTypes: z.array(z.string()),
  servicesProvided: z.array(z.string()),
  businessName: z.string().min(1),
  businessWebsite: z.string().url().optional().or(z.literal("")),
  businessAddress: z.string().min(1),
  bookingEmailAddress: z.string().email(),
  bookingPhoneNumber: z.string().min(1),
  onlineBookingURL: z.string().url().optional().or(z.literal("")),
  faxNumber: z.string().optional().or(z.literal("")),
  bio: z.string().min(1),
});

const DoctorOnboardingForm: React.FC<> = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      emailAddress: "",
      phoneNumber: "",
      healthCarePractitionerType: "",
      licenseNumber: "",
      acceptingNewClients: undefined,
      languages: [],
      appointmentTypes: [],
      servicesProvided: [],
      businessName: "",
      businessWebsite: "",
      businessAddress: "",
      bookingEmailAddress: "",
      bookingPhoneNumber: "",
      onlineBookingURL: "",
      faxNumber: "",
      bio: "",
    },
  });

  const { data, signMessage } = useSignMessage();
  const account = useAccount();
  const { data: session } = useSession(); // Get session data

  const [currentStep, setCurrentStep] = useState(1);

  const onSubmitForm = async (values: any) => {
    const jsonString = JSON.stringify(values);
    sessionStorage.setItem("healthPractitionerFormValues", jsonString);
    signMessage({
      message: jsonString,
      account: account.address,
    });

    const userId = session?.user?.id;
    const formData = {
      ...values,
      userId,
      account: account.address,
      signedMessage: data,
    };
    console.log(formData)
    return

    try {
      const response = await fetch("/api/healthPractitionerForm", {
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

  const { control, watch } = form;

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  return (
    <FormProvider {...form}>
      <form onSubmit={()=>{
        console.log('working no?')
        form.handleSubmit(onSubmitForm)
      }} className="space-y-8">
        {currentStep === 1 && (
          <div className="">
            <div>
              <h2 className="text-center mb-6">Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      {/* Container div for the label and input */}
                      <div className="space-y-2">
                        {/* Label above the input */}
                        <FormLabel>Gender *</FormLabel>
                      </div>
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Input
                              {...field}
                              value={field.value || "Select Gender"}
                              readOnly
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {["Male", "Female", "Other"].map((gender) => (
                              <DropdownMenuItem
                                key={gender}
                                onSelect={() => field.onChange(gender)}
                              >
                                {gender}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="healthCarePractitionerType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Health Care Practitioner *</FormLabel>
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Input
                              {...field}
                              value={field.value || "Select Type"}
                              readOnly
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {[
                              "Family Physician",
                              "Psychologist",
                              "Psychiatrist",
                              "Other Specialist Physician",
                              "Other",
                            ].map((type) => (
                              <DropdownMenuItem
                                key={type}
                                onSelect={() => field.onChange(type)}
                              >
                                {type}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {watch("healthCarePractitionerType") ===
                  "Other Specialist Physician" && (
                  <FormField
                    control={control}
                    name="healthCarePractitionerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {watch("healthCarePractitionerType") === "Other" && (
                  <FormField
                    control={control}
                    name="healthCarePractitionerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="">
            <div>
              <h2 className="text-center mb-6">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="acceptingNewClients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Are you accepting new clients? *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-2"
                        >
                          <label className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <RadioGroupItem value="No" />
                            <span>No</span>
                          </label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="appointmentTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What appointment types are you offering? (Check all that
                        apply) *
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {["In Person", "Telephone", "Video"].map((type) => (
                            <div
                              key={type}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                checked={field.value.includes(type)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, type]
                                    : field.value.filter(
                                        (value) => value !== type
                                      );
                                  field.onChange(newValue);
                                }}
                              />
                              <span>{type}</span>
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
                  name="servicesProvided"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Please list the forms you are currently able to complete
                        for students *
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {[
                            "Accessibility Form",
                            "Disability Verification Form",
                          ].map((service) => (
                            <div
                              key={service}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                checked={field.value.includes(service)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, service]
                                    : field.value.filter(
                                        (value) => value !== service
                                      );
                                  field.onChange(newValue);
                                }}
                              />
                              <span>{service}</span>
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
                  name="languages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Languages Offered *</FormLabel>
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Input
                              {...field}
                              value={
                                field.value.length > 0
                                  ? field.value.join(", ")
                                  : "Select Languages"
                              }
                              readOnly
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {[
                              "English",
                              "French",
                              "Spanish",
                              "Chinese",
                              "Other",
                            ].map((language) => (
                              <DropdownMenuItem
                                key={language}
                                onSelect={() => {
                                  const newValue = field.value.includes(
                                    language
                                  )
                                    ? field.value.filter(
                                        (val) => val !== language
                                      )
                                    : [...field.value, language];
                                  field.onChange(newValue);
                                }}
                              >
                                {language}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="">
            <div>
              <h2 className="text-center mb-6">Additional Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="businessWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Website (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="businessAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Address *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="bookingEmailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking Email Address *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="bookingPhoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking Phone Number *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="onlineBookingURL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Online Booking URL (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="faxNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fax Number (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div className="">
            <div>
              <h2 className="text-center mb-6">Profile Completion</h2>
              <FormField
                control={control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio *</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button type="button" onClick={prevStep}>
              Back
            </Button>
          )}
          {currentStep < 4 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
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

export default DoctorOnboardingForm;
