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

interface ReadinessRadarProps {
  baseline: ReadinessScore;
  current: ReadinessScore;
}

export const ReadinessRadar: React.FC<ReadinessRadarProps> = ({ baseline, current }) => {
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
    <div className="w-full h-72 sm:h-80 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#334155" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
          />
          <PolarRadiusAxis 
            angle={45} 
            domain={[0, 100]} 
            tick={{ fill: '#64748b', fontSize: 10 }}
            axisLine={{ stroke: '#334155' }}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs space-y-1">
                    <p className="font-semibold text-slate-200">{item.subject}</p>
                    <p className="text-slate-400">
                      Day-0 Baseline: <span className="font-medium text-slate-300">{item.baseline}%</span>
                    </p>
                    <p className="text-indigo-400">
                      Current Readiness: <span className="font-semibold text-emerald-400">{item.current}%</span>
                    </p>
                    <p className="text-emerald-400 text-[11px] font-medium pt-1 border-t border-slate-800">
                      Growth Delta: +{item.current - item.baseline}%
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Radar
            name="Day-0 Baseline"
            dataKey="baseline"
            stroke="#64748b"
            fill="#475569"
            fillOpacity={0.2}
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
          <Radar
            name="Current Readiness"
            dataKey="current"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.35}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-6 mt-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 border-t border-dashed border-slate-400"></span>
          <span className="text-slate-400">Day-0 Baseline ({baseline.overall}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-indigo-500/40 border border-indigo-400"></span>
          <span className="text-indigo-300 font-medium">Current Readiness ({current.overall}%)</span>
        </div>
      </div>
    </div>
  );
};
