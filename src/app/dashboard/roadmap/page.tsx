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
  ChevronRight, 
  GraduationCap, 
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

  const completedCount = sprintDays.filter(d => d.status === 'completed').length;

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
              14-Day Micro-Sprints
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            14-Day Placement Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5 max-w-2xl leading-relaxed">
            1 plain-English concept + 1 quick practice challenge + 1 mentor checkpoint daily. Designed to fit naturally around your college schedule without burnout.
          </p>
        </div>

        {/* Study Materials Shortcut Banner */}
        <Link
          href="/dashboard/study-materials"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all shrink-0 shadow-xs"
        >
          <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Role Cheat Sheets &rarr;</span>
        </Link>
      </div>

      {/* Role Track Switcher Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            Active Role: <strong className="text-zinc-900 dark:text-zinc-100">{selectedRoleTrack}</strong>
          </span>
          <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
            {completedCount} of 14 Sprints Completed
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {availableRoles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleTrackChange(role)}
              className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all shrink-0 cursor-pointer ${
                selectedRoleTrack === role
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xs font-semibold'
                  : 'bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* 14 Days List */}
      <div className="space-y-3">
        {sprintDays.map((sprint) => {
          const isCompleted = sprint.status === 'completed';
          const isInProgress = sprint.status === 'in_progress';
          const isLocked = sprint.status === 'locked';

          return (
            <div
              key={sprint.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isCompleted
                  ? 'bg-white dark:bg-zinc-900/90 border-emerald-200/80 dark:border-emerald-900/60 shadow-xs'
                  : isInProgress
                  ? 'bg-white dark:bg-zinc-900 border-indigo-300 dark:border-indigo-700 ring-1 ring-indigo-400/20 shadow-xs tactile-card'
                  : 'bg-zinc-50/60 dark:bg-zinc-950/40 border-zinc-200/70 dark:border-zinc-800/60 opacity-80'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3.5">
                {/* State Badge Icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                  isCompleted
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    : isInProgress
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <span>{sprint.id}</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">
                      Day {sprint.id}: {sprint.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                      {sprint.dayCategory}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1">
                    {sprint.subtitle}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  {sprint.estimatedTime}
                </span>

                {isLocked ? (
                  <span className="text-xs text-zinc-400 font-medium px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 cursor-not-allowed">
                    Locked
                  </span>
                ) : (
                  <Link
                    href={`/dashboard/practice/${sprint.id}`}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isInProgress
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                        : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <span>{isCompleted ? 'Review' : 'Start Day ' + sprint.id}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
