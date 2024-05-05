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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

const specialtyInfo = [
  {
    id: "family",
    label: "Family Medicine"
  },
  {
    id: "psychiatrist",
    label: "Psychiatrist"
  },
  {
    id: "psychologist",
    label: "Psychologist"
  },
  {
    id: "otherPhysician",
    label: "Other Specialist Physician (specify)"
  },
  {
    id: "other",
    label: "Other (specify)"
  },
] as const

const practitionerInfo = [
  {
    id: "name",
    label: "Name"
  },
  {
    id: "registrationId",
    label: "Registration License Number"
  },
] as const

// const formSchema = z.object({
//   studentData: z.string().min(2).max(50),
// })

const ProfessionSchema = z.object({
  practitionerName: z.string().min(2).max(50),
  licenseNo: z.coerce.number(),
  qualified: z.enum(['true', 'false']).transform((value) => value === 'true'),
  specialty: z.enum(["family", "psychiatrist", "psychologist", "otherPhysician", "other"])
})

const PractitionerForm: React.FC = () => {
  const professionForm = useForm<z.infer<typeof ProfessionSchema>>({
    resolver: zodResolver(ProfessionSchema),
    defaultValues: {
      practitionerName: "",
      licenseNo: 0,
      qualified: false,
    },
  })

  function onSubmit(values: z.infer<typeof ProfessionSchema>) {
    console.log(JSON.stringify(values, null, 2))
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-black">{JSON.stringify(values, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <Form {...professionForm}>
      <form onSubmit={professionForm.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField 
          key="practitionerName"
          control={professionForm.control}
          name="practitionerName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Practitioner Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
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
        <FormField 
          key="specialty"
          control={professionForm.control}
          name="specialty"
          render={({ field }) => {
            return (
              <FormItem key="specialty">
                <FormLabel>Qualified to make relevant diagnosis</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {specialtyInfo.map((item) => (
                      <FormItem key={item.id} className="flex items-center space-x-3 space-y-0">
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
            )
          }} 
        />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default PractitionerForm;