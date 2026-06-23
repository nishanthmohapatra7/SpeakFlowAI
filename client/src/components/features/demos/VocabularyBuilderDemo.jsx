import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, ChevronRight, Check } from 'lucide-react';

export default function VocabularyBuilderDemo() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col h-[500px]">
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-cyan-400 font-bold uppercase tracking-wider text-xs mb-1">Word of the Day</h4>
          <h2 className="text-3xl font-extrabold text-white">Ubiquitous</h2>
          <p className="text-slate-400 text-sm mt-1 font-medium">/yuˈbɪkwɪtəs/</p>
        </div>
        <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30">
          <BookOpen className="w-6 h-6 text-cyan-400" />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          <span className="text-cyan-400 font-semibold">adjective</span> • Present, appearing, or found everywhere.
        </p>
        <div className="p-4 bg-slate-800/40 rounded-xl border border-white/5 border-l-4 border-l-cyan-500">
          <p className="text-sm text-slate-400 italic">"His ubiquitous influence was felt by all the family."</p>
        </div>
      </div>

      <div className="mb-6 flex-1">
        <h5 className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Synonyms</h5>
        <div className="flex flex-wrap gap-2">
          {['omnipresent', 'pervasive', 'universal', 'worldwide'].map(word => (
            <span key={word} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors cursor-pointer">
              {word}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showQuiz ? (
          <motion.div 
            key="btn"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="mt-auto"
          >
            <button 
              onClick={() => setShowQuiz(true)}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]"
            >
              Take Mini Quiz <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mt-auto p-4 bg-cyan-900/30 border border-cyan-500/30 rounded-2xl"
          >
            <p className="text-sm text-white font-medium mb-4 flex items-center gap-2">
               <Sparkles className="w-4 h-4 text-cyan-400" /> Which of the following is an antonym for ubiquitous?
            </p>
            <div className="space-y-2">
              {['Abundant', 'Rare', 'Common'].map((opt, i) => (
                <button 
                  key={opt}
                  onClick={() => setSelectedAnswer(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors flex justify-between items-center ${selectedAnswer === i ? (i === 1 ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-rose-500/20 border-rose-500/50 text-rose-300') : 'bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-800'} border`}
                >
                  {opt}
                  {selectedAnswer === i && i === 1 && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
