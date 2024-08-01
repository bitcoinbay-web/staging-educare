import Image from "next/image";

const DoctorCard = ({ doctor }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-yellow-500 text-[1.5rem]">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300 text-[1.5rem]">
            ★
          </span>
        );
      }
    }
    return stars;
  };
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
        <div className="relative w-[250px] h-[250px]">
          <Image
            className="w-64 h-64"
            src={doctor.image ? doctor.image : "/doctor.jpg"}
            alt={doctor.name}
            layout="fixed"
            objectFit="cover"
            width={250}
            height={250}
          />
        </div>
        <div className="px-6 py-4">
          <h1 className="font-bold text-xl text-center">Dr. {doctor.name}</h1>
          <p className="text-gray-700 text-sm text-center mb-2">
            {doctor?.title}
          </p>
          <div className="flex justify-center mb-5 space-x-2">
            {renderStars(doctor.stars)}
          </div>
          {/* <p className="text-gray-700 text-base">Rating: {doctor.rating} / 5</p> */}
          {/* <p className="text-gray-700 text-base">
            Available: {doctor.availability === "yes" ? "Yes" : "No"}
          </p> */}
          <div className="flex justify-center">
            <button
              className={`px-4 py-2 font-semibold text-sm rounded-md ${
                doctor.available === true
                  ? "bg-blue-500 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!doctor.available}
            >
              {doctor.available === true ? "Book Now" : "Not Available"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorCard;
