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
  ExternalLink,
  Volume2
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
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
              Curated Video Vault
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Campus Masterclasses &amp; Video Briefings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Distilled 15-to-28 minute engineering briefings from alumni across CS and non-CS departments. Click to watch and study executive takeaways.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl border font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-slate-700 transition-all group"
          >
            {/* Thumbnail Header area */}
            <div>
              <div 
                onClick={() => setActiveVideo(item)}
                className="relative h-44 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 p-4 flex flex-col justify-between cursor-pointer overflow-hidden border-b border-slate-800 group-hover:from-slate-900 transition-all"
              >
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 relative z-10">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    item.category.includes('Alumni')
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      : item.category.includes('Core')
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                      : item.category.includes('HR')
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                      : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                  }`}>
                    {item.category}
                  </span>

                  <span className="text-[11px] text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded flex items-center gap-1 border border-slate-700">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {item.duration}
                  </span>
                </div>

                {/* Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-indigo-500 transition-all">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Speaker info bar at bottom of thumbnail */}
                <div className="relative z-10 text-[11px] text-slate-300 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="font-bold text-slate-200">{item.speaker}</span>
                  <span className="text-slate-400 truncate">({item.speakerRole})</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-4 sm:p-5 space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {item.summary}
                </p>

                {/* Key Takeaways Preview */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Core Briefing Takeaways:
                  </span>
                  {item.takeaways.slice(0, 2).map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1 leading-snug">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-4 pt-0">
              <button
                type="button"
                onClick={() => setActiveVideo(item)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm"
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveVideo(null)}
          />

          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="overflow-hidden pr-3">
                <span className="text-[10px] uppercase font-bold text-indigo-400 block">
                  {activeVideo.category} &bull; {activeVideo.duration}
                </span>
                <h3 className="text-xs sm:text-base font-bold text-slate-100 truncate">
                  {activeVideo.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors shrink-0"
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
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 bg-slate-900/95 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                  Key Takeaways &amp; Executive Summary
                </h4>
                <span className="text-xs text-slate-400">
                  Speaker: <strong className="text-slate-200">{activeVideo.speaker}</strong> ({activeVideo.speakerRole})
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeVideo.summary}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                {activeVideo.takeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Volume2 className="w-4 h-4 text-indigo-400" />
                <span>Audio briefing synchronized with placement notes</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
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
