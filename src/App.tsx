import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  CheckCircle, 
  Target, 
  Upload, 
  ChevronRight, 
  Layout, 
  BarChart3, 
  Zap,
  Mail,
  Lock,
  User,
  ArrowLeft,
  CloudUpload,
  Loader2,
  AlertCircle,
  Home,
  Settings,
  LogOut,
  PlusCircle,
  X,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Check,
  Trash2,
  Brain
} from 'lucide-react';
import { getSupabase } from './lib/supabase';

import toast, { Toaster } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

import { InsightsPage } from './components/InsightsPage';
import { BlogArticle } from './components/BlogArticle';
import { BlogsPage } from './components/BlogsPage';
import { CareerGrowthArticle } from './components/CareerGrowthArticle';

// --- Constants ---

const TIPS = [
  "💡 Use numbers in your resume - 'increased sales by 40%' beats 'increased sales'",
  "🎯 Mirror exact keywords from the job description to beat ATS filters",
  "📄 Keep your resume to 1 page if you have less than 3 years experience",
  "⚡ Action verbs like 'built', 'led', 'achieved' make recruiters notice you"
];

// --- Components ---

const CountUp = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

const Navbar = ({ onAuthClick, user, onHomeClick, onInsightsClick, onBlogsClick }: { onAuthClick: (mode: 'login' | 'signup') => void, user: any, onHomeClick: () => void, onInsightsClick: () => void, onBlogsClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    const client = getSupabase();
    if (client) {
      await client.auth.signOut();
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-light py-2' : 'bg-transparent py-4'}`}>
      <div className="w-full px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onHomeClick}>
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center glow-indigo">
            <Target className="text-white w-7 h-7" />
          </div>
          <span className={`text-4xl font-extrabold tracking-tight font-display ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            HireMatch
          </span>
        </div>
        
        <div className={`hidden md:flex items-center gap-8 text-base font-semibold transition-colors duration-500 ${scrolled ? 'text-gray-600' : 'text-white/80'}`}>
          <button onClick={onInsightsClick} className="hover:text-primary transition-colors">Insights</button>
          <button onClick={onBlogsClick} className="hover:text-primary transition-colors">Blogs</button>
          <a href="#" className="hover:text-primary transition-colors">Contacts</a>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${scrolled ? 'bg-gray-100' : 'bg-white/10'}`}>
                <User className={`w-4 h-4 ${scrolled ? 'text-gray-600' : 'text-white'}`} />
                <span className={`text-base font-semibold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                  {user?.user_metadata?.full_name || 'Account'}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className={`px-6 py-2 rounded-full font-semibold transition-all border text-base ${
                  scrolled 
                    ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800' 
                    : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
                }`}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => onAuthClick('login')}
                className={`text-base font-bold transition-colors duration-500 ${scrolled ? 'text-gray-600 hover:text-primary' : 'text-white/80 hover:text-white'}`}
              >
                Login
              </button>
              <button 
                onClick={() => onAuthClick('signup')}
                className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-base hover:bg-indigo-500 transition-all glow-indigo active:scale-95"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const ResumePreviewCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative w-full max-w-[500px] mx-auto lg:ml-auto lg:translate-x-12"
    >
      <div className="bg-white p-8 rounded-3xl shadow-2xl relative z-10 overflow-hidden min-h-[500px] flex flex-col text-gray-800 font-sans border border-gray-100">
        {/* Match Score Badge */}
        <div className="absolute top-6 right-6 z-30 flex flex-col items-end">
          <div className="bg-primary text-white px-3 py-1.5 rounded-xl font-bold text-sm shadow-xl glow-indigo border border-white/20">
            92/100
          </div>
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest text-right mt-1">AI Score</p>
        </div>

        {/* Scanner Line Animation */}
        <motion.div 
          animate={{ 
            top: ['0%', '100%', '0%'],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute left-0 right-0 h-0.5 bg-primary/30 z-20 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
        />

        {/* Resume Header */}
        <div className="text-center mb-6">
          <p className="text-xs font-medium text-gray-400 mb-1">Senior Analyst</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Samantha Williams</h2>
          <div className="flex flex-col items-center text-[10px] text-gray-500 space-y-1">
            <p>New York, 10001</p>
            <div className="flex gap-3">
              <span>LinkedIn</span>
              <span>samantha.williams@example.com</span>
              <span>(555) 789-1234</span>
            </div>
          </div>
        </div>

        {/* Resume Body */}
        <div className="space-y-6 text-left flex-1">
          <section>
            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-1 mb-3">Summary</h3>
            <p className="text-[11px] leading-relaxed text-gray-600">
              Senior Analyst with 5+ years of experience in data analysis, business intelligence, and process optimization. 
              Skilled in driving operational efficiency and leading data-driven strategies to support business decisions.
            </p>
          </section>

          <section>
            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-1 mb-3">Experience</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold text-gray-900">Senior Analyst | Jul 2021 - Current</p>
                <p className="text-[10px] text-gray-500 mb-1">Modern Co. - New York, NY</p>
                <ul className="text-[10px] text-gray-600 space-y-1 list-disc pl-4">
                  <li>Lead analysis and reporting for key business functions, identifying trends.</li>
                  <li>Perform market analysis and competitive benchmarking.</li>
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-900">Business Analyst | Aug 2017 - May 2021</p>
                <p className="text-[10px] text-gray-500 mb-1">Willow & Wren Ltd. - New York, NY</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-1 mb-3">Education</h3>
            <div className="flex justify-between items-baseline">
              <p className="text-[11px] font-semibold text-gray-700">New York University — New York, NY</p>
              <p className="text-[10px] text-gray-500">B.S. Economics, 2017</p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

const AuthPage = ({ mode, onModeChange, onBack }: { mode: 'login' | 'signup', onModeChange: (mode: 'login' | 'signup') => void, onBack: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const client = getSupabase();
    if (!client) {
      setError('Supabase is not configured.');
      setIsLoading(false);
      return;
    }

    try {
      if (mode === 'signup') {
        const { error } = await client.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-6">
      <button 
        onClick={onBack}
        className="absolute top-10 left-10 flex items-center gap-2 text-text-secondary hover:text-white transition-colors font-semibold"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-dark-surface p-10 rounded-[2.5rem] border border-white/5 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-text-secondary">
            {mode === 'login' ? 'Enter your details to access your dashboard' : 'Join thousands of job seekers today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-dark-bg border border-white/10 text-white outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-dark-bg border border-white/10 text-white outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>
          {mode === 'signup' && (
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  type="password" 
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-5 py-4 rounded-2xl bg-dark-bg border border-white/10 text-white outline-none focus:border-primary/50 transition-all"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm font-medium flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-indigo-500 transition-all glow-indigo active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (mode === 'login' ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
            className="text-text-secondary hover:text-white transition-colors font-medium"
          >
            {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const CustomDot = (props: any) => {
  const { cx, cy, stroke, index, dataLength, payload, onDotClick } = props;
  const isLatest = index === dataLength - 1;

  return (
    <g
      style={{ cursor: 'pointer' }}
      onClick={() => onDotClick && onDotClick(payload)}
    >
      {isLatest && (
        <circle
          cx={cx}
          cy={cy}
          r={12}
          fill={stroke}
          opacity={0.15}
        />
      )}
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill="transparent"
        stroke="transparent"
        strokeWidth={16}
      />
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={stroke}
        stroke="#fff"
        strokeWidth={2}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 min-w-[200px]">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-50">
          <FileText className="w-4 h-4 text-primary" />
          <p className="text-sm font-bold text-gray-900 truncate max-w-[150px]">{data.resume_name}</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Resume Score</span>
            <span className="text-sm font-black text-primary">{data.score}/100</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase">ATS Compatibility</span>
            <span className="text-sm font-black text-emerald-500">{data.ats_compatibility}%</span>
          </div>
          <div className="pt-2 mt-2 border-t border-gray-50">
            <p className="text-[10px] text-gray-400 font-medium">
              {new Date(data.created_at).toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// ── Record Detail Modal ────────────────────────────────────────────────────────
const RecordDetailModal = ({
  record,
  onClose,
  onReanalyze,
}: {
  record: any;
  onClose: () => void;
  onReanalyze: (record: any) => void;
}) => {
  const hasFullData = !!record.result_data;
  const resultData = hasFullData ? record.result_data : null;
  const scoreColor =
    record.score >= 80
      ? 'text-emerald-500'
      : record.score >= 60
      ? 'text-amber-500'
      : 'text-rose-500';
  const scoreBg =
    record.score >= 80
      ? 'bg-emerald-500'
      : record.score >= 60
      ? 'bg-amber-500'
      : 'bg-rose-500';

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      style={{ background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative bg-white rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl border border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Purple gradient header bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2.5rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* File info */}
        <div className="flex items-center gap-4 mb-6 pr-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <FileText className="text-white w-7 h-7" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg leading-tight">{record.resume_name}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date(record.created_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
            <p className={`text-3xl font-black ${scoreColor}`}>{record.score}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Resume Score</p>
            <div className={`mt-2 inline-flex px-3 py-0.5 rounded-full text-[10px] font-bold text-white ${scoreBg}`}>
              {record.score >= 80 ? 'Excellent' : record.score >= 60 ? 'Good' : 'Needs Work'}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
            <p className="text-3xl font-black text-emerald-600">{record.ats_compatibility}%</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">ATS Score</p>
            <div className={`mt-2 inline-flex px-3 py-0.5 rounded-full text-[10px] font-bold text-white ${
              record.ats_compatibility >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
            }`}>
              {record.ats_compatibility >= 80 ? 'ATS Friendly' : 'Needs Improvement'}
            </div>
          </div>
        </div>

        {/* AI Summary */}
        {hasFullData && resultData?.summary && (
          <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">AI Feedback Summary</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{resultData.summary}</p>
          </div>
        )}

        {/* Top suggestions */}
        {hasFullData && resultData?.suggestions?.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Top Suggestions
            </p>
            <div className="space-y-2">
              {resultData.suggestions.slice(0, 2).map((s: string, i: number) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100/60 text-xs text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-[9px] font-bold text-amber-700 shrink-0">{i + 1}</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {!hasFullData && (
          <div className="mb-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Score Interpretation</p>
              </div>
              <p className="text-sm text-gray-700 font-medium mb-4">
                {record.score < 40 ? 'Your resume needs significant improvements to pass screening.' :
                 record.score < 70 ? 'Your resume has a good foundation but needs optimization.' :
                 'Your resume is strong and highly competitive for this role.'}
              </p>

              {/* Progress Indicator */}
              <div className="w-full bg-indigo-100/50 rounded-full h-2.5 mb-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${record.score}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-2.5 rounded-full ${
                    record.score >= 70 ? 'bg-emerald-500' :
                    record.score >= 40 ? 'bg-amber-500' :
                    'bg-rose-500'
                  }`}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>

            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              General Improvement Tips
            </p>
            <div className="space-y-2">
              {(record.score < 40
                ? [
                    'Add more relevant keywords from the job description',
                    'Improve overall formatting and readability',
                    'Add measurable achievements to your experience',
                    'Strengthen your professional summary section'
                  ]
                : record.score < 70
                ? [
                    'Good foundation, but optimize keywords for this role',
                    'Add more quantifiable results (metrics, $$, %)',
                    'Tailor your experience to match the exact requirements'
                  ]
                : [
                    'Strong resume, fine-tune specific keywords for each role',
                    'Ensure all formatting remains strictly ATS-friendly',
                    'Focus on highlighting leadership or business impact'
                  ]
              ).map((tip, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  {tip}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all text-sm"
            >
              Close
            </button>
            <button
              onClick={() => onReanalyze(record)}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-500 hover:to-purple-500 transition-all text-sm shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Re-analyze this Resume
            </button>
          </div>
          {!hasFullData && (
            <p className="text-center text-[11px] text-gray-400 mt-1">
              This is an older record. Some detailed insights are not available.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const InsightsDashboard = ({ result, onReset }: { result: any, onReset: () => void }) => {
  const scoreColor = result.score >= 80 ? 'text-emerald-500' : result.score >= 60 ? 'text-amber-500' : 'text-rose-500';
  const scoreBg = result.score >= 80 ? 'bg-emerald-500' : result.score >= 60 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Sparkles className="text-primary w-8 h-8" />
            Insights Dashboard
          </h2>
          <p className="text-gray-500 mt-1">Detailed analysis for {result.candidate_name}'s resume</p>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all shadow-sm"
        >
          <PlusCircle className="w-5 h-5" /> Analyze Another
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <FileText className="text-primary w-5 h-5" />
          Executive Summary
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">{result.summary}</p>
      </div>

      {/* Top Row: Score & ATS */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Overall Score Gauge */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target className="w-24 h-24 text-primary" />
          </div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Overall Score</h3>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-gray-100" />
              <motion.circle
                cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent"
                strokeDasharray="527.78"
                initial={{ strokeDashoffset: 527.78 }}
                animate={{ strokeDashoffset: 527.78 - (527.78 * result.score) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className={scoreColor}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-black text-gray-900">{result.score}</span>
              <span className="text-xs text-gray-400 font-bold uppercase">out of 100</span>
            </div>
          </div>
          <div className={`mt-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${scoreBg} text-white shadow-lg`}>
            {result.score >= 80 ? 'Excellent' : result.score >= 60 ? 'Good' : 'Needs Work'}
          </div>
        </div>

        {/* ATS Compatibility */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Layout className="text-indigo-500 w-6 h-6" />
              ATS Compatibility
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-gray-900">{result.ats_compatibility.score}%</span>
              <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                result.ats_compatibility.score >= 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {result.ats_compatibility.rating}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Formatting Checks</p>
              <div className="grid gap-3">
                {[
                  { label: 'Measurable Achievements', value: result.formatting.has_metrics },
                  { label: 'Appropriate Length', value: result.formatting.appropriate_length },
                  { label: 'Action Verbs', value: result.formatting.uses_action_verbs },
                  { label: 'Contact Info', value: result.formatting.has_contact_info }
                ].map((check, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-sm font-medium text-gray-700">{check.label}</span>
                    {check.value ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Detected Issues</p>
              <div className="flex flex-wrap gap-2">
                {result.ats_compatibility.issues.length > 0 ? (
                  result.ats_compatibility.issues.map((issue: string, i: number) => (
                    <div key={i} className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 text-sm font-medium border border-rose-100 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      {issue}
                    </div>
                  ))
                ) : (
                  <div className="w-full p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center gap-2">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                    <p className="text-sm font-bold text-emerald-700">No ATS issues detected!</p>
                    <p className="text-xs text-emerald-600/70">Your resume is highly readable by ATS systems.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills & Keywords */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Skill Analysis */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
            <BarChart3 className="text-primary w-6 h-6" />
            Skill Analysis
          </h3>
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Technical', data: result.skills_gap.technical, color: 'bg-primary' },
                { label: 'Soft', data: result.skills_gap.soft_skills, color: 'bg-emerald-500' },
                { label: 'Domain', data: result.skills_gap.domain, color: 'bg-amber-500' }
              ].map((cat, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
                      <motion.circle
                        cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="transparent"
                        strokeDasharray="213.63"
                        initial={{ strokeDashoffset: 213.63 }}
                        animate={{ strokeDashoffset: 213.63 - (213.63 * cat.data.matched) / cat.data.total }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className={cat.color.replace('bg-', 'text-')}
                      />
                    </svg>
                    <span className="absolute text-sm font-bold text-gray-900">{Math.round((cat.data.matched / cat.data.total) * 100)}%</span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cat.label}</p>
                </div>
              ))}
            </div>
            
            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10">
              <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Skill Improvement Tip
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed italic">
                "{result.skills_gap.weakest_tip}"
              </p>
            </div>
          </div>
        </div>

        {/* Keyword Optimization */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
            <Zap className="text-amber-500 w-6 h-6" />
            Keyword Optimization
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Found in Resume</p>
              <div className="flex flex-wrap gap-2">
                {result.matched_keywords.map((kw: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Missing from Resume</p>
              <div className="flex flex-wrap gap-2">
                {result.missing_keywords.map((kw: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Feedback */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
          <FileText className="text-indigo-500 w-6 h-6" />
          Section Feedback
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(result.section_feedback).map(([key, data]: [string, any], i) => (
            <div key={i} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-900 capitalize">{key}</span>
                <span className={`text-sm font-black ${
                  data.score >= 80 ? 'text-emerald-500' : data.score >= 60 ? 'text-amber-500' : 'text-rose-500'
                }`}>{data.score}%</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${data.score}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className={`h-full ${
                    data.score >= 80 ? 'bg-emerald-500' : data.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{data.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Suggestions */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircle className="text-emerald-500 w-6 h-6" />
            Strengths
          </h3>
          <ul className="space-y-4">
            {result.strengths.map((s: string, i: number) => (
              <li key={i} className="flex gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 text-gray-700 text-sm">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lightbulb className="text-amber-500 w-6 h-6" />
            Actionable Suggestions
          </h3>
          <div className="space-y-4">
            {result.suggestions.map((s: string, i: number) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-amber-50/30 border border-amber-100/30 text-gray-700 text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-700 shrink-0">
                  {i + 1}
                </span>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InterviewPrepView = ({ history }: { history: any[] }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateQuestions = async () => {
    setError(null);
    setIsGenerating(true);
    let textToSend = '';

    try {
      if (!selectedFile) throw new Error('Please upload a resume file.');
      if (selectedFile.type === 'application/pdf') {
        const arrayBuffer = await selectedFile.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            textToSend += textContent.items.map((item: any) => item.str).join(' ') + '\\n';
          }
      } else if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        textToSend = result.value;
      } else {
        throw new Error('Unsupported file type. Please upload PDF or DOCX.');
      }

      if (!textToSend.trim()) {
        throw new Error('Could not extract data. Please select a valid resume.');
      }

      const res = await fetch('/api/interview-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: textToSend })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate questions. The AI request timed out or the server was unreachable.');
      }

      const data = await res.json();
      console.log('API Response rawText:', data.rawText);
      const rawText = data.rawText.replace(/^```(?:json)?\\s*/i, '').replace(/\\s*```\\s*$/, '').trim();
      
      let parsedQuestions = [];
      try {
        const parsed = JSON.parse(rawText);
        parsedQuestions = parsed.questions || [];
      } catch (err) {
        // Fallback for simple prompt that returns text list
        const sections = rawText.split(/Q:\s*/i).filter((s: string) => s.trim().length > 5);
        parsedQuestions = sections.map((section: string) => {
          const parts = section.split(/Tip:\s*/i);
          return {
            category: 'Interview Prep',
            question: parts[0]?.replace(/^[\d\-\*\.]+\s*/, '').trim() || '',
            tip: parts[1]?.trim() || 'Prepare a clear, structured response outlining key metrics and technical constraints.'
          };
        }).filter((q: any) => q.question).slice(0, 10);
      }
      
      setQuestions(parsedQuestions);
      toast.success('Interview questions generated!');
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex justify-center items-center">
          <Brain className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Interview Prep</h2>
          <p className="text-gray-500 text-sm">Generate likely interview questions and tips based on your customized resume data.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
        <div className="space-y-3">
          <div 
            onClick={() => document.getElementById('prep-resume-upload')?.click()}
            className="p-8 rounded-2xl border-2 border-dashed border-gray-200 hover:border-indigo-400 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-indigo-50/50"
          >
            <input 
              type="file" 
              id="prep-resume-upload" 
              className="hidden" 
              onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])} 
              accept=".pdf,.docx"
            />
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex justify-center items-center shadow-inner">
              {selectedFile ? <Check className="w-6 h-6" /> : <CloudUpload className="w-6 h-6" />}
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900">{selectedFile ? selectedFile.name : 'Click to Upload Resume'}</p>
              <p className="text-xs text-gray-500 mt-1">PDF or DOCX (Max 5MB)</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100 mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
              <p className="text-sm font-medium text-rose-700 leading-snug">{error}</p>
            </div>
            <button
              onClick={generateQuestions}
              className="px-5 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-600 text-sm font-bold hover:bg-rose-50 transition-all flex items-center gap-2"
            >
              Try Again
            </button>
          </div>
        )}

        {isGenerating ? (
          <div className="w-full py-5 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
            <p className="text-indigo-600 font-bold text-sm">Generating your personalized interview questions, this may take a moment...</p>
          </div>
        ) : (
          <button
            onClick={generateQuestions}
            disabled={isGenerating || !selectedFile}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-200 flex justify-center items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5" />
            Generate Interview Questions
          </button>
        )}
      </div>

      {questions.length > 0 && (
        <div className="space-y-5 pt-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 px-2">Your Likely Questions</h3>
          {questions.map((q, i) => {
            const isTech = q.category === 'Technical Questions';
            const isBehav = q.category === 'Behavioral Questions';
            const headerColor = isTech ? 'text-indigo-600 bg-indigo-50 border-indigo-100' : isBehav ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-600 bg-amber-50 border-amber-100';
            
            return (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={i} 
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className={`px-5 py-3 border-b ${headerColor} flex items-center justify-between`}>
                  <span className="text-xs font-bold uppercase tracking-wider">{q.category}</span>
                  <span className="font-black opacity-30 text-sm">#{i + 1}</span>
                </div>
                <div className="p-6 space-y-5">
                  <p className="text-lg font-bold text-gray-900 leading-relaxed">{q.question}</p>
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex gap-4">
                    <div className="mt-0.5">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-amber-500">
                        <Lightbulb className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">How to answer</p>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">{q.tip}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Dashboard = ({ user }: { user: any }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  // New state for record detail modal & re-open analysis
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [viewingAnalysis, setViewingAnalysis] = useState<any | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const userName = user?.user_metadata?.full_name || 'User';

  const fetchHistory = async () => {
    const client = getSupabase();
    if (!client || !user) return;

    setIsLoadingHistory(true);
    try {
      const { data, error } = await client
        .from('analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase fetch error:', error);
        if (error.code === 'PGRST205') {
          console.warn('Schema cache mismatch. Please refresh your Supabase schema cache in the dashboard.');
        }
        throw error;
      }
      setHistory(data || []);
    } catch (err: any) {
      console.error('Error fetching history:', err);
      toast.error('Failed to load history.');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'previous-records') {
      fetchHistory();
    }
  }, [activeTab, user]);

  const handleLogout = async () => {
    const client = getSupabase();
    if (client) {
      await client.auth.signOut();
    }
  };

  const handleDeleteRecord = async (id: string) => {
    const client = getSupabase();
    if (!client || !user) return;

    setIsDeleting(true);
    try {
      const { error } = await client
        .from('analyses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setHistory(prev => prev.filter(item => item.id !== id));
      toast.success('Record deleted successfully');
      setRecordToDelete(null);
    } catch (err: any) {
      console.error('Error deleting record:', err);
      toast.error('Failed to delete record');
    } finally {
      setIsDeleting(false);
    }
  };

  const analyzeResume = async () => {
    if (!selectedFile || !jobDescription) {
      toast.error('Please upload a resume and provide a job description.');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      let resumeText = '';
      
      if (selectedFile.type === 'application/pdf') {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }
        resumeText = fullText;
      } else if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        resumeText = result.value;
      } else {
        throw new Error('Unsupported file type. Please upload PDF or DOCX.');
      }

      if (!resumeText.trim()) {
        throw new Error('Could not extract text from the file. It might be empty or scanned.');
      }

      const BACKOFF_DELAYS_MS = [2000, 4000, 8000]; // exponential backoff: 2s → 4s → 8s
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      const isQuotaError = (status: number) => status === 429;
      const isTimeoutError = (status: number) => status === 504;

      let rawText = '';
      let lastError: any = null;

      for (let attempt = 0; attempt <= BACKOFF_DELAYS_MS.length; attempt++) {
        const attemptLabel = attempt === 0
          ? 'Analyzing your resume...'
          : `AI is busy, retrying... (attempt ${attempt + 1})`;
        toast.loading(attemptLabel, { id: 'model-attempt' });

        try {
          const res = await fetch('/api/analyze-resume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resumeText, jobDescription }),
          });

          if (!res.ok) {
            const errBody = await res.json().catch(() => ({ error: res.statusText }));
            lastError = { status: res.status, message: errBody?.error || res.statusText };

            if (isTimeoutError(res.status)) {
              throw new Error('The AI request timed out after 30 seconds. Please try again — the server may be busy.');
            }
            if (isQuotaError(res.status) && attempt < BACKOFF_DELAYS_MS.length) {
              const waitSec = BACKOFF_DELAYS_MS[attempt] / 1000;
              toast.loading(`AI is busy, retrying in ${waitSec}s...`, { id: 'model-attempt' });
              console.warn(`Quota hit on attempt ${attempt + 1}, waiting ${waitSec}s...`);
              await sleep(BACKOFF_DELAYS_MS[attempt]);
              continue;
            }
            throw new Error(`Analysis failed (${res.status}): ${lastError.message}`);
          }

          const data = await res.json();
          rawText = data?.rawText ?? '';
          toast.dismiss('model-attempt');
          break; // success
        } catch (fetchErr: any) {
          lastError = fetchErr;
          if (!isQuotaError(fetchErr?.status)) {
            toast.dismiss('model-attempt');
            throw fetchErr;
          }
        }
      }

      toast.dismiss('model-attempt');

      if (!rawText) {
        throw new Error(`The AI is currently overloaded and all retry attempts were exhausted. Please wait a minute and try again.\n\nDetails: ${lastError?.message ?? String(lastError)}`);
      }

      // Strip markdown code fences if the model wraps the JSON anyway
      const jsonText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
      const result = JSON.parse(jsonText);
      setAnalysisResult(result);
      
      if (result.formatting?.tips?.length === 0) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#6ee7b7', '#ffffff']
        });
      }

      toast.success('Analysis complete!');

      // Save to Supabase
      const client = getSupabase();
      console.log('Preparing to save data to Supabase...', { clientFound: !!client });
      
      let currentUser = user;
      if (client) {
        const { data: authData } = await client.auth.getUser();
        if (authData?.user) {
          currentUser = authData.user;
        }
      }
      
      console.log('Live CurrentUser:', currentUser);
      console.log('Full AI Analysis Result Object:', JSON.parse(JSON.stringify(result)));
      
      if (!currentUser) {
        console.error('Save skipped: User is not authenticated.');
      } else if (!client) {
        console.error('Save skipped: Supabase client is not available.');
      } else {
        console.log('Executing insert statement on analyses table...');
        try {
          const insertPayload: any = {
            user_id: currentUser.id,
            resume_name: selectedFile.name,
            score: result.score,
            ats_compatibility: result.ats_compatibility?.score || 0
          };
          
          console.log('Insert Payload (Safe Mapping):', insertPayload);

          const { data: insertData, error: insertError } = await client.from('analyses').insert(insertPayload).select();
          
          console.log('Insert Request Completed. Error:', insertError, 'Data:', insertData);
          
          if (insertError) {
            console.error('Supabase insert exact error:', insertError.message, insertError.details, insertError.hint);
            toast.error(`Database Error: ${insertError.message}`);
          } else if (!insertData || insertData.length === 0) {
            console.error('RLS BLOCKED: Row Level Security policies prevented this insert from succeeding.');
            toast.error('Row Level Security (RLS) blocked the database save. Please enable INSERT logic in your Supabase policies.');
          } else {
            console.log('Successfully saved to Supabase! Refetching history...');
            fetchHistory();
          }
        } catch (insertCrash) {
          console.error('Exception strictly executing Supabase insert:', insertCrash);
        }
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'An error occurred during analysis.');
      toast.error(err.message || 'Analysis failed.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        activeTab === id 
          ? 'bg-primary text-white shadow-lg shadow-primary/30' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-indigo">
            <Target className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight font-display text-primary">
            HireMatch
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem id="dashboard" icon={Home} label="Dashboard" />
          <SidebarItem id="previous-records" icon={BarChart3} label="Previous Records" />
          <SidebarItem id="interview-prep" icon={Brain} label="Interview Prep" />
          <SidebarItem id="settings" icon={Settings} label="Settings" />
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-xl transition-all mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, <span className="text-primary capitalize">{userName}</span>
            </h1>
            <p className="text-gray-500 mt-1">Here's what's happening with your career path today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{userName}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <User className="text-primary w-6 h-6" />
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {analysisResult ? (
                <InsightsDashboard 
                  result={analysisResult} 
                  onReset={() => {
                    setAnalysisResult(null);
                    setSelectedFile(null);
                    setJobDescription('');
                  }} 
                />
              ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <div 
                      onClick={() => document.getElementById('resume-upload')?.click()}
                      className="p-10 rounded-3xl border-2 border-dashed border-gray-200 hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 bg-white/50"
                    >
                      <input 
                        type="file" 
                        id="resume-upload" 
                        className="hidden" 
                        onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])} 
                        accept=".pdf,.docx"
                      />
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${selectedFile ? 'bg-emerald-500 text-white' : 'bg-primary/10 text-primary'}`}>
                        {selectedFile ? <Check className="w-8 h-8" /> : <CloudUpload className="w-8 h-8" />}
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{selectedFile ? selectedFile.name : 'Upload your resume'}</p>
                        <p className="text-sm text-gray-500">PDF or DOCX (Max 5MB)</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Job Description</label>
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the job description here..."
                        className="w-full h-48 p-5 rounded-3xl border border-gray-200 bg-white/50 focus:border-primary/50 outline-none transition-all resize-none shadow-sm"
                      />
                    </div>

                    {error && (
                      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center gap-3 text-rose-600">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                      </div>
                    )}

                    <button
                      onClick={analyzeResume}
                      disabled={isAnalyzing || !selectedFile || !jobDescription}
                      className="w-full py-5 rounded-3xl bg-primary text-white font-bold text-lg hover:bg-indigo-500 transition-all glow-indigo flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isAnalyzing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Zap className="w-6 h-6" />}
                      {isAnalyzing ? 'Analyzing...' : 'Get Score'}
                    </button>
                  </div>

                  <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center space-y-6 overflow-hidden min-h-[400px]">
                    <AnimatePresence mode="wait">
                      {analysisResult ? (
                        <motion.div
                          key="summary"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="w-full space-y-6"
                        >
                          <div className="flex flex-col items-center gap-4">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${
                              analysisResult.score > 70 ? 'border-emerald-500 text-emerald-500' : 
                              analysisResult.score > 40 ? 'border-amber-500 text-amber-500' : 'border-rose-500 text-rose-500'
                            }`}>
                              <span className="text-3xl font-black">{analysisResult.score}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Analysis Summary</h3>
                          </div>

                          <div className="space-y-4 text-left">
                            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2">Top Matches</p>
                              <div className="flex flex-wrap gap-2">
                                {analysisResult.matched_keywords.slice(0, 2).map((kw: string, i: number) => (
                                  <span key={i} className="px-2 py-1 rounded-lg bg-white text-xs font-bold text-emerald-700 border border-emerald-200">
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                              <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Top Tip</p>
                              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                {analysisResult.suggestions[0]}
                              </p>
                            </div>
                          </div>

                          <p className="text-xs text-gray-400 font-bold animate-bounce pt-4">
                            View full results below ↓
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="tips"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="w-full space-y-8"
                        >
                          <div className="space-y-4">
                            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto">
                              <Sparkles className="text-primary w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">AI-Powered Insights</h3>
                          </div>

                          <div className="h-24 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={currentTipIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6 rounded-3xl bg-gray-50 border border-gray-100 w-full"
                              >
                                <p className="text-sm font-medium text-gray-700 leading-relaxed">
                                  {TIPS[currentTipIndex]}
                                </p>
                              </motion.div>
                            </AnimatePresence>
                          </div>

                          <div className="grid grid-cols-3 gap-3 w-full pt-4">
                            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                              <p className="text-xl font-black text-primary"><CountUp end={95} suffix="%" /></p>
                              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter">Accuracy</p>
                            </div>
                            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                              <p className="text-xl font-black text-primary"><CountUp end={10} suffix="s" /></p>
                              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter">Time</p>
                            </div>
                            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                              <p className="text-xl font-black text-primary"><CountUp end={10} suffix="K+" /></p>
                              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter">Analyzed</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {activeTab === 'previous-records' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Previous Records</h2>
              <button 
                onClick={fetchHistory}
                disabled={isLoadingHistory}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 focus:outline-none transition flex items-center gap-2 disabled:opacity-50"
              >
                {isLoadingHistory ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Refresh Records
              </button>
            </div>
            
            {isLoadingHistory ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading your records...</p>
              </div>
            ) : history.length > 0 ? (
              <>
                {/* Graph Section */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Your Resume Score History</h3>
                  <div style={{ width: '100%', height: '400px', minHeight: '400px' }} className="bg-indigo-50/20 rounded-3xl p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={history.map(item => ({
                        ...item,
                        formattedDate: new Date(item.created_at).toLocaleDateString('en-GB', { 
                          day: '2-digit', 
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        }).replace(',', '')
                      }))}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e1" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#4f46e1" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorATS" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis 
                          dataKey="formattedDate" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fill: '#9ca3af' }}
                          dy={10}
                        />
                        <YAxis 
                          domain={[0, 100]} 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 12, fill: '#9ca3af' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" align="right" iconType="circle" />
                        
                        <ReferenceLine y={70} stroke="#10b981" strokeDasharray="5 5" strokeWidth={1} />
                        <ReferenceLine y={40} stroke="#f43f5e" strokeDasharray="5 5" strokeWidth={1} />

                        <Area 
                          type="monotone" 
                          dataKey="score" 
                          name="Resume Score"
                          stroke="#4f46e1" 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#colorScore)"
                          dot={(props) => <CustomDot {...props} dataLength={history.length} onDotClick={(payload: any) => setSelectedRecord(payload)} />}
                          activeDot={{ r: 8, strokeWidth: 0 }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="ats_compatibility" 
                          name="ATS Compatibility"
                          stroke="#10b981" 
                          strokeWidth={3} 
                          fillOpacity={1} 
                          fill="url(#colorATS)"
                          dot={(props) => <CustomDot {...props} dataLength={history.length} onDotClick={(payload: any) => setSelectedRecord(payload)} />}
                          activeDot={{ r: 8, strokeWidth: 0 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {history.length === 1 && (
                    <div className="mt-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center gap-3">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <p className="text-sm font-medium text-indigo-900">Analyze more resumes to see your progress over time! 📈</p>
                    </div>
                  )}
                </div>

                {/* List Section */}
                <div className="grid gap-4">
                  <div className="flex items-center gap-2 px-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Click any entry to view details</p>
                  </div>
                  {[...history].reverse().map((record, i) => (
                    <motion.div 
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedRecord(record)}
                      className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                          <FileText className="text-indigo-400 group-hover:text-indigo-600 w-6 h-6 transition-colors" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{record.resume_name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(record.created_at).toLocaleDateString('en-GB', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className={`text-xl font-bold ${
                            record.score > 70 ? 'text-emerald-500' : 
                            record.score > 40 ? 'text-amber-500' : 'text-rose-500'
                          }`}>{record.score}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Score</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-emerald-500">{record.ats_compatibility}%</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">ATS</p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setRecordToDelete(record.id);
                          }}
                          title="Delete this record"
                          className="p-2 rounded-xl text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white p-20 rounded-[2.5rem] border border-gray-100 shadow-sm text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-6">
                  <BarChart3 className="text-gray-300 w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No analyses yet!</h3>
                <p className="text-gray-500 mb-8 max-w-xs">Upload your resume to get started and see your progress over time.</p>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="px-8 py-3 rounded-2xl bg-primary text-white font-bold hover:bg-indigo-500 transition-all glow-indigo"
                >
                  Analyze Now
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
            
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Preferences</h3>
                <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Zap className="text-amber-500 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-700">Auto-save analyses</span>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <Mail className="text-indigo-500 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-700">Email notifications</span>
                  </div>
                  <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button 
                  onClick={() => toast.success('Settings updated!')}
                  className="px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-indigo-500 transition-all shadow-lg shadow-primary/20"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100">
              <h3 className="text-lg font-bold text-rose-900 mb-2">Danger Zone</h3>
              <p className="text-sm text-rose-600 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="px-8 py-3 rounded-xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition-all">
                Delete Account
              </button>
            </div>
          </div>
        )}

        {activeTab === 'interview-prep' && (
          <InterviewPrepView history={history} />
        )}
      </main>

      {/* Full Re-opened Analysis Overlay */}
      <AnimatePresence>
        {viewingAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed inset-0 z-[150] bg-gray-50 overflow-y-auto"
          >
            <div className="max-w-5xl mx-auto p-10">
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => setViewingAnalysis(null)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all shadow-sm text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Records
                </button>
                <div className="px-4 py-2 rounded-2xl bg-indigo-50 border border-indigo-100">
                  <p className="text-xs font-bold text-indigo-600">{viewingAnalysis._resumeName}</p>
                </div>
              </div>
              <InsightsDashboard
                result={viewingAnalysis}
                onReset={() => setViewingAnalysis(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Record Detail Modal */}
      <AnimatePresence>
        {selectedRecord && !viewingAnalysis && (
          <RecordDetailModal
            record={selectedRecord}
            onClose={() => setSelectedRecord(null)}
            onReanalyze={(rec) => {
              if (rec.result_data) {
                const data = { ...rec.result_data, _resumeName: rec.resume_name };
                setViewingAnalysis(data);
                setSelectedRecord(null);
              } else {
                setSelectedRecord(null);
                setActiveTab('dashboard');
                // Give React time to switch tabs before popping the file dialog
                setTimeout(() => {
                  document.getElementById('resume-upload')?.click();
                  toast(`Please select "${rec.resume_name}" to re-analyze`, { icon: '📁', duration: 4000 });
                }, 300);
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {recordToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl border border-gray-100"
            >
              <div className="w-16 h-16 rounded-3xl bg-rose-50 flex items-center justify-center mb-6">
                <AlertTriangle className="text-rose-500 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Record?</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Are you sure you want to delete this resume analysis? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setRecordToDelete(null)}
                  className="flex-1 py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDeleteRecord(recordToDelete)}
                  disabled={isDeleting}
                  className="flex-1 py-4 rounded-2xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  const [view, setView] = useState<string>('home');
  const [user, setUser] = useState<any>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const client = getSupabase();
    if (!client) {
      setIsAuthReady(true);
      return;
    }

    client.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthReady(true);
    });

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Toaster position="top-right" />
        <Dashboard user={user} />
      </>
    );
  }

  if (view === 'login' || view === 'signup') {
    return <AuthPage mode={view} onModeChange={setView} onBack={() => setView('home')} />;
  }

  if (view === 'insights') {
    return <InsightsPage onBack={() => setView('home')} />;
  }

  if (view.startsWith('/blogs/')) {
    const isCareerGrowth = [
      '/blogs/how-to-get-first-internship',
      '/blogs/best-skills-developers-2026',
      '/blogs/build-portfolio-that-gets-you-hired',
      '/blogs/github-projects-impress-recruiters',
    ].includes(view);

    if (isCareerGrowth) {
      return (
        <CareerGrowthArticle 
          route={view} 
          onBack={() => setView('blogs')} 
          onCTA={() => {
            setView('home');
            window.scrollTo(0, 0);
          }} 
        />
      );
    }

    return (
      <BlogArticle 
        route={view} 
        onBack={() => setView('blogs')} 
        onCTA={() => {
          setView('home');
          window.scrollTo(0, 0);
        }} 
      />
    );
  }

  if (view === 'blogs') {
    return <BlogsPage onBack={() => setView('home')} setView={setView} />;
  }

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-primary/30 selection:text-white overflow-x-hidden">
      <Navbar 
        onAuthClick={setView} 
        user={user} 
        onHomeClick={() => setView('home')} 
        onInsightsClick={() => setView('insights')}
        onBlogsClick={() => setView('blogs')}
      />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-10 lg:pt-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-6xl font-bold leading-tight font-display text-white whitespace-nowrap"
            >
              AI Resume <span className="text-gradient">Analyzer</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary max-w-xl leading-relaxed"
            >
              Analyze your resume and get a relevance score instantly. Optimize your career path with AI-driven insights.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative p-10 rounded-[2.5rem] bg-[#0F172A]/80 border border-white/10 backdrop-blur-xl max-w-md shadow-2xl overflow-hidden group"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-colors duration-500"></div>
              
              <div className="absolute left-[4.25rem] top-24 bottom-24 w-px bg-gradient-to-b from-white/5 via-white/20 to-white/5"></div>
              
              <div className="space-y-12">
                {[
                  { step: 1, icon: Upload, label: 'Upload Resume', color: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
                  { step: 2, icon: FileText, label: 'Add Job Description', color: 'text-purple-400', glow: 'shadow-purple-500/20' },
                  { step: 3, icon: Target, label: 'Get Score', color: 'text-emerald-400', glow: 'shadow-emerald-500/20' }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-8 relative z-10 cursor-default group/step"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg transition-all duration-300 group-hover/step:bg-white/10 group-hover/step:border-white/20 ${item.glow} group-hover/step:shadow-2xl`}
                    >
                      <item.icon className={`w-7 h-7 ${item.color} transition-transform duration-300 group-hover/step:scale-110`} />
                    </motion.div>
                    <div className="space-y-1">
                      <p className={`text-xs font-black ${item.color} uppercase tracking-[0.2em] transition-all duration-300 group-hover/step:tracking-[0.3em]`}>
                        STEP {item.step}
                      </p>
                      <p className="text-xl font-bold text-white transition-colors duration-300 group-hover/step:text-primary-light">
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setView('signup')}
              className="px-10 py-5 rounded-3xl bg-primary text-white font-bold text-lg hover:bg-indigo-500 transition-all glow-indigo flex items-center justify-center gap-3 group"
            >
              Get Score
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <ResumePreviewCard />
        </div>
      </section>

      {/* Designed for Job Seekers Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            An AI Resume Review Tool<br />
            <span className="text-primary">Designed for Job Seekers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-20">
            HireMatch was designed for students and job seekers who want a smart review of their resume and want to improve their chances of getting selected.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BarChart3, title: 'Get your resume score', desc: 'Instantly see how well your resume matches the job description with our advanced scoring algorithm.' },
              { icon: FileText, title: 'Detailed review report', desc: 'Receive a comprehensive breakdown of your resume\'s strengths and areas that need improvement.' },
              { icon: Zap, title: 'Personalized tips', desc: 'Get actionable advice on how to tailor your CV for specific roles and industries.' }
            ].map((feature, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 text-left space-y-6 hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Understanding Check Section */}
      <section className="py-40 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div className="relative">
            {/* Floating Tags */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute -left-20 top-12 z-20"
            >
              <div className="bg-[#D1FAE5] text-[#065F46] px-6 py-3 rounded-2xl font-bold text-sm shadow-lg border border-[#A7F3D0]">
                Keywords
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute -left-28 top-1/2 -translate-y-1/2 z-20"
            >
              <div className="bg-[#FFEDD5] text-[#9A3412] px-6 py-4 rounded-2xl font-bold text-sm shadow-lg border border-[#FED7AA]">
                Contact information
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20"
            >
              <div className="bg-[#EDE9FE] text-[#5B21B6] px-8 py-4 rounded-2xl font-bold text-sm shadow-lg border border-[#DDD6FE]">
                Skills
              </div>
            </motion.div>

            {/* Detailed Resume Card */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-gray-100 relative z-10 max-w-[480px]">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h4 className="text-2xl font-black text-gray-900 tracking-tight">JASMINE BELL</h4>
                  <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mt-1">VIDEO EDITOR</p>
                  <div className="mt-4 space-y-1 text-[10px] text-gray-400 font-medium">
                    <p>1-555-2121</p>
                    <p>jasmine.bell@example.com</p>
                    <p>jasminebell.com/portfolio</p>
                  </div>
                </div>
                <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-lg">
                  <img src="https://i.pravatar.cc/150?u=jasmine" alt="Avatar" referrerPolicy="no-referrer" />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-7 space-y-8">
                  <section>
                    <h5 className="text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-1 mb-3">PORTFOLIO</h5>
                    <p className="text-[10px] leading-relaxed text-gray-500">
                      Experienced video editor with over 10 years of experience in the film and television industry. I have worked in both scripted and unscripted settings, as well as on a variety of projects ranging from feature-length movies to short-form content.
                    </p>
                  </section>
                  <section>
                    <h5 className="text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-1 mb-3">EXPERIENCE</h5>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-gray-900">Associate Producer, Writer and Videography Expert</p>
                        <p className="text-[8px] text-gray-400">Blanchette | 2018 - Present | Miami, FL</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-900">Video Editor</p>
                        <p className="text-[8px] text-gray-400">Thompson Ltd | 2012 - 2018 | Miami, FL</p>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="col-span-5 space-y-8">
                  <section>
                    <h5 className="text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-1 mb-3">SKILLS</h5>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[8px] font-bold text-primary mb-2">Design Tools</p>
                        <div className="flex flex-wrap gap-1">
                          {['After Effects', 'Premiere Pro', 'Final Cut Pro', 'Photoshop'].map(s => (
                            <span key={s} className="text-[7px] px-1.5 py-0.5 bg-gray-50 text-gray-400 rounded border border-gray-100">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[8px] font-bold text-primary mb-2">Computer Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {['Java', 'C', 'Python', 'HTML', 'CSS'].map(s => (
                            <span key={s} className="text-[7px] px-1.5 py-0.5 bg-gray-50 text-gray-400 rounded border border-gray-100">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                  <section>
                    <h5 className="text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-1 mb-3">ACHIEVEMENTS</h5>
                    <ul className="text-[8px] text-gray-500 space-y-1 list-disc pl-3">
                      <li>Co-lead Digital IT Task Force</li>
                      <li>Implementation vallenfall.se/fi</li>
                      <li>Several cool projects & presentations</li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Get an ATS<br />
              <span className="text-primary">understanding check</span>
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-600 leading-relaxed">
                Part of the resume checker score we assign is based on the parsability rate of your resume. We've reverse-engineered the most popular applicant tracking systems currently used and we look for signs of ATS compatibility.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                For each resume uploaded, we look for skills and keywords connected to the job and industry you're applying for, readable contact information, file type, and length. Then, we'll give you suggestions on how to improve your resume.
              </p>
            </div>
          </div>
        </div>
      </section>



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
          
          <div className="flex gap-10 text-sm font-semibold text-text-secondary">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>

          <p className="text-sm text-text-secondary font-medium">
            © 2024 HireMatch AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
