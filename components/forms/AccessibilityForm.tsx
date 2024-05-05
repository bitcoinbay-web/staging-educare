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
  // {
  //   id: "consent",
  //   label: "Share Consent"
  // },
  // {
  //   id: "authorize",
  //   label: "Authorize Communitication"
  // },
] as const

const consentInfo = [
  {
    id: "consent",
    label: "Share Consent"
  },
  {
    id: "authorize",
    label: "Authorize Communitication"
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
// .refine((data) => {
//   return data.consent === true && data.authorize === true
// }, {
//   message: "Not yet authorized",
//   path: ["consent", "authorize"]
// })

const AccessibilityForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(JSON.stringify(values, null, 2))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          {/* <div className="text-base"> */}
            <FormLabel>Accessibility Form </FormLabel>
            <FormDescription>
              Student Information
            </FormDescription>name
          {/* </div> */}
          <FormMessage />
        </FormItem>
        {/* <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <div className="text-base">
                <FormLabel>Accessibility Form </FormLabel>
                <FormDescription>
                  Student Information
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        /> */}
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
    </Form>
  )
}

export default AccessibilityForm