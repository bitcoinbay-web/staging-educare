// @ts-nocheck

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendFormStatusUpdateEmail } from "@/lib/mail";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { action, studentID, formType } = await req.json();

    if (!action || !studentID || !formType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const formTypes = {
      'accessibility': 'accessibilityFormData',
      'osap': 'StudentOSAPFormData',
      'intake': 'IntakeFormData',
      'disability': 'StudentDisabilitySectionData',
      'personalInfo': 'PersonalInfoSectionData'
    };

    if (!formTypes[formType]) {
      return NextResponse.json({ error: 'Invalid form type' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: studentID },
      include: {
        [formTypes[formType]]: true, 
        doctor: true 
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const formEntry = user[formTypes[formType]][0];

    if (!formEntry) {
      return NextResponse.json({ error: 'Form entry not found' }, { status: 404 });
    }

    await prisma.user.update({
      where : { id : studentID},
      data : {
        onboarding : action
      }
    })

    await (prisma[formTypes[formType]] as any).update({
      where: { id: formEntry.id },
      data: { status: action }
    });

    const doctor = user.doctor;

    await sendFormStatusUpdateEmail(user.email, formType, action);


    return NextResponse.json({
      status: 'Success',
      message: `Form status updated to ${action}.`
    });
  } catch (error) {
    console.error('Error', error);
    return NextResponse.json({ error: 'Failed to update form status' }, { status: 500 });
  }
}
