// app/(root)/(dashboard)/admin/page.tsx
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { admin } from "@/lib/actions/admin";
import { UserRole } from "@prisma/client";
import SafeMint from "@/components/WagmiSafeMint";
import WagmiWriteContractComponent from "@/components/WagmiWriteContractComponent";
import AdminFormData from "@/components/AdminFormData";

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

const AdminPage = () => {
  const onServerClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  const onApiRouteClick = () => [
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route");
      } else {
        toast.error("Forbidden API Route");
      }
    }),
  ];

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

  // const role = useCurrentRole();
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
                <TableHead>Forms</TableHead>
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
                      href={`/admin/${request.id}`}
                      className="block w-full h-full"
                    >
                      Request #{request.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/${request.id}`}
                      className="block w-full h-full"
                    >
                      {request.studentName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/${request.id}`}
                      className="w-full h-full flex items-center"
                    >
                      <FaUser />
                      <FaFileAlt className="ml-2" />
                    </Link>
                  </TableCell>

                  <TableCell className="text-right">
                    <Link
                      href={`/admin/${request.id}`}
                      className="block w-full h-full"
                    >
                      {" "}
                      {request.status}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* Current Role: ${role} */}
        <SafeMint />
        <WagmiWriteContractComponent />
        <AdminFormData /> {/* Include the new component */}
      </div>
    </div>
  );
};

export default AdminPage;

//  <Card className="w-[600px]">
//    <CardHeader></CardHeader>
//    <CardContent className="space-y-4">
//      {/* <RoleGate allowedRole={UserRole.ADMIN}>
//               <FormSuccess message="You are allowed to see this content" />
//             </RoleGate>
//             <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
//               <p className="text-sm font-medium">Admin-only API Route</p>
//               <Button onClick={onApiRouteClick}>Click to test</Button>
//             </div>
//             <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
//               <p className="text-sm font-medium">Admin-only Server Action</p>
//               <Button onClick={onServerClick}>Click to test</Button>
//             </div> */}
//    </CardContent>
//  </Card>;
