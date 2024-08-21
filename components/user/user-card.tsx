import { UserInfo } from "@/components/user/user-info";

import { useSession } from "next-auth/react";

const UserProfilePage = () => {
  const { data: session } = useSession();

  return (
    <>
      {console.log(session)}
      <div className="pt-10 h-full">
        <UserInfo label="💻 User Information" user={session?.user} />
      </div>
    </>
  );
};

export default UserProfilePage;
