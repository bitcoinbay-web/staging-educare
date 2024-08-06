import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        PractitionerFormData: true,
        accessibilityFormData: true,
        AssessmentHistoryData: true,
        DisabilityConfirmationData: true,
        academicFunctionFormData: true,
        StudentOSAPFormData: true,
        OSAPDisabilityConfirmationData: true,
        RecommendationFormData: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      PractitionerFormData: user.PractitionerFormData.length > 0,
      accessibilityFormData: user.accessibilityFormData.length > 0,
      AssessmentHistoryData: user.AssessmentHistoryData.length > 0,
      DisabilityConfirmationData: user.DisabilityConfirmationData.length > 0,
      academicFunctionFormData: user.academicFunctionFormData.length > 0,
      StudentOSAPFormData: user.StudentOSAPFormData.length > 0,
      OSAPDisabilityConfirmationData: user.OSAPDisabilityConfirmationData.length > 0,
      RecommendationFormData: user.RecommendationFormData.length > 0
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
