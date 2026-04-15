import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  ChevronRight,
  Target,
  CheckCircle,
  Lightbulb
} from 'lucide-react';

const ARTICLES_DATA: Record<string, any> = {
  '/blogs/resume-mistakes-ats': {
    title: '10 Mistakes That Make Your Resume Get Rejected by ATS',
    author: 'Emily Carter',
    date: 'April 15, 2026',
    intro: 'Many resumes are automatically rejected by Applicant Tracking Systems (ATS) long before a human recruiter ever sees them. Understanding how these candidate filtering bots parse information is critical.',
    sections: [
      {
        title: 'Common ATS Resume Mistakes',
        content: 'Candidates often make several structural errors. These include using complex formatting like columns, adding graphics or tables that break the parsing engine, missing exact keywords from the job description, writing long dense paragraphs instead of bullet points, and not using clear, recognizable section headings.'
      },
      {
        title: 'Example of a Bad Resume',
        content: 'A poorly structured resume might have an embedded photo, a two-column layout where the ATS reads straight across lines jumbling the experience with the skills, and sections labeled abstractly like "What I Bring to the Table" instead of standard headers like "Experience". ATS systems struggle to extract meaningful data from this chaos.'
      },
      {
        title: 'Improved Resume Structure',
        content: 'A better, ATS-friendly layout uses a single-column block format with clear, standard sections: Summary, Skills, Projects, Experience, and Education. This ensures sequential parsing so the algorithm understands exactly where your skills live.'
      }
    ],
    tips: [
      'Use simple, linear formatting',
      'Match keywords from the job description',
      'Keep resume length concise',
      'Use standard headings (Skills, Education, Experience)'
    ],
    conclusion: 'While a creative design might appeal to human aesthetics, optimizing exclusively for the ATS algorithm dramatically increases your chances of actually securing an interview.',
    ctaTitle: 'Check Your Resume Score',
    ctaText: 'Upload your resume and see how well it matches job descriptions using our AI Resume Analyzer.',
    ctaButton: 'Analyze Resume Now',
  },
  '/blogs/ai-screening-resume': {
    title: 'How to Write a Resume That Passes AI Screening',
    author: 'Michael Torres',
    date: 'April 16, 2026',
    intro: 'Modern companies increasingly rely on AI tools to filter vast numbers of resumes before they reach recruiters. Writing an AI-friendly resume is now a mandatory skill in the modern job market.',
    sections: [
      {
        title: 'Understanding AI Resume Screening',
        content: 'AI doesn\'t just blindly read text; it analyzes contextual relationships. It looks for exact keyword matches, structural coherence, and calculates the relevance of your past experience against the semantic meaning of the posted job description.'
      },
      {
        title: 'Key Elements of an AI-Friendly Resume',
        content: 'To succeed, your resume must feature clear job titles, highly relevant skills explicitly listed, detailed project descriptions, and most importantly, quantifiable achievements that prove your historical impact.'
      },
      {
        title: 'Example Resume Improvement',
        content: 'Instead of stating "Managed sales team," an AI-optimized entry reads: "Managed a team of 15 sales reps, increasing Q3 revenue by 22% through new CRM adoption." Measurable results significantly improve the quality score assigned by the AI.'
      }
    ],
    tips: [
      'Use exact keywords from the job description',
      'Keep all technical formatting completely simple',
      'Focus strictly on relevant experience'
    ],
    conclusion: 'Aligning your resume structure and vocabulary with the exact job requirements is the most reliable way to improve your AI scoring and pass the initial screening block.',
    ctaTitle: 'Test Your AI Match Rate',
    ctaText: 'Discover how modern AI parsers interpret your resume data.',
    ctaButton: 'Try Our AI Resume Analyzer',
  },
  '/blogs/best-resume-format-2026': {
    title: 'Best Resume Format for 2026',
    author: 'Sarah Jenkins',
    date: 'April 18, 2026',
    intro: 'In an era dominated by algorithmic sorting and lightning-fast recruiter reviews, why and how you format your resume is just as important as what you actually put on it. Modern resume formats matter deeply in AI-driven hiring.',
    sections: [
      {
        title: 'Popular Resume Formats',
        content: 'There are three main formats: The Chronological Resume (focuses heavily on work history), the Functional Resume (highlights skills instead of chronological experience), and the Hybrid Resume (combines a robust skills section with chronological experience).'
      },
      {
        title: 'Recommended Format for Developers',
        content: 'For tech roles, the Hybrid format often works best. It allows you to feature a dense, keyword-rich skills section at the top to satisfy the ATS, followed immediately by strong, chronological proof of those skills in action.'
      },
      {
        title: 'Example Resume Layout',
        content: 'A high-performing layout flows logically: 1. Summary (Optional but helpful), 2. Skills (Highly categorized), 3. Projects (With live links), 4. Experience (Chronological), 5. Education.'
      }
    ],
    tips: [
      'Use exceptionally clean formatting',
      'Completely avoid unnecessary graphics or icons',
      'Keep it 100% ATS friendly'
    ],
    conclusion: 'In 2026, absolute clarity and a predictable text-based structure matter infinitely more than fancy, over-engineered layout design.',
    ctaTitle: 'Format Check',
    ctaText: 'Ensure your formatting isn\'t getting in the way of your callbacks.',
    ctaButton: 'Improve Your Resume Score',
  },
  '/blogs/add-projects-to-resume': {
    title: 'How to Add Projects to Your Resume (For Students)',
    author: 'David Chen',
    date: 'April 20, 2026',
    intro: 'When you are a student without formal professional experience, personal and academic projects are absolutely essential. They act as direct actionable proof of your technical competence.',
    sections: [
      {
        title: 'What Makes a Strong Project',
        content: 'A strong project is far more than just a tutorial clone. It has a clear purpose, solves a real-world problem, contains clean and well-documented code, and features a live, accessible demo.'
      },
      {
        title: 'How to Write a Project Description',
        content: 'Your project entries should be structured like job entries. Always include the explicit project name, the specific technologies used, the problem the project solved, and its key technical features.'
      },
      {
        title: 'Example Project Entry',
        content: 'Avoid: "Weather App - made a weather app in react". Do this instead: "TaskMaster (React, Node.js, MongoDB): Developed a full-stack productivity application featuring real-time collaborative lists using WebSockets, reducing task synchronization latency by 40%."'
      }
    ],
    tips: [
      'Always add direct GitHub repository links',
      'Include easily accessible deployed project URLs',
      'Bold and highlight the core technologies used'
    ],
    conclusion: 'When documented properly, complex projects can completely replace work experience for students competing for junior roles.',
    ctaTitle: 'Check Your Project Impact',
    ctaText: 'See how your project descriptions score on our relevance engine.',
    ctaButton: 'Analyze Your Resume Now',
  },
  '/blogs/resume-tips-freshers': {
    title: 'Resume Tips for Freshers With No Experience',
    author: 'Maya Patel',
    date: 'April 22, 2026',
    intro: 'Fresh graduates almost universally worry about lacking "real" work experience. However, an empty employment history doesn\'t mean you have an empty resume.',
    sections: [
      {
        title: 'Focus on Skills and Projects',
        content: 'Since you cannot lean on years of corporate experience, shift the entire focus of your resume to dense technical skills and expansive personal projects that demonstrate hands-on ability.'
      },
      {
        title: 'Include Academic Work',
        content: 'Intensive academic coursework, university research, a senior capstone, or massive group projects can significantly strengthen your resume and prove collaborative ability.'
      },
      {
        title: 'Add Internships or Volunteer Work',
        content: 'Even small, seemingly unrelated experiences add value. Volunteer work, hackathons, or unpaid short-term internships prove that you are proactive and can operate in a professional environment.'
      },
      {
        title: 'Resume Structure for Freshers',
        content: 'The optimal structure places your strongest assets first: 1. Summary, 2. Technical Skills, 3. Projects, 4. Education, 5. Extracurricular Achievements.'
      }
    ],
    tips: [
      'Keep the resume strictly concise (One page)',
      'Highlight concrete technical skills explicitly',
      'Include all relevant GitHub and portfolio links'
    ],
    conclusion: 'Recruiters hiring freshers aren\'t looking for a seasoned veteran; they are entirely focused on hiring potential, foundational competence, and a rapid learning ability.',
    ctaTitle: 'Fresher Resume Review',
    ctaText: 'Compare your entry-level resume against the industry standards.',
    ctaButton: 'Check Your Resume Score',
  }
};

