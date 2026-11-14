'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { ReadinessScore } from '@/types';
import { useApp } from '@/context/AppContext';

interface ReadinessRadarProps {
  baseline: ReadinessScore;
  current: ReadinessScore;
}

export const ReadinessRadar: React.FC<ReadinessRadarProps> = ({ baseline, current }) => {
  const { theme } = useApp();
  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const data = [
    {
      subject: 'Logic & Tracing',
      baseline: baseline.logic,
      current: current.logic,
      fullMark: 100
    },
    {
      subject: 'Core Concepts',
      baseline: baseline.coreConcepts,
      current: current.coreConcepts,
      fullMark: 100
    },
    {
      subject: 'Target Role Tech',
      baseline: baseline.roleTech,
      current: current.roleTech,
      fullMark: 100
    },
    {
      subject: 'Articulation & Pivot',
      baseline: baseline.articulation,
      current: current.articulation,
      fullMark: 100
    }
  ];

  return (
    <div className="w-full h-64 sm:h-72 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="68%" data={data}>
          <PolarGrid stroke={isDark ? "#27272a" : "#e4e4e7"} strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: isDark ? '#e4e4e7' : '#27272a', fontSize: 11, fontWeight: 600 }} 
          />
          <PolarRadiusAxis 
            angle={45} 
            domain={[0, 100]} 
            tick={{ fill: isDark ? '#71717a' : '#a1a1aa', fontSize: 10 }}
            axisLine={{ stroke: isDark ? '#27272a' : '#e4e4e7' }}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-zinc-900 dark:bg-zinc-950 text-white border border-zinc-700/80 p-3 rounded-xl shadow-lg text-xs space-y-1.5 min-w-[170px]">
                    <p className="font-bold text-indigo-300">{item.subject}</p>
                    <p className="text-zinc-300">
                      Day-1 Starting Point: <span className="font-semibold text-zinc-100">{item.baseline}%</span>
                    </p>
                    <p className="text-zinc-300">
                      Current Readiness: <span className="font-bold text-emerald-400">{item.current}%</span>
                    </p>
                    <p className="text-emerald-400 text-[11px] font-semibold pt-1 border-t border-zinc-800">
                      Growth: +{item.current - item.baseline}%
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Radar
            name="Day-1 Starting Point"
            dataKey="baseline"
            stroke={isDark ? "#52525b" : "#94a3b8"}
            fill={isDark ? "#3f3f46" : "#cbd5e1"}
            fillOpacity={0.2}
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
          <Radar
            name="Current Readiness"
            dataKey="current"
            stroke="#4f46e5"
            fill="#6366f1"
            fillOpacity={0.35}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Human Legend */}
      <div className="flex items-center justify-center gap-5 text-xs text-zinc-600 dark:text-zinc-400 mt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-zinc-400 dark:bg-zinc-600 inline-block border-b border-dashed"></span>
          <span>Day-1 Starting Point</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-2 rounded-xs bg-indigo-600 inline-block"></span>
          <span className="font-semibold text-indigo-700 dark:text-indigo-400">Current Progress</span>
        </div>
      </div>
    </div>
  );
};
