"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"

import { useAccount, useSignMessage } from "wagmi";
import { useState, useEffect } from "react";

// Custom hook to handle form state persistence
const usePersistentFormState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const savedState = sessionStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

const studentInfo = [
  {
    id: "studentName",
    label: "Name"
  },
  {
    id: "studentId",
    label: "Student Id"
  },
  {
    id: "phoneNumber",
    label: "Phone Number"
  },
  {
    id: "email",
    label: "Email"
  },
] as const

const consentInfo = [
  {
    id: "consent",
    label: "Share Consent"
  },
  {
    id: "authorize",
    label: "Authorize Communication"
  },
] as const

const formSchema = z.object({
  studentName: z.string().min(2).max(50),
  studentId: z.coerce.number().nonnegative(),
  phoneNumber: z.coerce.number().nonnegative(),
  email: z.string().email(),
  consent: z.enum(['true', 'false']).transform((value) => value === 'true'),
  authorize: z.enum(['true', 'false']).transform((value) => value === 'true'),
})

const AccessibilityForm: React.FC = () => {
  const { data, signMessage } = useSignMessage();
  const account = useAccount()

  const [savedValues, setSavedValues] = usePersistentFormState('accessibilityForm', {
    studentName: "",
    studentId: "",
    phoneNumber: "",
    email: "",
    consent: 'false',
    authorize: 'false',
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: savedValues,
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const jsonString = JSON.stringify(values);
    signMessage({
      message: jsonString,
      account: account.address
    });
    console.log(JSON.stringify(values, null, 2));
    setSavedValues(values); // Save values to sessionStorage
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormItem>
            <div className="text-base">
              <FormLabel>Accessibility Form</FormLabel>
              <FormDescription>
                Student Information
              </FormDescription>
            </div>
            <FormMessage />
          </FormItem>
          {studentInfo.map((item) => (
            <FormField 
              key={item.id}
              control={form.control}
              name={item.id}
              render={({ field }) => {
                return(
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormLabel>{item.label}: </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          ))}
          {consentInfo.map((item) => (
            <FormField 
              key={item.id}
              control={form.control}
              name={item.id}
              render={({ field }) => {
                return(
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormLabel>{item.label}: </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        // defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Yes
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            No
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
        {data && (
          <div>
            <h3>Signed Data:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </Form>
    </>
  )
}

export default AccessibilityForm
