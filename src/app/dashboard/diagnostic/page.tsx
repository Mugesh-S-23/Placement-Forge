'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  DIAGNOSTIC_STEP_1, 
  DIAGNOSTIC_STEP_2, 
  DIAGNOSTIC_STEP_3 
} from '@/data/diagnosticData';
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  MoveUp, 
  MoveDown, 
  SkipForward,
  HeartHandshake
} from 'lucide-react';

export default function DiagnosticPage() {
  const router = useRouter();
  const { completeDiagnostic, scores } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1 State (Logic Puzzle)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Step 2 State (Flow sequence)
  const [flowSteps, setFlowSteps] = useState(DIAGNOSTIC_STEP_2.steps);

  // Step 3 State (Self Intro)
  const [selfIntro, setSelfIntro] = useState('');

  // Move flow step up/down
  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...flowSteps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSteps.length) return;
    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIndex];
    newSteps[targetIndex] = temp;
    setFlowSteps(newSteps);
  };

  const handleSkipDirectly = () => {
    completeDiagnostic({});
    router.push('/dashboard');
  };

  const handleFinishDiagnostic = () => {
    completeDiagnostic({
      step1Choice: selectedOptionId || undefined,
      step2Order: flowSteps.map(s => s.id),
      step3Intro: selfIntro || undefined
    });
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-200">
      
      {/* Header & Step Wizard Progress Bar */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Quick 3-Minute Skill Check
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                No pass/fail grades &bull; Just setting your Day-1 starting baseline
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSkipDirectly}
            className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors font-medium cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Skip for Now</span>
          </button>
        </div>

        {/* Clean Step Indicator */}
        <div className="mt-4 flex items-center gap-2">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex-1">
              <div 
                className={`h-2 rounded-full transition-all ${
                  stepNum < currentStep 
                    ? 'bg-emerald-500' 
                    : stepNum === currentStep 
                    ? 'bg-indigo-600' 
                    : 'bg-zinc-200 dark:bg-zinc-800'
                }`} 
              />
              <div className="flex items-center justify-between text-xs mt-1 text-zinc-500 dark:text-zinc-400">
                <span className={stepNum === currentStep ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'font-medium'}>
                  Step {stepNum}
                </span>
                <span className="hidden sm:inline">
                  {stepNum === 1 ? 'Logic Tracing' : stepNum === 2 ? 'System Flow' : 'Self-Introduction'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: LOGIC PUZZLE */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
              {DIAGNOSTIC_STEP_1.title}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {DIAGNOSTIC_STEP_1.question}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 mt-2 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-zinc-800 leading-relaxed font-mono">
              {DIAGNOSTIC_STEP_1.scenario}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {DIAGNOSTIC_STEP_1.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-400 dark:border-indigo-600 text-zinc-900 dark:text-zinc-100 ring-1 ring-indigo-400/30'
                      : 'bg-zinc-50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-medium">
                    <span>{opt.text}</span>
                    {isSelected && (
                      <span className="text-xs text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60">Selected</span>
                    )}
                  </div>
                  {isSelected && (
                    <div className="mt-2.5 pt-2 border-t border-indigo-200/80 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      💡 {opt.logicFeedback}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation Action */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="button"
              disabled={!selectedOptionId}
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
            >
              <span>Next: System Flow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SYSTEM FLOW */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
              {DIAGNOSTIC_STEP_2.title}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {DIAGNOSTIC_STEP_2.question}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              {DIAGNOSTIC_STEP_2.scenario}
            </p>
          </div>

          {/* Sequence List with Up/Down Buttons */}
          <div className="space-y-2.5">
            {flowSteps.map((step, idx) => (
              <div
                key={step.id}
                className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-medium">{step.label}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveStep(idx, 'up')}
                    className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-30 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                    title="Move up"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === flowSteps.length - 1}
                    onClick={() => moveStep(idx, 'down')}
                    className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-30 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                    title="Move down"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            *Tip: Client validation happens first to save server bandwidth; DB password verification follows before issuing a session token.
          </p>

          {/* Navigation Action */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-semibold transition-colors border border-zinc-200 dark:border-zinc-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
            >
              <span>Next: Self-Introduction</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SELF INTRODUCTION */}
      {currentStep === 3 && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
              {DIAGNOSTIC_STEP_3.title}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
              {DIAGNOSTIC_STEP_3.prompt}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Use this simple 3-part formula to ensure crisp articulation:
            </p>
          </div>

          {/* 3-Part Formula Card */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/80 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
            {DIAGNOSTIC_STEP_3.formula.map((f, i) => (
              <div key={i} className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div>
            <label htmlFor="intro-text" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Your 60-Second Introduction (Type or rough draft):
            </label>
            <textarea
              id="intro-text"
              rows={4}
              value={selfIntro}
              onChange={(e) => setSelfIntro(e.target.value)}
              placeholder={DIAGNOSTIC_STEP_3.placeholder}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed"
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              💡 {DIAGNOSTIC_STEP_3.sampleTip}
            </p>
          </div>

          {/* Navigation Action */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-semibold transition-colors border border-zinc-200 dark:border-zinc-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleFinishDiagnostic}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Save &amp; View Readiness Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* Friendly reassurance badge */}
      <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-2.5 shadow-xs">
        <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>
          Starting from zero? That's completely expected! PlacementForge establishes your Day-1 baseline at <strong>20%</strong> with immediate progress tracking (+14% this week).
        </span>
      </div>

    </div>
  );
}
