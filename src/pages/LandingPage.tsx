import React from 'react';
import {
  Gamepad2,
  Brain,
  Code2,
  Flame,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Layers,
  Compass,
  Trophy,
  Swords,
} from 'lucide-react';

interface LandingPageProps {
  onStartLearning: () => void;
  onExploreGames: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartLearning,
  onExploreGames,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-xs font-mono text-emerald-300 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive · Game-Based · Real Python Execution</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Learn Python.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
              Master DSA.
            </span>{' '}
            Play Your Way.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 mb-10 leading-relaxed">
            Turn abstract programming concepts into hands-on challenges, visual memory puzzles, and
            thrilling arcade mini-games.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartLearning}
              className="flex items-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreGames}
              className="flex items-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 rounded-xl text-sm font-semibold transition-all hover:border-slate-700"
            >
              <Gamepad2 className="w-4 h-4 text-indigo-400" />
              <span>Explore 10 Games</span>
            </button>
          </div>

          {/* Interactive Feature Teaser Card */}
          <div className="mt-14 max-w-4xl mx-auto p-4 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-300 font-semibold">interactive_adventure.py</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold">Level 3: DSA Quest</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="font-mono text-xs text-slate-300 space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-slate-500"># 1. Learn the concept</div>
                <div>hero_inventory = [&quot;Sword&quot;, &quot;Potion&quot;, &quot;Shield&quot;]</div>
                <div className="text-slate-500 mt-2"># 2. Manipulate dynamic memory</div>
                <div>hero_inventory.append(&quot;Dragon Bow&quot;)</div>
                <div>print(f&quot;Ready for Boss: &#123;hero_inventory&#125;&quot;)</div>
                <div className="text-emerald-400 mt-2">&gt; Output: [&quot;Sword&quot;, &quot;Potion&quot;, &quot;Shield&quot;, &quot;Dragon Bow&quot;]</div>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Memory Visualizer</span>
                  <span className="text-indigo-400 font-mono">O(1) Append Cost</span>
                </div>
                <div className="flex items-center gap-1.5 py-3">
                  {['[0] Sword', '[1] Potion', '[2] Shield', '[3] Bow'].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex-1 p-2 bg-emerald-950/40 border border-emerald-500/40 rounded text-[10px] font-mono text-emerald-300 text-center truncate"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-slate-400">
                  Play the <strong className="text-white">Array Adventure</strong> and <strong className="text-white">Stack Tower</strong> games to master contiguous memory allocations.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Cards */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Why Learn Through Games?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Ditch passive lecture videos. Build algorithmic intuition by seeing, playing, and coding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Visual DSA Visualizers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Watch arrays shift in real-time, stacks pop frames, BSTs branch left and right, and
                graph waves radiate outward with BFS queues.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">10 Dedicated Mini-Games</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                From <em>Code Runner</em> grid navigation and <em>Bug Hunter</em> speed debugging, to
                <em>Maze Solver</em> and epic <em>Algorithm Boss Battles</em>.
              </p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Gamified XP & Streaks</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stay motivated with daily challenges, streak multipliers, rank badges, level milestones,
                and competitive leaderboards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Level Learning Journey */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            The Complete Learning Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Progress step by step from Python basics to advanced competitive DSA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase mb-1">
                Level 1
              </div>
              <h4 className="text-base font-bold text-white mb-2">Python Foundations</h4>
              <p className="text-xs text-slate-400 mb-4">
                Variables, data types, if/elif branching, while/for loops, functions, strings, lists,
                tuples, and dictionaries.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 border-t border-slate-800 pt-3">
              12 Interactive Topics
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-blue-400 font-bold uppercase mb-1">
                Level 2
              </div>
              <h4 className="text-base font-bold text-white mb-2">Intermediate Python</h4>
              <p className="text-xs text-slate-400 mb-4">
                List comprehensions, recursion, modules, exception handling, OOP classes, iterators, and
                generators.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 border-t border-slate-800 pt-3">
              8 Core Modules
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-indigo-400 font-bold uppercase mb-1">
                Level 3
              </div>
              <h4 className="text-base font-bold text-white mb-2">DSA Foundations</h4>
              <p className="text-xs text-slate-400 mb-4">
                Arrays memory layout, Linked Lists, Stacks (LIFO), Queues (FIFO), Hash Tables, Binary
                Search, and Sorting algorithms.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 border-t border-slate-800 pt-3">
              9 Algorithm Topics
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-purple-400 font-bold uppercase mb-1">
                Level 4
              </div>
              <h4 className="text-base font-bold text-white mb-2">Advanced DSA</h4>
              <p className="text-xs text-slate-400 mb-4">
                Binary Search Trees, Heaps, Graph BFS & DFS, Greedy algorithms, Dynamic Programming
                memoization, and Backtracking.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-500 border-t border-slate-800 pt-3">
              9 Advanced Topics
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Begin Your Coding Adventure?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-8 max-w-xl mx-auto">
            Join thousands of developers leveling up their Python and algorithm problem solving skills
            the interactive way.
          </p>
          <button
            onClick={onStartLearning}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold shadow-xl shadow-emerald-600/30 transition-all hover:scale-105"
          >
            Launch Learning Dashboard
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>Learn Python with DSA Through Games · Built for interactive learners & problem solvers</p>
      </footer>
    </div>
  );
};
