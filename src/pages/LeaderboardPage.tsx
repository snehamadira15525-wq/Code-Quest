import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Flame, Zap, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  challengesSolved: number;
  badgesCount: number;
}

export const LeaderboardPage: React.FC = () => {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState<'global' | 'weekly' | 'monthly'>('global');
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?timeframe=${timeframe}`)
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data.leaderboard || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load leaderboard:', err);
        setLoading(false);
      });
  }, [timeframe]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Global Hall of Fame
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Top adventurers ranked by algorithmic XP, challenge solutions, and daily consistency.
          </p>
        </div>

        {/* Timeframe switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {(['global', 'weekly', 'monthly'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                timeframe === tf
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf === 'global' ? 'All-Time' : tf}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Adventurer</th>
                <th className="py-3 px-4 text-center">Level</th>
                <th className="py-3 px-4 text-center">Streak</th>
                <th className="py-3 px-4 text-center">Challenges</th>
                <th className="py-3 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {leaderboard.map((entry) => {
                const isCurrentUser = user && user.id === entry.id;

                return (
                  <tr
                    key={entry.id}
                    className={`transition-colors ${
                      isCurrentUser
                        ? 'bg-emerald-950/30 text-white font-semibold'
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold">
                      <div className="flex items-center gap-1.5">
                        {entry.rank === 1 ? (
                          <span className="text-amber-400 text-base">🥇</span>
                        ) : entry.rank === 2 ? (
                          <span className="text-slate-300 text-base">🥈</span>
                        ) : entry.rank === 3 ? (
                          <span className="text-amber-600 text-base">🥉</span>
                        ) : (
                          <span className="text-slate-500 font-bold ml-1.5">#{entry.rank}</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{entry.avatar}</span>
                        <div>
                          <span className="block font-sans text-white text-xs">
                            {entry.name}
                            {isCurrentUser && (
                              <span className="ml-2 text-[10px] text-emerald-400 font-mono font-bold">
                                (YOU)
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {entry.badgesCount} badges earned
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 bg-slate-800 rounded text-slate-300 text-[11px]">
                        Lvl {entry.level}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="text-amber-400 flex items-center justify-center gap-1">
                        <Flame className="w-3.5 h-3.5" />
                        {entry.streak}d
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center text-slate-300">
                      {entry.challengesSolved} solved
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="text-emerald-400 font-bold text-sm">
                        {entry.xp.toLocaleString()} XP
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
