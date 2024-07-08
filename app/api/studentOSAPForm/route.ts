import { NextRequest, NextResponse } from 'next/server'; // Import necessary modules from Next.js server
import { PrismaClient } from '@prisma/client'; // Import PrismaClient from Prisma
import { z } from 'zod'; // Import zod for schema validation

// Initialize PrismaClient instance
const prisma = new PrismaClient();

// Define the schema for the form using zod
const studentOSAPSchema = z.object({
  schoolName: z.string().nonempty("School name is required"),
  socialInsuranceNumber: z.string().nonempty("Social Insurance Number is required"),
  studentNumber: z.string().nonempty("Student number is required"),
  oen: z.string().optional(),
  lastName: z.string().nonempty("Last name is required"),
  firstName: z.string().nonempty("First name is required"),
  dateOfBirth: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Valid date is required" }),
  address: z.object({
    street: z.string().nonempty("Street is required"),
    apartment: z.string().optional(),
    city: z.string().nonempty("City is required"),
    province: z.string().nonempty("Province is required"),
    postalCode: z.string().nonempty("Postal code is required"),
    country: z.string().nonempty("Country is required"),
  }),
  phoneNumber: z.string().nonempty("Phone number is required"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Consent is required",
  }),
  optionalConsent: z.boolean().optional(),
  signature: z.string().nonempty("Signature is required"),
  signatureDate: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Valid date is required" }),
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
    const validatedData = studentOSAPSchema.parse(body);

    const {
      schoolName,
      socialInsuranceNumber,
      studentNumber,
      oen,
      lastName,
      firstName,
      dateOfBirth,
      address,
      phoneNumber,
      consent,
      optionalConsent,
      signature,
      signatureDate,
      userId,
      account,
      signedMessage,
    } = validatedData;

    // Create a new entry in the database with the validated data
    const createdForm = await prisma.studentOSAPFormData.create({
      data: {
        schoolName,
        socialInsuranceNumber,
        studentNumber,
        oen,
        lastName,
        firstName,
        dateOfBirth: new Date(dateOfBirth),
        address: JSON.stringify(address),
        phoneNumber,
        consent,
        optionalConsent,
        signature,
        signatureDate: new Date(signatureDate),
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
