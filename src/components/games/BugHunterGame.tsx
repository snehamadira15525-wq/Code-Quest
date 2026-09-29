import React, { useState, useEffect } from 'react';
import { Bug, CheckCircle2, RotateCcw, Lightbulb, Play, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BugLevel {
  id: number;
  title: string;
  buggyCode: string;
  solutionHint: string;
  explanation: string;
  expectedOutput: string;
}

const BUG_LEVELS: BugLevel[] = [
  {
    id: 1,
    title: 'Missing Colon in For Loop',
    buggyCode: `for i in range(5)\n    print(i)`,
    solutionHint: 'Every for statement in Python must end with a colon (:).',
    explanation: 'Python syntax requires a colon at the end of loop and conditional header lines.',
    expectedOutput: '0\n1\n2\n3\n4',
  },
  {
    id: 2,
    title: 'Off-by-One Range Boundary',
    buggyCode: `# We need to print numbers 1 through 5 inclusive\nfor n in range(1, 5):\n    print(n)`,
    solutionHint: 'range(start, stop) stops before stop. To include 5, what should stop be?',
    explanation: 'range(1, 6) generates numbers 1, 2, 3, 4, 5.',
    expectedOutput: '1\n2\n3\n4\n5',
  },
  {
    id: 3,
    title: 'String and Integer Concatenation',
    buggyCode: `score = 100\nprint("Current score: " + score)`,
    solutionHint: 'In Python, you cannot directly concatenate str and int with +. Try str(score) or an f-string.',
    explanation: 'Use f"Current score: {score}" or str(score).',
    expectedOutput: 'Current score: 100',
  },
];

export const BugHunterGame: React.FC<{ onComplete?: (score: number) => void }> = ({ onComplete }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>(BUG_LEVELS[0].buggyCode);
  const [timeLeft, setTimeLeft] = useState<number>(90);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>('Squash the bug and run your test!');
  const [attempts, setAttempts] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);

  const currentLevel = BUG_LEVELS[currentLevelIdx];

  useEffect(() => {
    setUserCode(currentLevel.buggyCode);
    setShowHint(false);
    setStatusMsg('Squash the bug and run your test!');
  }, [currentLevelIdx]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const verifyFix = async () => {
    setIsVerifying(true);
    setAttempts((prev) => prev + 1);

    try {
      const res = await fetch('/api/challenges/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: userCode, input: '' }),
      });
      const data = await res.json();

      const normalizedOutput = (data.stdout || '').trim().replace(/\r\n/g, '\n');
      const expected = currentLevel.expectedOutput.trim();

      if (data.success && normalizedOutput === expected) {
        const points = Math.max(50, 100 - attempts * 10 + (showHint ? -20 : 0));
        const newTotal = totalScore + points;
        setTotalScore(newTotal);
        setStatusMsg(`🎉 Bug squashed successfully! +${points} pts! ${currentLevel.explanation}`);
        try {
          confetti({ particleCount: 50, spread: 60 });
        } catch (e) {}

        if (currentLevelIdx < BUG_LEVELS.length - 1) {
          setTimeout(() => {
            setCurrentLevelIdx((prev) => prev + 1);
            setAttempts(0);
          }, 1800);
        } else {
          if (onComplete) onComplete(newTotal);
        }
      } else {
        setStatusMsg(
          data.error ||
            `Incorrect output. Expected:\n"${expected}"\nGot:\n"${normalizedOutput || data.stderr}"`
        );
      }
    } catch (err: any) {
      setStatusMsg(`Execution failed: ${err.message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Bug className="w-5 h-5 text-rose-400" />
            Game 2: Bug Hunter
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Stage {currentLevelIdx + 1} of {BUG_LEVELS.length} · {currentLevel.title}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono">
            <span className="text-slate-400">Score: </span>
            <span className="text-emerald-400 font-bold">{totalScore}</span>
          </div>
          <div className="text-xs font-mono">
            <span className="text-slate-400">Timer: </span>
            <span className={`font-bold ${timeLeft < 20 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-300">Editable Buggy Code:</span>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? 'Hide Hint' : 'Get Hint (-20 pts)'}
          </button>
        </div>

        {showHint && (
          <div className="mb-3 p-3 bg-amber-950/40 border border-amber-800/60 rounded-lg text-xs text-amber-200">
            <strong>Hint:</strong> {currentLevel.solutionHint}
          </div>
        )}

        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          rows={6}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-100 focus:outline-none focus:border-rose-500 leading-relaxed"
        />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Expected Output:{' '}
            <code className="text-emerald-400 font-mono bg-slate-950 px-2 py-0.5 rounded">
              {currentLevel.expectedOutput.replace(/\n/g, ' ')}
            </code>
          </span>
          <button
            onClick={verifyFix}
            disabled={isVerifying}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-rose-600/20 transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            {isVerifying ? 'Checking Fix...' : 'Verify Bug Fix'}
          </button>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">Status</div>
        <div>{statusMsg}</div>
      </div>
    </div>
  );
};
