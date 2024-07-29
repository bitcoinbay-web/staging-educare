// components/interfaces/FormDataInterfaces.ts

export interface AcademicFunctionFormData {
  id: string;
  userId: string;
  impacts: any;
  cognitiveSkills: any;
  socioEmotional: any;
  physicalActivity: any;
  sensory: any;
  medicationImpact: string | null;
  additionalInfo: string | null;
  createdAt: string;
  account: string;
  signedMessage: string;
}

export interface AccessibilityFormData {
  id: string;
  userId: string;
  studentName: string;
  studentId: number;
  phoneNumber: number;
  email: string;
  consent: boolean;
  authorize: boolean;
  createdAt: string;
  account: string;
  signedMessage: string;
}

export interface AssessmentHistoryFormData {
  id: string;
  userId: string;
  duration: any;
  continue: string;
  methods: any;
  otherMethodDetails: string;
  diagnosticOptions: any;
  methodDates: any;
  createdAt: string;
  account: string;
  signedMessage: string;
}

export interface BidirectionalConsentFormData {
  id: string;
  userId: string;
  email: string;
  studentNumber: string;
  externalPartyName: string;
  relationship: string;
  confirmName: string;
  createdAt: string;
  account: string;
  signedMessage: string;
}

export interface DisabilityConfirmationFormData {
  id: string;
  userId: string;
  practitionerName: string;
  licenseNo: string;
  qualified: boolean;
  specialty: string;
  otherSpecialty: string | null;
  otherSpecialistPhysician: string | null;
  createdAt: string;
  account: string;
  signedMessage: string;
}

export interface IntakeFormData {
  id: string;
  userId: string;
  email: string;
  consent: string;
  primaryDisability: string;
  secondaryDisabilities: string;
  secondaryDisability: string | null;
  abiFormStatus: string | null;
  secondaryAbiFormStatus: string | null;
  adhdFormStatus: string | null;
  secondaryAdhdFormStatus: string | null;
  ldFormStatus: string | null;
  secondaryLdFormStatus: string | null;
  midFormStatus: string | null;
  secondaryMidFormStatus: string | null;
  asdFormStatus: string | null;
  secondaryAsdFormStatus: string | null;
  chronicFormStatus: string | null;
  secondaryChronicFormStatus: string | null;
  physicalFormStatus: string | null;
  secondaryPhysicalFormStatus: string | null;
  deafFormStatus: string | null;
  secondaryDeafFormStatus: string | null;
  mentalHealthFormStatus: string | null;
  secondaryMentalHealthFormStatus: string | null;
  visionFormStatus: string | null;
  secondaryVisionFormStatus: string | null;
  firstName: string;
  lastName: string;
  chosenName: string | null;
  pronoun: string | null;
  studentNumber: string;
  phoneNumber: string;
  canLeaveMessage: string;
  emergencyContact: string;
  eligibleForOsap: string;
  sourceBeforeTmu: string;
  levelOfStudy: string;
  faculty: string;
  specializedProgram: string;
  involvesPracticums: string;
  yearOfStudy: string;
  startNextCourse: string;
  coursesNextSemester: string;
  anticipatedGraduation: string;
  disabilityImpact: string;
  receivedAccommodationsBefore: string;
  previousAccommodations: string;
  additionalInfo: string | null;
  currentSupport: string | null;
  strengths: string;
  academicChallenges: string;
  academicChallengesDetails: string;
  createdAt: string;
  account: string;
  signedMessage: string;
}

export interface IntroConsentSectionData {
  id: string;
  userId: string;
  email: string;
  consent: string;
  createdAt: string;
  account: string;
  signedMessage: string;
}

export interface StudentOSAPFormData {
  id: string;
  userId: string;
  schoolName: string;
  socialInsuranceNumber: string;
  studentNumber: string;
  oen: string | null;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  address: any;
  phoneNumber: string;
  consent: boolean;
  optionalConsent: boolean | null;
  signature: string;
  signatureDate: string;
  createdAt: string;
  account: string;
  signedMessage: string;
}

export interface StudentDisabilitySectionData {
  id: string;
  userId: string;
  primaryDisability: string;
  secondaryDisabilities: any;
  secondaryDisability: string | null;
  abiFormStatus: string | null;
  secondaryAbiFormStatus: string | null;
  adhdFormStatus: string | null;
  secondaryAdhdFormStatus: string | null;
  ldFormStatus: string | null;
  secondaryLdFormStatus: string | null;
  midFormStatus: string | null;
  secondaryMidFormStatus: string | null;
  asdFormStatus: string | null;
  secondaryAsdFormStatus: string | null;
  chronicFormStatus: string | null;
  secondaryChronicFormStatus: string | null;
  physicalFormStatus: string | null;
  secondaryPhysicalFormStatus: string | null;
  deafFormStatus: string | null;
  secondaryDeafFormStatus: string | null;
  mentalHealthFormStatus: string | null;
  secondaryMentalHealthFormStatus: string | null;
  visionFormStatus: string | null;
  secondaryVisionFormStatus: string | null;
  createdAt: string;
  account: string;
  signedMessage: string;
}

export interface PersonalInfoSectionData {
  id: string;
  firstName: string;
  lastName: string;
  chosenName: string | null;
  pronoun: string | null;
  studentNumber: string;
  phoneNumber: string;
  canLeaveMessage: string;
  emergencyContact: string;
  eligibleForOsap: string;
  sourceBeforeTmu: string;
  levelOfStudy: string;
  faculty: string;
  specializedProgram: string;
  involvesPracticums: string;
  yearOfStudy: string;
  startNextCourse: string;
  coursesNextSemester: string;
  anticipatedGraduation: string;
  disabilityImpact: string;
  receivedAccommodationsBefore: string;
  previousAccommodations: string;
  additionalInfo: string | null;
  currentSupport: string | null;
  strengths: string;
  academicChallenges: string;
  academicChallengesDetails: string;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
  account: string;
  signedMessage: string;
}

export interface PractitionerFormData {
  id: string;
  practitionerName: string;
  licenseNo: string;
  qualified: boolean;
  specialty: string;
  otherSpecialty: string | null;
  otherSpecialistPhysician: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  account: string;
  signedMessage: string;
}

export interface AssessmentHistoryData {
  id: string;
  duration: any;
  continue: string;
  methods: string;
  otherMethodDetails: string | null;
  diagnosticOptions: string | null;
  methodDates: string;
  userId: string;
  createdAt: string;
  account: string;
  signedMessage: string;
}

export interface DisabilityConfirmationData {
  id: number;
  disability: string;
  startDate: string | null;
  endDate: string | null;
  nature: any;
  primaryNature: string;
  additionalDiagnoses: any;
  userId: string;
  createdAt: string;
  updatedAt: string;
  account: string;
  signedMessage: string;
}

export interface RecommendationFormData {
  id: string;
  recommendations: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  account: string;
  signedMessage: string;
}

export interface OSAPDisabilityConfirmationData {
  id: string;
  patient: any;
  physician: any;
  disabilityStatus: string;
  disabilities: any;
  psychoEducationalAssessment: boolean | null;
  assessmentDate: string | null;
  learningDisabilityConfirmed: boolean | null;
  mobilityImpacts: any;
  cognitiveImpacts: any;
  signature: string;
  signatureDate: string;
  userId: string;
  createdAt: string;
  account: string;
  signedMessage: string;
}
