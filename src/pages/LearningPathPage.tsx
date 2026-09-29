import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  MapPin,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { Topic } from '../types/index.js';
import { useAuth } from '../context/AuthContext.js';

interface LearningPathPageProps {
  onSelectTopic: (topicId: string) => void;
}

export const LearningPathPage: React.FC<LearningPathPageProps> = ({ onSelectTopic }) => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeWorld, setActiveWorld] = useState<'python' | 'dsa'>('python');

  useEffect(() => {
    fetch('/api/topics')
      .then((res) => res.json())
      .then((data) => {
        setTopics(data.topics || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load topics:', err);
        setLoading(false);
      });
  }, []);

  const completedSet = new Set(user?.completedTopics || []);

  const pythonTopics = topics.filter(
    (t) => t.category === 'python_foundations' || t.category === 'intermediate_python'
  );
  const dsaTopics = topics.filter(
    (t) => t.category === 'dsa_foundations' || t.category === 'advanced_dsa'
  );

  const displayedTopics = activeWorld === 'python' ? pythonTopics : dsaTopics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            🗺️ The Adventurer&apos;s Learning Roadmap
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Progress through connected world nodes. Complete quizzes and challenges to unlock
            subsequent realms.
          </p>
        </div>

        {/* World Segmented Switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveWorld('python')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeWorld === 'python'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🐍 Python World (Levels 1 &amp; 2)
          </button>
          <button
            onClick={() => setActiveWorld('dsa')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeWorld === 'dsa'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🧠 DSA World (Levels 3 &amp; 4)
          </button>
        </div>
      </div>

      {/* Progress Map Grid */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 relative">
          {displayedTopics.map((t, idx) => {
            const isCompleted = completedSet.has(t.id);
            // First topic or prereqs met
            const isUnlocked =
              idx === 0 ||
              t.prerequisites.length === 0 ||
              t.prerequisites.every((pid) => completedSet.has(pid)) ||
              isCompleted;

            const isCurrent = isUnlocked && !isCompleted;

            return (
              <React.Fragment key={t.id}>
                {/* Connecting Line */}
                {idx > 0 && (
                  <div
                    className={`w-1 h-8 rounded-full transition-colors ${
                      isCompleted ? 'bg-emerald-500' : isUnlocked ? 'bg-indigo-500/50' : 'bg-slate-800'
                    }`}
                  />
                )}

                {/* Node Card */}
                <div
                  onClick={() => {
                    if (isUnlocked) onSelectTopic(t.id);
                  }}
                  className={`w-full max-w-xl p-4 sm:p-5 rounded-2xl border transition-all duration-200 select-none ${
                    isCompleted
                      ? 'bg-slate-900/90 border-emerald-500/50 hover:border-emerald-400 cursor-pointer shadow-md shadow-emerald-500/10'
                      : isCurrent
                      ? 'bg-gradient-to-r from-slate-900 to-indigo-950/70 border-indigo-500 hover:border-indigo-400 cursor-pointer shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500/30 animate-pulse'
                      : isUnlocked
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700 cursor-pointer'
                      : 'bg-slate-950 border-slate-800/60 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      {/* Icon Circle */}
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold shadow-inner ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : isCurrent
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40'
                            : isUnlocked
                            ? 'bg-slate-800 text-slate-300 border border-slate-700'
                            : 'bg-slate-900 text-slate-600 border border-slate-800'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : !isUnlocked ? (
                          <Lock className="w-4 h-4 text-slate-600" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                            Level {t.levelNumber} · {t.category.replace('_', ' ')}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                          {t.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {t.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        +{t.xpReward} XP
                      </span>
                      {isUnlocked && (
                        <div className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
