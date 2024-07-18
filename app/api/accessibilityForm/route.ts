import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const formSchema = z.object({
  studentName: z.string().min(2).max(50),
  studentId: z.string().regex(/^[a-zA-Z0-9]+$/),
  phoneNumber: z.coerce.number().nonnegative(),
  email: z.string().email(),
  consent: z.boolean(),
  authorize: z.boolean(),
  userId: z.string(),
  account: z.string(),
  signedMessage: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);
    console.log(validatedData);
    const {
      studentName,
      studentId,
      phoneNumber,
      email,
      consent,
      authorize,
      userId,
      account,
      signedMessage,
    } = validatedData;

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingForm = await prisma.accessibilityFormData.findFirst({
      where: { userId },
    });

    if (existingForm) {
      return NextResponse.json(
        { error: "Form already exists for this user" },
        { status: 400 }
      );
    }

    const createdForm = await prisma.accessibilityFormData.create({
      data: {
        studentName,
        studentId,
        phoneNumber,
        email,
        consent,
        authorize,
        userId,
        account,
        signedMessage,
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const formData = await prisma.accessibilityFormData.findFirst({
      where: { userId },
    });

    if (!formData) {
      return NextResponse.json(
        { error: "Form data not found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(formData, { status: 200 });
  } catch (error) {
    console.error("Error retrieving form data:", error);
    return NextResponse.json(
      { error: "Failed to retrieve form data" },
      { status: 500 }
    );
  }
}
