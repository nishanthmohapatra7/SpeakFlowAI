import React from 'react';
import { 
  Sparkles, Mic, BarChart2, MessageSquare, 
  Brain, Users, Target, BookOpen, Headphones, Globe, 
  Activity, EyeOff 
} from 'lucide-react';

export const featuresData = [
  {
    slug: 'real-time-ai-conversation',
    title: 'Real-Time AI Conversation',
    description: 'Practice speaking naturally with our advanced AI companions who adapt to your fluency level, topic of choice, and style.',
    icon: <Sparkles />,
    iconColorClass: 'text-violet-500 dark:text-violet-400',
    benefits: [
      'Overcome speaking anxiety in a zero-pressure environment.',
      'Improve spontaneity and quick-thinking in English.',
      'Experience realistic conversational flows and natural pauses.'
    ],
    howItWorks: [
      'Choose a topic or let the AI start a casual conversation.',
      'Speak into your microphone naturally, as you would to a friend.',
      'The AI processes your voice instantly and replies with contextual, human-like voice responses.'
    ],
    demoType: 'chat'
  },
  {
    slug: 'vocal-pronunciation-feedback',
    title: 'Vocal Pronunciation Feedback',
    description: 'Receive instant word-by-word pronunciation ratings, accent coaching, and phonetic corrections to hone your clarity.',
    icon: <Mic />,
    iconColorClass: 'text-pink-500 dark:text-pink-400',
    benefits: [
      'Identify the exact sounds you struggle with.',
      'Train your mouth and tongue for native-like articulation.',
      'Receive visual heatmaps of your pronunciation accuracy.'
    ],
    howItWorks: [
      'Read a passage or speak freely into the mic.',
      'Our acoustic engine analyzes phonemes in real-time.',
      'Words are color-coded (green, yellow, red) based on clarity.'
    ],
    demoType: 'pronunciation'
  },
  {
    slug: 'advanced-analytics-dashboard',
    title: 'Advanced Analytics Dashboard',
    description: 'Trace your speaking progress, vocabulary expansions, sentence complexities, and overall fluency improvements over time.',
    icon: <BarChart2 />,
    iconColorClass: 'text-indigo-500 dark:text-indigo-400',
    benefits: [
      'Quantify your progress to stay motivated.',
      'Identify long-term trends and weaknesses.',
      'Set data-driven goals for your language learning journey.'
    ],
    howItWorks: [
      'Every session is automatically logged and analyzed.',
      'Metrics like speaking rate, vocabulary richness, and grammar accuracy are calculated.',
      'View interactive charts and historical progress on your dashboard.'
    ],
    demoType: 'analytics'
  },
  {
    slug: 'contextual-speech-correction',
    title: 'Contextual Speech Correction',
    description: 'AI coach automatically highlights grammar slip-ups and offers elegant phrase suggestions while keeping the flow of chat.',
    icon: <MessageSquare />,
    iconColorClass: 'text-blue-500 dark:text-blue-400',
    benefits: [
      'Learn grammar intuitively without boring textbooks.',
      'Expand your repertoire of native idioms and phrasing.',
      'Never lose the conversational flow while being corrected.'
    ],
    howItWorks: [
      'You make a grammatical or stylistic error during conversation.',
      'The AI understands what you meant and subtly suggests a better alternative.',
      'You can review these corrections after the conversation ends.'
    ],
    demoType: 'correction'
  },
  {
    slug: 'ai-speaking-coach',
    title: 'AI Speaking Coach',
    description: 'Receive personalized feedback on fluency, confidence, grammar, speaking pace, and communication skills.',
    icon: <Brain />,
    iconColorClass: 'text-purple-500 dark:text-purple-400',
    benefits: [
      'Get a personalized curriculum tailored to your weaknesses.',
      'Receive actionable tips to sound more confident and persuasive.',
      'Have a 24/7 tutor available whenever you want to practice.'
    ],
    howItWorks: [
      'The coach establishes a baseline based on your first few conversations.',
      'It creates targeted mini-lessons and challenges for you.',
      'It provides summary feedback at the end of every practice session.'
    ],
    demoType: 'coach'
  },
  {
    slug: 'real-life-roleplay-scenarios',
    title: 'Real-Life Roleplay Scenarios',
    description: 'Practice interviews, presentations, college discussions, customer support conversations, and everyday speaking situations with AI.',
    icon: <Users />,
    iconColorClass: 'text-fuchsia-500 dark:text-fuchsia-400',
    benefits: [
      'Prepare for high-stakes real-world situations like job interviews.',
      'Learn context-specific vocabulary (e.g., business English vs casual).',
      'Build confidence in unpredictable social scenarios.'
    ],
    howItWorks: [
      'Select a scenario (e.g., "Ordering at a restaurant" or "Job interview").',
      'The AI adopts a specific persona and initiates the roleplay.',
      'You navigate the scenario, dealing with unexpected questions.'
    ],
    demoType: 'chat'
  },
  {
    slug: 'fluency-score-tracker',
    title: 'Fluency Score Tracker',
    description: 'Track pronunciation, grammar, vocabulary, confidence, and speaking speed through detailed performance metrics.',
    icon: <Target />,
    iconColorClass: 'text-rose-500 dark:text-rose-400',
    benefits: [
      'Know exactly where you stand with an objective score.',
      'Gamify your learning by trying to beat your high score.',
      'Understand the specific components that make up fluency.'
    ],
    howItWorks: [
      'The system calculates an aggregate score based on multiple variables.',
      'Your score updates in real-time as you complete exercises.',
      'You unlock new levels or badges as your fluency score increases.'
    ],
    demoType: 'analytics'
  },
  {
    slug: 'ai-vocabulary-builder',
    title: 'AI Vocabulary Builder',
    description: 'Learn new words, synonyms, advanced expressions, and personalized vocabulary recommendations.',
    icon: <BookOpen />,
    iconColorClass: 'text-cyan-500 dark:text-cyan-400',
    benefits: [
      'Transition from basic vocabulary to advanced phrasing.',
      'Never forget new words thanks to spaced repetition.',
      'Learn words in context rather than from isolated flashcards.'
    ],
    howItWorks: [
      'The AI identifies words you overuse (e.g., "very good").',
      'It suggests sophisticated alternatives (e.g., "exceptional").',
      'These words are added to your personal review list.'
    ],
    demoType: 'correction'
  },
  {
    slug: 'speech-recording-playback',
    title: 'Speech Recording & Playback',
    description: 'Record your speech, listen to playback, compare progress, and identify improvement areas.',
    icon: <Headphones />,
    iconColorClass: 'text-teal-500 dark:text-teal-400',
    benefits: [
      'Develop self-awareness of your own speaking habits.',
      'Objectively hear the difference between your pronunciation and a native.',
      'Keep an audio journal of your progress over months or years.'
    ],
    howItWorks: [
      'Toggle the recording feature during any session.',
      'Access your audio history in the dashboard.',
      'Play back segments with AI annotations highlighting areas to improve.'
    ],
    demoType: 'audio'
  },
  {
    slug: 'accent-training',
    title: 'Accent Training',
    description: 'Practice and improve Indian, American, British, and Australian English pronunciation.',
    icon: <Globe />,
    iconColorClass: 'text-sky-500 dark:text-sky-400',
    benefits: [
      'Adapt your accent for specific professional environments.',
      'Understand regional slang and idiomatic expressions.',
      'Improve your listening comprehension across different accents.'
    ],
    howItWorks: [
      'Select your target accent in your profile settings.',
      'The AI voice switches to the chosen regional accent.',
      'Pronunciation feedback is adjusted to match specific regional phonetics.'
    ],
    demoType: 'pronunciation'
  },
  {
    slug: 'stammer-friendly-mode',
    title: 'Stammer-Friendly Mode',
    description: 'Special speaking exercises, slow-paced conversations, confidence building, and speech fluency support.',
    icon: <Activity />,
    iconColorClass: 'text-orange-500 dark:text-orange-400',
    benefits: [
      'Practice in a totally pressure-free, patient environment.',
      'Reduce speech anxiety which often exacerbates stuttering.',
      'Focus on rhythm and breath control without worrying about time.'
    ],
    howItWorks: [
      'Enable Stammer-Friendly mode to adjust the AI\'s patience threshold.',
      'The AI will wait indefinitely for you to finish your sentence.',
      'Feedback focuses purely on content and encouragement.'
    ],
    demoType: 'chat'
  },
  {
    slug: 'filler-word-detection',
    title: 'Filler Word Detection',
    description: 'Detect overused words such as "um", "uh", "like", and receive suggestions for clearer communication.',
    icon: <EyeOff />,
    iconColorClass: 'text-red-500 dark:text-red-400',
    benefits: [
      'Sound more professional and articulate in meetings.',
      'Become aware of subconscious verbal crutches.',
      'Learn to use silence effectively instead of filling space.'
    ],
    howItWorks: [
      'The system tracks every instance of "um", "ah", "like", etc.',
      'You receive a filler-word ratio at the end of the session.',
      'The AI provides exercises on pausing and breath control.'
    ],
    demoType: 'analytics'
  }
];
