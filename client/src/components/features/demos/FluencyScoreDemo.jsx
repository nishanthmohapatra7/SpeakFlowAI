import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Award, ArrowUp } from 'lucide-react';

export default function FluencyScoreDemo() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-8 relative z-10">
        <h4 className="text-slate-300 font-medium mb-2 uppercase tracking-widest text-xs">Overall Fluency Score</h4>
        <div className="flex items-end justify-center gap-2">
          <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
            780
          </span>
          <span className="text-slate-500 font-medium pb-2 text-lg">/1000</span>
        </div>
        <div className="inline-flex items-center gap-1 mt-3 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold">
          <ArrowUp className="w-3 h-3" /> +45 points this month
        </div>
      </div>

      <div className="space-y-5 relative z-10">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-400" /> Pronunciation
            </span>
            <span className="text-sm font-bold text-white">85%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-rose-500 rounded-full"
            />
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" /> Vocabulary Depth
            </span>
            <span className="text-sm font-bold text-white">72%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
             <motion.div 
              initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ duration: 1, delay: 0.4 }}
              className="h-full bg-amber-500 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
        <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex justify-between">
          Recent Achievements
          <span className="text-rose-400 hover:text-rose-300 cursor-pointer">View All</span>
        </h5>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-0.5 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <span className="text-[10px] text-slate-300 font-medium text-center">7 Day<br/>Streak</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 p-0.5 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
             <span className="text-[10px] text-slate-500 font-medium text-center">10K<br/>Words</span>
          </div>
        </div>
      </div>
    </div>
  );
}
