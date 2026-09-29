import React, { useState, useEffect } from 'react';
import {
  Award,
  Zap,
  Flame,
  Coins,
  CheckCircle2,
  Gamepad2,
  Code2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { Badge } from '../types/index.js';

const AVAILABLE_AVATARS = ['🧙‍♂️', '🐍', '⚡', '🥷', '👾', '🦄', '🚀', '🤖', '👑', '🛡️'];

export const ProfilePage: React.FC = () => {
  const { user, token, updateUser } = useAuth();
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '🧙‍♂️');
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/badges')
      .then((res) => res.json())
      .then((data) => setAllBadges(data.badges || []))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (user) {
      setSelectedAvatar(user.avatar);
      setDisplayName(user.name);
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSaveMsg(null);
    try {
      const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ name: displayName, avatar: selectedAvatar }),
      });
      const data = await res.json();
      if (data.user) {
        updateUser(data.user);
        setSaveMsg('Profile updated successfully!');
        setTimeout(() => setSaveMsg(null), 3000);
      }
    } catch (err: any) {
      setSaveMsg(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const unlockedBadgeIds = new Set(user?.badges || []);

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border-2 border-emerald-500 flex items-center justify-center text-3xl shadow-lg">
              {selectedAvatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.name || 'Adventurer'}</h2>
              <span className="text-xs text-slate-400 font-mono block mt-0.5">
                {user?.email || 'guest@example.com'}
              </span>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  Level {user?.level || 1} Explorer
                </span>
                <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                  {user?.xp.toLocaleString() || 0} Total XP
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <Flame className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="text-white font-bold text-sm block">{user?.streak || 1}d</span>
              <span className="text-slate-500 text-[10px]">Streak</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <Coins className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
              <span className="text-white font-bold text-sm block">{user?.coins || 50}</span>
              <span className="text-slate-500 text-[10px]">Coins</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
              <Award className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
              <span className="text-white font-bold text-sm block">
                {unlockedBadgeIds.size}
              </span>
              <span className="text-slate-500 text-[10px]">Badges</span>
            </div>
          </div>
        </div>

        {/* Avatar & Display Name Settings */}
        <div className="pt-6 space-y-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Customize Adventurer Identity
          </h4>

          <div className="flex flex-wrap items-center gap-2">
            {AVAILABLE_AVATARS.map((av) => (
              <button
                key={av}
                onClick={() => setSelectedAvatar(av)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                  selectedAvatar === av
                    ? 'bg-emerald-600/30 border-2 border-emerald-400 scale-105'
                    : 'bg-slate-950 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {av}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 w-64"
            />
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
            >
              {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
            {saveMsg && <span className="text-xs text-emerald-400 font-mono">{saveMsg}</span>}
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Achievements &amp; Badges Showcase
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Unlock prestigious badges by conquering lessons, games, quizzes, and streak challenges.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {unlockedBadgeIds.size} of {allBadges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBadges.map((badge) => {
            const isUnlocked = unlockedBadgeIds.has(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-slate-950/80 border-amber-900/40 text-white shadow-sm'
                    : 'bg-slate-950/30 border-slate-800/60 opacity-50 text-slate-500'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-500/10 border border-amber-500/30'
                      : 'bg-slate-900 border border-slate-800'
                  }`}
                >
                  {isUnlocked ? '🏆' : '🔒'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{badge.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{badge.description}</p>
                  <span className="text-[10px] font-mono text-emerald-400 mt-1 block">
                    {isUnlocked ? '✓ Unlocked' : 'Locked'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Stats Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Topics Mastered</span>
          <span className="text-2xl font-bold font-mono text-emerald-400">
            {user?.completedTopics.length || 0}
          </span>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Arcade Games Conquered</span>
          <span className="text-2xl font-bold font-mono text-indigo-400">
            {user ? Object.keys(user.completedGames || {}).length : 0} / 10
          </span>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Challenges Solved</span>
          <span className="text-2xl font-bold font-mono text-amber-400">
            {user?.completedChallenges.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
};
