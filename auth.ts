import NextAuth from "next-auth";

// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/lib/db";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";

import authConfig from "@/auth.config";

import { getUserByID } from "@/data/user";

// import Users from "@/lib/models/user.model";
import { getAccountByUserId } from "./data/account";
import { UserRole } from "@prisma/client";
// import Users from "@/lib/models/account.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      try {
        // Find the user by their ID and update the emailVerified field with the current date
        console.log(user.id);
        const updatedUser = await db.user.update(
          { where: { id: user.id }, data: { emailVerified: new Date() } }
          // To return the updated document
        );

        if (!updatedUser) {
          // Handle the case where the user with the provided ID is not found
          console.log("User not found");
          return; // Exit the function
        }

        console.log("User email verified:", updatedUser);
      } catch (error) {
        // Handle any errors that occur during the update process
        console.error("Error updating user:", error.message);
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserByID(user.id);

      // Prevent signin without email verification
      // if (!existingUser?.emailVerified) return false;

      // TO DO: ADD 2FA CHECK

      return true;
    },
    async session({ token, session, user }) {
      console.log({ sessionToken: token, session });
      // session.user.customField = token.customField;
      // const updatedUserRole = await Users.findByIdAndUpdate(
      //   { _id: session.user.id },
      //   { role: session.user.role },
      //   { new: true } // To return the updated document
      // );
      // if (!updatedUserRole) {
      //   console.log("User does not have a role");
      // }
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
        // token.role = "Admin";
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      // console.log({ token });
      // token.customField = "TEST";
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserByID(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
