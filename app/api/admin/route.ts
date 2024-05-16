import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import Users, { UserRole } from "@/lib/models/user.model";
// import { useCurrentRole } from "@/hooks/useCurrentRole";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return new NextResponse(null, { status: 403 });
  } else {
    console.log(user);
  }

  const userRecord = await Users.findOne({ _id: user.id }); // Adjust the query to match your schema

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
