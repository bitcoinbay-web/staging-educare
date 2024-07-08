import { NextRequest, NextResponse } from 'next/server'; // Import necessary modules from Next.js server
import { PrismaClient } from '@prisma/client'; // Import PrismaClient from Prisma
import { z } from 'zod'; // Import zod for schema validation

// Initialize PrismaClient instance
const prisma = new PrismaClient();

// Define the schema for the form using zod
const formSchema = z.object({
  patient: z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    dateOfBirth: z.date().refine(date => !isNaN(date.getTime()), { message: "Valid date is required" }),
  }),
  physician: z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    specialty: z.string().nonempty("Specialty is required"),
    phoneNumber: z.string().nonempty("Phone number is required"),
    licenseNumber: z.string().nonempty("License number is required"),
    facilityNameAndAddress: z.string().nonempty("Facility name and address is required"),
  }),
  disabilityStatus: z.string().nonempty("Disability status is required"),
  disabilities: z.array(z.string()).nonempty("At least one disability must be selected"),
  psychoEducationalAssessment: z.boolean().optional(),
  assessmentDate: z.date().optional(),
  learningDisabilityConfirmed: z.boolean().optional(),
  mobilityImpacts: z.array(z.string()).optional(),
  cognitiveImpacts: z.array(z.string()).optional(),
  signature: z.string().nonempty("Signature is required"),
  signatureDate: z.date().refine(date => !isNaN(date.getTime()), { message: "Valid date is required" }),
  userId: z.string(),
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
      patient,
      physician,
      disabilityStatus,
      disabilities,
      psychoEducationalAssessment,
      assessmentDate,
      learningDisabilityConfirmed,
      mobilityImpacts,
      cognitiveImpacts,
      signature,
      signatureDate,
      userId,
      account,
      signedMessage,
    } = validatedData;

    // Create a new entry in the database with the validated data
    const createdForm = await prisma.oSAPDisabilityConfirmationData.create({
      data: {
        patient: JSON.stringify(patient),
        physician: JSON.stringify(physician),
        disabilityStatus,
        disabilities: JSON.stringify(disabilities),
        psychoEducationalAssessment,
        assessmentDate,
        learningDisabilityConfirmed,
        mobilityImpacts: JSON.stringify(mobilityImpacts),
        cognitiveImpacts: JSON.stringify(cognitiveImpacts),
        signature,
        signatureDate,
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
