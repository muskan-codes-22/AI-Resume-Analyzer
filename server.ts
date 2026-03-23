import express from 'express';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import mammoth from 'mammoth';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Multer setup for file uploads
  const upload = multer({ dest: 'uploads/' });

  // API Route: Parse Resume
  app.post('/api/parse-resume', upload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const filePath = req.file.path;
      const fileExt = path.extname(req.file.originalname).toLowerCase();
      let text = '';

      if (fileExt === '.pdf') {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        text = data.text;
      } else if (fileExt === '.docx') {
        const dataBuffer = fs.readFileSync(filePath);
        const result = await mammoth.extractRawText({ buffer: dataBuffer });
        text = result.value;
      } else {
        return res.status(400).json({ error: 'Unsupported file format. Please upload PDF or DOCX.' });
      }

      // Cleanup: Delete the uploaded file after parsing
      fs.unlinkSync(filePath);

      res.json({ text });
    } catch (error: any) {
      console.error('Error parsing resume:', error);
      res.status(500).json({ error: 'Failed to parse resume: ' + error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
