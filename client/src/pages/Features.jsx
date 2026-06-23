import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { featuresData } from '../data/featuresData';
import { ArrowRight } from 'lucide-react';

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-transparent py-24 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-5%] w-[400px] h-[400px] bg-fuchsia-600/10 dark:bg-fuchsia-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-block px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm font-bold mb-6 tracking-widest uppercase shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            Everything You Need
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-violet-800 to-indigo-800 dark:from-white dark:via-violet-200 dark:to-indigo-200">
            Supercharged AI Learning Features
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Discover the cutting-edge technologies and conversational methodologies powering SpeakFlow AI. Built like a world-class language platform, designed just for your fluency.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {featuresData.map((item, idx) => (
            <motion.div
              key={item.slug}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group h-full"
            >
              <Link to={`/features/${item.slug}`} className="block h-full">
                <div className="h-full glass relative overflow-hidden p-8 rounded-3xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/50 dark:hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] dark:hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] flex flex-col z-10">
                  {/* Subtle inner gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-transparent group-hover:from-violet-500/5 dark:group-hover:from-violet-500/10 transition-colors duration-500 -z-10" />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl shadow-inner border border-white/50 dark:border-white/5">
                      {React.cloneElement(item.icon, { className: `${item.iconColorClass} w-7 h-7 group-hover:scale-110 transition-transform duration-300` })}
                    </div>
                    <ArrowRight className="text-violet-500/0 group-hover:text-violet-500 dark:group-hover:text-violet-400 w-6 h-6 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors duration-300 tracking-wide">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
