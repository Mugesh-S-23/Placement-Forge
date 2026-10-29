'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sun, Moon, Laptop } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useApp();

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 dark:bg-slate-900 border border-slate-700/60 dark:border-slate-800 text-xs">
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
          theme === 'light'
            ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        title="Light Theme"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
          theme === 'dark'
            ? 'bg-indigo-600 text-white font-bold shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        title="Dark Theme"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
          theme === 'system'
            ? 'bg-emerald-600 text-white font-bold shadow-sm'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        title="System Default Theme"
      >
        <Laptop className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
