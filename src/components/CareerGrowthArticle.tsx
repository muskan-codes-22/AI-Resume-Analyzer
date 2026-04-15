import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  ChevronRight,
  Target,
  BookOpen,
  CheckCircle,
  Lightbulb,
  FileText
} from 'lucide-react';

const ARTICLES: Record<string, any> = {
  '/blogs/how-to-get-first-internship': {
    title: 'How to Get Your First Internship in Tech',
    author: 'Sarah Jenkins',
    date: 'March 12, 2026',
    intro: 'Landing your first technical internship can feel like a paradox: companies want experience, but you need an internship to get it! This common challenge is overwhelming for students. However, with the right approach, strategy matters significantly more than prior experience.',
    sections: [
      {
        title: 'Step 1: Build Basic Skills',
        content: 'Before applying, ensure you have a strong grasp of fundamental technologies. Focus heavily on HTML, CSS, and modern JavaScript. Knowing version control with Git is non-negotiable. Optionally, picking up a framework like React will significantly boost your marketability.'
      },
      {
        title: 'Step 2: Create 2–3 Strong Projects',
        content: 'Theory is not enough. You must build. Provide tangible examples of your skills by creating 2–3 strong projects. Good examples include a personal portfolio website, an interactive todo app, a weather dashboard fetching live API data, or even a full AI Resume Analyzer type project if you want to stand out.'
      },
      {
        title: 'Step 3: Optimize Your Resume',
        content: 'Your resume is your ticket to the interview. Keep it strictly to one page. Rather than filling it with fluff, highlight your personal projects, ensure your GitHub links are clickable, and showcase your technical skills clearly at the top.'
      },
      {
        title: 'Step 4: Apply Smartly',
        content: 'Don’t just blindly send applications into the void. Use platforms intentionally. LinkedIn is great for networking, Internshala and Wellfound are perfect for startup roles, and you should always check company career pages directly.'
      },
      {
        title: 'Step 5: Network With Developers',
        content: 'Referrals are the easiest way to bypass the resume screening phase. Connect with developers on LinkedIn, attend local tech meetups, and join active developer communities on Discord or Twitter.'
      }
    ],
    tips: ['Consistently practice coding', 'Join tech communities', 'Build real-world projects'],
    conclusion: 'Your first break is always the hardest. Consistency, continuous learning, and persistent project building are your most reliable tools. Keep coding, keep applying, and don’t give up.',
    ctaTitle: 'Improve Your Resume Instantly',
    ctaText: 'Upload your resume and receive an AI-powered relevance score.',
    ctaButton: 'Analyze Your Resume Now',
  },
  '/blogs/best-skills-developers-2026': {
    title: 'Best Skills to Learn for Software Developers in 2026',
    author: 'Alex Rivera',
    date: 'April 2, 2026',
    intro: 'Technology trends evolve rapidly, and what got you hired in 2020 might not be enough today. Developers must continuously learn modern tools to stay competitive. Here are the absolute best skills to invest your time in for 2026.',
    sections: [
      {
        title: 'Core Programming Skills',
        content: 'The holy trinity of modern development: JavaScript (the language of the web), Python (dominating data and AI), and TypeScript (bringing much-needed safety to enterprise web apps).'
      },
      {
        title: 'Frontend Skills',
        content: 'React remains the undisputed king of web UIs. Next.js has become the default meta-framework for full-stack React applications. Tailwind CSS is essential for rapid, modern UI styling.'
      },
      {
        title: 'Backend Skills',
        content: 'Node.js and Express continue to be powerhouses for API development. Understanding how to build highly scalable and secure REST APIs is a fundamental requirement.'
      },
      {
        title: 'Essential Developer Tools',
        content: 'Beyond writing code, you need to manage it. Git and GitHub are mandatory. Docker basics will set you apart from junior candidates, and mastering VS Code workflows will dramatically improve your productivity.'
      },
      {
        title: 'Bonus Skills',
        content: 'The developers of tomorrow will need AI integration basics. Knowing how to leverage APIs for LLMs natively is a massive advantage. Additionally, cloud fundamentals like AWS or Vercel deployments are expected.'
      }
    ],
    tips: ['Focus heavily on TypeScript', 'Learn native LLM integration', 'Master Docker fundamentals'],
    conclusion: 'While keeping up with the ecosystem is important, developers must encourage themselves to focus on building complete projects rather than getting stuck in tutorial hell learning only theory.',
    ctaTitle: 'Ready to check your skill match?',
    ctaText: 'Test your resume against the industry standards for 2026.',
    ctaButton: 'Try Our AI Resume Analyzer',
  },
  '/blogs/build-portfolio-that-gets-you-hired': {
    title: 'How to Build a Portfolio That Gets You Hired',
    author: 'David Chen',
    date: 'April 10, 2026',
    intro: 'In the modern tech hiring landscape, a resume tells them what you know, but a portfolio proves what you can do. Recruiters and hiring managers often check portfolios before thoroughly reviewing resumes to gauge real technical ability.',
    sections: [
      {
        title: 'About Section',
        content: 'Provide a brief, compelling introduction about yourself as a developer. Highlight what drives you, what technologies excite you, and what kind of problems you like solving.'
      },
      {
        title: 'Projects Section',
        content: 'This is the meat of your portfolio. Include detailed project descriptions, explicitly list the tech stacks used, provide links directly to the GitHub repositories, and most importantly—include live working demos.'
      },
      {
        title: 'Skills Section',
        content: 'Clearly list the programming languages, libraries, and frameworks you are proficient in. Group them logically (Frontend, Backend, Tools) for easy scanning.'
      },
      {
        title: 'Contact Section',
        content: 'Make it incredibly easy to hire you. Include a professional email address and a direct link to your active LinkedIn profile. Ensure the links actually work.'
      },
      {
        title: 'Portfolio Mistakes to Avoid',
        content: 'Avoid listing too many weak, tutorial-level projects. Never have broken links or missing live demos. Poor UI design on the portfolio itself can often invalidate the impressive skills you claim to have.'
      }
    ],
    tips: ['Ensure 100% responsive design', 'Add brief case studies for top projects', 'Make live demos accessible with one click'],
    conclusion: 'Your portfolio should be a curated showcase of your absolute best work. Always focus on quality, polished projects rather than a massive quantity of half-finished experiments.',
    ctaTitle: 'Does your resume reflect your portfolio?',
    ctaText: 'Make sure your resume gets recruiters to actually click your portfolio link.',
    ctaButton: 'Improve Your Resume Score',
  },
  '/blogs/github-projects-impress-recruiters': {
    title: 'GitHub Projects That Impress Recruiters',
    author: 'Maya Patel',
    date: 'April 12, 2026',
    intro: 'A well-maintained GitHub profile acts as an interactive, verifiable resume. Recruiters and engineering managers love seeing real, deployed projects on GitHub because it showcases your coding style, commit habits, and problem-solving abilities.',
    sections: [
      {
        title: 'Beginner Project Ideas',
        content: 'If you are just starting, build projects that solidify standard logic. Examples: a sleek Todo app with local storage, a functional calculator, or a weather app consuming a public API.'
      },
      {
        title: 'Intermediate Project Ideas',
        content: 'Step up the complexity by introducing databases and user states. Build a complete blog platform, a real-time chat application using WebSockets, or a full-stack expense tracker.'
      },
      {
        title: 'Advanced Project Ideas',
        content: 'To truly impress top-tier companies, tackle complex domain problems. Build an AI resume analyzer, a comprehensive job portal with role-based access, or a specialized AI chatbot using RAG (Retrieval-Augmented Generation).'
      },
      {
        title: 'Tips to Make Projects Stand Out',
        content: 'Code alone isn\'t enough. Write an exceptionally clear README with setup instructions. Include high-quality screenshots or GIFs of the app in action. Deploy the project to a live URL, and maintain perfectly clean, commented code.'
      }
    ],
    tips: ['Keep your commit history descriptive', 'Open source contributions are huge', 'A good README is worth 1000 lines of code'],
    conclusion: 'Remember that depth beats breadth. One incredibly strong, well-documented, and deployed project will impress recruiters far more than twenty simple tutorial clones.',
    ctaTitle: 'How do you look on paper?',
    ctaText: 'Pair your amazing GitHub profile with an equally amazing ATS-friendly resume.',
    ctaButton: 'Check Your Resume Score',
  }
};

export const CareerGrowthArticle = ({ route, onBack, onCTA }: { route: string, onBack: () => void, onCTA: () => void }) => {
  const article = ARTICLES[route];

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
      {/* Simple Top Nav */}
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

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16 bg-white my-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        
        {/* Header */}
        <header className="space-y-8 text-center max-w-3xl mx-auto pb-10 border-b border-gray-100">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-primary text-xs font-bold uppercase tracking-widest mb-2">
            Career Growth
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

        {/* 4. Introduction */}
        <section className="space-y-4 max-w-3xl mx-auto">
          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            {article.intro}
          </p>
        </section>

        {/* 5. Multiple Content Sections */}
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

        {/* 6. Key Tips / Takeaways */}
        <section className="max-w-3xl mx-auto p-10 rounded-3xl bg-emerald-50 border border-emerald-100 space-y-6">
          <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-emerald-500" />
            Key Takeaways
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

        {/* 7. Conclusion */}
        <section className="space-y-4 max-w-3xl mx-auto pb-12 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Conclusion</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {article.conclusion}
          </p>
        </section>

        {/* 8. Call to Action */}
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
