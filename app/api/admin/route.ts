import { NextResponse } from "next/server";

import { currentRole } from "@/lib/auth";
// import Users, { UserRole } from "@/lib/models/user.model";
// import { connectToDB } from "@/lib/mongoose";
// import { useCurrentRole } from "@/hooks/useCurrentRole";

import { UserRole } from "@prisma/client";

export async function GET() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }
  return new NextResponse(null, { status: 403 });
}
