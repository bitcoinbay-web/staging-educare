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
import { useSession } from "next-auth/react";
import { useAccount, useSignMessage } from "wagmi";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const usePersistentFormState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = sessionStorage.getItem(key);
      return savedState ? JSON.parse(savedState) : defaultValue;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify(state));
    }
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

export const formSchema = z.object({
  studentName: z.string().min(2).max(50),
  studentId: z.string().regex(/^[a-zA-Z0-9]+$/),
  phoneNumber: z.string(),
  email: z.string().email(),
  consent: z.boolean(),
  authorize: z.boolean(),
  selectedDoctor: z.string(),
  doctorName: z.string().optional(),
  doctorEmail: z.string().optional(),
});

const AccessibilityForm: React.FC = () => {
  const { data: signedData, signMessage, isError } = useSignMessage();
  const { data: session, status } = useSession();
  const account = useAccount();
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [savedValues, setSavedValues] = usePersistentFormState(
    "accessibilityForm",
    {
      studentName: "",
      studentId: "",
      phoneNumber: "",
      email: "",
      consent: true,
      authorize: true,
      selectedDoctor: "",
      doctorName: "",
      doctorEmail: "",
    }
  );

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`/api/allDoctors?test=idk`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    if (status === "authenticated" && session?.user) {
      fetchDoctors();
    }
  }, [status, session?.user]);

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
  }, [dialogValues, form]);

  const handleDialogSave = () => {
    setSavedValues((prevValues) => ({
      ...prevValues,
      consent: dialogValues.consent,
      authorize: dialogValues.authorize,
    }));
    setIsDialogOpen(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log("Form submitted with values:", values);

    if (values.authorize !== true || values.consent !== true) {
      alert("You must give consent and authorization to proceed");
      setIsDialogOpen(true);
      setIsSubmitting(false);
      return;
    }

    if (values.selectedDoctor === "other") {
      if (values.doctorName === "" || values.doctorEmail === "") {
        alert("You must provide the doctor's name and email!");
        setIsSubmitting(false);
        return;
      }
    } else if (values.selectedDoctor === "") {
      alert("You need to select a doctor or enter their details");
      setIsSubmitting(false);
      return;
    }

    const jsonString = JSON.stringify(values);
    console.log("JSON stringified form data for signing:", jsonString);

    console.log("Attempting to sign the message...");
    signMessage({
      message: jsonString,
      account: account.address,
    });
  };

  useEffect(() => {
    if (isError) {
      console.error("Error occurred during message signing");
      alert("Failed to sign the message. Please try again.");
      setIsSubmitting(false);
    }

    if (signedData) {
      console.log("Message signed successfully:", signedData);

      const userId = session?.user?.id || "";
      const formData = {
        ...form.getValues(), // Assuming form.getValues() gets the current form state
        userId,
        account: account.address,
        signedMessage: signedData,
      };

      // Save form data to sessionStorage
      setSavedValues(formData);
      console.log("Form data saved to session storage:", formData);

      const submitForm = async () => {
        try {
          const response = await fetch("/api/accessibilityForm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const result = await response.json();
          if (response.ok) {
            console.log("Form submitted successfully:", result);
            setSuccess("Form submitted successfully!");
            setIsSubmitting(false);
          } else {
            console.error("Failed to submit form:", result);
            setError("Failed to submit form.");
            setIsSubmitting(false);
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          setError("An unexpected error occurred. Please try again later.");
          setIsSubmitting(false);
        }
      };

      submitForm();
    }
  }, [signedData, isError, form, account.address, session?.user?.id]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormItem>
            <div className="text-base">
              <FormLabel>Accessibility Form</FormLabel>
              <FormDescription>
                SECTION A: INFORMATION FOR STUDENTS Academic Accommodation
                Support (AAS) at Toronto Metropolitan University (“TMU”,
                formerly Ryerson University) uses this form to confirm that you
                have a disability and to understand how your disability impacts
                your studies. Section B of this form must be completed by a
                provincially regulated and registered health care practitioner
                licensed to diagnose the condition (eg. family physician,
                medical specialist, clinical psychologist, etc.)1. Once
                completed, visit the AAS registration webpage 2, select your
                preferred registration option, and upload this document through
                the online Intake Form. You must submit the Intake Form and this
                documentation to proceed with registration.
              </FormDescription>
            </div>
            <FormMessage />
          </FormItem>
          {studentInfo.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name={item.id}
              render={({ field }) => (
                <FormItem
                  key={item.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormLabel>{item.label}: </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>OPTIONAL: Release of Information</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Release of Information</DialogTitle>
              <DialogDescription>
                1. You are not required to disclose a specific mental health
                diagnosis, but confirmation of the presence of a disability, the
                disability type (i.e. mental health), and the specific
                functional limitations must be provided. If you consent to
                sharing your diagnosis, this information is kept confidential in
                accordance with the university’s Information Protection and
                Access Policy. Diagnosis for all other disability types is
                required. If applicable, I consent to my health care provider
                identifying my mental health diagnosis:
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
                          setDialogValues((prev) => ({
                            ...prev,
                            consent: value === "true",
                          }))
                        }
                        value={dialogValues.consent ? "true" : "false"}
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
                2. I hereby authorize authority for Academic Accommodation
                Support (AAS) to communicate with the below named health care
                professional(s) to supply additional information relating to the
                provision of my academic accommodations and disability-related
                services:
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
                          setDialogValues((prev) => ({
                            ...prev,
                            authorize: value === "true",
                          }))
                        }
                        value={dialogValues.authorize ? "true" : "false"}
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
            <p>
              AAS considers this permission valid for as long as you are a
              student at Toronto Metropolitan University or if you revoke your
              consent in writing, whichever comes first.
            </p>
            <li>
              {" "}
              1 Providing false information or altering this form is a violation
              of Senate Policy 60: Student Code of Academic Conduct.{" "}
            </li>
            <li>2 https://www.torontomu.ca/accommodations/registration</li>
          </div>
          <div>
            Why is this information required? To receive reasonable and
            appropriate accommodations and support from AAS, students must
            “communicate their needs in sufficient detail and co-operate in
            consultations to enable the person responsible for accommodation to
            respond to the request.” (Ontario Human Rights Code Guidelines,
            1994, p.17). The Ontario Human Rights Commission’s Guidelines (1994)
            also state that the university, as the body responsible for
            accommodating, must have sufficient information “to properly assess
            the impact of the disability on the specific academic task and know
            how to make the requested accommodation.” Protection of privacy In
            accordance with Section 39(2) of the Freedom of Information and
            Protection of Privacy Act, 1990 (“FIPPA”), the information on this
            form is collected under the authority of the Ryerson University Act,
            1977 for the purpose of providing reasonable and appropriate
            academic accommodations and supports for students with disabilities.
            Personal information and personal health information that is
            collected for this purpose or for a consistent purpose, will be
            used, disclosed, retained and destroyed in accordance with
            university’s Information Protection and Access Policy and Records
            Management Policy. A student’s personal health information is kept
            confidential within AAS and is only disclosed on a need-to-know
            basis or otherwise in accordance with applicable law. If you have
            questions about the collection, use and disclosure of this
            information by TMU, contact Academic Accommodation Support:
            416-979-5290, aasintake1@torontomu.ca.
          </div>
          <FormItem>
            <FormLabel htmlFor="selectedDoctor">Select Doctor **:</FormLabel>
            <FormControl>
              <select
                id="selectedDoctor"
                {...form.register("selectedDoctor")}
                className="form-select border-2 m-2"
                onChange={(e) => {
                  if (e.target.value === "other") {
                    setIsOtherSelected(true);
                  } else {
                    setIsOtherSelected(false);
                  }
                }}
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor: { id: string; name: string }) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
                <option value="other">other</option>
              </select>
            </FormControl>
          </FormItem>

          {isOtherSelected && (
            <>
              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormLabel>Doctor Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter doctor name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="doctorEmail"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormLabel>Doctor Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter doctor email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
        {signedData && (
          <div>
            <h3>Signed Data:</h3>
            <pre>{JSON.stringify(signedData, null, 2)}</pre>
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
      </Form>
    </>
  );
};

export default AccessibilityForm;
