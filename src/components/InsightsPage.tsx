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
    bg: 'bg-blue-400/10'
  },
  {
    category: 'tips',
    title: 'Quantifying Your Achievements',
    description: 'Use numbers and data to prove your impact and stand out from other candidates.',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10'
  },
  {
    category: 'ats',
    title: 'What is an ATS?',
    description: 'A deep dive into Applicant Tracking Systems and why they matter for your job search.',
    icon: Cpu,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    category: 'ats',
    title: 'Formatting for ATS Success',
    description: 'Avoid these common formatting mistakes that get resumes rejected by AI filters.',
    icon: Layout,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10'
  },
  {
    category: 'trends',
    title: 'Top Skills for AI Engineers',
    description: 'The most in-demand skills for AI and Machine Learning roles in 2024.',
    icon: Zap,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10'
  },
  {
    category: 'career',
    title: 'Building a Standout Portfolio',
    description: 'How to showcase your projects effectively to impress hiring managers.',
    icon: Code,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10'
  },
  {
    category: 'career',
    title: 'Landing Your First Internship',
    description: 'A step-by-step guide for students to secure their first tech internship.',
    icon: Briefcase,
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10'
  },
  {
    category: 'tips',
    title: 'The Power of Action Verbs',
    description: 'Replace passive language with strong action verbs to make your resume dynamic.',
    icon: Zap,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10'
  },
  {
    category: 'career',
    title: 'Networking in the Tech Industry',
    description: 'How to build meaningful professional relationships that lead to referrals.',
    icon: Award,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10'
  }
];

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

  const filteredArticles = activeCategory === 'all' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === activeCategory);

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
            <button className="px-8 py-4 rounded-2xl bg-white text-dark-bg font-bold hover:bg-primary hover:text-white transition-all">
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
