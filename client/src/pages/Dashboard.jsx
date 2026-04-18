import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Play, TrendingUp, History, Clock, Award, Star, BarChart2 } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const data = [
    { name: 'Mon', score: 6.5 },
    { name: 'Tue', score: 6.8 },
    { name: 'Wed', score: 7.2 },
    { name: 'Thu', score: 7.0 },
    { name: 'Fri', score: 7.8 },
    { name: 'Sat', score: 8.2 },
    { name: 'Sun', score: 8.5 },
  ];

  const recentSessions = [
    { mode: 'Casual Talk', date: '2 hours ago', score: 8.5, duration: '12 min' },
    { mode: 'Interview Mock', date: 'Yesterday', score: 7.8, duration: '25 min' },
    { mode: 'IELTS Part 1', date: '3 days ago', score: 7.2, duration: '15 min' },
  ];

  const stats = [
    { label: 'Avg Score', value: '7.8', icon: <Star className="text-yellow-500" /> },
    { label: 'Practice Time', value: '14h', icon: <Clock className="text-violet-500" /> },
    { label: 'Sessions', value: '24', icon: <History className="text-purple-500" /> },
    { label: 'Fluency', value: 'B2', icon: <TrendingUp className="text-green-500" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, {user?.username || 'Learner'}! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Your English is getting better every day. Keep it up!</p>
        </div>
        <Link to="/practice">
          <GradientButton className="!py-4 !px-8 flex items-center">
            <Play size={20} className="mr-2 fill-current" /> Start New Practice
          </GradientButton>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl shadow-sm flex items-center justify-center">
                {s.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">{s.label}</p>
                <p className="text-2xl font-bold dark:text-white">{s.value}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Graph */}
        <div className="lg:col-span-2">
           <GlassCard className="h-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold flex items-center">
                  <BarChart2 size={20} className="mr-2 text-violet-600" /> Speaking Score Progress
                </h2>
                <select className="bg-slate-50 dark:bg-slate-800 border-none text-sm font-medium rounded-lg px-3 py-1 outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 12 }} 
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 12 }} 
                        domain={[0, 10]}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: isDark ? '#0f172a' : 'rgba(255, 255, 255, 0.8)', 
                            borderRadius: '12px', 
                            border: 'none',
                            color: isDark ? '#f1f5f9' : '#1e293b',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                        }}
                        itemStyle={{ color: isDark ? '#a78bfa' : '#7c3aed' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </GlassCard>
        </div>

        {/* Recent Sessions */}
        <div>
          <GlassCard className="h-full">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <History size={20} className="mr-2 text-indigo-600" /> Recent Sessions
            </h2>
            <div className="space-y-4">
              {recentSessions.map((session, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div>
                    <p className="font-bold text-sm block">{session.mode}</p>
                    <p className="text-xs text-slate-500">{session.date} • {session.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-violet-600">{session.score}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Score</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-sm font-bold text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-xl transition-colors">
              View All Sessions
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
