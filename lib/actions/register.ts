"use server";

import * as z from "zod"; // Import zod for schema validation
import { RegisterSchema } from "@/schemas"; // Import the registration schema
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

import { db } from "@/lib/db"; // Import the database client

// Import helper functions for user retrieval, token generation, and email sending
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

// Define the register function
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values); // Log the input values for debugging
  const validatedFields = RegisterSchema.safeParse(values); // Validate the input values against the schema

  if (!validatedFields.success) {
    return { error: "Invalid Fields" }; // Return an error if validation fails
  }

  const { email, password, name, stdID, walletID } = validatedFields.data; // Destructure the validated fields
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  // Check if the email is already in use
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Email already in use" }; // Return an error if the email is already registered
  }

  // Create a new user in the database
  await db.user.create({
    data: { email, password: hashedPassword, name, stdID, walletID },
  });

  // Generate a verification token
  const verificationToken = await generateVerificationToken(email);

  // Send a verification email with the token
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation Email Sent!" }; // Return a success message
};
