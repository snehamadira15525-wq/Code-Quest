import React, { useState } from 'react';
import { Swords, Shield, Zap, Sparkles, RotateCcw, CheckCircle2, AlertOctagon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Boss {
  name: string;
  title: string;
  avatar: string;
  maxHp: number;
  weakness: string;
  quote: string;
}

const BOSSES: Boss[] = [
  {
    name: 'The Sorting Titan',
    title: 'Wielder of O(N²) Quadratic Chaos',
    avatar: '🗿',
    maxHp: 300,
    weakness: 'O(N log N) Divide and Conquer',
    quote: 'Feel the crush of nested loops!',
  },
  {
    name: 'The Graph Hydra',
    title: 'Lord of Infinite Cyclic Mazes',
    avatar: '🐉',
    maxHp: 450,
    weakness: 'Visited Hash Sets & BFS Queues',
    quote: 'Every edge leads to a trap!',
  },
  {
    name: 'The DP Dragon',
    title: 'Sovereign of Exponential O(2ⁿ) Recursion',
    avatar: '🔥',
    maxHp: 600,
    weakness: 'Memoization Table & Tabulation',
    quote: 'Your call stack will overflow before you reach me!',
  },
];

export const BossBattleGame: React.FC<{ onComplete?: (score: number) => void }> = ({ onComplete }) => {
  const [bossIdx, setBossIdx] = useState<number>(0);
  const boss = BOSSES[bossIdx];

  const [bossHp, setBossHp] = useState<number>(boss.maxHp);
  const [playerHp, setPlayerHp] = useState<number>(200);
  const [combatLogs, setCombatLogs] = useState<string[]>([
    `A wild ${boss.name} emerges! "${boss.quote}"`,
  ]);
  const [isAttacking, setIsAttacking] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<{
    q: string;
    options: string[];
    correct: number;
    dmg: number;
  } | null>(null);

  const resetBattle = () => {
    setBossHp(boss.maxHp);
    setPlayerHp(200);
    setCombatLogs([`Battle reset. Prepare yourself against ${boss.name}!`]);
    setActiveQuestion(null);
    setIsAttacking(false);
  };

  const handleQuickAttack = async (type: 'optimal' | 'bruteforce' | 'memoize') => {
    if (isAttacking || bossHp <= 0 || playerHp <= 0) return;
    setIsAttacking(true);

    let dmg = 40;
    let logMsg = '';

    if (type === 'optimal') {
      dmg = 85;
      logMsg = `🎯 Critical Strike! You channeled ${boss.weakness} for ${dmg} algorithmic damage!`;
    } else if (type === 'memoize') {
      dmg = 60;
      setPlayerHp((prev) => Math.min(200, prev + 25));
      logMsg = `🛡️ Memoization Shield! Restored 25 HP and dealt ${dmg} damage to ${boss.name}!`;
    } else {
      dmg = 25;
      logMsg = `⚠️ Brute Force attack struggled against quadratic time, dealing only ${dmg} damage.`;
    }

    const nextBossHp = Math.max(0, bossHp - dmg);
    setBossHp(nextBossHp);

    const newLogs = [logMsg, ...combatLogs];

    if (nextBossHp <= 0) {
      newLogs.unshift(`🏆 ${boss.name} DEFEATED! Victory claimed! +250 XP earned!`);
      setCombatLogs(newLogs);
      setIsAttacking(false);
      try {
        confetti({ particleCount: 100, spread: 80 });
      } catch (e) {}
      if (onComplete) onComplete(500);
      return;
    }

    // Boss retaliates
    await new Promise((r) => setTimeout(r, 600));
    const bossDmg = Math.floor(Math.random() * 25) + 15;
    const nextPlayerHp = Math.max(0, playerHp - bossDmg);
    setPlayerHp(nextPlayerHp);
    newLogs.unshift(`💥 ${boss.name} retaliates with quadratic fury, dealing ${bossDmg} damage to you!`);
    setCombatLogs(newLogs);
    setIsAttacking(false);
  };

  const triggerPuzzle = () => {
    setActiveQuestion({
      q: `What is the optimal time complexity to sort an array of N numbers with comparison?`,
      options: ['O(N²)', 'O(N log N)', 'O(1)', 'O(N³)'],
      correct: 1,
      dmg: 120,
    });
  };

  const answerPuzzle = (chosenIdx: number) => {
    if (!activeQuestion) return;
    if (chosenIdx === activeQuestion.correct) {
      const dmg = activeQuestion.dmg;
      const nextBossHp = Math.max(0, bossHp - dmg);
      setBossHp(nextBossHp);
      setCombatLogs([
        `⚡ Brilliant insight! Correct algorithm selected! Dealt massive ${dmg} strike!`,
        ...combatLogs,
      ]);
      if (nextBossHp <= 0) {
        try {
          confetti({ particleCount: 100, spread: 80 });
        } catch (e) {}
        if (onComplete) onComplete(500);
      }
    } else {
      setPlayerHp((prev) => Math.max(0, prev - 30));
      setCombatLogs([`❌ Suboptimal algorithm! You took 30 recoil damage!`, ...combatLogs]);
    }
    setActiveQuestion(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Swords className="w-5 h-5 text-amber-400" />
            Game 10: Algorithm Boss Battle
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Defeat the legendary algorithmic titans using optimal Big-O counter strategies!
          </p>
        </div>
        <div className="flex items-center gap-2">
          {BOSSES.map((b, idx) => (
            <button
              key={idx}
              onClick={() => {
                setBossIdx(idx);
                setBossHp(BOSSES[idx].maxHp);
                setPlayerHp(200);
                setCombatLogs([`Challenging ${BOSSES[idx].name}!`]);
              }}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                bossIdx === idx
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {b.name.split(' ')[1]}
            </button>
          ))}
          <button
            onClick={resetBattle}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Battle Arena */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Boss Card */}
        <div className="p-5 bg-slate-950/80 border border-rose-900/40 rounded-xl flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-2 right-3 text-[10px] uppercase font-bold text-rose-400 tracking-wider">
            Boss Threat
          </div>
          <div className="text-6xl my-2 filter drop-shadow-md animate-pulse">{boss.avatar}</div>
          <h4 className="text-base font-bold text-white">{boss.name}</h4>
          <span className="text-xs text-rose-400 font-mono mb-3">{boss.title}</span>

          {/* Boss HP Bar */}
          <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden mb-1">
            <div
              style={{ width: `${(bossHp / boss.maxHp) * 100}%` }}
              className="bg-rose-600 h-full transition-all duration-300"
            />
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            HP: {bossHp} / {boss.maxHp}
          </span>
        </div>

        {/* Player Stats & Combat Actions */}
        <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-between">
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-emerald-400">Player HP</span>
              <span className="font-mono text-slate-300">{playerHp} / 200</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                style={{ width: `${(playerHp / 200) * 100}%` }}
                className="bg-emerald-500 h-full transition-all duration-300"
              />
            </div>
          </div>

          {activeQuestion ? (
            <div className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-lg">
              <span className="text-xs font-semibold text-indigo-300 block mb-2">
                {activeQuestion.q}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {activeQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => answerPuzzle(i)}
                    className="p-2 bg-indigo-900/60 hover:bg-indigo-800 text-xs font-mono text-white rounded text-left"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => handleQuickAttack('optimal')}
                disabled={isAttacking || bossHp <= 0}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-amber-600/90 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Strike with {boss.weakness}
                </span>
                <span className="font-mono text-[11px]">85 DMG</span>
              </button>

              <button
                onClick={() => handleQuickAttack('memoize')}
                disabled={isAttacking || bossHp <= 0}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-blue-600/90 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Memoization Cache & Guard
                </span>
                <span className="font-mono text-[11px]">60 DMG + 25 HP</span>
              </button>

              <button
                onClick={triggerPuzzle}
                disabled={isAttacking || bossHp <= 0}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-purple-600/90 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Solve Algorithm Puzzle
                </span>
                <span className="font-mono text-[11px]">120 DMG</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Combat Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 max-h-28 overflow-y-auto">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
          Battle Combat Log
        </div>
        {combatLogs.map((log, i) => (
          <div key={i} className="leading-5">
            <span className="text-amber-500 mr-2">&gt;</span>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};
