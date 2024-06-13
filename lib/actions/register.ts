"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

// import { connectToDB } from "../mongoose";
// import Users from "../models/user.model";

import { getUserByEmail } from "@/data/user";

import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values);
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name, stdID, walletID } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // connectToDB();
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  // Users.init();
  await db.user.create({
    data: { email, password: hashedPassword, name, stdID, walletID },
  });

  // TODO: Send verification token email

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation Email Sent!" };
};
