'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { 
  Compass, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Code2, 
  Mic2, 
  FileCheck2, 
  Zap,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  HeartHandshake,
  Clock
} from 'lucide-react';

export default function RootPage() {
  const router = useRouter();
  const { setGuestUser } = useApp();

  const handleInstantDemo = () => {
    setGuestUser();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-200">
      
      {/* 1. Top Announcement Bar */}
      <div className="bg-zinc-900 text-zinc-300 text-xs py-2 px-4 sm:px-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold text-[10px] uppercase tracking-wider">
              Student Edition
            </span>
            <span className="text-zinc-400 hidden sm:inline text-xs">
              A calm, guided path through campus drives and tech rounds. No panic, no cramming.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/login" className="text-zinc-400 hover:text-zinc-200 transition-colors hidden md:inline">
              Student Sign In
            </Link>
            <span className="text-zinc-700 hidden md:inline">|</span>
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="border-b border-zinc-200/90 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-6 py-3.5 sticky top-0 z-40 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Compass className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-zinc-900 dark:text-zinc-50 tracking-tight">
                  Placement<span className="text-indigo-600 dark:text-indigo-400">Forge</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 font-semibold">
                  Student Edition
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-none hidden sm:block">
                Your Daily Placement Companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleInstantDemo}
              className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold transition-all hidden sm:inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Instant Demo</span>
            </button>
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              Open Workspace
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Tactile, Linear / Notion Inspired) */}
      <main className="max-w-5xl mx-auto px-6 py-14 sm:py-20 text-center">
        
        {/* Supportive Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Zero Intimidation &bull; Real Student Sprints &bull; Your Progress (+14% this week)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight sm:leading-none max-w-4xl mx-auto">
          Let's get you placement-ready, <br />
          <span className="text-indigo-600 dark:text-indigo-400">one day at a time.</span>
        </h1>

        <p className="mt-5 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Designed specifically for college students across ECE, Mechanical, Civil, Biotech, and CS branches. 25 minutes of structured, plain-English practice daily for TCS, Zoho, Cognizant, Infosys, and Tech SDE drives.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Day 1 Practice</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={handleInstantDemo}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Explore Demo (No Sign Up)</span>
          </button>
        </div>

        {/* 4 Clean Practical Student Metrics Banner */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-500" /> Daily Time
            </span>
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">25 Mins</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Bite-sized daily tasks</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Weekly Gain
            </span>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">+14% Velocity</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Proven student growth</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-500" /> Zero Jargon
            </span>
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">Plain English</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">+ Tanglish sticky notes</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /> Day-1 Baseline
            </span>
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">20% Start</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Zero penalty for beginners</p>
          </div>
        </div>

        {/* 4 Practical Student Pillars Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs tactile-card">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              1. 14-Day Micro-Sprint Sandbox
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Every day teaches one concept in plain English with everyday analogies, followed by an interactive code block with progressive hints ("Need a hint?", "Still stuck?", "Show solution").
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs tactile-card">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3">
              <Mic2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              2. Adaptive Mock Interviewer &amp; Coach
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Polite interviewer questions with voice mic support. If you're stuck, it gently shifts to an encouraging Coach Note teaching you the exact corporate pivot phrase to use.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs tactile-card">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              3. Don't Have a Resume Yet?
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Tick what you've actually touched in college labs and coursework. We convert your practical experience into recruiter-ready bullet points with zero penalty.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs tactile-card">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              4. Placement Cell Mentor Desk
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Ask real campus questions: how to explain a 1-year gap to TCS HR, answering 'Why IT?' as an ECE/Mech student, or cracking Cognizant and Zoho round 2.
            </p>
          </div>

        </div>

      </main>

      {/* 5. Clean Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        <p>PlacementForge &bull; Made for engineering students preparing for campus placements.</p>
      </footer>

    </div>
  );
}
