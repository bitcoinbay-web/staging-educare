import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";

import { FaUser } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

const DoctorDashboardTable = () => {
  const requests = [
    {
      id: 1,
      studentName: "John Doe",
      status: "Approved",
    },
    {
      id: 2,
      studentName: "Jane Doe",
      status: "Pending",
    },
    // Add more requests as needed
  ];
  return (
    <>
      <div className="w-[80%]">
        <Table>
          <TableCaption>A list of recent requests.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Request No</TableHead>
              <TableHead>Files</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request.id}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell className="font-medium">
                  <Link
                    href={`/doctor/${request.id}`}
                    className="block w-full h-full"
                  >
                    Request #{request.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/doctor/${request.id}`}
                    className="flex w-full h-full items-center"
                  >
                    <FaUser />
                    <FaFileAlt className="ml-2" />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/doctor/${request.id}`}
                    className="block w-full h-full"
                  >
                    {request.studentName}
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/doctor/${request.id}`}
                    className="block w-full h-full"
                  >
                    {request.status}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default DoctorDashboardTable;

//  <div className="flex items-center">
//     {" "}
//     <FaUser />
//     <FaFileAlt className="ml-2" />
//   </div>
