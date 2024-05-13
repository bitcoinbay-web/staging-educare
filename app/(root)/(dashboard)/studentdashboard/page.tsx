"use client";

import React from "react";
import Navbar from "../../../../components/Navbar/navbar";
import Sidebar from "../../../../components/Sidebar/sidebar";
import { Button } from "@/components/ui/button";

import { Service, columns } from "./services/columns";
import { DataTable } from "./services/data-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// async Promise<>
function getData(): Service[] {
  // Fetch data from API here.
  return [
    {
      id: "728ed52f",
      name: "Tutoring and Learning Services",
      status: "pending",
      stdID: "101502209",
    },
    {
      id: "728ed52f",
      name: "Tutoring and Learning Services",
      status: "pending",
      stdID: "101502209",
    },
    {
      id: "728ed52f",
      name: "Tutoring and Learning Services",
      status: "pending",
      stdID: "101502209",
    },
    {
      id: "728ed52f",
      name: "Tutoring and Learning Services",
      status: "pending",
      stdID: "101502209",
    },
    {
      id: "728ed52f",
      name: "Tutoring and Learning Services",
      status: "pending",
      stdID: "101502209",
    },
    {
      id: "728ed52f",
      name: "Tutoring and Learning Services",
      status: "pending",
      stdID: "101502209",
    },
    {
      id: "728ed52f",
      name: "Tutoring and Learning Services",
      status: "pending",
      stdID: "101502209",
    },
    {
      id: "728ed52f",
      name: "Tutoring and Learning Services",
      status: "pending",
      stdID: "101502209",
    },
    {
      id: "728ed52f",
      name: "Tutoring and Learning Services",
      status: "pending",
      stdID: "101502209",
    },
    {
      id: "728ed52f",
      name: "Tutoring and Learning Services",
      status: "pending",
      stdID: "101502209",
    },
    {
      id: "728ed52f",
      name: "Tutoring and Learning Services",
      status: "pending",
      stdID: "101502209",
    },
    {
      id: "728ed52f",
      name: "Tutoring and Learning Services",
      status: "pending",
      stdID: "101502209",
    },

    // ...
  ];
}

const StudentDashboardPage: React.FC = () => {
  const data = getData();
  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="pt-10 pl-20 ml-64 h-full">
        <h1 className="font-bold text-2xl mb-4">Welcome!</h1>
        <div className="cards">
          <div className="card-1">
            <Card>
              <CardHeader>
                <CardTitle>Acessibility Services Form</CardTitle>
                <CardDescription>
                  Fill the form to access services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Edit Form</Button>
              </CardContent>
              <CardFooter>
                <p>Pending</p>
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
                <Button>Edit Form</Button>
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

      {/* <Button variant="outline">Button</Button> */}
    </div>
  );
};

export default StudentDashboardPage;
