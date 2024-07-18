-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'DOCTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "AcceptingNewClients" AS ENUM ('Yes', 'No');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "stdID" TEXT,
    "walletID" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "walletID" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'DOCTOR',

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicFunctionFormData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "impacts" JSONB NOT NULL,
    "cognitiveSkills" JSONB NOT NULL,
    "socioEmotional" JSONB NOT NULL,
    "physicalActivity" JSONB NOT NULL,
    "sensory" JSONB NOT NULL,
    "medicationImpact" TEXT,
    "additionalInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "AcademicFunctionFormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessibilityFormData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL,
    "authorize" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "AccessibilityFormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentHistoryFormData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "duration" JSONB NOT NULL,
    "continue" TEXT NOT NULL,
    "methods" JSONB NOT NULL,
    "otherMethodDetails" TEXT NOT NULL,
    "diagnosticOptions" JSONB NOT NULL,
    "methodDates" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "AssessmentHistoryFormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BidirectionalConsentFormData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "studentNumber" TEXT NOT NULL,
    "externalPartyName" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "confirmName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "BidirectionalConsentFormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisabilityConfirmationFormData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "practitionerName" TEXT NOT NULL,
    "licenseNo" TEXT NOT NULL,
    "qualified" BOOLEAN NOT NULL,
    "specialty" TEXT NOT NULL,
    "otherSpecialty" TEXT,
    "otherSpecialistPhysician" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "DisabilityConfirmationFormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthPractitionerFormData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "healthCarePractitionerType" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "acceptingNewClients" TEXT NOT NULL,
    "languages" TEXT NOT NULL,
    "appointmentTypes" TEXT NOT NULL,
    "servicesProvided" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessWebsite" TEXT,
    "businessAddress" TEXT NOT NULL,
    "bookingEmailAddress" TEXT NOT NULL,
    "bookingPhoneNumber" TEXT NOT NULL,
    "onlineBookingURL" TEXT,
    "faxNumber" TEXT,
    "bio" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "HealthPractitionerFormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntakeFormData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "consent" TEXT NOT NULL,
    "primaryDisability" TEXT NOT NULL,
    "secondaryDisabilities" TEXT NOT NULL,
    "secondaryDisability" TEXT,
    "abiFormStatus" TEXT,
    "secondaryAbiFormStatus" TEXT,
    "adhdFormStatus" TEXT,
    "secondaryAdhdFormStatus" TEXT,
    "ldFormStatus" TEXT,
    "secondaryLdFormStatus" TEXT,
    "midFormStatus" TEXT,
    "secondaryMidFormStatus" TEXT,
    "asdFormStatus" TEXT,
    "secondaryAsdFormStatus" TEXT,
    "chronicFormStatus" TEXT,
    "secondaryChronicFormStatus" TEXT,
    "physicalFormStatus" TEXT,
    "secondaryPhysicalFormStatus" TEXT,
    "deafFormStatus" TEXT,
    "secondaryDeafFormStatus" TEXT,
    "mentalHealthFormStatus" TEXT,
    "secondaryMentalHealthFormStatus" TEXT,
    "visionFormStatus" TEXT,
    "secondaryVisionFormStatus" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "chosenName" TEXT,
    "pronoun" TEXT,
    "studentNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "canLeaveMessage" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "eligibleForOsap" TEXT NOT NULL,
    "sourceBeforeTmu" TEXT NOT NULL,
    "levelOfStudy" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "specializedProgram" TEXT NOT NULL,
    "involvesPracticums" TEXT NOT NULL,
    "yearOfStudy" TEXT NOT NULL,
    "startNextCourse" TEXT NOT NULL,
    "coursesNextSemester" TEXT NOT NULL,
    "anticipatedGraduation" TEXT NOT NULL,
    "disabilityImpact" TEXT NOT NULL,
    "receivedAccommodationsBefore" TEXT NOT NULL,
    "previousAccommodations" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "currentSupport" TEXT,
    "strengths" TEXT NOT NULL,
    "academicChallenges" TEXT NOT NULL,
    "academicChallengesDetails" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "IntakeFormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntroConsentSectionData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "consent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "IntroConsentSectionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentOSAPFormData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "socialInsuranceNumber" TEXT NOT NULL,
    "studentNumber" TEXT NOT NULL,
    "oen" TEXT,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "address" JSONB NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL,
    "optionalConsent" BOOLEAN,
    "signature" TEXT NOT NULL,
    "signatureDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "StudentOSAPFormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentDisabilitySectionData" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "primaryDisability" TEXT NOT NULL,
    "secondaryDisabilities" JSONB NOT NULL,
    "secondaryDisability" TEXT,
    "abiFormStatus" TEXT,
    "secondaryAbiFormStatus" TEXT,
    "adhdFormStatus" TEXT,
    "secondaryAdhdFormStatus" TEXT,
    "ldFormStatus" TEXT,
    "secondaryLdFormStatus" TEXT,
    "midFormStatus" TEXT,
    "secondaryMidFormStatus" TEXT,
    "asdFormStatus" TEXT,
    "secondaryAsdFormStatus" TEXT,
    "chronicFormStatus" TEXT,
    "secondaryChronicFormStatus" TEXT,
    "physicalFormStatus" TEXT,
    "secondaryPhysicalFormStatus" TEXT,
    "deafFormStatus" TEXT,
    "secondaryDeafFormStatus" TEXT,
    "mentalHealthFormStatus" TEXT,
    "secondaryMentalHealthFormStatus" TEXT,
    "visionFormStatus" TEXT,
    "secondaryVisionFormStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "StudentDisabilitySectionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInfoSectionData" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "chosenName" TEXT,
    "pronoun" TEXT,
    "studentNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "canLeaveMessage" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "eligibleForOsap" TEXT NOT NULL,
    "sourceBeforeTmu" TEXT NOT NULL,
    "levelOfStudy" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "specializedProgram" TEXT NOT NULL,
    "involvesPracticums" TEXT NOT NULL,
    "yearOfStudy" TEXT NOT NULL,
    "startNextCourse" TEXT NOT NULL,
    "coursesNextSemester" TEXT NOT NULL,
    "anticipatedGraduation" TEXT NOT NULL,
    "disabilityImpact" TEXT NOT NULL,
    "receivedAccommodationsBefore" TEXT NOT NULL,
    "previousAccommodations" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "currentSupport" TEXT,
    "strengths" TEXT NOT NULL,
    "academicChallenges" TEXT NOT NULL,
    "academicChallengesDetails" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "PersonalInfoSectionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PractitionerFormData" (
    "id" TEXT NOT NULL,
    "practitionerName" TEXT NOT NULL,
    "licenseNo" TEXT NOT NULL,
    "qualified" BOOLEAN NOT NULL,
    "specialty" TEXT NOT NULL,
    "otherSpecialty" TEXT,
    "otherSpecialistPhysician" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "PractitionerFormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentHistoryData" (
    "id" TEXT NOT NULL,
    "duration" JSONB NOT NULL,
    "continue" TEXT NOT NULL,
    "methods" TEXT NOT NULL,
    "otherMethodDetails" TEXT,
    "diagnosticOptions" TEXT,
    "methodDates" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "AssessmentHistoryData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisabilityConfirmationData" (
    "id" SERIAL NOT NULL,
    "disability" TEXT NOT NULL,
    "startDate" TEXT,
    "endDate" TEXT,
    "nature" TEXT NOT NULL,
    "primaryNature" TEXT NOT NULL,
    "additionalDiagnoses" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "DisabilityConfirmationData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendationFormData" (
    "id" TEXT NOT NULL,
    "recommendations" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "RecommendationFormData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OSAPDisabilityConfirmationData" (
    "id" TEXT NOT NULL,
    "patient" JSONB NOT NULL,
    "physician" JSONB NOT NULL,
    "disabilityStatus" TEXT NOT NULL,
    "disabilities" JSONB NOT NULL,
    "psychoEducationalAssessment" BOOLEAN,
    "assessmentDate" TIMESTAMP(3),
    "learningDisabilityConfirmed" BOOLEAN,
    "mobilityImpacts" JSONB NOT NULL,
    "cognitiveImpacts" JSONB NOT NULL,
    "signature" TEXT NOT NULL,
    "signatureDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account" TEXT NOT NULL,
    "signedMessage" TEXT NOT NULL,

    CONSTRAINT "OSAPDisabilityConfirmationData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practitioners" (
    "id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "healthCarePractitionerType" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "acceptingNewClients" "AcceptingNewClients" NOT NULL,
    "languages" TEXT[],
    "appointmentTypes" TEXT[],
    "servicesProvided" TEXT[],
    "businessName" TEXT NOT NULL,
    "businessWebsite" TEXT,
    "businessAddress" TEXT NOT NULL,
    "bookingEmailAddress" TEXT NOT NULL,
    "bookingPhoneNumber" TEXT NOT NULL,
    "onlineBookingURL" TEXT,
    "faxNumber" TEXT,
    "bio" TEXT NOT NULL,

    CONSTRAINT "practitioners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_stdID_key" ON "users"("stdID");

-- CreateIndex
CREATE UNIQUE INDEX "users_walletID_key" ON "users"("walletID");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_email_key" ON "doctors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_walletID_key" ON "doctors"("walletID");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicFunctionFormData" ADD CONSTRAINT "AcademicFunctionFormData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessibilityFormData" ADD CONSTRAINT "AccessibilityFormData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentHistoryFormData" ADD CONSTRAINT "AssessmentHistoryFormData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidirectionalConsentFormData" ADD CONSTRAINT "BidirectionalConsentFormData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabilityConfirmationFormData" ADD CONSTRAINT "DisabilityConfirmationFormData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthPractitionerFormData" ADD CONSTRAINT "HealthPractitionerFormData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntakeFormData" ADD CONSTRAINT "IntakeFormData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntroConsentSectionData" ADD CONSTRAINT "IntroConsentSectionData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOSAPFormData" ADD CONSTRAINT "StudentOSAPFormData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentDisabilitySectionData" ADD CONSTRAINT "StudentDisabilitySectionData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalInfoSectionData" ADD CONSTRAINT "PersonalInfoSectionData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PractitionerFormData" ADD CONSTRAINT "PractitionerFormData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentHistoryData" ADD CONSTRAINT "AssessmentHistoryData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabilityConfirmationData" ADD CONSTRAINT "DisabilityConfirmationData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationFormData" ADD CONSTRAINT "RecommendationFormData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OSAPDisabilityConfirmationData" ADD CONSTRAINT "OSAPDisabilityConfirmationData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practitioners" ADD CONSTRAINT "practitioners_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
