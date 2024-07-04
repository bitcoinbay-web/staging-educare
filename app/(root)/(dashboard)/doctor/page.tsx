"use client"; // This directive is used in Next.js to indicate that the file contains client-side code.

import React, { useState, useEffect } from "react"; // Import React and necessary hooks
import Navbar from "@/components/Navbar/navbar"; // Import Navbar component
import Sidebar from "@/components/Sidebar/sidebar"; // Import Sidebar component
// import AccessibilityForm from "@/components/forms/AccessibilityForm"; // Import AccessibilityForm component (commented out)
import PractitionerForm from "@/components/forms/PractitionerForm"; // Import PractitionerForm component
import AssessmentHistory from "@/components/forms/AssessmentHistory"; // Import AssessmentHistory component
import DisabilityConfirmation from "@/components/forms/DisabilityConfirmation"; // Import DisabilityConfirmation component
import AcademicFunctionForm from "@/components/forms/AcademicFunctionForm"; // Import AcademicFunctionForm component
import RecommendationForm from "@/components/forms/RecommendationForm"; // Import RecommendationForm component
// import StudentOSAP from "@/components/forms/StudentOSAP"; // Import StudentOSAP component (commented out)
import OSAPDisabilityConfirmation from "@/components/forms/OSAPDisabilityConfirmation"; // Import OSAPDisabilityConfirmation component

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import HealthPractitionerForm from "@/components/forms/HealthPractitionerForm";

// DoctorDashboard component
const DoctorDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('practitioner');
  const tabs = ['practitioner', 'onboarding', 'history', 'confirmation', 'academic', 'recommendation', 'osapDisabiity'];

  // Function to calculate the progress based on the active tab
  const calculateProgress = () => {
    const currentIndex = tabs.indexOf(currentTab);
    return ((currentIndex + 1) / tabs.length) * 100;
  };

  // Recalculate progress whenever the current tab changes
  useEffect(() => {
    calculateProgress();
  }, [currentTab]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl p-4">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-6">Welcome!</h1>
          <progress 
            className="w-full mb-6" // Make the progress bar full width and add margin bottom
            value={calculateProgress()} 
            max={100}
          >
            {calculateProgress()}%
          </progress>
          {/* Tabs component to switch between different forms */}
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 mb-6">
              {/* Tab triggers for each form */}
              <TabsTrigger value="practitioner">Practitioner</TabsTrigger>
              <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
              {/* <TabsTrigger value="studentOSAP">Student OSAP</TabsTrigger> */}
              <TabsTrigger value="osapDisabiity">Disability Verification OSAP</TabsTrigger>
            </TabsList>

            {/* Tab content for each form */}
            <TabsContent value="practitioner">
              <PractitionerForm />
            </TabsContent>
            <TabsContent value="onboarding">
              <HealthPractitionerForm />
            </TabsContent>
            <TabsContent value="history">
              <AssessmentHistory />
            </TabsContent>
            <TabsContent value="confirmation">
              <DisabilityConfirmation />
            </TabsContent>
            <TabsContent value="academic">
              <AcademicFunctionForm />
            </TabsContent>
            <TabsContent value="recommendation">
              <RecommendationForm />
            </TabsContent>
            <TabsContent value="osapDisabiity">
              <OSAPDisabilityConfirmation />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard; // Export the DoctorDashboard component as the default export
