import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { sendDoctorInvitationEmail } from "@/lib/mail";

const prisma = new PrismaClient();

const formSchema = z.object({
  studentName: z.string().min(2).max(50),
  studentId: z.string().regex(/^[a-zA-Z0-9]+$/),
  phoneNumber: z.string(), // Ensure this is a string
  email: z.string().email(),
  consent: z.boolean(),
  authorize: z.boolean(),
  userId: z.string(),
  account: z.string(),
  signedMessage: z.string(),
  selectedDoctor: z.string().optional(),
  doctorEmail: z.string().email().optional(),
  doctorName: z.string().min(2).max(50).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received data:", body);

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
      selectedDoctor,
      doctorEmail,
      doctorName,
    } = body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.error("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingForm = await prisma.accessibilityFormData.findFirst({
      where: { userId },
    });

    if (existingForm) {
      console.error("Form already exists for this user");
      return NextResponse.json(
        { error: "Form already exists for this user" },
        { status: 400 }
      );
    }

    if (selectedDoctor === "other" && doctorEmail && doctorName) {
      console.log("Sending doctor invitation email...");
      await sendDoctorInvitationEmail(doctorEmail, doctorName);
    } else if (selectedDoctor) {
      console.log("Linking doctor to user...");
      await prisma.user.update({
        where: { id: userId },
        data: {
          doctor: {
            connect: { id: selectedDoctor },
          },
        },
      });
    } else {
      console.warn("No doctor ID provided for linking.");
    }

    console.log("Creating form entry in the database...");
    const createdForm = await prisma.accessibilityFormData.create({
      data: {
        studentName,
        studentId,
        phoneNumber,
        email,
        consent,
        authorize,
        account,
        signedMessage,
        user: {
          connect: { id: userId },
        },
      },
    });

    console.log("Form successfully created:", createdForm);
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
