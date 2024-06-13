// import Users from "@/lib/models/user.model";
// import { connectToDB } from "@/lib/mongoose";

import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserByID = async (id: string) => {
  try {
    const existingUser = await db.user.findUnique({ where: { id } });
    return existingUser;
  } catch {
    return null;
  }
};
