"use client";

import React, { useState } from "react";
import PractitionerDisplay from "@/components/PractitionerOSAP";
import StudentOSAPFormDisplay, {
  StudentOSAPFormData,
} from "@/components/StudentOSAP";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OSAP = () => {
  const [activeTab, setActiveTab] = useState("student");

  const studentData: StudentOSAPFormData = {
    id: "1",
    userId: "user1",
    schoolName: "University of Toronto",
    socialInsuranceNumber: "123-456-789",
    studentNumber: "U1234567",
    oen: "123456789",
    lastName: "Doe",
    firstName: "John",
    dateOfBirth: "2000-01-01",
    address: {
      street: "123 Main St",
      city: "Toronto",
      province: "ON",
      postalCode: "M5J 2N1",
    },
    phoneNumber: "123-456-7890",
    consent: true,
    optionalConsent: false,
    signature: "John Doe",
    signatureDate: "2024-01-01",
    createdAt: "2024-01-01",
    account: "0x1234567890abcdef",
    signedMessage: "Sample signed message",
    status: "pending",
  };

  const practitionerData = {
    id: "1",
    practitionerName: "Dr. John Smith",
    licenseNo: "LIC123456",
    qualified: true,
    specialty: "Cardiology",
    otherSpecialty: "Pediatrics",
    otherSpecialistPhysician: "Dr. Jane Doe",
    userId: "user1",
    createdAt: "2024-01-01",
    updatedAt: "2024-02-01",
    account: "0x1234567890abcdef",
    signedMessage: "Practitioner signed message",
  };

  const osapData = {
    id: "1",
    patient: {
      name: "John Doe",
      age: 22,
    },
    physician: {
      name: "Dr. John Smith",
      licenseNo: "LIC123456",
    },
    disabilityStatus: "Confirmed",
    disabilities: {
      type: ["Visual Impairment", "Hearing Loss"],
    },
    psychoEducationalAssessment: true,
    assessmentDate: "2023-12-01",
    learningDisabilityConfirmed: true,
    mobilityImpacts: {
      impact: ["Walking Difficulty"],
    },
    cognitiveImpacts: {
      impact: ["Memory Issues"],
    },
    signature: "Patient signature",
    signatureDate: "2023-12-02",
    userId: "user2",
    createdAt: "2024-01-02",
    account: "0xabcdef1234567890",
    signedMessage: "OSAP signed message",
  };

  // Function to handle tab switch
  const handleNext = () => {
    setActiveTab("doctor");
  };

  return (
    <>
      <div className="pt-10 pl-20 ml-64 h-full">
        <h1 className="text-2xl font-semibold">Student Request #12334</h1>
        <p className="text-md text-muted-foreground">OSAP Disability Form</p>
        <Tabs value={activeTab} className="w-[400px] mt-5">
          <TabsList>
            <TabsTrigger
              value="student"
              onClick={() => setActiveTab("student")}
            >
              Student
            </TabsTrigger>
            <TabsTrigger value="doctor" onClick={() => setActiveTab("doctor")}>
              Doctor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <StudentOSAPFormDisplay student={studentData} />
            <div className="flex justify-end">
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </TabsContent>
          <TabsContent value="doctor">
            <PractitionerDisplay
              practitionerData={practitionerData}
              osapData={osapData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default OSAP;
