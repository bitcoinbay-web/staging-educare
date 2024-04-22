"use client";
import React from "react";
import "@/app/globals.css";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar-main">
      <div className="sidebar-links">
        <Link href="/studentdashboard">Home</Link>
      </div>
      <div className="sidebar-links">
        <Link href="/studentdashboard/services">Services</Link>
      </div>
      <div className="sidebar-links">
        <Link href="/studentdashboard/profile">Profile</Link>
      </div>
      <div className="sidebar-links">
        <Link href="/login">Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
