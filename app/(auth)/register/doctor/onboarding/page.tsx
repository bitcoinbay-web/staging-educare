import DoctorOnboardingForm from "@/components/doctor/DoctorOnboardingForm";
import HealthPractitionerForm from "@/components/forms/HealthPractitionerForm";
import AuthNav from "@/components/Navbar/auth-nav";
import Image from "next/image";
import Link from "next/link";
import { FaUserDoctor } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";

const DoctorOnboarding = () => {
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
        <div className="absolute top-[10vh] right-0 bottom-0 left-0 flex flex-col justify-center items-center z-10">
          <AuthNav />
          <div className="bg-white shadow-lg w-[50%] h-[90%] text-center rounded-lg px-20 py-10 flex flex-col">
            <h1 className="font-bold text-[25px] mb-3">
              Your Healthcare Practitioner Profile
              <hr />
            </h1>

            <div className="text-left">
              <DoctorOnboardingForm />
              {/* <HealthPractitionerForm studentId={"1011"} /> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DoctorOnboarding;
