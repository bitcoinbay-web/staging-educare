import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Retrieve the userId and onboardingStatus from the request body
    const { id: userId, onboardingStatus } = await req.json();

    if (!userId || typeof userId !== "string") {
      console.error("Invalid or missing userId:", userId);
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!onboardingStatus) {
      console.error("Missing onboardingStatus in request body");
      return NextResponse.json(
        { error: "Onboarding status is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.error("User not found with ID:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        onboarding: onboardingStatus,
      },
    });

    console.log("User updated successfully:", updatedUser);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating onboarding status:", error);
    return NextResponse.json(
      { error: "Failed to update onboarding status" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { error: "Method GET Not Allowed" },
    { status: 405 }
  );
}
