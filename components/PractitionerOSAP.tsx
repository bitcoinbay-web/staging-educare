"use client";
import React, { useState } from "react";

interface PractitionerFormData {
  id: string;
  practitionerName: string;
  licenseNo: string;
  qualified: boolean;
  specialty: string;
  otherSpecialty?: string;
  otherSpecialistPhysician?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  account: string;
  signedMessage: string;
}

interface OSAPDisabilityConfirmationData {
  id: string;
  patient: {
    name: string;
    age: number;
    // Add more patient-specific fields as needed
  };
  physician: {
    name: string;
    licenseNo: string;
    // Add more physician-specific fields as needed
  };
  disabilityStatus: string;
  disabilities: {
    type: string[];
    // Add more disability-specific fields as needed
  };
  psychoEducationalAssessment?: boolean;
  assessmentDate?: string;
  learningDisabilityConfirmed?: boolean;
  mobilityImpacts: {
    impact: string[];
    // Add more mobility impact-specific fields as needed
  };
  cognitiveImpacts: {
    impact: string[];
    // Add more cognitive impact-specific fields as needed
  };
  signature: string;
  signatureDate: string;
  userId: string;
  createdAt: string;
  account: string;
  signedMessage: string;
}

// components/PractitionerDisplay.tsx

interface PractitionerDisplayProps {
  practitionerData: PractitionerFormData;
  osapData: OSAPDisabilityConfirmationData;
}

const PractitionerDisplay: React.FC<PractitionerDisplayProps> = ({
  practitionerData,
  osapData,
}) => {
  const [showPractitioner, setShowPractitioner] = useState(true);

  const handleNext = () => {
    setShowPractitioner(!showPractitioner);
  };

  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
      {showPractitioner ? (
        <div>
          <h2 className="text-2xl font-semibold text-black mt-3 mb-4">
            Practitioner Information
          </h2>
          <p className="text-black mt-3">
            <strong>Name:</strong> {practitionerData.practitionerName}
          </p>
          <p className="text-black mt-3">
            <strong>License No:</strong> {practitionerData.licenseNo}
          </p>
          <p className="text-black mt-3">
            <strong>Qualified:</strong>{" "}
            {practitionerData.qualified ? "Yes" : "No"}
          </p>
          <p className="text-black mt-3">
            <strong>Specialty:</strong> {practitionerData.specialty}
          </p>
          {practitionerData.otherSpecialty && (
            <p className="text-black mt-3">
              <strong>Other Specialty:</strong>{" "}
              {practitionerData.otherSpecialty}
            </p>
          )}
          {practitionerData.otherSpecialistPhysician && (
            <p className="text-black mt-3">
              <strong>Other Specialist Physician:</strong>{" "}
              {practitionerData.otherSpecialistPhysician}
            </p>
          )}
          <p className="text-black mt-3">
            <strong>Account:</strong> {practitionerData.account}
          </p>
          <p className="text-black mt-3">
            <strong>Signed Message:</strong> {practitionerData.signedMessage}
          </p>
          <div className="flex justify-end">
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-black mt-3 mb-4">
            OSAP Disability Confirmation
          </h2>
          <p className="text-black mt-3">
            <strong>Patient Name:</strong> {osapData.patient.name}
          </p>
          <p className="text-black mt-3">
            <strong>Patient Age:</strong> {osapData.patient.age}
          </p>
          <p className="text-black mt-3">
            <strong>Physician Name:</strong> {osapData.physician.name}
          </p>
          <p className="text-black mt-3">
            <strong>Physician License No:</strong>{" "}
            {osapData.physician.licenseNo}
          </p>
          <p className="text-black mt-3">
            <strong>Disability Status:</strong> {osapData.disabilityStatus}
          </p>
          <p className="text-black mt-3">
            <strong>Disabilities:</strong>{" "}
            {osapData.disabilities.type.join(", ")}
          </p>
          {osapData.psychoEducationalAssessment !== undefined && (
            <p className="text-black mt-3">
              <strong>Psycho-Educational Assessment:</strong>{" "}
              {osapData.psychoEducationalAssessment ? "Yes" : "No"}
            </p>
          )}
          {osapData.assessmentDate && (
            <p className="text-black mt-3">
              <strong>Assessment Date:</strong> {osapData.assessmentDate}
            </p>
          )}
          {osapData.learningDisabilityConfirmed !== undefined && (
            <p className="text-black mt-3">
              <strong>Learning Disability Confirmed:</strong>{" "}
              {osapData.learningDisabilityConfirmed ? "Yes" : "No"}
            </p>
          )}
          <p className="text-black mt-3">
            <strong>Mobility Impacts:</strong>{" "}
            {osapData.mobilityImpacts.impact.join(", ")}
          </p>
          <p className="text-black mt-3">
            <strong>Cognitive Impacts:</strong>{" "}
            {osapData.cognitiveImpacts.impact.join(", ")}
          </p>
          <p className="text-black mt-3">
            <strong>Signature:</strong> {osapData.signature}
          </p>
          <p className="text-black mt-3">
            <strong>Signature Date:</strong> {osapData.signatureDate}
          </p>
          <p className="text-black mt-3">
            <strong>Account:</strong> {osapData.account}
          </p>
          <p className="text-black mt-3">
            <strong>Signed Message:</strong> {osapData.signedMessage}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleNext}
          >
            Back
          </button>
          <div className="flex justify-end">
            <button className="mt-4 mr-2 bg-green-500 text-white px-4 py-2 rounded-sm">
              Approve
            </button>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-sm">
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PractitionerDisplay;
