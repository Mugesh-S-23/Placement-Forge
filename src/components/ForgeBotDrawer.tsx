'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  ShieldQuestion
} from 'lucide-react';

export const ForgeBotDrawer: React.FC = () => {
  const { isForgeBotOpen, setIsForgeBotOpen, chatMessages, addChatMessage, user } = useApp();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    "What to prepare for TCS NQT Round 1?",
    "How to introduce myself as a non-CS student?",
    "How to explain an academic gap in HR round?",
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
        text: data.reply || "I am analyzing your placement query...",
        suggestedQuestions: data.suggestedFollowups
      });
    } catch (err) {
      console.error("Chat error:", err);
      addChatMessage({
        sender: 'forgebot',
        text: "I'm currently assisting multiple students on campus Wi-Fi. For TCS, focus on basic data structures (Arrays & HashMaps); for Zoho, practice pointer dry runs and matrix patterns!"
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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsForgeBotOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
                  ForgeBot
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <p className="text-[11px] text-slate-400">24/7 Campus Placement & Drive AI Mentor</p>
              </div>
            </div>

            <button
              onClick={() => setIsForgeBotOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              aria-label="Close mentor drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Preset Topics Ribbon */}
          <div className="p-3 bg-slate-950/40 border-b border-slate-800/80 overflow-x-auto">
            <p className="text-[11px] uppercase font-semibold text-slate-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              Frequently Asked Campus Doubts
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="text-left text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-indigo-300 border border-slate-700/60 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[92%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-sm'
                  }`}
                >
                  {/* Clean formatting for line breaks and markdown bullets */}
                  <div className="space-y-2 whitespace-pre-line">
                    {msg.text}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Suggested follow-up chips if available */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-2 space-y-1.5 pl-1 w-full">
                    <span className="text-[10px] uppercase font-semibold text-indigo-400 block">
                      Related Follow-Ups:
                    </span>
                    <div className="flex flex-col gap-1">
                      {msg.suggestedQuestions.map((followUp, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(followUp)}
                          disabled={isLoading}
                          className="text-left text-xs px-2 py-1 rounded bg-slate-800/60 hover:bg-indigo-950/40 text-slate-300 hover:text-indigo-300 border border-slate-700/40 transition-colors flex items-center justify-between"
                        >
                          <span className="truncate">{followUp}</span>
                          <ArrowRight className="w-3 h-3 shrink-0 ml-1 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50 border border-slate-700/40 text-slate-400 text-xs w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                <span>ForgeBot is preparing actionable placement guidance...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/80">
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
                placeholder="Ask about TCS, Zoho, HR questions, or resume..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              Covers TCS, CTS, Infosys, Zoho drive patterns &amp; corporate pivot coaching.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
