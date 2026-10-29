'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { TargetRole } from '@/types';
import { 
  Map, 
  CheckCircle2, 
  Lock, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  ChevronRight,
  GraduationCap,
  ShieldCheck,
  Target
} from 'lucide-react';

export default function RoadmapPage() {
  const { sprintDays, user, updateTargetRole } = useApp();
  const [selectedRoleTrack, setSelectedRoleTrack] = useState<TargetRole>(user.targetRole);

  const availableRoles: TargetRole[] = [
    'Full-Stack Web Dev',
    'Data Analyst & BI (SQL/Python)',
    'Core Engineering & Embedded (ECE/EEE/Mech)',
    'IT Services & Campus Aptitude (TCS/Infosys/CTS)',
    'Software Development Engineer (Campus SDE)',
    'QA & Automation Engineer'
  ];

  const handleTrackChange = (role: TargetRole) => {
    setSelectedRoleTrack(role);
    updateTargetRole(role);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
              Personalized 14-Day Micro-Sprints
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            14-Day Placement Sprint Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            1 concept + 1 sandboxed code practice + 1 verified checkpoint each day = +10% velocity boost. Structured for maximum retention without burnout.
          </p>
        </div>

        {/* Study Materials Shortcut Banner */}
        <Link
          href="/dashboard/study-materials"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all shrink-0"
        >
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span>Role Study Materials &rarr;</span>
        </Link>
      </div>

      {/* Role Track Switcher */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs uppercase font-bold text-slate-300 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-400" />
            Active Role Curriculum: <strong>{selectedRoleTrack}</strong>
          </span>
          <span className="text-xs text-slate-400">
            Switch track to align sprints with specific drives
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {availableRoles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleTrackChange(role)}
              className={`text-xs px-3 py-1.5 rounded-xl border font-bold transition-all shrink-0 ${
                selectedRoleTrack === role
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Legend Ribbon */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Current Target: <strong>Day 1 (Ready to Code)</strong></span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Completed (+10%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" /> Active Today
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" /> Locked
          </span>
        </div>
      </div>

      {/* Vertical 14-Day Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {sprintDays.map((day) => {
          const isCompleted = day.status === 'completed';
          const isInProgress = day.status === 'in_progress';
          const isLocked = day.status === 'locked';

          return (
            <div key={day.id} className="relative group">
              {/* Timeline Node Icon */}
              <div className={`absolute -left-6 sm:-left-8 top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                isCompleted
                  ? 'bg-emerald-500 border-emerald-400 text-white'
                  : isInProgress
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : isInProgress ? (
                  <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                ) : (
                  <Lock className="w-2.5 h-2.5 text-slate-400" />
                )}
              </div>

              {/* Day Milestone Card */}
              <Link
                href={`/dashboard/practice/${day.id}`}
                className={`block p-4 sm:p-5 rounded-2xl border transition-all ${
                  isInProgress
                    ? 'bg-slate-900/90 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/30'
                    : isCompleted
                    ? 'bg-slate-900/70 border-emerald-500/30 hover:border-emerald-500/50'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      isInProgress
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : isCompleted
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      Day {day.id}
                    </span>

                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 font-medium">
                      {day.dayCategory}
                    </span>

                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {day.estimatedTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {isCompleted && (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        +{day.earnedVelocity || 10}% Velocity
                      </span>
                    )}
                    {isInProgress && (
                      <span className="text-indigo-400 font-bold animate-pulse">
                        Open Sandbox &rarr;
                      </span>
                    )}
                    {isLocked && (
                      <span className="text-slate-500">
                        Unlocks after Day {day.id - 1}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {day.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {day.subtitle}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] truncate max-w-md">
                    Coding Challenge: <strong>{day.practice.problemTitle}</strong>
                  </span>
                  <span className="text-indigo-400 font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Practice Sandbox</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

    </div>
  );
}
