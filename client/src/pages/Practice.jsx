import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Mic, MicOff, Send, MessageSquare, Volume2, Activity, Play, StopCircle, 
  RefreshCw, ChevronLeft, Award, CheckCircle, Clock, BarChart2, Briefcase, 
  Globe, Cpu, Coffee, ArrowRight, Settings, Timer, HeartPulse, Smile, Target, Wind, Star
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import { motion, AnimatePresence } from 'framer-motion';

const Practice = () => {
  const { user } = useAuth();
  
  // Workflow States
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(''); 
  
  // Standard Mode States
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  
  // Stammer-Friendly States
  const [comfortLevel, setComfortLevel] = useState('');
  const [practiceGoal, setPracticeGoal] = useState('');
  
  // Common States
  const [duration, setDuration] = useState('');
  
  // Breathing States
  const [isBreathing, setIsBreathing] = useState(false);
  const [relaxationMode, setRelaxationMode] = useState(3);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathePhase, setBreathePhase] = useState('Inhale...');
  const [breatheCycleComplete, setBreatheCycleComplete] = useState(false);

  // Session States
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(0);
  const [inputText, setInputText] = useState('');

  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Scroll Refs for Smooth Reveal
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const step5Ref = useRef(null);

  const isStammerMode = mode === 'Stammer-Friendly';

  useEffect(() => {
    if (step === 2) setTimeout(() => step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    if (step === 3) setTimeout(() => step3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    if (step === 4) setTimeout(() => step4Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    if (step === 5) setTimeout(() => step5Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
  }, [step]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  // Timer Effect
  useEffect(() => {
    if (sessionActive && !feedback) {
      timerIntervalRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [sessionActive, feedback]);

  // Breathing Sequence Effect
  useEffect(() => {
    let timer;
    if (isBreathingActive && !breatheCycleComplete) {
      timer = setInterval(() => {
        setPhaseTimeLeft(prev => {
          if (prev > 1) return prev - 1;

          // Transition logic when timer hits 0
          if (breathePhase === 'Inhale...') {
            setBreathePhase('Hold...');
            return 4; // hold for 4s
          } else if (breathePhase === 'Hold...') {
            setBreathePhase('Exhale...');
            return 6; // exhale for 6s
          } else if (breathePhase === 'Exhale...') {
            if (currentCycle < relaxationMode) {
              setCurrentCycle(c => c + 1);
              setBreathePhase('Inhale...');
              return 4; // start next cycle inhale 4s
            } else {
              setBreatheCycleComplete(true);
              setIsBreathingActive(false);
              return 0;
            }
          }
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive, breathePhase, breatheCycleComplete, currentCycle, relaxationMode]);

  // Web Speech API Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            handleUserSpeech(event.results[i][0].transcript);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = () => {
    setStep(6);
    if (isStammerMode) {
      setIsBreathing(true);
      setBreatheCycleComplete(false);
      setIsBreathingActive(false);
    } else {
      enterChatSession();
    }
  };

  const startBreathingCycle = () => {
    setIsBreathingActive(true);
    setBreathePhase('Inhale...');
    setPhaseTimeLeft(4);
    setCurrentCycle(1);
    setBreatheCycleComplete(false);
  };

  const enterChatSession = () => {
    setIsBreathing(false);
    setSessionActive(true);
    setTimer(0);
    
    let greeting = '';
    
    if (isStammerMode) {
      greeting = `Hello! I'm here to support you with your goal of ${practiceGoal}. We have ${duration} minutes. Please take all the time you need to respond. I am listening.`;
    } else {
      greeting = `Hello! I'm your AI Coach. Ready for our ${difficulty} level ${mode} about ${topic} for ${duration} minutes? Let's begin.`;
      if (mode === 'Interview Talk') greeting = `Hello. Thank you for coming in today. Let's start the interview focusing on ${topic}. Can you tell me about your experience?`;
      if (mode === 'IELTS Talk') greeting = `Welcome to the IELTS Speaking Practice. We will be discussing ${topic}. Let's start. Can you tell me a little bit about your interest in this area?`;
    }
    
    setMessages([{ role: 'ai', text: greeting }]);
    speakText(greeting);
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleUserSpeech = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    generateAiResponse(text);
  };

  const handleSendText = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: inputText }]);
    generateAiResponse(inputText);
    setInputText('');
  };

  const generateAiResponse = async (userText) => {
    setIsAiTyping(true);
    setTimeout(() => {
      let aiResponse = '';
      if (isStammerMode) {
        aiResponse = `That's great. Take a deep breath and let's continue. Can you share a bit more about that at your own pace?`;
      } else {
        aiResponse = `That's very interesting! Can you tell me more about your thoughts on ${topic}? Also, try to use more descriptive words to improve your vocabulary score.`;
      }
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      setIsAiTyping(false);
      speakText(aiResponse);
    }, 1500);
  };

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const finishSession = () => {
    window.speechSynthesis.cancel();
    setSessionActive(false);
    
    if (isStammerMode) {
      setFeedback({
        score: 'N/A',
        fluency: 'Great',
        pronunciation: 'Clear',
        vocabulary: 'Excellent',
        suggestions: [
          "You maintained a calm and steady pace.",
          "Great job practicing your target goal.",
          "Remember that pausing is completely okay and natural."
        ]
      });
    } else {
      setFeedback({
        score: 7.5,
        fluency: 8.0,
        pronunciation: 7.0,
        vocabulary: 7.5,
        suggestions: [
          "You used 'nice' twice. Try 'pleasant' or 'delightful' instead.",
          "Work on your pronunciation of 'significant'.",
          "Try to pause less between sentences."
        ]
      });
    }
  };

  const resetWorkflow = () => {
    setStep(1);
    setMode('');
    setTopic('');
    setDifficulty('');
    setComfortLevel('');
    setPracticeGoal('');
    setDuration('');
    setFeedback(null);
    setSessionActive(false);
    setIsBreathing(false);
    setIsBreathingActive(false);
    setBreatheCycleComplete(false);
    setRelaxationMode(3);
    setMessages([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const revealVariants = {
    hidden: { opacity: 0, height: 0, y: 20 },
    visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const getStepperLabels = () => {
    if (isStammerMode) return ['Mode', 'Comfort', 'Goal', 'Time', 'Start'];
    return ['Mode', 'Topic', 'Level', 'Time', 'Start'];
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 min-h-[calc(100vh-80px)] flex flex-col">
      
      {/* Workflow Progress Indicator (Hide in Step 6 & Feedback) */}
      {step < 6 && !feedback && (
        <div className="mb-16 w-full max-w-3xl mx-auto px-4 md:px-8">
          <div className="relative flex justify-between items-center z-0">
            {/* Background Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 dark:bg-slate-800" />
            
            {/* Animated Progress Line */}
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.6)] origin-left" 
              initial={{ width: 0 }}
              animate={{ width: `${((step - 1) / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            
            {getStepperLabels().map((label, idx) => {
              const isCompleted = step > idx + 1;
              const isCurrent = step === idx + 1;

              return (
                <div key={label} className="relative flex flex-col items-center z-10">
                  <motion.div 
                    animate={{ scale: isCurrent ? 1.15 : 1 }}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm border-2 transition-all duration-300 ${
                      isCompleted || isCurrent
                      ? 'bg-violet-600 border-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
                      : 'bg-white dark:bg-[#0f0a1e] border-slate-300 dark:border-slate-700 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle size={16} className="md:w-5 md:h-5" /> : idx + 1}
                  </motion.div>
                  <span className={`absolute -bottom-8 text-[10px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                    isCurrent ? 'text-violet-600 dark:text-violet-400' : isCompleted ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step < 6 && !feedback ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16 pb-20">
            
            {/* Page Heading */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Select Practice Mode</h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Choose your speaking practice style and let AI guide you toward better fluency and confidence.
              </p>
            </div>

            {/* Step 1: Mode Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {[
                { title: 'Casual Talk', icon: <Coffee className="mb-4 text-violet-500 w-10 h-10" />, desc: 'Everyday conversations and small talk.' },
                { title: 'Interview Talk', icon: <Briefcase className="mb-4 text-indigo-500 w-10 h-10" />, desc: 'Job interview simulation with formal questions.' },
                { title: 'IELTS Talk', icon: <Globe className="mb-4 text-pink-500 w-10 h-10" />, desc: 'Structured practice for IELTS Speaking exam.' },
                { title: 'Stammer-Friendly', icon: <HeartPulse className="mb-4 text-orange-500 w-10 h-10" />, desc: 'Zero pressure zone with infinite patience.' }
              ].map((m) => (
                <button 
                  key={m.title}
                  onClick={() => { setMode(m.title); if(step < 2) setStep(2); }}
                  className={`p-8 rounded-3xl border-2 transition-all text-center flex flex-col items-center group ${
                    mode === m.title 
                    ? 'border-violet-500 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.15)] ring-2 ring-violet-400 ring-offset-2 dark:ring-offset-[#0f0a1e]' 
                    : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-violet-400/50'
                  } glass`}
                >
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {m.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">{m.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{m.desc}</p>
                </button>
              ))}
            </div>

            {/* Step 2: Topic OR Comfort Level */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div ref={step2Ref} variants={revealVariants} initial="hidden" animate="visible" className="overflow-hidden pt-4">
                  {isStammerMode ? (
                    <>
                      <h2 className="text-3xl font-extrabold mb-8 tracking-tight text-center">How comfortable are you feeling today?</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
                        {[
                          { level: 'Comfortable', emoji: '😊', msg: "That's great! Let's build on that positive energy." },
                          { level: 'Slightly Nervous', emoji: '😐', msg: "It's completely normal to feel a bit nervous. Take your time." },
                          { level: 'Very Nervous', emoji: '😟', msg: "I understand. This is a safe space. Breathe and go at your own pace." }
                        ].map((d) => (
                          <button 
                            key={d.level}
                            onClick={() => { setComfortLevel(d.level); if(step < 3) setStep(3); }}
                            className={`p-8 rounded-3xl border-2 transition-all text-center ${
                              comfortLevel === d.level 
                              ? 'border-violet-500 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.15)] ring-2 ring-violet-400 ring-offset-2 dark:ring-offset-[#0f0a1e]' 
                              : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-violet-400/50'
                            } glass flex flex-col items-center`}
                          >
                            <span className="text-5xl mb-4">{d.emoji}</span>
                            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">{d.level}</h3>
                            {comfortLevel === d.level && (
                              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-violet-600 dark:text-violet-400 font-medium mt-2">
                                {d.msg}
                              </motion.p>
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl font-extrabold mb-8 tracking-tight text-center">Choose a Topic</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                        {['Technology', 'Sports', 'Movies', 'Travel', 'College Life', 'Daily Conversation'].map((t) => (
                          <button 
                            key={t}
                            onClick={() => { setTopic(t); if(step < 3) setStep(3); }}
                            className={`p-6 rounded-2xl border-2 transition-all font-bold text-center ${
                              topic === t 
                              ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-2 ring-indigo-400 ring-offset-2 dark:ring-offset-[#0f0a1e]' 
                              : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:border-indigo-400/50'
                            } glass`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Difficulty OR Practice Goal */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div ref={step3Ref} variants={revealVariants} initial="hidden" animate="visible" className="overflow-hidden pt-4">
                  {isStammerMode ? (
                    <>
                      <h2 className="text-3xl font-extrabold mb-8 tracking-tight text-center">Select Your Practice Goal</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
                        {[
                          { title: 'Daily Conversation', icon: '💬' },
                          { title: 'Making New Friends', icon: '👥' },
                          { title: 'College Introduction', icon: '🏫' },
                          { title: 'Speaking Confidence', icon: '🎤' },
                          { title: 'Interview Confidence', icon: '💼' }
                        ].map((goal) => (
                          <button 
                            key={goal.title}
                            onClick={() => { setPracticeGoal(goal.title); if(step < 4) setStep(4); }}
                            className={`p-6 rounded-2xl border-2 transition-all font-bold flex flex-col items-center justify-center text-center ${
                              practiceGoal === goal.title 
                              ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.15)] ring-2 ring-violet-400 ring-offset-2 dark:ring-offset-[#0f0a1e]' 
                              : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:border-violet-400/50'
                            } glass`}
                          >
                            <span className="text-3xl mb-2">{goal.icon}</span>
                            <span>{goal.title}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl font-extrabold mb-8 tracking-tight text-center">Select Difficulty</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
                        {[
                          { level: 'Beginner', desc: 'Slower speech, simple vocabulary, more hints.' },
                          { level: 'Intermediate', desc: 'Natural pace, everyday vocabulary, moderate feedback.' },
                          { level: 'Advanced', desc: 'Native pace, complex vocabulary, strict evaluation.' }
                        ].map((d) => (
                          <button 
                            key={d.level}
                            onClick={() => { setDifficulty(d.level); if(step < 4) setStep(4); }}
                            className={`p-6 rounded-3xl border-2 transition-all text-left ${
                              difficulty === d.level 
                              ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] ring-2 ring-purple-400 ring-offset-2 dark:ring-offset-[#0f0a1e]' 
                              : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-purple-400/50'
                            } glass`}
                          >
                            <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">{d.level}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{d.desc}</p>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Duration Selection */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div ref={step4Ref} variants={revealVariants} initial="hidden" animate="visible" className="overflow-hidden pt-4">
                  <h2 className="text-3xl font-extrabold mb-8 tracking-tight text-center">Session Duration</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl mx-auto">
                    {[5, 10, 15].map((time) => (
                      <button 
                        key={time}
                        onClick={() => { setDuration(time); if(step < 5) setStep(5); }}
                        className={`p-6 rounded-3xl border-2 transition-all text-center ${
                          duration === time 
                          ? 'border-pink-500 bg-pink-500/10 shadow-[0_0_30px_rgba(236,72,153,0.15)] ring-2 ring-pink-400 ring-offset-2 dark:ring-offset-[#0f0a1e]' 
                          : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-pink-400/50'
                        } glass`}
                      >
                        <Timer className={`w-8 h-8 mx-auto mb-3 ${duration === time ? 'text-pink-500' : 'text-slate-400'}`} />
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{time} Min</h3>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 5: Summary & Start */}
            <AnimatePresence>
              {step >= 5 && (
                <motion.div ref={step5Ref} variants={revealVariants} initial="hidden" animate="visible" className="overflow-hidden pt-8 flex justify-center">
                  <GlassCard className="w-full max-w-xl p-8 md:p-10 text-center relative overflow-hidden border-violet-500/30">
                    <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none bg-violet-600/20" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none bg-indigo-600/20" />
                    
                    <h2 className="text-3xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white relative z-10">
                      {isStammerMode ? "Great! Let's practice at your own pace." : "Ready to Practice!"}
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-4 text-left mb-10 mt-8 relative z-10">
                      {isStammerMode ? (
                        <>
                          <div className="p-4 bg-white/40 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700 backdrop-blur-md">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1 flex items-center"><Smile size={12} className="mr-1 text-violet-500" /> Comfort</p>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{comfortLevel}</p>
                          </div>
                          <div className="p-4 bg-white/40 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700 backdrop-blur-md">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1 flex items-center"><Target size={12} className="mr-1 text-violet-500" /> Goal</p>
                            <p className="font-bold text-slate-800 dark:text-slate-200 truncate" title={practiceGoal}>{practiceGoal}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-4 bg-white/40 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700 backdrop-blur-md">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1 flex items-center"><Settings size={12} className="mr-1 text-violet-500" /> Mode</p>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{mode}</p>
                          </div>
                          <div className="p-4 bg-white/40 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700 backdrop-blur-md">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1 flex items-center"><MessageSquare size={12} className="mr-1 text-indigo-500" /> Topic</p>
                            <p className="font-bold text-slate-800 dark:text-slate-200 truncate" title={topic}>{topic}</p>
                          </div>
                          <div className="col-span-2 p-4 bg-white/40 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700 backdrop-blur-md">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1 flex items-center"><Activity size={12} className="mr-1 text-pink-500" /> Difficulty</p>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{difficulty}</p>
                          </div>
                        </>
                      )}
                      
                      <div className={`p-4 bg-white/40 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-700 backdrop-blur-md ${isStammerMode ? 'col-span-2' : ''}`}>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1 flex items-center"><Timer size={12} className="mr-1 text-pink-500" /> Duration</p>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{duration} Minutes</p>
                      </div>
                    </div>
                    
                    <GradientButton 
                      onClick={startSession} 
                      className="w-full py-5 text-xl font-bold flex justify-center items-center group shadow-xl from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-violet-500/20"
                    >
                      {isStammerMode ? "Start Supportive Session" : "Start Conversation"} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </GradientButton>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : step === 6 && isBreathing ? (
          /* Step 6: Breathing Exercise */
          <motion.div key="breathing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center py-10 w-full relative">
            <GlassCard className="w-full max-w-2xl p-12 text-center relative overflow-hidden border-violet-500/30">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-purple-600/10 pointer-events-none" />
              
              {!isBreathingActive && !breatheCycleComplete ? (
                /* Pre-breathing Selection */
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
                  <h2 className="text-3xl font-extrabold mb-2 tracking-tight text-slate-900 dark:text-white">
                    Let's Take a Calm Breath First
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-8">
                    Select a relaxation mode before entering the session.
                  </p>

                  <div className="space-y-4 max-w-md mx-auto mb-10 text-left">
                    {[
                      { cycles: 1, title: "Quick Relax", desc: "1 Cycle", isDefault: false },
                      { cycles: 3, title: "Standard Relax", desc: "3 Cycles", isDefault: true },
                      { cycles: 5, title: "Deep Relax", desc: "5 Cycles", isDefault: false }
                    ].map(opt => (
                      <button 
                        key={opt.cycles}
                        onClick={() => setRelaxationMode(opt.cycles)}
                        className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                          relaxationMode === opt.cycles 
                          ? 'border-violet-500 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.15)] ring-2 ring-violet-400 ring-offset-2 dark:ring-offset-[#0f0a1e]' 
                          : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-violet-400/50'
                        } glass`}
                      >
                        <div className="flex items-center">
                          {opt.isDefault && <Star className="w-5 h-5 text-yellow-400 mr-3" />}
                          {!opt.isDefault && <div className="w-5 h-5 mr-3 border-2 border-slate-400 rounded-full flex items-center justify-center">
                            {relaxationMode === opt.cycles && <div className="w-2.5 h-2.5 bg-violet-500 rounded-full" />}
                          </div>}
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-100">{opt.title}</span>
                            {opt.isDefault && <span className="ml-2 text-xs text-violet-500 font-bold bg-violet-500/10 px-2 py-0.5 rounded-full">(Recommended)</span>}
                          </div>
                        </div>
                        <span className="text-slate-500 font-medium text-sm">{opt.desc}</span>
                      </button>
                    ))}
                  </div>

                  <GradientButton onClick={startBreathingCycle} className="py-4 px-12 text-lg shadow-violet-500/20 from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                    Start Breathing
                  </GradientButton>
                </motion.div>
              ) : (
                /* Active Breathing or Completed State */
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
                  
                  {isBreathingActive && (
                    <div className="mb-8">
                      <div className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                        Cycle {currentCycle} of {relaxationMode}
                      </div>
                    </div>
                  )}

                  <div className="relative flex justify-center items-center h-64 w-64 mx-auto mb-10">
                    <motion.div 
                      animate={
                        breatheCycleComplete ? { scale: 1, opacity: 0.2 } :
                        breathePhase === 'Inhale...' ? { scale: 1.5, opacity: 0.8 } :
                        breathePhase === 'Hold...' ? { scale: 1.5, opacity: 0.8 } :
                        breathePhase === 'Exhale...' ? { scale: 1, opacity: 0.4 } :
                        { scale: 1, opacity: 0.2 }
                      }
                      transition={{ 
                        duration: breathePhase === 'Inhale...' ? 4 : breathePhase === 'Exhale...' ? 6 : 0.5, 
                        ease: "easeInOut" 
                      }}
                      className="w-32 h-32 rounded-full bg-violet-500/20 border border-violet-500/40 shadow-[0_0_40px_rgba(139,92,246,0.3)] flex items-center justify-center absolute"
                    />
                    <div className="w-24 h-24 bg-white/10 dark:bg-slate-900/50 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center shadow-inner z-20">
                      {breatheCycleComplete ? (
                        <Wind className="w-10 h-10 text-emerald-400" />
                      ) : (
                        <span className="text-4xl font-mono font-bold text-violet-300">{phaseTimeLeft}</span>
                      )}
                    </div>
                  </div>

                  <div className="h-28 flex flex-col justify-center">
                    {!breatheCycleComplete ? (
                      <motion.div key={breathePhase} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-3xl font-extrabold tracking-widest text-violet-600 dark:text-violet-400 uppercase mb-2">
                          {breathePhase}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <h3 className="text-2xl font-bold text-emerald-500 dark:text-emerald-400 mb-2">
                          ✨ Great Job!
                        </h3>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                          You've completed your breathing exercise. Take your time and speak at your own pace.
                        </p>
                        <GradientButton onClick={enterChatSession} className="py-4 px-10 text-lg shadow-violet-500/20 from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                          Begin Supportive Session <ArrowRight className="ml-2 inline-block" />
                        </GradientButton>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </GlassCard>

            {/* Floating Ambient Particles for Calming Effect */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -100, 0],
                    x: [0, Math.random() * 50 - 25, 0],
                    opacity: [0, 0.5, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 5
                  }}
                  className="absolute rounded-full bg-violet-400/20 blur-sm"
                  style={{
                    width: 10 + Math.random() * 20,
                    height: 10 + Math.random() * 20,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : step === 6 && !isBreathing && !feedback ? (
          /* Step 6: Interactive Interface */
          <motion.div key="chat-interface" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto h-[calc(100vh-140px)]">
            
            {/* AI Coach Panel (Sidebar) */}
            <div className="w-full md:w-80 flex flex-col gap-4">
              <GlassCard className="p-6 flex-shrink-0 relative overflow-hidden group border-violet-500/30">
                <div className="absolute inset-0 bg-gradient-to-br pointer-events-none from-violet-600/10 to-indigo-600/10" />
                <div className="flex items-center mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg mr-4 bg-violet-600 shadow-violet-500/30">
                    <Cpu className="text-white w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg">{isStammerMode ? 'Supportive AI' : 'AI Coach'}</h3>
                    <p className="text-xs text-green-500 font-medium flex items-center uppercase tracking-wider">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse" /> Active
                    </p>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center bg-white/50 dark:bg-slate-900/50 p-3 rounded-xl">
                    <span className="text-xs font-bold text-slate-500 uppercase">Time Elapsed</span>
                    <span className="font-mono font-bold flex items-center text-violet-600 dark:text-violet-400">
                      <Clock size={14} className="mr-1" /> {formatTime(timer)}
                    </span>
                  </div>
                  
                  {isStammerMode ? (
                     <div className="flex justify-between items-center bg-white/50 dark:bg-slate-900/50 p-3 rounded-xl">
                        <span className="text-xs font-bold text-slate-500 uppercase">Goal</span>
                        <span className="font-bold text-sm truncate max-w-[120px]" title={practiceGoal}>{practiceGoal}</span>
                     </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center bg-white/50 dark:bg-slate-900/50 p-3 rounded-xl">
                        <span className="text-xs font-bold text-slate-500 uppercase">Topic</span>
                        <span className="font-bold text-sm truncate max-w-[120px]" title={topic}>{topic}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/50 dark:bg-slate-900/50 p-3 rounded-xl">
                        <span className="text-xs font-bold text-slate-500 uppercase">Target</span>
                        <span className="font-bold text-sm">{duration} Min</span>
                      </div>
                    </>
                  )}
                </div>

                <button onClick={finishSession} className="mt-6 w-full py-3 rounded-xl border border-red-500/50 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0)] hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  End Session Early
                </button>
              </GlassCard>

              {/* Real-time metrics placeholder */}
              {!isStammerMode && (
                <GlassCard className="p-6 flex-1 hidden md:flex flex-col justify-center text-center opacity-70">
                  <BarChart2 className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-500">Real-time metrics active</p>
                  <p className="text-xs text-slate-400 mt-1">Fluency and vocabulary are being analyzed.</p>
                </GlassCard>
              )}
            </div>

            {/* Main Chat Interface */}
            <div className="flex-1 flex flex-col bg-white/80 dark:bg-[#160f2e]/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 dark:border-slate-800 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-b pointer-events-none from-transparent to-violet-900/5" />
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 scrollbar-thin scrollbar-thumb-slate-500/20 scrollbar-track-transparent">
                {messages.map((m, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    key={i} 
                    className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[85%] p-5 rounded-3xl ${
                      m.role === 'ai' 
                      ? 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-tl-sm border border-white/10 dark:border-slate-700' 
                      : 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-tr-sm shadow-xl shadow-violet-500/20'
                    }`}>
                      <p className="text-sm md:text-base leading-relaxed">{m.text}</p>
                    </div>
                  </motion.div>
                ))}
                
                {isAiTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100/90 dark:bg-slate-800/90 px-5 py-4 rounded-3xl rounded-tl-sm border border-white/10 dark:border-slate-700 inline-block">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full animate-bounce bg-violet-400" />
                        <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:0.2s] bg-indigo-400" />
                        <div className="w-2 h-2 rounded-full animate-bounce [animation-delay:0.4s] bg-purple-400" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-6 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-10">
                <div className="mb-4 min-h-[24px]">
                  <AnimatePresence>
                    {transcript && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="italic text-sm text-center font-medium text-violet-600 dark:text-violet-400"
                      >
                        "{transcript}..."
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <form onSubmit={handleSendText} className="flex items-center gap-3 w-full">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={isRecording ? "Listening..." : "Type your response or use the microphone..."}
                      className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full py-4 pl-6 pr-12 text-sm focus:outline-none focus:ring-1 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-violet-500 focus:ring-violet-500"
                    />
                    <button 
                      type="submit"
                      disabled={!inputText.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/30"
                    >
                      <Send size={18} />
                    </button>
                  </div>

                  <button 
                    type="button"
                    onClick={toggleRecording}
                    className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                      isRecording 
                      ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-105' 
                      : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105 shadow-lg shadow-violet-500/30'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isRecording ? (
                        <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <StopCircle className="text-white w-6 h-6" />
                        </motion.div>
                      ) : (
                        <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Mic className="text-white w-6 h-6" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* Feedback Section */}
        {feedback && (
          <motion.div key="feedback" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center py-10 w-full">
            <GlassCard className="w-full max-w-4xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="text-center mb-12">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30 relative">
                  <Award className="text-white w-12 h-12" />
                  <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-ping" />
                </div>
                <h2 className="text-4xl font-extrabold mb-2">Session Complete!</h2>
                <p className="text-slate-500 text-lg">You practiced for {formatTime(timer)}. Here is your detailed analysis.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {[
                  { label: isStammerMode ? 'Comfort' : 'Overall Score', val: feedback.score, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10' },
                  { label: 'Fluency', val: feedback.fluency, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
                  { label: 'Pronunciation', val: feedback.pronunciation, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
                  { label: 'Vocabulary', val: feedback.vocabulary, color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-500/10' }
                ].map(s => (
                  <div key={s.label} className={`${s.bg} p-6 rounded-3xl text-center border border-white/50 dark:border-white/5`}>
                    <p className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">{s.label}</p>
                    <p className={`text-4xl font-extrabold ${s.color}`}>{s.val}</p>
                    {s.val !== 'N/A' && !isNaN(s.val) && <p className="text-xs text-slate-400 mt-1">out of 10</p>}
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 mb-12">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <MessageSquare className="mr-3 text-violet-500" /> 
                  {isStammerMode ? 'Supportive Notes' : 'Improvement Suggestions'}
                </h3>
                <ul className="space-y-4">
                  {feedback.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start text-slate-700 dark:text-slate-300">
                      <CheckCircle size={20} className="text-emerald-500 mr-4 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <GradientButton onClick={resetWorkflow} className="py-4 px-10 text-lg">
                  Start New Session
                </GradientButton>
                <button className="py-4 px-10 rounded-full border-2 border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-lg">
                  View Full Transcript
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Practice;
