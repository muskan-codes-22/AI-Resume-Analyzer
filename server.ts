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

// Global error handlers to prevent crashes from uncaught errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

try {
  dotenv.config();
} catch (error) {
  console.warn('Could not load .env file (expected in production):', error);
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

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

  // API Route: Analyze Resume via NVIDIA NIM (proxied server-side to avoid CORS)
  app.post('/api/analyze-resume', async (req, res) => {
    try {
      const { resumeText, jobDescription } = req.body;

      if (!resumeText || !jobDescription) {
        return res.status(400).json({ error: 'resumeText and jobDescription are required.' });
      }

      const apiKey = process.env.VITE_NVIDIA_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'NVIDIA API key is not configured on the server.' });
      }

      const prompt = `You are an expert ATS (Applicant Tracking System) and career coach AI.
Analyze the given resume against the job description.

Return ONLY a valid JSON object with NO markdown, NO code fences, and NO extra text. Just raw JSON:
{
  "candidate_name": "<name found in resume or 'Candidate'>",
  "score": <number between 0-100>,
  "matched_keywords": [<list of keywords found in both resume and JD>],
  "missing_keywords": [<list of important keywords from JD missing in resume>],
  "strengths": [<list of 3-5 strengths of the resume for this JD>],
  "suggestions": [<list of 4-6 specific, actionable improvement suggestions>],
  "summary": "<2-3 sentence professional, user-friendly summary of the match. Use the candidate's name naturally instead of 'the candidate'.>",
  "section_feedback": {
    "summary": { "score": <0-100>, "feedback": "string" },
    "experience": { "score": <0-100>, "feedback": "string" },
    "education": { "score": <0-100>, "feedback": "string" },
    "skills": { "score": <0-100>, "feedback": "string" }
  },
  "formatting": {
    "has_metrics": <true or false>,
    "appropriate_length": <true or false>,
    "uses_action_verbs": <true or false>,
    "has_contact_info": <true or false>,
    "tips": [<list of tips for failed checks, empty array if all pass>]
  },
  "skills_gap": {
    "technical": {"matched": <number>, "total": <number>},
    "soft_skills": {"matched": <number>, "total": <number>},
    "domain": {"matched": <number>, "total": <number>},
    "weakest_tip": "<one actionable tip for the weakest skill area>"
  },
  "ats_compatibility": {
    "score": <number 0-100>,
    "rating": "<Excellent|Good|Fair|Poor>",
    "issues": [<list of ATS issues found>]
  }
}

Resume:
${resumeText}

Job Description:
${jobDescription}`;

      // 60-second hard timeout via AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60_000);

      let nvidiaRes: Response;
      try {
        nvidiaRes = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'meta/llama-3.1-8b-instruct',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5,
            max_tokens: 2048,
            stream: false,
          }),
          signal: controller.signal,
        });
      } catch (fetchErr: any) {
        clearTimeout(timeoutId);
        if (fetchErr.name === 'AbortError') {
          console.error('NVIDIA API request timed out after 60s');
          return res.status(504).json({ error: 'The AI request timed out after 60 seconds. Please try again — the server may be busy.' });
        }
        throw fetchErr;
      }
      clearTimeout(timeoutId);

      if (!nvidiaRes.ok) {
        const errBody = await nvidiaRes.json().catch(() => ({ message: nvidiaRes.statusText }));
        const msg = errBody?.detail || errBody?.message || nvidiaRes.statusText;
        console.error('NVIDIA API error:', nvidiaRes.status, msg);
        return res.status(nvidiaRes.status).json({ error: `NVIDIA API error: ${msg}` });
      }

      const data = await nvidiaRes.json();
      const rawText = data?.choices?.[0]?.message?.content ?? '';

      res.json({ rawText });
    } catch (error: any) {
      console.error('Error calling NVIDIA API:', error);
      res.status(500).json({ error: 'Failed to call AI service: ' + error.message });
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
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal error starting server:', err);
});
