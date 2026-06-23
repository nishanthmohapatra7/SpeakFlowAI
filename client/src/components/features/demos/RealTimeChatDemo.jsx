import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Send, Volume2, User, Settings2 } from 'lucide-react';

export default function RealTimeChatDemo() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your AI speaking coach. What would you like to talk about today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [topic, setTopic] = useState('Casual Conversation');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: "That sounds interesting! Let's explore that topic further. How does it make you feel?" }]);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/5 dark:bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
      
      {/* Header */}
      <div className="bg-violet-600/20 p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center">
              <Volume2 className="text-white w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">AI Coach Sophia</h4>
            <p className="text-xs text-violet-300">Online • Listening</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300">
          <Settings2 className="w-5 h-5" />
        </button>
      </div>

      {/* Topic Selector */}
      <div className="px-4 py-2 bg-black/20 border-b border-white/5 flex items-center gap-2">
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Topic:</span>
        <select 
          className="bg-transparent text-sm text-violet-300 focus:outline-none cursor-pointer appearance-none font-medium"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="Casual Conversation">Casual Conversation</option>
          <option value="Job Interview">Job Interview</option>
          <option value="Ordering Food">Ordering Food</option>
          <option value="Travel Phrases">Travel Phrases</option>
        </select>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 no-scrollbar">
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`max-w-[85%] flex gap-2 ${msg.role === 'ai' ? 'self-start' : 'self-end flex-row-reverse'}`}
          >
            {msg.role === 'ai' && (
              <div className="w-6 h-6 rounded-full bg-violet-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                <Volume2 className="w-3 h-3 text-white" />
              </div>
            )}
            <div className={`p-3 rounded-2xl text-sm shadow-md ${msg.role === 'ai' ? 'bg-slate-800/80 text-slate-200 rounded-tl-sm border border-white/5' : 'bg-violet-600 text-white rounded-tr-sm'}`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="self-start flex gap-2 max-w-[85%]"
          >
             <div className="w-6 h-6 rounded-full bg-violet-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                <Volume2 className="w-3 h-3 text-white" />
              </div>
            <div className="bg-slate-800/80 text-slate-400 p-3 rounded-2xl rounded-tl-sm text-xs flex items-center gap-1 border border-white/5">
              <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-slate-900 border-t border-white/10 flex items-center gap-2">
        <button className="p-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition-colors flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:shadow-[0_0_20px_rgba(244,63,94,0.6)] group">
          <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        <div className="flex-1 relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type or speak a response..."
            className="w-full bg-slate-800 border border-slate-700 rounded-full pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors"
          />
          <button 
            onClick={handleSend} 
            disabled={!input.trim()}
            className="absolute right-1 top-1 bottom-1 w-8 flex items-center justify-center text-violet-400 hover:text-violet-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
