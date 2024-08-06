import { NextRequest, NextResponse } from 'next/server'; 
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const formSchema = z.object({
  recommendations: z.string().optional(),
  userId: z.string(),
  account: z.string(),
  signedMessage: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const { 
      recommendations, 
      userId,
      account,
      signedMessage, 
    } = validatedData;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { RecommendationFormData: true }, 
    });
    console.log(user)
    if (user?.RecommendationFormData.length > 0) {
      return NextResponse.json({ error: 'Recommendation form already submitted' }, { status: 400 });
    }

    const createdForm = await prisma.recommendationFormData.create({
      data: {
        recommendations,
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
