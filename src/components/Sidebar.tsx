'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  LayoutDashboard, 
  Map, 
  GraduationCap, 
  Code2, 
  Compass, 
  FileCheck2, 
  Mic2, 
  MessageSquare, 
  Video, 
  RefreshCcw,
  X,
  Target,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, onCloseMobile }) => {
  const pathname = usePathname();
  const { user, resetToDemo, scores } = useApp();

  const navLinks = [
    {
      name: 'Workspace Hub',
      href: '/dashboard',
      icon: LayoutDashboard,
      badge: 'Today'
    },
    {
      name: '14-Day Roadmap',
      href: '/dashboard/roadmap',
      icon: Map,
      badge: 'Step-by-step'
    },
    {
      name: 'Cheat Sheets & Notes',
      href: '/dashboard/study-materials',
      icon: GraduationCap,
      badge: 'Handbooks'
    },
    {
      name: 'Daily Practice Loop',
      href: '/dashboard/practice/1',
      icon: Code2,
      badge: 'Code'
    },
    {
      name: 'Quick 3-Min Check',
      href: '/dashboard/diagnostic',
      icon: Compass,
      badge: 'Calibrate'
    },
    {
      name: 'Tell What You Built',
      href: '/dashboard/resume-audit',
      icon: FileCheck2,
      badge: user.hasResume ? 'Parsed' : 'Day-0'
    },
    {
      name: 'Mock Interview Room',
      href: '/dashboard/mock-interview',
      icon: Mic2,
      badge: 'Voice/Text'
    },
    {
      name: 'Mentor Desk',
      href: '/dashboard/chat',
      icon: MessageSquare,
      badge: 'Q&A'
    },
    {
      name: 'Campus Masterclasses',
      href: '/dashboard/video-vault',
      icon: Video,
      badge: '6 Briefings'
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 border-r border-zinc-200/90 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 w-64 p-3.5 transition-colors duration-200 shadow-xs">
      
      {/* Mobile Header with Close button */}
      <div className="flex items-center justify-between lg:hidden pb-3 mb-2 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Navigation</span>
        <button
          onClick={onCloseMobile}
          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Close navigation menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Student Profile Card */}
      <div className="p-3 mb-2 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/90 dark:border-zinc-800 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
            {user.name ? user.name.charAt(0) : 'S'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">{user.name}</h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">{user.department}</p>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between text-[11px]">
          <span className="text-zinc-500 dark:text-zinc-400 font-medium">Goal:</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold truncate max-w-[130px]" title={user.targetRole}>
            {user.targetRole}
          </span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="space-y-0.5 flex-1 overflow-y-auto pr-0.5 text-xs">
        {navLinks.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all group ${
                isActive 
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive 
                    ? 'text-indigo-600 dark:text-indigo-400' 
                    : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-200'
                }`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-medium ${
                  isActive 
                    ? 'bg-zinc-200/80 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200' 
                    : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Demo Reset & Velocity Indicator */}
      <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
        <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
          <span className="text-[11px] font-semibold">Weekly Progress</span>
          <span className="font-bold">+{scores.velocityDelta}%</span>
        </div>

        <button
          onClick={resetToDemo}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-[11px] font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Reset to sample student data"
        >
          <RefreshCcw className="w-3 h-3" />
          <span>Reset Sample Data</span>
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar - Flush to Left Corner */}
      <aside className="hidden lg:block shrink-0 sticky top-[89px] h-[calc(100vh-89px)] z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
            onClick={onCloseMobile} 
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full z-10 shadow-xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
