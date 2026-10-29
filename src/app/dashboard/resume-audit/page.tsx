'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  FileText, 
  Sparkles, 
  UploadCloud, 
  CheckSquare, 
  Square, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Target, 
  Copy, 
  Check, 
  RefreshCcw,
  ShieldCheck,
  Code
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  label: string;
  convertedProfessionalPoint: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-1',
    category: 'Programming & Logic',
    label: 'Written loops, conditional statements, or arrays in C, C++, Java, or Python',
    convertedProfessionalPoint: 'Implemented structured control flow algorithms and array operations with attention to sequential state execution.'
  },
  {
    id: 'chk-2',
    category: 'Programming & Logic',
    label: 'Debugged compilation errors or runtime exceptions during college lab sessions',
    convertedProfessionalPoint: 'Methodically isolated runtime stack traces and syntax anomalies using structured dry-run debugging methodologies.'
  },
  {
    id: 'chk-3',
    category: 'Programming & Logic',
    label: 'Used Object-Oriented concepts (Classes, Objects, Methods)',
    convertedProfessionalPoint: 'Applied Object-Oriented principles (Encapsulation, Modular Abstraction) to model real-world business entities.'
  },
  {
    id: 'chk-4',
    category: 'Web & Interface',
    label: 'Created a basic HTML/CSS page or simple user input form',
    convertedProfessionalPoint: 'Constructed responsive client interfaces with structured semantic HTML5, CSS layouts, and client-side form validations.'
  },
  {
    id: 'chk-5',
    category: 'Web & Interface',
    label: 'Made a fetch/HTTP request or connected frontend to an API',
    convertedProfessionalPoint: 'Architected asynchronous data exchange workflows utilizing RESTful HTTP endpoints and JSON payload parsing.'
  },
  {
    id: 'chk-6',
    category: 'Data & Databases',
    label: 'Wrote basic SQL queries (SELECT, INSERT, WHERE) in lab or coursework',
    convertedProfessionalPoint: 'Queried and filtered relational datasets utilizing SQL projection, conditional predicates, and primary key indexing.'
  },
  {
    id: 'chk-7',
    category: 'Data & Databases',
    label: 'Worked with spreadsheets (Excel/Google Sheets) formulas and sorting',
    convertedProfessionalPoint: 'Analyzed tabular records, verified structural data hygiene, and utilized deterministic lookup formulas.'
  },
  {
    id: 'chk-8',
    category: 'Projects & Collaboration',
    label: 'Completed a semester mini-project or academic hardware/software model',
    convertedProfessionalPoint: 'Collaborated on end-to-end technical prototype delivery, adhering to milestone requirements and faculty reviews.'
  },
  {
    id: 'chk-9',
    category: 'Projects & Collaboration',
    label: 'Pushed code to GitHub or used version control commands',
    convertedProfessionalPoint: 'Maintained repository versioning discipline utilizing Git branching, commits, and collaborative code reviews.'
  }
];

