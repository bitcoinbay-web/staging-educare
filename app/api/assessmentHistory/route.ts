import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const formSchema = z.object({
  duration: z.object({
    value: z.string().nonempty("Duration value is required"),
    type: z.enum(["days", "weeks", "months", "years"], { required_error: "Duration type is required" }),
  }),
  continue: z.enum(['yes', 'no', 'unknown']),
  methods: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item."
  }),
  otherMethodDetails: z.string().optional(),
  diagnosticOptions: z.array(z.string()).optional(),
  methodDates: z.record(z.string(), z.string().optional()).optional(),
  userId: z.string(),
  account: z.string(),
  signedMessage: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const {
      duration,
      continue: continueAssessment,
      methods,
      otherMethodDetails,
      diagnosticOptions,
      methodDates,
      userId,
      account,
      signedMessage,
    } = validatedData;

    // Check if the user already has a filled form
    const userWithForm = await prisma.user.findUnique({
      where: { id: userId },
      include: { AssessmentHistoryData: true },
    });

    if (userWithForm?.AssessmentHistoryData.length > 0) {
      return NextResponse.json({ error: 'Form already filled' }, { status: 400 });
    }

    const createdForm = await prisma.assessmentHistoryData.create({
      data: {
        duration,
        continue: continueAssessment,
        methods: JSON.stringify(methods),
        otherMethodDetails,
        diagnosticOptions: JSON.stringify(diagnosticOptions),
        methodDates: JSON.stringify(methodDates),
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
