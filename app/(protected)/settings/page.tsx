"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSession, signOut } from "next-auth/react";

import { auth } from "@/auth";

const SettingsPage = () => {
  const user = useCurrentUser();

  // const session = async () => {
  //   await auth();
  // };

  const onClick = () => {
    signOut();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onClick} type="submit">
        Logout
      </button>
    </div>
  );
};

export default SettingsPage;
