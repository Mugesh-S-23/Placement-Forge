'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { 
  Menu, 
  BookOpen,
  Mic,
  GraduationCap,
  TrendingUp,
  Compass,
  Video,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const { scores, setIsForgeBotOpen, user } = useApp();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 transition-colors duration-200">
      
      {/* 1. Top Informational Ribbon (Subtle, Clean Slate) */}
      <div className="bg-zinc-900 text-zinc-300 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 hidden md:block w-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-indigo-300 font-semibold">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              Student Placement Workspace
            </span>
            <span className="text-zinc-600">&bull;</span>
            <span className="text-zinc-400">
              Department: <strong className="text-zinc-200">{user.department}</strong> ({user.college})
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 font-medium">
            <Link href="/dashboard/roadmap" className="hover:text-zinc-200 transition-colors">
              14-Day Roadmap
            </Link>
            <span className="text-zinc-700">|</span>
            <Link href="/dashboard/study-materials" className="hover:text-zinc-200 transition-colors">
              Role Cheat Sheets
            </Link>
            <span className="text-zinc-700">|</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Readiness: {scores.current.overall}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header (Clean Zinc/Slate Surface) */}
      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200/90 dark:border-zinc-800 transition-colors shadow-xs w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15 sm:h-16 gap-3">
            
            {/* Logo & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              {onToggleMobileSidebar && (
                <button 
                  onClick={onToggleMobileSidebar}
                  className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 lg:hidden focus:outline-none transition-colors"
                  aria-label="Toggle navigation"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}

              <Link href="/dashboard" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5 text-white stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-zinc-50">
                      Placement<span className="text-indigo-600 dark:text-indigo-400">Forge</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 font-semibold uppercase tracking-wider">
                      Student
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal leading-none hidden sm:block">
                    Your Daily Placement Companion
                  </p>
                </div>
              </Link>
            </div>

            {/* Center Navigation Shortcuts */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link 
                href="/dashboard/roadmap"
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  pathname.includes('/roadmap') || pathname.includes('/practice')
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-2xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                14-Day Roadmap
              </Link>

              <Link 
                href="/dashboard/study-materials"
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  pathname.includes('/study-materials')
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-2xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                Cheat Sheets
              </Link>

              <Link 
                href="/dashboard/mock-interview"
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  pathname.includes('/mock-interview')
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-2xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-amber-500" />
                Mock Interview
              </Link>

              <Link 
                href="/dashboard/video-vault"
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  pathname.includes('/video-vault')
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-2xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                Masterclasses
              </Link>
            </nav>

            {/* Right Actions: Theme Switcher, Progress Pill, and Mentor Desk Trigger */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Theme Switcher Toggle */}
              <ThemeSwitcher />

              {/* Progress Badge */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>+{scores.velocityDelta}% this week</span>
              </div>

              {/* Placement Cell Mentor Desk Button */}
              <button
                type="button"
                onClick={() => setIsForgeBotOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-xs hover:shadow-sm cursor-pointer"
                title="Open Placement Cell Mentor Desk"
              >
                <MessageSquare className="w-3.5 h-3.5 text-indigo-200" />
                <span>Mentor Desk</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
