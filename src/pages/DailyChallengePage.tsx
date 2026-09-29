import React, { useState, useEffect } from 'react';
import { Flame, Clock, CheckCircle2, Award, Zap, Sparkles } from 'lucide-react';
import { Challenge } from '../types/index.js';
import { CodeEditor } from '../components/common/CodeEditor.js';
import { useAuth } from '../context/AuthContext.js';

export const DailyChallengePage: React.FC = () => {
  const { user, token, updateUser, celebrate } = useAuth();
  const [dailyInfo, setDailyInfo] = useState<any>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionResult, setCompletionResult] = useState<any>(null);

  useEffect(() => {
    fetch('/api/daily-challenge')
      .then((res) => res.json())
      .then((data) => {
        if (data.dailyChallenge) {
          setDailyInfo(data.dailyChallenge);
          setChallenge(data.dailyChallenge.challenge);
          setIsCompleted(data.dailyChallenge.isCompleted);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load daily challenge:', err);
        setLoading(false);
      });
  }, []);

  const handleChallengeSolved = async () => {
    try {
      const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/daily-challenge/complete', {
        method: 'POST',
        headers,
      });
      const data = await res.json();
      setCompletionResult(data);
      setIsCompleted(true);
      celebrate();
      if (data.user) updateUser(data.user);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || !challenge) {
    return (
      <div className="py-20 text-center text-slate-400 font-mono text-xs">
        Loading today&apos;s daily quest...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-amber-900/40 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🔥</span>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Daily Quest · Protect Your Streak
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{challenge.title}</h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              Complete today&apos;s algorithm quest to earn an extra +{dailyInfo?.bonusXP || 100} XP
              bonus and extend your learning streak.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-center min-w-[100px]">
              <span className="text-slate-400 block text-[10px]">TIME REMAINING</span>
              <span className="font-bold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5" /> 14h 22m
              </span>
            </div>

            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-center min-w-[100px]">
              <span className="text-slate-400 block text-[10px]">TOTAL REWARD</span>
              <span className="font-bold text-emerald-400 mt-0.5 block">
                +{challenge.xpReward} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {isCompleted && (
        <div className="p-5 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl shadow-lg space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="font-bold text-white text-sm">Daily Challenge Complete!</h3>
                <p className="text-xs text-emerald-300">
                  Your streak has been extended to{' '}
                  <strong className="text-white font-mono">{user?.streak || 1} days</strong>!
                </p>
              </div>
            </div>
            {completionResult?.earnedXp && (
              <span className="text-xs font-mono font-bold text-amber-400">
                +{completionResult.earnedXp} XP Awarded
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-emerald-800/40 text-xs text-slate-300 space-y-1">
            <strong className="text-white block">Official Solution Explanation:</strong>
            <p className="text-slate-300">
              This problem evaluates bracket balancing using a Stack (LIFO). As we iterate across
              each character, opening symbols are pushed onto the call stack. When a closing bracket
              is encountered, we pop the top item and verify that it correctly matches the closing
              counterpart in O(1) time.
            </p>
          </div>
        </div>
      )}

      {/* Challenge Solving Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
        {/* Left: Problem Specs */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <span
            className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border inline-block ${
              challenge.difficulty === 'Easy'
                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400'
                : 'bg-amber-950/40 border-amber-800/60 text-amber-400'
            }`}
          >
            {challenge.difficulty}
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">{challenge.description}</p>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Examples</h4>
            {challenge.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono space-y-1"
              >
                <div className="text-slate-400">
                  <strong>Input:</strong> {ex.input}
                </div>
                <div className="text-emerald-400">
                  <strong>Output:</strong> {ex.output}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Code Editor */}
        <div className="lg:col-span-7 h-[600px]">
          <CodeEditor
            initialCode={challenge.starterCode}
            challengeId={challenge.id}
            onSubmissionSuccess={handleChallengeSolved}
          />
        </div>
      </div>
    </div>
  );
};
