# Learn Python with DSA Through Games

**Turn programming concepts into challenges, puzzles, and games.**

A full-stack web application designed to make learning Python programming and Data Structures & Algorithms (DSA) interactive, game-based, visual, and beginner-friendly (blending Duolingo, LeetCode, and an adventure RPG).

---

## 🚀 Key Features

### 1. The 4-Level Learning Journey
- **Level 1 — Python Foundations**: Variables, Data types, Operators, Conditionals, Loops, Functions, Strings, Lists, Tuples, Sets, Dictionaries.
- **Level 2 — Intermediate Python**: List comprehensions, Recursion, Modules, Exception handling, File handling, OOP classes, Iterators & generators.
- **Level 3 — DSA Foundations**: Contiguous Arrays & Memory Layout, Stacks (LIFO), Queues (FIFO), Hash Tables, Linear & Binary Search, Sorting algorithms (Bubble, Selection, Insertion, Merge, Quick).
- **Level 4 — Advanced DSA**: Binary Search Trees (BST), Graph representations, Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra greedy routing, and Dynamic Programming (memoization & tabulation).

### 2. Five-Section Lesson Architecture
Each topic includes:
1. **Learn**: Beginner-friendly explanations with real-world software engineering applications.
2. **Visualize**: Interactive visualization with step controls and operations (insert, delete, search, traverse).
3. **Try It**: In-browser Python sandbox editor with instant console output.
4. **Challenge**: LeetCode-style problem with automated test cases, constraints, and test execution.
5. **Quiz**: Multiple-choice questions with XP and coin rewards.

### 3. The 10 Interactive Mini-Games
1. **Code Runner**: Program character movement through a grid maze using Python commands (`move_forward()`, `turn_left()`, `turn_right()`, loops) to collect gems while avoiding lava.
2. **Bug Hunter**: Rapid-fire debugging game against the clock to fix syntax, indentation, and logic errors.
3. **Array Adventure**: Tactile block-based contiguous memory manipulation with in-place pointer reversals and shift penalties.
4. **Stack Tower**: LIFO physics stack with function call frames and bracket balancing (`{[()]}`).
5. **Queue Rush**: Real-time request pipeline management with FIFO order and buffer starvation prevention.
6. **Sorting Race**: Live side-by-side visualizer comparing Bubble, Selection, Insertion, and Quick Sort with real-time comparison/swap metrics.
7. **Maze Solver**: BFS vs DFS explorer showdown visualizing exploration frontiers and shortest paths.
8. **Tree Builder**: Construct balanced BSTs from incoming number streams and execute live Inorder, Preorder, and Level-Order traversals.
9. **Graph Explorer**: Island network connector with adjacency lists, cycle detection, and BFS/DFS discovery.
10. **Algorithm Boss Battle**: Turn-based combat against *The Sorting Titan*, *The Graph Hydra*, and *The DP Dragon* using Big-O counter strategies and algorithmic puzzles.

### 4. Gamification & Progression
- **XP Progression System**: Earn XP from lessons (+50 XP), mini-games (+100–250 XP), challenges (+60–150 XP), and quizzes (+30 XP).
- **Dynamic Levels**: Level progression calculated dynamically based on total XP.
- **Daily Quest**: Daily challenge with bonus XP and streak protections.
- **Badges**: First Steps, Python Beginner, DSA Explorer, Speed Coder, Week Warrior, Perfect Score, Problem Solver, and Arcade Champion.
- **Global Leaderboard**: All-Time, Weekly, and Monthly rankings.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React icons, Canvas Confetti.
- **Backend**: Node.js, Express.js.
- **Data Persistence**: Persistent document store structured with collections (`users`, `topics`, `challenges`, `games`, `badges`, `submissions`, `dailyChallenges`) with atomic disk writes and optional MongoDB connection.
- **Security**: JWT authentication (`jsonwebtoken`), password hashing (`bcryptjs`), and sandboxed isolated Python execution.
- **Python Execution Engine**: Isolated subprocess execution with strict 3-second timeout protection, buffer capping, and AST/regex inspection prohibiting risky system calls (`os`, `subprocess`, filesystem manipulation).

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the development server (runs Express backend + Vite frontend on port 3000)
npm run dev

# 3. Build for production
npm run build
npm start
```

### Pre-configured Demo Account
Click **"One-Click Demo Adventurer"** on the Sign In modal or use:
- **Email**: `alex@example.com`
- **Password**: `password123`
*(Or create a new account anytime with instant JWT session creation).*
