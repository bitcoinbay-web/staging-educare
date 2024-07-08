import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import bcrypt from "bcryptjs";

import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import { getDoctorByEmail, getUserByEmail } from "@/data/user";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          const doctor = await getDoctorByEmail(email);

          if (user) {
            if (!user || !user.password) return null;

            const passwordsMatch = await bcrypt.compare(
              password,
              user.password
            );
            if (passwordsMatch) return user;
          } else if (doctor) {
            if (!doctor || !doctor.password) return null;

            const passwordsMatched = await bcrypt.compare(
              password,
              doctor.password
            );
            if (passwordsMatched) return doctor;
          } else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
