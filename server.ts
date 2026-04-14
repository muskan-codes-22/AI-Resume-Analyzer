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

CRITICAL SCORING INSTRUCTIONS (MUST BE DETERMINISTIC):
- You must calculate a FIXED, rule-based score between 0-100. Do NOT output random scores. For the exact same resume and JD, you must ALWAYS output the exact same score.
- **PENALIZE HEAVILY (-50 to -80 points)** if the resume is from a completely different field/domain than the job description.
- STRICT Scoring Rubric based on Keyword/Skill Match Percentage:
  - 0% - 10% match: Score strictly between 5-15
  - 11% - 30% match: Score strictly between 20-35
  - 31% - 50% match: Score strictly between 40-55
  - 51% - 75% match: Score strictly between 60-75
  - 76% - 100% match: Score strictly between 80-95
- Add exactly +5 bonus points if strong quantifiable metrics (numbers/percentages) are well-utilized.
- Both the main "score" and the "ats_compatibility.score" must be the identical calculated value.

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
            temperature: 0.1,
            top_p: 0.1,
            seed: 42,
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

  // API Route: Generate Interview Questions via NVIDIA NIM
  app.post('/api/interview-questions', async (req, res) => {
    try {
      const { resumeText } = req.body;

      if (!resumeText) {
        return res.status(400).json({ error: 'resumeText is required.' });
      }

      const apiKey = process.env.VITE_NVIDIA_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'NVIDIA API key is not configured on the server.' });
      }

      const prompt = `Based on this resume, list 10 interview questions the candidate should prepare for. For each question, provide a unique and specific tip (1-2 sentences) on how to answer it based on the question itself. Follow these guidelines:
- For technical questions: give a specific technical approach tip
- For achievement questions (like 'how did you reduce time by 40%'): tell them to mention exact numbers and tools used
- For project questions: suggest explaining the problem, their role, and the outcome
- For behavioral questions: suggest using the STAR method

Output EXACTLY this format for each question and do NOT wrap it in JSON. Keep it simple and direct plain text:
Q: [Question]
Tip: [Unique tip]

Resume:
${resumeText}`;

      let lastErrorMsg = '';

      for (let attempt = 1; attempt <= 3; attempt++) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60_000);

        try {
          console.log(`[Interview API] Sending attempt ${attempt} to NVIDIA NIM...`);
          const nvidiaRes = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
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

          clearTimeout(timeoutId);

          if (nvidiaRes.ok) {
            const data = await nvidiaRes.json();
            const rawText = data?.choices?.[0]?.message?.content ?? '';
            console.log(`[Interview API] Success response:`, rawText.slice(0, 100));
            return res.json({ rawText });
          } else {
            const errBody = await nvidiaRes.json().catch(() => ({}));
            lastErrorMsg = errBody?.detail || errBody?.message || nvidiaRes.statusText;
            console.error(`NVIDIA API error (Attempt ${attempt}):`, nvidiaRes.status, lastErrorMsg);
          }
        } catch (fetchErr: any) {
          clearTimeout(timeoutId);
          if (fetchErr.name === 'AbortError') {
            lastErrorMsg = 'The AI request timed out after 60 seconds.';
            console.error(`NVIDIA API timeout (Attempt ${attempt})`);
          } else {
            lastErrorMsg = fetchErr.message;
            console.error(`NVIDIA API fetch error (Attempt ${attempt}):`, fetchErr.message);
          }
        }

        if (attempt < 3) {
          await new Promise(r => setTimeout(r, attempt * 2000));
        }
      }

      return res.status(500).json({ error: `Server was unable to process request after 3 attempts. Last error: ${lastErrorMsg}` });
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
