"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

import { generateVerificationToken } from "@/lib/tokens";
import { getDoctorByEmail, getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string
) => {
  // console.log(values);
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  // console.log(existingUser)
  const existingDoctor = await getDoctorByEmail(email);

  if (existingUser) {
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exists!" };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return {
        success: "Confirmation Email sent! , please verify your email first",
      };
    }
  } else if (existingDoctor) {
    if (!existingDoctor || !existingDoctor.email || !existingDoctor.password) {
      return { error: "Email does not exists!" };
    }

    if (!existingDoctor.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingDoctor.email
      );

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return {
        success: "Confirmation Email sent!, please verify your email first",
      };
    }
  } else {
    return { error: "Email does not exists!" };
  }

  try {
    let redirectUrl = DEFAULT_LOGIN_REDIRECT;
    if (existingUser) {
      if (existingUser.role === "STUDENT") {
        redirectUrl = "/student/dashboard";
      } else if (existingUser.role === "DOCTOR") {
        redirectUrl = "/doctor/dashboard";
      } else if (existingUser.role === "ADMIN") {
        redirectUrl = "/admin/dashboard";
      }
    } else if (existingDoctor) {
      redirectUrl = "/doctor/dashboard";
    } else {
      redirectUrl = DEFAULT_LOGIN_REDIRECT;
    }
    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
