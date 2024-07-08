"use client";

import React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignMessage, useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from "react-datepicker";
import { Checkbox } from '../ui/checkbox';
import { useSession } from 'next-auth/react'; // Import useSession from next-auth/react

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  chosenName: z.string().optional(),
  pronoun: z.string().optional(),
  studentNumber: z.string().min(1),
  phoneNumber: z.string().min(1),
  canLeaveMessage: z.enum(["Yes", "No"]),
  emergencyContact: z.string().min(1),
  eligibleForOsap: z.enum(["Yes", "No", "Not sure"]),
  sourceBeforeTmu: z.enum(["High school", "College", "Another University", "The Workforce", "Other"]),
  levelOfStudy: z.enum(["Undergraduate", "Graduate", "Continuing Education"]),
  faculty: z.enum([
    "Faculty of Arts",
    "Faculty of Community Services",
    "Faculty of Communication and Design",
    "Faculty of Engineering and Architectural Science",
    "The Creative School",
    "Faculty of Science",
    "Faculty of Law",
    "Ted Rogers School of Management",
    "Yeates School of Graduate Studies",
    "Chang School of Continuing Education"
  ]),
  specializedProgram: z.enum(["Law Practice Program (LPP)", "Juris Doctor (JD)", "Midwifery", "Nursing", "N/A"]),
  involvesPracticums: z.enum(["Yes", "No", "Not sure"]),
  yearOfStudy: z.enum(["Incoming Student", "First year", "Second year", "Third year", "Fourth year", "Fifth year", "Other"]),
  startNextCourse: z.enum(["Winter 2024", "Spring/Summer 2024", "Fall 2024", "Other (Fast Track/Acceleration/Intensive Program or Course)", "None of the above"]),
  coursesNextSemester: z.enum(["1", "2", "3", "4", "5", "6+"]),
  anticipatedGraduation: z.string().min(1),
  disabilityImpact: z.string().min(1),
  receivedAccommodationsBefore: z.enum(["Yes", "No", "I'm not sure"]),
  previousAccommodations: z.string().min(1),
  additionalInfo: z.string().optional(),
  currentSupport: z.string().optional(),
  strengths: z.array(z.string()),
  academicChallenges: z.array(z.string()),
  academicChallengesDetails: z.string().min(1)
});

