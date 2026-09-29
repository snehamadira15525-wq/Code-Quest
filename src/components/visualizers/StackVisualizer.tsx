import React, { useState } from 'react';
import { Plus, ArrowDown, Eye, RotateCcw, CheckCircle2, AlertTriangle } from 'lucide-react';

export const StackVisualizer: React.FC = () => {
  const [stack, setStack] = useState<string[]>(['main()', 'fetch_data()', 'parse_json()']);
  const [inputValue, setInputValue] = useState<string>('render_ui()');
  const [message, setMessage] = useState<string>('Stack initialized with 3 call frames');
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);
  const [parenMode, setParenMode] = useState<boolean>(false);
  const [bracketString, setBracketString] = useState<string>('{[()]}');
  const [isValidatingBracket, setIsValidatingBracket] = useState<boolean>(false);
  const MAX_CAPACITY = 6;

  const pushItem = () => {
    if (!inputValue.trim()) return;
    if (stack.length >= MAX_CAPACITY) {
      setMessage('Stack Overflow Error! Max capacity reached.');
      return;
    }

    const newStack = [...stack, inputValue.trim()];
    setStack(newStack);
    setHighlightIdx(newStack.length - 1);
    setMessage(`Pushed "${inputValue.trim()}" onto top of stack (O(1)). Size: ${newStack.length}`);
    setInputValue('');
    setTimeout(() => setHighlightIdx(null), 800);
  };

  const popItem = () => {
    if (stack.length === 0) {
      setMessage('Stack Underflow Error! Cannot pop from an empty stack.');
      return;
    }

    const popped = stack[stack.length - 1];
    setHighlightIdx(stack.length - 1);
    setMessage(`Popping top element "${popped}" (O(1))...`);

    setTimeout(() => {
      setStack(stack.slice(0, -1));
      setHighlightIdx(null);
      setMessage(`Successfully popped "${popped}". Current top is now: ${stack.length > 1 ? stack[stack.length - 2] : 'None (Empty)'}`);
    }, 400);
  };

  const peekItem = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty — top is undefined.');
      return;
    }
    const topIdx = stack.length - 1;
    setHighlightIdx(topIdx);
    setMessage(`Peek top: "${stack[topIdx]}" at index [${topIdx}]. (No element removed)`);
    setTimeout(() => setHighlightIdx(null), 1200);
  };

  const resetStack = () => {
    setStack(['main()', 'fetch_data()', 'parse_json()']);
    setHighlightIdx(null);
    setMessage('Stack reset to initial frames.');
  };

  const runParenthesesSimulation = async () => {
    if (isValidatingBracket) return;
    setIsValidatingBracket(true);
    setStack([]);
    setMessage(`Testing bracket balance for: "${bracketString}"...`);
    await new Promise((r) => setTimeout(r, 600));

    const mapping: { [key: string]: string } = { ')': '(', '}': '{', ']': '[' };
    let currentStack: string[] = [];
    let isBalanced = true;

    for (let i = 0; i < bracketString.length; i++) {
      const char = bracketString[i];
      if (char === '(' || char === '{' || char === '[') {
        currentStack = [...currentStack, char];
        setStack([...currentStack]);
        setMessage(`Encountered open bracket "${char}" -> Pushed to stack.`);
        await new Promise((r) => setTimeout(r, 700));
      } else if (char in mapping) {
        if (currentStack.length === 0) {
          setMessage(`Mismatched close bracket "${char}" found with empty stack! Invalid.`);
          isBalanced = false;
          break;
        }
        const top = currentStack[currentStack.length - 1];
        if (top !== mapping[char]) {
          setMessage(`Mismatched bracket! Expected pair for "${top}", but encountered "${char}". Invalid.`);
          isBalanced = false;
          break;
        }
        currentStack = currentStack.slice(0, -1);
        setStack([...currentStack]);
        setMessage(`Matched pair "${mapping[char]}" & "${char}" -> Popped from stack!`);
        await new Promise((r) => setTimeout(r, 700));
      }
    }

    if (isBalanced && currentStack.length === 0) {
      setMessage(`All brackets matched perfectly! Valid expression.`);
    } else if (isBalanced) {
      setMessage(`Unclosed brackets remaining on stack! Invalid expression.`);
    }
    setIsValidatingBracket(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-white">Stack Tower (LIFO)</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Last-In, First-Out · Call Stacks · Bracket Matching · O(1) Push & Pop
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setParenMode(!parenMode)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              parenMode
                ? 'bg-purple-600/30 text-purple-300 border-purple-500/50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            {parenMode ? 'Mode: Bracket Simulation' : 'Mode: Call Stack'}
          </button>
          <button
            onClick={resetStack}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Visual Tower Container */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Tower Graphics */}
        <div className="md:col-span-6 flex flex-col items-center justify-end h-64 border-b-4 border-l-2 border-r-2 border-slate-700 rounded-b-xl p-3 bg-slate-950/40 relative">
          <div className="absolute top-2 left-3 text-[11px] font-mono text-slate-500">
            Capacity: {stack.length}/{MAX_CAPACITY}
          </div>
          {stack.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs text-slate-500 italic">
              Stack is currently empty
            </div>
          ) : (
            <div className="w-full flex flex-col-reverse gap-1.5 justify-start">
              {stack.map((item, idx) => {
                const isTop = idx === stack.length - 1;
                const isHighlighted = highlightIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-between font-mono text-xs border transition-all duration-300 shadow-sm ${
                      isHighlighted
                        ? 'bg-amber-500/30 border-amber-400 text-white scale-102'
                        : isTop
                        ? 'bg-emerald-600/30 border-emerald-500/70 text-emerald-200'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] text-slate-500">[{idx}]</span>
                      <span className="font-semibold truncate">{item}</span>
                    </div>
                    {isTop && (
                      <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        TOP ➔
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Real-time Insights */}
        <div className="md:col-span-6 flex flex-col gap-3">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Stack Diagnostics</span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Top Element</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {stack.length > 0 ? stack[stack.length - 1] : 'None'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Total Frames</span>
                <span className="font-mono text-slate-200 font-bold">{stack.length}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Push Cost</span>
                <span className="font-mono text-indigo-400">O(1) Constant</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Pop Cost</span>
                <span className="font-mono text-indigo-400">O(1) Constant</span>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300">
            <span className="text-emerald-400 font-bold mr-2">&gt;</span>
            {message}
          </div>
        </div>
      </div>

      {/* Control Actions */}
      {!parenMode ? (
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="flex-1 min-w-[200px] flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && pushItem()}
              placeholder="e.g. calculate_sum()"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={pushItem}
              className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Push
            </button>
          </div>
          <button
            onClick={popItem}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-medium transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
            Pop
          </button>
          <button
            onClick={peekItem}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Peek
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <input
            type="text"
            value={bracketString}
            onChange={(e) => setBracketString(e.target.value)}
            disabled={isValidatingBracket}
            placeholder="e.g. {[()]}"
            className="flex-1 min-w-[200px] bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={runParenthesesSimulation}
            disabled={isValidatingBracket}
            className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isValidatingBracket ? 'Validating...' : 'Validate Matching'}
          </button>
        </div>
      )}
    </div>
  );
};
