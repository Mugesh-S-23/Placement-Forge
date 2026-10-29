'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { 
  Bot, 
  TrendingUp, 
  Compass, 
  Menu, 
  BookOpen,
  Mic,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const { scores, setIsForgeBotOpen } = useApp();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {onToggleMobileSidebar && (
              <button 
                onClick={onToggleMobileSidebar}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 lg:hidden focus:outline-none"
                aria-label="Toggle navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  {/* Vibrant Bold Brand Format */}
                  <span className="placement-forge-brand text-lg sm:text-xl">
                    Placement Forge
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase tracking-wider hidden sm:inline-block">
                    OS
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-none hidden sm:block">
                  Campus Placement Operating System
                </p>
              </div>
            </Link>
          </div>

          {/* Center Navigation Shortcuts (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="/dashboard/roadmap"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                pathname.includes('/roadmap') || pathname.includes('/practice')
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              14-Day Sprint
            </Link>

            <Link 
              href="/dashboard/study-materials"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                pathname.includes('/study-materials')
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              Study Materials
            </Link>

            <Link 
              href="/dashboard/mock-interview"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                pathname.includes('/mock-interview')
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-amber-400" />
              Adaptive Interview
            </Link>
          </nav>

          {/* Right Actions: Theme Switcher, Velocity Pill, and ForgeBot Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Switcher Toggle (Light, Dark, System) */}
            <ThemeSwitcher />

            {/* Emerald Velocity Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5 shrink-0" />
              <span>+{scores.velocityDelta}% Velocity</span>
            </div>

            {/* Placement AI Mentor Button */}
            <button
              onClick={() => setIsForgeBotOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-sm focus:outline-none"
              title="Open ForgeBot Placement AI Mentor"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Ask ForgeBot</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
