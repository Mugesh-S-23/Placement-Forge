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
  X
} from 'lucide-react';

export default function DashboardPage() {
  const { user, scores, sprintDays, setIsForgeBotOpen, diagnosticCompleted } = useApp();
  const [showCalibrationBanner, setShowCalibrationBanner] = useState(!diagnosticCompleted);

  // Find first active/in-progress day or default to Day 1
  const currentSprint = sprintDays.find(d => d.status === 'in_progress') || sprintDays[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* 1. Optional Invitation to Calibrate Baseline (Never forced, easily dismissable) */}
      {showCalibrationBanner && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/40 shadow-lg relative animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300 font-bold shrink-0">
                <Compass className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Recommended 3-Min Calibration
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Zero Pressure
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-100 mt-1">
                  Establish Your Personalized Readiness Radar
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Answer 3 quick logic &amp; flow questions (or skip with zero baseline) to calibrate your starting point for <strong>{user.targetRole}</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/dashboard/diagnostic"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Take Diagnostic (3 Mins)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setShowCalibrationBanner(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Top Highlights Ribbon */}
      <VelocityRibbon />

      {/* 3. Command Center Grid: Left Readiness Radar + Right Today's Sprint & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Visual Readiness Radar Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-400" />
                Readiness Radar
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                Non-Judgmental
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Personal growth delta across 4 placement pillars. Calibrated baseline vs. your active progress.
            </p>
          </div>

          <div className="my-2">
            <ReadinessRadar baseline={scores.baseline} current={scores.current} />
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Target Role: <strong>{user.targetRole}</strong></span>
            <Link 
              href="/dashboard/diagnostic"
              className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1"
            >
              <span>Recalibrate</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Right Column: Recommended Sprint & Quick Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          
          {/* Today's Recommended Sprint Card */}
          <div className="bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
                  Today's Recommended Sprint
                </span>
                <span className="text-xs text-slate-400">Day {currentSprint.id} • {currentSprint.estimatedTime}</span>
              </div>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                +10% Velocity on Verify
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
              Day {currentSprint.id}: {currentSprint.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
              {currentSprint.subtitle}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span>3-step loop: Learn &bull; Code Sandbox &bull; Verify</span>
              </div>

              <Link
                href={`/dashboard/practice/${currentSprint.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-sm group-hover:shadow-md"
              >
                <span>Launch Day {currentSprint.id} Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 3 Core Placement Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            
            {/* Action 1: Role Study Materials (NEW!) */}
            <Link
              href="/dashboard/study-materials"
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all hover:bg-slate-850 group flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors">
                  Study Materials
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Self-contained notes &amp; cheat sheets for your role.
                </p>
              </div>
              <div className="mt-3 flex items-center text-[11px] text-emerald-400 font-medium">
                <span>Open Library</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Action 2: Enter Mock Interview Room */}
            <Link
              href="/dashboard/mock-interview"
              className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20 hover:border-amber-500/40 transition-all hover:bg-slate-850 group flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2.5">
                  <Mic2 className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors">
                  Mock Interview
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Adaptive dual-mode: Shift to mentor pivot if stuck.
                </p>
              </div>
              <div className="mt-3 flex items-center text-[11px] text-amber-400 font-medium">
                <span>Enter Room</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Action 3: Ask Placement Mentor AI */}
            <button
              type="button"
              onClick={() => setIsForgeBotOpen(true)}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all hover:bg-slate-850 group flex flex-col justify-between text-left"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                  Ask ForgeBot AI
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  TCS, Zoho, Cognizant patterns &amp; resume tips.
                </p>
              </div>
              <div className="mt-3 flex items-center text-[11px] text-indigo-400 font-medium">
                <span>Open Drawer</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

          </div>

        </div>

      </div>

      {/* 4. Bottom Grid: Reverse Resume Foundational Status & Masterclasses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Reverse Resume Snapshot (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Reverse Resume Foundations
              </h3>
            </div>
            <Link
              href="/dashboard/resume-audit"
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1"
            >
              <span>Audit &bull; Edit</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <p className="text-xs text-slate-400 mb-3">
            Extracted college coursework, lab experiments, and mini-project foundations mapped into recruiter-ready logic:
          </p>

          <div className="space-y-2">
            {user.reverseResumeSkills.slice(0, 3).map((skill, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Masterclass Vault Snapshot (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Featured Masterclass
                </h3>
              </div>
              <Link
                href="/dashboard/video-vault"
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1"
              >
                <span>View All 6</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold uppercase">
                  Alumni Secrets
                </span>
                <span className="text-[11px] text-slate-400">18 mins</span>
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-slate-100">
                The Non-CS Student's Playbook for Campus Tech Placements
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                By Siddharth M. (Software Engineer @ Zoho, Ex-Mechanical). How to crack Zoho Round 2 &amp; 3 without a CS degree.
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Includes: Resume framing, 60-day calendar</span>
            <Link
              href="/dashboard/video-vault"
              className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1"
            >
              <span>Watch Now</span>
              <Play className="w-3 h-3 ml-0.5 fill-current" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
