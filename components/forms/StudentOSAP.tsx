"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"; // Import the Checkbox component
import { useAccount, useSignMessage } from "wagmi";

const studentOSAPSchema = z.object({
  schoolName: z.string().nonempty("School name is required"),
  socialInsuranceNumber: z.string().nonempty("Social Insurance Number is required"),
  studentNumber: z.string().nonempty("Student number is required"),
  oen: z.string().optional(),
  lastName: z.string().nonempty("Last name is required"),
  firstName: z.string().nonempty("First name is required"),
  dateOfBirth: z.object({
    day: z.string().nonempty("Day is required"),
    month: z.string().nonempty("Month is required"),
    year: z.string().nonempty("Year is required"),
  }),
  address: z.object({
    street: z.string().nonempty("Street is required"),
    apartment: z.string().optional(),
    city: z.string().nonempty("City is required"),
    province: z.string().nonempty("Province is required"),
    postalCode: z.string().nonempty("Postal code is required"),
    country: z.string().nonempty("Country is required"),
  }),
  phoneNumber: z.string().nonempty("Phone number is required"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Consent is required",
  }),
  optionalConsent: z.boolean().optional(),
  signature: z.string().nonempty("Signature is required"),
  signatureDate: z.date({ required_error: "Signature date is required" }),
});

const StudentOSAPForm: React.FC = () => {
  const { data, signMessage } = useSignMessage();
  const account = useAccount();

  const studentOSAPForm = useForm<z.infer<typeof studentOSAPSchema>>({
    resolver: zodResolver(studentOSAPSchema),
    defaultValues: {
      schoolName: "",
      socialInsuranceNumber: "",
      studentNumber: "",
      oen: "",
      lastName: "",
      firstName: "",
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      },
      address: {
        street: "",
        apartment: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
      },
      phoneNumber: "",
      consent: false,
      optionalConsent: false,
      signature: "",
      signatureDate: new Date(),
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValues = sessionStorage.getItem("studentOSAPFormValues");
      if (storedValues) {
        studentOSAPForm.reset(JSON.parse(storedValues));
      }
    }
  }, [studentOSAPForm]);

  useEffect(() => {
    const subscription = studentOSAPForm.watch((values) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("studentOSAPFormValues", JSON.stringify(values));
      }
    });
    return () => subscription.unsubscribe();
  }, [studentOSAPForm]);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem("signMessageData", JSON.stringify(data));
    }
  }, [data]);

  function onSubmit(values: z.infer<typeof studentOSAPSchema>) {
    const jsonString = JSON.stringify(values);
    signMessage({
      message: jsonString,
      account: account.address
    });
    console.log(jsonString);
  }

  return (
    <Form {...studentOSAPForm}>
      <form
        onSubmit={studentOSAPForm.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={studentOSAPForm.control}
          name="schoolName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is the name of the school you plan to attend?</FormLabel>
              <FormControl>
                <Input placeholder="School Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={studentOSAPForm.control}
          name="socialInsuranceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Insurance Number</FormLabel>
              <FormControl>
                <Input placeholder="Social Insurance Number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={studentOSAPForm.control}
          name="studentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student number at your school</FormLabel>
              <FormControl>
                <Input placeholder="Student Number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={studentOSAPForm.control}
          name="oen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ontario Education Number (OEN), if assigned to you</FormLabel>
              <FormControl>
                <Input placeholder="OEN" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={studentOSAPForm.control}
          name="lastName"
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
          control={studentOSAPForm.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Date of birth</FormLabel>
          <div className="flex space-x-2">
            <FormField
              control={studentOSAPForm.control}
              name="dateOfBirth.day"
              render={({ field }) => (
                <FormControl>
                  <Input placeholder="Day" {...field} />
                </FormControl>
              )}
            />
            <FormField
              control={studentOSAPForm.control}
              name="dateOfBirth.month"
              render={({ field }) => (
                <FormControl>
                  <Input placeholder="Month" {...field} />
                </FormControl>
              )}
            />
            <FormField
              control={studentOSAPForm.control}
              name="dateOfBirth.year"
              render={({ field }) => (
                <FormControl>
                  <Input placeholder="Year" {...field} />
                </FormControl>
              )}
            />
          </div>
        </FormItem>

        <FormItem>
          <FormLabel>Mailing address</FormLabel>
          <FormField
            control={studentOSAPForm.control}
            name="address.street"
            render={({ field }) => (
              <FormControl>
                <Input placeholder="Street number and name, rural route, or post office box" {...field} />
              </FormControl>
            )}
          />
          <FormField
            control={studentOSAPForm.control}
            name="address.apartment"
            render={({ field }) => (
              <FormControl>
                <Input placeholder="Apartment" {...field} />
              </FormControl>
            )}
          />
          <FormField
            control={studentOSAPForm.control}
            name="address.city"
            render={({ field }) => (
              <FormControl>
                <Input placeholder="City, town, or post office" {...field} />
              </FormControl>
            )}
          />
          <FormField
            control={studentOSAPForm.control}
            name="address.province"
            render={({ field }) => (
              <FormControl>
                <Input placeholder="Province or state" {...field} />
              </FormControl>
            )}
          />
          <FormField
            control={studentOSAPForm.control}
            name="address.postalCode"
            render={({ field }) => (
              <FormControl>
                <Input placeholder="Postal code or zip code" {...field} />
              </FormControl>
            )}
          />
          <FormField
            control={studentOSAPForm.control}
            name="address.country"
            render={({ field }) => (
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
            )}
          />
        </FormItem>

        <FormField
          control={studentOSAPForm.control}
          name="phoneNumber"
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
          control={studentOSAPForm.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  ref={field.ref}
                />
              </FormControl>
              <FormLabel>I agree to the consents and declarations</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={studentOSAPForm.control}
          name="optionalConsent"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  ref={field.ref}
                />
              </FormControl>
              <FormLabel>I agree to the optional consent and declaration</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={studentOSAPForm.control}
          name="signature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student’s signature</FormLabel>
              <FormControl>
                <Input placeholder="Signature" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={studentOSAPForm.control}
          name="signatureDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Signature Date</FormLabel>
              <FormControl>
                <Controller
                  control={studentOSAPForm.control}
                  name="signatureDate"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="yyyy-MM-dd"
                      className="input"
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

export default StudentOSAPForm;
