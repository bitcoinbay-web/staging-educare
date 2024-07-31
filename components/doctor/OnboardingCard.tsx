import React, { useState, useEffect } from "react";
import { DoctorInfo } from "./doctor-info";
import { useSession } from "next-auth/react";

const DoctorOnboardingCard = () => {
  // const doctor = {
  //   fname: "Fowzia",
  //   lname: "Test",
  //   email: "fowzia@test.com",
  //   gender: "female",
  //   pno: "238472384",
  //   type: "Psycologist",
  //   lno: "LL234K434",
  //   newclients: "Yes",
  //   appointmenttype: "In-person",
  //   languages: "English, French",
  //   stdforms: "Accessibility, Disability",
  //   bsname: "MedTech Clinic",
  //   bsweb: "",
  //   bsemail: "doc@test.com",
  //   bsaddress: "79 overlea blcd toronto",
  //   bspno: "32985023",
  //   bookingURL: "",
  //   bio: "ffdgwgwtggtw",
  // };
  const { data: session } = useSession();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
      fetch(`/api/doctor?id=${session?.user?.id}`)
        .then(response => response.json())
        .then(data => {
          setDoctor(data)
        })
        .catch(error => console.error("Error fetching doctor data:", error));
  }, []);

  return (
    <>
      {doctor && (
        <DoctorInfo
          label="💻 Onboarding Information"
          doctor={doctor}
        />
      )}
    </>
  );
};

export default DoctorOnboardingCard;