export const BlogArticle = ({ route, onBack, onCTA }: { route: string, onBack: () => void, onCTA: () => void }) => {
  const article = ARTICLES_DATA[route];

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <button onClick={onBack} className="text-primary font-bold hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-primary/30 selection:text-white pb-20">
      <nav className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Target className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight font-display text-gray-900">
              HireMatch
            </span>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blogs
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16 bg-white my-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        
        <header className="space-y-8 text-center max-w-3xl mx-auto pb-10 border-b border-gray-100">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-primary text-xs font-bold uppercase tracking-widest mb-2">
            Resume Improvement
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.2]"
          >
            {article.title}
          </motion.h1>
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-gray-500 pt-4">
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                {article.author.charAt(0)}
              </div>
              {article.author}
            </span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </header>

        <section className="space-y-4 max-w-3xl mx-auto">
          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            {article.intro}
          </p>
        </section>

        <div className="max-w-3xl mx-auto space-y-12">
          {article.sections.map((section: any, idx: number) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center text-sm">
                  {idx + 1}
                </div>
                {section.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed pl-11">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <section className="max-w-3xl mx-auto p-10 rounded-3xl bg-emerald-50 border border-emerald-100 space-y-6">
          <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-emerald-500" />
            Actionable Tips
          </h2>
          <ul className="space-y-4">
            {article.tips.map((tip: string, i: number) => (
              <li key={i} className="flex gap-4 items-start text-emerald-800">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="font-medium text-lg">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Conclusion */}
        <section className="space-y-4 max-w-3xl mx-auto pb-12 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Conclusion</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {article.conclusion}
          </p>
        </section>

        {/* Call to Action */}
        <div className="flex flex-col items-center text-center space-y-6 pt-4">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-gray-900">{article.ctaTitle}</h3>
            <p className="text-lg text-gray-500 max-w-lg mx-auto">{article.ctaText}</p>
          </div>
          <button 
            onClick={onCTA}
            className="px-10 py-5 rounded-3xl bg-primary text-white font-bold text-lg hover:bg-indigo-500 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 w-full sm:w-auto"
          >
            {article.ctaButton}
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </main>

      <div className="py-10 text-center text-gray-500 text-sm">
        © 2026 HireMatch AI. All rights reserved.
      </div>
    </div>
  );
};
