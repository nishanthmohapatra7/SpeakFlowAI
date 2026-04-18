import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, User, LogOut, Menu } from 'lucide-react';
import GradientButton from '../ui/GradientButton';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-tr from-violet-600 to-indigo-600 p-2 rounded-lg">
            <MessageSquare className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
            SpeakFlow AI
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium">Home</Link>
          <Link to="/features" className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium">Features</Link>
          
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400">
                <User size={18} />
                <span>Dashboard</span>
              </Link>
              <button onClick={logout} className="text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                <LogOut size={18} />
              </button>
              <Link to="/practice">
                <GradientButton className="!py-1.5 !px-4 text-sm">Start Practice</GradientButton>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 font-medium">Login</Link>
              <Link to="/register">
                <GradientButton className="!py-1.5 !px-6 text-sm">Register</GradientButton>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Menu className="text-slate-600" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
