import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Target, 
  Zap, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Briefcase, 
  Code, 
  Database, 
  Cpu,
  ChevronRight,
  ArrowLeft,
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Resources' },
  { id: 'tips', label: 'Resume Tips' },
  { id: 'ats', label: 'ATS Insights' },
  { id: 'trends', label: 'Skill Trends' },
  { id: 'examples', label: 'Examples' },
  { id: 'career', label: 'Career Advice' }
];

const ARTICLES = [
  {
    category: 'tips',
    title: 'How to Write a Winning Summary',
    description: 'Learn how to craft a professional summary that grabs attention in 6 seconds.',
    icon: FileText,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    id: 'how-to-write-a-winning-summary'
  },
  {
    category: 'tips',
    title: 'Quantifying Your Achievements',
    description: 'Use numbers and data to prove your impact and stand out from other candidates.',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    id: 'quantifying-your-achievements'
  },
  {
    category: 'ats',
    title: 'What is an ATS?',
    description: 'A deep dive into Applicant Tracking Systems and why they matter for your job search.',
    icon: Cpu,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    id: 'what-is-an-ats'
  },
  {
    category: 'ats',
    title: 'Formatting for ATS Success',
    description: 'Avoid these common formatting mistakes that get resumes rejected by AI filters.',
    icon: Layout,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    id: 'formatting-for-ats-success'
  }
];

