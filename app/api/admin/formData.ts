// pages/api/admin/formData.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API handler called with method:', req.method);
  try {
    const academicFunctionFormData = await prisma.academicFunctionFormData.findMany();
    const accessibilityFormData = await prisma.accessibilityFormData.findMany();
    const assessmentHistoryFormData = await prisma.assessmentHistoryFormData.findMany();
    const bidirectionalConsentFormData = await prisma.bidirectionalConsentFormData.findMany();
    const disabilityConfirmationFormData = await prisma.disabilityConfirmationFormData.findMany();
    const healthPractitionerFormData = await prisma.healthPractitionerFormData.findMany();
    const intakeFormData = await prisma.intakeFormData.findMany();
    const introConsentSectionData = await prisma.introConsentSectionData.findMany();
    const studentOsapFormData = await prisma.studentOSAPFormData.findMany();
    const studentDisabilitySectionData = await prisma.studentDisabilitySectionData.findMany();
    const personalInfoSectionData = await prisma.personalInfoSectionData.findMany();
    const practitionerFormData = await prisma.practitionerFormData.findMany();
    const assessmentHistoryData = await prisma.assessmentHistoryData.findMany();
    const disabilityConfirmationData = await prisma.disabilityConfirmationData.findMany();
    const recommendationFormData = await prisma.recommendationFormData.findMany();
    const osapDisabilityConfirmationData = await prisma.oSAPDisabilityConfirmationData.findMany();

    res.status(200).json({
      academicFunctionFormData,
      accessibilityFormData,
      assessmentHistoryFormData,
      bidirectionalConsentFormData,
      disabilityConfirmationFormData,
      healthPractitionerFormData,
      intakeFormData,
      introConsentSectionData,
      studentOsapFormData,
      studentDisabilitySectionData,
      personalInfoSectionData,
      practitionerFormData,
      assessmentHistoryData,
      disabilityConfirmationData,
      recommendationFormData,
      osapDisabilityConfirmationData,
    });
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ error: 'Failed to fetch form data' });
  }
}
