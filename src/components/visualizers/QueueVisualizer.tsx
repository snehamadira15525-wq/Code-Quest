import React, { useState } from 'react';
import { Plus, ArrowRight, RotateCcw, Clock } from 'lucide-react';

export const QueueVisualizer: React.FC = () => {
  const [queue, setQueue] = useState<string[]>([
    'Request #1 (Auth)',
    'Request #2 (Query)',
    'Request #3 (Save)',
  ]);
  const [inputVal, setInputVal] = useState<string>('Request #4');
  const [message, setMessage] = useState<string>('Queue initialized with 3 requests in FIFO pipeline');
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);

  const enqueue = () => {
    if (!inputVal.trim()) return;
    if (queue.length >= 8) {
      setMessage('Queue buffer full! Process items before adding more.');
      return;
    }

    const nextQueue = [...queue, inputVal.trim()];
    setQueue(nextQueue);
    setHighlightIdx(nextQueue.length - 1);
    setMessage(`Enqueued "${inputVal.trim()}" at rear pointer (O(1)). Queue length: ${nextQueue.length}`);
    setInputVal(`Request #${Date.now().toString().slice(-3)}`);
    setTimeout(() => setHighlightIdx(null), 700);
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty! Nothing to dequeue.');
      return;
    }

    const served = queue[0];
    setHighlightIdx(0);
    setMessage(`Serving "${served}" from front pointer...`);

    setTimeout(() => {
      setQueue(queue.slice(1));
      setHighlightIdx(null);
      setMessage(`Successfully dequeued "${served}" in O(1) using collections.deque.popleft()!`);
    }, 450);
  };

  const reset = () => {
    setQueue(['Request #1 (Auth)', 'Request #2 (Query)', 'Request #3 (Save)']);
    setHighlightIdx(null);
    setMessage('Queue reset to initial pipeline.');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-white">Queue Pipeline (FIFO)</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            First-In, First-Out · Front (Exit) & Rear (Entry) · collections.deque
          </p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Visual Pipeline */}
      <div className="my-8 flex flex-col items-center">
        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 px-4 mb-2">
          <span className="text-amber-400 font-bold flex items-center gap-1">
            ◄ FRONT (Dequeue Exit)
          </span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            REAR (Enqueue Entry) ◄
          </span>
        </div>

        {/* Horizontal Tunnel */}
        <div className="w-full min-h-[110px] bg-slate-950/70 border-y-2 border-slate-700 p-3 rounded-lg flex items-center gap-3 overflow-x-auto">
          {queue.length === 0 ? (
            <div className="w-full text-center text-xs text-slate-500 italic">
              Queue is completely empty. Add requests at rear.
            </div>
          ) : (
            queue.map((item, idx) => {
              const isFront = idx === 0;
              const isRear = idx === queue.length - 1;
              const isHighlighted = highlightIdx === idx;

              return (
                <div
                  key={idx}
                  className={`flex-shrink-0 min-w-[140px] px-3 py-3 rounded-lg border text-xs font-mono transition-all duration-300 shadow-md ${
                    isHighlighted
                      ? 'bg-amber-500/30 border-amber-400 text-white scale-105'
                      : isFront
                      ? 'bg-amber-600/20 border-amber-500 text-amber-200'
                      : isRear
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-200'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span>idx [{idx}]</span>
                    {isFront && <span className="font-bold text-amber-400">FRONT</span>}
                    {isRear && !isFront && <span className="font-bold text-emerald-400">REAR</span>}
                  </div>
                  <div className="font-semibold truncate">{item}</div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Diagnostics */}
      <div className="px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 mb-6">
        <span className="text-emerald-400 font-bold mr-2">&gt;</span>
        {message}
      </div>

      {/* Action controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[200px] flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enqueue()}
            placeholder="e.g. Request #4"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={enqueue}
            className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Enqueue (Rear)
          </button>
        </div>
        <button
          onClick={dequeue}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-medium transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          Dequeue (Front)
        </button>
      </div>
    </div>
  );
};
