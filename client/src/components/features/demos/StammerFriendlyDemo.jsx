import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, Mic, Wind, ShieldCheck, ChevronLeft, ChevronRight, 
  Smile, Coffee, Globe, MessageSquare, Award, Star, CheckCircle 
} from 'lucide-react';

export default function StammerFriendlyDemo() {
  const [step, setStep] = useState(1);
  const [breathePhase, setBreathePhase] = useState('Inhale');
  const [comfortLevel, setComfortLevel] = useState('');
  const [topic, setTopic] = useState('');
  const [messages, setMessages] = useState([]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Breathing Animation
  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setBreathePhase(prev => prev === 'Inhale' ? 'Exhale' : 'Inhale');
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Simulated Conversation
  useEffect(() => {
    if (step === 5 && messages.length === 0) {
      setMessages([{ role: 'ai', text: `Hi! We're talking about ${topic} today. Take all the time you need, I'm listening.` }]);
    }
  }, [step, topic, messages.length]);

  const simulateUserSpeech = () => {
    if (messages.length === 1) {
      setMessages(prev => [...prev, { role: 'user', text: "I... I really like... traveling." }]);
      setIsAiTyping(true);
      setTimeout(() => {
        setIsAiTyping(false);
        setMessages(prev => [...prev, { role: 'ai', text: "That's wonderful! Traveling is a great experience. What's your favorite destination?" }]);
      }, 2500);
    }
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 7));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));
  const resetDemo = () => {
    setStep(1);
    setComfortLevel('');
    setTopic('');
    setMessages([]);
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col">
      
      {/* Header & Progress Indicator */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-xl border border-orange-500/30">
            <HeartPulse className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h4 className="text-white font-bold">Stammer-Friendly</h4>
            <div className="flex items-center gap-1 mt-0.5">
              {[1, 2, 3, 4, 5, 6, 7].map(s => (
                <div key={s} className={`h-1 rounded-full transition-all duration-300 ${s <= step ? 'w-4 bg-orange-500' : 'w-2 bg-slate-700'}`} />
              ))}
            </div>
          </div>
        </div>
        
        {step > 1 && step < 7 && (
          <button onClick={handlePrev} className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors">
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Dynamic Content Area */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          
          {/* Step 1: Welcome */}
          {step === 1 && (
            <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full justify-center">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Zero Pressure Zone</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Welcome to a safe space. The AI has infinite patience and will never interrupt or rush you while speaking.
                </p>
              </div>
              <button onClick={handleNext} className="w-full py-4 mt-auto bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(234,88,12,0.4)]">
                Start Session
              </button>
            </motion.div>
          )}

          {/* Step 2: Breathing Exercise */}
          {step === 2 && (
            <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full justify-center items-center text-center">
              <h3 className="text-xl font-bold text-white mb-2">Let's Relax First</h3>
              <p className="text-slate-400 text-sm mb-12">Follow the rhythm to calm your nerves.</p>
              
              <div className="relative mb-12 flex justify-center items-center h-32 w-32">
                <motion.div 
                  animate={{ scale: breathePhase === 'Inhale' ? 1.5 : 1 }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.2)]"
                >
                  <Wind className="w-8 h-8 text-orange-400" />
                </motion.div>
              </div>
              
              <p className="text-orange-400 font-bold tracking-widest uppercase mb-10 h-6">
                {breathePhase}...
              </p>

              <button onClick={handleNext} className="w-full py-3 border-2 border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                I'm ready
              </button>
            </motion.div>
          )}

          {/* Step 3: Comfort Level */}
          {step === 3 && (
            <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full justify-center">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Select Pace</h3>
              <div className="space-y-3">
                {[
                  { id: 'slow', title: 'Take it slow', desc: 'Extra time, more hints', icon: <Smile className="text-emerald-400 w-5 h-5" /> },
                  { id: 'normal', title: 'Normal Pace', desc: 'Standard conversational flow', icon: <Coffee className="text-blue-400 w-5 h-5" /> }
                ].map(lvl => (
                  <button 
                    key={lvl.id}
                    onClick={() => setComfortLevel(lvl.title)}
                    className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${comfortLevel === lvl.title ? 'bg-orange-500/10 border-orange-500' : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'}`}
                  >
                    <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">{lvl.icon}</div>
                    <div className="text-left">
                      <p className="font-bold text-white">{lvl.title}</p>
                      <p className="text-xs text-slate-400">{lvl.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button 
                disabled={!comfortLevel}
                onClick={handleNext} 
                className="w-full py-3 mt-8 bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl transition-colors"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Step 4: Topic Selection */}
          {step === 4 && (
            <motion.div key="step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full justify-center">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Low-Stress Topics</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Hobbies', 'Favorite Food', 'Pets', 'Movies', 'Travel', 'Music'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`py-4 px-2 rounded-xl text-sm font-bold border transition-all ${topic === t ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button 
                disabled={!topic}
                onClick={handleNext} 
                className="w-full py-3 mt-8 bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl transition-colors flex justify-center items-center gap-2"
              >
                Start Chat <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {/* Step 5: AI Conversation */}
          {step === 5 && (
            <motion.div key="step5" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full">
              <div className="flex-1 bg-slate-950/50 rounded-2xl border border-white/5 p-4 overflow-y-auto mb-4 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'ai' ? 'bg-slate-800 text-slate-200 rounded-tl-sm' : 'bg-orange-600 text-white rounded-tr-sm'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isAiTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 px-3 py-2 rounded-2xl rounded-tl-sm flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={simulateUserSpeech}
                  disabled={messages.length > 1}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center gap-2 text-white font-bold transition-colors disabled:opacity-50"
                >
                  <Mic size={18} className="text-orange-400" /> Speak
                </button>
                <button 
                  onClick={handleNext} 
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold transition-colors"
                >
                  Finish
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 6: Confidence Report */}
          {step === 6 && (
            <motion.div key="step6" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full justify-center">
              <div className="text-center mb-6">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-white">Great Job!</h3>
                <p className="text-slate-400 text-sm">You spoke with confidence.</p>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 space-y-4 mb-8">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300 font-bold">Uninterrupted Flow</span>
                    <span className="text-emerald-400 font-bold">85%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[85%] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300 font-bold">Pacing</span>
                    <span className="text-blue-400 font-bold">Excellent</span>
                  </div>
                  <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[90%] rounded-full" />
                  </div>
                </div>
              </div>

              <button onClick={handleNext} className="w-full py-4 mt-auto bg-orange-600 text-white font-bold rounded-xl transition-colors">
                View Practiced Words
              </button>
            </motion.div>
          )}

          {/* Step 7: Words Practiced Successfully */}
          {step === 7 && (
            <motion.div key="step7" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full justify-center">
              <h3 className="text-xl font-bold text-white mb-2 text-center">Words Mastered</h3>
              <p className="text-slate-400 text-sm text-center mb-6">Words you navigated successfully today.</p>
              
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {['Traveling', 'Destination', 'Experience', 'Actually'].map(w => (
                  <div key={w} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-sm font-bold text-emerald-200">{w}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl mb-8 flex gap-3">
                <Star className="w-8 h-8 text-orange-400 flex-shrink-0" />
                <p className="text-sm text-orange-200">Consistent practice in this safe zone significantly reduces speech anxiety.</p>
              </div>

              <button onClick={resetDemo} className="w-full py-3 border-2 border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                Reset Demo
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
