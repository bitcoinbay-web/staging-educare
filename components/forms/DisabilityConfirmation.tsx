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

const DisabilityNatureInfo = [
  {
    id: 'acquired',
    label: 'Acquired Brain Injury'
  },
  {
    id: 'adhd',
    label: 'Attention Deficit (Hyperactivity) Disorder'
  },
  {
    id: 'autism',
    label: 'Autism Spectrum Disorder'
  },
  {
    id: 'chronic',
    label: 'Chronic Illness'
  },
  {
    id: 'hearing',
    label: 'Deaf, Deafened, Hard of Hearing'
  },
  {
    id: 'vision',
    label: 'Low Vision, Blind'
  },
  {
    id: 'mental',
    label: 'Mental Health'
  },
  {
    id: 'physical',
    label: 'Physical Mobility'
  },
  {
    id: 'other',
    label: 'provide psychoeducational assessment'
  },
]

const DisabilitySchema = z.object({
  disability: z.enum(['permanent', 'temporary', 'persistent']),
  duration: z.string(),
  nature: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item."
  }),
  primaryNature: z.enum(['acquired', 'adhd', 'autism', 'chronic', 'hearing', 'vision', 'mental', 'physical', 'other'])
})

const DisabilityConfirmation: React.FC = () => {
  const disabilityForm = useForm<z.infer<typeof DisabilitySchema>>({
    resolver: zodResolver(DisabilitySchema),
    defaultValues: {
      disability: 'permanent',
      duration: '',
      nature: ['other'],
      primaryNature: 'other'
    },
  })

  function onSubmit(values: z.infer<typeof DisabilitySchema>) {
    console.log(JSON.stringify(values, null, 2))
  }

  return (
    <Form {...disabilityForm}>
      <form onSubmit={disabilityForm.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        <FormField 
          key="disability"
          control={disabilityForm.control}
          name="disability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disability Form</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}  
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'                
                >
                  <FormItem key="permanent">
                    <FormControl>
                      <RadioGroupItem value="permanent" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Permanent
                    </FormLabel>
                  </FormItem>
                  <FormItem key="temporary">
                    <FormControl>
                      <RadioGroupItem value="temporary" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Temporary
                    </FormLabel>
                  </FormItem>
                  <FormField 
                    key="duration"
                    control={disabilityForm.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <Input 
                          placeholder="How long have you provided service to this student?"
                          type="text"
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormItem key="persistent">
                    <FormControl>
                      <RadioGroupItem value="persistent" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Persistent
                    </FormLabel>
                  </FormItem>
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
              {DisabilityNatureInfo.map((item) => (
                <FormField 
                  key={item.id}
                  control={disabilityForm.control}
                  name="nature"
                  render={({ field }) => (
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
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                )
                          }}
                        />  
                        {/* <RadioGroup 
                          onValueChange={field.onChange}  
                          defaultValue={field.value}
                          className='flex flex-col space-y-1'  
                        />            
                          <FormItem key="permanent">
                            <FormControl>
                              <RadioGroupItem value="permanent" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Permanent
                            </FormLabel>
                          </FormItem>
                        </Radiogroup> */}
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
                  )}
                />
              ))}
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default DisabilityConfirmation