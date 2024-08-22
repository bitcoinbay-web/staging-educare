import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get('doctorId');

    if (!doctorId) {
      return NextResponse.json({ error: 'doctorId query parameter is required' }, { status: 400 });
    }

    const users = await prisma.user.findMany({
      where: { doctorId },
      include: {
        accessibilityFormData: true,
        StudentOSAPFormData: true,
        PractitionerFormData: true,
        AssessmentHistoryData: true,
        DisabilityConfirmationData: true,
        academicFunctionFormData: true,
        OSAPDisabilityConfirmationData: true,
        RecommendationFormData: true
      },
    });
    const result = users.flatMap(user => {
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const includeAccessibilityFormData = user.accessibilityFormData.length > 0 &&

        (
          user.PractitionerFormData.length === 0 ||
          user.AssessmentHistoryData.length === 0 ||
          user.DisabilityConfirmationData.length === 0 ||
          user.academicFunctionFormData.length === 0 ||
          user.RecommendationFormData.length === 0
        );
        
      const includeStudentOSAPFormData = user.StudentOSAPFormData.length > 0 &&
        user.OSAPDisabilityConfirmationData.length === 0;

      const accessibilityFormDataEntries = user.accessibilityFormData.map(form => ({
            ...userData,
            formType: 'AccessibilityFormData',
            formData: form,
            isSubmitted : includeAccessibilityFormData
          }))

      const studentOSAPFormDataEntries = user.StudentOSAPFormData.map(form => ({
            ...userData,
            formType: 'StudentOSAPFormData',
            formData: form,
            isSubmitted : includeStudentOSAPFormData
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
