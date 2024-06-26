"use client"; // This directive is used in Next.js to indicate that the file contains client-side code.

import React, { useEffect, useState } from 'react'; // Import React and hooks
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver for form validation
import { useForm, Controller } from "react-hook-form"; // Import React Hook Form utilities
import { z } from "zod"; // Import zod for schema validation

import { Button } from "@/components/ui/button"; // Import Button component
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Import form components
import { Input } from "@/components/ui/input"; // Import Input component
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Import RadioGroup components
import { Textarea } from "@/components/ui/textarea"; // Import Textarea component

import { useAccount, useSignMessage } from "wagmi"; // Import wagmi hooks for account and message signing
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"; // Import Dialog components

// Define choices for the levels of impact
const choiceOptions = ['N/A', 'Mild', 'Mod', 'Serious', 'Severe'] as const;

// Define the schema for the form using zod
const ImpactsSchema = z.object({
  impacts: z.object({
    listening: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    reading: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    takingNotes: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    completingAssignments: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    writingTests: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    deliveringPresentations: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    meetingDeadlines: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    participatingInGroup: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
  }),
  cognitiveSkills: z.object({
    attentionConcentration: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    informationProcessing: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    shortTermMemory: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    longTermMemory: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
  }),
  socioEmotional: z.object({
    fatigue: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    managingCourseLoad: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    managingStress: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    mood: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    socialInteractions: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    attendingClass: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
  }),
  physicalActivity: z.object({
    lifting: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    grossMotorReaching: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    bending: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    writing: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    typing: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    otherPhysical: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    walking: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    stairClimbing: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    sittingForPeriods: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    standingForPeriods: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    otherActivity: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
  }),
  sensory: z.object({
    visionRightEye: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    visionLeftEye: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    visionBilateral: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    hearingRightEar: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    hearingLeftEar: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    hearingBilateral: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
    speech: z.object({
      level: z.enum(choiceOptions),
      comments: z.string().optional(),
    }),
  }),
  medicationImpact: z.object({
    takesMedication: z.enum(['yes', 'no']),
    medicationDetails: z.string().optional(),
  }),
  additionalInfo: z.string().optional(),
});

