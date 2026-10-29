'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Compass, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Code2, 
  Mic2, 
  FileCheck2, 
  Zap,
  Target
} from 'lucide-react';

export default function RootPage() {
  const router = useRouter();
  const { setGuestUser } = useApp();

  const handleInstantDemo = () => {
    setGuestUser();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top clean header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-100 tracking-tight">PlacementForge</span>
              <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold uppercase">
                Zero-to-Offer OS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleInstantDemo}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-semibold transition-colors hidden sm:inline-flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              Instant Demo
            </button>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <main className="max-w-5xl mx-auto px-6 py-16 sm:py-24 text-center">
        {/* Velocity Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-6">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Non-judgmental assessment • Focused strictly on Personal Velocity</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight sm:leading-none max-w-4xl mx-auto">
          The Zero-to-Offer <br />
          <span className="text-indigo-400">Placement Operating System</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Designed specifically for university students and non-CS branch switchers preparing for TCS, CTS, Infosys, Zoho, and campus SDE drives. Stop memorizing syntax—learn flow, master the corporate pivot, and track your readiness.
        </p>

        {/* Primary Call to Action */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40"
          >
            <span>Start Free Calibration</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={handleInstantDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-colors"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>One-Click Guest Demo (Pre-Calibrated)</span>
          </button>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-100">Reverse Resume</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              No resume? Check basic things you've touched in labs or mini-projects to generate a Day-0 foundational profile.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-100">Readiness Radar</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              4 clean axes (Logic, Core, Tech, Articulation) tracking personal velocity delta (+14%) rather than intimidating grades.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-100">14-Day Micro-Sprints</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Learn (ELI5 + Tanglish tips), Practice (1 problem with 3 progressive hints), and Verify with instant AI evaluation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <Mic2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-amber-200">Adaptive Mentor Mode</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Stuck or make a mistake? Shifts into warm amber mentor mode, teaches the corporate pivot phrase, and lets you retry.
            </p>
          </div>

        </div>

      </main>

      {/* Clean footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-400">
        PlacementForge • Designed for campus placement readiness • Zero clutter, maximum velocity.
      </footer>

    </div>
  );
}
