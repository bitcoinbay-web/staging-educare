"use server";

import * as z from "zod";
import { DoctorRegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

// import { connectToDB } from "../mongoose";
// import Users from "../models/user.model";

import { getUserByEmail } from "@/data/user";

import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const doctorRegister = async (
  values: z.infer<typeof DoctorRegisterSchema>
) => {
  // console.log(values);
  const validatedFields = DoctorRegisterSchema.safeParse(values);

  // console.log(validatedFields);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name, walletID } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // connectToDB();
  const existingUser = await db.doctor.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Email already in use" };
  }
  // console.log(db.user);
  // Users.init();
  await db.doctor.create({
    data: { email, password: hashedPassword, name, walletID },
  });

  // TODO: Send verification token email

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation Email Sent!" };
};
