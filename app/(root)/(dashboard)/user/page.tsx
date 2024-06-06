// "use client";

import Navbar from "@/components/Navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";

// import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";

import { UserInfo } from "@/components/user/user-info";

const UserProfilePage = async () => {
  const user = await currentUser();
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div className="pt-10 pl-20 ml-64 h-full">
        <UserInfo label="💻 User Information" user={user} />
      </div>
    </>
  );
};

export default UserProfilePage;
