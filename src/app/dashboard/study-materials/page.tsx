'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { STUDY_MATERIALS } from '@/data/studyMaterials';
import { TargetRole } from '@/types';
import { 
  GraduationCap, 
  BookOpen, 
  Lightbulb, 
  Code2, 
  CheckCircle2, 
  Copy, 
  Check, 
  Languages, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  BookmarkCheck
} from 'lucide-react';

export default function StudyMaterialsPage() {
  const { user } = useApp();
  const [selectedRole, setSelectedRole] = useState<string>(user.targetRole || 'All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(STUDY_MATERIALS[0].id);

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
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              Self-Contained Library
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Placement Study Materials &amp; Cheat Sheets
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Everything you need for your target role in one place. No confusing external links, no textbook fluff—only crisp mental models, syntax cheat sheets, and corporate pivot scripts.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Active Role: <strong>{user.targetRole}</strong></span>
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs uppercase font-bold text-slate-400 shrink-0 mr-1">
          Role Track:
        </span>
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setSelectedRole(r)}
            className={`text-xs px-3.5 py-1.5 rounded-xl border font-semibold transition-all shrink-0 ${
              selectedRole === r
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Study Materials Cards List */}
      <div className="space-y-6">
        {filteredMaterials.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm space-y-5 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      {item.roleTarget}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.readTime}
                    </span>
                  </div>

                  <h2 className="text-base sm:text-xl font-bold text-slate-100">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors shrink-0"
                >
                  {isExpanded ? 'Collapse Material' : 'Expand Guide'}
                </button>
              </div>

              {/* Physical Analogy */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <span className="text-xs uppercase font-bold text-indigo-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Physical Intuition &bull; Mental Model:
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.analogy}
                </p>
              </div>

              {/* Tanglish Summary */}
              {item.tanglishSummary && (
                <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                  <span className="text-[11px] uppercase font-bold text-amber-300 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5" />
                    Vernacular / Tanglish Tip:
                  </span>
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    "{item.tanglishSummary}"
                  </p>
                </div>
              )}

              {/* Expanded Content: Key Concepts, Code Cheat Sheet, and Interview Q&A */}
              {isExpanded && (
                <div className="space-y-5 pt-3 border-t border-slate-800 animate-in fade-in">
                  
                  {/* Key Concepts */}
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      Core Engineering Principles:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.keyConcepts.map((concept, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{concept}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Cheat Sheet */}
                  {item.codeCheatSheet && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                          Ready-to-Use Syntax Cheat Sheet:
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(item.id, item.codeCheatSheet)}
                          className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                          {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === item.id ? 'Copied Snippet!' : 'Copy Code'}</span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                        <pre>{item.codeCheatSheet}</pre>
                      </div>
                    </div>
                  )}

                  {/* Interview Questions & Corporate Pivots */}
                  {item.interviewQuestions && item.interviewQuestions.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        Campus Interview Questions &amp; Exact Pivot Phrasing:
                      </h3>

                      <div className="space-y-3">
                        {item.interviewQuestions.map((q, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                            <p className="font-bold text-slate-100 text-xs sm:text-sm">
                              Q: {q.question}
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                              <strong>Ideal Answer:</strong> {q.idealAnswer}
                            </p>
                            {q.corporatePivot && (
                              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                                <strong>Safe Corporate Pivot:</strong> "{q.corporatePivot}"
                              </div>
                            )}
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
