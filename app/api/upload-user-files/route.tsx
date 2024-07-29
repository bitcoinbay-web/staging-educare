import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(req: Request) {
  try {
  

    return NextResponse.json({ status: 201 });

  } catch (error) {
    console.error('Error creating form data:', error);
    return NextResponse.json({ error: 'Failed to save form data' }, { status: 500 });
  }
}
