import React, { useState } from 'react';
import { Plus, Search, RotateCcw, Play } from 'lucide-react';

interface TreeNodeData {
  val: number;
  left?: TreeNodeData;
  right?: TreeNodeData;
  x?: number;
  y?: number;
}

export const TreeVisualizer: React.FC = () => {
  // Initial BST
  const initialTree: TreeNodeData = {
    val: 50,
    left: {
      val: 30,
      left: { val: 20 },
      right: { val: 40 },
    },
    right: {
      val: 70,
      left: { val: 60 },
      right: { val: 85 },
    },
  };

  const [root, setRoot] = useState<TreeNodeData>(initialTree);
  const [inputValue, setInputValue] = useState<string>('45');
  const [activeNodeVal, setActiveNodeVal] = useState<number | null>(null);
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [traversalName, setTraversalName] = useState<string>('');
  const [message, setMessage] = useState<string>('Binary Search Tree ready. Left < Node < Right.');
  const [isTraversing, setIsTraversing] = useState<boolean>(false);

  const reset = () => {
    setRoot(initialTree);
    setActiveNodeVal(null);
    setTraversalResult([]);
    setTraversalName('');
    setMessage('Tree reset to default BST.');
  };

  // Helper to clone tree
  const cloneTree = (node?: TreeNodeData): TreeNodeData | undefined => {
    if (!node) return undefined;
    return {
      val: node.val,
      left: cloneTree(node.left),
      right: cloneTree(node.right),
    };
  };

  const insertNode = async () => {
    if (isTraversing) return;
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;

    setIsTraversing(true);
    setMessage(`Searching insertion slot for ${val}...`);

    let currentTree = cloneTree(root);
    if (!currentTree) {
      setRoot({ val });
      setIsTraversing(false);
      return;
    }

    let curr: TreeNodeData | undefined = currentTree;
    let parent: TreeNodeData | null = null;
    let isLeft = false;

    while (curr) {
      setActiveNodeVal(curr.val);
      setMessage(`Comparing ${val} with current node ${curr.val}...`);
      await new Promise((r) => setTimeout(r, 600));

      if (val === curr.val) {
        setMessage(`Value ${val} already exists in BST! BSTs store unique keys.`);
        setActiveNodeVal(null);
        setIsTraversing(false);
        return;
      }

      parent = curr;
      if (val < curr.val) {
        setMessage(`${val} < ${curr.val} -> Branching LEFT`);
        curr = curr.left;
        isLeft = true;
      } else {
        setMessage(`${val} > ${curr.val} -> Branching RIGHT`);
        curr = curr.right;
        isLeft = false;
      }
      await new Promise((r) => setTimeout(r, 400));
    }

    if (parent) {
      if (isLeft) parent.left = { val };
      else parent.right = { val };
    }

    setRoot(currentTree);
    setActiveNodeVal(val);
    setMessage(`Inserted ${val} into BST successfully (O(log N) average cost).`);
    setInputValue('');
    setTimeout(() => {
      setActiveNodeVal(null);
      setIsTraversing(false);
    }, 800);
  };

  const searchNode = async () => {
    if (isTraversing) return;
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;

    setIsTraversing(true);
    let curr: TreeNodeData | undefined = root;
    let found = false;

    while (curr) {
      setActiveNodeVal(curr.val);
      setMessage(`Inspecting node ${curr.val}...`);
      await new Promise((r) => setTimeout(r, 600));

      if (curr.val === val) {
        found = true;
        setMessage(`Target ${val} FOUND in BST!`);
        break;
      } else if (val < curr.val) {
        setMessage(`${val} < ${curr.val} -> Stepping LEFT`);
        curr = curr.left;
      } else {
        setMessage(`${val} > ${curr.val} -> Stepping RIGHT`);
        curr = curr.right;
      }
      await new Promise((r) => setTimeout(r, 400));
    }

    if (!found) {
      setMessage(`Target ${val} does not exist in BST.`);
      setActiveNodeVal(null);
    }
    setIsTraversing(false);
  };

  // Traversal execution
  const runTraversal = async (type: 'inorder' | 'preorder' | 'postorder' | 'levelorder') => {
    if (isTraversing) return;
    setIsTraversing(true);
    setTraversalName(type.toUpperCase());
    const sequence: number[] = [];

    const inorder = (node?: TreeNodeData) => {
      if (!node) return;
      inorder(node.left);
      sequence.push(node.val);
      inorder(node.right);
    };

    const preorder = (node?: TreeNodeData) => {
      if (!node) return;
      sequence.push(node.val);
      preorder(node.left);
      preorder(node.right);
    };

    const postorder = (node?: TreeNodeData) => {
      if (!node) return;
      postorder(node.left);
      postorder(node.right);
      sequence.push(node.val);
    };

    const levelorder = (node?: TreeNodeData) => {
      if (!node) return;
      const q: TreeNodeData[] = [node];
      while (q.length > 0) {
        const item = q.shift()!;
        sequence.push(item.val);
        if (item.left) q.push(item.left);
        if (item.right) q.push(item.right);
      }
    };

    if (type === 'inorder') inorder(root);
    else if (type === 'preorder') preorder(root);
    else if (type === 'postorder') postorder(root);
    else if (type === 'levelorder') levelorder(root);

    setTraversalResult([]);
    setMessage(`Running ${type.toUpperCase()} traversal...`);

    const visitedSoFar: number[] = [];
    for (const val of sequence) {
      setActiveNodeVal(val);
      visitedSoFar.push(val);
      setTraversalResult([...visitedSoFar]);
      await new Promise((r) => setTimeout(r, 650));
    }

    setActiveNodeVal(null);
    setIsTraversing(false);
    setMessage(
      type === 'inorder'
        ? 'Inorder traversal completed! Notice how the values are strictly sorted.'
        : `${type.toUpperCase()} traversal completed (${sequence.length} nodes visited).`
    );
  };

  // Compute SVG coordinates for balanced 3-level tree
  // root: (250, 40)
  // left child: (130, 110), right child: (370, 110)
  // 3rd level: (70, 190), (190, 190), (310, 190), (430, 190)
  const renderTreeSVG = () => {
    interface NodePos {
      val: number;
      x: number;
      y: number;
      left?: NodePos;
      right?: NodePos;
    }

    const layout = (node?: TreeNodeData, x = 250, y = 45, offset = 110): NodePos | undefined => {
      if (!node) return undefined;
      return {
        val: node.val,
        x,
        y,
        left: layout(node.left, x - offset, y + 65, offset * 0.52),
        right: layout(node.right, x + offset, y + 65, offset * 0.52),
      };
    };

    const layoutRoot = layout(root);

    const edges: React.ReactNode[] = [];
    const nodes: React.ReactNode[] = [];

    const draw = (pos?: NodePos) => {
      if (!pos) return;
      if (pos.left) {
        edges.push(
          <line
            key={`edge-${pos.val}-${pos.left.val}`}
            x1={pos.x}
            y1={pos.y}
            x2={pos.left.x}
            y2={pos.left.y}
            stroke="#475569"
            strokeWidth="2"
          />
        );
        draw(pos.left);
      }
      if (pos.right) {
        edges.push(
          <line
            key={`edge-${pos.val}-${pos.right.val}`}
            x1={pos.x}
            y1={pos.y}
            x2={pos.right.x}
            y2={pos.right.y}
            stroke="#475569"
            strokeWidth="2"
          />
        );
        draw(pos.right);
      }

      const isActive = activeNodeVal === pos.val;

      nodes.push(
        <g key={`node-${pos.val}`} className="transition-all duration-300">
          <circle
            cx={pos.x}
            cy={pos.y}
            r={19}
            fill={isActive ? '#10b981' : '#1e293b'}
            stroke={isActive ? '#34d399' : '#64748b'}
            strokeWidth={isActive ? '3' : '2'}
            className="transition-colors duration-200"
          />
          <text
            x={pos.x}
            y={pos.y + 5}
            textAnchor="middle"
            fill={isActive ? '#ffffff' : '#f1f5f9'}
            fontSize="12"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {pos.val}
          </text>
        </g>
      );
    };

    draw(layoutRoot);

    return (
      <svg viewBox="0 0 500 240" className="w-full h-56 select-none">
        {edges}
        {nodes}
      </svg>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-semibold text-white">Binary Search Tree (BST) Visualizer</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Invariant: Left &lt; Root &lt; Right · O(log N) Search · Inorder Sorted Traversal
          </p>
        </div>
        <button
          onClick={reset}
          disabled={isTraversing}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors disabled:opacity-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Tree
        </button>
      </div>

      {/* SVG Canvas */}
      <div className="my-4 bg-slate-950/60 rounded-xl border border-slate-800/80 p-2 flex flex-col items-center justify-center">
        {renderTreeSVG()}
      </div>

      {/* Traversal sequence bar */}
      {traversalResult.length > 0 && (
        <div className="mb-4 p-3 bg-slate-950 border border-emerald-900/40 rounded-lg flex items-center gap-3 text-xs font-mono">
          <span className="text-emerald-400 font-bold">{traversalName} VISITATION:</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {traversalResult.map((v, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Live status */}
      <div className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 mb-6">
        <span className="text-emerald-400 font-bold mr-2">&gt;</span>
        {message}
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Insert / Search bar */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTraversing}
            placeholder="Node value (e.g. 45)"
            className="w-44 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={insertNode}
            disabled={isTraversing}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            Insert to BST
          </button>
          <button
            onClick={searchNode}
            disabled={isTraversing}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            <Search className="w-3.5 h-3.5" />
            Search Node
          </button>
        </div>

        {/* Traversal Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800">
          <span className="text-xs font-medium text-slate-400 mr-2">Traversals:</span>
          <button
            onClick={() => runTraversal('inorder')}
            disabled={isTraversing}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            Inorder (Sorted)
          </button>
          <button
            onClick={() => runTraversal('preorder')}
            disabled={isTraversing}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            Preorder
          </button>
          <button
            onClick={() => runTraversal('postorder')}
            disabled={isTraversing}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            Postorder
          </button>
          <button
            onClick={() => runTraversal('levelorder')}
            disabled={isTraversing}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
          >
            Level-Order (BFS)
          </button>
        </div>
      </div>
    </div>
  );
};
