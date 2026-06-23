import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-image.png';
import gsap from 'gsap';
import { Play, Sparkles, Mic, BarChart2, CheckCircle } from 'lucide-react';
import GradientButton from '../components/ui/GradientButton';
import GlassCard from '../components/ui/GlassCard';
import { motion } from 'framer-motion';

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const elements = heroRef.current.querySelectorAll('.floating-el');
    
    const ctx = gsap.context(() => {
      elements.forEach((el, index) => {
        gsap.to(el, {
          y: () => gsap.utils.random(-40, 40),
          x: () => gsap.utils.random(-40, 40),
          rotation: () => gsap.utils.random(-45, 45),
          duration: gsap.utils.random(5, 10),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);
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
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-violet-100/50 to-transparent dark:from-violet-900/20 -z-10" />
        <div className="absolute -top-24 right-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl -z-10" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="floating-el absolute top-[15%] left-[10%] w-16 h-16 rounded-full border-[3px] border-violet-400/20 dark:border-violet-500/10" />
          <div className="floating-el absolute top-[35%] right-[12%] w-12 h-12 rounded-2xl bg-indigo-400/10 dark:bg-indigo-500/10 transform rotate-12 backdrop-blur-sm border border-white/10" />
          <div className="floating-el absolute bottom-[25%] left-[18%] w-24 h-24 rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-400/10 blur-xl" />
          <div className="floating-el absolute top-[25%] right-[28%] w-8 h-8 rounded-full border border-pink-400/30 dark:border-pink-500/10" />
          <div className="floating-el absolute bottom-[15%] right-[25%] w-14 h-14 rounded-xl bg-violet-400/10 dark:bg-violet-500/5 backdrop-blur-md border border-white/5 transform -rotate-12" />
          <div className="floating-el absolute top-[50%] left-[8%] text-purple-400/20 dark:text-purple-500/10"><Sparkles size={48} /></div>
          <div className="floating-el absolute top-[65%] right-[8%] text-indigo-400/20 dark:text-indigo-500/10"><Mic size={40} /></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left text-center md:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight flex flex-col gap-1 sm:gap-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 dark:from-violet-400 dark:via-indigo-300 dark:to-purple-450 pb-2 -mb-2">
                  Speak English <span className="inline-block w-3 md:w-5"></span> Confidently
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-300 dark:via-purple-400 dark:to-pink-400 pb-2 -mb-2">
                  With AI
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                Improve fluency and confidence through real-time feedback and natural conversations. 
                The most effective way to practice speaking, anytime, anywhere.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Link to="/register">
                  <button className="bg-transparent border-2 border-violet-600/30 dark:border-violet-400/30 text-violet-700 dark:text-violet-300 font-semibold rounded-full py-4 px-10 text-lg flex items-center transition-all hover:bg-violet-50 dark:hover:bg-violet-900/20 active:scale-95 btn-glow">
                    Start Practicing Now <Play size={20} className="ml-2 fill-current" />
                  </button>
                </Link>
                <Link to="/features" className="px-10 py-4 font-semibold text-slate-700 dark:text-slate-300 hover:text-violet-600 transition-colors">
                  How it works
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-12 md:mt-0 flex justify-center md:justify-end"
            >
              <div className="relative w-full max-w-lg h-[500px] flex items-center justify-center">
                
                {/* Glowing Background Orbs */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-violet-600/40 rounded-full blur-[100px] mix-blend-screen"
                />
                <motion.div 
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-10 -right-10 w-64 h-64 bg-pink-500/30 rounded-full blur-[80px] mix-blend-screen"
                />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-[90px] mix-blend-screen"
                />

                {/* Sound Wave Rings */}
                <motion.div 
                  animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                  className="absolute w-64 h-64 border border-violet-400/30 rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
                  className="absolute w-64 h-64 border border-fuchsia-400/20 rounded-full"
                />

                {/* Floating Particles */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -100 - Math.random() * 100], 
                      x: Math.random() * 100 - 50,
                      opacity: [0, 0.8, 0],
                      scale: [0, Math.random() + 0.5, 0]
                    }}
                    transition={{ 
                      duration: Math.random() * 3 + 2, 
                      repeat: Infinity, 
                      delay: Math.random() * 5,
                      ease: "linear"
                    }}
                    className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    style={{ 
                      left: `${30 + Math.random() * 40}%`, 
                      bottom: `${20 + Math.random() * 20}%` 
                    }}
                  />
                ))}

                {/* Floating Microphone Image */}
                <motion.div
                  animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-[110%] md:w-[130%]"
                >
                  <img 
                    src={heroImage} 
                    alt="Communication Skills AI Coach" 
                    className="w-full h-auto object-cover mix-blend-lighten opacity-90 contrast-125 brightness-110"
                    style={{
                      WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
                      maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)'
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
          
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
                 {/* Left Side Metrics */}
                 <div className="absolute top-10 left-4 md:left-10 flex flex-col gap-4">
                    <div className="p-3 md:p-4 glass rounded-xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform hover:scale-105">
                       <p className="text-[10px] md:text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-0.5">Fluency Score</p>
                       <p className="text-xl md:text-2xl font-bold">8.5/10</p>
                    </div>
                    <div className="p-3 md:p-4 glass rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform hover:scale-105 ml-2 md:ml-6">
                       <p className="text-[10px] md:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">Pronunciation</p>
                       <p className="text-xl md:text-2xl font-bold">92%</p>
                    </div>
                    <div className="p-3 md:p-4 glass rounded-xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform hover:scale-105">
                       <p className="text-[10px] md:text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-0.5">Confidence</p>
                       <p className="text-xl md:text-2xl font-bold">High</p>
                    </div>
                 </div>
                 <div className="absolute bottom-10 right-10 p-4 glass rounded-xl shadow-lg transform rotate-6">
                    <p className="text-xs font-bold text-green-600 uppercase">Vocabulary</p>
                    <p className="text-sm">Excellent use of "significant"</p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section / Hovering Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10"
          >
            {[
              { value: '10,000+', label: 'Active Learners', color: 'from-blue-500 to-cyan-500' },
              { value: '50,000+', label: 'Practice Sessions', color: 'from-violet-500 to-purple-500' },
              { value: '1M+', label: 'Words Spoken', color: 'from-pink-500 to-rose-500' },
              { value: '95%', label: 'Improvement Rate', color: 'from-emerald-500 to-teal-500' },
            ].map((stat, idx) => (
              <div key={idx} className="glass p-6 rounded-2xl text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/20 group cursor-default">
                <h3 className={`text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
              Why Practice with{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
                SpeakFlow?
              </span>
            </h2>
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
                <h2 className="text-4xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-100 to-slate-100">
                  Ready to improve your speaking skills?
                </h2>
                <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
                  Join thousands of learners who are already gaining confidence through AI-powered practice.
                </p>
                <Link to="/register">
                  <button className="bg-white text-violet-700 hover:bg-slate-100 px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 btn-glow-white">
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
