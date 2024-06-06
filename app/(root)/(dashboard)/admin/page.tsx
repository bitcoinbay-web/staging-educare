"use client";

import Navbar from "@/components/Navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { admin } from "@/lib/actions/admin";
import { UserRole } from "@/lib/models/user.model";
import { toast } from "sonner";

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

  const role = useCurrentRole();
  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="pt-10 pl-20 ml-64 h-full">
        Current Role: ${role}
        <Card className="w-[600px]">
          <CardHeader>
            <p className="text-2xl font-semibold">🔑 Admin</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <RoleGate allowedRole={UserRole.STUDENT}>
              <FormSuccess message="You are allowed to see this content" />
            </RoleGate>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
              <p className="text-sm font-medium">Admin-only API Route</p>
              <Button onClick={onApiRouteClick}>Click to test</Button>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
              <p className="text-sm font-medium">Admin-only Server Action</p>
              <Button onClick={onServerClick}>Click to test</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
