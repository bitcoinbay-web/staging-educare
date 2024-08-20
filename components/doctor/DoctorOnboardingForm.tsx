"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignMessage, useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const DoctorOnboardingForm: React.FC<{}> = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    emailAddress: "",
    phoneNumber: "",
    healthCarePractitionerType: "",
    licenseNumber: "",
    acceptingNewClients: "",
    languages: [],
    appointmentTypes: [],
    servicesProvided: [],
    businessName: "",
    businessWebsite: "",
    businessAddress: "",
    bookingEmailAddress: "",
    bookingPhoneNumber: "",
    onlineBookingURL: "",
    faxNumber: "",
    bio: "",
  });

  const { data, signMessage } = useSignMessage();
  const account = useAccount();
  const { data: session } = useSession();

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelectChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: prevFormData[name].includes(value)
        ? prevFormData[name].filter((v) => v !== value)
        : [...prevFormData[name], value],
    }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const jsonString = JSON.stringify(formData);
    sessionStorage.setItem("healthPractitionerFormValues", jsonString);
    signMessage({
      message: jsonString,
      account: account.address,
    });

    const userId = session?.user?.id;
    const dataToSubmit = {
      ...formData,
      userId,
      account: account.address,
      signedMessage: data,
    };

    console.log(dataToSubmit);

    try {
      const response = await fetch("/api/healthPractitionerForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Form submitted successfully:", result);
        router.push("/doctor/dashboard");
      } else {
        console.error("Failed to submit form:", result);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  return (
    <form onSubmit={onSubmitForm} className="space-y-8">
      {currentStep === 1 && (
        <div className="">
          <div>
            <h2 className="text-center mb-6">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* <div>
                <label>First Name *</label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Last Name *</label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div> */}
              <div>
                <label>Email Address *</label>
                <Input
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="">Gender *</label>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Input
                      name="gender"
                      value={formData.gender || "Select Gender"}
                      readOnly
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {["Male", "Female", "Other"].map((gender) => (
                      <DropdownMenuItem
                        key={gender}
                        onSelect={() =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            gender,
                          }))
                        }
                      >
                        {gender}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <label>Phone Number *</label>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Type of Health Care Practitioner *</label>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Input
                      name="healthCarePractitionerType"
                      value={
                        formData.healthCarePractitionerType || "Select Type"
                      }
                      readOnly
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {[
                      "Family Physician",
                      "Psychologist",
                      "Psychiatrist",
                      "Other Specialist Physician",
                      "Other",
                    ].map((type) => (
                      <DropdownMenuItem
                        key={type}
                        onSelect={() =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            healthCarePractitionerType: type,
                          }))
                        }
                      >
                        {type}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {(formData.healthCarePractitionerType ===
                "Other Specialist Physician" ||
                formData.healthCarePractitionerType === "Other") && (
                <div>
                  <label>Please specify *</label>
                  <Input
                    name="healthCarePractitionerType"
                    value={formData.healthCarePractitionerType}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className="">
          <div>
            <h2 className="text-center mb-6">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>License Number *</label>
                <Input
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Are you accepting new clients? *</label>
                <RadioGroup
                  name="acceptingNewClients"
                  onValueChange={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      acceptingNewClients: value,
                    }))
                  }
                  value={formData.acceptingNewClients}
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
              </div>
              <div>
                <label>What appointment types are you offering? *</label>
                <div className="space-y-2">
                  {["In Person", "Telephone", "Video"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.appointmentTypes.includes(type)}
                        onCheckedChange={(checked) =>
                          handleMultiSelectChange("appointmentTypes", type)
                        }
                      />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label>
                  Please list the forms you are currently able to complete for
                  students *
                </label>
                <div className="space-y-2">
                  {["Accessibility Form", "Disability Verification Form"].map(
                    (service) => (
                      <div
                        key={service}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={formData.servicesProvided.includes(service)}
                          onCheckedChange={(checked) =>
                            handleMultiSelectChange("servicesProvided", service)
                          }
                        />
                        <span>{service}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div>
                <label>Languages Offered *</label>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Input
                      name="languages"
                      value={
                        formData.languages.length > 0
                          ? formData.languages.join(", ")
                          : "Select Languages"
                      }
                      readOnly
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {["English", "French", "Spanish", "Chinese", "Other"].map(
                      (language) => (
                        <DropdownMenuItem
                          key={language}
                          onSelect={() =>
                            handleMultiSelectChange("languages", language)
                          }
                        >
                          {language}
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <label>Business Name</label>
                <Input
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="">
          <div>
            <h2 className="text-center mb-6">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Business Website</label>
                <Input
                  name="businessWebsite"
                  value={formData.businessWebsite}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Business Address</label>
                <Input
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Booking Email Address</label>
                <Input
                  name="bookingEmailAddress"
                  value={formData.bookingEmailAddress}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Booking Phone Number</label>
                <Input
                  name="bookingPhoneNumber"
                  value={formData.bookingPhoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Online Booking URL</label>
                <Input
                  name="onlineBookingURL"
                  value={formData.onlineBookingURL}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Fax Number</label>
                <Input
                  name="faxNumber"
                  value={formData.faxNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Short Bio</label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        {currentStep > 1 && (
          <Button type="button" onClick={prevStep}>
            Previous
          </Button>
        )}
        {currentStep < 3 && (
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        )}
        {currentStep === 3 && <Button type="submit">Submit</Button>}
      </div>
      {data && (
        <div>
          <h3>Signed Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </form>
  );
};

export default DoctorOnboardingForm;
