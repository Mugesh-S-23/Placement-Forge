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
  AlertCircle, 
  Sparkles, 
  TrendingUp, 
  MoveUp, 
  MoveDown, 
  Mic, 
  SkipForward,
  ShieldCheck
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
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header & Step Wizard Progress Bar */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              3-Minute Calibration Diagnostic
            </h1>
          </div>

          <button
            type="button"
            onClick={handleSkipDirectly}
            className="text-xs text-slate-400 hover:text-slate-200 inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Skip with Zero Baseline</span>
          </button>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Non-judgmental diagnostic to calibrate your <strong>Readiness Radar</strong>. There are no fail grades here!
        </p>

        {/* Clean Top Progress Bar */}
        <div className="mt-4 flex items-center gap-2">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex-1">
              <div 
                className={`h-2 rounded-full transition-all ${
                  stepNum < currentStep 
                    ? 'bg-emerald-400' 
                    : stepNum === currentStep 
                    ? 'bg-indigo-600' 
                    : 'bg-slate-800'
                }`} 
              />
              <div className="flex items-center justify-between text-[11px] mt-1 text-slate-400">
                <span className={stepNum === currentStep ? 'text-indigo-400 font-semibold' : ''}>
                  Step {stepNum}
                </span>
                <span className="hidden sm:inline">
                  {stepNum === 1 ? 'Logic' : stepNum === 2 ? 'Flow' : 'Intro'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: LOGIC PUZZLE */}
      {currentStep === 1 && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-5 shadow-sm">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-indigo-400 block mb-1">
              {DIAGNOSTIC_STEP_1.title}
            </span>
            <h2 className="text-lg font-bold text-slate-100">
              {DIAGNOSTIC_STEP_1.question}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 leading-relaxed">
              {DIAGNOSTIC_STEP_1.scenario}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {DIAGNOSTIC_STEP_1.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={`p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500 text-slate-100 ring-1 ring-indigo-500/40'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-medium">
                    <span>{opt.text}</span>
                    {isSelected && (
                      <span className="text-xs text-indigo-400 font-semibold">Selected</span>
                    )}
                  </div>
                  {isSelected && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800 text-xs text-slate-300">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <span>Next: System Flow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SYSTEM FLOW */}
      {currentStep === 2 && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-5 shadow-sm">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-indigo-400 block mb-1">
              {DIAGNOSTIC_STEP_2.title}
            </span>
            <h2 className="text-lg font-bold text-slate-100">
              {DIAGNOSTIC_STEP_2.question}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              {DIAGNOSTIC_STEP_2.scenario}
            </p>
          </div>

          {/* Sequence List with Up/Down Buttons */}
          <div className="space-y-2.5">
            {flowSteps.map((step, idx) => (
              <div
                key={step.id}
                className="p-3 sm:p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200">{step.label}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveStep(idx, 'up')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-colors"
                    title="Move earlier"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === flowSteps.length - 1}
                    onClick={() => moveStep(idx, 'down')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-colors"
                    title="Move later"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400">
            *Tip: Client validation happens first to save server bandwidth; DB hash verification follows before issuing a session token.
          </p>

          {/* Navigation Action */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <span>Next: Self-Introduction</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SELF INTRODUCTION */}
      {currentStep === 3 && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-5 shadow-sm">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-indigo-400 block mb-1">
              {DIAGNOSTIC_STEP_3.title}
            </span>
            <h2 className="text-lg font-bold text-slate-100">
              {DIAGNOSTIC_STEP_3.prompt}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Use this simple 3-part formula to ensure crisp articulation:
            </p>
          </div>

          {/* 3-Part Formula Card */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs text-slate-300">
            {DIAGNOSTIC_STEP_3.formula.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div>
            <label htmlFor="intro-text" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Your 60-Second Introduction (Type or rough draft):
            </label>
            <textarea
              id="intro-text"
              rows={4}
              value={selfIntro}
              onChange={(e) => setSelfIntro(e.target.value)}
              placeholder={DIAGNOSTIC_STEP_3.placeholder}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              💡 {DIAGNOSTIC_STEP_3.sampleTip}
            </p>
          </div>

          {/* Navigation Action */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleFinishDiagnostic}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-emerald-600/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Confirm &amp; Generate Readiness Radar</span>
            </button>
          </div>
        </div>
      )}

      {/* Non-judgmental reassurance badge */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          PlacementForge establishes your Day-0 Baseline at <strong>20%</strong> with immediate Personal Velocity tracking (+14%).
        </span>
      </div>

    </div>
  );
}
