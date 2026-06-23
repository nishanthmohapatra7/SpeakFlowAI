import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Mic, SkipBack, SkipForward, AlertCircle } from 'lucide-react';

export default function SpeechPlaybackDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1.5;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col h-[500px]">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-white font-bold text-lg">Session Audio</h4>
          <p className="text-teal-400 text-xs mt-1">May 15, 2026 • Presentation Prep</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-colors group">
          <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/5 mb-8 shadow-inner relative overflow-hidden">
        {/* Playback Progress Overlay */}
        <div 
          className="absolute inset-y-0 left-0 bg-teal-500/10 pointer-events-none transition-all duration-75"
          style={{ width: `${progress}%` }}
        />

        {/* Fake Waveform */}
        <div className="h-20 flex items-center justify-between gap-0.5 mb-6 relative z-10">
          {Array.from({ length: 50 }).map((_, i) => {
            const isActive = (i / 50) * 100 <= progress;
            const height = Math.random() * 80 + 20;
            return (
              <div 
                key={i} 
                className={`w-1.5 rounded-full transition-colors ${isActive ? 'bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.5)]' : 'bg-slate-700'}`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
        
        <div className="flex justify-between items-center relative z-10 text-slate-400 text-xs font-mono mb-4">
           <span>00:{(progress * 0.6).toFixed(0).padStart(2, '0')}</span>
           <span>01:00</span>
        </div>

        <div className="flex justify-center items-center gap-6 relative z-10">
          <button className="text-slate-400 hover:text-white transition-colors">
            <SkipBack className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white flex items-center justify-center transition-all shadow-[0_0_20px_rgba(45,212,191,0.4)] transform hover:scale-105"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="mt-auto">
        <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">AI Annotations</h5>
        <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-start gap-3">
          <AlertCircle className="text-teal-400 w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
             <span className="text-teal-300 text-xs font-bold bg-teal-500/20 px-2 py-0.5 rounded border border-teal-500/30 mb-2 inline-block">@ 0:42</span>
             <p className="text-teal-100 text-sm leading-relaxed">
              Your pacing was excellent here. The pause before delivering the main point added great emphasis.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
