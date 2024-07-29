import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const formSchema = z.object({
  email: z.string().email(),
  consent: z.enum(["yes", "no"]),
  userId: z.string(),
  account: z.string(),
  signedMessage: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const { email, consent, userId, account, signedMessage } = validatedData;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingForm = await prisma.introConsentSectionData.findFirst({
      where: { userId },
    });

    if (existingForm) {
      return NextResponse.json(
        { error: "Form already exists for this user" },
        { status: 400 }
      );
    }

    const createdForm = await prisma.introConsentSectionData.create({
      data: {
        email,
        consent,
        account,
        signedMessage,
        user: { 
          connect: { id: userId }, 
        },
      },
    });

    return NextResponse.json(createdForm, { status: 201 });
  } catch (error) {
    console.error("Error creating form data:", error);
    return NextResponse.json(
      { error: "Failed to save form data" },
      { status: 500 }
    );
  }
}

