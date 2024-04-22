"use client";

import React from "react";
import Navbar from "../../../../components/Navbar/navbar";
import Sidebar from "../../../../components/Sidebar/sidebar";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="dashboard-main">
        <h1>Welcome!</h1>
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
        </div>
      </div>
      {/* <Button variant="outline">Button</Button> */}
    </div>
  );
};

export default AdminDashboardPage;
