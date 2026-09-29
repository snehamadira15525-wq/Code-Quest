import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Clock, Zap, Award } from 'lucide-react';
import { Challenge } from '../types/index.js';
import { CodeEditor } from '../components/common/CodeEditor.js';
import { useAuth } from '../context/AuthContext.js';

interface ChallengeDetailPageProps {
  challengeId: string;
  onBack: () => void;
}

export const ChallengeDetailPage: React.FC<ChallengeDetailPageProps> = ({ challengeId, onBack }) => {
  const { user } = useAuth();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [solvedBanner, setSolvedBanner] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/challenges/${challengeId}`)
      .then((res) => res.json())
      .then((data) => {
        setChallenge(data.challenge);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load challenge:', err);
        setLoading(false);
      });
  }, [challengeId]);

  if (loading || !challenge) {
    return (
      <div className="py-20 text-center text-slate-400 font-mono text-xs">
        Loading problem details...
      </div>
    );
  }

  const isSolved = user?.completedChallenges?.includes(challenge.id);

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Challenges</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-400">{challenge.category}</span>
          <span className="text-amber-400 font-bold">+{challenge.xpReward} XP</span>
        </div>
      </div>

      {solvedBanner && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl flex items-center justify-between text-xs font-mono text-emerald-200 animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-bold">Challenge Solved! You earned +{solvedBanner.earnedXp} XP!</span>
          </div>
          <span className="text-slate-400">Runtime: {solvedBanner.runtimeMs}ms</span>
        </div>
      )}

      {/* Split View: Problem Description (Left) vs Code Editor (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
        {/* Left: Problem statement */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between overflow-y-auto max-h-[700px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span
                className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                  challenge.difficulty === 'Easy'
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400'
                    : challenge.difficulty === 'Medium'
                    ? 'bg-amber-950/40 border-amber-800/60 text-amber-400'
                    : 'bg-rose-950/40 border-rose-800/60 text-rose-400'
                }`}
              >
                {challenge.difficulty}
              </span>
              {isSolved && (
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                </span>
              )}
            </div>

            <h1 className="text-xl font-bold text-white tracking-tight">{challenge.title}</h1>
            <p className="text-xs text-slate-300 leading-relaxed">{challenge.description}</p>

            {/* Examples */}
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
                  {ex.explanation && (
                    <div className="text-[11px] text-slate-500 font-sans pt-1">
                      {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Constraints
              </h4>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside font-mono">
                {challenge.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Code Editor & Test Cases */}
        <div className="lg:col-span-7 h-[650px]">
          <CodeEditor
            initialCode={challenge.starterCode}
            challengeId={challenge.id}
            testCases={challenge.testCases}
            onSubmissionSuccess={(res) => {
              setSolvedBanner(res);
            }}
          />
        </div>
      </div>
    </div>
  );
};
