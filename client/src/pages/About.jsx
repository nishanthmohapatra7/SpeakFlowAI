import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import { ShieldAlert, Users, Award, BookOpen, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const pillars = [
    {
      title: 'Judgement-Free Learning',
      description: 'We believe confidence is the key to fluency. SpeakFlow AI provides a completely safe, secure environment for learners to make mistakes and grow.',
      icon: <Users className="text-violet-500 w-5 h-5" />
    },
    {
      title: 'Advanced AI Alignment',
      description: 'Leveraging cutting-edge large language models and precise phonetic analyzers to ensure you receive instant, actionable accent feedback.',
      icon: <Award className="text-pink-500 w-5 h-5" />
    },
    {
      title: 'Global Accessibility',
      description: 'Democratizing high-quality English education worldwide. Practice premium speech coaching anytime, anywhere, at a fraction of standard costs.',
      icon: <Globe className="text-indigo-500 w-5 h-5" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
          Our Vision & Mission
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          At SpeakFlow AI, our goal is to empower learners worldwide to speak with complete confidence and professional fluency.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((pillar, idx) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
          >
            <GlassCard className="h-full p-8 flex flex-col items-start">
              <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl mb-6 shadow-sm">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{pillar.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
