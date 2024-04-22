"use client";

import React from "react";
import Navbar from "../../../../../components/Navbar/navbar";
import Sidebar from "../../../../../components/Sidebar/sidebar";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

const ServicesPage: React.FC = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="dashboard-main">
        <h1>Services</h1>
        <div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">
              Tutoring Services
            </h4>
            <p className="text-sm text-muted-foreground">
              Get peer mentors to assist you in your academics
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Learn More</div>
            <Separator orientation="vertical" />
            <div>Get Started</div>
            <Separator orientation="vertical" />
            <div>Book an Appointment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
