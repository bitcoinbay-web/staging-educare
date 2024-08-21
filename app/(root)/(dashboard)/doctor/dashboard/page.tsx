"use client"; // This directive is used in Next.js to indicate that the file contains client-side code.

import React, { useEffect } from "react"; // Import React library
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DoctorDashboardTable from "@/components/doctor/DoctorDashboard";

const DoctorDashboard: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchDoctorStatus = async () => {
      try {
        const response = await fetch(
          `/api/practitionerForm?doctorId=${session?.user?.id}`
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
        <h1>Welcome Dr. {session?.user?.name}</h1>
        <DoctorDashboardTable />
      
      </div>
    </div>
  );
};

export default DoctorDashboard;
