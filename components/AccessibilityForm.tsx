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
import { Input } from "@/components/ui/input"

const studentInfo = [
  {
    id: "name",
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
  {
    id: "consent",
    label: "Share Consent"
  },
  {
    id: "authorize",
    label: "Authorize Communitication"
  },
  {
    id: "date",
    label: "Signature Date"
  }, 
]

const formSchema = z.object({
  studentData: z.string().min(2).max(50),
})

const AccessibilityForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentData: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="studentData"
          render={({ field }) => (
            <FormItem>
              <div className="text-base">
                <FormLabel>Disability Form </FormLabel>
                <FormDescription>
                  Student Information
                </FormDescription>
              </div>
              {studentInfo.map((item) => (
                <FormField 
                  key={item.id}
                  control={form.control}
                  name="studentData"
                  render={({ field }) => {
                    return(
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormLabel>{item.label}: </FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AccessibilityForm