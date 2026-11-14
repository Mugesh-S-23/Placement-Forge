'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Send, 
  Sparkles, 
  Loader2, 
  Copy, 
  Check, 
  MessageSquare,
  GraduationCap
} from 'lucide-react';

export default function ChatPage() {
  const { chatMessages, addChatMessage, user, scores } = useApp();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Real student questions as requested
  const studentQuestions = [
    { label: "1-Year Academic Gap", q: "I have a 1-year gap, how do I explain it to TCS HR?" },
    { label: "Non-CS / 'Why IT?'", q: "I am from ECE/Mechanical, how do I answer 'Why IT?'" },
    { label: "Cognizant Round 1", q: "What are the common coding questions asked in Cognizant Round 1?" },
    { label: "Zoho Round 2 Patterns", q: "Zoho round 2 programming pattern tips and common matrix questions" },
    { label: "Resume Projects", q: "What projects should I highlight on my resume with basic college coursework?" }
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
        text: data.reply || "Let me break that down in simple steps for you...",
        suggestedQuestions: data.suggestedFollowups
      });
    } catch (err) {
      console.error("Chat error:", err);
      addChatMessage({
        sender: 'forgebot',
        text: "Here is the key takeaway: Be honest and show continuous learning. For TCS, focus on basic data structures (Arrays & Strings) and prepare a clear 60-second self-introduction that highlights your college projects."
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
    <div className="w-full max-w-5xl space-y-4 flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-200">
      
      {/* Rebranded Header: Placement Cell Mentor Desk */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              Placement Cell Mentor Desk
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Guidance for <strong className="text-zinc-700 dark:text-zinc-300">{user.targetRole}</strong> &bull; {user.department}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold">
          <span>Student Support Active</span>
        </div>
      </div>

      {/* Real Student Question Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 shrink-0">
          Frequently asked:
        </span>
        {studentQuestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(item.q)}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-zinc-200 dark:border-zinc-800 transition-colors shrink-0 font-medium cursor-pointer shadow-xs"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 overflow-y-auto space-y-4 shadow-xs">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed relative group shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-zinc-50 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/60 rounded-bl-none'
              }`}
            >
              <div className="space-y-1.5 whitespace-pre-line">
                {msg.text}
              </div>

              {msg.sender === 'forgebot' && (
                <button
                  type="button"
                  onClick={() => handleCopyMessage(msg.id, msg.text)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 dark:bg-zinc-700/80 hover:bg-white dark:hover:bg-zinc-600 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-600 cursor-pointer"
                  title="Copy advice"
                >
                  {copiedId === msg.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>

            <span className="text-[10px] text-zinc-400 mt-1 px-1">
              {msg.timestamp}
            </span>

            {/* Follow-up question chips */}
            {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
              <div className="mt-2 space-y-1.5 pl-1 max-w-[85%]">
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                  Related Student Questions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {msg.suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(q)}
                      disabled={isLoading}
                      className="text-left text-xs px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-zinc-200 dark:border-zinc-700 transition-colors font-medium cursor-pointer"
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
          <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" />
            <span>Consulting placement notes...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-2.5 shadow-xs">
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
            placeholder="Ask about TCS, Zoho, gap years, 'Why IT?' or resume doubts..."
            className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
