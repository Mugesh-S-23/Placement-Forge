'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { VelocityRibbon } from '@/components/VelocityRibbon';
import { ReadinessRadar } from '@/components/ReadinessRadar';
import { 
  ArrowRight, 
  Code2, 
  Compass, 
  Mic2, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap,
  Play, 
  FileCheck2,
  Video,
  X,
  Clock,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export default function DashboardPage() {
  const { user, scores, sprintDays, setIsForgeBotOpen, diagnosticCompleted } = useApp();
  const [showSkillCheckBanner, setShowSkillCheckBanner] = useState(!diagnosticCompleted);

  // Find current in-progress day or default to Day 1
  const currentSprint = sprintDays.find(d => d.status === 'in_progress') || sprintDays[0];

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-200">
      
      {/* 1. Quick 3-Minute Skill Check Banner (Friendly, supportive invitation) */}
      {showSkillCheckBanner && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/80 shadow-xs relative transition-colors duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-amber-800 dark:text-amber-200 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-200/70 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200">
                    Quick 3-Minute Skill Check
                  </span>
                  <span className="text-xs text-amber-800 dark:text-amber-400 font-semibold">
                    No grades, zero pressure
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Calibrate your starting baseline for {user.targetRole}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Answer 3 quick logic and communication questions so we can tailor your daily sprints.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/dashboard/diagnostic"
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Start 3-Min Check</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setShowSkillCheckBanner(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Top Student Workspace Bar: Date, Goal, Streak & Progress */}
      <VelocityRibbon />

      {/* 3. Main Student Workspace Grid: Left Today's Task & Actions + Right Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Prominent "Today's Task" Card & Core Student Tools (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5">
          
          {/* Prominent "Today's Task" Card with 30-Minute Timer Badge */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 shadow-xs relative overflow-hidden tactile-card">
            
            {/* Top Badge & Timer */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 text-xs font-bold">
                  Today's Task
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Sprint Day {currentSprint.id} of 14
                </span>
              </div>

              {/* 30-Minute Timer Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>30 mins</span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
              Day {currentSprint.id}: {currentSprint.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
              {currentSprint.subtitle}
            </p>

            {/* Step Indicators */}
            <div className="mt-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px]">1</span>
                <span>Plain-English Concept</span>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px]">2</span>
                <span>Practice Code</span>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-[10px]">3</span>
                <span>Tell Your Mentor</span>
              </div>
            </div>

            {/* Direct Start Button */}
            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Earn +10% progress upon completion
              </span>

              <Link
                href={`/dashboard/practice/${currentSprint.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Start Day {currentSprint.id}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3 Tactile Student Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            
            {/* Card 1: Study Notes & Cheat Sheets */}
            <Link
              href="/dashboard/study-materials"
              className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-xs tactile-card group flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2.5 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Concept Cheat Sheets
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                  Simple notes &amp; analogies for {user.targetRole}.
                </p>
              </div>
              <div className="mt-3 flex items-center text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                <span>Browse Notes</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Mock Interview Room */}
            <Link
              href="/dashboard/mock-interview"
              className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-xs tactile-card group flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2.5 group-hover:scale-105 transition-transform">
                  <Mic2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Mock Interview
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                  Practice spoken answers with gentle coach feedback.
                </p>
              </div>
              <div className="mt-3 flex items-center text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
                <span>Practice Speaking</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Placement Cell Mentor Desk */}
            <button
              type="button"
              onClick={() => setIsForgeBotOpen(true)}
              className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-xs tactile-card group flex flex-col justify-between text-left cursor-pointer"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2.5 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  Placement Cell Mentor Desk
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                  Ask about TCS, Zoho, gap years &amp; branch shifts.
                </p>
              </div>
              <div className="mt-3 flex items-center text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                <span>Ask a Question</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

          </div>

        </div>

        {/* Right Column: Visual Readiness Radar Card with Human Caption (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Readiness Profile
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
                Updated Live
              </span>
            </div>

            {/* Humanized Caption as requested */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Where your strengths are balancing out across core technical, logic, and interview communication pillars.
            </p>
          </div>

          <div className="my-2">
            <ReadinessRadar baseline={scores.baseline} current={scores.current} />
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-zinc-600 dark:text-zinc-400">
              Track: <strong className="text-zinc-900 dark:text-zinc-100">{user.targetRole}</strong>
            </span>
            <Link 
              href="/dashboard/diagnostic"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Retake Skill Check</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* 4. Bottom Grid: Reverse Resume & Campus Masterclasses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Reverse Resume Snapshot (Humanized copy) */}
        <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 shadow-xs transition-colors duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
                Don't have a resume yet? Tell us what you've built
              </h3>
            </div>
            <Link
              href="/dashboard/resume-audit"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Edit List</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3.5 leading-relaxed">
            Every lab session and class experiment counts. Here are the practical points extracted from your coursework:
          </p>

          <div className="space-y-2">
            {user.reverseResumeSkills.slice(0, 3).map((skill, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Masterclass Playbook Snapshot */}
        <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
                  Campus Placement Masterclass
                </h3>
              </div>
              <Link
                href="/dashboard/video-vault"
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>All 6 Masterclasses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 font-semibold">
                  Alumni Advice &bull; 18 mins
                </span>
              </div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                The Non-CS Student's Playbook for Campus Tech Placements
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                By Siddharth M. (Software Engineer @ Zoho, Ex-Mechanical). How to crack Zoho Round 2 &amp; 3 without a CS degree.
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Includes: Resume framing, 60-day calendar</span>
            <Link
              href="/dashboard/video-vault"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Watch Video</span>
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
