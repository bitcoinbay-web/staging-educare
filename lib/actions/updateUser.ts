"use server";

import { db } from "@/lib/db";
import { z } from "zod";

const UpdateUserSchema = z.object({
  stdID: z.string().optional(),
  walletID: z.string().optional(),
  userId: z.string(),
});

export const updateUser = async (values: z.infer<typeof UpdateUserSchema>) => {
  const { stdID, walletID, userId } = values;

  try {
    // Fetch the current user data
    const existingUser = await db.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return { error: "User not found." };
    }

    // Only update if the fields are provided and empty in the database
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        stdID: stdID || existingUser.stdID,
        walletID: walletID || existingUser.walletID,
      },
    });

    return { success: "User information updated successfully!" };
  } catch (error) {
    return { error: "Failed to update user information." };
  }
};
