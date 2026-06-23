import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Volume2, Mic, ArrowRightLeft } from 'lucide-react';

export default function AccentTrainingDemo() {
  const [activeAccent, setActiveAccent] = useState('american');

  const accents = [
    { id: 'american', flag: '🇺🇸', label: 'American' },
    { id: 'british', flag: '🇬🇧', label: 'British' },
    { id: 'indian', flag: '🇮🇳', label: 'Indian' }
  ];

  const examples = {
    american: {
      word: 'Schedule',
      phonetic: '/ˈskɛdʒuːl/',
      audio: 'sked-jool'
    },
    british: {
      word: 'Schedule',
      phonetic: '/ˈʃɛdjuːl/',
      audio: 'shed-yool'
    },
    indian: {
      word: 'Schedule',
      phonetic: '/ʃeˈdjuːl/',
      audio: 'she-dyool'
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-sky-500/20 rounded-xl border border-sky-500/30">
          <Globe className="w-6 h-6 text-sky-400" />
        </div>
        <div>
          <h4 className="text-white font-bold text-lg">Accent Training</h4>
          <p className="text-xs text-slate-400">Master regional phonetics</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-800/50 rounded-xl mb-8 border border-white/5">
        {accents.map(accent => (
          <button
            key={accent.id}
            onClick={() => setActiveAccent(accent.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${activeAccent === accent.id ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <span className="text-lg">{accent.flag}</span>
            {accent.label}
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 rounded-2xl p-6 border border-white/5 relative overflow-hidden mb-6 shadow-inner">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="text-center mb-6 relative z-10">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-2">Practice Word</p>
          <h2 className="text-4xl font-extrabold text-white mb-2">{examples[activeAccent].word}</h2>
          <p className="text-slate-400 font-mono text-lg">{examples[activeAccent].phonetic}</p>
        </div>

        <div className="flex gap-4 relative z-10">
          <button className="flex-1 py-4 bg-sky-600/20 border border-sky-500/30 hover:bg-sky-600/40 text-sky-300 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors">
            <Volume2 className="w-6 h-6" />
            <span className="text-xs font-semibold">Listen ({examples[activeAccent].audio})</span>
          </button>
          
          <button className="flex-1 py-4 bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/40 text-rose-300 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors">
            <Mic className="w-6 h-6" />
            <span className="text-xs font-semibold">Your Turn</span>
          </button>
        </div>
      </div>

      <div className="p-4 bg-sky-900/20 border border-sky-500/20 rounded-xl">
        <h5 className="text-sm font-bold text-sky-300 mb-2 flex items-center gap-2">
           <ArrowRightLeft className="w-4 h-4" /> Regional Differences
        </h5>
        <p className="text-xs text-slate-300 leading-relaxed">
          {activeAccent === 'american' && "In American English, the 'sch' is pronounced as a hard 'sk' sound. The 't' in the middle of words often becomes a soft 'd'."}
          {activeAccent === 'british' && "In British English, the 'sch' is often pronounced as 'sh'. R-sounds at the end of words are typically dropped (non-rhotic)."}
          {activeAccent === 'indian' && "In Indian English, pronunciation often follows spelling more closely. The 'sch' can vary, and 't' and 'd' are often retroflex consonants."}
        </p>
      </div>

    </div>
  );
}
