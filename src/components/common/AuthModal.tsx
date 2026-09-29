import React, { useState } from 'react';
import { X, Sparkles, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, loginAsDemo } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (tab === 'login') {
      const res = await login(email, password);
      if (res.success) {
        onClose();
      } else {
        setError(res.message || 'Login failed');
      }
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      const res = await register(name, email, password, confirmPassword);
      if (res.success) {
        onClose();
      } else {
        setError(res.message || 'Registration failed');
      }
    }
    setLoading(false);
  };

  const handleDemo = async () => {
    setLoading(true);
    await loginAsDemo();
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center text-2xl mx-auto shadow-lg shadow-emerald-500/20 mb-3">
            🐍
          </div>
          <h3 className="text-xl font-bold text-white">
            {tab === 'login' ? 'Welcome Back, Coder!' : 'Join the Coding Adventure'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {tab === 'login'
              ? 'Sign in to sync your XP, streak, and unlocked game badges.'
              : 'Create your adventurer account and master Python & DSA.'}
          </p>
        </div>

        {/* Demo Fast Login Button */}
        <button
          onClick={handleDemo}
          disabled={loading}
          className="w-full mb-5 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-emerald-600/30 to-indigo-600/30 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>One-Click Demo Adventurer (Alex, Lvl 7)</span>
        </button>

        <div className="relative flex py-2 items-center mb-5">
          <div className="flex-grow border-t border-slate-800" />
          <span className="flex-shrink mx-3 text-[11px] text-slate-500 font-mono">OR USE EMAIL</span>
          <div className="flex-grow border-t border-slate-800" />
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'login'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              tab === 'register'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl flex items-center gap-2 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Adventurer Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya Chen"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {tab === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
          >
            {loading ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create Adventurer Account'}
          </button>
        </form>
      </div>
    </div>
  );
};