const INSIGHTS_ARTICLES_DATA: Record<string, any> = {
  'how-to-write-a-winning-summary': {
    title: 'How to Write a Winning Resume Summary',
    author: 'HireMatch Insights',
    date: 'April 15, 2026',
    intro: 'Explain that recruiters spend only about 6 seconds scanning a resume and the summary section is the first thing they read.',
    sections: [
      {
        title: 'Section 1 — What is a Resume Summary?',
        content: 'Explain that a resume summary is a short paragraph at the top of a resume highlighting skills, experience, and career goals.'
      },
      {
        title: 'Section 2 — Why a Strong Summary Matters',
        content: 'Explain how it:\n• captures recruiter attention\n• highlights key qualifications\n• increases interview chances'
      },
      {
        title: 'Section 3 — Example of a Weak Resume Summary',
        content: 'Provide a short example of a generic summary that lacks impact. For example: "Hardworking professional seeking a challenging role to utilize my skills."'
      },
      {
        title: 'Section 4 — Example of a Strong Resume Summary',
        content: 'Provide an improved version that includes skills, results, and career focus. For example: "Data-driven Marketing Manager with 5+ years of experience increasing online sales by 30%."'
      },
      {
        title: 'Section 5 — Tips for Writing a Strong Summary',
        content: 'Include tips such as:\n• keep it under 4 lines\n• include measurable achievements\n• align with the job description\n• mention relevant skills'
      }
    ],
    tips: [
      'keep it under 4 lines',
      'include measurable achievements',
      'align with the job description',
      'mention relevant skills'
    ],
    conclusion: 'Encourage job seekers to personalize their summaries for each job application.',
    ctaTitle: 'Improve Your Resume Instantly',
    ctaText: 'Upload your resume and receive an AI-powered relevance score.',
    ctaButton: 'Analyze Your Resume'
  },
  'quantifying-your-achievements': {
    title: 'How to Quantify Your Achievements on a Resume',
    author: 'HireMatch Insights',
    date: 'April 15, 2026',
    intro: 'Explain that recruiters prefer measurable results instead of vague responsibilities.',
    sections: [
      {
        title: 'Section 1 — What Does Quantifying Achievements Mean?',
        content: 'Explain using numbers, percentages, and metrics to demonstrate impact.'
      },
      {
        title: 'Section 2 — Weak vs Strong Examples',
        content: 'Weak:\nManaged social media accounts.\n\nStrong:\nManaged social media accounts and increased engagement by 45% in six months.'
      },
      {
        title: 'Section 3 — Types of Metrics You Can Use',
        content: 'Examples:\n• revenue growth\n• efficiency improvements\n• user growth\n• project completion time'
      },
      {
        title: 'Section 4 — How Students Can Quantify Projects',
        content: 'Explain how students can include:\n• GitHub stars\n• users reached\n• performance improvements\n• project outcomes'
      },
      {
        title: 'Section 5 — Tips for Writing Impactful Achievements',
        content: '• use action verbs\n• add numbers whenever possible\n• focus on results'
      }
    ],
    tips: [
      'use action verbs',
      'add numbers whenever possible',
      'focus on results'
    ],
    conclusion: 'Explain that quantified achievements make resumes more convincing and professional.',
    ctaTitle: 'Check Your Resume Score',
    ctaText: 'Upload your resume and receive an AI-powered relevance score.',
    ctaButton: 'Analyze Your Resume'
  },
  'what-is-an-ats': {
    title: 'What is an Applicant Tracking System (ATS)?',
    author: 'HireMatch Insights',
    date: 'April 15, 2026',
    intro: 'Explain that most companies use ATS software to filter resumes before recruiters review them.',
    sections: [
      {
        title: 'Section 1 — How ATS Works',
        content: 'Explain the process:\n1. Resume submission\n2. Keyword scanning\n3. Candidate ranking\n4. Recruiter review'
      },
      {
        title: 'Section 2 — Why ATS Rejects Many Resumes',
        content: 'Common reasons:\n• missing keywords\n• complex formatting\n• images or graphics\n• unclear section headings'
      },
      {
        title: 'Section 3 — How to Make Your Resume ATS-Friendly',
        content: 'Include tips:\n• use simple formatting\n• include relevant keywords\n• avoid tables and graphics\n• use standard headings'
      },
      {
        title: 'Section 4 — Example of an ATS-Friendly Resume Layout',
        content: 'Sections:\nSummary\nSkills\nExperience\nProjects\nEducation'
      }
    ],
    tips: [
      'use simple formatting',
      'include relevant keywords',
      'avoid tables and graphics',
      'use standard headings'
    ],
    conclusion: 'Explain that optimizing for ATS greatly increases interview chances.',
    ctaTitle: 'Check Your Resume Score',
    ctaText: 'Upload your resume and get an ATS compatibility check.',
    ctaButton: 'Check Your Resume Score'
  },
  'formatting-for-ats-success': {
    title: 'Formatting Your Resume for ATS Success',
    author: 'HireMatch Insights',
    date: 'April 15, 2026',
    intro: 'Explain that even qualified candidates can be rejected if their resume formatting cannot be read by ATS software.',
    sections: [
      {
        title: 'Section 1 — Common Formatting Mistakes',
        content: 'Examples:\n• using tables\n• adding icons or graphics\n• unusual fonts\n• multi-column layouts'
      },
      {
        title: 'Section 2 — ATS-Friendly Resume Formatting',
        content: 'Recommendations:\n• simple fonts such as Arial or Calibri\n• clear headings\n• single-column layout\n• consistent spacing'
      },
      {
        title: 'Section 3 — Correct Resume Section Order',
        content: 'Recommended structure:\nSummary\nSkills\nExperience\nProjects\nEducation'
      },
      {
        title: 'Section 4 — File Format Best Practices',
        content: 'Explain when to use:\nPDF\nDOCX'
      },
      {
        title: 'Section 5 — Quick ATS Checklist',
        content: 'Provide a short checklist job seekers can follow.'
      }
    ],
    tips: [
      'simple fonts such as Arial or Calibri',
      'clear headings',
      'single-column layout',
      'consistent spacing'
    ],
    conclusion: 'Emphasize that clean formatting improves ATS readability.',
    ctaTitle: 'Test Your Resume',
    ctaText: 'Use our AI to test if your resume formatting passes ATS scans.',
    ctaButton: 'Analyze Resume Now'
  },
  'understanding-ats-algorithm': {
    title: 'Understanding the ATS Algorithm',
    author: 'HireMatch Insights',
    date: 'April 16, 2026',
    intro: 'Most Fortune 500 companies use ATS software to automatically filter resumes before recruiters review them. Many resumes are rejected due to formatting issues or missing keywords.',
    sections: [
      {
        title: 'Section 1 — What is an Applicant Tracking System (ATS)?',
        content: 'ATS is recruitment software used to:\n• collect resumes\n• scan candidate information\n• rank applicants\n• help recruiters manage hiring pipelines.'
      },
      {
        title: 'Section 2 — How the ATS Algorithm Works',
        content: 'The typical ATS pipeline:\n\n1. Resume Upload\nThe candidate submits a resume through an online application.\n\n2. Resume Parsing\nThe ATS extracts information such as:\n• name\n• contact details\n• work experience\n• skills\n• education\n\n3. Keyword Matching\nThe ATS compares resume keywords with the job description.\n\n4. Candidate Scoring\nEach resume receives a relevance score based on:\n• keyword matches\n• experience relevance\n• skill alignment\n\n5. Recruiter Review\nTop-ranked resumes are shown to recruiters.'
      },
      {
        title: 'Section 3 — Key Factors ATS Uses to Rank Resumes',
        content: 'The most important ranking signals:\n• keyword relevance\n• skills matching\n• work experience\n• resume structure\n• job title similarity'
      },
      {
        title: 'Section 4 — Common Reasons ATS Rejects Resumes',
        content: 'Issues such as:\n• missing keywords\n• complex formatting\n• tables or graphics\n• unusual section headings\n• PDF parsing issues in some systems'
      },
      {
        title: 'Section 5 — How to Optimize Your Resume for ATS',
        content: 'Practical tips:\n\nUse clear section headings:\nSummary\nSkills\nExperience\nProjects\nEducation\n\nInclude keywords from the job description.\n\nAvoid:\n• tables\n• images\n• multi-column layouts.'
      },
      {
        title: 'Section 6 — Example of an ATS-Friendly Resume Structure',
        content: 'Clean structure:\nProfessional Summary\nSkills\nProfessional Experience\nProjects\nEducation'
      },
      {
        title: 'Section 7 — Future of AI in Resume Screening',
        content: 'AI and machine learning are improving ATS systems through:\n• semantic search\n• AI resume scoring\n• skill extraction\n• contextual candidate ranking.'
      }
    ],
    tips: [
      'Use standard clear section headings',
      'Include keywords from the job description',
      'Avoid tables, images, and multi-column layouts',
      'Ensure skills and job title alignment'
    ],
    conclusion: 'Understanding ATS systems helps job seekers optimize their resumes and increase interview chances.',
    ctaTitle: 'Test Your Resume Against an AI System',
    ctaText: 'Upload your resume and instantly see how well it performs against job descriptions using our AI Resume Analyzer.',
    ctaButton: 'Analyze Your Resume Now',
    onCTAClick: 'home' 
  }
};


