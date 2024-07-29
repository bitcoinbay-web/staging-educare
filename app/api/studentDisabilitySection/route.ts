import { NextRequest, NextResponse } from 'next/server'; 
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';


const prisma = new PrismaClient();

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingForm = await prisma.studentDisabilitySectionData.findFirst({
      where: { userId },
    });

    if (existingForm) {
      return NextResponse.json(
        { error: "Form already exists for this user" },
        { status: 400 }
      );
    }

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
        account,
        signedMessage,
        user : {
          connect : {id : userId}
        }
      },
    });

    return NextResponse.json(createdForm, { status: 201 });
  } catch (error) {
    console.error('Error creating form data:', error);
    return NextResponse.json({ error: 'Failed to save form data' }, { status: 500 });
  }
}