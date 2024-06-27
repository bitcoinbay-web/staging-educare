"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAccount, useSignMessage } from 'wagmi';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from "react-datepicker";

const primaryDisabilities = [
  "Acquired Brain Injury (ABI/TBI)",
  "Attention Deficit Hyperactivity Disorder (ADHD)",
  "Autism Spectrum Disorder (ASD)",
  "Chronic Health/Medical (eg. chronic pain, epilepsy)",
  "Deaf, Deafened, Hard of Hearing",
  "Learning Disability (LD)",
  "Low Vision, Blind",
  "Mental Health (eg. anxiety, depression)",
  "Physical/Functional/Mobility",
  "Mild Intellectual Disability (MID)"
] as const;

const primaryDisabilitySkips = [
  "Skip to question 6",
  "Skip to question 8",
  "Skip to question 14",
  "Skip to question 16",
  "Skip to question 20",
  "Skip to question 10",
  "Skip to question 24",
  "Skip to question 22",
  "Skip to question 18",
  "Skip to question 12",
] as const;

const secondaryDisabilities = [
  "Acquired Brain Injury (ABI/TBI)",
  "Attention Deficit Hyperactivity Disorder (ADHD)",
  "Autism Spectrum Disorder (ASD)",
  "Chronic Health/Medical (eg. chronic pain, epilepsy)",
  "Deaf, Deafened, Hard of Hearing",
  "Learning Disability (LD)",
  "Low Vision, Blind",
  "Mental Health (eg. anxiety, depression)",
  "Physical/Functional/Mobility",
  "Mild Intellectual Disability (MID)",
] as const;

const secondaryDisabilitySkips = [
  "Skip to question 7",
  "Skip to question 9",
  "Skip to question 15",
  "Skip to question 17",
  "Skip to question 21",
  "Skip to question 11",
  "Skip to question 25",
  "Skip to question 23",
  "Skip to question 19",
  "Skip to question 13",
] as const;