const PersonalInfoSection: React.FC = () => {
  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      chosenName: "",
      pronoun: "",
      studentNumber: "",
      phoneNumber: "",
      canLeaveMessage: undefined,
      emergencyContact: "",
      eligibleForOsap: undefined,
      sourceBeforeTmu: undefined,
      levelOfStudy: undefined,
      faculty: undefined,
      specializedProgram: undefined,
      involvesPracticums: undefined,
      yearOfStudy: undefined,
      startNextCourse: undefined,
      coursesNextSemester: undefined,
      anticipatedGraduation: "",
      disabilityImpact: "",
      receivedAccommodationsBefore: undefined,
      previousAccommodations: "",
      additionalInfo: "",
      currentSupport: "",
      strengths: [],
      academicChallenges: [],
      academicChallengesDetails: "",
    },
  });

  const { data, signMessage } = useSignMessage();
  const account = useAccount();

  const onSubmit = async (values: any) => {
    const jsonString = JSON.stringify(values);
    sessionStorage.setItem("personalInfoSectionValues", jsonString);
    signMessage({
      message: jsonString,
      account: account.address
    });

    const userId = session?.user?.id;
    const formData = {
      ...values,
      userId,
      account: account.address,
      signedMessage: data
    };

    try {
      const response = await fetch('/api/personalInfoSection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Form submitted successfully:', result);
      } else {
        console.error('Failed to submit form:', result);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const { control, watch } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>44. First Name *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>45. Last Name *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="chosenName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>46. Chosen Name *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="pronoun"
          render={({ field }) => (
            <FormItem>
              <FormLabel>47. Pronoun (e.g. he/she/they/etc.) *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="studentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>48. Student Number *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>49. Phone Number *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="canLeaveMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>50. Can we leave a message at this number? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <RadioGroupItem value="No" />
                    <span>No</span>
                  </label>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="emergencyContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>51. Emergency Contact (Name/Relationship/Contact Number) *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="eligibleForOsap"
          render={({ field }) => (
            <FormItem>
              <FormLabel>52. Are you Eligible for OSAP? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  <label className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <RadioGroupItem value="No" />
                    <span>No</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <RadioGroupItem value="Not sure" />
                    <span>Not sure</span>
                  </label>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="sourceBeforeTmu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>53. Where did you come from before attending TMU? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {["High school", "College", "Another University", "The Workforce", "Other"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="levelOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>54. What is your level of study? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {["Undergraduate", "Graduate", "Continuing Education"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="faculty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>55. What is your faculty? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {[
                    "Faculty of Arts",
                    "Faculty of Community Services",
                    "Faculty of Communication and Design",
                    "Faculty of Engineering and Architectural Science",
                    "The Creative School",
                    "Faculty of Science",
                    "Faculty of Law",
                    "Ted Rogers School of Management",
                    "Yeates School of Graduate Studies",
                    "Chang School of Continuing Education"
                  ].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="specializedProgram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>56. Please indicate if you&apos;re in one of the following specialized programs: *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {["Law Practice Program (LPP)", "Juris Doctor (JD)", "Midwifery", "Nursing", "N/A"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="involvesPracticums"
          render={({ field }) => (
            <FormItem>
              <FormLabel>57. Does your program involve practicums/placements/field work? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {["Yes", "No", "Not sure"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="yearOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>58. What year of study are you in? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {["Incoming Student", "First year", "Second year", "Third year", "Fourth year", "Fifth year", "Other"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="startNextCourse"
          render={({ field }) => (
            <FormItem>
              <FormLabel>59. When do you anticipate starting your next course/s? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {["Winter 2024", "Spring/Summer 2024", "Fall 2024", "Other (Fast Track/Acceleration/Intensive Program or Course)", "None of the above"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="coursesNextSemester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>60. How many courses are you currently taking this semester? If you are not currently enrolled, how many courses are you planning on taking next semester? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {["1", "2", "3", "4", "5", "6+"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="anticipatedGraduation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>61. What is your approximate anticipated graduation date? *</FormLabel>
              <FormControl>
                <DatePicker
                  placeholderText="mm/dd/yyyy"
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString().split('T')[0])}
                  dateFormat="yyyy-MM-dd"
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="disabilityImpact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>62. Briefly describe how your disability(ies) impacts you and your academic functioning *</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="receivedAccommodationsBefore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>63. Have you ever received academic accommodations before? *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {["Yes", "No", "I'm not sure"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="previousAccommodations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>64. Please describe your previous accommodations (please note that accommodations received in high school, college, or another university won’t necessarily be the same as your Toronto Metropolitan accommodation plan) *</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>65. Is there anything else you would like us to know about your disability and supporting your academics? (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="currentSupport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>66. Please list any treatment, support, or therapies which you are currently accessing that supports your studies? (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="strengths"
          render={({ field }) => (
            <FormItem>
              <FormLabel>67. What are your strengths? (check all that apply) *</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {["Organization", "Time Management", "Test taking", "Studying", "Writing Assignments", "Note taking", "Participation/presentations", "Processing Information", "Other"].map((strength) => (
                    <div key={strength} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value.includes(strength)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, strength]
                            : field.value.filter((value) => value !== strength);
                          field.onChange(newValue);
                        }}
                      />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="academicChallenges"
          render={({ field }) => (
            <FormItem>
              <FormLabel>68. What are your academic challenges? (check all that apply) *</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {["Organization", "Time Management", "Test taking", "Studying", "Writing Assignments", "Note taking", "Participation/presentations", "Processing Information", "Other"].map((challenge) => (
                    <div key={challenge} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value.includes(challenge)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, challenge]
                            : field.value.filter((value) => value !== challenge);
                          field.onChange(newValue);
                        }}
                      />
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="academicChallengesDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>69. Please expand on the academic challenges selected above: *</FormLabel>
              <FormControl>
                <Textarea {...field} />
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
    </FormProvider>
  );
};

export default PersonalInfoSection;
