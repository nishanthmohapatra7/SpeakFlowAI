import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Users, Coffee, PlayCircle, X } from 'lucide-react';

export default function RoleplayDemo() {
  const [selectedScenario, setSelectedScenario] = useState(null);

  const scenarios = [
    {
      id: 'interview',
      title: 'Job Interview',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'bg-blue-500',
      description: 'Practice answering tough behavioral questions for a software engineer role.'
    },
    {
      id: 'presentation',
      title: 'Presentation',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-emerald-500',
      description: 'Deliver a project update to stakeholders and handle Q&A.'
    },
    {
      id: 'casual',
      title: 'Coffee Chat',
      icon: <Coffee className="w-6 h-6" />,
      color: 'bg-amber-500',
      description: 'Casual networking and small talk with a new colleague.'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col">
      <div className="mb-6">
        <h4 className="text-white font-bold text-xl mb-1">Select a Scenario</h4>
        <p className="text-sm text-slate-400">Choose a real-life situation to practice.</p>
      </div>

      <div className="space-y-4 flex-1">
        {scenarios.map((scenario) => (
          <motion.div
            key={scenario.id}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedScenario(scenario)}
            className="p-4 bg-slate-800/40 border border-white/5 rounded-2xl cursor-pointer hover:bg-slate-800/60 transition-colors flex items-start gap-4 group"
          >
            <div className={`p-3 rounded-xl text-white shadow-lg ${scenario.color}`}>
              {scenario.icon}
            </div>
            <div>
              <h5 className="text-white font-semibold mb-1 group-hover:text-fuchsia-400 transition-colors">{scenario.title}</h5>
              <p className="text-xs text-slate-400 leading-relaxed">{scenario.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Roleplay Modal Overlay */}
      <AnimatePresence>
        {selectedScenario && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="absolute inset-0 bg-slate-900 z-10 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg text-white ${selectedScenario.color}`}>
                  {selectedScenario.icon}
                </div>
                <h4 className="text-white font-bold text-lg">{selectedScenario.title}</h4>
              </div>
              <button 
                onClick={() => setSelectedScenario(null)}
                className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center relative mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-fuchsia-500 border-t-transparent animate-spin"></div>
                <div className="w-20 h-20 bg-slate-800 rounded-full overflow-hidden flex items-center justify-center">
                   <Users className="w-8 h-8 text-fuchsia-400 opacity-50" />
                </div>
              </div>
              <h5 className="text-white font-bold text-xl mb-2">Connecting to AI Persona...</h5>
              <p className="text-slate-400 text-sm max-w-[250px] mx-auto">
                Setting up the {selectedScenario.title.toLowerCase()} environment and context.
              </p>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(192,38,211,0.4)]">
              <PlayCircle className="w-5 h-5" /> Start Roleplay
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
