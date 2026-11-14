'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { TargetRole, ExperienceLevel } from '@/types';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Compass,
  Check,
  HeartHandshake
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, signupUser, setGuestUser, user, setUser } = useApp();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Role Pill Selection
  const [selectedRole, setSelectedRole] = useState<TargetRole>(user.targetRole || 'Full-Stack Web Dev');
  
  // Encouraging Zero-to-One toggle
  const [isStartingFromZero, setIsStartingFromZero] = useState<boolean>(
    user.experienceLevel ? user.experienceLevel.includes('Zero') : true
  );

  const rolePills: { id: TargetRole; label: string; icon: string }[] = [
    { id: 'Full-Stack Web Dev', label: 'Full-Stack', icon: '💻' },
    { id: 'Data Analyst & BI (SQL/Python)', label: 'Data Analyst', icon: '📊' },
    { id: 'Software Development Engineer (Campus SDE)', label: 'Core Java / SDE', icon: '⚡' },
    { id: 'QA & Automation Engineer', label: 'QA Testing', icon: '🧪' }
  ];

  const handleInstantGuestDemo = () => {
    setGuestUser();
    router.push('/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter your email and password to continue.');
      return;
    }

    // Save customized role and starting baseline state
    setUser(prev => ({
      ...prev,
      targetRole: selectedRole,
      experienceLevel: isStartingFromZero 
        ? 'Starting from Zero (Beginner)' 
        : 'Intermediate'
    }));

    if (authMode === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please enter your name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      signupUser(name, email, password);
      router.push('/dashboard');
    } else {
      loginUser(email, password);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 transition-colors duration-200 relative">
      
      {/* Top Navigation & Theme Switcher */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-lg relative z-10 space-y-6 my-6">
        
        {/* Welcoming Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>PlacementForge &bull; Student Companion</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Let's get you placement-ready, one day at a time.
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            A calm, step-by-step workspace designed for real college students. No overwhelming jargon, just 25 minutes of high-yield practice a day.
          </p>
        </div>

        {/* 1-Click Fast Preview Pill Box */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 flex items-center justify-between gap-3 shadow-xs tactile-card">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">Just exploring the portal?</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Skip registration with pre-loaded sample student data</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleInstantGuestDemo}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-xs"
          >
            Instant Demo
          </button>
        </div>

        {/* Main Authentication & Profile Box */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
          
          {/* Sign In vs Sign Up Tabs */}
          <div className="flex rounded-xl bg-zinc-100 dark:bg-zinc-950 p-1 border border-zinc-200/80 dark:border-zinc-800 text-xs">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                authMode === 'signin'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Sign In to Your Workspace
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              New Student (Sign Up)
            </button>
          </div>

          {/* Quick Target Role Pill Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              What campus role are you aiming for?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {rolePills.map(r => {
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-400 dark:border-indigo-600 shadow-xs ring-1 ring-indigo-400/30'
                        : 'bg-zinc-50 dark:bg-zinc-950/50 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span>{r.icon}</span>
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Encouraging "Starting from Zero" Toggle */}
          <div 
            onClick={() => setIsStartingFromZero(!isStartingFromZero)}
            className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 select-none ${
              isStartingFromZero
                ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/80 text-amber-950 dark:text-amber-200'
                : 'bg-zinc-50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
              isStartingFromZero 
                ? 'bg-amber-600 border-amber-600 text-white' 
                : 'border-zinc-400 dark:border-zinc-600'
            }`}>
              {isStartingFromZero && <Check className="w-3 h-3 stroke-[2.5]" />}
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-xs flex items-center gap-1.5">
                🌱 I'm starting from zero
                <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                  Recommended for beginners
                </span>
              </span>
              <p className="text-[11px] leading-relaxed opacity-90">
                Never coded much outside syllabus? That is completely normal! We start with simple everyday analogies before writing any code.
              </p>
            </div>
          </div>

          {/* Sign In / Sign Up Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Arun Kumar"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu or personal email"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            )}

            {errorMsg && (
              <p className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 p-3 rounded-xl border border-rose-200 dark:border-rose-800 font-medium">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md cursor-pointer mt-2"
            >
              <span>{authMode === 'signin' ? 'Open My Workspace' : 'Create My Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Switch tab helper */}
          <div className="text-center pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
            {authMode === 'signin' ? (
              <span>
                First time here?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already practicing?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>

        </div>

        {/* Friendly footer reassuring students */}
        <div className="text-center text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1.5 font-medium">
          <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Tailored for ECE, Mechanical, Civil, Biotech &amp; CS students preparing for campus placements.</span>
        </div>

      </div>
    </div>
  );
}
