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
  ShieldCheck, 
  HeartHandshake
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
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Humanized Page Title as requested */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
            Intake &bull; Practical Foundations
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Don't have a resume yet? Tell us what you've built
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          Whether you have a traditional PDF or are starting with just college lab experiments, we extract what you've actually touched and turn it into recruiter-ready bullet points.
        </p>
      </div>

      {/* Two Clean Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <button
          onClick={() => setActiveTab('reverse')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'reverse'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xs'
              : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>I'm Starting Fresh (Checklist Intake)</span>
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xs'
              : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
          }`}
        >
          <UploadCloud className="w-4 h-4 text-indigo-500" />
          <span>I Already Have a Resume (Upload / Paste)</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* TAB B: Reverse Resume (Zero-Skill Intake) */}
      {activeTab === 'reverse' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left: Interactive Checklist (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Tick whatever you have touched in college so far
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                Even 1 lab experiment or group mini-project counts! We frame these as foundational engineering experience.
              </p>
            </div>

            <div className="space-y-2">
              {CHECKLIST_ITEMS.map((item) => {
                const isChecked = selectedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 select-none ${
                      isChecked
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800 text-zinc-900 dark:text-zinc-100 shadow-2xs'
                        : 'bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      ) : (
                        <Square className="w-4 h-4 text-zinc-400" />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-zinc-400 block mb-0.5">
                        {item.category}
                      </span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
                        {item.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Real-time Converted Day-0 Recruiter Profile (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Recruiter-Ready Points
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyProfile}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-colors cursor-pointer"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                How campus interviewers translate your coursework into engineering capabilities:
              </p>
            </div>

            {/* Generated Points List */}
            <div className="bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-3.5 flex-1 space-y-2.5 overflow-y-auto max-h-[380px]">
              {selectedIds.length === 0 ? (
                <div className="text-center py-6 text-xs text-zinc-500">
                  Select at least one capability on the left to generate your points.
                </div>
              ) : (
                CHECKLIST_ITEMS.filter(i => selectedIds.includes(i.id)).map((item) => (
                  <div key={item.id} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <p className="leading-relaxed font-medium">{item.convertedProfessionalPoint}</p>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>
                {selectedIds.length} capabilities identified. Starting baseline set at <strong>20%</strong> without penalization.
              </span>
            </div>
          </div>

        </div>
      )}

      {/* TAB A: Upload / Paste Resume */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Upload PDF Resume or Paste Text
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                We'll highlight keywords matching the expectations for <strong>{user.targetRole}</strong>.
              </p>
            </div>

            {/* Drag & Drop File Upload Box */}
            <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 rounded-xl p-6 text-center transition-colors bg-zinc-50 dark:bg-zinc-950/40 cursor-pointer relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-7 h-7 text-indigo-600 dark:text-indigo-400 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                {fileName ? `Loaded: ${fileName}` : "Click to select or drop your resume"}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Supports PDF, DOCX, or TXT
              </p>
            </div>

            {/* Paste Plain Text Box */}
            <div>
              <label htmlFor="resume-text" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Or Paste Resume Content Directly:
              </label>
              <textarea
                id="resume-text"
                rows={5}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your education, projects, and skills here..."
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono leading-relaxed"
              />
            </div>
          </div>

          {/* Right: Target Role Match & Highlights */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-3.5 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Role Competency Match
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
                  68% Match
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Evaluated against typical campus drive expectations for <strong>{user.targetRole}</strong>:
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Detected Strengths
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  C / Java syntax, HTML forms, Basic SQL queries, Academic project presentation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Recommended Foundations to Add
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Two-Pointer technique, REST API basics, Structured STAR project stories.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
              💡 Our 14-Day Micro-Sprint covers every missing pillar above in 25-minute digestible steps.
            </div>
          </div>

        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            Profile ready! Next: 3 quick logic &amp; flow questions to calibrate your Readiness Profile.
          </span>
        </div>

        <button
          type="button"
          onClick={handleConfirmAndProceed}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
        >
          <span>Confirm &amp; Take 3-Min Check</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
