import { NextRequest, NextResponse } from 'next/server'; // Import necessary modules from Next.js server
import { PrismaClient } from '@prisma/client'; // Import PrismaClient from Prisma
import { z } from 'zod'; // Import zod for schema validation

// Initialize PrismaClient instance
const prisma = new PrismaClient();

// Define the schema for the form using zod
const formSchema = z.object({
  email: z.string().email().nonempty(),
  studentNumber: z.string().min(1, "Student number is required"),
  externalPartyName: z.string().min(1, "External party name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  confirmName: z.string().min(1, "Confirmation name is required"),
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
      email,
      studentNumber,
      externalPartyName,
      relationship,
      confirmName,
      userId,
      account,
      signedMessage,
    } = validatedData;

    // Create a new entry in the database with the validated data
    const createdForm = await prisma.bidirectionalConsentFormData.create({
      data: {
        email,
        studentNumber,
        externalPartyName,
        relationship,
        confirmName,
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
