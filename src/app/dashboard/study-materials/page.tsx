'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { STUDY_MATERIALS } from '@/data/studyMaterials';
import { 
  GraduationCap, 
  Lightbulb, 
  Code2, 
  CheckCircle2, 
  Copy, 
  Check, 
  Languages, 
  Clock, 
  HeartHandshake
} from 'lucide-react';

export default function StudyMaterialsPage() {
  const { user } = useApp();
  const [selectedRole, setSelectedRole] = useState<string>(user.targetRole || 'All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(STUDY_MATERIALS[0]?.id || null);

  const roles = [
    'All',
    'Full-Stack Web Dev',
    'Data Analyst & BI (SQL/Python)',
    'Core Engineering & Embedded (ECE/EEE/Mech)',
    'IT Services & Campus Aptitude (TCS/Infosys/CTS)',
    'Software Development Engineer (Campus SDE)'
  ];

  const filteredMaterials = selectedRole === 'All'
    ? STUDY_MATERIALS
    : STUDY_MATERIALS.filter(m => m.roleTarget === selectedRole);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              Role Cheat Sheets &amp; Mental Models
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Concept Cheat Sheets &amp; Handbooks
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5 max-w-2xl leading-relaxed">
            Self-contained notes with plain-English analogies, copyable code snippets, and corporate pivot phrases for technical interviews.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 flex items-center gap-2 shrink-0 shadow-xs">
          <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Active Role: <strong className="text-zinc-900 dark:text-zinc-100">{user.targetRole}</strong></span>
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 shrink-0 mr-1">
          Role Filter:
        </span>
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setSelectedRole(r)}
            className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all shrink-0 cursor-pointer ${
              selectedRole === r
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xs font-semibold'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Study Materials Cards List */}
      <div className="space-y-4">
        {filteredMaterials.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition-all duration-200 tactile-card"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 font-semibold">
                      {item.roleTarget}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                      {item.category}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {item.readTime}
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    {item.title}
                  </h2>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors shrink-0 border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                >
                  {isExpanded ? 'Collapse' : 'Read Notes'}
                </button>
              </div>

              {/* Physical Analogy */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  Everyday Analogy:
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {item.analogy}
                </p>
              </div>

              {/* Tanglish Summary */}
              {item.tanglishSummary && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/80 space-y-1 text-xs text-amber-950 dark:text-amber-200">
                  <span className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                    <Languages className="w-3.5 h-3.5" />
                    Tanglish Quick Take:
                  </span>
                  <p className="leading-relaxed">"{item.tanglishSummary}"</p>
                </div>
              )}

              {/* Expanded details */}
              {isExpanded && (
                <div className="space-y-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 animate-in fade-in">
                  
                  {/* Code Cheat Sheet */}
                  {item.codeCheatSheet && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-indigo-500" />
                          Code Cheat Sheet:
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(item.id, item.codeCheatSheet)}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-colors cursor-pointer"
                        >
                          {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <pre className="p-3.5 bg-zinc-950 text-zinc-200 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800">
                        {item.codeCheatSheet}
                      </pre>
                    </div>
                  )}

                  {/* Interview Phrasing & Pivot Questions */}
                  {item.interviewQuestions && item.interviewQuestions.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block">
                        Interview Phrasing &amp; Natural Pivots:
                      </span>
                      {item.interviewQuestions.map((iq, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-1.5">
                          <span className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                            Q: {iq.question}
                          </span>
                          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {iq.idealAnswer}
                          </p>
                          {iq.corporatePivot && (
                            <blockquote className="text-xs italic text-indigo-900 dark:text-indigo-300 leading-relaxed font-medium pl-3 border-l-2 border-indigo-500 mt-1">
                              "{iq.corporatePivot}"
                            </blockquote>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Concepts */}
                  {item.keyConcepts && item.keyConcepts.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                        Key Concepts:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.keyConcepts.map((point: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
