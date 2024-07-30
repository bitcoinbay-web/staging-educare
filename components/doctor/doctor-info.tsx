import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface DoctorInfoProps {
  // doctor?: ExtendedUser;
  doctor?: Doctor;
  label: string;
}

interface Doctor {
  fname: string;
  lname: string;
  email: string;
  gender: string;
  pno: string;
  type: string;
  lno: string;
  newclients: string;
  appointmenttype: string;
  languages: string;
  stdforms: string;
  bsname: string;
  bsweb?: string;
  bsemail: string;
  bsaddress: string;
  bspno: string;
  bookingURL?: string;
  bio: string;
}

export const DoctorInfo = ({ doctor, label }: DoctorInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">First Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.fname}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Last Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.lname}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Gender</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.gender}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Phone Number</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.pno}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Type</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.type}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">License Number</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.lno}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Accepting New Clients?</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.newclients}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Appointment Type</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.appointmenttype}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Languages</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.languages}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Available for Form Requests</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.stdforms}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Business Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.bsname}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Business Website</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.bsweb || "Not Provided"}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Business Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.bsemail}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Business Address</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.bsaddress}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Business Phone Number</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.bspno}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Online Booking URL</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.bookingURL || "Not Provided"}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
          <p className="test-sm font-medium">Bio</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {doctor?.bio}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
