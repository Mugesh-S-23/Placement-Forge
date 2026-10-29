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
  ShieldCheck,
  X,
  Target
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
      name: 'Command Center',
      href: '/dashboard',
      icon: LayoutDashboard,
      badge: 'Hub'
    },
    {
      name: '14-Day Sprint',
      href: '/dashboard/roadmap',
      icon: Map,
      badge: 'Daily'
    },
    {
      name: 'Study Materials',
      href: '/dashboard/study-materials',
      icon: GraduationCap,
      badge: 'All Roles'
    },
    {
      name: 'Daily Practice Loop',
      href: '/dashboard/practice/1',
      icon: Code2,
      badge: 'Sandbox'
    },
    {
      name: 'Calibration Diagnostic',
      href: '/dashboard/diagnostic',
      icon: Compass,
      badge: '3-Min'
    },
    {
      name: 'Reverse Resume',
      href: '/dashboard/resume-audit',
      icon: FileCheck2,
      badge: user.hasResume ? 'Parsed' : 'Day-0'
    },
    {
      name: 'Adaptive Mock Interview',
      href: '/dashboard/mock-interview',
      icon: Mic2,
      badge: 'Mentor'
    },
    {
      name: 'Placement AI Mentor',
      href: '/dashboard/chat',
      icon: MessageSquare,
      badge: 'ForgeBot'
    },
    {
      name: 'Masterclass Vault',
      href: '/dashboard/video-vault',
      icon: Video,
      badge: '6 Vaults'
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900/95 dark:bg-slate-900/95 border-r border-slate-800 text-slate-300 w-64 p-4 transition-colors">
      {/* Mobile Header with Close button */}
      <div className="flex items-center justify-between lg:hidden pb-4 mb-2 border-b border-slate-800">
        <span className="font-bold text-slate-100 text-sm">Navigation Menu</span>
        <button
          onClick={onCloseMobile}
          className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Mini Card */}
      <div className="p-3 mb-3 rounded-xl bg-slate-800/60 dark:bg-slate-800/60 border border-slate-700/60">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-sm shrink-0">
            {user.name ? user.name.charAt(0) : 'C'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-slate-100 truncate">{user.name}</h4>
            <p className="text-[11px] text-slate-400 truncate">{user.department}</p>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px]">
          <span className="text-slate-400 flex items-center gap-1">
            <Target className="w-3 h-3 text-indigo-400" />
            Track:
          </span>
          <span className="text-indigo-400 font-semibold truncate max-w-[130px]" title={user.targetRole}>
            {user.targetRole}
          </span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="space-y-1 flex-1 overflow-y-auto pr-1">
        {navLinks.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive 
                  ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span>{item.name}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                isActive 
                  ? 'bg-indigo-500/20 text-indigo-300' 
                  : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
              }`}>
                {item.badge}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions: Demo Reset & Non-judgmental status */}
      <div className="pt-3 border-t border-slate-800 space-y-2 mt-auto">
        <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-[11px] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-emerald-300/90 leading-tight">
            Readiness: <strong>{scores.current.overall}%</strong> (+{scores.velocityDelta}% Velocity)
          </span>
        </div>

        <button
          onClick={() => {
            resetToDemo();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors border border-slate-700/60"
          title="Reset to Guest Demo State"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full shadow-2xl z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
