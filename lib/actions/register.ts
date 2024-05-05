"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { connectToDB } from "../mongoose";
import { Db } from "mongodb";
import Accounts from "../models/user.model";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values);
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name, stdID, walletID } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  connectToDB();
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  // Accounts.init();
  await Accounts.create({
    email,
    password: hashedPassword,
    name,
    stdID,
    walletID,
  });

  // TODO: Send verification token email

  return { success: "User created!" };
};
