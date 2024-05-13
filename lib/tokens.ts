import { v4 as uuidv4 } from "uuid";
import VerificationToken from "@/lib/models/token.model";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import PasswordResetToken from "./models/reset.model";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await PasswordResetToken.findByIdAndDelete(existingToken.id);
  }

  const passwordResetToken = await PasswordResetToken.create({
    email: email,
    token: token,
    expires: expires,
  });
  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await VerificationToken.findByIdAndDelete(existingToken.id);
  }
  const verificationToken = await VerificationToken.create({
    email: email,
    token: token,
    expires: expires,
  });
  return verificationToken;
};
