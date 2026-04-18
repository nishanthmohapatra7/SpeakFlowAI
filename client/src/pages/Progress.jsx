import React from 'react';
import { Target, TrendingUp, BarChart2, Zap, Brain, BookOpen } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PolarGrid, PolarAngleAxis, Radar, RadarChart } from 'recharts';

const Progress = () => {
    const skillData = [
        { subject: 'Fluency', A: 85, fullMark: 100 },
        { subject: 'Vocabulary', A: 70, fullMark: 100 },
        { subject: 'Pronunciation', A: 75, fullMark: 100 },
        { subject: 'Grammar', A: 65, fullMark: 100 },
        { subject: 'Confidence', A: 90, fullMark: 100 },
        { subject: 'Complexity', A: 60, fullMark: 100 },
    ];

    const categoryData = [
        { name: 'Business', level: 40 },
        { name: 'Travel', level: 85 },
        { name: 'Education', level: 60 },
        { name: 'Daily Life', level: 95 },
        { name: 'Technology', level: 30 },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8 flex items-center">
                <Target size={30} className="mr-3 text-blue-600" /> Detailed Progress Analysis
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Skill Radar Chart */}
                <GlassCard>
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                        <Zap size={20} className="mr-2 text-yellow-500" /> Skill Breakdown
                    </h2>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Radar
                                    name="Score"
                                    dataKey="A"
                                    stroke="#2563eb"
                                    fill="#2563eb"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Vocabulary Categories */}
                <GlassCard>
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                        <BookOpen size={20} className="mr-2 text-green-500" /> Vocabulary Mastery
                    </h2>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                <YAxis 
                                    dataKey="name" 
                                    type="category" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
                                />
                                <Tooltip 
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Bar dataKey="level" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            </div>

            {/* Insights Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Best Topic', val: 'Daily Life', icon: <TrendingUp className="text-green-500" />, desc: 'You speak most naturally about everyday topics.' },
                    { title: 'Goal for Week', val: 'Interview Prep', icon: <Target className="text-blue-500" />, desc: 'Focus on formal vocabulary and sentence structure.' },
                    { title: 'Vocabulary Gain', val: '+120 words', icon: <Brain className="text-purple-500" />, desc: 'You learned many new adjectives this week.' },
                ].map((insight, i) => (
                    <GlassCard key={i}>
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">{insight.icon}</div>
                            <span className="text-sm font-bold text-slate-500 uppercase">{insight.title}</span>
                        </div>
                        <p className="text-2xl font-bold mb-2">{insight.val}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{insight.desc}</p>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

export default Progress;
