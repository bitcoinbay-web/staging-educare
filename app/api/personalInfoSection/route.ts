import { NextRequest, NextResponse } from 'next/server'; // Import necessary modules from Next.js server
import { PrismaClient } from '@prisma/client'; // Import PrismaClient from Prisma
import { z } from 'zod'; // Import zod for schema validation

// Initialize PrismaClient instance
const prisma = new PrismaClient();

// Define the schema for the form using zod
const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  chosenName: z.string().optional(),
  pronoun: z.string().optional(),
  studentNumber: z.string().min(1),
  phoneNumber: z.string().min(1),
  canLeaveMessage: z.enum(["Yes", "No"]),
  emergencyContact: z.string().min(1),
  eligibleForOsap: z.enum(["Yes", "No", "Not sure"]),
  sourceBeforeTmu: z.enum(["High school", "College", "Another University", "The Workforce", "Other"]),
  levelOfStudy: z.enum(["Undergraduate", "Graduate", "Continuing Education"]),
  faculty: z.enum([
    "Faculty of Arts",
    "Faculty of Community Services",
    "Faculty of Communication and Design",
    "Faculty of Engineering and Architectural Science",
    "The Creative School",
    "Faculty of Science",
    "Faculty of Law",
    "Ted Rogers School of Management",
    "Yeates School of Graduate Studies",
    "Chang School of Continuing Education"
  ]),
  specializedProgram: z.enum(["Law Practice Program (LPP)", "Juris Doctor (JD)", "Midwifery", "Nursing", "N/A"]),
  involvesPracticums: z.enum(["Yes", "No", "Not sure"]),
  yearOfStudy: z.enum(["Incoming Student", "First year", "Second year", "Third year", "Fourth year", "Fifth year", "Other"]),
  startNextCourse: z.enum(["Winter 2024", "Spring/Summer 2024", "Fall 2024", "Other (Fast Track/Acceleration/Intensive Program or Course)", "None of the above"]),
  coursesNextSemester: z.enum(["1", "2", "3", "4", "5", "6+"]),
  anticipatedGraduation: z.string().min(1),
  disabilityImpact: z.string().min(1),
  receivedAccommodationsBefore: z.enum(["Yes", "No", "I'm not sure"]),
  previousAccommodations: z.string().min(1),
  additionalInfo: z.string().optional(),
  currentSupport: z.string().optional(),
  strengths: z.array(z.string()),
  academicChallenges: z.array(z.string()),
  academicChallengesDetails: z.string().min(1),
  userId: z.string().optional(),
  account: z.string(),
  signedMessage: z.string(),
});

// Define the POST request handler
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    // Validate the request body against the schema
    const validatedData = formSchema.parse(body);

    const {
      firstName,
      lastName,
      chosenName,
      pronoun,
      studentNumber,
      phoneNumber,
      canLeaveMessage,
      emergencyContact,
      eligibleForOsap,
      sourceBeforeTmu,
      levelOfStudy,
      faculty,
      specializedProgram,
      involvesPracticums,
      yearOfStudy,
      startNextCourse,
      coursesNextSemester,
      anticipatedGraduation,
      disabilityImpact,
      receivedAccommodationsBefore,
      previousAccommodations,
      additionalInfo,
      currentSupport,
      strengths,
      academicChallenges,
      academicChallengesDetails,
      userId,
      account,
      signedMessage,
    } = validatedData;

    // Create a new entry in the database with the validated data
    const createdForm = await prisma.personalInfoSectionData.create({
      data: {
        firstName,
        lastName,
        chosenName,
        pronoun,
        studentNumber,
        phoneNumber,
        canLeaveMessage,
        emergencyContact,
        eligibleForOsap,
        sourceBeforeTmu,
        levelOfStudy,
        faculty,
        specializedProgram,
        involvesPracticums,
        yearOfStudy,
        startNextCourse,
        coursesNextSemester,
        anticipatedGraduation,
        disabilityImpact,
        receivedAccommodationsBefore,
        previousAccommodations,
        additionalInfo,
        currentSupport,
        strengths: JSON.stringify(strengths),
        academicChallenges: JSON.stringify(academicChallenges),
        academicChallengesDetails,
        userId,
        account,
        signedMessage,
      },
    });

    // Return a successful response with the created form data
    return NextResponse.json(createdForm, { status: 201 });
  } catch (error) {
    console.error('Error creating form data:', error);
    // Return an error response if the form data could not be saved
    return NextResponse.json({ error: 'Failed to save form data' }, { status: 500 });
  }
}

// Define the GET request handler to return a 405 Method Not Allowed response
export function GET() {
  return NextResponse.json({ error: 'Method GET Not Allowed' }, { status: 405 });
}
