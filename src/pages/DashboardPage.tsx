import React, { useState, useEffect } from 'react';
import {
  Zap,
  Flame,
  Coins,
  Award,
  ArrowRight,
  Play,
  Gamepad2,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Code2,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { Topic, GameInfo, DailyChallenge, Challenge } from '../types/index.js';

interface DashboardPageProps {
  onNavigate: (page: string, params?: any) => void;
  onSelectTopic: (topicId: string) => void;
  onLaunchGame: (gameId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onSelectTopic,
  onLaunchGame,
}) => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [games, setGames] = useState<GameInfo[]>([]);
  const [dailyData, setDailyData] = useState<{ daily: DailyChallenge; challenge: Challenge } | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsRes, gamesRes, dailyRes] = await Promise.all([
          fetch('/api/topics'),
          fetch('/api/games'),
          fetch('/api/daily-challenge'),
        ]);

        if (topicsRes.ok) {
          const d = await topicsRes.json();
          setTopics(d.topics || []);
        }
        if (gamesRes.ok) {
          const d = await gamesRes.json();
          setGames(d.games || []);
        }
        if (dailyRes.ok) {
          const d = await dailyRes.json();
          if (d.dailyChallenge) {
            setDailyData({
              daily: {
                id: d.dailyChallenge.id,
                date: d.dailyChallenge.date,
                challengeId: d.dailyChallenge.challenge.id,
                bonusXP: d.dailyChallenge.bonusXP,
                streakBonus: true,
              },
              challenge: d.dailyChallenge.challenge,
            });
          }
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const currentLevel = user ? user.level : 1;
  const currentXp = user ? user.xp : 0;
  // Progress curve calculation: XP needed for next level
  const xpBase = (currentLevel - 1) * (currentLevel - 1) * 50;
  const xpNext = currentLevel * currentLevel * 50;
  const xpInCurrentLevel = Math.max(0, currentXp - xpBase);
  const xpNeededForLevel = Math.max(50, xpNext - xpBase);
  const xpPercent = Math.min(100, Math.round((xpInCurrentLevel / xpNeededForLevel) * 100));

  // Determine next recommended lesson
  const completedIds = user ? new Set(user.completedTopics) : new Set();
  const nextRecommendedTopic =
    topics.find((t) => !completedIds.has(t.id)) || (topics.length > 0 ? topics[0] : null);

  const completedCount = completedIds.size;
  const totalTopicsCount = topics.length || 38;
  const overallProgress = Math.round((completedCount / totalTopicsCount) * 100);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{user?.avatar || '🧙‍♂️'}</span>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Welcome back, {user ? user.name : 'Adventurer'}!
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Level {currentLevel} Python Explorer ·{' '}
              <span className="text-amber-400 font-semibold font-mono">
                {currentXp.toLocaleString()} XP
              </span>{' '}
              accumulated on your quest.
            </p>

            {/* XP Progress Bar */}
            <div className="mt-4 max-w-md">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
                <span>Next Milestone: Level {currentLevel + 1}</span>
                <span className="text-emerald-400 font-semibold">
                  {xpInCurrentLevel} / {xpNeededForLevel} XP ({xpPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${xpPercent}%` }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Quick Metrics Cluster */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center gap-3 min-w-[120px]">
              <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">STREAK</span>
                <span className="text-base font-bold text-white font-mono">
                  {user ? user.streak : 1} Days
                </span>
              </div>
            </div>

            <div className="px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center gap-3 min-w-[120px]">
              <Coins className="w-6 h-6 text-yellow-400" />
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">COINS</span>
                <span className="text-base font-bold text-white font-mono">
                  {user ? user.coins : 50}
                </span>
              </div>
            </div>

            <div className="px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center gap-3 min-w-[120px]">
              <Award className="w-6 h-6 text-indigo-400" />
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">BADGES</span>
                <span className="text-base font-bold text-white font-mono">
                  {user ? user.badges.length : 1} Earned
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Continue Learning + Daily Quest */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Next Lesson Card (8 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                Continue Learning
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {completedCount} of {totalTopicsCount} Completed ({overallProgress}%)
              </span>
            </div>

            {nextRecommendedTopic ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                    Level {nextRecommendedTopic.levelNumber}:{' '}
                    {nextRecommendedTopic.category.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {nextRecommendedTopic.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {nextRecommendedTopic.description}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6 text-xs font-mono">
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                    <span className="text-slate-500 block text-[10px]">XP REWARD</span>
                    <span className="font-bold text-amber-400">+{nextRecommendedTopic.xpReward} XP</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                    <span className="text-slate-500 block text-[10px]">EST. TIME</span>
                    <span className="font-bold text-slate-200">
                      {nextRecommendedTopic.estimatedMinutes} mins
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                    <span className="text-slate-500 block text-[10px]">VISUALIZER</span>
                    <span className="font-bold text-indigo-400 capitalize">
                      {nextRecommendedTopic.visualizerType}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                All topics completed! You are an Algorithm Master!
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => onNavigate('learning-path')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              View Full Learning Path ➔
            </button>
            {nextRecommendedTopic && (
              <button
                onClick={() => onSelectTopic(nextRecommendedTopic.id)}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all hover:scale-102"
              >
                <span>Resume Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Daily Challenge Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-900/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                Daily Challenge
              </span>
              <span className="text-[11px] font-mono text-slate-400">Resets in 14h</span>
            </div>

            {dailyData ? (
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold block mb-1">
                  {dailyData.challenge.category} · {dailyData.challenge.difficulty}
                </span>
                <h4 className="text-lg font-bold text-white mb-2">
                  {dailyData.challenge.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-6">
                  {dailyData.challenge.description}
                </p>

                <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl mb-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-300">Streak Protector &amp; Bonus</span>
                  <span className="font-bold text-amber-400">
                    +{dailyData.daily.bonusXP + dailyData.challenge.xpReward} XP
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 py-6">Loading today&apos;s daily challenge...</div>
            )}
          </div>

          <button
            onClick={() => onNavigate('daily')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-amber-600/20 transition-all hover:scale-102"
          >
            <span>Solve Daily Challenge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Featured Arcade Games Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-indigo-400" />
              Featured Coding Mini-Games
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              10 interactive puzzle games designed to reinforce Python and algorithmic intuition.
            </p>
          </div>
          <button
            onClick={() => onNavigate('games')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            View All 10 Games ➔
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.slice(0, 3).map((g) => (
            <div
              key={g.id}
              className="p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[11px] text-slate-400">{g.category}</span>
                  <span className="font-mono text-[11px] text-amber-400 font-bold">
                    +{g.xpReward} XP
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  {g.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {g.description}
                </p>
              </div>

              <button
                onClick={() => onLaunchGame(g.id)}
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Play Game</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Game Statistics & Milestones Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Mini-Games Played</span>
          <span className="text-xl font-bold font-mono text-indigo-400">
            {user ? user.gameStats.gamesPlayed : 0}
          </span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Challenges Solved</span>
          <span className="text-xl font-bold font-mono text-emerald-400">
            {user ? user.gameStats.challengesSolved : 0}
          </span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Quizzes Passed</span>
          <span className="text-xl font-bold font-mono text-amber-400">
            {user ? user.gameStats.quizzesCompleted : 0}
          </span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400 block mb-1">Lines of Code Run</span>
          <span className="text-xl font-bold font-mono text-teal-400">
            {user ? user.gameStats.linesOfCodeRun : 0}
          </span>
        </div>
      </div>
    </div>
  );
};
