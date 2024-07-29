import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

import authConfig from "@/auth.config";

import { getDoctorByID, getUserByID } from "@/data/user";

import { getAccountByUserId } from "./data/account";
import { UserRole } from "@prisma/client";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
    signOut: "/login",
  },
  events: {
    async linkAccount({ user }) {
      try {
        const updatedUser = await db.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() },
        });

        if (!updatedUser) {
          console.log("User not found");
          return;
        }

        console.log("User email verified:", updatedUser);
      } catch (error) {
        console.error("Error updating user:", error.message);
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserByID(user.id);
      const existingDoctor = await getDoctorByID(user.id);

      if (existingDoctor) {
        console.log("Doctor exists:", existingDoctor);
        return true;
      }
      // Prevent signin without email verification
      // if (!existingUser?.emailVerified) return false;

      // TO DO: ADD 2FA CHECK

      return true;
    },
    async session({ token, session, user }) {
      // console.log({ sessionToken: token, session });

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
        // console.log(session.user.role);
        // token.role = "Admin";
      }

      // if (token.customRedirect && session.user) {
      //   session.user.customRedirect = token.customRedirect as UserDashboard;
      // }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
        if (token.form1) {
          session.user.form1 = true;
        }
      }
      // console.log(session)
      console.log(session);
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      let existingUser;

      existingUser = await getUserByID(token.sub);
      if (!existingUser){
        existingUser = await getDoctorByID(token.sub)
      };

      const existingAccount = await getAccountByUserId(existingUser.id);
      // console.log(existingAccount)
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      if (existingUser?.accessibilityFormData?.length > 0) {
        token.form1 = true;
      }
      // token.customRedirect = existingUser.customRedirect;
      // console.log(token)
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
