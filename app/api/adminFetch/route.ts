import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
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
            practitionerForm: true
          }
        }
      },
    });

    const result = users.flatMap(user => {
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        doctorId: user.doctorId,
      };

      const includeAccessibilityFormData = user.accessibilityFormData.some(form => form.status === 'pending') &&
        user.PractitionerFormData.length > 0 &&
        user.AssessmentHistoryData.length > 0 &&
        user.DisabilityConfirmationData.length > 0 &&
        user.academicFunctionFormData.length > 0 &&
        user.RecommendationFormData.length > 0;

      const includeStudentOSAPFormData = user.StudentOSAPFormData.some(form => form.status === 'pending') &&
        user.OSAPDisabilityConfirmationData.length > 0 &&
        user.doctor?.practitionerForm.length > 0;

      const includeAdditionalForms = user.IntakeFormData.some(form => form.status === 'pending') &&
        user.studentDisabilitySectionData.some(form => form.status === 'pending') &&
        user.personalInfoSectionData.some(form => form.status === 'pending');

      const accessibilityFormDataEntries = includeAccessibilityFormData
        ? user.accessibilityFormData
            .filter(form => form.status === 'pending')
            .map(form => ({
              ...userData,
              formType: 'AccessibilityFormData',
              formData: form,
            }))
        : [];

      const studentOSAPFormDataEntries = includeStudentOSAPFormData
        ? user.StudentOSAPFormData
            .filter(form => form.status === 'pending')
            .map(form => ({
              ...userData,
              formType: 'StudentOSAPFormData',
              formData: form,
            }))
        : [];

      const intakeFormDataEntries = includeAdditionalForms
        ? user.IntakeFormData
            .filter(form => form.status === 'pending')
            .map(form => ({
              ...userData,
              formType: 'IntakeFormData',
              formData: form,
            }))
        : [];

      const studentDisabilitySectionDataEntries = includeAdditionalForms
        ? user.studentDisabilitySectionData
            .filter(form => form.status === 'pending')
            .map(form => ({
              ...userData,
              formType: 'StudentDisabilitySectionData',
              formData: form,
            }))
        : [];

      const personalInfoSectionDataEntries = includeAdditionalForms
        ? user.personalInfoSectionData
            .filter(form => form.status === 'pending')
            .map(form => ({
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

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching users and form data:', error);
    return NextResponse.json({ error: 'Failed to fetch users and form data' }, { status: 500 });
  }
}
