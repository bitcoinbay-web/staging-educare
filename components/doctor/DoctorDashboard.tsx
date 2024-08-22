import { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";

const DoctorDashboardTable = () => {
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (session) {
      fetch(`/api/applications?doctorId=${session?.user?.id}`)
        .then((response) => response.json())
        .then((data) =>{
          if(data?.error){
            setRequests([])
          }else{
            setRequests(data)
          }
        })
        .catch((error) =>
          console.error("Error fetching user form data:", error)
        );
    }
  }, [session]);

  return (
    <div className="w-[80%]">
      <Table>
        <TableCaption>A list of recent requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Request No</TableHead>
            <TableHead>Student Email</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => {
            // console.log(request);
            return (
              <TableRow
                key={index}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">
                  Request #{index + 1}
                </TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.name}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={{
                      pathname: `/doctor/${request.id}/stdForm`,
                      query: { data: JSON.stringify(request) },
                    }}
                    className="block w-full h-full border-4	text-center hover:bg-gray-100"
                  >
                    Pending
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorDashboardTable;
