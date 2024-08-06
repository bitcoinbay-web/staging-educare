import { NextRequest, NextResponse } from 'next/server'; 
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Initialize PrismaClient instance
const prisma = new PrismaClient();

// Define the schema for the form using zod
const formSchema = z.object({
  patient: z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    dateOfBirth: z.string(),
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
  assessmentDate: z.string().optional(),
  learningDisabilityConfirmed: z.boolean().optional(),
  mobilityImpacts: z.array(z.string()).optional(),
  cognitiveImpacts: z.array(z.string()).optional(),
  signature: z.string().nonempty("Signature is required"),
  signatureDate: z.string(),
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

    // Check if the user already has an oSAPDisabilityConfirmationData entry
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { OSAPDisabilityConfirmationData: true },
    });

    if (user?.OSAPDisabilityConfirmationData.length > 0) {
      return NextResponse.json({ error: 'OSAP Disability Confirmation form already submitted' }, { status: 400 });
    }

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

    return NextResponse.json(createdForm, { status: 201 });
  } catch (error) {
    console.error('Error creating form data:', error);
    return NextResponse.json({ error: 'Failed to save form data' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method GET Not Allowed' }, { status: 405 });
}
