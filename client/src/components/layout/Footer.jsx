import { MessageSquare, Mail, Globe, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative flex items-center justify-center bg-slate-950 dark:bg-slate-900 w-9 h-9 rounded-xl shadow-lg border border-white/10 overflow-hidden group-hover:border-violet-500/40 transition-all duration-300">
                {/* Background animated glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-20 transition-opacity duration-300" />
                
                <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M21 11.5C21 16.1391 16.9706 20 12 20C10.551 20 9.18663 19.6687 7.9723 19.078L3 20.5L4.55054 15.9387C3.57865 14.6644 3 13.1495 3 11.5C3 6.86092 7.02944 3 12 3C16.9706 3 21 6.86092 21 11.5Z" 
                    stroke="url(#logo-grad-footer)" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  <rect x="8" y="10" width="1.8" height="3" rx="0.9" fill="url(#logo-grad-footer)" />
                  <rect x="11.1" y="7.5" width="1.8" height="8" rx="0.9" fill="url(#logo-grad-footer)" />
                  <rect x="14.2" y="10" width="1.8" height="3" rx="0.9" fill="url(#logo-grad-footer)" />
                  
                  <defs>
                    <linearGradient id="logo-grad-footer" x1="3" y1="3" x2="21" y2="20" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#c084fc" />
                      <stop offset="0.5" stopColor="#a78bfa" />
                      <stop offset="1" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-base font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-violet-950 to-slate-900 dark:from-white dark:via-violet-100 dark:to-white tracking-tight">
                  SpeakFlow
                </span>
                <span className="text-[8px] font-extrabold tracking-widest uppercase px-1.5 py-0.5 rounded bg-violet-600/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400 border border-violet-500/10 dark:border-violet-400/10">
                  AI
                </span>
              </div>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Empowering learners to speak English with confidence using the power of Artificial Intelligence.
            </p>
            <div className="flex items-center space-x-4">
              <Globe className="text-slate-400 hover:text-violet-600 cursor-pointer transition-colors" size={20} title="Website" />
              <Share2 className="text-slate-400 hover:text-violet-600 cursor-pointer transition-colors" size={20} title="Social" />
              <Mail className="text-slate-400 hover:text-violet-600 cursor-pointer transition-colors" size={20} title="Email" />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/practice" className="hover:text-violet-600 transition-colors">Speaking Practice</Link></li>
              <li><Link to="/features" className="hover:text-violet-600 transition-colors">AI Features</Link></li>
              <li><Link to="/dashboard" className="hover:text-violet-600 transition-colors">Dashboard</Link></li>
              <li><Link to="/progress" className="hover:text-violet-600 transition-colors">Progress Tracking</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-violet-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-violet-600 transition-colors">Learning Material</a></li>
              <li><a href="#" className="hover:text-violet-600 transition-colors">Pronunciation Guide</a></li>
              <li><a href="#" className="hover:text-violet-600 transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-slate-900 dark:text-white">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>support@speakflow.ai</span>
              </li>
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} SpeakFlow AI. Developed with ❤️ for English learners.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
