import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const test = url.searchParams.get('test');
    console.log(test)
    const users = await prisma.user.findMany({
      include: {
        accessibilityFormData: true,
        StudentOSAPFormData: true,
        PractitionerFormData: true,
        AssessmentHistoryData: true,
        DisabilityConfirmationData: true,
        academicFunctionFormData: true,
        OSAPDisabilityConfirmationData: true,
        RecommendationFormData: true,
        IntakeFormData: true,
        studentDisabilitySectionData: true,
        personalInfoSectionData: true,
        doctor: {
          include: {
            practitionerForm: true,
          },
        },
      },
    });

    // Transform the fetched data for the response
    const result = users.flatMap((user) => {
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        doctorId: user.doctorId,
      };

      const includeAccessibilityFormData =
        user.accessibilityFormData.length > 0 &&
        user.PractitionerFormData.length > 0 &&
        user.AssessmentHistoryData.length > 0 &&
        user.DisabilityConfirmationData.length > 0 &&
        user.academicFunctionFormData.length > 0 &&
        user.RecommendationFormData.length > 0;

      const includeStudentOSAPFormData =
        user.OSAPDisabilityConfirmationData.length > 0 &&
        user.doctor?.practitionerForm.length > 0;

      const includeAdditionalForms =
        user.IntakeFormData.length > 0 &&
        user.studentDisabilitySectionData.length > 0 &&
        user.personalInfoSectionData.length > 0;

      // Map the data to the required format
      const accessibilityFormDataEntries = includeAccessibilityFormData
        ? user.accessibilityFormData.map((form) => ({
            ...userData,
            formType: 'AccessibilityFormData',
            formData: form,
          }))
        : [];

      const studentOSAPFormDataEntries = includeStudentOSAPFormData
        ? user.StudentOSAPFormData.map((form) => ({
            ...userData,
            formType: 'StudentOSAPFormData',
            formData: form,
          }))
        : [];

      const intakeFormDataEntries = includeAdditionalForms
        ? user.IntakeFormData.map((form) => ({
            ...userData,
            formType: 'IntakeFormData',
            formData: form,
          }))
        : [];

      const studentDisabilitySectionDataEntries = includeAdditionalForms
        ? user.studentDisabilitySectionData.map((form) => ({
            ...userData,
            formType: 'StudentDisabilitySectionData',
            formData: form,
          }))
        : [];

      const personalInfoSectionDataEntries = includeAdditionalForms
        ? user.personalInfoSectionData.map((form) => ({
            ...userData,
            formType: 'PersonalInfoSectionData',
            formData: form,
          }))
        : [];

      return [
        ...accessibilityFormDataEntries,
        ...studentOSAPFormDataEntries,
        ...intakeFormDataEntries,
        ...studentDisabilitySectionDataEntries,
        ...personalInfoSectionDataEntries,
      ];
    });

    // Set no-cache headers to ensure real-time data
    const response = NextResponse.json(result, { status: 200 });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    return response;
  } catch (error) {
    console.error('Error fetching users and form data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users and form data' },
      { status: 500 }
    );
  }
}
