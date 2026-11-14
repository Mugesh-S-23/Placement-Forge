'use client';

import React, { useState } from 'react';
import { MASTERCLASSES } from '@/data/masterclasses';
import { MasterclassItem } from '@/types';
import { 
  Play, 
  Clock, 
  User, 
  CheckCircle2, 
  X, 
  BookmarkCheck, 
  Volume2,
  Sparkles
} from 'lucide-react';

export default function VideoVaultPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<MasterclassItem | null>(null);

  const categories = [
    'All',
    'Alumni Placement Secrets',
    'Core & Non-CS Transitions',
    'Zero-to-One Tech Foundations',
    'HR Rounds & Communication'
  ];

  const filtered = selectedCategory === 'All'
    ? MASTERCLASSES
    : MASTERCLASSES.filter(item => item.category === selectedCategory);

  return (
    <div className="w-full space-y-7 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5 border-b border-zinc-200/80 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              Senior Alumni Sessions &bull; Real Interview Breakdowns
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Alumni Masterclasses &amp; Video Briefings
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Distilled 15-to-28 minute engineering briefings from seniors across CS and non-CS branches. Learn what worked, common mistakes, and how they cleared rounds.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-2 rounded-xl border font-medium transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="tactile-card bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between transition-all group"
          >
            {/* Thumbnail Header area */}
            <div>
              <div 
                onClick={() => setActiveVideo(item)}
                className="relative h-44 bg-gradient-to-br from-zinc-900 via-indigo-950 to-zinc-900 p-4 flex flex-col justify-between cursor-pointer overflow-hidden border-b border-zinc-200 dark:border-zinc-800 transition-all"
              >
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 relative z-10">
                  <span className={`text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-md ${
                    item.category.includes('Alumni')
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30'
                      : item.category.includes('Core')
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30'
                      : item.category.includes('HR')
                      ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30'
                      : 'bg-indigo-500/30 text-indigo-200 border border-indigo-500/50'
                  }`}>
                    {item.category}
                  </span>

                  <span className="text-[11px] text-zinc-200 bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-md flex items-center gap-1 border border-white/10 font-medium">
                    <Clock className="w-3 h-3 text-zinc-300" />
                    {item.duration}
                  </span>
                </div>

                {/* Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-indigo-500 transition-all">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Speaker info bar at bottom of thumbnail */}
                <div className="relative z-10 text-[11px] text-zinc-200 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold text-white">{item.speaker}</span>
                  <span className="text-zinc-300 truncate">({item.speakerRole})</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-5 sm:p-6 space-y-3">
                <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {item.summary}
                </p>

                {/* Key Takeaways Preview */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block">
                    Core Senior Takeaways:
                  </span>
                  {item.takeaways.slice(0, 2).map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1 leading-snug">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-5 sm:p-6 pt-0">
              <button
                type="button"
                onClick={() => setActiveVideo(item)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-all shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span>Play Masterclass Video</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* WORKING PLAYABLE VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setActiveVideo(null)}
          />

          <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/80">
              <div className="overflow-hidden pr-3">
                <span className="text-[10px] uppercase font-semibold text-indigo-600 dark:text-indigo-400 block">
                  {activeVideo.category} &bull; {activeVideo.duration}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {activeVideo.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* REAL PLAYABLE VIDEO VIEWPORT */}
            <div className="relative w-full bg-black aspect-video">
              <iframe
                src={`${activeVideo.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Modal Takeaways & Transcript Highlights */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 bg-white dark:bg-zinc-900 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Key Takeaways &amp; Executive Summary
                </h4>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Speaker: <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">{activeVideo.speaker}</strong> ({activeVideo.speakerRole})
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {activeVideo.summary}
              </p>

              <div className="space-y-2.5 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                {activeVideo.takeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950/90 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Audio briefing synchronized with placement notes</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors cursor-pointer"
              >
                Close Video
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