const formSchema = z.object({
  email: z.string().email(),
  consent: z.string().min(1),
  primaryDisability: z.enum(primaryDisabilities),
  secondaryDisabilities: z.array(z.string()),
  secondaryDisability: z.enum(secondaryDisabilities).optional(),
  abiFormStatus: z.string().optional(),
  secondaryAbiFormStatus: z.string().optional(),
  adhdFormStatus: z.string().optional(),
  secondaryAdhdFormStatus: z.string().optional(),
  ldFormStatus: z.string().optional(),
  secondaryLdFormStatus: z.string().optional(),
  midFormStatus: z.string().optional(),
  secondaryMidFormStatus: z.string().optional(),
  asdFormStatus: z.string().optional(),
  secondaryAsdFormStatus: z.string().optional(),
  chronicFormStatus: z.string().optional(),
  secondaryChronicFormStatus: z.string().optional(),
  physicalFormStatus: z.string().optional(),
  secondaryPhysicalFormStatus: z.string().optional(),
  deafFormStatus: z.string().optional(),
  secondaryDeafFormStatus: z.string().optional(),
  mentalHealthFormStatus: z.string().optional(),
  secondaryMentalHealthFormStatus: z.string().optional(),
  visionFormStatus: z.string().optional(),
  secondaryVisionFormStatus: z.string().optional(),
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

const DisabilityFormSection = ({ disability, type, control, fieldName }) => {
  const labels = {
    "Acquired Brain Injury (ABI/TBI)": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
    "Attention Deficit Hyperactivity Disorder (ADHD)": `You selected "${disability}". For this condition, we require our Disability Assessment Form or Psychoeducational Assessment:`,
    "Learning Disability (LD)": `You selected "${disability}". For this condition, we require a Psychoeducational Assessment. Please note: an IEP on its own is not a sufficient document for registration. If you have an IEP but not a Psychoeducational Assessment, select 'I do not have a completed Psychoeducational Assessment' below.`,
    "Mild Intellectual Disability (MID)": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
    "Autism Spectrum Disorder (ASD)": `You selected "${disability}". For this condition, we require our Disability Assessment Form or Psychoeducational Assessment:`,
    "Chronic Health/Medical (eg. chronic pain, epilepsy)": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
    "Physical/Functional/Mobility": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
    "Deaf, Deafened, Hard of Hearing": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
    "Mental Health (eg. anxiety, depression)": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
    "Low Vision, Blind": `You selected "${disability}". For this condition, we require our Disability Assessment Form:`,
  };

  const options = {
    "Acquired Brain Injury (ABI/TBI)": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Attention Deficit Hyperactivity Disorder (ADHD)": [
      { value: "I have a Disability Assessment Form or Psychoeducational Assessment to upload", label: "I have a Disability Assessment Form or Psychoeducational Assessment to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form or Psychoeducational Assessment", label: "I do not have a completed Disability Assessment Form or Psychoeducational Assessment", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Learning Disability (LD)": [
      { value: "I have a Psychoeducational Assessment to upload", label: "I have a Psychoeducational Assessment to upload", skip: "Skip to question 30" },
      { value: "I do not have a completed Psychoeducational Assessment", label: "I do not have a completed Psychoeducational Assessment", skip: "Skip to section 33 (Missing Documentation: Psychoeducational Assessment)" }
    ],
    "Mild Intellectual Disability (MID)": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Autism Spectrum Disorder (ASD)": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Chronic Health/Medical (eg. chronic pain, epilepsy)": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Physical/Functional/Mobility": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Deaf, Deafened, Hard of Hearing": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Mental Health (eg. anxiety, depression)": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
    "Low Vision/Blind": [
      { value: "I have a Disability Assessment Form to upload", label: "I have a Disability Assessment Form to upload", skip: "Skip to question 26" },
      { value: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", label: "My Disability Assessment Form is being submitted by the TMU Medical Centre/my doctor", skip: "Skip to question 35" },
      { value: "I do not have a completed Disability Assessment Form", label: "I do not have a completed Disability Assessment Form", skip: "Skip to section 32 (Missing Documentation)" }
    ],
  };

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{labels[disability]}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="space-y-2"
            >
              {options[disability].map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} />
                  <span>{option.label}</span>
                  <p className="ml-6">{option.skip}</p>
                </label>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const IntakeForm: React.FC = () => {
  const { data, signMessage } = useSignMessage();
  const account = useAccount();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      consent: "",
      primaryDisability: undefined,
      secondaryDisabilities: [],
      secondaryDisability: undefined,
      abiFormStatus: undefined,
      secondaryAbiFormStatus: undefined,
      adhdFormStatus: undefined,
      secondaryAdhdFormStatus: undefined,
      ldFormStatus: undefined,
      secondaryLdFormStatus: undefined,
      midFormStatus: undefined,
      secondaryMidFormStatus: undefined,
      asdFormStatus: undefined,
      secondaryAsdFormStatus: undefined,
      chronicFormStatus: undefined,
      secondaryChronicFormStatus: undefined,
      physicalFormStatus: undefined,
      secondaryPhysicalFormStatus: undefined,
      deafFormStatus: undefined,
      secondaryDeafFormStatus: undefined,
      mentalHealthFormStatus: undefined,
      secondaryMentalHealthFormStatus: undefined,
      visionFormStatus: undefined,
      secondaryVisionFormStatus: undefined,
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

  const onSubmit = (values: any) => {
    const jsonString = JSON.stringify(values);
    sessionStorage.setItem("intakeFormValues", jsonString);
    signMessage({
      message: jsonString,
      account: account.address
    });
    console.log(JSON.stringify(values, null, 2));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          Register with Academic Accommodation
          Support - Express Registration Option
          (ERO)
        </div>
        <p>
          Thank you for your interest in registering with Toronto Metropolitan University&apos;s disability
          services office, Academic Accommodation Support (AAS). We support students who require
          academic accommodation due to disability. If you require accommodations to access this
          form, please email <a href='mailto:aasintake1@torontomu.ca' target='_blank' className='underline text-blue-600' >aasintake1@torontomu.ca</a>.
          Once you submit this form your responses and documentation will be reviewed. Sometimes,
          we may request that you provide additional documentation or information.
          After reviewing your Intake Form and documentation, your accommodation plan will be
          created and emailed to you within approximately five to seven business days.
        </p>
        {/* Initial sections for Email and Consent */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>1. Email *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div>
            Express Registration Option (ERO) Intake Form
            This Intake Form:
          </div>
          <p>
            <ul>
              <li>✔ Takes approximately 20-30 minutes to complete</li>
              <li>✔ Requires you to review the AAS policy and consent agreements</li>
              <li>✔ Identifies required disability-related documentation</li>
              <li>✔ Requires you to upload your disability-related documentation</li>
              <li>✖ Cannot be saved once in progress.</li>
              <li>✔ Requires you to click &apos;Submit&apos; when you are done.</li>
            </ul>
            <br />
            <p>
              Completion of both Part 1 (disability information and documentation upload) and Part 2 (personal
              information) of the form is required to continue through the registration process.
            </p>
            <ul>
              ✔ You will know you submitted the form if you receive a confirmation email.
            </ul>
            <p>
              Didn&apos;t receive a confirmation email? Let us know.
              Let&apos;s get started!
            </p>
          </p>

          <div>
            Confidentiality and Information Policy
            Confidentiality & Information Privacy Protection
          </div>
          <p>
            Please review the following information carefully. Your registration with Academic
            Accommodation Support (AAS) is voluntary; you may discontinue at any time.
            <br /><br />
            The information on this form is collected under the authority of the Ryerson University Act,
            1977 for the purpose of determining a need for academic accommodation. All personal
            information collected will be used, stored, protected and destroyed in accordance with the
            university&apos;s Information Protection and Access Policy and Section 39(2) of the Freedom of
            Information and Protection of Privacy Act, 1990 (“FIPPA”).
            <br /><br />
            The following four circumstances are exceptions where AAS is required by law, and in
            accordance with our policies, to disclose your personal information to another department
            within the university or to the appropriate health, safety, police, or legal body:

            <ul>
              <li>1. If you indicate that you may be a danger to yourself or others;</li>
              <li>2. In the case of apparent, suspected, or potential child abuse;</li>
              <li>3. If you report sexual abuse by a regulated health-care professional;</li>
              <li>4. In instances where the court subpoena your records.</li>
            </ul>
            
            <br />
            <div>Information Security & Records Retention</div>
            Your records are kept securely by Academic Accommodation Support. Files are securely
            archived one year after last active registration. Archived files are destroyed after 10 years.
            Please keep a copy of your documentation for your own records.
            
            <br /><br />
            <div>Notice of Communication with university Staff and Faculty</div>
            Once registered, Academic Accommodation Support staff members may communicate your
            accommodation requirements and related matters with professors/instructors and/or
            professional staff at the university in order to ensure your accommodation requirements are
            met, to resolve problems and/or to work within the university on your behalf regarding related
            issues.
            <br /><br />
            The nature of information AAS may release includes:
            <br /><br />
            <ul>
              <li>• Confirmation of the presence of a disability that impacts your learning.</li>
              <li>• Confirmation of your registration with our office, Academic Accommodation Support.</li>
              <li>• Your accommodation requirements.</li>
            </ul>

            <br /><br />
            <div>Your Responsibilities</div>
            There are responsibilities associated with your accommodation plan and its implementation.
            Please review your registration notes, any emails and the Academic Accommodations
            Support website regarding specific responsibilities and deadlines associated with your
            accommodations.
            
            <br /><br />
            Your acceptance below affirms that you have read this policy and are aware of all its
            contents. If you have questions about the collection, use, and disclosure of this information
            by the university please contact us.
          </p>
        </div>

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>2. I have read and understand the above Confidentiality and Information Policy *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          Intake Form: Part 1 <br />
          <p>
            In this section we ask about your disability(ies) and guide you through identifying and
            submitting the appropriate documentation.
            <br />
            <p>
              Note: Your disability-related documentation is a key piece to your registration. This interactive
              form will identify the requirements for your specific disability and request that documents be
              uploaded. If you need to exit the form in order to obtain and/or digitize your documentation,
              you can always return and re-start this intake form again.
              <br />
              <p>For more information, visit our <a className='underline text-blue-600' href='https://www.torontomu.ca/accommodations/' rel='noreferrer'>website</a>.</p>
            </p>
          </p>
        </div>

        {/* Primary Disabilities */}
        <FormField
          control={form.control}
          name="primaryDisability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>3. Please indicate the primary disability that affects your academics (select one): *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {primaryDisabilities.map((disability, index) => (
                    <div key={disability}>
                      <label className="flex items-center space-x-2">
                        <RadioGroupItem value={disability} />
                        <span>{disability}</span>
                      </label>
                      <p className="ml-6">{primaryDisabilitySkips[index]}</p>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Secondary Disabilities */}
        <FormField
          control={form.control}
          name="secondaryDisabilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>4. Please indicate all other (secondary) disabilities that affect your academics: *</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {secondaryDisabilities.map((disability) => (
                    <div key={disability} className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value.includes(disability)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, disability]
                            : field.value.filter((value) => value !== disability);
                          field.onChange(newValue);
                        }}
                      />
                      <span>{disability}</span>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Secondary Disability */}
        <FormField
          control={form.control}
          name="secondaryDisability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>5. Please indicate the secondary disability that affects your academics (select one): *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="space-y-2"
                >
                  {secondaryDisabilities.map((disability, index) => (
                    <div key={disability}>
                      <label className="flex items-center space-x-2">
                        <RadioGroupItem value={disability} />
                        <span>{disability}</span>
                      </label>
                      <p className="ml-6">{secondaryDisabilitySkips[index]}</p>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conditional questions based on primaryDisability selection */}
        {form.watch("primaryDisability") && (
          <DisabilityFormSection
            disability={form.watch("primaryDisability")}
            type="primary"
            control={form.control}
            fieldName={`${form.watch("primaryDisability").toLowerCase().replace(/\s/g, '')}FormStatus`}
          />
        )}

        {/* Conditional questions based on secondaryDisability selection */}
        {form.watch("secondaryDisability") && (
          <DisabilityFormSection
            disability={form.watch("secondaryDisability")}
            type="secondary"
            control={form.control}
            fieldName={`secondary${form.watch("secondaryDisability").toLowerCase().replace(/\s/g, '')}FormStatus`}
          />
        )}

        {/* Part 2: Personal Information */}
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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

        {/* Continue with the rest of Part 2 fields as shown */}
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
    </Form>
  );
}

export default IntakeForm;
