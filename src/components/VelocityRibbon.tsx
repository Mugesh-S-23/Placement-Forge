'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { TrendingUp, Target, ShieldCheck, Zap } from 'lucide-react';

export const VelocityRibbon: React.FC = () => {
  const { scores, user } = useApp();

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Role and User Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold shrink-0">
            <Target className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Target Track</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-medium">
                {user.targetRole}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {user.experienceLevel}
              </span>
            </div>
            <p className="text-sm text-slate-300 mt-0.5">
              Candidate: <span className="text-slate-100 font-medium">{user.name}</span> ({user.department}, {user.college})
            </p>
          </div>
        </div>

        {/* Right: Metrics Ribbon */}
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
          {/* Baseline */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Calibrated Baseline</p>
              <p className="text-base font-semibold text-slate-300">{scores.baseline.overall}%</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-slate-800"></div>

          {/* Current Readiness */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
              <Zap className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-indigo-300 font-medium">Current Readiness</p>
              <p className="text-base font-bold text-slate-100">{scores.current.overall}%</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-slate-800"></div>

          {/* Personal Velocity Badge (Bright Emerald) */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <TrendingUp className="w-4 h-4 shrink-0 text-emerald-400" />
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold block text-emerald-300/80">Personal Velocity</span>
              <span className="text-sm font-bold text-emerald-400">
                +{scores.velocityDelta}% this week
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
