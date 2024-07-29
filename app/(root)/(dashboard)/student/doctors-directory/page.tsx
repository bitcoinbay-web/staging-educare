"use client";
import React, { useEffect, useState } from 'react';
import DoctorCard from "@/components/doctor/DoctorCard";

const Directory = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/allDoctors'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setDoctors(data);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };

    fetchDoctors();
  }, []); 

  // const doctors = [
  //   {
  //     name: "Meredith Grey",
  //     title: "Chief of General Surgery",
  //     stars: 4.8,
  //     available: true,
  //     image: "/meredith.jpg",
  //   },
  //   {
  //     name: "Derek Shepherd",
  //     title: "Chief of Neurosurgery",
  //     stars: 4.9,
  //     available: false,
  //     image: "/derek.jpg",
  //   },
  //   {
  //     name: "Max Goodwin",
  //     title: "Medical Director",
  //     stars: 4.8,
  //     available: true,
  //     image: "/max.webp",
  //   },
  //   {
  //     name: "Cristina Yang",
  //     title: "Cardiothoracic Surgeon",
  //     stars: 4.9,
  //     available: false,
  //     image: "/derek.jpg",
  //   },
  //   {
  //     name: "Miranda Bailey",
  //     title: "Chief of Surgery",
  //     stars: 4.8,
  //     available: true,
  //     image: "/iggy.jpg",
  //   },
  //   {
  //     name: "April Kepner",
  //     title: "Trauma Surgeon",
  //     stars: 4.7,
  //     available: false,
  //     image: "/meredith.jpg",
  //   },
  //   {
  //     name: "Bruce Banner",
  //     title: "Radiation Specialist",
  //     stars: 4.5,
  //     available: true,
  //     image: "/max.webp",
  //   },
  //   {
  //     name: "Iggy Frome",
  //     title: "Psychiatrist",
  //     stars: 4.6,
  //     available: true,
  //     image: "/iggy.jpg",
  //   },
  //   {
  //     name: "Max Goodwin",
  //     title: "Medical Director",
  //     stars: 4.8,
  //     available: true,
  //     image: "/max.webp",
  //   },
  // ];

  return (
    <>
      <div className="pt-7 pl-10 ml-64 h-full">
        <h1 className="font-bold text-2xl mb-4">
          Healthcare Practitioner Directory
        </h1>
        <div className="flex flex-wrap justify-center">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Directory;
