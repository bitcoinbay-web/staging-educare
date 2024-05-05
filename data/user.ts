import Accounts from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await Accounts.findOne({ email });
    return existingUser;
  } catch {
    return null;
  }
};

export const getUserByID = async (id: string) => {
  try {
    const existingUser = await Accounts.findOne({ id });
    return existingUser;
  } catch {
    return null;
  }
};
