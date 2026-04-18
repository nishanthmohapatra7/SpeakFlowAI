import { MessageSquare, Mail, Globe, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-1.5 rounded-lg">
                <MessageSquare className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                SpeakFlow AI
              </span>
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
