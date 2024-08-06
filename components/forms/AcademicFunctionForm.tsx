"use client";

// Import necessary modules and components from various libraries
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { useAccount, useSignMessage } from "wagmi";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

// Define the available choices for impact levels
const choiceOptions = ["N/A", "Mild", "Mod", "Serious", "Severe"] as const;

// Define schema for impact fields using zod for validation
const impactsSchema = z.object({
  level: z.enum(choiceOptions),
  comments: z.string().optional(),
});

// Define schema for medication impact fields
const medicationImpactSchema = z.object({
  takesMedication: z.enum(["yes", "no"]),
  medicationDetails: z.string().optional(),
});

// Define the overall schema for the form
const ImpactsSchema = z.object({
  impacts: z.object({
    listening: impactsSchema,
    reading: impactsSchema,
    takingNotes: impactsSchema,
    completingAssignments: impactsSchema,
    writingTests: impactsSchema,
    deliveringPresentations: impactsSchema,
    meetingDeadlines: impactsSchema,
    participatingInGroup: impactsSchema,
  }),
  cognitiveSkills: z.object({
    attentionConcentration: impactsSchema,
    informationProcessing: impactsSchema,
    shortTermMemory: impactsSchema,
    longTermMemory: impactsSchema,
  }),
  socioEmotional: z.object({
    fatigue: impactsSchema,
    managingCourseLoad: impactsSchema,
    managingStress: impactsSchema,
    mood: impactsSchema,
    socialInteractions: impactsSchema,
    attendingClass: impactsSchema,
  }),
  physicalActivity: z.object({
    lifting: impactsSchema,
    grossMotorReaching: impactsSchema,
    bending: impactsSchema,
    writing: impactsSchema,
    typing: impactsSchema,
    otherPhysical: impactsSchema,
    walking: impactsSchema,
    stairClimbing: impactsSchema,
    sittingForPeriods: impactsSchema,
    standingForPeriods: impactsSchema,
    otherActivity: impactsSchema,
  }),
  sensory: z.object({
    visionRightEye: impactsSchema,
    visionLeftEye: impactsSchema,
    visionBilateral: impactsSchema,
    hearingRightEar: impactsSchema,
    hearingLeftEar: impactsSchema,
    hearingBilateral: impactsSchema,
    speech: impactsSchema,
  }),
  medicationImpact: medicationImpactSchema,
  additionalInfo: z.string().optional(),
});

// Define props for the form component
interface FormProps {
  studentId: string;
}

