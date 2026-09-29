import React, { useState } from 'react';
import { Compass, Play, RotateCcw, Shuffle, Sparkles } from 'lucide-react';

export const MazeSolverGame: React.FC<{ onComplete?: (score: number) => void }> = ({ onComplete }) => {
  const ROWS = 7;
  const COLS = 9;

  // 0: path, 1: wall, 2: start (0,0), 3: goal (6,8)
  const initialGrid = [
    [2, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 0, 0],
    [1, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 3],
  ];

  const [grid, setGrid] = useState<number[][]>(initialGrid);
  const [visitedCells, setVisitedCells] = useState<string[]>([]);
  const [pathCells, setPathCells] = useState<string[]>([]);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [algo, setAlgo] = useState<'BFS' | 'DFS'>('BFS');
  const [stats, setStats] = useState<{ visitedCount: number; pathLength: number } | null>(null);

  const reset = () => {
    setVisitedCells([]);
    setPathCells([]);
    setStats(null);
    setIsSolving(false);
  };

  const solveMaze = async (selectedAlgo: 'BFS' | 'DFS') => {
    if (isSolving) return;
    setIsSolving(true);
    reset();

    const start = { r: 0, c: 0 };
    const goal = { r: 6, c: 8 };

    const visitedSet = new Set<string>();
    const parentMap = new Map<string, string>();

    const dirs = [
      [0, 1], // right
      [1, 0], // down
      [0, -1], // left
      [-1, 0], // up
    ];

    const visitedList: string[] = [];

    if (selectedAlgo === 'BFS') {
      const queue = [start];
      visitedSet.add(`0,0`);

      let found = false;

      while (queue.length > 0) {
        const curr = queue.shift()!;
        const currKey = `${curr.r},${curr.c}`;
        visitedList.push(currKey);
        setVisitedCells([...visitedList]);
        await new Promise((r) => setTimeout(r, 40));

        if (curr.r === goal.r && curr.c === goal.c) {
          found = true;
          break;
        }

        for (const [dr, dc] of dirs) {
          const nr = curr.r + dr;
          const nc = curr.c + dc;
          const nKey = `${nr},${nc}`;

          if (
            nr >= 0 &&
            nr < ROWS &&
            nc >= 0 &&
            nc < COLS &&
            grid[nr][nc] !== 1 &&
            !visitedSet.has(nKey)
          ) {
            visitedSet.add(nKey);
            parentMap.set(nKey, currKey);
            queue.push({ r: nr, c: nc });
          }
        }
      }

      if (found) {
        // Reconstruct path
        const path: string[] = [];
        let curr = `${goal.r},${goal.c}`;
        while (curr) {
          path.push(curr);
          curr = parentMap.get(curr) || '';
        }
        setPathCells(path);
        setStats({ visitedCount: visitedList.length, pathLength: path.length });
        if (onComplete) onComplete(150);
      }
    } else {
      // DFS
      const stack = [start];
      visitedSet.add(`0,0`);
      let found = false;

      while (stack.length > 0) {
        const curr = stack.pop()!;
        const currKey = `${curr.r},${curr.c}`;
        visitedList.push(currKey);
        setVisitedCells([...visitedList]);
        await new Promise((r) => setTimeout(r, 45));

        if (curr.r === goal.r && curr.c === goal.c) {
          found = true;
          break;
        }

        for (const [dr, dc] of dirs) {
          const nr = curr.r + dr;
          const nc = curr.c + dc;
          const nKey = `${nr},${nc}`;

          if (
            nr >= 0 &&
            nr < ROWS &&
            nc >= 0 &&
            nc < COLS &&
            grid[nr][nc] !== 1 &&
            !visitedSet.has(nKey)
          ) {
            visitedSet.add(nKey);
            parentMap.set(nKey, currKey);
            stack.push({ r: nr, c: nc });
          }
        }
      }

      if (found) {
        const path: string[] = [];
        let curr = `${goal.r},${goal.c}`;
        while (curr) {
          path.push(curr);
          curr = parentMap.get(curr) || '';
        }
        setPathCells(path);
        setStats({ visitedCount: visitedList.length, pathLength: path.length });
        if (onComplete) onComplete(150);
      }
    }

    setIsSolving(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            Game 7: Maze Solver (BFS vs DFS Showdown)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare Breadth-First Search (guaranteed shortest path) vs Depth-First Search exploration.
          </p>
        </div>
        <button
          onClick={reset}
          disabled={isSolving}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Grid Rendering */}
      <div className="my-6 flex flex-col items-center justify-center p-4 bg-slate-950/70 rounded-xl border border-slate-800">
        <div className="grid grid-cols-9 gap-1 select-none">
          {grid.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              const key = `${rIdx},${cIdx}`;
              const isStart = cell === 2;
              const isGoal = cell === 3;
              const isWall = cell === 1;
              const isPath = pathCells.includes(key);
              const isVisited = visitedCells.includes(key);

              return (
                <div
                  key={key}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded flex items-center justify-center text-xs font-mono border transition-all duration-150 ${
                    isStart
                      ? 'bg-emerald-600 border-emerald-400 text-white font-bold'
                      : isGoal
                      ? 'bg-amber-600 border-amber-400 text-white font-bold'
                      : isPath
                      ? 'bg-yellow-400 border-yellow-300 text-slate-950 font-bold scale-95 shadow-md shadow-yellow-400/30'
                      : isVisited
                      ? 'bg-indigo-900/60 border-indigo-700 text-indigo-200'
                      : isWall
                      ? 'bg-slate-800 border-slate-700 text-slate-600'
                      : 'bg-slate-900/80 border-slate-800 text-slate-500'
                  }`}
                >
                  {isStart ? 'S' : isGoal ? 'G' : isWall ? '█' : ''}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Results / Stats */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono">
            <span className="text-slate-400 block mb-1">Explored Nodes</span>
            <span className="text-indigo-400 font-bold text-sm">{stats.visitedCount} cells</span>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono">
            <span className="text-slate-400 block mb-1">Final Path Length</span>
            <span className="text-emerald-400 font-bold text-sm">
              {stats.pathLength} steps{' '}
              {algo === 'BFS' ? '(Shortest Possible)' : '(Depth First)'}
            </span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => {
            setAlgo('BFS');
            solveMaze('BFS');
          }}
          disabled={isSolving}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-white" />
          Run BFS (Shortest Path)
        </button>
        <button
          onClick={() => {
            setAlgo('DFS');
            solveMaze('DFS');
          }}
          disabled={isSolving}
          className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-white" />
          Run DFS (Depth Search)
        </button>
      </div>
    </div>
  );
};
