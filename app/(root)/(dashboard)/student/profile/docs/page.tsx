"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileNav from "@/components/user/profile-nav";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MyDocuments = () => {
  const { data: session } = useSession();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (session) {
      fetch(`/api/studentApplications?studentId=${session?.user?.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data?.error) {
            setRequests([]);
          } else {
            setRequests(data);
          }
        })
        .catch((error) =>
          console.error("Error fetching user form data:", error)
        );
    }
  }, [session]);

  const uploadedFiles = [
    {
      formName: "Accessibility Form",
      category: "Accessibility Services",
    },
    {
      formName: "OSAP Disability",
      category: "Financial Services",
    },
    // {
    //   formName: "Other Form",
    //   category: "Miscellaneous",
    //   uploadedOn: "2024-05-15",
    // },
    // Add more objects as needed
  ];

  return (
    <>
      <div className="ml-64 z-0">
        <div className="absolute w-[80%] h-[30%] ml-4 mt-[-80px]">
          <Image
            src="/profile-background.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="relative min-h-screen ml-64 mt-[8rem] flex flex-col items-center z-10">
        <div className="w-[95%] h-[10%]">
          <ProfileNav />
        </div>

        <div className="w-full max-w-5xl mt-5">
          <div>
            <h2 className="font-bold text-2xl mb-4 text-center">
              My Documents
            </h2>
            <div>
              <Tabs defaultValue="account" className="w-[80%]">
                <TabsList>
                  <TabsTrigger value="account">Files</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="">Form Name</TableHead>
                        {/* <TableHead>Category</TableHead> */}
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((file, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {file.formType}
                          </TableCell>
                          <TableCell>{file.category}</TableCell>
                          <TableCell className="text-right">
                            <button className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-sm">
                              <Link
                                href={{
                                  pathname: `/student/profile/docs/${file.id}`,
                                  query: { data: JSON.stringify(file) },
                                }}
                              >
                                View
                              </Link>
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="password">
                  <div className="flex flex-col items-center w-full">
                    <div className="flex space-x-2 w-[100%]">
                      <Card className="flex-1 w-[350px]">
                        <CardHeader>
                          <CardTitle>Accessibility Form</CardTitle>
                          <CardDescription>
                            Upload your filled out Accessibility Form
                          </CardDescription>
                        </CardHeader>
                        <CardFooter></CardFooter>
                      </Card>
                      <Card className="flex-1 w-[350px]">
                        <CardHeader>
                          <CardTitle>Student OSAP Form</CardTitle>
                          <CardDescription>
                            Upload your filled out Student OSAP Form
                          </CardDescription>
                        </CardHeader>
                        <CardFooter></CardFooter>
                      </Card>
                      <Card className="flex-1 w-[350px]">
                        <CardHeader>
                          <CardTitle>
                            Express Registration Option (ERO) Intake Form
                          </CardTitle>
                          <CardDescription>
                            Upload your filled out ERO Intake Form
                          </CardDescription>
                        </CardHeader>
                        <CardFooter></CardFooter>
                      </Card>
                    </div>
                    <Card className="flex-1 w-[350px] mt-6">
                      <CardHeader>
                        <CardTitle>Other Forms</CardTitle>
                        <CardDescription>Upload other files</CardDescription>
                      </CardHeader>
                      <CardFooter></CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyDocuments;
