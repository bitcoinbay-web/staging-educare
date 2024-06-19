"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useAccount, useSignMessage } from "wagmi";
import { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Custom hook to handle form state persistence
const usePersistentFormState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const savedState = sessionStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

const studentInfo = [
  {
    id: "studentName",
    label: "Name",
  },
  {
    id: "studentId",
    label: "Student Id",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
  },
  {
    id: "email",
    label: "Email",
  },
] as const;

const consentInfo = [
  {
    id: "consent",
    label: "Share Consent",
  },
  {
    id: "authorize",
    label: "Authorize Communication",
  },
] as const;

const formSchema = z.object({
  studentName: z.string().min(2).max(50),
  studentId: z.coerce.number().nonnegative(),
  phoneNumber: z.coerce.number().nonnegative(),
  email: z.string().email(),
  consent: z.enum(["true", "false"]).transform((value) => value === "true"),
  authorize: z.enum(["true", "false"]).transform((value) => value === "true"),
});

const AccessibilityForm: React.FC = () => {
  const { data, signMessage } = useSignMessage();
  const account = useAccount();

  const [savedValues, setSavedValues] = usePersistentFormState("accessibilityForm", {
    studentName: "",
    studentId: "",
    phoneNumber: "",
    email: "",
    consent: "false",
    authorize: "false",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: savedValues,
  });

  const [dialogValues, setDialogValues] = usePersistentFormState("dialogForm", {
    consent: savedValues.consent,
    authorize: savedValues.authorize,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    form.setValue("consent", dialogValues.consent);
    form.setValue("authorize", dialogValues.authorize);
  }, [dialogValues]);

  const handleDialogSave = () => {
    setSavedValues((prevValues) => ({
      ...prevValues,
      consent: dialogValues.consent,
      authorize: dialogValues.authorize,
    }));
    setIsDialogOpen(false);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const jsonString = JSON.stringify(values);
    signMessage({
      message: jsonString,
      account: account.address,
    });
    console.log(JSON.stringify(values, null, 2));
    setSavedValues(values); // Save values to sessionStorage
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormItem>
            <div className="text-base">
              <FormLabel>Accessibility Form</FormLabel>
              <FormDescription>
                SECTION A: INFORMATION FOR STUDENTS Academic Accommodation Support (AAS) at Toronto Metropolitan
                University (“TMU”, formerly Ryerson University) uses this form to confirm that you have a disability and to
                understand how your disability impacts your studies. Section B of this form must be completed by a
                provincially regulated and registered health care practitioner licensed to diagnose the condition (eg. family
                physician, medical specialist, clinical psychologist, etc.)1. Once completed, visit the AAS registration webpage 2,
                select your preferred registration option, and upload this document through the online Intake Form. You must
                submit the Intake Form and this documentation to proceed with registration.
              </FormDescription>
            </div>
            <FormMessage />
          </FormItem>
          {studentInfo.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name={item.id}
              render={({ field }) => {
                return (
                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                    <FormLabel>{item.label}: </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>OPTIONAL: Release of Information</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Release of Information</DialogTitle>
              <DialogDescription>
                1. You are not required to disclose a specific mental health diagnosis, but confirmation of the presence of a
                disability, the disability type (i.e. mental health), and the specific functional limitations must be provided. If you
                consent to sharing your diagnosis, this information is kept confidential in accordance with the university’s
                Information Protection and Access Policy. Diagnosis for all other disability types is required. If applicable, I consent
                to my health care provider identifying my mental health diagnosis:
              </DialogDescription>
              <FormField
                control={form.control}
                name={consentInfo[0].id}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormLabel>{consentInfo[0].label}: </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          setDialogValues((prev) => ({ ...prev, consent: value }))
                        }
                        value={dialogValues.consent}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogDescription>
                2. I hereby authorize authority for Academic Accommodation Support (AAS) to communicate with the below named health care professional(s) to supply additional information relating to the provision of my academic accommodations and disability-related services:
              </DialogDescription>
              <FormField
                control={form.control}
                name={consentInfo[1].id}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormLabel>{consentInfo[1].label}: </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          setDialogValues((prev) => ({ ...prev, authorize: value }))
                        }
                        value={dialogValues.authorize}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button onClick={handleDialogSave}>Save</Button>
            </DialogContent>
          </Dialog>
          <div>
            AAS considers this permission valid for as long as you are a student at Toronto Metropolitan University or if you revoke
            your consent in writing, whichever comes first. 1 Providing false information or altering this form is a violation of
            Senate Policy 60: Student Code of Academic Conduct. 2 https://www.torontomu.ca/accommodations/registration
          </div>
          <div>
            Why is this information required? To receive reasonable and appropriate accommodations and support from AAS,
            students must “communicate their needs in sufficient detail and co-operate in consultations to enable the person
            responsible for accommodation to respond to the request.” (Ontario Human Rights Code Guidelines, 1994, p.17). The
            Ontario Human Rights Commission’s Guidelines (1994) also state that the university, as the body responsible for
            accommodating, must have sufficient information “to properly assess the impact of the disability on the specific
            academic task and know how to make the requested accommodation.” Protection of privacy In accordance with Section
            39(2) of the Freedom of Information and Protection of Privacy Act, 1990 (“FIPPA”), the information on this form is
            collected under the authority of the Ryerson University Act, 1977 for the purpose of providing reasonable and
            appropriate academic accommodations and supports for students with disabilities. Personal information and personal
            health information that is collected for this purpose or for a consistent purpose, will be used, disclosed, retained and
            destroyed in accordance with university’s Information Protection and Access Policy and Records Management Policy. A
            student’s personal health information is kept confidential within AAS and is only disclosed on a need-to-know basis or
            otherwise in accordance with applicable law. If you have questions about the collection, use and disclosure of this
            information by TMU, contact Academic Accommodation Support: 416-979-5290, aasintake1@torontomu.ca.
          </div>
          <Button type="submit">Submit</Button>
        </form>
        {data && (
          <div>
            <h3>Signed Data:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </Form>
    </>
  );
};

export default AccessibilityForm;
