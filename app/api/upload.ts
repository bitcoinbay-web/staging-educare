import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm({
    uploadDir: './public/uploads',
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing files' });
    }

    const { file } = files;
    const filePath = path.join('/uploads', path.basename(file.filepath));

    const uploadedFile = await prisma.file.create({
      data: {
        userId: fields.userId,
        url: filePath,
        filename: file.originalFilename,
        mimetype: file.mimetype,
        size: file.size,
      },
    });

    res.status(200).json({ file: uploadedFile });
  });
}
