"use client";

import React from "react";
import Navbar from "@/components/Navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";
import AccessibilityForm from "@/components/forms/AccessibilityForm";
import PractitionerForm from "@/components/forms/PractitionerForm";

const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="dashboard-main">
        <h1>Welcome!</h1>
        <AccessibilityForm />
        <PractitionerForm />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
