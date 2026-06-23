import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Star, Target, TrendingUp } from 'lucide-react';

export default function SpeakingCoachDemo() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg">Coach Review</h4>
            <p className="text-xs text-purple-300">Session Summary</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-white">B2+</div>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">CEFR Level</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Star className="w-12 h-12 text-yellow-500" />
          </div>
          <p className="text-xs text-slate-400 font-semibold mb-1">Confidence</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-yellow-400">8.5</span>
            <span className="text-sm text-slate-500 mb-1">/10</span>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <TrendingUp className="w-12 h-12 text-emerald-500" />
          </div>
          <p className="text-xs text-slate-400 font-semibold mb-1">Fluency</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-emerald-400">92</span>
            <span className="text-sm text-slate-500 mb-1">%</span>
          </div>
        </motion.div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" /> Personalized Recommendations
          </h5>
          <div className="space-y-2">
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-sm text-purple-200">Practice pacing. You tend to speak very fast when nervous (160 WPM).</p>
            </div>
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-sm text-purple-200">Focus on the 'th' sound in words like "thought" and "through".</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium rounded-xl transition-colors">
          View Full Report
        </button>
        <button className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(147,51,234,0.4)]">
          Next Lesson
        </button>
      </div>
    </div>
  );
}
