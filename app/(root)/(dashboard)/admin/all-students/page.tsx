"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// const students = [
//   {
//     stdNo: 641,
//     name: "Meredith Gray",
//     id: "1012039945",
//     email: "m@tmu.ca",
//     wallet: "0xAd233j5h3jg5btnb3kjhrk32rl2rmr",
//     status: "Pending",
//   },
//   {
//     stdNo: 642,
//     name: "Derek Shepherd",
//     id: "1012039946",
//     email: "d@tmu.ca",
//     wallet: "0x12345j5h3jg5btnb3kjhrk32rl2xyz",
//     status: "Registered",
//   },
//   {
//     stdNo: 643,
//     name: "Cristina Yang",
//     id: "1012039947",
//     email: "c@tmu.ca",
//     wallet: "0x6789j5h3jg5btnb3kjhrk32rl2abc",
//     status: "Approved",
//   },
//   {
//     stdNo: 644,
//     name: "Alex Karev",
//     id: "1012039948",
//     email: "a@tmu.ca",
//     wallet: "0x09876j5h3jg5btnb3kjhrk32rl2def",
//     status: "Rejected",
//   },
//   {
//     stdNo: 645,
//     name: "Izzie Stevens",
//     id: "1012039949",
//     email: "i@tmu.ca",
//     wallet: "0x54321j5h3jg5btnb3kjhrk32rl2ghi",
//     status: "Pending",
//   },
// ];

const AllStudents = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/allStudents`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="pt-10 pl-20 ml-64 h-full">
        <p className="text-2xl font-semibold">🔑 Student List</p>
        <div className="w-[90%] mt-14">
          <Table>
            <TableCaption>A list of all the students.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Std No.</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Email</TableHead>
                <TableHead>Student Wallet</TableHead>
                <TableHead className="text-right">Onboarding Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((student, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/all-students/${student.id}`}>
                      Std #{index + 1}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/all-students/${student.id}`}>
                      {student.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/all-students/${student.id}`}>
                      {student.stdID}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/all-students/${student.id}`}>
                      {student.email}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/all-students/${student.id}`}>
                      {student.walletID}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/all-students/${student.id}`}>
                      {student.onboarding}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AllStudents;
