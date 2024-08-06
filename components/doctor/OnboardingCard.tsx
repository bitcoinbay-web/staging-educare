import React, { useState, useEffect } from "react";
import { DoctorInfo } from "./doctor-info";
import { useSession } from "next-auth/react";

const DoctorOnboardingCard = () => {

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
