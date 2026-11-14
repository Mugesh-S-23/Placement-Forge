'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Target, TrendingUp, Calendar, Flame, CheckCircle2 } from 'lucide-react';

export const VelocityRibbon: React.FC = () => {
  const { scores, user, sprintDays } = useApp();

  // Find active day or default to Day 3
  const activeDay = sprintDays.find(d => d.status === 'in_progress') || sprintDays[2] || sprintDays[0];
  const completedCount = sprintDays.filter(d => d.status === 'completed').length;

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xs transition-colors duration-200">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left: Today's Date & Student Target Goal */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                {todayFormatted}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 font-semibold">
                {user.targetRole}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium">
              Student: <span className="font-bold text-zinc-900 dark:text-white">{user.name}</span> <span className="text-zinc-500 dark:text-zinc-400 text-xs">({user.department})</span>
            </p>
          </div>
        </div>

        {/* Right: Warm Streak Badge & Student Progress */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          
          {/* Warm Streak Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 text-xs font-bold shadow-2xs">
            <span className="text-base leading-none">🔥</span>
            <span>Day {activeDay.id} of 14</span>
            <span className="text-[10px] font-normal text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60">
              {completedCount} Completed
            </span>
          </div>

          {/* Student Progress (Humanized copy) */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200 shadow-2xs">
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Progress this week
              </p>
              <p className="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200">
                +{scores.velocityDelta}% faster than Day 1
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
