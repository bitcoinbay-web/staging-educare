import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.user.findMany();
    console.log("Users", users)
    res.status(200).json(users);
  } catch (error) {
    console.log("Error", error)
    res.status(500).json({ error: "Error fetching users" });
  } finally {
    await prisma.$disconnect();
  }
}
