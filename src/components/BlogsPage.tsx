import React from 'react';
import { motion } from 'motion/react';
import { Target, ArrowLeft, ChevronRight } from 'lucide-react';

export const BlogsPage = ({ onBack, setView }: { onBack: () => void, setView: (view: string) => void }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-primary/30 selection:text-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Target className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight font-display text-gray-900">
              HireMatch <span className="text-primary ml-2 text-lg font-bold uppercase tracking-widest opacity-50">Blogs</span>
            </span>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 relative overflow-hidden bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900"
          >
            Career & Growth <span className="text-primary">Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Expert advice, resume guides, and industry insights to help you land your dream job faster.
          </motion.p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {/* Career Growth Section */}
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center">
            Career <span className="text-primary">Growth</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 text-center">
            Helpful guides for students and early developers to grow their careers, build strong portfolios, and land their first tech internship.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'How to Get Your First Internship in Tech',
                desc: 'A step-by-step guide for students to land their first internship, including resume tips, networking strategies, and project building.',
                route: '/blogs/how-to-get-first-internship'
              },
              {
                title: 'Best Skills to Learn for Software Developers in 2026',
                desc: 'Discover the most in-demand programming languages, frameworks, and tools companies are looking for in modern developers.',
                route: '/blogs/best-skills-developers-2026'
              },
              {
                title: 'How to Build a Portfolio That Gets You Hired',
                desc: 'Learn how to create a strong developer portfolio with projects, GitHub repositories, and case studies that impress recruiters.',
                route: '/blogs/build-portfolio-that-gets-you-hired'
              },
              {
                title: 'GitHub Projects That Impress Recruiters',
                desc: 'Explore project ideas and best practices that help developers stand out to hiring managers and tech companies.',
                route: '/blogs/github-projects-impress-recruiters'
              }
            ].map((blog, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all flex flex-col justify-between h-full">
                <div className="space-y-4 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{blog.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{blog.desc}</p>
                </div>
                <button 
                  onClick={() => setView(blog.route)} 
                  className="inline-flex items-center gap-2 text-primary font-bold hover:text-indigo-600 transition-colors group text-left mt-auto"
                >
                  Read More
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Improvement Section */}
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center">
            Resume <span className="text-primary">Improvement</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 text-center">
            Practical resume-writing guides that help students and job seekers improve their resumes, pass ATS systems, and increase their chances of getting interviews.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              {
                title: '10 Mistakes That Make Your Resume Get Rejected by ATS',
                desc: 'Learn the most common resume mistakes that prevent your resume from passing Applicant Tracking Systems and how to fix them.',
                route: '/blogs/resume-mistakes-ats'
              },
              {
                title: 'How to Write a Resume That Passes AI Screening',
                desc: 'A step-by-step guide to structuring your resume so it performs well in AI-powered resume screening tools.',
                route: '/blogs/ai-screening-resume'
              },
              {
                title: 'Best Resume Format for 2026',
                desc: 'Discover modern resume formats that recruiters and AI systems prefer in today’s hiring process.',
                route: '/blogs/best-resume-format-2026'
              },
              {
                title: 'How to Add Projects to Your Resume (For Students)',
                desc: 'Learn how to showcase academic or personal projects effectively so recruiters can understand your skills.',
                route: '/blogs/add-projects-to-resume'
              },
              {
                title: 'Resume Tips for Freshers With No Experience',
                desc: 'Practical strategies to build a strong resume even if you have little or no professional experience.',
                route: '/blogs/resume-tips-freshers'
              }
            ].map((blog, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all flex flex-col justify-between h-full">
                <div className="space-y-4 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">{blog.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{blog.desc}</p>
                </div>
                <button 
                  onClick={() => setView(blog.route)} 
                  className="inline-flex items-center gap-2 text-primary font-bold hover:text-indigo-600 transition-colors group text-left mt-auto"
                >
                  Read More
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

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
