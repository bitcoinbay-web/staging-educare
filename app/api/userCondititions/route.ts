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
      PractitionerFormData: user.PractitionerFormData.length > 0 ? user.PractitionerFormData[0] : false,
      accessibilityFormData: user.accessibilityFormData.length > 0 ? user.accessibilityFormData[0] : false,
      AssessmentHistoryData: user.AssessmentHistoryData.length > 0 ? user.AssessmentHistoryData[0] : false,
      DisabilityConfirmationData: user.DisabilityConfirmationData.length > 0 ? user.DisabilityConfirmationData[0] : false,
      academicFunctionFormData: user.academicFunctionFormData.length > 0 ? user.academicFunctionFormData[0] : false,
      StudentOSAPFormData: user.StudentOSAPFormData.length > 0 ? user.StudentOSAPFormData[0] : false,
      OSAPDisabilityConfirmationData: user.OSAPDisabilityConfirmationData.length > 0 ? user.OSAPDisabilityConfirmationData[0] : false,
      RecommendationFormData: user.RecommendationFormData.length > 0 ? user.RecommendationFormData[0] : false
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
