import { NextRequest, NextResponse } from 'next/server'; // Import necessary modules from Next.js server
import { PrismaClient } from '@prisma/client'; // Import PrismaClient from Prisma
import { z } from 'zod'; // Import zod for schema validation

// Initialize PrismaClient instance
const prisma = new PrismaClient();

// Define the schema for the form using zod
const formSchema = z.object({
  primaryDisability: z.enum([
    "Acquired Brain Injury (ABI/TBI)",
    "Attention Deficit Hyperactivity Disorder (ADHD)",
    "Autism Spectrum Disorder (ASD)",
    "Chronic Health/Medical (eg. chronic pain, epilepsy)",
    "Deaf, Deafened, Hard of Hearing",
    "Learning Disability (LD)",
    "Low Vision, Blind",
    "Mental Health (eg. anxiety, depression)",
    "Physical/Functional/Mobility",
    "Mild Intellectual Disability (MID)"
  ]),
  secondaryDisabilities: z.array(z.string()),
  secondaryDisability: z.enum([
    "Acquired Brain Injury (ABI/TBI)",
    "Attention Deficit Hyperactivity Disorder (ADHD)",
    "Autism Spectrum Disorder (ASD)",
    "Chronic Health/Medical (eg. chronic pain, epilepsy)",
    "Deaf, Deafened, Hard of Hearing",
    "Learning Disability (LD)",
    "Low Vision, Blind",
    "Mental Health (eg. anxiety, depression)",
    "Physical/Functional/Mobility",
    "Mild Intellectual Disability (MID)"
  ]).optional(),
  abiFormStatus: z.string().optional(),
  secondaryAbiFormStatus: z.string().optional(),
  adhdFormStatus: z.string().optional(),
  secondaryAdhdFormStatus: z.string().optional(),
  ldFormStatus: z.string().optional(),
  secondaryLdFormStatus: z.string().optional(),
  midFormStatus: z.string().optional(),
  secondaryMidFormStatus: z.string().optional(),
  asdFormStatus: z.string().optional(),
  secondaryAsdFormStatus: z.string().optional(),
  chronicFormStatus: z.string().optional(),
  secondaryChronicFormStatus: z.string().optional(),
  physicalFormStatus: z.string().optional(),
  secondaryPhysicalFormStatus: z.string().optional(),
  deafFormStatus: z.string().optional(),
  secondaryDeafFormStatus: z.string().optional(),
  mentalHealthFormStatus: z.string().optional(),
  secondaryMentalHealthFormStatus: z.string().optional(),
  visionFormStatus: z.string().optional(),
  secondaryVisionFormStatus: z.string().optional(),
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
      primaryDisability,
      secondaryDisabilities,
      secondaryDisability,
      abiFormStatus,
      secondaryAbiFormStatus,
      adhdFormStatus,
      secondaryAdhdFormStatus,
      ldFormStatus,
      secondaryLdFormStatus,
      midFormStatus,
      secondaryMidFormStatus,
      asdFormStatus,
      secondaryAsdFormStatus,
      chronicFormStatus,
      secondaryChronicFormStatus,
      physicalFormStatus,
      secondaryPhysicalFormStatus,
      deafFormStatus,
      secondaryDeafFormStatus,
      mentalHealthFormStatus,
      secondaryMentalHealthFormStatus,
      visionFormStatus,
      secondaryVisionFormStatus,
      userId,
      account,
      signedMessage,
    } = validatedData;

    // Create a new entry in the database with the validated data
    const createdForm = await prisma.studentDisabilitySectionData.create({
      data: {
        primaryDisability,
        secondaryDisabilities: JSON.stringify(secondaryDisabilities),
        secondaryDisability,
        abiFormStatus,
        secondaryAbiFormStatus,
        adhdFormStatus,
        secondaryAdhdFormStatus,
        ldFormStatus,
        secondaryLdFormStatus,
        midFormStatus,
        secondaryMidFormStatus,
        asdFormStatus,
        secondaryAsdFormStatus,
        chronicFormStatus,
        secondaryChronicFormStatus,
        physicalFormStatus,
        secondaryPhysicalFormStatus,
        deafFormStatus,
        secondaryDeafFormStatus,
        mentalHealthFormStatus,
        secondaryMentalHealthFormStatus,
        visionFormStatus,
        secondaryVisionFormStatus,
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
