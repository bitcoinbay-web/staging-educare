import { NextRequest, NextResponse } from 'next/server'; 
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      gender,
      phoneNumber,
      healthCarePractitionerType,
      licenseNumber,
      acceptingNewClients,
      languages,
      appointmentTypes,
      servicesProvided,
      businessName,
      businessWebsite,
      businessAddress,
      bookingEmailAddress,
      bookingPhoneNumber,
      onlineBookingURL,
      faxNumber,
      bio,
      userId,
      account,
      signedMessage,
    } = body;

    const doctor = await prisma.doctor.findUnique({
      where: { id: userId },
      include: { practitionerForm: true },
    });

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    // Check if the doctor has already filled a practitioner form
    if (doctor.practitionerForm.length > 0) {
      return NextResponse.json({ error: 'Practitioner form already filled' }, { status: 400 });
    }

    const createdPractitioner = await prisma.practitioner.create({
      data: {
        doctorId: doctor.id,
        phoneNumber,
        gender,
        healthCarePractitionerType,
        licenseNumber,
        acceptingNewClients,
        languages,
        appointmentTypes,
        servicesProvided,
        businessName,
        businessWebsite,
        businessAddress,
        bookingEmailAddress,
        bookingPhoneNumber,
        onlineBookingURL,
        faxNumber,
        bio,
        account,
        signedMessage,
      },
    });

    return NextResponse.json(createdPractitioner, { status: 201 });
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
