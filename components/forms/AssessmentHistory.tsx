"use client"

import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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

import { useAccount, useSignMessage } from "wagmi";

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
  duration: z.string().min(1, "Assessment duration is required."),
  continue: z.enum(['yes', 'no', 'unknown']),
  methods: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item."
  }),
  otherMethodDetails: z.string().optional(),
  diagnosticOptions: z.array(z.string()).optional(),
  methodDates: z.record(z.string(), z.string().optional()).optional(),
})

const AssessmentHistory: React.FC = () => {
  const { data, signMessage } = useSignMessage();
  const account = useAccount()

  const assessmentForm = useForm<z.infer<typeof AssessmentSchema>>({
    resolver: zodResolver(AssessmentSchema),
    defaultValues: {
      duration: '',
      continue: 'unknown',
      methods: [],
      otherMethodDetails: '',
      diagnosticOptions: [],
      methodDates: {},
    },
  })

  // Load values from local storage
  useEffect(() => {
    const storedValues = sessionStorage.getItem('assessmentFormValues')
    if (storedValues) {
      assessmentForm.reset(JSON.parse(storedValues))
    }
  }, [assessmentForm])

  // Save values to local storage on change
  useEffect(() => {
    const subscription = assessmentForm.watch((values) => {
      sessionStorage.setItem('assessmentFormValues', JSON.stringify(values))
    })
    return () => subscription.unsubscribe()
  }, [assessmentForm])

  function onSubmit(values: z.infer<typeof AssessmentSchema>) {
    const jsonString = JSON.stringify(values);
    signMessage({
      message: jsonString,
      account: account.address
    });
    console.log(JSON.stringify(values, null, 2));
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
                <FormLabel>Assessment Duration</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter duration" />
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
                <FormLabel>Assessment Continuation</FormLabel>
                <FormDescription>Will you continue to provide service to the student?</FormDescription>
                <FormControl>
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
                  <FormLabel className="text-base">Assessment Methods</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                {MethodsInfo.map((item) => (
                  <FormField
                    key={item.id}
                    control={assessmentForm.control}
                    name="methods"
                    render={({ field: methodField }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={methodField.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  methodField.onChange([...methodField.value, item.id])
                                } else {
                                  methodField.onChange(methodField.value?.filter(value => value !== item.id))
                                  assessmentForm.setValue(`methodDates.${item.id}`, '')
                                  if (item.id === 'other') {
                                    assessmentForm.setValue('otherMethodDetails', '')
                                  }
                                  if (item.id === 'diagnostic') {
                                    assessmentForm.setValue('diagnosticOptions', [])
                                  }
                                }
                              }}
                            />                    
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                          {/* {methodField.value?.includes(item.id) && ( */}
                          <FormControl>
                            <Controller
                              name={`methodDates.${item.id}`}
                              control={assessmentForm.control}
                              render={({ field }) => (
                                <DatePicker
                                  placeholderText="mm/dd/yyyy"
                                  selected={field.value ? new Date(field.value) : null}
                                  onChange={(date) => field.onChange(date?.toISOString().split('T')[0])}
                                  dateFormat="yyyy-MM-dd"
                                  className="input"
                                />
                              )}
                            />
                          </FormControl>
                          {/* )} */}
                          {item.id === 'diagnostic' && methodField.value?.includes('diagnostic') && (
                            <div className="ml-4 flex flex-col space-y-2">
                              {['MRI', 'CT', 'EEG', 'X-Ray', 'Other'].map(option => (
                                <FormField
                                  key={option}
                                  control={assessmentForm.control}
                                  name="diagnosticOptions"
                                  render={({ field: diagnosticField }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={diagnosticField.value?.includes(option)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? diagnosticField.onChange([...diagnosticField.value, option])
                                              : diagnosticField.onChange(
                                                  diagnosticField.value?.filter(
                                                    (value) => value !== option
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {option}
                                      </FormLabel>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                          )}
                          {item.id === 'other' && methodField.value?.includes('other') && (
                            <Controller
                              name="otherMethodDetails"
                              control={assessmentForm.control}
                              render={({ field }) => (
                                <Input
                                  placeholder="Please specify"
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          )}
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </FormItem>
            )
          }}
        />        
        <Button type="submit">Save</Button>
      </form>
      {data && (
        <div>
          <h3>Signed Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </Form>
  )
}

export default AssessmentHistory
