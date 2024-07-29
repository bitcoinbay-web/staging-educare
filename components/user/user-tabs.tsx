import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { IoLogOut } from "react-icons/io5";

import { useSession, signOut } from "next-auth/react";
import { PiFilesFill } from "react-icons/pi";

const UserTabs = () => {
  const pathname = usePathname();
  const onClick = () => {
    signOut({
      callbackUrl: "/login",
    });
  };
  return (
    <>
      <div className="flex items-center space-x-10 pt-10 pr-10">
        <div
          className={`mb-10 font-bold text-md shadow-lg ${
            pathname === "/student/profile/user"
              ? "bg-white px-5 py-3 rounded-md"
              : ""
          } `}
        >
          <Link href="/student/profile/user" className="flex items-center">
            <HiMiniWrenchScrewdriver className="mr-2" />
            Profile
          </Link>
        </div>
        <div
          className={`mb-10 font-bold text-md ${
            pathname === "/student/profile/docs"
              ? "bg-white px-5 py-3 rounded-md"
              : ""
          } `}
        >
          <Link href="/student/profile/docs" className="flex items-center">
            <PiFilesFill className="mr-2" />
            My Documents
          </Link>
        </div>
        <div className={`mb-10 font-bold text-md`}>
          <button
            onClick={onClick}
            type="submit"
            className="flex items-center "
          >
            <IoLogOut className="mr-2" />
            Signout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserTabs;