export default function ResumeAuditPage() {
  const router = useRouter();
  const { user, setUser, reverseResumeSkills, setReverseResumeSkills } = useApp();

  const [activeTab, setActiveTab] = useState<'reverse' | 'upload'>(user.hasResume ? 'upload' : 'reverse');
  const [resumeText, setResumeText] = useState(
    user.resumeSummary || 
    "EDUCATION: B.E. Electronics & Communication, Expected 2026. CGPA: 7.8/10.\nTECHNICAL SKILLS: C, Basic Java, HTML/CSS, SQL.\nPROJECTS: Student Attendance Tracker (Semester Mini Project) - built using basic HTML, JavaScript, and MySQL database."
  );
  const [fileName, setFileName] = useState<string | null>(user.resumeFileName || null);
  const [isCopied, setIsCopied] = useState(false);

  // Selected reverse resume item IDs
  const [selectedIds, setSelectedIds] = useState<string[]>(['chk-1', 'chk-4', 'chk-6', 'chk-8']);

  const toggleCheck = (item: ChecklistItem) => {
    setSelectedIds(prev => {
      const exists = prev.includes(item.id);
      let updatedIds: string[];
      if (exists) {
        updatedIds = prev.filter(id => id !== item.id);
      } else {
        updatedIds = [...prev, item.id];
      }

      // Sync professional points to Context
      const professionalPoints = CHECKLIST_ITEMS
        .filter(i => updatedIds.includes(i.id))
        .map(i => i.convertedProfessionalPoint);
      
      setReverseResumeSkills(professionalPoints);
      return updatedIds;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUser(prev => ({
        ...prev,
        hasResume: true,
        resumeFileName: file.name
      }));
    }
  };

  const handleCopyProfile = () => {
    const textToCopy = CHECKLIST_ITEMS
      .filter(i => selectedIds.includes(i.id))
      .map(i => `• ${i.convertedProfessionalPoint}`)
      .join('\n');

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleConfirmAndProceed = () => {
    // Save updated profile
    const professionalPoints = CHECKLIST_ITEMS
      .filter(i => selectedIds.includes(i.id))
      .map(i => i.convertedProfessionalPoint);

    setUser(prev => ({
      ...prev,
      hasResume: activeTab === 'upload',
      resumeFileName: fileName || prev.resumeFileName,
      resumeSummary: resumeText,
      reverseResumeSkills: professionalPoints.length > 0 ? professionalPoints : prev.reverseResumeSkills
    }));

    router.push('/dashboard/diagnostic');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase font-semibold tracking-wider text-indigo-400">
            Intake Step 1 of 2
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Reverse Resume &amp; Skills Extractor
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          Whether you have a traditional PDF resume or are starting with zero formal credentials, PlacementForge establishes your Day-0 foundational baseline with complete respect.
        </p>
      </div>

      {/* Two Clean Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('reverse')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'reverse'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>No Resume? (Reverse Resume Form)</span>
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'upload'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <UploadCloud className="w-4 h-4 text-indigo-200" />
          <span>Upload / Paste Resume</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* TAB B: Reverse Resume (Zero-Skill Intake) */}
      {activeTab === 'reverse' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Interactive Checklist (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-indigo-400" />
                Tick What You Have Touched in College So Far
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Do not stress over mastery! Even 1 lab experiment counts. We transform these into clear foundational engineering capabilities.
              </p>
            </div>

            <div className="space-y-3">
              {CHECKLIST_ITEMS.map((item) => {
                const isChecked = selectedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 select-none ${
                      isChecked
                        ? 'bg-indigo-600/10 border-indigo-500/50 text-slate-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                        {item.category}
                      </span>
                      <span className="text-xs font-medium text-slate-200 leading-snug">
                        {item.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Real-time Converted Day-0 Foundational Profile (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-slate-100">
                    Day-0 Recruiter Profile
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyProfile}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'Copied!' : 'Copy Bullets'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-400">
                How corporate campus recruiters and interviewers read your foundational coursework:
              </p>
            </div>

            {/* Generated Points List */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex-1 space-y-3 overflow-y-auto max-h-[380px]">
              {selectedIds.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  Select at least one foundational capability on the left to generate your Day-0 points.
                </div>
              ) : (
                CHECKLIST_ITEMS.filter(i => selectedIds.includes(i.id)).map((item) => (
                  <div key={item.id} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <p className="leading-relaxed">{item.convertedProfessionalPoint}</p>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                {selectedIds.length} capabilities extracted. Your baseline is established at <strong>20%</strong> without penalization.
              </span>
            </div>
          </div>

        </div>
      )}

      {/* TAB A: Upload / Paste Resume */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Upload Resume PDF or Paste Text
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                PlacementForge parses your technical keywords against the required competencies for <strong>{user.targetRole}</strong>.
              </p>
            </div>

            {/* Drag & Drop File Upload Box */}
            <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-6 text-center transition-colors bg-slate-950/40 cursor-pointer relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-200">
                {fileName ? `Loaded: ${fileName}` : "Click to browse or drop resume file"}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Supports PDF, DOCX, or TXT (Max 5MB)
              </p>
            </div>

            {/* Paste Plain Text Box */}
            <div>
              <label htmlFor="resume-text" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Or Paste Resume Content Directly:
              </label>
              <textarea
                id="resume-text"
                rows={6}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your education, projects, and skills here..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Right: Target Role Keyword Match & Gap Audit */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-400" />
                  Target Role Match Audit
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold">
                  68% Match
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Evaluated against campus expectations for <strong>{user.targetRole}</strong>:
              </p>
            </div>

            {/* Match details */}
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <span className="text-[11px] uppercase font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Detected Strengths
                </span>
                <p className="text-xs text-slate-300">
                  C / Java syntax, HTML &amp; CSS forms, Relational DB query awareness, Academic project presentation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <span className="text-[11px] uppercase font-semibold text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Recommended Foundations to Add
                </span>
                <p className="text-xs text-slate-300">
                  In-Memory Caching mental model, REST API status codes, Two-Pointer technique, Structured STAR project stories.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
              💡 Our 14-Day Micro-Sprint covers every single missing pillar above in 25-minute digestible daily steps.
            </div>
          </div>

        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Ready to calibrate! Next: 3 quick logic &amp; flow questions to establish your Readiness Radar.
          </span>
        </div>

        <button
          type="button"
          onClick={handleConfirmAndProceed}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-indigo-600/20 shrink-0"
        >
          <span>Confirm Profile &amp; Calibrate Baseline</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
