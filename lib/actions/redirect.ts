"use server";
import { currentRole } from "@/lib/auth";
// import { connectToDB } from "@/lib/mongoose";
// import Users, { UserRole } from "@/lib/models/user.model";

import { UserRole } from "@prisma/client";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const redirect = async () => {
  const role = await currentRole();

  let url = "";

  if (role === UserRole.ADMIN) {
    url = "/admindashboard";
    return url;
  } else if (role === UserRole.DOCTOR) {
    url = "/doctordashboard";
    return url;
  } else if (role === UserRole.STUDENT) {
    url = "/studentdashboard";
    return url;
  }
  return DEFAULT_LOGIN_REDIRECT;
};
