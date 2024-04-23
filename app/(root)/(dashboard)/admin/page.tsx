"use client";

import React from "react";
import Navbar from "../../../../components/Navbar/navbar";
import Sidebar from "../../../../components/Sidebar/sidebar";
import AccessibilityForm from "@/components/AccessibilityForm";
// import { Button } from "@/components/ui/button";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="dashboard-main">
        <h1>Welcome!</h1>
        <AccessibilityForm />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
