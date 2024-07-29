"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react"; // Import useSession

import { Service, columns } from "../services/columns";
import { DataTable } from "../services/data-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Modify getData to accept token
async function getData(token: string): Promise<Service[]> {
  // Fetch data from API here using the token for authentication
  const response = await fetch("/api/data", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

const StudentDashboardPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = React.useState<Service[]>([]);
  const [formStatus, setFormStatus] = React.useState<string>("Pending");

  React.useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const form1Status = session?.user?.form1;
      if (form1Status) {
        setFormStatus("Completed");
      }
    }
  }, [status, session]);

  const handleUserRedirect = () => {
    router.push("/student/user");
  };

  const handleDoctorRedirect = () => {
    router.push("/student/user");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You need to be authenticated to view this page.</div>;
  }

  return (
    <div>
      <div className="pt-10 pl-20 ml-64 h-full">
        <h1 className="font-bold text-2xl mb-4">Welcome!</h1>
        <div className="cards">
          <div className="card-1">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Services Form</CardTitle>
                <CardDescription>
                  Fill the form to access services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleUserRedirect}>Edit Form</Button>
              </CardContent>
              <CardFooter>
                <p>{formStatus}</p> {/* Dynamically display the status */}
              </CardFooter>
            </Card>
          </div>
          <div className="card-2">
            <Card>
              <CardHeader>
                <CardTitle>Financial Resources Form</CardTitle>
                <CardDescription>
                  Fill the form to access services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleDoctorRedirect}>Edit Form</Button>
              </CardContent>
              <CardFooter>
                <p>Awaiting Approval</p>
              </CardFooter>
            </Card>
          </div>
          <div className="services-table">
            <h1 className="font-bold text-2xl mb-4">Recent Services</h1>
            <div className="container mx-auto py-5">
              <div className="bg-white rounded-lg">
                <DataTable columns={columns} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
