import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Activity, RefreshCw } from 'lucide-react';

export default function PronunciationDemo() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/5 dark:bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-white font-bold text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-pink-400" /> Analysis
        </h4>
        <div className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
          92% Score
        </div>
      </div>

      {/* Circular Score display (fake) */}
      <div className="flex justify-center mb-8 relative">
        <div className="w-32 h-32 rounded-full border-8 border-slate-800 flex items-center justify-center relative shadow-inner">
           <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(34,197,94,0.2)" strokeWidth="8" />
            <motion.circle 
              cx="50" cy="50" r="46" 
              fill="none" 
              stroke="#22c55e" 
              strokeWidth="8" 
              strokeDasharray="289"
              initial={{ strokeDashoffset: 289 }}
              animate={{ strokeDashoffset: 289 - (289 * 0.92) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="text-center">
             <span className="text-3xl font-extrabold text-white">92</span>
             <span className="text-sm text-slate-400 block -mt-1">/ 100</span>
          </div>
        </div>
      </div>

      <div className="p-5 bg-slate-800/60 rounded-2xl border border-white/5 mb-6 text-lg leading-relaxed font-medium shadow-inner">
        <span className="text-green-400">The </span>
        <span className="text-green-400">quick </span>
        <span className="text-yellow-400 border-b border-yellow-400/50 cursor-help relative group transition-colors hover:bg-yellow-400/10 rounded px-0.5">brown 
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-slate-900 border border-yellow-500/30 text-xs text-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 pointer-events-none z-10">
            Sounded like "brawn"
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
          </div>
        </span>
        <span className="text-green-400"> fox </span>
        <span className="text-red-400 border-b border-red-400/50 cursor-help relative group transition-colors hover:bg-red-400/10 rounded px-0.5">jumps 
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-slate-900 border border-red-500/30 text-xs text-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 pointer-events-none z-10">
            Missed the 's' sound
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
          </div>
        </span>
        <span className="text-green-400"> over </span>
        <span className="text-green-400">the </span>
        <span className="text-green-400">lazy </span>
        <span className="text-green-400">dog.</span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center mb-6">
        <div className="bg-slate-800/40 p-3 rounded-xl border border-white/5 hover:bg-slate-800/60 transition-colors">
          <div className="text-2xl font-bold text-green-400">8</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-1">Perfect</div>
        </div>
        <div className="bg-slate-800/40 p-3 rounded-xl border border-white/5 hover:bg-slate-800/60 transition-colors">
          <div className="text-2xl font-bold text-yellow-400">1</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-1">Okay</div>
        </div>
        <div className="bg-slate-800/40 p-3 rounded-xl border border-white/5 hover:bg-slate-800/60 transition-colors">
          <div className="text-2xl font-bold text-red-400">1</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-1">Needs Work</div>
        </div>
      </div>

      <button 
        onClick={() => setIsRecording(!isRecording)}
        className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${isRecording ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 hover:bg-rose-500/30' : 'bg-pink-600 hover:bg-pink-500 text-white border border-pink-500'}`}
      >
        {isRecording ? (
          <><RefreshCw className="w-5 h-5 animate-spin" /> Analyzing...</>
        ) : (
          <><Mic className="w-5 h-5" /> Tap to Practice</>
        )}
      </button>
    </div>
  );
}
