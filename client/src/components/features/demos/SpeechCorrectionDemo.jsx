import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, ArrowRight, Lightbulb } from 'lucide-react';

export default function SpeechCorrectionDemo() {
  const [activeTab, setActiveTab] = useState(0);

  const corrections = [
    {
      original: "I looking forward to see you.",
      corrected: "I'm looking forward to seeing you.",
      explanation: "Use the present continuous 'am looking' and the gerund 'seeing' after 'look forward to'.",
      type: "Grammar"
    },
    {
      original: "The food was very good.",
      corrected: "The food was exceptional.",
      explanation: "Instead of 'very good', use a stronger adjective like 'exceptional', 'outstanding', or 'delicious'.",
      type: "Vocabulary"
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <Lightbulb className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h4 className="text-white font-bold">Smart Corrections</h4>
          <p className="text-xs text-slate-400">Contextual suggestions</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {corrections.map((c, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all border ${activeTab === i ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-slate-800/50 border-white/5 text-slate-400 hover:bg-slate-800'}`}
          >
            Example {i + 1}
          </button>
        ))}
      </div>

      <div className="relative min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Original Card */}
            <div className="p-4 bg-slate-800/40 rounded-2xl border border-rose-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500/50"></div>
              <p className="text-xs text-rose-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> You said:
              </p>
              <p className="text-slate-300 line-through decoration-rose-500/50 decoration-2 text-lg">
                {corrections[activeTab].original}
              </p>
            </div>

            <div className="flex justify-center -my-2 relative z-10">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shadow-lg">
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Corrected Card */}
            <div className="p-4 bg-slate-800/40 rounded-2xl border border-emerald-500/20 relative overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50"></div>
              <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Better phrasing:
              </p>
              <p className="text-white font-medium text-lg">
                {corrections[activeTab].corrected}
              </p>
            </div>

            {/* Explanation */}
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-3">
               <div className="mt-0.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {corrections[activeTab].type}
                  </span>
               </div>
               <p className="text-sm text-blue-200 leading-relaxed">
                 {corrections[activeTab].explanation}
               </p>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
