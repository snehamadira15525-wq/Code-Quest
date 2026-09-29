import React, { useState } from 'react';
import { Play, RotateCcw, Plus, Trash2, Search, ArrowLeftRight, Check, AlertCircle } from 'lucide-react';

export const ArrayVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([12, 28, 45, 67, 89, 94]);
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]);
  const [pointers, setPointers] = useState<{ [key: string]: number }>({});
  const [statusMessage, setStatusMessage] = useState<string>('Ready for array operations');
  const [inputValue, setInputValue] = useState<string>('50');
  const [inputIndex, setInputIndex] = useState<string>('2');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const resetArray = () => {
    setArray([12, 28, 45, 67, 89, 94]);
    setHighlightIndices([]);
    setPointers({});
    setStatusMessage('Array reset to initial state');
  };

  const handleSearch = async () => {
    if (isAnimating) return;
    const target = parseInt(inputValue, 10);
    if (isNaN(target)) {
      setStatusMessage('Enter a valid integer to search');
      return;
    }

    setIsAnimating(true);
    setStatusMessage(`Scanning sequentially for target value: ${target}...`);

    for (let i = 0; i < array.length; i++) {
      setPointers({ 'Scan Pointer': i });
      setHighlightIndices([i]);
      setStatusMessage(`Step ${i + 1}: Checking index [${i}] (value ${array[i]})...`);
      await new Promise((r) => setTimeout(r, 600));

      if (array[i] === target) {
        setStatusMessage(`Match found! Element ${target} located at index ${i}`);
        setIsAnimating(false);
        return;
      }
    }

    setPointers({});
    setHighlightIndices([]);
    setStatusMessage(`Target ${target} not found in array (completed in ${array.length} steps)`);
    setIsAnimating(false);
  };

  const handleInsert = async () => {
    if (isAnimating) return;
    const val = parseInt(inputValue, 10);
    let idx = parseInt(inputIndex, 10);

    if (isNaN(val)) {
      setStatusMessage('Please enter a valid value to insert');
      return;
    }
    if (isNaN(idx) || idx < 0) idx = 0;
    if (idx > array.length) idx = array.length;

    setIsAnimating(true);
    setStatusMessage(`Inserting ${val} at index [${idx}]. Elements from [${idx}] to end will shift right (O(N) cost).`);

    // Show shifting visualization
    setPointers({ 'Insert Slot': idx });
    await new Promise((r) => setTimeout(r, 700));

    const newArr = [...array.slice(0, idx), val, ...array.slice(idx)];
    setArray(newArr);
    setHighlightIndices([idx]);
    setStatusMessage(`Successfully inserted ${val} at index [${idx}]!`);
    setIsAnimating(false);
  };

  const handleDelete = async () => {
    if (isAnimating) return;
    let idx = parseInt(inputIndex, 10);
    if (isNaN(idx) || idx < 0 || idx >= array.length) {
      setStatusMessage(`Invalid index. Must be between 0 and ${array.length - 1}`);
      return;
    }

    setIsAnimating(true);
    setPointers({ 'Delete Target': idx });
    setHighlightIndices([idx]);
    setStatusMessage(`Removing element ${array[idx]} at index [${idx}]...`);
    await new Promise((r) => setTimeout(r, 700));

    const removed = array[idx];
    const newArr = array.filter((_, i) => i !== idx);
    setArray(newArr);
    setPointers({});
    setHighlightIndices([]);
    setStatusMessage(`Deleted ${removed}. Remaining elements shifted left to fill contiguous space.`);
    setIsAnimating(false);
  };

  const handleReverse = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStatusMessage('Two Pointers Reversal: left = 0, right = N - 1 moving toward center.');

    const temp = [...array];
    let left = 0;
    let right = temp.length - 1;

    while (left < right) {
      setPointers({ Left: left, Right: right });
      setHighlightIndices([left, right]);
      setStatusMessage(`Swapping array[${left}] (${temp[left]}) with array[${right}] (${temp[right]})...`);
      await new Promise((r) => setTimeout(r, 800));

      const swap = temp[left];
      temp[left] = temp[right];
      temp[right] = swap;
      setArray([...temp]);

      left++;
      right--;
    }

    setPointers({});
    setHighlightIndices([]);
    setStatusMessage('Array reversed in-place in O(N/2) swaps with O(1) extra space!');
    setIsAnimating(false);
  };

  const handleFindMax = () => {
    if (array.length === 0) return;
    let maxIdx = 0;
    for (let i = 1; i < array.length; i++) {
      if (array[i] > array[maxIdx]) maxIdx = i;
    }
    setHighlightIndices([maxIdx]);
    setPointers({ Maximum: maxIdx });
    setStatusMessage(`Maximum element is ${array[maxIdx]} at index [${maxIdx}]`);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-white">Interactive Array Visualizer</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Contiguous Memory Blocks · O(1) Index Access · O(N) Shift Insertion
          </p>
        </div>
        <button
          onClick={resetArray}
          disabled={isAnimating}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Array
        </button>
      </div>

      {/* Array Canvas */}
      <div className="my-8 flex flex-col items-center justify-center min-h-[170px]">
        <div className="flex flex-wrap items-end justify-center gap-2">
          {array.map((val, idx) => {
            const isHighlighted = highlightIndices.includes(idx);
            const activePointerKeys = Object.keys(pointers).filter((k) => pointers[k] === idx);

            return (
              <div key={idx} className="flex flex-col items-center group">
                {/* Pointer indicator */}
                <div className="h-6 flex items-center justify-center text-xs font-mono font-semibold text-emerald-400 transition-all">
                  {activePointerKeys.length > 0 && (
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded text-[11px] animate-pulse">
                      {activePointerKeys.join(' & ')}
                    </span>
                  )}
                </div>

                {/* Array Block */}
                <div
                  className={`w-14 h-16 sm:w-16 sm:h-18 rounded-lg flex flex-col items-center justify-center border transition-all duration-300 select-none shadow-md ${
                    isHighlighted
                      ? 'bg-emerald-600/30 border-emerald-400 text-white scale-105 shadow-emerald-500/20'
                      : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <span className="text-lg font-bold font-mono">{val}</span>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                    0x{(1000 + idx * 4).toString(16).toUpperCase()}
                  </span>
                </div>

                {/* Index label */}
                <div className="mt-2 text-xs font-mono text-slate-400">
                  idx: <span className="font-semibold text-slate-300">[{idx}]</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-300 mb-6 font-mono">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>{statusMessage}</span>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Value and Index Inputs */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Value (Integer)</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isAnimating}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              placeholder="e.g. 50"
            />
          </div>
          <div className="w-28">
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Index [i]</label>
            <input
              type="number"
              value={inputIndex}
              onChange={(e) => setInputIndex(e.target.value)}
              disabled={isAnimating}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              placeholder="0 to N"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-end gap-2">
          <button
            onClick={handleSearch}
            disabled={isAnimating}
            className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            <Search className="w-3.5 h-3.5" />
            Search
          </button>
          <button
            onClick={handleInsert}
            disabled={isAnimating}
            className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            Insert
          </button>
          <button
            onClick={handleDelete}
            disabled={isAnimating}
            className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
          <button
            onClick={handleReverse}
            disabled={isAnimating}
            className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Reverse
          </button>
          <button
            onClick={handleFindMax}
            disabled={isAnimating}
            className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            Find Max
          </button>
        </div>
      </div>
    </div>
  );
};
