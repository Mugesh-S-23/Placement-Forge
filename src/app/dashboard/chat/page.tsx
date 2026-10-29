'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Loader2, 
  Building2, 
  Copy, 
  Check, 
  RotateCcw,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function ChatPage() {
  const { chatMessages, addChatMessage, user, scores } = useApp();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    { label: "TCS NQT Round 1", q: "What to prepare for TCS NQT Round 1?" },
    { label: "Non-CS Transition", q: "How to introduce myself as a non-CS student?" },
    { label: "Academic Gap / Backlog", q: "How to explain an academic gap in HR round?" },
    { label: "Zoho Round 2 & 3", q: "Zoho round 2 programming pattern tips" },
    { label: "Day-0 Resume", q: "What projects should I highlight on my resume?" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    setInputText('');
    addChatMessage({
      sender: 'user',
      text
    });

    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          targetRole: user.targetRole,
          department: user.department
        })
      });

      const data = await res.json();
      addChatMessage({
        sender: 'forgebot',
        text: data.reply || "Analyzing your query...",
        suggestedQuestions: data.suggestedFollowups
      });
    } catch (err) {
      console.error("Chat error:", err);
      addChatMessage({
        sender: 'forgebot',
        text: "For campus drives, prioritize: 1) Arrays & HashMaps, 2) One clean full-stack project, 3) Practicing your 60-second intro!"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 flex flex-col h-[calc(100vh-140px)]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Placement AI Mentor ("ForgeBot")
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h1>
            <p className="text-xs text-slate-400">
              Personalized recruitment intelligence for {user.targetRole} &bull; {user.department}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Velocity: +{scores.velocityDelta}%</span>
        </div>
      </div>

      {/* Preset Question Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
        <span className="text-xs uppercase font-semibold text-slate-400 shrink-0 mr-1">
          Preset Queries:
        </span>
        {presetQuestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(item.q)}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-indigo-300 border border-slate-800 transition-colors shrink-0"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 overflow-y-auto space-y-4 shadow-inner">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed relative group ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-sm'
              }`}
            >
              <div className="space-y-2 whitespace-pre-line">
                {msg.text}
              </div>

              {msg.sender === 'forgebot' && (
                <button
                  type="button"
                  onClick={() => handleCopyMessage(msg.id, msg.text)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 p-1.5 rounded bg-slate-700/80 hover:bg-slate-600 text-slate-300"
                  title="Copy advice"
                >
                  {copiedId === msg.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>

            <span className="text-[10px] text-slate-400 mt-1 px-1">
              {msg.timestamp}
            </span>

            {/* Follow-up question chips */}
            {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
              <div className="mt-2 space-y-1 pl-1 max-w-[85%]">
                <span className="text-[10px] uppercase font-semibold text-indigo-400 block">
                  Suggested Next Questions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {msg.suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(q)}
                      disabled={isLoading}
                      className="text-left text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-indigo-300 border border-slate-700/60 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/50 text-slate-300 text-xs w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            <span>ForgeBot is synthesizing structured placement guidance...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="shrink-0 bg-slate-900 border border-slate-800 rounded-xl p-2.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about TCS NQT, Zoho rounds, gap explanations, or interview etiquette..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
