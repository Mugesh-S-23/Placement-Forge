'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Compass, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Eye, 
  EyeOff 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, signupUser, setGuestUser } = useApp();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInstantGuestDemo = () => {
    setGuestUser();
    // After login, route directly to the Command Center dashboard!
    router.push('/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please provide your email and password.');
      return;
    }

    if (authMode === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      signupUser(name, email, password);
      // New signup goes to profile onboarding to select department, college, year, and target role!
      router.push('/onboarding');
    } else {
      loginUser(email, password);
      // Returning sign in goes straight to the Command Center dashboard!
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Vibrant Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 text-white mb-3 shadow-lg shadow-indigo-600/30">
            <Compass className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            <span className="placement-forge-brand">Placement Forge</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Zero-to-Offer Placement Operating System across All Engineering &amp; Campus Branches
          </p>
        </div>

        {/* Instant One-Click Demo Box for Judges & Fast Testing */}
        <div className="mb-5 p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
                Quick Evaluators &amp; Campus Demo
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Instant 1-click access to calibrated portal.
              </p>
            </div>
            <button
              type="button"
              onClick={handleInstantGuestDemo}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm shrink-0"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>1-Click Guest Demo</span>
            </button>
          </div>
        </div>

        {/* Clean Authentication Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl backdrop-blur-md space-y-5">
          
          {/* Sign In vs Sign Up Tabs */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                authMode === 'signin'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                authMode === 'signup'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Create Account (Sign Up)
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name for Sign Up */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Arun Kumar"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                College / Personal Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu or email"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password for Sign Up */}
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {errorMsg && (
              <p className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                {errorMsg}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/25 mt-2"
            >
              <span>{authMode === 'signin' ? 'Sign In & Enter Command Center' : 'Create Account & Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Alternate switch */}
          <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
            {authMode === 'signin' ? (
              <span>
                New student?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold underline"
                >
                  Create free account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold underline"
                >
                  Sign In here
                </button>
              </span>
            )}
          </div>

        </div>

        {/* Scalability note across departments */}
        <div className="text-center mt-5 text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Supports ECE, EEE, Mech, Civil, Biotech, CSE &amp; Non-CS Switchers</span>
        </div>

      </div>
    </div>
  );
}
