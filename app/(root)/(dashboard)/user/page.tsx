// "use client";

import Navbar from "@/components/Navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";

// import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";

import { UserInfo } from "@/components/user/user-info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AccessibilityForm from "@/components/forms/AccessibilityForm";
import StudentOSAPForm from "@/components/forms/StudentOSAP"
import BidirectionalConsentForm from "@/components/forms/BidirectionalConsentForm";
import IntakeForm from "@/components/forms/IntakeForm";
import IntroConsentSection from "@/components/forms/IntroConsentSection";
import StudentDisabilitySection from "@/components/forms/StudentDisabilitySection";
import PersonalInfoSection from "@/components/forms/PersonalInfoSection";

const UserProfilePage = async () => {
  const user = await currentUser();
  return (
    <>       
      <div className="dashboard-main">
        <Tabs defaultValue="student" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="studentOSAP">Student OSAP</TabsTrigger>
            <TabsTrigger value="consentForm">Bidirectional Consent Form</TabsTrigger>
            <TabsTrigger value="intakeForm">Intake Form</TabsTrigger>
            <TabsTrigger value="studentDisability">Studdent Disability</TabsTrigger>
            <TabsTrigger value="personalInfo">Personal Information</TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <AccessibilityForm />
          </TabsContent>
          <TabsContent value="studentOSAP">
            <StudentOSAPForm />
          </TabsContent>    
          <TabsContent value="consentForm">
            <BidirectionalConsentForm />
          </TabsContent>     
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
    </>
  );
};

export default UserProfilePage;
