import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Shuffle, Sparkles } from 'lucide-react';

export const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([45, 12, 85, 32, 89, 21, 64, 53, 9, 78, 36, 95]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<'bubble' | 'selection' | 'insertion' | 'quick'>('bubble');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [speedMs, setSpeedMs] = useState<number>(100);

  const isRunningRef = useRef<boolean>(false);
  isRunningRef.current = isRunning;

  const generateRandomArray = () => {
    if (isRunning) return;
    const newArr = Array.from({ length: 14 }, () => Math.floor(Math.random() * 85) + 15);
    setArray(newArr);
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const runBubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let compCount = 0;
    let swapCount = 0;
    const sorted: number[] = [];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isRunningRef.current) return;
        setActiveIndices([j, j + 1]);
        compCount++;
        setComparisons(compCount);
        await sleep(speedMs);

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapCount++;
          setSwaps(swapCount);
          setArray([...arr]);
          await sleep(speedMs);
        }
      }
      sorted.push(n - i - 1);
      setSortedIndices([...sorted]);
    }

    setActiveIndices([]);
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setIsRunning(false);
  };

  const runSelectionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let compCount = 0;
    let swapCount = 0;
    const sorted: number[] = [];

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (!isRunningRef.current) return;
        setActiveIndices([minIdx, j]);
        compCount++;
        setComparisons(compCount);
        await sleep(speedMs);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        swapCount++;
        setSwaps(swapCount);
        setArray([...arr]);
        await sleep(speedMs);
      }

      sorted.push(i);
      setSortedIndices([...sorted]);
    }

    setActiveIndices([]);
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setIsRunning(false);
  };

  const runInsertionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let compCount = 0;
    let swapCount = 0;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0) {
        if (!isRunningRef.current) return;
        setActiveIndices([j, j + 1]);
        compCount++;
        setComparisons(compCount);
        await sleep(speedMs);

        if (arr[j] > key) {
          arr[j + 1] = arr[j];
          swapCount++;
          setSwaps(swapCount);
          setArray([...arr]);
          j--;
          await sleep(speedMs);
        } else {
          break;
        }
      }
      arr[j + 1] = key;
      setArray([...arr]);
      setSortedIndices(Array.from({ length: i + 1 }, (_, k) => k));
    }

    setActiveIndices([]);
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setIsRunning(false);
  };

  const startSort = () => {
    if (isRunning) {
      setIsRunning(false);
      return;
    }

    setIsRunning(true);
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);

    setTimeout(() => {
      if (algorithm === 'bubble') runBubbleSort();
      else if (algorithm === 'selection') runSelectionSort();
      else if (algorithm === 'insertion') runInsertionSort();
      else runBubbleSort();
    }, 50);
  };

  const complexityInfo = {
    bubble: { time: 'O(N²)', space: 'O(1)', desc: 'Repeatedly steps through list, swapping adjacent out-of-order elements.' },
    selection: { time: 'O(N²)', space: 'O(1)', desc: 'Finds minimum item in unsorted slice and places it at the beginning.' },
    insertion: { time: 'O(N²)', space: 'O(1)', desc: 'Builds sorted array one element at a time like arranging playing cards.' },
    quick: { time: 'O(N log N)', space: 'O(log N)', desc: 'Divides array around a pivot element into smaller sub-arrays.' },
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-white">Interactive Sorting Visualizer</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time Swaps, Comparisons & Big-O Time Complexity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={generateRandomArray}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Shuffle
          </button>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="my-6 h-56 bg-slate-950/60 rounded-xl border border-slate-800 p-4 flex items-end justify-center gap-2">
        {array.map((val, idx) => {
          const isActive = activeIndices.includes(idx);
          const isSorted = sortedIndices.includes(idx);

          return (
            <div key={idx} className="flex-1 flex flex-col items-center max-w-[40px] h-full justify-end group">
              <span className="text-[10px] font-mono text-slate-400 mb-1 opacity-80 group-hover:opacity-100">
                {val}
              </span>
              <div
                style={{ height: `${(val / 100) * 100}%` }}
                className={`w-full rounded-t-md transition-all duration-150 ${
                  isActive
                    ? 'bg-amber-400 shadow-lg shadow-amber-500/30'
                    : isSorted
                    ? 'bg-emerald-500 shadow-sm shadow-emerald-500/20'
                    : 'bg-indigo-600/80 hover:bg-indigo-500'
                }`}
              />
              <span className="text-[9px] font-mono text-slate-500 mt-1">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
          <span className="text-[11px] text-slate-400 block">Comparisons</span>
          <span className="text-base font-bold font-mono text-amber-400">{comparisons}</span>
        </div>
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
          <span className="text-[11px] text-slate-400 block">Swaps</span>
          <span className="text-base font-bold font-mono text-emerald-400">{swaps}</span>
        </div>
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
          <span className="text-[11px] text-slate-400 block">Time Complexity</span>
          <span className="text-base font-bold font-mono text-indigo-400">
            {complexityInfo[algorithm].time}
          </span>
        </div>
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
          <span className="text-[11px] text-slate-400 block">Space Complexity</span>
          <span className="text-base font-bold font-mono text-purple-400">
            {complexityInfo[algorithm].space}
          </span>
        </div>
      </div>

      {/* Control panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          {(['bubble', 'selection', 'insertion'] as const).map((algoKey) => (
            <button
              key={algoKey}
              onClick={() => {
                if (!isRunning) setAlgorithm(algoKey);
              }}
              disabled={isRunning}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                algorithm === algoKey
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {algoKey} Sort
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Speed:</span>
            <input
              type="range"
              min="20"
              max="300"
              step="20"
              value={320 - speedMs}
              onChange={(e) => setSpeedMs(320 - parseInt(e.target.value, 10))}
              disabled={isRunning}
              className="w-20 accent-indigo-500 cursor-pointer"
            />
          </div>

          <button
            onClick={startSort}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-colors shadow-md ${
              isRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Stop
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Start Sort
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
