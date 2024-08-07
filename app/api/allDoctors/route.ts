import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const test = url.searchParams.get('test');
    console.log(test)
    const doctors = await prisma.doctor.findMany();
    // console.log(doctors)
    return NextResponse.json(doctors, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}
