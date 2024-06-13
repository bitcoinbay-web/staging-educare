"use server";

import * as z from "zod";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";

import { getUserByEmail } from "@/data/user";

import bcrypt from "bcryptjs";
// import Users from "../models/user.model";
// import PasswordResetToken from "../models/reset.model";

import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid Token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updatedUser = await db.user.update(
    {
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    } // This option returns the document after update
  );

  if (!updatedUser) {
    return { error: "User not found." };
  }

  // Assuming `existingToken.id` is known here, delete the password reset token
  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  // Return success message
  return { success: "Password Updated Successfully!" };
};
