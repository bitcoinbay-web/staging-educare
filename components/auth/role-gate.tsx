"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";
import UserRole from "@/lib/models/user.model";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: typeof UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content" />
    );
  }
  return <>{children}</>;
};
