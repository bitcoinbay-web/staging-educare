"use client"; // This directive is used in Next.js to indicate that the file contains client-side code

import { useState } from 'react'; // Import useState hook
import { currentUser } from "@/lib/auth"; // Import currentUser function

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import AccessibilityForm from "@/components/forms/AccessibilityForm"; // Import AccessibilityForm component
import StudentOSAPForm from "@/components/forms/StudentOSAP"; // Import StudentOSAPForm component
// import BidirectionalConsentForm from "@/components/forms/BidirectionalConsentForm"; // Import BidirectionalConsentForm component
import IntakeForm from "@/components/forms/IntakeForm"; // Import IntakeForm component
import IntroConsentSection from "@/components/forms/IntroConsentSection"; // Import IntroConsentSection component
import StudentDisabilitySection from "@/components/forms/StudentDisabilitySection"; // Import StudentDisabilitySection component
import PersonalInfoSection from "@/components/forms/PersonalInfoSection"; // Import PersonalInfoSection component

const UserProfilePage = () => {
  // State to track the current active tab
  const [currentTab, setCurrentTab] = useState('student');

  // Array of tabs
  const tabs = [
    'student', 
    'studentOSAP', 
    // 'consentForm', 
    'intakeForm', 
    'studentDisability', 
    'personalInfo'
  ];

  // Function to calculate the progress based on the active tab
  const calculateProgress = () => {
    const currentIndex = tabs.indexOf(currentTab);
    return ((currentIndex + 1) / tabs.length) * 100;
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl p-4">
        <div className="w-full">
          <progress
            className="w-full mb-6" // Make the progress bar full width and add margin bottom
            value={calculateProgress()} 
            max={100}
          >
            {calculateProgress()}%
          </progress>
          {/* Tabs component to switch between different forms */}
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
              {/* Tab triggers for each form */}
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="studentOSAP">Student OSAP</TabsTrigger>
              {/* <TabsTrigger value="consentForm">Bidirectional Consent Form</TabsTrigger> */}
              <TabsTrigger value="intakeForm">Intake Form</TabsTrigger>
              <TabsTrigger value="studentDisability">Student Disability</TabsTrigger>
              <TabsTrigger value="personalInfo">Personal Information</TabsTrigger>
            </TabsList>

            {/* Tab content for each form */}
            <TabsContent value="student">
              <AccessibilityForm />
            </TabsContent>
            <TabsContent value="studentOSAP">
              <StudentOSAPForm />
            </TabsContent>    
            {/* <TabsContent value="consentForm">
              <BidirectionalConsentForm />
            </TabsContent>      */}
            <TabsContent value="intakeForm">
              <IntroConsentSection />
            </TabsContent>
            <TabsContent value="studentDisability">
              <StudentDisabilitySection />
            </TabsContent>    
            <TabsContent value="personalInfo">
              <PersonalInfoSection />
            </TabsContent> 
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage; // Export the UserProfilePage component as the default export
