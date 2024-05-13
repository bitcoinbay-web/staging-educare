"use client"

import React from 'react'

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
import { Checkbox } from '@/components/ui/checkbox'

const MethodsInfo = [
  {
    id: "behavioral",
    label: "Behavioral Observations"
  },
  {
    id: "clinical",
    label: "Clinical Assessment"
  },
  {
    id: "diagnostic",
    label: "Diagnostic Imaging"
  },
  {
    id: "neuropsychological",
    label: "Neuropsychological Assessment"
  },
  {
    id: "psychoeducational",
    label: "Psychoeducational Assessment"
  },
  {
    id: "psychiatric",
    label: "Psychiatric Evaluation"
  },
  {
    id: "other",
    label: "Other (specify)"
  },
] as const

const AssessmentSchema = z.object({
  duration: z.string(),
  continue: z.enum(['yes', 'no', 'unknown']),
  // methods: z.enum(['behavioral', 'clinical', 'diagnostic', 'neuropsychological', 'psychoeducational', 'psychiatric', 'other'])
  methods: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item."
  })
})

const AssessmentHistory: React.FC = () => {
  const assessmentForm = useForm<z.infer<typeof AssessmentSchema>>({
    resolver: zodResolver(AssessmentSchema),
    defaultValues: {
      duration: '',
      continue: 'unknown',
      methods: ['other'],
    },
  })

  function onSubmit(values: z.infer<typeof AssessmentSchema>) {
    console.log(JSON.stringify(values, null, 2))
  }

  return (
    <Form {...assessmentForm}>
      <form onSubmit={assessmentForm.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        <FormField 
          key="duration"
          control={assessmentForm.control}
          name='duration'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>AssessmentHistory</FormLabel>
                <FormControl>
                <Input 
                    placeholder="How long have you provided service to this student?"
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
          key="continue"
          control={assessmentForm.control}
          name='continue'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>AssessmentHistory</FormLabel>
                <FormDescription>Will you continue to provide service to the student?</FormDescription>
                <FormControl>
                  {/* <Input 
                    placeholder="How long have you provided service to this student?"
                    type="text"
                    {...field}
                  /> */}
                  <RadioGroup
                    onValueChange={field.onChange}  
                    defaultValue={field.value}
                    className='flex flex-col space-y-1'                
                  >
                    <FormItem key="yes">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem key="no">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        No
                      </FormLabel>
                    </FormItem>
                    <FormItem key="unknown">
                      <FormControl>
                        <RadioGroupItem value="unknown" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Unknown
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
          key="methods"
          control={assessmentForm.control}
          name="methods"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Sidebar</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                {MethodsInfo.map((item) => (
                  <FormField
                    key={item.id}
                    control={assessmentForm.control}
                    name="methods"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <div>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />                    
                            </div>
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                          <Input 
                            placeholder="Date(s)"
                            type="text"
                            {...item}
                          />
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </FormItem>
            )
          }}
        />        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AssessmentHistory