import React, { useState } from 'react';
import { X, Award, Coins, CheckCircle2 } from 'lucide-react';
import { GameInfo } from '../../types/index.js';
import { useAuth } from '../../context/AuthContext.js';
import { CodeRunnerGame } from './CodeRunnerGame.js';
import { BugHunterGame } from './BugHunterGame.js';
import { MazeSolverGame } from './MazeSolverGame.js';
import { BossBattleGame } from './BossBattleGame.js';
import { ArrayVisualizer } from '../visualizers/ArrayVisualizer.js';
import { StackVisualizer } from '../visualizers/StackVisualizer.js';
import { QueueVisualizer } from '../visualizers/QueueVisualizer.js';
import { SortingVisualizer } from '../visualizers/SortingVisualizer.js';
import { TreeVisualizer } from '../visualizers/TreeVisualizer.js';
import { GraphVisualizer } from '../visualizers/GraphVisualizer.js';

interface GameContainerProps {
  game: GameInfo;
  onClose: () => void;
}

export const GameContainer: React.FC<GameContainerProps> = ({ game, onClose }) => {
  const { token, updateUser, celebrate } = useAuth();
  const [completionData, setCompletionData] = useState<{
    earnedXp: number;
    earnedCoins: number;
    score: number;
  } | null>(null);

  const handleGameComplete = async (score: number) => {
    try {
      const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/games/${game.id}/complete`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ score }),
      });
      const data = await res.json();
      if (data.success) {
        setCompletionData({
          earnedXp: data.earnedXp,
          earnedCoins: data.earnedCoins,
          score: data.score,
        });
        if (data.user) {
          updateUser(data.user);
        }
        celebrate();
      }
    } catch (err) {
      console.error('Failed to record game completion:', err);
    }
  };

  const renderActiveGame = () => {
    switch (game.id) {
      case 'code-runner':
        return <CodeRunnerGame onComplete={handleGameComplete} />;
      case 'bug-hunter':
        return <BugHunterGame onComplete={handleGameComplete} />;
      case 'maze-solver':
        return <MazeSolverGame onComplete={handleGameComplete} />;
      case 'boss-battle':
        return <BossBattleGame onComplete={handleGameComplete} />;
      case 'array-adventure':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-300">
              <strong>Objective:</strong> Practice array manipulations! Test inserting 3 values, searching for an element, and reversing the array.
            </div>
            <ArrayVisualizer />
            <div className="flex justify-end">
              <button
                onClick={() => handleGameComplete(120)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
              >
                Complete Array Challenge (+110 XP)
              </button>
            </div>
          </div>
        );
      case 'stack-tower':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-purple-950/40 border border-purple-800/40 rounded-xl text-xs text-purple-300">
              <strong>Objective:</strong> Push function call frames and test the Bracket Simulation mode with balanced expressions like &quot;&#123;[()]&#125;&quot;.
            </div>
            <StackVisualizer />
            <div className="flex justify-end">
              <button
                onClick={() => handleGameComplete(130)}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
              >
                Complete Stack Challenge (+130 XP)
              </button>
            </div>
          </div>
        );
      case 'queue-rush':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-blue-950/40 border border-blue-800/40 rounded-xl text-xs text-blue-300">
              <strong>Objective:</strong> Enqueue incoming requests and dequeue them from the front to maintain real-time server throughput.
            </div>
            <QueueVisualizer />
            <div className="flex justify-end">
              <button
                onClick={() => handleGameComplete(120)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
              >
                Complete Queue Challenge (+120 XP)
              </button>
            </div>
          </div>
        );
      case 'sorting-race':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-indigo-950/40 border border-indigo-800/40 rounded-xl text-xs text-indigo-300">
              <strong>Objective:</strong> Run Bubble, Selection, and Insertion Sort on randomized arrays. Compare comparisons and swap metrics.
            </div>
            <SortingVisualizer />
            <div className="flex justify-end">
              <button
                onClick={() => handleGameComplete(150)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
              >
                Complete Sorting Showdown (+150 XP)
              </button>
            </div>
          </div>
        );
      case 'tree-builder':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-300">
              <strong>Objective:</strong> Insert numbers into the BST and trigger an Inorder traversal to observe values sorted ascendingly.
            </div>
            <TreeVisualizer />
            <div className="flex justify-end">
              <button
                onClick={() => handleGameComplete(160)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
              >
                Complete Tree Builder (+160 XP)
              </button>
            </div>
          </div>
        );
      case 'graph-explorer':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-amber-950/40 border border-amber-800/40 rounded-xl text-xs text-amber-300">
              <strong>Objective:</strong> Run both BFS and DFS traversals on the graph to observe how queues vs stacks navigate the network.
            </div>
            <GraphVisualizer />
            <div className="flex justify-end">
              <button
                onClick={() => handleGameComplete(170)}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
              >
                Complete Graph Challenge (+170 XP)
              </button>
            </div>
          </div>
        );
      default:
        return <CodeRunnerGame onComplete={handleGameComplete} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Completion Banner */}
        {completionData && (
          <div className="mb-6 p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex items-center justify-between text-emerald-200 animate-fadeIn">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white text-sm">Quest Completed!</h4>
                <p className="text-xs text-emerald-300">
                  Great job conquering this gaming challenge.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1 font-bold text-amber-400">
                <Award className="w-4 h-4" /> +{completionData.earnedXp} XP
              </span>
              <span className="flex items-center gap-1 font-bold text-yellow-400">
                <Coins className="w-4 h-4" /> +{completionData.earnedCoins} Coins
              </span>
            </div>
          </div>
        )}

        {/* The Game */}
        {renderActiveGame()}
      </div>
    </div>
  );
};
