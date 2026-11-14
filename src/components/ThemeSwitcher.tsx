'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sun, Moon, Laptop } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useApp();

  return (
    <div 
      className="flex items-center gap-0.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs shadow-inner"
      role="group"
      aria-label="Theme switcher"
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`px-2 py-1 rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
          theme === 'light'
            ? 'bg-white text-amber-600 font-semibold shadow-sm border border-slate-200/60'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
        title="Light (Bright) Theme"
        aria-pressed={theme === 'light'}
      >
        <Sun className="w-3.5 h-3.5 text-amber-500" />
        <span className="hidden sm:inline text-[11px]">Light</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`px-2 py-1 rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
          theme === 'dark'
            ? 'bg-indigo-600 text-white font-semibold shadow-sm'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
        title="Dark Theme"
        aria-pressed={theme === 'dark'}
      >
        <Moon className="w-3.5 h-3.5 text-indigo-300 dark:text-indigo-200" />
        <span className="hidden sm:inline text-[11px]">Dark</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme('system')}
        className={`px-1.5 py-1 rounded-lg transition-all duration-150 flex items-center gap-1 ${
          theme === 'system'
            ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold shadow-sm border border-slate-200/60 dark:border-slate-700'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
        title="System Auto Theme"
        aria-pressed={theme === 'system'}
      >
        <Laptop className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