// Define the main form component
const AcademicFunctionForm: React.FC<FormProps> = ({ studentId }) => {
  const { data, signMessage } = useSignMessage();
  const account = useAccount();
  const { data: session } = useSession();

  // Initialize the form using react-hook-form with zod resolver
  const impactsForm = useForm<z.infer<typeof ImpactsSchema>>({
    resolver: zodResolver(ImpactsSchema),
    defaultValues: {
      impacts: {
        listening: { level: "N/A", comments: "" },
        reading: { level: "N/A", comments: "" },
        takingNotes: { level: "N/A", comments: "" },
        completingAssignments: { level: "N/A", comments: "" },
        writingTests: { level: "N/A", comments: "" },
        deliveringPresentations: { level: "N/A", comments: "" },
        meetingDeadlines: { level: "N/A", comments: "" },
        participatingInGroup: { level: "N/A", comments: "" },
      },
      cognitiveSkills: {
        attentionConcentration: { level: "N/A", comments: "" },
        informationProcessing: { level: "N/A", comments: "" },
        shortTermMemory: { level: "N/A", comments: "" },
        longTermMemory: { level: "N/A", comments: "" },
      },
      socioEmotional: {
        fatigue: { level: "N/A", comments: "" },
        managingCourseLoad: { level: "N/A", comments: "" },
        managingStress: { level: "N/A", comments: "" },
        mood: { level: "N/A", comments: "" },
        socialInteractions: { level: "N/A", comments: "" },
        attendingClass: { level: "N/A", comments: "" },
      },
      physicalActivity: {
        lifting: { level: "N/A", comments: "" },
        grossMotorReaching: { level: "N/A", comments: "" },
        bending: { level: "N/A", comments: "" },
        writing: { level: "N/A", comments: "" },
        typing: { level: "N/A", comments: "" },
        otherPhysical: { level: "N/A", comments: "" },
        walking: { level: "N/A", comments: "" },
        stairClimbing: { level: "N/A", comments: "" },
        sittingForPeriods: { level: "N/A", comments: "" },
        standingForPeriods: { level: "N/A", comments: "" },
        otherActivity: { level: "N/A", comments: "" },
      },
      sensory: {
        visionRightEye: { level: "N/A", comments: "" },
        visionLeftEye: { level: "N/A", comments: "" },
        visionBilateral: { level: "N/A", comments: "" },
        hearingRightEar: { level: "N/A", comments: "" },
        hearingLeftEar: { level: "N/A", comments: "" },
        hearingBilateral: { level: "N/A", comments: "" },
        speech: { level: "N/A", comments: "" },
      },
      medicationImpact: {
        takesMedication: "no",
        medicationDetails: "",
      },
      additionalInfo: "",
    },
  });

  // Load stored form values from session storage on component mount
  useEffect(() => {
    const storedValues = sessionStorage.getItem("impactsFormValues");
    if (storedValues) {
      impactsForm.reset(JSON.parse(storedValues));
    }
  }, [impactsForm]);

  // Save form values to session storage whenever they change
  useEffect(() => {
    const subscription = impactsForm.watch((values) => {
      sessionStorage.setItem("impactsFormValues", JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [impactsForm]);

  // Define the form submission handler
  const onSubmit = async (values: z.infer<typeof ImpactsSchema>) => {
    const jsonString = JSON.stringify(values);
    sessionStorage.setItem("impactsFormValues", jsonString);
    await signMessage({
      message: jsonString,
      account: account.address,
    });
    // console.log(JSON.stringify(values, null, 2));

    const userId = studentId
    const formData = {
      ...values,
      userId,
      account: account.address,
      signedMessage: data,
    };

    try {
      const response = await fetch("/api/academicFunctionForm", {
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

  // Helper function to render form fields based on the provided fields and form instance
  const renderFields = (fields, impactsForm) => {
    return fields.map((field) => (
      <FormField
        key={field.id}
        control={impactsForm.control}
        name={`${field.category}.${field.id}`}
        render={({ field: controllerField }) => (
          <FormItem className="space-y-4">
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  const updatedValue = {
                    ...controllerField.value,
                    level: value,
                  };
                  controllerField.onChange(updatedValue);
                  impactsForm.setValue(
                    `${field.category}.${field.id}`,
                    updatedValue
                  );
                }}
                defaultValue={controllerField.value?.level || "N/A"}
                className="flex space-x-4"
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
                value={controllerField.value?.comments || ""}
                onChange={(e) => {
                  const updatedValue = {
                    ...controllerField.value,
                    comments: e.target.value,
                  };
                  controllerField.onChange(updatedValue);
                  impactsForm.setValue(
                    `${field.category}.${field.id}`,
                    updatedValue
                  );
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ));
  };

  // Define the tasks for each category
  const impactsTasks = [
    { id: "listening", label: "Listening", category: "impacts" },
    { id: "reading", label: "Reading", category: "impacts" },
    { id: "takingNotes", label: "Taking Notes", category: "impacts" },
    {
      id: "completingAssignments",
      label: "Completing Assignments/Reports",
      category: "impacts",
    },
    { id: "writingTests", label: "Writing Tests & Exams", category: "impacts" },
    {
      id: "deliveringPresentations",
      label: "Delivering Presentations",
      category: "impacts",
    },
    { id: "meetingDeadlines", label: "Meeting Deadlines", category: "impacts" },
    {
      id: "participatingInGroup",
      label: "Participating in Group Activities",
      category: "impacts",
    },
  ];

  const cognitiveTasks = [
    {
      id: "attentionConcentration",
      label: "Attention & Concentration",
      category: "cognitiveSkills",
    },
    {
      id: "informationProcessing",
      label: "Information Processing",
      category: "cognitiveSkills",
    },
    {
      id: "shortTermMemory",
      label: "Short-Term Memory",
      category: "cognitiveSkills",
    },
    {
      id: "longTermMemory",
      label: "Long-Term Memory",
      category: "cognitiveSkills",
    },
  ];

  const socioEmotionalTasks = [
    { id: "fatigue", label: "Fatigue", category: "socioEmotional" },
    {
      id: "managingCourseLoad",
      label: "Managing a Full Course Load",
      category: "socioEmotional",
    },
    {
      id: "managingStress",
      label: "Managing Stress",
      category: "socioEmotional",
    },
    { id: "mood", label: "Mood", category: "socioEmotional" },
    {
      id: "socialInteractions",
      label: "Social Interactions",
      category: "socioEmotional",
    },
    {
      id: "attendingClass",
      label: "Attending Class",
      category: "socioEmotional",
    },
  ];

  const physicalActivityTasks = [
    { id: "lifting", label: "Lifting", category: "physicalActivity" },
    {
      id: "grossMotorReaching",
      label: "Gross Motor Reaching",
      category: "physicalActivity",
    },
    { id: "bending", label: "Bending", category: "physicalActivity" },
    { id: "writing", label: "Writing", category: "physicalActivity" },
    { id: "typing", label: "Typing", category: "physicalActivity" },
    { id: "otherPhysical", label: "Other", category: "physicalActivity" },
    { id: "walking", label: "Walking", category: "physicalActivity" },
    {
      id: "stairClimbing",
      label: "Stair Climbing",
      category: "physicalActivity",
    },
    {
      id: "sittingForPeriods",
      label: "Sitting for Sustained Periods",
      category: "physicalActivity",
    },
    {
      id: "standingForPeriods",
      label: "Standing for Sustained Periods",
      category: "physicalActivity",
    },
    { id: "otherActivity", label: "Other", category: "physicalActivity" },
  ];

  const sensoryTasks = [
    { id: "visionRightEye", label: "Vision (Right Eye)", category: "sensory" },
    { id: "visionLeftEye", label: "Vision (Left Eye)", category: "sensory" },
    { id: "visionBilateral", label: "Vision (Bilateral)", category: "sensory" },
    {
      id: "hearingRightEar",
      label: "Hearing (Right Ear)",
      category: "sensory",
    },
    { id: "hearingLeftEar", label: "Hearing (Left Ear)", category: "sensory" },
    {
      id: "hearingBilateral",
      label: "Hearing (Bilateral)",
      category: "sensory",
    },
    { id: "speech", label: "Speech", category: "sensory" },
  ];

  // Instructions for the form
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
      <Dialog>
        <DialogTrigger asChild>
          <Button>Instructions</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Instructions</DialogTitle>
          <DialogDescription>{instructions}</DialogDescription>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <form
        onSubmit={impactsForm.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6"
      >
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

        <FormField
          control={impactsForm.control}
          name="medicationImpact.takesMedication"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>
                Does the student take any medication and/or engage in any
                treatments that may impact their academic functioning?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
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
            <FormItem className="space-y-4">
              <FormControl>
                <Textarea placeholder="If yes, describe impact(s)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={impactsForm.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>
                Use this space to provide any additional functional
                limitation(s) related to the student’s academic performance
                and/or to provide any further information.
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Additional information" {...field} />
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
};

export default AcademicFunctionForm;
