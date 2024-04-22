"use server";

import { revalidatePath } from "next/cache";
import Account from "../models/user.model";
// import { connectToDB } from "../connection";

interface Params {
  username: string;
  email: string;
  stdID: string;
  walletID: string;
  path: string;
}

export async function updateUser({
  username,
  email,
  stdID,
  walletID,
  path,
}: Params): Promise<void> {
  try {
    await Account.findOneAndUpdate(
      { stdID: stdID },
      { username: username.toLowerCase(), email, walletID },
      { upsert: true }
    );

    if (path === "/register") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
