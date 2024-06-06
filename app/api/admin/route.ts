import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import Users, { UserRole } from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
// import { useCurrentRole } from "@/hooks/useCurrentRole";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return new NextResponse(null, { status: 403 });
  } else {
    console.log(user);
  }

  connectToDB();
  const userRecord = await Users.findOne({ _id: user.id });

  if (!userRecord) {
    return new NextResponse(null, { status: 403 });
  } else {
    console.log(userRecord);
  }

  const role = userRecord.role;

  if (role === UserRole.STUDENT) {
    return new NextResponse(null, { status: 200 });
  }
  return new NextResponse(null, { status: 403 });
}
