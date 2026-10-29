'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { TargetRole, ExperienceLevel } from '@/types';
import { 
  Building, 
  GraduationCap, 
  Calendar, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Code2, 
  Mic2, 
  Zap,
  HelpCircle
} from 'lucide-react';

const DEPARTMENTS = [
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical & Mechatronics',
  'Civil Engineering',
  'Biotechnology & Chemical',
  'Computer Science & Engg (CSE)',
  'Information Technology (IT)',
  'AI & Data Science (AIDS/AIML)',
  'Commerce / MBA / Management',
  'Other / Science & Humanities'
];

const YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  'Final Year (4th Year)',
  'Recent Graduate / Passed Out'
];

const ROLES: { id: TargetRole; label: string; desc: string; icon: string }[] = [
  { 
    id: 'Full-Stack Web Dev', 
    label: 'Full-Stack Web Dev', 
    desc: 'React, Node.js, Web APIs, SQL/NoSQL DBs',
    icon: '💻'
  },
  { 
    id: 'Data Analyst & BI (SQL/Python)', 
    label: 'Data Analyst & BI', 
    desc: 'Advanced SQL, Python, Pandas, Business Dashboards',
    icon: '📊'
  },
  { 
    id: 'Core Engineering & Embedded (ECE/EEE/Mech)', 
    label: 'Core Engineering & Embedded', 
    desc: 'Embedded C, Microcontrollers, Protocols (UART/I2C), IoT',
    icon: '⚡'
  },
  { 
    id: 'IT Services & Campus Aptitude (TCS/Infosys/CTS)', 
    label: 'IT Services & Campus Drives', 
    desc: 'TCS NQT, Infosys, CTS, Zoho Foundation Aptitude & Coding',
    icon: '🏢'
  },
  { 
    id: 'Software Development Engineer (Campus SDE)', 
    label: 'Campus SDE (Core Software)', 
    desc: 'Data Structures, Algorithms, Memory Models, System Flow',
    icon: '🚀'
  },
  { 
    id: 'QA & Automation Engineer', 
    label: 'QA & Automation', 
    desc: 'Selenium, Test Frameworks, API Testing, Regression',
    icon: '🧪'
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, completeOnboarding } = useApp();

  const [college, setCollege] = useState(user.college || '');
  const [department, setDepartment] = useState(user.department || '');
  const [gradYear, setGradYear] = useState(user.gradYear || '3rd Year');

  // CRITICAL: Initially null so NO options are automatically highlighted on page load!
  // Options only highlight when the user hovers or explicitly clicks/touches them.
  const [selectedRole, setSelectedRole] = useState<TargetRole | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel | null>(null);

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!college.trim()) {
      setErrorMsg('Please enter your college or institution name.');
      return;
    }
    if (!department) {
      setErrorMsg('Please select your department / branch.');
      return;
    }
    if (!selectedRole) {
      setErrorMsg('Please choose your target role for campus drives.');
      return;
    }
    if (!selectedLevel) {
      setErrorMsg('Please select your current preparedness level.');
      return;
    }

    completeOnboarding({
      college: college.trim(),
      department,
      gradYear,
      targetRole: selectedRole,
      experienceLevel: selectedLevel
    });

    // After setup, navigate straight to the Command Center dashboard!
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step 2: Profile Customization &amp; Role Alignment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tailor Your Placement Operating System
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            PlacementForge scales to your specific college department and career goal. Select your academic details and target placement track.
          </p>
        </div>

        {/* User Benefits Showcase */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Role-Tailored Sprints</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Self-Contained Notes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Live Code Sandbox</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Adaptive Mock Mentor</span>
          </div>
        </div>

        {/* Main Onboarding Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Academic Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* College */}
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  College / Institution
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. PSG Tech / IIT / Anna Univ"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Department */}
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Department / Branch
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <select
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select your branch</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Year */}
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Year of Studying
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <select
                    required
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                  >
                    {YEARS.map(yr => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Target Role Selector - NO automatic pre-selection! */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Target Role for Campus Drives (Touch to Select)
                </label>
                <span className="text-[11px] text-slate-400">
                  Scalable across CS &amp; Non-CS students
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROLES.map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/50 text-slate-100'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-indigo-400/60 hover:bg-indigo-500/5 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{role.icon}</span>
                        <span className="font-bold text-slate-200">{role.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        {role.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Preparedness Level - NO automatic pre-selection! */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Current Preparedness Level (Touch to Select)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setSelectedLevel('Starting from Zero (Beginner)')}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedLevel === 'Starting from Zero (Beginner)'
                      ? 'bg-emerald-500/15 border-emerald-500 ring-2 ring-emerald-500/40 text-slate-100'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-emerald-400/60 hover:bg-emerald-500/5 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    🌱 Starting from Zero (Beginner)
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Haven't coded much outside syllabus. Need intuitive analogies, mental models, and zero judgment.
                  </p>
                </div>

                <div
                  onClick={() => setSelectedLevel('Intermediate')}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedLevel === 'Intermediate'
                      ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/40 text-slate-100'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-indigo-400/60 hover:bg-indigo-500/5 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    ⚡ Intermediate
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Know syntax basics; need interview-ready speed, corporate pivot phrases, and company test patterns.
                  </p>
                </div>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                {errorMsg}
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/20"
              >
                <span>Save Profile &amp; Enter Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
