import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const DoctorUserInfoCard = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">ID</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        {/* <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.walletID}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Role</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.stdID}
          </p>
        </div> */}
      </CardContent>
    </Card>
  );
};
