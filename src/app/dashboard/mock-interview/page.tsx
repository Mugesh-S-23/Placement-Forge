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
  ShieldAlert, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  UserCheck, 
  MessageSquare, 
  Loader2,
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
      alert("Voice input is supported in Chrome/Edge browsers. You can also type directly in the text box below.");
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
      if (data.mode === 'mentor') {
        setMode('mentor');
        setMentorData({
          headline: data.headline || 'Mentor Mode Activated: Master the Corporate Pivot',
          explanation: data.explanation || question.mentorExplanation,
          corporatePivotPhrase: data.corporatePivotPhrase || question.corporatePivotPhrase,
          tips: data.tips || [
            "Never guess in an interview.",
            "Use the 3-step pivot formula: Acknowledge -> Architectural map -> Related bridge.",
            "Interviewers value transparency."
          ],
          retryPrompt: data.retryPrompt
        });
      } else {
        setMode('interviewer');
        setMentorData({
          headline: data.headline || 'Strong Answer!',
          explanation: '',
          corporatePivotPhrase: question.corporatePivotPhrase,
          interviewerFeedback: data.interviewerFeedback || 'Well-structured response that addresses the core requirements.',
          scoreOutOf10: data.scoreOutOf10 || 9,
          tips: data.tips || ['Great calm articulation. Keep up this standard.']
        });
      }
    } catch (err) {
      console.error("Interview API error:", err);
      // Fallback
      if (isStuck) {
        setMode('mentor');
        setMentorData({
          headline: 'Mentor Mode Activated: Breathe Easy & Learn the Pivot',
          explanation: question.mentorExplanation,
          corporatePivotPhrase: question.corporatePivotPhrase,
          tips: [
            "State the high-level purpose of the system.",
            "Bridge to a college project or coursework where you solved a similar problem.",
            "Demonstrate eager ramp-up readiness."
          ]
        });
      }
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
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Page Title & Question Switcher Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-semibold tracking-wider text-indigo-400">
              Interactive Assessment
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Adaptive Mock Interviewer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Practice spoken or written responses. If you get stuck, the system smoothly shifts into <strong>Mentor Mode</strong> to teach you the corporate pivot.
          </p>
        </div>

        {/* Question Selector Dots */}
        <div className="flex items-center gap-2">
          {MOCK_INTERVIEW_QUESTIONS.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                setCurrentIdx(idx);
                setMode('interviewer');
                setMentorData(null);
                setAnswerText('');
              }}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                idx === currentIdx
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              Q{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* STAGE CONTAINER WITH DUAL-MODE DYNAMIC SHIFT */}
      <div className={`rounded-2xl border transition-all duration-300 p-5 sm:p-7 shadow-lg ${
        mode === 'mentor'
          ? 'bg-amber-950/20 border-amber-500/60 ring-1 ring-amber-500/40 shadow-amber-900/10'
          : 'bg-slate-900/90 border-slate-800'
      }`}>

        {/* Mode Indicator Banner */}
        <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            {mode === 'mentor' ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold animate-in fade-in">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                Mentor Mode Activated
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                Interviewer Mode: {question.interviewerTone}
              </span>
            )}
            
            <span className="text-xs text-slate-400 font-medium">
              {question.category}
            </span>
          </div>

          <span className="text-xs text-slate-400">
            Question {currentIdx + 1} of {MOCK_INTERVIEW_QUESTIONS.length}
          </span>
        </div>

        {/* Question Display */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
            "{question.question}"
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong>Context:</strong> {question.context}
          </p>
        </div>

        {/* NORMAL INTERVIEWER STATE: ANSWER STATION */}
        {mode === 'interviewer' && !mentorData && (
          <div className="mt-6 space-y-4">
            
            <div className="relative">
              <textarea
                rows={5}
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Type your answer or click the mic button to speak your response aloud..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />

              {isRecording && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Listening...</span>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              
              {/* Voice toggle + Quick hints */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    isRecording
                      ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                      : 'bg-slate-950 text-slate-300 border-slate-700 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-indigo-400" />}
                  <span>{isRecording ? 'Stop Recording' : 'Speak Answer'}</span>
                </button>

                {/* THE "I'M STUCK" TRIGGER BUTTON */}
                <button
                  type="button"
                  onClick={() => handleEvaluate(true)}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
                  title="Shift to Mentor Mode for safe corporate pivot coaching"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>I'm Stuck (Shift to Mentor)</span>
                </button>
              </div>

              {/* Submit Answer Button */}
              <button
                type="button"
                onClick={() => handleEvaluate(false)}
                disabled={isLoading || !answerText.trim()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Evaluating Response...</span>
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
          <div className="mt-6 space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {mentorData.headline}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  {mentorData.scoreOutOf10}/10 Rating
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                {mentorData.interviewerFeedback}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleRetry}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Retry Question
              </button>
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TRIGGER STATE: MENTOR MODE ACTIVATED WITH WARM AMBER ACCENTS */}
        {mode === 'mentor' && mentorData && (
          <div className="mt-6 space-y-5 animate-in fade-in">
            
            {/* Why This Question is Tricky */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/30 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Why This Question Catches Freshers Off-Guard:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {mentorData.explanation}
              </p>
            </div>

            {/* THE SAFE CORPORATE PIVOT PHRASE */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-300 flex items-center gap-1.5">
                  🛡️ Safe Corporate Pivot Phrase (Say This in Real Interviews):
                </span>
                <button
                  type="button"
                  onClick={handleCopyPivot}
                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 font-semibold transition-colors"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'Copied Phrase!' : 'Copy Phrase'}</span>
                </button>
              </div>

              <blockquote className="text-xs sm:text-sm text-amber-100 font-medium italic leading-relaxed pl-3 border-l-2 border-amber-400">
                "{mentorData.corporatePivotPhrase}"
              </blockquote>
            </div>

            {/* Key Actionable Tips */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Mentor Blueprint:
              </h5>
              {mentorData.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>

            {/* Retry or Proceed Actions */}
            <div className="pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Mastering the pivot preserves confidence and proves engineering honesty.
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Practice Pivot &bull; Retry</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Ideal Keypoints Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
        <span className="font-semibold uppercase tracking-wider text-slate-400 block">
          Key Concepts Evaluated in This Question:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {question.idealKeypoints.map((pt, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
