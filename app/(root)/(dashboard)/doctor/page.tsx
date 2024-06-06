"use client";

import React from "react";
import Navbar from "@/components/Navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";
import AccessibilityForm from "@/components/forms/AccessibilityForm";
import PractitionerForm from "@/components/forms/PractitionerForm";
import AssessmentHistory from "@/components/forms/AssessmentHistory";
import DisabilityConfirmation from "@/components/forms/DisabilityConfirmation";
import AcademicFunctionForm from "@/components/forms/AcademicFunctionForm";
import RecommendationForm from "@/components/forms/RecommendationForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DoctorDashboard: React.FC = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="dashboard-main">
        <h1>Welcome!</h1>
        <Tabs defaultValue="student" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="practitioner">Practitioner</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <AccessibilityForm />
          </TabsContent>
          <TabsContent value="practitioner">
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
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;
