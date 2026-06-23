import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import { Mic, User, Flame, MessageSquare, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AICoach() {
  const coaches = [
    {
      name: 'Sophia',
      role: 'Accent & Fluency Expert',
      accent: 'American Accent (West Coast)',
      traits: ['Patient', 'Detail-oriented', 'Encouraging'],
      bg: 'from-violet-500/10 to-indigo-500/10'
    },
    {
      name: 'Liam',
      role: 'Business & Interview Prep Coach',
      accent: 'British Accent (London)',
      traits: ['Professional', 'Actionable advice', 'Structured sessions'],
      bg: 'from-blue-500/10 to-indigo-500/10'
    },
    {
      name: 'Chloe',
      role: 'Casual Chat Companion',
      accent: 'Australian Accent (Sydney)',
      traits: ['Energetic', 'Fun conversationalist', 'Slang guide'],
      bg: 'from-pink-500/10 to-purple-500/10'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
          Meet Your AI Coaches
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Choose a personal, custom-tailored companion to guide your pronunciation, grammar, and conversation confidence.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {coaches.map((coach, idx) => (
          <motion.div
            key={coach.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <GlassCard className="h-full flex flex-col justify-between p-8 relative overflow-hidden">
              {/* Radial background blur inside card */}
              <div className={`absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br ${coach.bg} rounded-full blur-2xl`} />
              
              <div>
                <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-md mb-6 border border-slate-100 dark:border-slate-800">
                  <User size={32} className="text-violet-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{coach.name}</h3>
                <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 mb-4">{coach.role}</p>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Accent</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{coach.accent}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Coaching Traits</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {coach.traits.map((trait) => (
                        <span key={trait} className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800/80 rounded-full font-medium text-slate-600 dark:text-slate-300">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <GradientButton className="w-full !py-3 flex items-center justify-center mt-2 group">
                Practice with {coach.name} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </GradientButton>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
