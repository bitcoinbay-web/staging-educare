"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
// import Users from "@/lib/models/user.model";

import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Token does not exist!" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);
  let flag = "student";
  let user: any;
  if (!existingUser) {
    const existingDoctor = await db.doctor.findFirst({
      where: { email: existingToken.email },
    });
    user = existingDoctor;
    flag = "doctor";
  }else{
    user = existingUser
  }

  if (!user) {
    return { error: "User does not exist!" };
  }
  
  if (flag == "student") {
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });
  } else {
    await db.doctor.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });
  }

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "Email verified!" };
};
