"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaFileAlt, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";

const AdminPage = () => {
  const [requests, setRequests] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `/api/adminFetch?test=${session?.user?.id}`
        );
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    if (status === "authenticated" && session?.user) {
      fetchRequests();
    }
  }, []);

  const getFormPath = (formName) => {
    switch (formName) {
      case "AccessibilityFormData":
        return "accessibility";
      case "StudentOSAPFormData":
        return "osap";
      case "IntakeFormData":
        return "intake";
      case "StudentDisabilitySectionData":
        return "disability";
      case "PersonalInfoSectionData":
        return "personalInfo";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="pt-10 pl-20 ml-64 h-full">
        <p className="text-2xl font-semibold">🔑 Student Requests</p>
        <div className="w-[80%] mt-14">
          <Table>
            <TableCaption>A list of student requests.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Request No</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Student Email</TableHead>
                <TableHead>Forms</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request, i) => {
                const formPath = getFormPath(request.formType);
                return (
                  <TableRow
                    key={request.id}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell className="font-medium">
                      <Link
                        href={`/admin/${request.id}?formType=${formPath}`}
                        className="block w-full h-full"
                      >
                        Request #{i + 1}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/${request.id}?formType=${formPath}`}
                        className="block w-full h-full"
                      >
                        {request.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/${request.id}?formType=${formPath}`}
                        className="block w-full h-full"
                      >
                        {request.email}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/${request.id}?formType=${formPath}`}
                        className="w-full h-full flex items-center"
                      >
                        <FaUser />
                        <FaFileAlt className="ml-1 mr-2" />
                        {request.formType}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/${request.id}?formType=${formPath}`}
                        className="block w-full h-full"
                      >
                        {request.formData.status}
                        </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
