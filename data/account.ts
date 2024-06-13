import { db } from "@/lib/db";

// import Users from "@/lib/models/user.model"; d

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({ where: { userId } });
    return account;
  } catch (error) {
    console.error("Error fetching account:", error);
    return null;
  }
};
