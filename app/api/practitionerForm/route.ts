import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const formSchema = z.object({
  practitionerName: z.string().min(2).max(50),
  licenseNo: z.string().min(1, { message: "License number is required" }),
  qualified: z.boolean(),
  specialty: z.enum([
    "family",
    "psychiatrist",
    "psychologist",
    "otherPhysician",
    "other",
  ]),
  otherSpecialty: z.string().optional(),
  otherSpecialistPhysician: z.string().optional(),
  userId: z.string(),
  account: z.string(),
  signedMessage: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const {
      practitionerName,
      licenseNo,
      qualified,
      specialty,
      otherSpecialty,
      otherSpecialistPhysician,
      userId,
      account,
      signedMessage,
    } = validatedData;

    const userWithForm = await prisma.user.findUnique({
      where: { id: userId },
      include: { PractitionerFormData: true },
    });

    if (userWithForm?.PractitionerFormData.length > 0) {
      return NextResponse.json({ error: 'Form already filled' }, { status: 400 });
    }

    const createdForm = await prisma.practitionerFormData.create({
      data: {
        practitionerName,
        licenseNo,
        qualified,
        specialty,
        otherSpecialty,
        otherSpecialistPhysician,
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
