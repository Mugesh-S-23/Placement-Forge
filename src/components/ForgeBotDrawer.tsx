'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Send, 
  Sparkles, 
  Loader2, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export const ForgeBotDrawer: React.FC = () => {
  const { isForgeBotOpen, setIsForgeBotOpen, chatMessages, addChatMessage, user } = useApp();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Exact real student questions as requested
  const studentQuestions = [
    "I have a 1-year gap, how do I explain it to TCS HR?",
    "I am from ECE/Mechanical, how do I answer 'Why IT?'",
    "What are the common coding questions asked in Cognizant Round 1?",
    "Zoho round 2 programming pattern tips",
    "What projects are best for campus resume?"
  ];

  useEffect(() => {
    if (isForgeBotOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isForgeBotOpen]);

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
        text: "Here is practical placement cell advice: For academic gaps, highlight certifications or projects you completed during that time. Interviewers look for sincerity and steady progress!"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isForgeBotOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsForgeBotOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col transition-colors duration-200">
          
          {/* Drawer Header: Placement Cell Mentor Desk */}
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  Placement Cell Mentor Desk
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Student Placement Companion &amp; Drive Support</p>
              </div>
            </div>

            <button
              onClick={() => setIsForgeBotOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close mentor drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Preset Topics Ribbon */}
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950/40 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto">
            <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
              Frequently Asked Campus Questions
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {studentQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="text-left text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-zinc-200 dark:border-zinc-700 transition-colors font-medium cursor-pointer shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-white dark:bg-zinc-900">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-zinc-50 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/60 rounded-bl-none'
                  }`}
                >
                  <div className="space-y-1.5 whitespace-pre-line">
                    {msg.text}
                  </div>
                </div>
                <span className="text-[10px] text-zinc-400 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Suggested follow-up chips if available */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-2 space-y-1.5 pl-1 w-full">
                    <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">
                      Related Follow-Ups:
                    </span>
                    <div className="flex flex-col gap-1">
                      {msg.suggestedQuestions.map((followUp, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(followUp)}
                          disabled={isLoading}
                          className="text-left text-xs px-3 py-1.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-zinc-200 dark:border-zinc-700/40 transition-colors flex items-center justify-between font-medium cursor-pointer"
                        >
                          <span className="truncate">{followUp}</span>
                          <ArrowRight className="w-3 h-3 shrink-0 ml-1 text-zinc-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" />
                <span>Checking placement notes...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80">
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
                placeholder="Ask about TCS, Zoho, HR rounds, gaps, or resume..."
                className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 text-center">
              Covers TCS, CTS, Infosys, Zoho drive patterns &amp; corporate pivot coaching.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
