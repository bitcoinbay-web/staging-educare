// pages/api/[...slug].ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Catch-all API route hit:', req.url);
  res.status(404).json({ message: 'Not Found' });
}
