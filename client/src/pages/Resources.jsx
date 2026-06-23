import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import { BookOpen, Video, Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Resources() {
  const materials = [
    {
      category: 'Fluency Guides',
      title: 'Common IELTS Part 1 Speaking Questions',
      description: 'Master the basic interview formats and learn structure formulas for perfect scores.',
      icon: <BookOpen className="text-violet-500 w-5 h-5" />,
      time: '5 min read'
    },
    {
      category: 'Pronunciation Hacks',
      title: 'Phonetic Sound Practice: The Silent R & L',
      description: 'Step-by-step physical tongue positioning maps and voice drills for tricky consonants.',
      icon: <Video className="text-pink-500 w-5 h-5" />,
      time: '12 min video'
    },
    {
      category: 'Vocabulary Building',
      title: '100 Power Adjectives for Professional Debates',
      description: 'Replace standard words like "good" or "bad" with high-impact executive level lexicon.',
      icon: <Award className="text-indigo-500 w-5 h-5" />,
      time: '8 min read'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
          Learning Resources & Material
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Supercharge your study time with professional guides, lexical sets, and practice materials created by expert linguists.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {materials.map((mat, idx) => (
          <motion.div
            key={mat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -6 }}
            className="cursor-pointer"
          >
            <GlassCard className="h-full flex flex-col justify-between p-6">
              <div>
                <span className="inline-block px-3 py-1 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-bold rounded-lg mb-4">
                  {mat.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">{mat.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{mat.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                <span className="text-xs font-medium text-slate-400">{mat.time}</span>
                <span className="flex items-center text-sm font-bold text-violet-600 dark:text-violet-400 hover:opacity-90">
                  Access <ChevronRight size={16} className="ml-0.5" />
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