const SKILL_TRENDS = [
  {
    role: 'Software Developer',
    icon: Code,
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Next.js'],
    color: 'text-blue-400'
  },
  {
    role: 'Data Scientist',
    icon: Database,
    skills: ['Python', 'SQL', 'Machine Learning', 'PyTorch', 'Tableau'],
    color: 'text-emerald-400'
  },
  {
    role: 'AI Engineer',
    icon: Cpu,
    skills: ['LLMs', 'NLP', 'TensorFlow', 'Vector DBs', 'LangChain'],
    color: 'text-purple-400'
  }
];

const EXAMPLES = [
  { role: 'Frontend Engineer', level: 'Entry Level', type: 'PDF' },
  { role: 'Product Manager', level: 'Senior', type: 'DOCX' },
  { role: 'Data Analyst', level: 'Mid-Level', type: 'PDF' }
];

import { Layout } from 'lucide-react';

export const InsightsPage = ({ onBack }: { onBack: () => void }) => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [activeArticleId, setActiveArticleId] = React.useState<string | null>(null);

  const filteredArticles = activeCategory === 'all' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === activeCategory);

  if (activeArticleId && INSIGHTS_ARTICLES_DATA[activeArticleId]) {
    const article = INSIGHTS_ARTICLES_DATA[activeArticleId];
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
              onClick={() => setActiveArticleId(null)}
              className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Insights
            </button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16 space-y-16 bg-white my-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          
          <header className="space-y-8 text-center max-w-3xl mx-auto pb-10 border-b border-gray-100">
            <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-primary text-xs font-bold uppercase tracking-widest mb-2">
              Insights
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
            <p className="text-xl text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
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
                  {section.title.replace(/^Section \d+ — /, '')}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed pl-11 whitespace-pre-wrap">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          <section className="space-y-4 max-w-3xl mx-auto pb-12 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Conclusion</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {article.conclusion}
            </p>
          </section>

          <div className="flex flex-col items-center text-center space-y-6 pt-4">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900">{article.ctaTitle}</h3>
              <p className="text-lg text-gray-500 max-w-lg mx-auto">{article.ctaText}</p>
            </div>
            <button 
              onClick={onBack}
              className="px-10 py-5 rounded-3xl bg-primary text-white font-bold text-lg hover:bg-indigo-500 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              {article.ctaButton}
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass py-4 px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-indigo">
              <Target className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight font-display">
              HireMatch <span className="text-primary-light ml-2 text-lg font-bold uppercase tracking-widest opacity-50">Insights</span>
            </span>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight"
          >
            Knowledge <span className="text-gradient">Hub</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Master the art of job searching with our expert-curated resources, 
            industry trends, and actionable career advice.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-32 space-y-24">
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-2xl font-bold text-sm transition-all border ${
                activeCategory === cat.id 
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setActiveArticleId(article.id)}
              className="group p-8 rounded-[2.5rem] bg-dark-surface border border-white/5 hover:border-white/10 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className={`absolute -top-12 -right-12 w-24 h-24 ${article.bg} blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              <div className={`w-14 h-14 rounded-2xl ${article.bg} flex items-center justify-center mb-6`}>
                <article.icon className={`w-7 h-7 ${article.color}`} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors">
                {article.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {article.description}
              </p>
              
              <div className="flex items-center gap-2 text-sm font-bold text-primary-light opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                Read Article <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Trends Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Industry Skill <span className="text-primary">Trends</span></h2>
            <p className="text-text-secondary">Stay ahead of the curve with the most in-demand technical skills.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {SKILL_TRENDS.map((trend, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-dark-surface border border-white/5 space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${trend.color}`}>
                    <trend.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">{trend.role}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trend.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-text-secondary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resume Examples Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Resume <span className="text-primary">Examples</span></h2>
            <p className="text-text-secondary">Download high-performing templates for your specific role.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {EXAMPLES.map((ex, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{ex.role}</p>
                    <p className="text-xs text-text-secondary">{ex.level} • {ex.type}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ATS Insights Deep Dive */}
        <section className="p-12 rounded-[3rem] bg-gradient-to-br from-primary/20 to-purple-500/10 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Cpu className="w-64 h-64" />
          </div>
          
          <div className="max-w-2xl space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-widest">
              <AlertCircle className="w-4 h-4" /> Deep Dive
            </div>
            <h2 className="text-4xl font-bold leading-tight">Understanding the ATS Algorithm</h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Most Fortune 500 companies use Applicant Tracking Systems to filter resumes. 
              Our research shows that 75% of resumes are never seen by a human recruiter. 
              Learn how to optimize your document structure, keywords, and formatting to 
              ensure you pass the digital gatekeeper.
            </p>
            <button 
              onClick={() => setActiveArticleId('understanding-ats-algorithm')}
              className="px-8 py-4 rounded-2xl bg-white text-dark-bg font-bold hover:bg-primary hover:text-white transition-all"
            >
              Read the Full Guide
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-20 px-6 bg-dark-bg border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Target className="text-white w-6 h-6" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight font-display text-white">
              HireMatch
            </span>
          </div>
          <p className="text-sm text-text-secondary font-medium">
            © 2024 HireMatch AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
