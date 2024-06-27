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


const UserProfilePage = async () => {
  const user = await currentUser();
  return (
    <>
      
       
      <div className="dashboard-main">
        <Tabs defaultValue="student" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="studentOSAP">Student OSAP</TabsTrigger>
            <TabsTrigger value="consentForm">Bidirectional Consent Form</TabsTrigger>
            <TabsTrigger value="intakeForm">Intake Form</TabsTrigger>
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
            <IntakeForm />
          </TabsContent>     
        </Tabs>
      </div>
      {/* <div className="pt-10 pl-20 ml-64 h-full">
        <UserInfo label="💻 User Information" user={user} />
      </div> */}
    </>
  );
};

export default UserProfilePage;
