import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, Zap } from 'lucide-react';

export default function AnalyticsDashboardDemo() {
  const chartData = [
    { day: 'Mon', fluency: 40, vocab: 30 },
    { day: 'Tue', fluency: 55, vocab: 45 },
    { day: 'Wed', fluency: 50, vocab: 40 },
    { day: 'Thu', fluency: 70, vocab: 65 },
    { day: 'Fri', fluency: 80, vocab: 75 },
    { day: 'Sat', fluency: 95, vocab: 85 },
    { day: 'Sun', fluency: 90, vocab: 95 },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <BarChart3 className="text-indigo-400 w-5 h-5" />
          </div>
          <h4 className="text-white font-bold">Weekly Performance</h4>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
          <TrendingUp className="w-3 h-3" /> +15%
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="bg-slate-800/40 rounded-2xl p-4 border border-white/5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Fluency Progress</span>
          <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> This Week</span>
        </div>
        
        <div className="h-32 flex items-end justify-between gap-1 mt-4">
          {chartData.map((data, i) => (
            <div key={i} className="flex flex-col items-center gap-2 w-full group">
              <div className="relative w-full h-24 flex items-end justify-center rounded-t-md overflow-hidden bg-slate-800/50">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${data.fluency}%` }}
                  transition={{ duration: 1, delay: i * 0.1, type: "spring", stiffness: 50 }}
                  className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-sm"
                />
              </div>
              <span className="text-[10px] text-slate-400 font-medium group-hover:text-indigo-300 transition-colors">{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 p-4 rounded-2xl border border-white/5 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-300 font-medium">Speaking Speed</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">142 <span className="text-sm font-normal text-slate-400">WPM</span></div>
          <div className="text-[10px] text-emerald-400 font-medium">+12 WPM from last week</div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 p-4 rounded-2xl border border-white/5 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-300 font-medium">Vocabulary</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">340 <span className="text-sm font-normal text-slate-400">words</span></div>
          <div className="text-[10px] text-emerald-400 font-medium">45 new words learned</div>
        </motion.div>
      </div>

    </div>
  );
}
