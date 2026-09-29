import React, { useState, useEffect } from 'react';
import { Code2, Search, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { Challenge } from '../types/index.js';
import { useAuth } from '../context/AuthContext.js';

interface ChallengesPageProps {
  onSelectChallenge: (challengeId: string) => void;
}

export const ChallengesPage: React.FC<ChallengesPageProps> = ({ onSelectChallenge }) => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/challenges')
      .then((res) => res.json())
      .then((data) => {
        setChallenges(data.challenges || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load challenges:', err);
        setLoading(false);
      });
  }, []);

  const solvedSet = new Set(user?.completedChallenges || []);

  const filtered = challenges.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiff = difficultyFilter === 'All' || c.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            Algorithm Challenge Arena
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Solve problems in Python with automated test cases and earn XP &amp; badges.
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                difficultyFilter === diff
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by challenge name or concept (e.g., Arrays, Dynamic Programming, Stack)..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Challenge List */}
      <div className="space-y-3">
        {filtered.map((c) => {
          const isSolved = solvedSet.has(c.id);

          return (
            <div
              key={c.id}
              onClick={() => onSelectChallenge(c.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isSolved
                  ? 'bg-slate-900/80 border-emerald-900/40 hover:border-emerald-500/50'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSolved
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                      : 'bg-slate-950 text-slate-500 border border-slate-800'
                  }`}
                >
                  {isSolved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Code2 className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono text-slate-400">{c.category}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                        c.difficulty === 'Easy'
                          ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400'
                          : c.difficulty === 'Medium'
                          ? 'bg-amber-950/40 border-amber-800/60 text-amber-400'
                          : 'bg-rose-950/40 border-rose-800/60 text-rose-400'
                      }`}
                    >
                      {c.difficulty}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white hover:text-emerald-400 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{c.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0">
                <span className="text-xs font-mono font-bold text-amber-400">+{c.xpReward} XP</span>
                <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-colors">
                  <span>{isSolved ? 'Solve Again' : 'Solve'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
