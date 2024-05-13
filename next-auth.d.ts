import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "Student" | "Doctor" | "Admin";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
