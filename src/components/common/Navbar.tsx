import React from 'react';
import { Flame, Coins, Zap, Sun, Moon, LogIn, User, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { useTheme } from '../../context/ThemeContext.js';

interface NavbarProps {
  onOpenAuth: () => void;
  onNavigate: (page: string) => void;
  activePage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onNavigate, activePage }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            🐍
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white text-base tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
                Python & DSA Quest
              </span>
            </div>
            <span className="text-[11px] text-slate-400 tracking-normal block mt-0.5">
              Learn Through Games
            </span>
          </div>
        </div>

        {/* User Gamification Stats */}
        {user ? (
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Level indicator */}
            <div
              onClick={() => onNavigate('profile')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 border border-slate-700/80 rounded-lg text-xs font-mono cursor-pointer hover:border-slate-600 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300 font-semibold">Lvl {user.level}</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-xs font-mono text-emerald-300">
              <span className="font-bold">{user.xp.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-400">XP</span>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-amber-950/40 border border-amber-800/60 rounded-lg text-xs font-mono text-amber-300">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="font-bold">{user.streak}</span>
              <span className="hidden sm:inline text-[10px] text-amber-400">days</span>
            </div>

            {/* Coins */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-yellow-950/40 border border-yellow-800/60 rounded-lg text-xs font-mono text-yellow-300">
              <Coins className="w-3.5 h-3.5 text-yellow-400" />
              <span className="font-bold">{user.coins}</span>
            </div>

            {/* Avatar & Profile */}
            <div
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2 pl-1 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full bg-slate-800 border-2 border-emerald-500 flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                {user.avatar || '🧙‍♂️'}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In / Demo</span>
            </button>
          </div>
        )}

        {/* Theme Toggle */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
