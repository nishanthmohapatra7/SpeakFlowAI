import React from 'react';
import { EyeOff, AlertTriangle, Activity } from 'lucide-react';

export default function FillerWordDemo() {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col h-[500px]">
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-500/20 rounded-xl border border-red-500/30">
          <EyeOff className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h4 className="text-white font-bold text-lg">Filler Detection</h4>
          <p className="text-xs text-slate-400">Speech clarity analysis</p>
        </div>
      </div>

      <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 mb-6 flex gap-4">
        <div className="flex-1 text-center">
          <p className="text-3xl font-extrabold text-red-400 mb-1">12</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Fillers</p>
        </div>
        <div className="w-px bg-white/10"></div>
        <div className="flex-1 text-center">
          <p className="text-3xl font-extrabold text-white mb-1">4.5<span className="text-lg text-slate-500">%</span></p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Density</p>
        </div>
      </div>

      <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Transcript Analysis</h5>
      <div className="flex-1 bg-black/20 p-5 rounded-2xl border border-white/5 overflow-y-auto leading-relaxed text-slate-300 text-sm shadow-inner mb-6">
        So, <span className="bg-red-500/20 text-red-300 px-1 rounded border-b border-red-500/50 cursor-pointer hover:bg-red-500/30 transition-colors inline-block mx-0.5">um</span>, I think that the project is going well. We have, <span className="bg-red-500/20 text-red-300 px-1 rounded border-b border-red-500/50 cursor-pointer hover:bg-red-500/30 transition-colors inline-block mx-0.5">like</span>, completed the first phase. But, <span className="bg-red-500/20 text-red-300 px-1 rounded border-b border-red-500/50 cursor-pointer hover:bg-red-500/30 transition-colors inline-block mx-0.5">you know</span>, there are still some bugs. <span className="bg-red-500/20 text-red-300 px-1 rounded border-b border-red-500/50 cursor-pointer hover:bg-red-500/30 transition-colors inline-block mx-0.5">Basically</span>, we just need more time.
      </div>

      <div className="mt-auto p-4 bg-red-900/20 border border-red-500/20 rounded-xl">
        <h5 className="text-sm font-bold text-red-400 mb-2 flex items-center gap-2">
           <AlertTriangle className="w-4 h-4" /> Recommendation
        </h5>
        <p className="text-xs text-red-200 leading-relaxed">
          You frequently use "like" as a crutch word. Try taking a half-second pause instead of filling the silence. Pauses make you sound more thoughtful and confident.
        </p>
      </div>

    </div>
  );
}
