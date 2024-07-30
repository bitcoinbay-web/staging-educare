import { DoctorInfo } from "./doctor-info";

const DoctorOnboardingCard = () => {
  const doctor = {
    fname: "Fowzia",
    lname: "Test",
    email: "fowzia@test.com",
    gender: "female",
    pno: "238472384",
    type: "Psycologist",
    lno: "LL234K434",
    newclients: "Yes",
    appointmenttype: "In-person",
    languages: "English, French",
    stdforms: "Accessibility, Disability",
    bsname: "MedTech Clinic",
    bsweb: "",
    bsemail: "doc@test.com",
    bsaddress: "79 overlea blcd toronto",
    bspno: "32985023",
    bookingURL: "",
    bio: "ffdgwgwtggtw",
  };
  return (
    <>
      <DoctorInfo
        label="💻 Onboarding Information"
        //   user={session.user}
        doctor={doctor}
      />
    </>
  );
};

export default DoctorOnboardingCard;
