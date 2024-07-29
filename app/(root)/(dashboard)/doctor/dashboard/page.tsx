"use client"; // This directive is used in Next.js to indicate that the file contains client-side code.

import React, { useEffect } from "react"; // Import React library
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
import DoctorDashboardTable from "@/components/doctor/DoctorDashboard";

// DoctorDashboard component
const DoctorDashboard: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchDoctorStatus = async () => {
      try {
        const response = await fetch(
          `/api/practitionerform?doctorId=${session?.user?.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.hasFilledPractitionerForm === false) {
          router.push("/register/doctor/onboarding");
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctorStatus();
  }, [router, session?.user?.id]);

  return (
    <div>
      <div className="dashboard-main">
        <h1>Welcome Dr. {session.user.name}</h1>
        <DoctorDashboardTable />
        {/* Tabs component to switch between different forms */}
        {/* <Tabs defaultValue="practitioner" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-5"> */}
        {/* Tab triggers for each form */}
        {/* <TabsTrigger value="practitioner">Practitioner</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
            {/* <TabsTrigger value="studentOSAP">Student OSAP</TabsTrigger> */}
        {/* <TabsTrigger value="osapDisabiity">Disability Verification OSAP</TabsTrigger>
          </TabsList> */}

        {/* Tab content for each form */}
        {/* <TabsContent value="practitioner">
            <PractitionerForm />
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
        </Tabs> */}
      </div>
    </div>
  );
};

export default DoctorDashboard; // Export the DoctorDashboard component as the default export
