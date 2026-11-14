'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { MOCK_INTERVIEW_QUESTIONS } from '@/data/interviewQuestions';
import { MockInterviewQuestion } from '@/types';
import { 
  Mic, 
  MicOff, 
  Send, 
  HelpCircle, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  UserCheck, 
  Loader2,
  Briefcase,
  Smile,
  ShieldAlert,
  Volume2
} from 'lucide-react';

export default function MockInterviewPage() {
  const { user } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const question: MockInterviewQuestion = MOCK_INTERVIEW_QUESTIONS[currentIdx] || MOCK_INTERVIEW_QUESTIONS[0];

  const [answerText, setAnswerText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'interviewer' | 'mentor'>('interviewer');
  
  // Feedback / Mentor payload
  const [mentorData, setMentorData] = useState<{
    headline: string;
    explanation: string;
    corporatePivotPhrase: string;
    tips: string[];
    retryPrompt?: string;
    interviewerFeedback?: string;
    scoreOutOf10?: number;
  } | null>(null);

  const [isCopied, setIsCopied] = useState(false);

  // Setup Web Speech API if supported in browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const reco = new SpeechRecognition();
        reco.continuous = true;
        reco.interimResults = true;
        reco.lang = 'en-IN'; // Indian English accent model

        reco.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setAnswerText(prev => `${prev} ${transcript}`.trim());
        };

        reco.onerror = (e: any) => {
          console.warn("Speech recognition error:", e);
          setIsRecording(false);
        };

        reco.onend = () => {
          setIsRecording(false);
        };

        setRecognition(reco);
      }
    }
  }, []);

  const toggleRecording = () => {
    if (!recognition) {
      alert("Voice input is supported in Chrome/Edge browsers. You can also type directly in the box below.");
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      try {
        recognition.start();
        setIsRecording(true);
      } catch (err) {
        console.warn("Could not start recognition:", err);
      }
    }
  };

  const handleEvaluate = async (isStuck: boolean = false) => {
    if (isRecording && recognition) {
      recognition.stop();
      setIsRecording(false);
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          questionText: question.question,
          answer: answerText,
          isStuckClicked: isStuck,
          corporatePivotPhrase: question.corporatePivotPhrase,
          mentorExplanation: question.mentorExplanation
        })
      });

      const data = await res.json();
      if (data.mode === 'mentor' || isStuck) {
        setMode('mentor');
        setMentorData({
          headline: data.headline || 'Coach Note: Breathe Easy & Learn the Pivot',
          explanation: data.explanation || question.mentorExplanation,
          corporatePivotPhrase: data.corporatePivotPhrase || question.corporatePivotPhrase,
          tips: data.tips || [
            "Never guess in an interview. Interviewers appreciate engineering honesty.",
            "Acknowledge the concept, state the high-level architecture, and pivot to related coursework.",
            "Speak calmly and maintain steady eye contact."
          ],
          retryPrompt: data.retryPrompt
        });
      } else {
        setMode('interviewer');
        setMentorData({
          headline: data.headline || 'Well-Reasoned Response!',
          explanation: '',
          corporatePivotPhrase: question.corporatePivotPhrase,
          interviewerFeedback: data.interviewerFeedback || 'Well-structured response that addresses the core requirements with confidence.',
          scoreOutOf10: data.scoreOutOf10 || 9,
          tips: data.tips || ['Great calm articulation. Keep up this standard in actual campus rounds.']
        });
      }
    } catch (err) {
      console.error("Interview API error:", err);
      // Gentle supportive fallback without harsh error
      setMode('mentor');
      setMentorData({
        headline: 'Coach Note',
        explanation: question.mentorExplanation,
        corporatePivotPhrase: question.corporatePivotPhrase,
        tips: [
          "State the high-level purpose of the system.",
          "Bridge to a college project or coursework where you solved a similar problem.",
          "Demonstrate eager ramp-up readiness."
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPivot = () => {
    if (!mentorData?.corporatePivotPhrase) return;
    navigator.clipboard.writeText(mentorData.corporatePivotPhrase);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRetry = () => {
    setMode('interviewer');
    setMentorData(null);
    setAnswerText('');
  };

  const handleNextQuestion = () => {
    setCurrentIdx((prev) => (prev + 1) % MOCK_INTERVIEW_QUESTIONS.length);
    setMode('interviewer');
    setMentorData(null);
    setAnswerText('');
  };

  return (
    <div className="w-full max-w-5xl space-y-6 animate-in fade-in duration-200">
      
      {/* Page Title & Question Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
              Interactive Practice &bull; Technical &amp; HR Rounds
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Mock Interview Practice
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
            Practice spoken or written responses. If you get stuck, the system smoothly shifts into supportive <strong className="text-zinc-800 dark:text-zinc-200">Coach Mode</strong> so you learn how to pivot without losing confidence.
          </p>
        </div>

        {/* Question Selector Pills */}
        <div className="flex items-center gap-1.5 shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-1 rounded-xl shadow-xs">
          {MOCK_INTERVIEW_QUESTIONS.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                setCurrentIdx(idx);
                setMode('interviewer');
                setMentorData(null);
                setAnswerText('');
              }}
              className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                idx === currentIdx
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* STAGE CONTAINER WITH POLITE INTERVIEWER / SUPPORTIVE COACH TRANSITION */}
      <div className={`rounded-2xl border transition-all duration-300 p-6 sm:p-7 shadow-xs ${
        mode === 'mentor'
          ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/80'
          : 'bg-white dark:bg-zinc-900 border-zinc-200/90 dark:border-zinc-800'
      }`}>

        {/* Clean, Polite Question Card with Professional Avatar as requested */}
        <div className="pb-4 mb-4 border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-200 shrink-0 font-semibold text-xs">
              {mode === 'mentor' ? (
                <Smile className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              ) : (
                <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {mode === 'mentor' ? 'Placement Coach' : 'Campus Interviewer'}
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                  {question.category}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {mode === 'mentor' ? 'Supportive coaching active' : question.interviewerTone}
              </p>
            </div>
          </div>

          <span className="text-xs text-zinc-400 font-medium">
            Question {currentIdx + 1} of {MOCK_INTERVIEW_QUESTIONS.length}
          </span>
        </div>

        {/* The Question */}
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
            "{question.question}"
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <strong className="text-zinc-800 dark:text-zinc-300">Context:</strong> {question.context}
          </p>
        </div>

        {/* INTERVIEWER STATE: ANSWER STATION */}
        {mode === 'interviewer' && !mentorData && (
          <div className="mt-5 space-y-4">
            
            <div className="relative">
              <textarea
                rows={5}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Type your answer or click 'Speak Answer' to practice talking out loud..."
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed transition-all"
              />

              {isRecording && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  <span>Listening...</span>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isRecording
                      ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                      : 'bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                  <span>{isRecording ? 'Stop Mic' : 'Speak Answer'}</span>
                </button>

                {/* THE GENTLE "I'M STUCK" BUTTON */}
                <button
                  type="button"
                  onClick={() => handleEvaluate(true)}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-xs font-semibold transition-colors cursor-pointer"
                  title="Shift to Mentor Mode for safe corporate pivot coaching"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>I'm Stuck (Ask Coach)</span>
                </button>
              </div>

              {/* Submit Answer Button */}
              <button
                type="button"
                onClick={() => handleEvaluate(false)}
                disabled={isLoading || !answerText.trim()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Evaluating...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Answer</span>
                  </>
                )}
              </button>

            </div>

          </div>
        )}

        {/* STRONG ANSWER RESULT IN INTERVIEWER MODE */}
        {mode === 'interviewer' && mentorData && (
          <div className="mt-5 space-y-4 animate-in fade-in">
            <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  {mentorData.headline}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-bold">
                  {mentorData.scoreOutOf10}/10 Rating
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                {mentorData.interviewerFeedback}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleRetry}
                className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors border border-zinc-200 dark:border-zinc-700 cursor-pointer"
              >
                Try Again
              </button>
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* GENTLE COACH NOTE TRANSITION (EXACTLY AS SPECIFIED BY USER) */}
        {mode === 'mentor' && mentorData && (
          <div className="mt-5 space-y-4 animate-in fade-in">
            
            {/* The Gentle Coach Note Sticky Card */}
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-100 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                <Smile className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Coach Note:</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-medium">
                "Take a breath! This trips up a lot of students. Here is the concept in simple terms, and here is a polite phrase you can use to pivot without losing marks."
              </p>
            </div>

            {/* Concept in Simple Terms */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                The Concept in Simple Terms:
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {mentorData.explanation}
              </p>
            </div>

            {/* Polite Phrase You Can Use to Pivot Without Losing Marks */}
            <div className="p-4 sm:p-5 rounded-xl bg-amber-100/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  🛡️ Say this in your real interview (Corporate Pivot):
                </span>
                <button
                  type="button"
                  onClick={handleCopyPivot}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-amber-200/80 hover:bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-semibold transition-colors cursor-pointer"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <blockquote className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 font-medium italic leading-relaxed pl-3 border-l-2 border-amber-500">
                "{mentorData.corporatePivotPhrase}"
              </blockquote>
            </div>

            {/* Actionable Coach Tips */}
            <div className="space-y-1.5 pt-1">
              <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Key interview takeaway:
              </h5>
              {mentorData.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{tip}</span>
                </div>
              ))}
            </div>

            {/* Retry or Proceed */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                A calm pivot shows maturity and composure under pressure.
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Practice the Pivot</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Key Concepts Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-5 space-y-2 text-xs shadow-xs">
        <span className="font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block">
          Key Concepts Evaluated in This Question:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {question.idealKeypoints.map((pt, i) => (
            <div key={i} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
