import { NextRequest, NextResponse } from 'next/server'; // Import necessary modules from Next.js server
import { PrismaClient } from '@prisma/client'; // Import PrismaClient from Prisma
import { z } from 'zod'; // Import zod for schema validation

// Initialize PrismaClient instance
const prisma = new PrismaClient();

// Define the schema for the form using zod
// const formSchema = z.object({
//   practitionerName: z.string().min(2).max(50),
//   licenseNo: z.string().min(1, { message: "License number is required" }),
//   qualified: z.boolean(),
//   specialty: z.enum([
//     "family",
//     "psychiatrist",
//     "psychologist",
//     "otherPhysician",
//     "other",
//   ]),
//   otherSpecialty: z.string().optional(),
//   otherSpecialistPhysician: z.string().optional(),
//   userId: z.string(),
//   account: z.string(),
//   signedMessage: z.string(),
// });

// // Define the POST request handler
// export async function POST(req: NextRequest) {
//   try {
//     // Parse the request body
//     const body = await req.json();
//     // Validate the request body against the schema
//     const validatedData = formSchema.parse(body);

//     const {
//       practitionerName,
//       licenseNo,
//       qualified,
//       specialty,
//       otherSpecialty,
//       otherSpecialistPhysician,
//       userId,
//       account,
//       signedMessage,
//     } = validatedData;

//     // Create a new entry in the database with the validated data
//     const createdForm = await prisma.practitionerForm.create({
//       data: {
//         practitionerName,
//         licenseNo,
//         qualified,
//         specialty,
//         otherSpecialty,
//         otherSpecialistPhysician,
//         userId,
//         account,
//         signedMessage,
//         doctor: {
//           connect: { id: userId },
//         },
//       },
//     });

//     // Return a successful response with the created form data
//     return NextResponse.json(createdForm, { status: 201 });
//   } catch (error) {
//     console.error('Error creating form data:', error);
//     // Return an error response if the form data could not be saved
//     return NextResponse.json({ error: 'Failed to save form data' }, { status: 500 });
//   }
// }

// Define the GET request handler
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get('doctorId');

  if (!doctorId) {
    return NextResponse.json({ error: 'doctorId query parameter is required' }, { status: 400 });
  }

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      include: { practitionerForm: true },
    });

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    const hasFilledPractitionerForm = doctor.practitionerForm.length > 0;

    return NextResponse.json({ hasFilledPractitionerForm }, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    return NextResponse.json({ error: 'Failed to fetch doctor data' }, { status: 500 });
  }
}
