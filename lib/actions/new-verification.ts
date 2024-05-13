"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import Users from "@/lib/models/user.model";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Token does not exist!" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Email does not exist!" };

  await Users.findByIdAndUpdate(
    existingUser.id,
    {
      $set: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    },
    { new: true } // Option to return the updated document
  );
};
