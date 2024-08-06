import { NextRequest, NextResponse } from 'next/server'; 
import { PrismaClient } from '@prisma/client'; 
import { z } from 'zod';

const prisma = new PrismaClient();

const additionalDiagnosisSchema = z.object({
  diagnosis: z.string(),
  date: z.string(),
  byPractitioner: z.enum(["yes", "no"]),
});

const formSchema = z.object({
  disability: z.enum(["permanent", "temporary", "persistent"]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  nature: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  primaryNature: z.enum([
    "acquired",
    "adhd",
    "autism",
    "chronic",
    "hearing",
    "vision",
    "mental",
    "physical",
    "other",
  ]),
  additionalDiagnoses: z.array(additionalDiagnosisSchema).optional(),
  userId: z.string(),
  account: z.string(),
  signedMessage: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const {
      disability,
      startDate,
      endDate,
      nature,
      primaryNature,
      additionalDiagnoses,
      userId,
      account,
      signedMessage,
    } = validatedData;

    // Check if the user already has a filled form
    const userWithForm = await prisma.user.findUnique({
      where: { id: userId },
      include: { DisabilityConfirmationData: true },
    });

    if (userWithForm?.DisabilityConfirmationData.length > 0) {
      return NextResponse.json({ error: 'Form already filled' }, { status: 400 });
    }

    // Create a new entry in the database
    const createdForm = await prisma.disabilityConfirmationData.create({
      data: {
        disability,
        startDate,
        endDate,
        nature: JSON.stringify(nature),
        primaryNature,
        additionalDiagnoses: JSON.stringify(additionalDiagnoses),
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
