import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Play } from 'lucide-react';
import { featuresData } from '../data/featuresData';
import {
  RealTimeChatDemo,
  PronunciationDemo,
  AnalyticsDashboardDemo,
  SpeechCorrectionDemo,
  SpeakingCoachDemo,
  RoleplayDemo,
  FluencyScoreDemo,
  VocabularyBuilderDemo,
  SpeechPlaybackDemo,
  AccentTrainingDemo,
  StammerFriendlyDemo,
  FillerWordDemo
} from '../components/features/demos';

const DemoRenderer = ({ slug }) => {
  switch (slug) {
    case 'real-time-ai-conversation': return <RealTimeChatDemo />;
    case 'vocal-pronunciation-feedback': return <PronunciationDemo />;
    case 'advanced-analytics-dashboard': return <AnalyticsDashboardDemo />;
    case 'contextual-speech-correction': return <SpeechCorrectionDemo />;
    case 'ai-speaking-coach': return <SpeakingCoachDemo />;
    case 'real-life-roleplay-scenarios': return <RoleplayDemo />;
    case 'fluency-score-tracker': return <FluencyScoreDemo />;
    case 'ai-vocabulary-builder': return <VocabularyBuilderDemo />;
    case 'speech-recording-playback': return <SpeechPlaybackDemo />;
    case 'accent-training': return <AccentTrainingDemo />;
    case 'stammer-friendly-mode': return <StammerFriendlyDemo />;
    case 'filler-word-detection': return <FillerWordDemo />;
    default: return <RealTimeChatDemo />;
  }
};

export default function FeatureDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const feature = featuresData.find(f => f.slug === slug);

  // Scroll to top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!feature) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-4">Feature not found</h2>
        <button onClick={() => navigate('/features')} className="text-violet-400 hover:text-violet-300">
          Return to Features
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent pt-24 pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[0%] left-[20%] w-[600px] h-[600px] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Navigation & Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link to="/features" className="inline-flex items-center text-slate-400 hover:text-violet-400 transition-colors group mb-8">
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Features
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <div className={`p-6 bg-white/5 dark:bg-slate-800/40 rounded-3xl border border-white/10 shadow-inner w-max ${feature.iconColorClass}`}>
              {React.cloneElement(feature.icon, { className: 'w-12 h-12' })}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                {feature.title}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
                {feature.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mt-16 items-center">
          
          {/* Left Column: Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-12"
          >
            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Benefits</h3>
              <ul className="space-y-4">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 mr-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How it works */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How It Works</h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-violet-500/0 before:via-violet-500/50 before:to-violet-500/0">
                {feature.howItWorks.map((step, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-violet-500 text-slate-900 font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      {idx + 1}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-white/5 bg-white/5 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm">
                      <p className="text-slate-600 dark:text-slate-300">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <Link to="/register">
                <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all transform hover:scale-105 flex items-center">
                  Start Practicing <Play className="w-5 h-5 ml-2 fill-current" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive Demo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 rounded-[3rem] blur-3xl -z-10" />
            <div className="w-full relative z-10">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur text-slate-300 text-sm font-semibold tracking-wide uppercase mb-2">
                  Interactive Demo
                </div>
              </div>
              <DemoRenderer slug={feature.slug} />
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
