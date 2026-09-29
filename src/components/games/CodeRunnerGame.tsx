import React, { useState } from 'react';
import { Play, RotateCcw, Award, CheckCircle2, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GridPos {
  r: number;
  c: number;
  dir: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
}

export const CodeRunnerGame: React.FC<{ onComplete?: (score: number) => void }> = ({ onComplete }) => {
  const GRID_SIZE = 5;
  // 0: empty, 1: lava hazard, 2: gem goal
  const LEVEL_MAP = [
    [0, 0, 0, 1, 2],
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ];

  const INITIAL_POS: GridPos = { r: 4, c: 0, dir: 'UP' };
  const [playerPos, setPlayerPos] = useState<GridPos>(INITIAL_POS);
  const [code, setCode] = useState<string>(`# Write Python movement commands to guide the hero:
# Available functions:
# move_forward()
# turn_left()
# turn_right()

# Reach the Gem [💎] at row 0, col 4!
for step in range(2):
    move_forward()
turn_right()
move_forward()
move_forward()
turn_left()
move_forward()
move_forward()
turn_right()
move_forward()
move_forward()
`);
  const [logs, setLogs] = useState<string[]>(['Hero is ready at start position (row 4, col 0)']);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  const resetGame = () => {
    setPlayerPos(INITIAL_POS);
    setLogs(['Hero reset to starting position.']);
    setIsRunning(false);
    setGameWon(false);
  };

  const runCodeSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setGameWon(false);
    let currentPos: GridPos = { ...INITIAL_POS };
    setPlayerPos(currentPos);

    const newLogs: string[] = ['Executing script...'];
    setLogs([...newLogs]);

    // Parse commands from user code: supports move_forward(), turn_right(), turn_left(), and basic for loops: for ... in range(N):
    const lines = code.split('\n');
    const expandedCommands: string[] = [];

    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();
      const loopMatch = line.match(/^for\s+\w+\s+in\s+range\s*\(\s*(\d+)\s*\)\s*:/);
      if (loopMatch) {
        const repeatCount = parseInt(loopMatch[1], 10);
        i++;
        const loopBody: string[] = [];
        while (i < lines.length && (lines[i].startsWith('    ') || lines[i].startsWith('\t'))) {
          loopBody.push(lines[i].trim());
          i++;
        }
        for (let r = 0; r < repeatCount; r++) {
          expandedCommands.push(...loopBody);
        }
        continue;
      } else if (line && !line.startsWith('#')) {
        expandedCommands.push(line);
      }
      i++;
    }

    // Directions cycle
    const dirCycle: ('UP' | 'RIGHT' | 'DOWN' | 'LEFT')[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];

    for (const cmd of expandedCommands) {
      await new Promise((r) => setTimeout(r, 450));

      if (cmd === 'turn_right()') {
        const nextIdx = (dirCycle.indexOf(currentPos.dir) + 1) % 4;
        currentPos = { ...currentPos, dir: dirCycle[nextIdx] };
        setPlayerPos(currentPos);
        newLogs.push(`Turned right ➔ now facing ${currentPos.dir}`);
        setLogs([...newLogs]);
      } else if (cmd === 'turn_left()') {
        const nextIdx = (dirCycle.indexOf(currentPos.dir) + 3) % 4;
        currentPos = { ...currentPos, dir: dirCycle[nextIdx] };
        setPlayerPos(currentPos);
        newLogs.push(`Turned left ➔ now facing ${currentPos.dir}`);
        setLogs([...newLogs]);
      } else if (cmd === 'move_forward()') {
        let { r, c, dir } = currentPos;
        if (dir === 'UP') r -= 1;
        else if (dir === 'RIGHT') c += 1;
        else if (dir === 'DOWN') r += 1;
        else if (dir === 'LEFT') c -= 1;

        // Check boundaries
        if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) {
          newLogs.push(`Crash! Hero hit the border wall at (${r}, ${c})!`);
          setLogs([...newLogs]);
          setIsRunning(false);
          return;
        }

        // Check lava
        if (LEVEL_MAP[r][c] === 1) {
          currentPos = { ...currentPos, r, c };
          setPlayerPos(currentPos);
          newLogs.push(`Oh no! Hero stepped into LAVA [🔥] at (${r}, ${c})! Mission failed.`);
          setLogs([...newLogs]);
          setIsRunning(false);
          return;
        }

        currentPos = { ...currentPos, r, c };
        setPlayerPos(currentPos);
        newLogs.push(`Stepped forward to (${r}, ${c})`);
        setLogs([...newLogs]);

        // Check goal
        if (LEVEL_MAP[r][c] === 2) {
          newLogs.push('🎉 VICTORY! Gem collected! Mission completed successfully!');
          setLogs([...newLogs]);
          setGameWon(true);
          setIsRunning(false);
          try {
            confetti({ particleCount: 90, spread: 60 });
          } catch (e) {}
          if (onComplete) onComplete(150);
          return;
        }
      }
    }

    if (!gameWon && LEVEL_MAP[currentPos.r][currentPos.c] !== 2) {
      newLogs.push('Execution finished, but hero did not reach the gem.');
      setLogs([...newLogs]);
    }
    setIsRunning(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            🕹️ Game 1: Code Runner
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Write sequential Python commands & loops to guide the hero safely to the diamond.
          </p>
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        {/* Grid Map Canvas */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-xl border border-slate-800">
          <div className="grid grid-cols-5 gap-2 select-none">
            {LEVEL_MAP.map((row, rIdx) =>
              row.map((cellType, cIdx) => {
                const isHero = playerPos.r === rIdx && playerPos.c === cIdx;
                const isLava = cellType === 1;
                const isGoal = cellType === 2;

                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex flex-col items-center justify-center border font-mono text-xs relative transition-all duration-300 shadow-inner ${
                      isLava
                        ? 'bg-rose-950/70 border-rose-800 text-rose-300'
                        : isGoal
                        ? 'bg-emerald-950/70 border-emerald-600 text-emerald-300 animate-pulse'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {isHero ? (
                      <div className="flex flex-col items-center">
                        <span className="text-2xl animate-bounce">🧙‍♂️</span>
                        <span className="text-[9px] font-bold text-emerald-400">
                          {playerPos.dir === 'UP'
                            ? '▲'
                            : playerPos.dir === 'RIGHT'
                            ? '▶'
                            : playerPos.dir === 'DOWN'
                            ? '▼'
                            : '◀'}
                        </span>
                      </div>
                    ) : isGoal ? (
                      <span className="text-2xl">💎</span>
                    ) : isLava ? (
                      <span className="text-2xl">🔥</span>
                    ) : (
                      <span className="text-[10px] text-slate-700">
                        {rIdx},{cIdx}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="flex items-center gap-4 mt-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="text-base">🧙‍♂️</span> Hero
            </span>
            <span className="flex items-center gap-1">
              <span className="text-base">💎</span> Goal
            </span>
            <span className="flex items-center gap-1">
              <span className="text-base">🔥</span> Lava
            </span>
          </div>
        </div>

        {/* Code Editor */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-slate-950 border-t border-x border-slate-800 rounded-t-lg">
            <span className="text-xs font-mono text-slate-400">bot_script.py</span>
            <span className="text-[11px] text-emerald-400 font-mono">Python 3</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isRunning}
            rows={10}
            className="w-full bg-slate-950 border border-slate-800 px-4 py-3 font-mono text-xs text-slate-100 focus:outline-none focus:border-emerald-500 rounded-b-lg resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-slate-400">
              Reward: <strong className="text-amber-400 font-mono">+120 XP</strong>
            </span>
            <button
              onClick={runCodeSimulation}
              disabled={isRunning}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-white" />
              {isRunning ? 'Running Commands...' : 'Run Python Code'}
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 max-h-32 overflow-y-auto">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-bold">
          Console Output
        </div>
        {logs.map((log, i) => (
          <div key={i} className="leading-5">
            <span className="text-emerald-500 mr-2">&gt;</span>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};
