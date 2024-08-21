import { useSession } from "next-auth/react";
import { DoctorUserInfoCard } from "@/components/doctor/d-userInfo";

const DoctorUserCard = () => {
  const { data: session } = useSession();

  return (
    <>
      {console.log(session)}
      <div className="pt-10 h-full">
        <DoctorUserInfoCard
          label="💻 Doctor Information"
          user={session?.user}
        />
      </div>
    </>
  );
};

export default DoctorUserCard;
