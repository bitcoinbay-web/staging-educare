import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';
import { PrismaClient } from '@prisma/client';
import { Readable } from 'stream';

const prisma = new PrismaClient();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    const email = formData.get('email') as string;

    if (!file || !email) {
      return NextResponse.json({ error: 'Missing file or email' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResponse = await imagekit.upload({
      file: buffer, 
      fileName: file.name,
    });

    const imageUrl = uploadResponse.url;
    
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { image: imageUrl },
    });

    return NextResponse.json({ status: 201, data: updatedUser }, { status: 201 });

  } catch (error) {
    console.error('Error creating form data:', error);
    return NextResponse.json({ error: 'Failed to save form data' }, { status: 500 });
  }
}
