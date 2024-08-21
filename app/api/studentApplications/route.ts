import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json({ error: 'studentId query parameter is required' }, { status: 400 });
    }

    const users = await prisma.user.findMany({
      where: { id: studentId },
      include: {
        accessibilityFormData: true,
        StudentOSAPFormData: true,
        // PractitionerFormData: true,
        // AssessmentHistoryData: true,
        // DisabilityConfirmationData: true,
        // academicFunctionFormData: true,
        // OSAPDisabilityConfirmationData: true,
        // RecommendationFormData: true
      },
    });
    const result = users.flatMap(user => {
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    

      const accessibilityFormDataEntries = user.accessibilityFormData.map(form => ({
            ...userData,
            formType: 'AccessibilityFormData',
            formData: form,
          }))

      const studentOSAPFormDataEntries = user.StudentOSAPFormData.map(form => ({
            ...userData,
            formType: 'StudentOSAPFormData',
            formData: form,
          }))
      return [
        ...accessibilityFormDataEntries,
        ...studentOSAPFormDataEntries,
      ];
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching users and form data:', error);
    return NextResponse.json({ error: 'Failed to fetch users and form data' }, { status: 500 });
  }
}
