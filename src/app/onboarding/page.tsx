'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { TargetRole, ExperienceLevel } from '@/types';
import { 
  Building, 
  GraduationCap, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  Code2,
  Mic2
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

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-4 sm:p-6 lg:p-8 flex flex-col justify-center items-center transition-colors duration-200 relative">
      
      {/* Top Right Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-3xl space-y-7 my-8 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Step 2: Profile Customization &amp; Role Track</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Let's personalize your placement plan
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            PlacementForge adapts to your specific department and target companies so you learn only what gets asked in real rounds.
          </p>
        </div>

        {/* User Benefits Showcase */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-zinc-700 dark:text-zinc-300">Role-Tailored Sprints</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-zinc-700 dark:text-zinc-300">Self-Contained Notes</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-zinc-700 dark:text-zinc-300">Live Code Sandbox</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-zinc-700 dark:text-zinc-300">Supportive Mentor Desk</span>
          </div>
        </div>

        {/* Main Onboarding Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 tactile-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Academic Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* College */}
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                  College / Institution
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. PSG Tech / Anna Univ / KCT"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Department */}
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Department / Branch
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3 pointer-events-none" />
                  <select
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none cursor-pointer"
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Year of Studying
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3 pointer-events-none" />
                  <select
                    required
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none cursor-pointer"
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Target Role for Campus Drives (Touch to Select)
                </label>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Tailored across CS &amp; non-CS streams
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ROLES.map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 text-zinc-900 dark:text-zinc-100'
                          : 'bg-zinc-50/70 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100/70 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{role.icon}</span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{role.label}</span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                        {role.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Preparedness Level - NO automatic pre-selection! */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Current Preparedness Level (Touch to Select)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div
                  onClick={() => setSelectedLevel('Starting from Zero (Beginner)')}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedLevel === 'Starting from Zero (Beginner)'
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/20 text-zinc-900 dark:text-zinc-100'
                      : 'bg-zinc-50/70 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-emerald-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    🌱 Starting from Zero (Beginner)
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    Haven't coded much outside syllabus. Need intuitive analogies, mental models, and zero judgment.
                  </p>
                </div>

                <div
                  onClick={() => setSelectedLevel('Intermediate')}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedLevel === 'Intermediate'
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 text-zinc-900 dark:text-zinc-100'
                      : 'bg-zinc-50/70 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-indigo-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    ⚡ Intermediate
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    Know syntax basics; need interview-ready speed, corporate pivot phrases, and company test patterns.
                  </p>
                </div>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 p-3 rounded-xl border border-rose-200 dark:border-rose-500/20 font-medium">
                {errorMsg}
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Save Profile &amp; Go to Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
