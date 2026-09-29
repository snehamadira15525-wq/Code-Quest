import React, { useState } from 'react';
import { Play, RotateCcw, Share2 } from 'lucide-react';

interface GraphNode {
  id: string;
  x: number;
  y: number;
}

interface GraphEdge {
  from: string;
  to: string;
}

export const GraphVisualizer: React.FC = () => {
  const nodes: GraphNode[] = [
    { id: 'A', x: 80, y: 110 },
    { id: 'B', x: 190, y: 50 },
    { id: 'C', x: 190, y: 170 },
    { id: 'D', x: 310, y: 50 },
    { id: 'E', x: 310, y: 170 },
    { id: 'F', x: 420, y: 110 },
  ];

  const edges: GraphEdge[] = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'B', to: 'E' },
    { from: 'C', to: 'E' },
    { from: 'D', to: 'F' },
    { from: 'E', to: 'F' },
  ];

  const adjacency: { [key: string]: string[] } = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'E'],
    D: ['B', 'F'],
    E: ['B', 'C', 'F'],
    F: ['D', 'E'],
  };

  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [queueOrStack, setQueueOrStack] = useState<string[]>([]);
  const [statusMsg, setStatusMsg] = useState<string>('Graph ready. Select BFS (Queue) or DFS (Stack) traversal.');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [traversalType, setTraversalType] = useState<'BFS' | 'DFS'>('BFS');

  const reset = () => {
    setActiveNode(null);
    setVisitedNodes([]);
    setQueueOrStack([]);
    setStatusMsg('Graph reset.');
    setIsRunning(false);
  };

  const runBFS = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setTraversalType('BFS');
    setVisitedNodes([]);
    setQueueOrStack(['A']);
    setStatusMsg('Starting BFS from Node A. Queue initialized: [A]');
    await new Promise((r) => setTimeout(r, 700));

    const visited: string[] = [];
    const queue: string[] = ['A'];

    while (queue.length > 0) {
      const curr = queue.shift()!;
      setQueueOrStack([...queue]);
      setActiveNode(curr);

      if (!visited.includes(curr)) {
        visited.push(curr);
        setVisitedNodes([...visited]);
        setStatusMsg(`Dequeued node "${curr}". Marked as visited.`);
        await new Promise((r) => setTimeout(r, 700));

        const neighbors = adjacency[curr] || [];
        for (const n of neighbors) {
          if (!visited.includes(n) && !queue.includes(n)) {
            queue.push(n);
            setQueueOrStack([...queue]);
            setStatusMsg(`Enqueued unvisited neighbor "${n}" into queue.`);
            await new Promise((r) => setTimeout(r, 500));
          }
        }
      }
    }

    setActiveNode(null);
    setStatusMsg(`BFS Traversal Complete! Order: ${visited.join(' ➔ ')}`);
    setIsRunning(false);
  };

  const runDFS = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setTraversalType('DFS');
    setVisitedNodes([]);
    setQueueOrStack(['A']);
    setStatusMsg('Starting DFS from Node A. Call stack initialized: [A]');
    await new Promise((r) => setTimeout(r, 700));

    const visited: string[] = [];
    const stack: string[] = ['A'];

    while (stack.length > 0) {
      const curr = stack.pop()!;
      setQueueOrStack([...stack]);
      setActiveNode(curr);

      if (!visited.includes(curr)) {
        visited.push(curr);
        setVisitedNodes([...visited]);
        setStatusMsg(`Popped node "${curr}" from stack. Exploring deeply.`);
        await new Promise((r) => setTimeout(r, 700));

        const neighbors = adjacency[curr] || [];
        for (const n of neighbors) {
          if (!visited.includes(n)) {
            stack.push(n);
            setQueueOrStack([...stack]);
            setStatusMsg(`Pushed neighbor "${n}" onto call stack.`);
            await new Promise((r) => setTimeout(r, 500));
          }
        }
      }
    }

    setActiveNode(null);
    setStatusMsg(`DFS Traversal Complete! Order: ${visited.join(' ➔ ')}`);
    setIsRunning(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-white">Graph Explorer & Visualizer</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Adjacency Lists · BFS (Queue Shortest Path) · DFS (Recursion / Stack)
          </p>
        </div>
        <button
          onClick={reset}
          disabled={isRunning}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* SVG Graph Canvas */}
      <div className="my-4 bg-slate-950/60 rounded-xl border border-slate-800 p-2 flex items-center justify-center">
        <svg viewBox="0 0 500 220" className="w-full h-52 select-none">
          {/* Edges */}
          {edges.map((e, idx) => {
            const fromNode = nodes.find((n) => n.id === e.from)!;
            const toNode = nodes.find((n) => n.id === e.to)!;
            const isConnectedVisited = visitedNodes.includes(e.from) && visitedNodes.includes(e.to);

            return (
              <line
                key={idx}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isConnectedVisited ? '#10b981' : '#475569'}
                strokeWidth={isConnectedVisited ? '3' : '2'}
                strokeDasharray={isConnectedVisited ? undefined : '4 2'}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isActive = activeNode === node.id;
            const isVisited = visitedNodes.includes(node.id);

            return (
              <g key={node.id} className="transition-all duration-300">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={22}
                  fill={isActive ? '#f59e0b' : isVisited ? '#10b981' : '#1e293b'}
                  stroke={isActive ? '#fbbf24' : isVisited ? '#34d399' : '#64748b'}
                  strokeWidth="2.5"
                  className="transition-colors duration-200"
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal State Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono">
          <span className="text-slate-400 block mb-1 text-[11px]">
            {traversalType === 'BFS' ? 'BFS QUEUE (FIFO)' : 'DFS CALL STACK (LIFO)'}
          </span>
          <span className="text-emerald-300 font-bold">
            {queueOrStack.length > 0 ? `[ ${queueOrStack.join(' , ')} ]` : 'Empty'}
          </span>
        </div>
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono">
          <span className="text-slate-400 block mb-1 text-[11px]">VISITED SET</span>
          <span className="text-indigo-300 font-bold">
            {visitedNodes.length > 0 ? `{ ${visitedNodes.join(', ')} }` : 'None'}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 mb-6">
        <span className="text-emerald-400 font-bold mr-2">&gt;</span>
        {statusMsg}
      </div>

      {/* Traversal Trigger Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={runBFS}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5" />
          Run BFS (Shortest Path Queue)
        </button>
        <button
          onClick={runDFS}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5" />
          Run DFS (Depth Exploration)
        </button>
      </div>
    </div>
  );
};
