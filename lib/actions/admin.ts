"use server";
import { currentUser } from "@/lib/auth";
import { connectToDB } from "@/lib/mongoose";
import Users, { UserRole } from "@/lib/models/user.model";

export const admin = async () => {
  const user = await currentUser();

  connectToDB();
  const userRecord = await Users.findOne({ _id: user.id });
  const role = userRecord.role;
  if (role === UserRole.STUDENT) {
    return { success: "Allowed Server Action!" };
  }
  return { error: "Forbidden Server Action!" };
};
