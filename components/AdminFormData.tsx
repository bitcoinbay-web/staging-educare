// components/AdminFormData.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  AcademicFunctionFormData,
  AccessibilityFormData,
  AssessmentHistoryFormData,
  BidirectionalConsentFormData,
  DisabilityConfirmationFormData,
  IntakeFormData,
  IntroConsentSectionData,
  StudentOSAPFormData,
  StudentDisabilitySectionData,
  PersonalInfoSectionData,
  PractitionerFormData,
  AssessmentHistoryData,
  DisabilityConfirmationData,
  RecommendationFormData,
  OSAPDisabilityConfirmationData
} from "@/components/interfaces/FormDataInterfaces";

const AdminFormData: React.FC = () => {
  const [academicData, setAcademicData] = useState<AcademicFunctionFormData[]>([]);
  const [accessibilityData, setAccessibilityData] = useState<AccessibilityFormData[]>([]);
  const [assessmentData, setAssessmentData] = useState<AssessmentHistoryFormData[]>([]);
  const [bidirectionalConsentData, setBidirectionalConsentData] = useState<BidirectionalConsentFormData[]>([]);
  const [disabilityConfirmationData, setDisabilityConfirmationData] = useState<DisabilityConfirmationFormData[]>([]);
  const [healthPractitionerData, setHealthPractitionerData] = useState([]);
  const [intakeData, setIntakeData] = useState<IntakeFormData[]>([]);
  const [introConsentData, setIntroConsentData] = useState<IntroConsentSectionData[]>([]);
  const [studentOsapData, setStudentOsapData] = useState<StudentOSAPFormData[]>([]);
  const [studentDisabilityData, setStudentDisabilityData] = useState<StudentDisabilitySectionData[]>([]);
  const [personalInfoData, setPersonalInfoData] = useState<PersonalInfoSectionData[]>([]);
  const [practitionerData, setPractitionerData] = useState<PractitionerFormData[]>([]);
  const [assessmentHistoryData, setAssessmentHistoryData] = useState<AssessmentHistoryData[]>([]);
  const [disabilityConfirmationFullData, setDisabilityConfirmationFullData] = useState<DisabilityConfirmationData[]>([]);
  const [recommendationData, setRecommendationData] = useState<RecommendationFormData[]>([]);
  const [osapDisabilityConfirmationData, setOsapDisabilityConfirmationData] = useState<OSAPDisabilityConfirmationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from /api/admin/formData');
        const response = await fetch('/api/admin/formData');
        if (response.ok) {
          const data = await response.json();
          setAcademicData(data.academicFunctionFormData);
          setAccessibilityData(data.accessibilityFormData);
          setAssessmentData(data.assessmentHistoryFormData);
          setBidirectionalConsentData(data.bidirectionalConsentFormData);
          setDisabilityConfirmationData(data.disabilityConfirmationFormData);
          setIntakeData(data.intakeFormData);
          setIntroConsentData(data.introConsentSectionData);
          setStudentOsapData(data.studentOsapFormData);
          setStudentDisabilityData(data.studentDisabilitySectionData);
          setPersonalInfoData(data.personalInfoSectionData);
          setPractitionerData(data.practitionerFormData);
          setAssessmentHistoryData(data.assessmentHistoryData);
          setDisabilityConfirmationFullData(data.disabilityConfirmationData);
          setRecommendationData(data.recommendationFormData);
          setOsapDisabilityConfirmationData(data.osapDisabilityConfirmationData);
        } else {
          toast.error('Failed to fetch form data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('An error occurred while fetching form data');
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>Form Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3>Academic Function Form Data</h3>
        {academicData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Impacts:</strong> {JSON.stringify(item.impacts)}</p>
            <p><strong>Cognitive Skills:</strong> {JSON.stringify(item.cognitiveSkills)}</p>
            <p><strong>Socio-Emotional:</strong> {JSON.stringify(item.socioEmotional)}</p>
            <p><strong>Physical Activity:</strong> {JSON.stringify(item.physicalActivity)}</p>
            <p><strong>Sensory:</strong> {JSON.stringify(item.sensory)}</p>
            <p><strong>Medication Impact:</strong> {item.medicationImpact}</p>
            <p><strong>Additional Info:</strong> {item.additionalInfo}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
          </div>
        ))}
        <h3>Accessibility Form Data</h3>
        {accessibilityData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Student Name:</strong> {item.studentName}</p>
            <p><strong>Student ID:</strong> {item.studentId}</p>
            <p><strong>Phone Number:</strong> {item.phoneNumber}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Consent:</strong> {item.consent ? 'Yes' : 'No'}</p>
            <p><strong>Authorize:</strong> {item.authorize ? 'Yes' : 'No'}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
          </div>
        ))}
        <h3>Assessment History Form Data</h3>
        {assessmentData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Duration:</strong> {JSON.stringify(item.duration)}</p>
            <p><strong>Continue:</strong> {item.continue}</p>
            <p><strong>Methods:</strong> {JSON.stringify(item.methods)}</p>
            <p><strong>Other Method Details:</strong> {item.otherMethodDetails}</p>
            <p><strong>Diagnostic Options:</strong> {JSON.stringify(item.diagnosticOptions)}</p>
            <p><strong>Method Dates:</strong> {JSON.stringify(item.methodDates)}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
          </div>
        ))}
        <h3>Bidirectional Consent Form Data</h3>
        {bidirectionalConsentData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Student Number:</strong> {item.studentNumber}</p>
            <p><strong>External Party Name:</strong> {item.externalPartyName}</p>
            <p><strong>Relationship:</strong> {item.relationship}</p>
            <p><strong>Confirm Name:</strong> {item.confirmName}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
          </div>
        ))}
        <h3>Disability Confirmation Form Data</h3>
        {disabilityConfirmationData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Practitioner Name:</strong> {item.practitionerName}</p>
            <p><strong>License No:</strong> {item.licenseNo}</p>
            <p><strong>Qualified:</strong> {item.qualified ? 'Yes' : 'No'}</p>
            <p><strong>Specialty:</strong> {item.specialty}</p>
            <p><strong>Other Specialty:</strong> {item.otherSpecialty}</p>
            <p><strong>Other Specialist Physician:</strong> {item.otherSpecialistPhysician}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
          </div>
        ))}
        <h3>Health Practitioner Form Data</h3>
        {healthPractitionerData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>First Name:</strong> {item.firstName}</p>
            <p><strong>Last Name:</strong> {item.lastName}</p>
            <p><strong>Gender:</strong> {item.gender}</p>
            <p><strong>Email Address:</strong> {item.emailAddress}</p>
            <p><strong>Phone Number:</strong> {item.phoneNumber}</p>
            <p><strong>Health Care Practitioner Type:</strong> {item.healthCarePractitionerType}</p>
            <p><strong>License Number:</strong> {item.licenseNumber}</p>
            <p><strong>Accepting New Clients:</strong> {item.acceptingNewClients}</p>
            <p><strong>Languages:</strong> {item.languages}</p>
            <p><strong>Appointment Types:</strong> {item.appointmentTypes}</p>
            <p><strong>Services Provided:</strong> {item.servicesProvided}</p>
            <p><strong>Business Name:</strong> {item.businessName}</p>
            <p><strong>Business Website:</strong> {item.businessWebsite}</p>
            <p><strong>Business Address:</strong> {item.businessAddress}</p>
            <p><strong>Booking Email Address:</strong> {item.bookingEmailAddress}</p>
            <p><strong>Booking Phone Number:</strong> {item.bookingPhoneNumber}</p>
            <p><strong>Online Booking URL:</strong> {item.onlineBookingURL}</p>
            <p><strong>Fax Number:</strong> {item.faxNumber}</p>
            <p><strong>Bio:</strong> {item.bio}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
          </div>
        ))}
        <h3>Intake Form Data</h3>
        {intakeData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Consent:</strong> {item.consent}</p>
            <p><strong>Primary Disability:</strong> {item.primaryDisability}</p>
            <p><strong>Secondary Disabilities:</strong> {item.secondaryDisabilities}</p>
            <p><strong>Secondary Disability:</strong> {item.secondaryDisability}</p>
            <p><strong>First Name:</strong> {item.firstName}</p>
            <p><strong>Last Name:</strong> {item.lastName}</p>
            <p><strong>Chosen Name:</strong> {item.chosenName}</p>
            <p><strong>Pronoun:</strong> {item.pronoun}</p>
            <p><strong>Student Number:</strong> {item.studentNumber}</p>
            <p><strong>Phone Number:</strong> {item.phoneNumber}</p>
            <p><strong>Can Leave Message:</strong> {item.canLeaveMessage}</p>
            <p><strong>Emergency Contact:</strong> {item.emergencyContact}</p>
            <p><strong>Eligible For Osap:</strong> {item.eligibleForOsap}</p>
            <p><strong>Source Before Tmu:</strong> {item.sourceBeforeTmu}</p>
            <p><strong>Level Of Study:</strong> {item.levelOfStudy}</p>
            <p><strong>Faculty:</strong> {item.faculty}</p>
            <p><strong>Specialized Program:</strong> {item.specializedProgram}</p>
            <p><strong>Involves Practicums:</strong> {item.involvesPracticums}</p>
            <p><strong>Year Of Study:</strong> {item.yearOfStudy}</p>
            <p><strong>Start Next Course:</strong> {item.startNextCourse}</p>
            <p><strong>Courses Next Semester:</strong> {item.coursesNextSemester}</p>
            <p><strong>Anticipated Graduation:</strong> {item.anticipatedGraduation}</p>
            <p><strong>Disability Impact:</strong> {item.disabilityImpact}</p>
            <p><strong>Received Accommodations Before:</strong> {item.receivedAccommodationsBefore}</p>
            <p><strong>Previous Accommodations:</strong> {item.previousAccommodations}</p>
            <p><strong>Additional Info:</strong> {item.additionalInfo}</p>
            <p><strong>Current Support:</strong> {item.currentSupport}</p>
            <p><strong>Strengths:</strong> {item.strengths}</p>
            <p><strong>Academic Challenges:</strong> {item.academicChallenges}</p>
            <p><strong>Academic Challenges Details:</strong> {item.academicChallengesDetails}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
          </div>
        ))}
        <h3>Intro Consent Section Form Data</h3>
        {introConsentData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Consent:</strong> {item.consent}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
          </div>
        ))}
        <h3>Student OSAP Form Data</h3>
        {studentOsapData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>School Name:</strong> {item.schoolName}</p>
            <p><strong>Social Insurance Number:</strong> {item.socialInsuranceNumber}</p>
            <p><strong>Student Number:</strong> {item.studentNumber}</p>
            <p><strong>OEN:</strong> {item.oen}</p>
            <p><strong>Last Name:</strong> {item.lastName}</p>
            <p><strong>First Name:</strong> {item.firstName}</p>
            <p><strong>Date of Birth:</strong> {item.dateOfBirth}</p>
            <p><strong>Address:</strong> {JSON.stringify(item.address)}</p>
            <p><strong>Phone Number:</strong> {item.phoneNumber}</p>
            <p><strong>Consent:</strong> {item.consent ? 'Yes' : 'No'}</p>
            <p><strong>Optional Consent:</strong> {item.optionalConsent ? 'Yes' : 'No'}</p>
            <p><strong>Signature:</strong> {item.signature}</p>
            <p><strong>Signature Date:</strong> {item.signatureDate}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
          </div>
        ))}
        <h3>Student Disability Section Data</h3>
        {studentDisabilityData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Primary Disability:</strong> {item.primaryDisability}</p>
            <p><strong>Secondary Disabilities:</strong> {JSON.stringify(item.secondaryDisabilities)}</p>
            <p><strong>Secondary Disability:</strong> {item.secondaryDisability}</p>
            <p><strong>ABI Form Status:</strong> {item.abiFormStatus}</p>
            <p><strong>Secondary ABI Form Status:</strong> {item.secondaryAbiFormStatus}</p>
            <p><strong>ADHD Form Status:</strong> {item.adhdFormStatus}</p>
            <p><strong>Secondary ADHD Form Status:</strong> {item.secondaryAdhdFormStatus}</p>
            <p><strong>LD Form Status:</strong> {item.ldFormStatus}</p>
            <p><strong>Secondary LD Form Status:</strong> {item.secondaryLdFormStatus}</p>
            <p><strong>MID Form Status:</strong> {item.midFormStatus}</p>
            <p><strong>Secondary MID Form Status:</strong> {item.secondaryMidFormStatus}</p>
            <p><strong>ASD Form Status:</strong> {item.asdFormStatus}</p>
            <p><strong>Secondary ASD Form Status:</strong> {item.secondaryAsdFormStatus}</p>
            <p><strong>Chronic Form Status:</strong> {item.chronicFormStatus}</p>
            <p><strong>Secondary Chronic Form Status:</strong> {item.secondaryChronicFormStatus}</p>
            <p><strong>Physical Form Status:</strong> {item.physicalFormStatus}</p>
            <p><strong>Secondary Physical Form Status:</strong> {item.secondaryPhysicalFormStatus}</p>
            <p><strong>Deaf Form Status:</strong> {item.deafFormStatus}</p>
            <p><strong>Secondary Deaf Form Status:</strong> {item.secondaryDeafFormStatus}</p>
            <p><strong>Mental Health Form Status:</strong> {item.mentalHealthFormStatus}</p>
            <p><strong>Secondary Mental Health Form Status:</strong> {item.secondaryMentalHealthFormStatus}</p>
            <p><strong>Vision Form Status:</strong> {item.visionFormStatus}</p>
            <p><strong>Secondary Vision Form Status:</strong> {item.secondaryVisionFormStatus}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
          </div>
        ))}
        <h3>Personal Info Section Data</h3>
        {personalInfoData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>First Name:</strong> {item.firstName}</p>
            <p><strong>Last Name:</strong> {item.lastName}</p>
            <p><strong>Chosen Name:</strong> {item.chosenName}</p>
            <p><strong>Pronoun:</strong> {item.pronoun}</p>
            <p><strong>Student Number:</strong> {item.studentNumber}</p>
            <p><strong>Phone Number:</strong> {item.phoneNumber}</p>
            <p><strong>Can Leave Message:</strong> {item.canLeaveMessage}</p>
            <p><strong>Emergency Contact:</strong> {item.emergencyContact}</p>
            <p><strong>Eligible For Osap:</strong> {item.eligibleForOsap}</p>
            <p><strong>Source Before Tmu:</strong> {item.sourceBeforeTmu}</p>
            <p><strong>Level Of Study:</strong> {item.levelOfStudy}</p>
            <p><strong>Faculty:</strong> {item.faculty}</p>
            <p><strong>Specialized Program:</strong> {item.specializedProgram}</p>
            <p><strong>Involves Practicums:</strong> {item.involvesPracticums}</p>
            <p><strong>Year Of Study:</strong> {item.yearOfStudy}</p>
            <p><strong>Start Next Course:</strong> {item.startNextCourse}</p>
            <p><strong>Courses Next Semester:</strong> {item.coursesNextSemester}</p>
            <p><strong>Anticipated Graduation:</strong> {item.anticipatedGraduation}</p>
            <p><strong>Disability Impact:</strong> {item.disabilityImpact}</p>
            <p><strong>Received Accommodations Before:</strong> {item.receivedAccommodationsBefore}</p>
            <p><strong>Previous Accommodations:</strong> {item.previousAccommodations}</p>
            <p><strong>Additional Info:</strong> {item.additionalInfo}</p>
            <p><strong>Current Support:</strong> {item.currentSupport}</p>
            <p><strong>Strengths:</strong> {item.strengths}</p>
            <p><strong>Academic Challenges:</strong> {item.academicChallenges}</p>
            <p><strong>Academic Challenges Details:</strong> {item.academicChallengesDetails}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
            <p><strong>Updated At:</strong> {item.updatedAt}</p>
          </div>
        ))}
        <h3>Practitioner Form Data</h3>
        {practitionerData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>Practitioner Name:</strong> {item.practitionerName}</p>
            <p><strong>License No:</strong> {item.licenseNo}</p>
            <p><strong>Qualified:</strong> {item.qualified ? 'Yes' : 'No'}</p>
            <p><strong>Specialty:</strong> {item.specialty}</p>
            <p><strong>Other Specialty:</strong> {item.otherSpecialty}</p>
            <p><strong>Other Specialist Physician:</strong> {item.otherSpecialistPhysician}</p>
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
            <p><strong>Updated At:</strong> {item.updatedAt}</p>
          </div>
        ))}
        <h3>Assessment History Data</h3>
        {assessmentHistoryData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>Duration:</strong> {JSON.stringify(item.duration)}</p>
            <p><strong>Continue:</strong> {item.continue}</p>
            <p><strong>Methods:</strong> {item.methods}</p>
            <p><strong>Other Method Details:</strong> {item.otherMethodDetails}</p>
            <p><strong>Diagnostic Options:</strong> {item.diagnosticOptions}</p>
            <p><strong>Method Dates:</strong> {item.methodDates}</p>
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
          </div>
        ))}
        <h3>Disability Confirmation Data</h3>
        {disabilityConfirmationFullData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>Disability:</strong> {item.disability}</p>
            <p><strong>Start Date:</strong> {item.startDate}</p>
            <p><strong>End Date:</strong> {item.endDate}</p>
            <p><strong>Nature:</strong> {JSON.stringify(item.nature)}</p>
            <p><strong>Primary Nature:</strong> {item.primaryNature}</p>
            <p><strong>Additional Diagnoses:</strong> {JSON.stringify(item.additionalDiagnoses)}</p>
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
            <p><strong>Updated At:</strong> {item.updatedAt}</p>
          </div>
        ))}
        <h3>Recommendation Form Data</h3>
        {recommendationData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>Recommendations:</strong> {item.recommendations}</p>
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
            <p><strong>Updated At:</strong> {item.updatedAt}</p>
          </div>
        ))}
        <h3>OSAP Disability Confirmation Data</h3>
        {osapDisabilityConfirmationData.map((item) => (
          <div key={item.id} className="p-2 border rounded">
            <p><strong>Patient:</strong> {JSON.stringify(item.patient)}</p>
            <p><strong>Physician:</strong> {JSON.stringify(item.physician)}</p>
            <p><strong>Disability Status:</strong> {item.disabilityStatus}</p>
            <p><strong>Disabilities:</strong> {JSON.stringify(item.disabilities)}</p>
            <p><strong>Psycho-Educational Assessment:</strong> {item.psychoEducationalAssessment ? 'Yes' : 'No'}</p>
            <p><strong>Assessment Date:</strong> {item.assessmentDate}</p>
            <p><strong>Learning Disability Confirmed:</strong> {item.learningDisabilityConfirmed ? 'Yes' : 'No'}</p>
            <p><strong>Mobility Impacts:</strong> {JSON.stringify(item.mobilityImpacts)}</p>
            <p><strong>Cognitive Impacts:</strong> {JSON.stringify(item.cognitiveImpacts)}</p>
            <p><strong>Signature:</strong> {item.signature}</p>
            <p><strong>Signature Date:</strong> {item.signatureDate}</p>
            <p><strong>User ID:</strong> {item.userId}</p>
            <p><strong>Created At:</strong> {item.createdAt}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AdminFormData;
