import { updateUser } from "@/lib/actions/updateUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const result = await updateUser(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({ success: result.success });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
