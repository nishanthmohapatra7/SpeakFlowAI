import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, Mic, BarChart2, CheckCircle } from 'lucide-react';
import GradientButton from '../components/ui/GradientButton';
import GlassCard from '../components/ui/GlassCard';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    {
      title: 'Real-time AI Conversation',
      description: 'Practice speaking with our advanced AI that understands context and gives natural responses.',
      icon: <Sparkles className="text-violet-500" />
    },
    {
      title: 'Pronunciation Feedback',
      description: 'Get detailed scoring on your pronunciation and learn exactly how to improve.',
      icon: <Mic className="text-purple-500" />
    },
    {
      title: 'Visual Progress Tracking',
      description: 'Watch your fluency improve with detailed analytics and vocabulary growth charts.',
      icon: <BarChart2 className="text-indigo-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-violet-50/50 dark:bg-[#0f0a1e]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-violet-100/50 to-transparent dark:from-violet-900/20 -z-10" />
        <div className="absolute -top-24 right-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-medium text-violet-700 bg-violet-100 rounded-full dark:bg-violet-900/30 dark:text-violet-300">
              <Sparkles size={16} className="mr-2" />
              Powered by Advanced AI
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Master English Speaking <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                With Your Personal AI
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Improve fluency and confidence through real-time feedback and natural conversations. 
              The most effective way to practice speaking, anytime, anywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <GradientButton className="!py-4 !px-10 text-lg flex items-center">
                  Start Practicing Now <Play size={20} className="ml-2 fill-current" />
                </GradientButton>
              </Link>
              <Link to="/features" className="px-10 py-4 font-semibold text-slate-700 dark:text-slate-300 hover:text-violet-600 transition-colors">
                How it works
              </Link>
            </div>
          </motion.div>
          
          {/* Dashboard Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="glass rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <div className="bg-slate-900/5 dark:bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>
              <div className="p-4 md:p-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl aspect-video relative flex items-center justify-center">
                 <div className="text-center">
                    <div className="w-20 h-20 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Mic className="text-white w-8 h-8" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium italic">"I'm listening... Tell me about your day."</p>
                 </div>
                 {/* Decorative elements */}
                 <div className="absolute top-10 left-10 p-4 glass rounded-xl shadow-lg transform -rotate-6">
                    <p className="text-xs font-bold text-violet-600 uppercase">Fluency Score</p>
                    <p className="text-2xl font-bold">8.5/10</p>
                 </div>
                 <div className="absolute bottom-10 right-10 p-4 glass rounded-xl shadow-lg transform rotate-6">
                    <p className="text-xs font-bold text-green-600 uppercase">Vocabulary</p>
                    <p className="text-sm">Excellent use of "significant"</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why practiced with SpeakFlow?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We combine cutting-edge speech recognition with large language models to provide a learning experience that's both effective and fun.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all shadow-sm hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl shadow-md flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 p-20 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
             <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6">Ready to improve your speaking skills?</h2>
                <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
                  Join thousands of learners who are already gaining confidence through AI-powered practice.
                </p>
                <Link to="/register">
                  <button className="bg-white text-violet-700 hover:bg-slate-100 px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
                    Create Free Account
                  </button>
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
