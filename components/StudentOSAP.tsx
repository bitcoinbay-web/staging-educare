// components/StudentOSAPFormDisplay.tsx

import React from "react";

// Define the interface here since it's used directly by the display component
export interface StudentOSAPFormData {
  id: string;
  userId: string;
  schoolName: string;
  socialInsuranceNumber: string;
  studentNumber: string;
  oen?: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string; // Using string for simplicity
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  phoneNumber: string;
  consent: boolean;
  optionalConsent?: boolean;
  signature: string;
  signatureDate: string; // Using string for simplicity
  createdAt: string; // Using string for simplicity
  account: string;
  signedMessage: string;
  status?: string;
}

// Component to display a single student's OSAP form data
const StudentOSAPFormDisplay: React.FC<{ student: StudentOSAPFormData }> = ({
  student,
}) => {
  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-black mb-4">
        {student.firstName} {student.lastName}
      </h2>
      <p className="text-black mt-3 ">
        <strong>School Name:</strong> {student.schoolName}
      </p>
      <p className="text-black mt-3">
        <strong>Social Insurance Number:</strong>{" "}
        {student.socialInsuranceNumber}
      </p>
      <p className="text-black mt-3">
        <strong>Student Number:</strong> {student.studentNumber}
      </p>
      {student.oen && (
        <p className="text-black mt-3">
          <strong>OEN:</strong> {student.oen}
        </p>
      )}
      <p className="text-black mt-3">
        <strong>Date of Birth:</strong> {student.dateOfBirth}
      </p>
      <p className="text-black mt-3">
        <strong>Address:</strong>{" "}
        {`${student.address.street}, ${student.address.city}, ${student.address.province}, ${student.address.postalCode}`}
      </p>
      <p className="text-black mt-3">
        <strong>Phone Number:</strong> {student.phoneNumber}
      </p>
      <p className="text-black mt-3">
        <strong>Consent:</strong> {student.consent ? "Yes" : "No"}
      </p>
      {student.optionalConsent !== undefined && (
        <p className="text-black mt-3">
          <strong>Optional Consent:</strong>{" "}
          {student.optionalConsent ? "Yes" : "No"}
        </p>
      )}
      <p className="text-black mt-3">
        <strong>Signature:</strong> {student.signature}
      </p>
      <p className="text-black mt-3">
        <strong>Signature Date:</strong> {student.signatureDate}
      </p>
      <p className="text-black mt-3">
        <strong>Account:</strong> {student.account}
      </p>
      <p className="text-black mt-3">
        <strong>Signed Message:</strong> {student.signedMessage}
      </p>
      <p className="text-black mt-3">
        <strong>Status:</strong> {student.status ?? "pending"}
      </p>
      <p className="text-black mt-3">
        <strong>Created At:</strong> {student.createdAt}
      </p>
    </div>
  );
};

export default StudentOSAPFormDisplay;
