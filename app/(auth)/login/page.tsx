import AuthNav from "@/components/Navbar/auth-nav";
import Image from "next/image";
import { PiStudentFill } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import Link from "next/link";

const ChooseLogin = () => {
  return (
    <>
      <main className="relative w-full h-screen bg-white">
        <div className="relative z-0 w-full h-[50vh]">
          <Image
            src="/auth-bg.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute top-[-10vh] right-0 bottom-0 left-0 flex flex-col justify-center items-center z-10">
          <AuthNav />

          <div className="bg-white shadow-lg w-[50%] h-[50%] text-center rounded-lg p-20 flex flex-col">
            <h1 className="font-bold text-[25px] mb-10">
              Empowering Education and Healthcare
            </h1>
            <div className="flex space-x-4 mb-4">
              <Link href="/login/choose">
                <div className="border rounded-sm flex flex-col items-center text-center p-4 transition duration-300 hover:bg-blue-500 hover:text-white">
                  <PiStudentFill className="text-[70px] mb-2 mt-4" />
                  <h1 className="font-bold">Student Login</h1>
                  <p className="text-sm">
                    Unlock exclusive educational resources
                  </p>
                </div>
              </Link>
              <Link href="/login/choose">
                <div className="border rounded-sm flex flex-col items-center text-center p-4 transition duration-300 hover:bg-blue-500 hover:text-white">
                  <FaUserDoctor className="text-[50px] mb-4 mt-4" />
                  <h1 className="font-bold">Healthcare Practitioner Login</h1>
                  <p className="text-sm">
                    Access medical records and collaborate with students
                  </p>
                </div>
              </Link>
              <Link href="/login/choose">
                <div className="border rounded-sm  flex flex-col items-center text-center p-4 transition duration-300 hover:bg-blue-500 hover:text-white">
                  <RiAdminFill className="text-[50px] mb-4 mt-4" />
                  <h1 className="font-bold">Admin Login</h1>
                  <p className="text-sm">
                    Manage system settings and user accounts
                  </p>
                </div>
              </Link>
            </div>
            <p className="mt-auto">
              Dont have an account?{" "}
              <Link
                className="text-blue-500 font-bold hover:underline"
                href="/register"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ChooseLogin;
