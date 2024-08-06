import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const studentId = url.searchParams.get('studentId');
    const formType = url.searchParams.get('formType');

    if (!studentId || !formType) {
      return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: studentId },
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
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let formDataEntries: any[] = [];
    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        doctorId: user.doctorId,
      };

    switch (formType) {
      case 'accessibility':
        if (user.accessibilityFormData.some(form => form.status === 'pending') &&
          user.PractitionerFormData.length > 0 &&
          user.AssessmentHistoryData.length > 0 &&
          user.DisabilityConfirmationData.length > 0 &&
          user.academicFunctionFormData.length > 0 &&
          user.RecommendationFormData.length > 0) {
          formDataEntries = user.accessibilityFormData
            .filter(form => form.status === 'pending')
            .map(form => ({
              ...userData,
              formType: 'AccessibilityFormData',
              formData: form,
              associatedForms: {
                PractitionerFormData: user.PractitionerFormData[0],
                AssessmentHistoryData: user.AssessmentHistoryData[0],
                DisabilityConfirmationData: user.DisabilityConfirmationData[0],
                academicFunctionFormData: user.academicFunctionFormData[0],
                RecommendationFormData: user.RecommendationFormData[0],
              }
            }));
        }
        break;

      case 'osap':
        if (user.StudentOSAPFormData.some(form => form.status === 'pending') &&
          user.OSAPDisabilityConfirmationData.length > 0 &&
          user.doctor?.practitionerForm.length > 0) {
          formDataEntries = user.StudentOSAPFormData
            .filter(form => form.status === 'pending')
            .map(form => ({
              ...userData,
              formType: 'StudentOSAPFormData',
              formData: form,
              associatedForms: {
                OSAPDisabilityConfirmationData: user.OSAPDisabilityConfirmationData[0],
                practitionerForm: user.doctor?.practitionerForm[0],
              }
            }));
        }
        break;

      case 'intake':
        if (user.IntakeFormData.some(form => form.status === 'pending')) {
          formDataEntries = [
            ...user.IntakeFormData
              .filter(form => form.status === 'pending')
              .map(form => ({
                ...userData,
                formType: 'IntakeFormData',
                formData: form,
              }))
          ];
        }
        break;

      case 'disability':
        formDataEntries = user.DisabilityConfirmationData
          .filter((form:any) => form.status === 'pending')
          .map(form => ({
            ...userData,
            formType: 'DisabilityConfirmationData',
            formData: form,
          }));
        break;

      case 'personalInfo':
        formDataEntries = user.personalInfoSectionData
          .filter(form => form.status === 'pending')
          .map(form => ({
            ...userData,
            formType: 'PersonalInfoSectionData',
            formData: form,
          }));
        break;

      default:
        return NextResponse.json({ error: 'Invalid formType parameter' }, { status: 400 });
    }

    return NextResponse.json(formDataEntries, { status: 200 });
  } catch (error) {
    console.error('Error fetching user and form data:', error);
    return NextResponse.json({ error: 'Failed to fetch user and form data' }, { status: 500 });
  }
}