// AcademicFunctionForm component
const AcademicFunctionForm: React.FC = () => {
  const { data, signMessage } = useSignMessage(); // Initialize wagmi hooks
  const account = useAccount(); // Get the current account

  // Initialize form with default values and validation schema
  const impactsForm = useForm<z.infer<typeof ImpactsSchema>>({
    resolver: zodResolver(ImpactsSchema),
    defaultValues: {
      impacts: {
        listening: { level: 'N/A', comments: '' },
        reading: { level: 'N/A', comments: '' },
        takingNotes: { level: 'N/A', comments: '' },
        completingAssignments: { level: 'N/A', comments: '' },
        writingTests: { level: 'N/A', comments: '' },
        deliveringPresentations: { level: 'N/A', comments: '' },
        meetingDeadlines: { level: 'N/A', comments: '' },
        participatingInGroup: { level: 'N/A', comments: '' },
      },
      cognitiveSkills: {
        attentionConcentration: { level: 'N/A', comments: '' },
        informationProcessing: { level: 'N/A', comments: '' },
        shortTermMemory: { level: 'N/A', comments: '' },
        longTermMemory: { level: 'N/A', comments: '' },
      },
      socioEmotional: {
        fatigue: { level: 'N/A', comments: '' },
        managingCourseLoad: { level: 'N/A', comments: '' },
        managingStress: { level: 'N/A', comments: '' },
        mood: { level: 'N/A', comments: '' },
        socialInteractions: { level: 'N/A', comments: '' },
        attendingClass: { level: 'N/A', comments: '' },
      },
      physicalActivity: {
        lifting: { level: 'N/A', comments: '' },
        grossMotorReaching: { level: 'N/A', comments: '' },
        bending: { level: 'N/A', comments: '' },
        writing: { level: 'N/A', comments: '' },
        typing: { level: 'N/A', comments: '' },
        otherPhysical: { level: 'N/A', comments: '' },
        walking: { level: 'N/A', comments: '' },
        stairClimbing: { level: 'N/A', comments: '' },
        sittingForPeriods: { level: 'N/A', comments: '' },
        standingForPeriods: { level: 'N/A', comments: '' },
        otherActivity: { level: 'N/A', comments: '' },
      },
      sensory: {
        visionRightEye: { level: 'N/A', comments: '' },
        visionLeftEye: { level: 'N/A', comments: '' },
        visionBilateral: { level: 'N/A', comments: '' },
        hearingRightEar: { level: 'N/A', comments: '' },
        hearingLeftEar: { level: 'N/A', comments: '' },
        hearingBilateral: { level: 'N/A', comments: '' },
        speech: { level: 'N/A', comments: '' },
      },
      medicationImpact: {
        takesMedication: 'no',
        medicationDetails: '',
      },
      additionalInfo: '',
    },
  });

  // Load stored values from session storage on component mount
  useEffect(() => {
    const storedValues = sessionStorage.getItem('impactsFormValues');
    if (storedValues) {
      impactsForm.reset(JSON.parse(storedValues));
    }
    const savedData = sessionStorage.getItem("signMessageData");
    if (savedData) {
      signMessage(JSON.parse(savedData));
    }
  }, [impactsForm, signMessage]);

  // Save form values to session storage on value change
  useEffect(() => {
    const subscription = impactsForm.watch((values) => {
      sessionStorage.setItem('impactsFormValues', JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [impactsForm]);

  // Handle form submission
  function onSubmit(values: z.infer<typeof ImpactsSchema>) {
    const jsonString = JSON.stringify(values);
    sessionStorage.setItem("impactsFormValues", jsonString);
    signMessage({
      message: jsonString,
      account: account.address
    });
    console.log(JSON.stringify(values, null, 2));
  }

  // Render form fields
  const renderFields = (fields, impactsForm) => {
    return fields.map((field) => (
      <FormField
        key={field.id}
        control={impactsForm.control}
        name={`${field.category}.${field.id}`}
        render={({ field: controllerField }) => (
          <FormItem className='space-y-4'>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  const updatedValue = { ...controllerField.value, level: value };
                  controllerField.onChange(updatedValue);
                  impactsForm.setValue(`${field.category}.${field.id}`, updatedValue);
                }}
                defaultValue={controllerField.value?.level || 'N/A'}
                className='flex space-x-4'
              >
                {choiceOptions.map((level) => (
                  <FormItem key={level}>
                    <FormControl>
                      <RadioGroupItem value={level} />
                    </FormControl>
                    <FormLabel className="font-normal">{level}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl>
              <Textarea
                placeholder="Comments"
                value={controllerField.value?.comments || ''}
                onChange={(e) => {
                  const updatedValue = { ...controllerField.value, comments: e.target.value };
                  controllerField.onChange(updatedValue);
                  impactsForm.setValue(`${field.category}.${field.id}`, updatedValue);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  // Define task groups
  const impactsTasks = [
    { id: "listening", label: "Listening", category: "impacts" },
    { id: "reading", label: "Reading", category: "impacts" },
    { id: "takingNotes", label: "Taking Notes", category: "impacts" },
    { id: "completingAssignments", label: "Completing Assignments/Reports", category: "impacts" },
    { id: "writingTests", label: "Writing Tests & Exams", category: "impacts" },
    { id: "deliveringPresentations", label: "Delivering Presentations", category: "impacts" },
    { id: "meetingDeadlines", label: "Meeting Deadlines", category: "impacts" },
    { id: "participatingInGroup", label: "Participating in Group Activities", category: "impacts" },
  ];

  const cognitiveTasks = [
    { id: "attentionConcentration", label: "Attention & Concentration", category: "cognitiveSkills" },
    { id: "informationProcessing", label: "Information Processing", category: "cognitiveSkills" },
    { id: "shortTermMemory", label: "Short-Term Memory", category: "cognitiveSkills" },
    { id: "longTermMemory", label: "Long-Term Memory", category: "cognitiveSkills" },
  ];

  const socioEmotionalTasks = [
    { id: "fatigue", label: "Fatigue", category: "socioEmotional" },
    { id: "managingCourseLoad", label: "Managing a Full Course Load", category: "socioEmotional" },
    { id: "managingStress", label: "Managing Stress", category: "socioEmotional" },
    { id: "mood", label: "Mood", category: "socioEmotional" },
    { id: "socialInteractions", label: "Social Interactions", category: "socioEmotional" },
    { id: "attendingClass", label: "Attending Class", category: "socioEmotional" },
  ];

  const physicalActivityTasks = [
    { id: "lifting", label: "Lifting", category: "physicalActivity" },
    { id: "grossMotorReaching", label: "Gross Motor Reaching", category: "physicalActivity" },
    { id: "bending", label: "Bending", category: "physicalActivity" },
    { id: "writing", label: "Writing", category: "physicalActivity" },
    { id: "typing", label: "Typing", category: "physicalActivity" },
    { id: "otherPhysical", label: "Other", category: "physicalActivity" },
    { id: "walking", label: "Walking", category: "physicalActivity" },
    { id: "stairClimbing", label: "Stair Climbing", category: "physicalActivity" },
    { id: "sittingForPeriods", label: "Sitting for Sustained Periods", category: "physicalActivity" },
    { id: "standingForPeriods", label: "Standing for Sustained Periods", category: "physicalActivity" },
    { id: "otherActivity", label: "Other", category: "physicalActivity" },
  ];

  const sensoryTasks = [
    { id: "visionRightEye", label: "Vision (Right Eye)", category: "sensory" },
    { id: "visionLeftEye", label: "Vision (Left Eye)", category: "sensory" },
    { id: "visionBilateral", label: "Vision (Bilateral)", category: "sensory" },
    { id: "hearingRightEar", label: "Hearing (Right Ear)", category: "sensory" },
    { id: "hearingLeftEar", label: "Hearing (Left Ear)", category: "sensory" },
    { id: "hearingBilateral", label: "Hearing (Bilateral)", category: "sensory" },
    { id: "speech", label: "Speech", category: "sensory" },
  ];

  const instructions = `
    This assessment form reviews all types of disabilities so there may be questions not relevant to the
    student. Please assess functional limitations and outline the impact(s) on academic functioning.
    Mild Student has some functional limitations and may require minimal academic accommodation(s)
    and/or support.
    Moderate Student has prominent functional limitations and requires academic accommodation(s) and
    support.
    Serious Student has a high degree of functional impairment that interferes with academic functioning
    and requires extensive academic accommodation(s) and support.
    Severe Student has extreme functional impairment and may have difficulty meeting academic
    obligations even with extensive academic accommodations.
  `;

  return (
    <Form {...impactsForm}>
      {/* Instruction Pop-up */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Instructions</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Instructions</DialogTitle>
          <DialogDescription>
            {instructions}
          </DialogDescription>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <form onSubmit={impactsForm.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
        {/* Render each section */}
        <h2>Impacts on Academic Functioning</h2>
        {renderFields(impactsTasks, impactsForm)}

        <h2>Cognitive Skills</h2>
        {renderFields(cognitiveTasks, impactsForm)}

        <h2>Socio-Emotional Factors</h2>
        {renderFields(socioEmotionalTasks, impactsForm)}

        <h2>Physical Activity</h2>
        {renderFields(physicalActivityTasks, impactsForm)}

        <h2>Sensory</h2>
        {renderFields(sensoryTasks, impactsForm)}

        {/* Medication Impact Field */}
        <FormField
          control={impactsForm.control}
          name="medicationImpact.takesMedication"
          render={({ field }) => (
            <FormItem className='space-y-4'>
              <FormLabel>Does the student take any medication and/or engage in any treatments that may impact their academic functioning?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex space-x-4'
                >
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={impactsForm.control}
          name="medicationImpact.medicationDetails"
          render={({ field }) => (
            <FormItem className='space-y-4'>
              <FormControl>
                <Textarea
                  placeholder="If yes, describe impact(s)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Info Field */}
        <FormField
          control={impactsForm.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem className='space-y-4'>
              <FormLabel>Use this space to provide any additional functional limitation(s) related to the student’s academic performance and/or to provide any further information.</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Additional information"
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
}

export default AcademicFunctionForm; // Export the AcademicFunctionForm component as the default export
