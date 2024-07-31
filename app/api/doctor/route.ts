import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get('id');

  if (!doctorId) {
    return NextResponse.json({ error: 'Doctor ID is required' }, { status: 400 });
  }

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      include: { practitionerForm: true },
    });

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    const practitioner = doctor.practitionerForm[0];

    if (!practitioner) {
      return NextResponse.json({ error: 'Practitioner form not found' }, { status: 404 });
    }
    
    const responseData = {
      email: doctor.email || '',
      gender: practitioner.gender || '',
      pno: practitioner.phoneNumber || '',
      type: practitioner.healthCarePractitionerType || '',
      lno: practitioner.licenseNumber || '',
      newclients: practitioner.acceptingNewClients === 'Yes' ? 'Yes' : 'No',
      appointmenttype: practitioner.appointmentTypes.join(', ') || '',
      languages: practitioner.languages.join(', ') || '',
      stdforms: 'Accessibility, Disability',
      bsname: practitioner.businessName || '',
      bsweb: practitioner.businessWebsite || '',
      bsemail: practitioner.bookingEmailAddress || '',
      bsaddress: practitioner.businessAddress || '',
      bspno: practitioner.bookingPhoneNumber || '',
      bookingURL: practitioner.onlineBookingURL || '',
      bio: practitioner.bio || '',
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json({ error: 'Failed to fetch doctor' }, { status: 500 });
  }
}
