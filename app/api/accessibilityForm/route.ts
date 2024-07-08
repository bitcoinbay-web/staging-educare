import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const formSchema = z.object({
  studentName: z.string().min(2).max(50),
  studentId: z.coerce.number().nonnegative(),
  phoneNumber: z.coerce.number().nonnegative(),
  email: z.string().email(),
  consent: z.boolean(),
  authorize: z.boolean(),
  userId: z.string(),
  account: z.string(),
  signedMessage: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const {
      studentName,
      studentId,
      phoneNumber,
      email,
      consent,
      authorize,
      userId,
      account,
      signedMessage,
    } = validatedData;

    const createdForm = await prisma.accessibilityFormData.create({
      data: {
        studentName,
        studentId,
        phoneNumber,
        email,
        consent,
        authorize,
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
