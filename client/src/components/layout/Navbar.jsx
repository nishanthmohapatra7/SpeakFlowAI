import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, User, LogOut, Menu, X, Sparkles } from 'lucide-react';
import GradientButton from '../ui/GradientButton';
import ThemeToggle from '../common/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Practice', path: '/practice' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Resources', path: '/resources' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-[#0f0a1e]/80 border-b border-slate-200/50 dark:border-slate-800/80 shadow-[0_1px_20px_-3px_rgba(139,92,246,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all duration-300">
      
      {/* Premium Neon Border Glow Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent dark:via-violet-400/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center bg-slate-950 dark:bg-slate-900 w-10 h-10 rounded-xl shadow-lg border border-white/10 overflow-hidden group-hover:scale-[1.03] group-hover:border-violet-500/40 transition-all duration-300">
            {/* Background animated glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-20 group-hover:opacity-45 transition-opacity duration-300" />
            
            <svg className="w-5.5 h-5.5 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M21 11.5C21 16.1391 16.9706 20 12 20C10.551 20 9.18663 19.6687 7.9723 19.078L3 20.5L4.55054 15.9387C3.57865 14.6644 3 13.1495 3 11.5C3 6.86092 7.02944 3 12 3C16.9706 3 21 6.86092 21 11.5Z" 
                stroke="url(#logo-grad-new)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <rect x="8" y="10" width="1.8" height="3" rx="0.9" fill="url(#logo-grad-new)" />
              <rect x="11.1" y="7.5" width="1.8" height="8" rx="0.9" fill="url(#logo-grad-new)" />
              <rect x="14.2" y="10" width="1.8" height="3" rx="0.9" fill="url(#logo-grad-new)" />
              
              <defs>
                <linearGradient id="logo-grad-new" x1="3" y1="3" x2="21" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#c084fc" />
                  <stop offset="0.5" stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-[17px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-violet-950 to-slate-900 dark:from-white dark:via-violet-100 dark:to-white tracking-tight">
              SpeakFlow
            </span>
            <span className="text-[9px] font-extrabold tracking-widest uppercase px-1.5 py-0.5 rounded-md bg-violet-600/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400 border border-violet-500/10 dark:border-violet-400/10">
              AI
            </span>
          </div>
        </Link>

        {/* Minimalist Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative px-4 py-2 text-[13px] font-semibold tracking-wide transition-all duration-200 ${
                  isActive 
                    ? 'text-violet-600 dark:text-violet-400 font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-300'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Active Underline with Neon Shadow Glow */}
                {isActive && (
                  <motion.div 
                    layoutId="active-border-glow"
                    className="absolute bottom-[-14px] left-3 right-3 h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full shadow-[0_0_8px_#8b5cf6]"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <ThemeToggle />

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-0.5" />

          {user ? (
            <div className="flex items-center space-x-3.5">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 select-none">
                Hi, {user.username}
              </span>
              <button 
                onClick={logout} 
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/5 transition-all"
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
              <Link to="/practice">
                <GradientButton className="!py-2 !px-5 text-[13px] !rounded-lg shadow-md shadow-violet-500/10">
                  Practice
                </GradientButton>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-300 font-bold text-[13px] transition-colors"
              >
                Login
              </Link>
              <Link to="/register">
                <GradientButton className="!py-2 !px-5 text-[13px] !rounded-lg shadow-md shadow-violet-500/10">
                  Get Started
                </GradientButton>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger + theme toggle */}
        <div className="flex lg:hidden items-center space-x-3">
          <ThemeToggle />
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden w-full border-t border-slate-200/50 dark:border-slate-800/80 bg-white/95 dark:bg-[#0f0a1e]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      isActive 
                        ? 'text-violet-600 dark:text-violet-400 bg-violet-500/5 font-bold' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <div className="h-px bg-slate-200 dark:bg-slate-800/80 my-2" />

              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-3">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                      {user.username}
                    </span>
                    <button 
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="flex items-center space-x-1.5 text-xs text-red-500 hover:bg-red-500/5 px-2.5 py-1.5 rounded-lg font-bold"
                    >
                      <LogOut size={14} />
                      <span>Logout</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-sm transition-all">
                        Dashboard
                      </button>
                    </Link>
                    <Link to="/practice" onClick={() => setMobileMenuOpen(false)}>
                      <GradientButton className="w-full !py-3 !px-4 text-sm font-bold flex justify-center items-center">
                        Practice
                      </GradientButton>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center">
                    <button className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-sm transition-all">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center">
                    <GradientButton className="w-full !py-3 !px-4 text-sm font-bold flex justify-center items-center">
                      Get Started
                    </GradientButton>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
