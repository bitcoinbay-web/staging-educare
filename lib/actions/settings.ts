"use server";

import * as z from "zod";

import { db } from "@/lib/db";

import bcrypt from "bcryptjs";

// import Users from "@/lib/models/user.model";
import { SettingSchema } from "@/schemas";
import { getUserByID } from "@/data/user";

import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "../tokens";
import { sendVerificationEmail } from "../mail";

export const settings = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserByID(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings Updated!" };
};
