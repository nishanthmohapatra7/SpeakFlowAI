import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mic, MicOff, Send, MessageSquare, Volume2, Activity, Play, StopCircle, RefreshCw, ChevronLeft, Award, CheckCircle } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import { motion, AnimatePresence } from 'framer-motion';

const Practice = () => {
  const { user } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your English speaking partner. What would you like to talk about today? We can discuss your hobbies, a recent trip, or even practice for an interview." }
  ]);
  const [mode, setMode] = useState('Casual'); // Casual, Interview, IELTS
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

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

  const startSession = () => {
    setSessionActive(true);
    // AI Greeting based on mode
    let greeting = "Hello! Ready for some casual practice?";
    if (mode === 'Interview') greeting = "Hello. Thank you for coming in today. Let's start the interview. Can you tell me about yourself?";
    if (mode === 'IELTS') greeting = "Welcome to the IELTS Speaking Practice. This is Part 1. I'll ask you some general questions. Let's start. Where are you from?";
    
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

  const generateAiResponse = async (userText) => {
    setIsAiTyping(true);
    
    // Simulate AI thinking and response
    // In a real app, this would be an API call to the backend
    setTimeout(() => {
      const aiResponse = "That's very interesting! Can you tell me more about that? Also, try to use more descriptive words to improve your vocabulary score.";
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      setIsAiTyping(false);
      speakText(aiResponse);
    }, 1500);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const finishSession = () => {
      setSessionActive(false);
      setFeedback({
          score: 7.5,
          fluency: 8.0,
          pronunciation: 7.0,
          vocabulary: 7.5,
          fillerWords: ['um', 'uh', 'like'],
          suggestions: [
              "You used 'nice' twice. Try 'pleasant' or 'delightful' instead.",
              "Work on your pronunciation of 'significant'.",
              "Try to pause less between sentences."
          ]
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 min-h-[calc(100vh-80px)] flex flex-col">
       {!sessionActive && !feedback ? (
           <div className="flex-1 flex flex-col items-center justify-center text-center">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   <h2 className="text-4xl font-bold mb-6">Choose Your Practice Mode</h2>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                       {['Casual', 'Interview', 'IELTS'].map((m) => (
                           <button 
                            key={m}
                            onClick={() => setMode(m)}
                            className={`p-8 rounded-2xl border-2 transition-all text-left ${mode === m ? 'border-violet-600 bg-violet-50 dark:bg-violet-900/20' : 'border-slate-200 dark:border-slate-800'}`}
                           >
                               <h3 className="text-xl font-bold mb-2">{m} Talk</h3>
                               <p className="text-sm text-slate-600 dark:text-slate-400">
                                   {m === 'Casual' && 'Everyday conversations and small talk.'}
                                   {m === 'Interview' && 'Job interview simulation with formal questions.'}
                                   {m === 'IELTS' && 'Structured practice for IELTS Speaking exam.'}
                               </p>
                           </button>
                       ))}
                   </div>
                   <GradientButton onClick={startSession} className="mt-12 !py-4 !px-12 text-lg">
                       Begin Session
                   </GradientButton>
               </motion.div>
           </div>
       ) : feedback ? (
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <GlassCard className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="text-green-600 w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold">Session Complete!</h2>
                        <p className="text-slate-600">Great job today. Here's your feedback:</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {[
                            { label: 'Overall', val: feedback.score, color: 'text-violet-600' },
                            { label: 'Fluency', val: feedback.fluency, color: 'text-purple-600' },
                            { label: 'Pronunciation', val: feedback.pronunciation, color: 'text-indigo-600' },
                            { label: 'Vocabulary', val: feedback.vocabulary, color: 'text-emerald-600' }
                        ].map(s => (
                            <div key={s.label} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-700">
                                <p className="text-xs font-bold uppercase text-slate-500 mb-1">{s.label}</p>
                                <p className={`text-2xl font-bold ${s.color}`}>{s.val}/10</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold mb-3 flex items-center"><MessageSquare size={18} className="mr-2" /> Improvement Suggestions</h3>
                            <ul className="space-y-2">
                                {feedback.suggestions.map((s, i) => (
                                    <li key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                                        <CheckCircle size={16} className="text-violet-500 mr-2 mt-0.5 flex-shrink-0" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <GradientButton className="flex-1" onClick={() => setFeedback(null)}>Practice Again</GradientButton>
                        <button className="flex-1 py-3 px-6 rounded-full border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            View Saved Transcript
                        </button>
                    </div>
                </GlassCard>
           </motion.div>
       ) : (
           <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
               {/* Chat Header */}
               <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                           <Activity className="text-blue-600 w-5 h-5 animate-pulse" />
                       </div>
                       <div>
                           <p className="font-bold">{mode} Mode</p>
                           <p className="text-xs text-green-500 font-medium flex items-center">
                               <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                               AI Speaking Partner
                           </p>
                       </div>
                   </div>
                   <button onClick={finishSession} className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors">
                       Finish Session
                   </button>
               </div>

               {/* Chat Messages */}
               <div className="flex-1 overflow-y-auto p-6 space-y-4">
                   {messages.map((m, i) => (
                       <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i} 
                        className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                       >
                           <div className={`max-w-[80%] p-4 rounded-2xl ${
                               m.role === 'ai' 
                               ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none' 
                               : 'bg-violet-600 text-white rounded-tr-none shadow-md shadow-violet-500/20'
                           }`}>
                               <p className="text-sm md:text-base">{m.text}</p>
                           </div>
                       </motion.div>
                   ))}
                   {isAiTyping && (
                       <div className="flex justify-start">
                           <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none">
                               <div className="flex space-x-1">
                                   <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                                   <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                   <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                               </div>
                           </div>
                       </div>
                   )}
                   <div ref={chatEndRef} />
               </div>

               {/* Controls Area */}
               <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                   <div className="mb-4">
                       <AnimatePresence>
                           {transcript && (
                               <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-slate-400 italic text-sm mb-2 text-center"
                               >
                                   "{transcript}..."
                               </motion.div>
                           )}
                       </AnimatePresence>
                   </div>
                   
                   <div className="flex items-center justify-center space-x-6">
                       <button 
                        onClick={toggleRecording}
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                            isRecording 
                            ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30' 
                            : 'bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-500/30'
                        }`}
                       >
                           <AnimatePresence mode="wait">
                               {isRecording ? (
                                   <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                       <MicOff className="text-white w-8 h-8" />
                                   </motion.div>
                               ) : (
                                   <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                       <Mic className="text-white w-8 h-8" />
                                   </motion.div>
                               )}
                           </AnimatePresence>
                           {isRecording && (
                               <div className="absolute w-20 h-20 rounded-full border-4 border-red-500 animate-ping opacity-20" />
                           )}
                       </button>

                       <button className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100">
                           <RefreshCw size={20} />
                       </button>
                   </div>
                   <p className="text-center mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                       {isRecording ? 'Listening...' : 'Tap to speak'}
                   </p>
               </div>
           </div>
       )}
    </div>
  );
};

export default Practice;
