import React, { useState, useEffect } from 'react';
import { Gamepad2, Play, Trophy, Sparkles, Filter } from 'lucide-react';
import { GameInfo } from '../types/index.js';
import { useAuth } from '../context/AuthContext.js';

interface GamesHubPageProps {
  onLaunchGame: (gameId: string) => void;
}

export const GamesHubPage: React.FC<GamesHubPageProps> = ({ onLaunchGame }) => {
  const { user } = useAuth();
  const [games, setGames] = useState<GameInfo[]>([]);
  const [filter, setFilter] = useState<'All' | 'Python' | 'DSA'>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/games')
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load games:', err);
        setLoading(false);
      });
  }, []);

  const filteredGames = games.filter((g) => {
    if (filter === 'All') return true;
    return g.category === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            🕹️ The Coding Arcade (10 Mini-Games)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Master programming and DSA concepts by playing hands-on puzzle and action games.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {(['All', 'Python', 'DSA'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'All' ? 'All 10 Games' : `${cat} Games`}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game, idx) => {
          const highScore = user && user.completedGames ? user.completedGames[game.id] || 0 : 0;
          const isCompleted = highScore > 0;

          return (
            <div
              key={game.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-[11px] text-slate-400">
                    Game {idx + 1} · {game.category}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                      game.difficulty === 'Beginner'
                        ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400'
                        : game.difficulty === 'Intermediate'
                        ? 'bg-amber-950/40 border-amber-800/60 text-amber-400'
                        : 'bg-rose-950/40 border-rose-800/60 text-rose-400'
                    }`}
                  >
                    {game.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  {game.title}
                </h3>
                <span className="text-xs text-indigo-400 font-mono block mb-3">
                  {game.subtitle}
                </span>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">{game.description}</p>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl mb-4 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider mb-1">
                    Concept Covered
                  </span>
                  <span className="text-slate-300 font-mono text-[11px]">
                    {game.conceptCovered}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-amber-400 font-bold">+{game.xpReward} XP</span>
                  {highScore > 0 ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <Trophy className="w-3.5 h-3.5" /> High: {highScore}
                    </span>
                  ) : (
                    <span className="text-slate-500">Unplayed</span>
                  )}
                </div>

                <button
                  onClick={() => onLaunchGame(game.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all hover:scale-102"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{highScore > 0 ? 'Play Again' : 'Play Quest Game'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
