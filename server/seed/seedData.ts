import { Topic, Challenge, GameInfo, Badge } from '../../src/types/index.js';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_steps',
    title: '🏆 First Steps',
    description: 'Complete your first Python lesson.',
    icon: 'Footprints',
    category: 'milestone',
  },
  {
    id: 'python_beginner',
    title: '🐍 Python Beginner',
    description: 'Master all Level 1 Python Foundations topics.',
    icon: 'Sparkles',
    category: 'skill',
  },
  {
    id: 'dsa_explorer',
    title: '🧠 DSA Explorer',
    description: 'Complete 5 Data Structures & Algorithms topics.',
    icon: 'Brain',
    category: 'skill',
  },
  {
    id: 'speed_coder',
    title: '⚡ Speed Coder',
    description: 'Solve a coding challenge in under 60 seconds.',
    icon: 'Zap',
    category: 'skill',
  },
  {
    id: 'week_warrior',
    title: '🔥 Week Warrior',
    description: 'Maintain a 7-day learning streak.',
    icon: 'Flame',
    category: 'streak',
  },
  {
    id: 'perfect_score',
    title: '💯 Perfect Score',
    description: 'Score 100% on any topic quiz.',
    icon: 'Award',
    category: 'milestone',
  },
  {
    id: 'problem_solver',
    title: '🧩 Problem Solver',
    description: 'Solve 10 coding challenges successfully.',
    icon: 'CheckCircle2',
    category: 'milestone',
  },
  {
    id: 'algorithm_master',
    title: '👑 Algorithm Master',
    description: 'Complete advanced DSA topics and defeat the Boss Battle.',
    icon: 'Crown',
    category: 'milestone',
  },
  {
    id: 'game_champion',
    title: '🕹️ Arcade Champion',
    description: 'Play and conquer all 10 interactive mini-games.',
    icon: 'Gamepad2',
    category: 'game',
  },
];

export const INITIAL_GAMES: GameInfo[] = [
  {
    id: 'code-runner',
    title: 'Code Runner',
    subtitle: 'Program character movement through a grid maze',
    category: 'Python',
    difficulty: 'Beginner',
    xpReward: 120,
    coinsReward: 30,
    icon: 'Navigation',
    description:
      'Control your pixel hero using Python instructions like move_forward(), turn_right(), and loops to collect diamond crystals without falling into lava!',
    conceptCovered: 'Sequential execution, functions, and while/for loops',
  },
  {
    id: 'bug-hunter',
    title: 'Bug Hunter',
    subtitle: 'Find and squash syntax & logical bugs against the clock',
    category: 'Python',
    difficulty: 'Beginner',
    xpReward: 100,
    coinsReward: 25,
    icon: 'Bug',
    description:
      'Inspect buggy Python code snippets, pinpoint the syntax error or off-by-one bug, fix it, and verify that the tests pass before time expires.',
    conceptCovered: 'Debugging, syntax errors, edge conditions, indentation',
  },
  {
    id: 'array-adventure',
    title: 'Array Adventure',
    subtitle: 'Tactile block array puzzle manipulation',
    category: 'DSA',
    difficulty: 'Beginner',
    xpReward: 110,
    coinsReward: 25,
    icon: 'LayoutGrid',
    description:
      'Manipulate contiguous memory blocks in real-time: perform fast inserts, in-place reversals, deletions, and search pivots with visual index pointers.',
    conceptCovered: 'Array memory layout, index access O(1), and shift costs O(N)',
  },
  {
    id: 'stack-tower',
    title: 'Stack Tower',
    subtitle: 'LIFO physics stack with parentheses balancing',
    category: 'DSA',
    difficulty: 'Intermediate',
    xpReward: 130,
    coinsReward: 35,
    icon: 'Layers',
    description:
      'Push and pop function call frames and bracket tokens onto the tower. One mismatched bracket or stack overflow sends the tower tumbling!',
    conceptCovered: 'LIFO (Last In First Out), recursion call stack, bracket matching',
  },
  {
    id: 'queue-rush',
    title: 'Queue Rush',
    subtitle: 'Fast-paced VIP & FIFO service management simulation',
    category: 'DSA',
    difficulty: 'Intermediate',
    xpReward: 120,
    coinsReward: 30,
    icon: 'Clock',
    description:
      'Manage incoming requests, handle FIFO queues, prioritize VIP tasks with double-ended queues, and avoid buffer starvation under heavy traffic.',
    conceptCovered: 'FIFO (First In First Out), deques, buffer management',
  },
  {
    id: 'sorting-race',
    title: 'Sorting Race',
    subtitle: 'Interactive multi-algorithm showdown with live metrics',
    category: 'DSA',
    difficulty: 'Intermediate',
    xpReward: 150,
    coinsReward: 40,
    icon: 'BarChart2',
    description:
      'Pit Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort against each other! Inspect comparisons, swaps, and time complexity in real-time.',
    conceptCovered: 'Time & Space complexities: O(N^2) vs O(N log N)',
  },
  {
    id: 'maze-solver',
    title: 'Maze Solver',
    subtitle: 'BFS vs DFS shortest path exploration showdown',
    category: 'DSA',
    difficulty: 'Intermediate',
    xpReward: 140,
    coinsReward: 35,
    icon: 'Compass',
    description:
      'Visualize the exploration frontier: observe how Breadth-First Search radiates in concentric waves to guarantee the shortest path while Depth-First dives deep.',
    conceptCovered: 'BFS (queue), DFS (stack/recursion), shortest path discovery',
  },
  {
    id: 'tree-builder',
    title: 'Tree Builder',
    subtitle: 'Binary Search Tree constructor and traversal animator',
    category: 'DSA',
    difficulty: 'Advanced',
    xpReward: 160,
    coinsReward: 45,
    icon: 'GitFork',
    description:
      'Construct balanced BSTs from incoming number streams. Execute Inorder, Preorder, Postorder, and Level-Order traversals to harvest all nodes in sorted sequence.',
    conceptCovered: 'BST invariant (left < root < right), tree balance, traversals',
  },
  {
    id: 'graph-explorer',
    title: 'Graph Explorer',
    subtitle: 'Island bridge network optimizer and cycle detector',
    category: 'DSA',
    difficulty: 'Advanced',
    xpReward: 170,
    coinsReward: 50,
    icon: 'Share2',
    description:
      'Connect distant archipelago islands, route packages along weighted edges, detect circular deadlocks, and calculate Dijkstra shortest routes.',
    conceptCovered: 'Adjacency list, graph cycles, Dijkstra / Greedy routing',
  },
  {
    id: 'boss-battle',
    title: 'Algorithm Boss Battle',
    subtitle: 'Multi-stage combat against the Legendary Titans',
    category: 'DSA',
    difficulty: 'Advanced',
    xpReward: 250,
    coinsReward: 100,
    icon: 'Swords',
    description:
      'Face off against "The Sorting Titan", "The Graph Hydra", and "The DP Dragon"! Attack with optimal time complexities and solve rapid DSA puzzles to claim victory.',
    conceptCovered: 'Comprehensive DSA problem-solving and algorithmic strategy',
  },
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'ch-sum-two-numbers',
    topicId: 'py-variables',
    title: 'Sum of Two Numbers',
    slug: 'sum-of-two-numbers',
    difficulty: 'Easy',
    category: 'Python Foundations',
    xpReward: 60,
    description:
      'Write a Python program that takes two integers from input (one per line) and prints their sum.',
    examples: [
      { input: '5\n7', output: '12', explanation: '5 + 7 = 12' },
      { input: '-3\n10', output: '7', explanation: '-3 + 10 = 7' },
    ],
    constraints: ['-1000 <= a, b <= 1000'],
    starterCode: `# Read two integers from input
a = int(input())
b = int(input())

# Print their sum
print(a + b)
`,
    testCases: [
      { input: '5\n7', expectedOutput: '12', isHidden: false },
      { input: '-3\n10', expectedOutput: '7', isHidden: false },
      { input: '100\n250', expectedOutput: '350', isHidden: true },
      { input: '0\n0', expectedOutput: '0', isHidden: true },
    ],
  },
  {
    id: 'ch-even-or-odd',
    topicId: 'py-conditionals',
    title: 'Even or Odd Number',
    slug: 'even-or-odd-number',
    difficulty: 'Easy',
    category: 'Python Foundations',
    xpReward: 60,
    description:
      'Given an integer n from input, print "Even" if the number is even, and "Odd" if the number is odd.',
    examples: [
      { input: '4', output: 'Even', explanation: '4 is divisible by 2' },
      { input: '7', output: 'Odd', explanation: '7 has remainder 1 when divided by 2' },
    ],
    constraints: ['-10^6 <= n <= 10^6'],
    starterCode: `n = int(input())

# Determine whether n is Even or Odd
if n % 2 == 0:
    print("Even")
else:
    print("Odd")
`,
    testCases: [
      { input: '4', expectedOutput: 'Even', isHidden: false },
      { input: '7', expectedOutput: 'Odd', isHidden: false },
      { input: '0', expectedOutput: 'Even', isHidden: true },
      { input: '-11', expectedOutput: 'Odd', isHidden: true },
    ],
  },
  {
    id: 'ch-reverse-string',
    topicId: 'py-strings',
    title: 'Reverse a String',
    slug: 'reverse-a-string',
    difficulty: 'Easy',
    category: 'Python Foundations',
    xpReward: 70,
    description:
      'Read a string from input and print it in reverse order. Try using Python slicing or a loop!',
    examples: [
      { input: 'hello', output: 'olleh', explanation: '"hello" backwards is "olleh"' },
      { input: 'python', output: 'nohtyp', explanation: '"python" backwards is "nohtyp"' },
    ],
    constraints: ['1 <= len(s) <= 1000'],
    starterCode: `s = input().strip()

# Print the reversed string
print(s[::-1])
`,
    testCases: [
      { input: 'hello', expectedOutput: 'olleh', isHidden: false },
      { input: 'python', expectedOutput: 'nohtyp', isHidden: false },
      { input: 'racecar', expectedOutput: 'racecar', isHidden: true },
      { input: 'Algorithms', expectedOutput: 'smohtiroglA', isHidden: true },
    ],
  },
  {
    id: 'ch-find-max-array',
    topicId: 'dsa-arrays',
    title: 'Find Maximum in Array',
    slug: 'find-maximum-in-array',
    difficulty: 'Easy',
    category: 'DSA Foundations',
    xpReward: 80,
    description:
      'You are given space-separated integers on a single line. Find and print the maximum integer without using the built-in max() function to practice loop iteration.',
    examples: [
      { input: '3 8 2 10 5', output: '10', explanation: '10 is the largest element' },
      { input: '-5 -2 -9 -1', output: '-1', explanation: '-1 is greater than all others' },
    ],
    constraints: ['1 <= number of elements <= 10^4'],
    starterCode: `nums = list(map(int, input().split()))

# Find maximum element without max()
max_val = nums[0]
for x in nums:
    if x > max_val:
        max_val = x

print(max_val)
`,
    testCases: [
      { input: '3 8 2 10 5', expectedOutput: '10', isHidden: false },
      { input: '-5 -2 -9 -1', expectedOutput: '-1', isHidden: false },
      { input: '42', expectedOutput: '42', isHidden: true },
      { input: '99 100 99 100 45', expectedOutput: '100', isHidden: true },
    ],
  },
  {
    id: 'ch-valid-parentheses',
    topicId: 'dsa-stacks',
    title: 'Valid Parentheses (Stack)',
    slug: 'valid-parentheses',
    difficulty: 'Medium',
    category: 'DSA Foundations',
    xpReward: 120,
    description:
      'Given a string containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. A bracket must be closed by the same type in correct order. Print "True" or "False".',
    examples: [
      { input: '()[]{}', output: 'True' },
      { input: '(]', output: 'False' },
      { input: '([{}])', output: 'True' },
    ],
    constraints: ['1 <= len(s) <= 10^4'],
    starterCode: `s = input().strip()

def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return len(stack) == 0

print(is_valid(s))
`,
    testCases: [
      { input: '()[]{}', expectedOutput: 'True', isHidden: false },
      { input: '(]', expectedOutput: 'False', isHidden: false },
      { input: '([{}])', expectedOutput: 'True', isHidden: false },
      { input: '(((((', expectedOutput: 'False', isHidden: true },
      { input: '{[()()]}', expectedOutput: 'True', isHidden: true },
    ],
  },
  {
    id: 'ch-binary-search',
    topicId: 'dsa-searching',
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'Medium',
    category: 'DSA Foundations',
    xpReward: 100,
    description:
      'First line: space-separated sorted integers. Second line: target integer. Print the 0-based index of target if found in O(log N) time, or -1 if not found.',
    examples: [
      { input: '-1 0 3 5 9 12\n9', output: '4', explanation: '9 exists at index 4' },
      { input: '-1 0 3 5 9 12\n2', output: '-1', explanation: '2 does not exist in array' },
    ],
    constraints: ['1 <= nums.length <= 10^4', 'nums is sorted in ascending order'],
    starterCode: `nums = list(map(int, input().split()))
target = int(input())

left, right = 0, len(nums) - 1
found_idx = -1

while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target:
        found_idx = mid
        break
    elif nums[mid] < target:
        left = mid + 1
    else:
        right = mid - 1

print(found_idx)
`,
    testCases: [
      { input: '-1 0 3 5 9 12\n9', expectedOutput: '4', isHidden: false },
      { input: '-1 0 3 5 9 12\n2', expectedOutput: '-1', isHidden: false },
      { input: '5\n5', expectedOutput: '0', isHidden: true },
      { input: '1 3 5 7 9 11 13 15 17\n13', expectedOutput: '6', isHidden: true },
    ],
  },
  {
    id: 'ch-two-sum',
    topicId: 'dsa-hash-tables',
    title: 'Two Sum Problem (Hash Map)',
    slug: 'two-sum-problem',
    difficulty: 'Medium',
    category: 'DSA Foundations',
    xpReward: 120,
    description:
      'Given an array of integers on line 1 and a target sum on line 2, find two numbers that sum up to target and print their 0-based indices in ascending order separated by space. Assume exactly one solution exists.',
    examples: [
      { input: '2 7 11 15\n9', output: '0 1', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: '3 2 4\n6', output: '1 2', explanation: 'nums[1] + nums[2] = 2 + 4 = 6' },
    ],
    constraints: ['2 <= nums.length <= 10^4'],
    starterCode: `nums = list(map(int, input().split()))
target = int(input())

lookup = {}
for i, n in enumerate(nums):
    complement = target - n
    if complement in lookup:
        print(f"{lookup[complement]} {i}")
        break
    lookup[n] = i
`,
    testCases: [
      { input: '2 7 11 15\n9', expectedOutput: '0 1', isHidden: false },
      { input: '3 2 4\n6', expectedOutput: '1 2', isHidden: false },
      { input: '3 3\n6', expectedOutput: '0 1', isHidden: true },
      { input: '1 5 10 20 4\n9', expectedOutput: '1 4', isHidden: true },
    ],
  },
  {
    id: 'ch-fibonacci-dp',
    topicId: 'dsa-dynamic-programming',
    title: 'N-th Fibonacci Number (DP)',
    slug: 'nth-fibonacci-number',
    difficulty: 'Medium',
    category: 'Advanced DSA',
    xpReward: 130,
    description:
      'Compute the n-th Fibonacci number where F(0)=0, F(1)=1, and F(n)=F(n-1)+F(n-2) using Dynamic Programming to run in O(N) time.',
    examples: [
      { input: '4', output: '3', explanation: 'F(4) = 3 (0, 1, 1, 2, 3)' },
      { input: '10', output: '55', explanation: 'F(10) = 55' },
    ],
    constraints: ['0 <= n <= 50'],
    starterCode: `n = int(input())

if n <= 1:
    print(n)
else:
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    print(curr)
`,
    testCases: [
      { input: '4', expectedOutput: '3', isHidden: false },
      { input: '10', expectedOutput: '55', isHidden: false },
      { input: '0', expectedOutput: '0', isHidden: true },
      { input: '20', expectedOutput: '6765', isHidden: true },
    ],
  },
];

export const INITIAL_TOPICS: Topic[] = [
  // LEVEL 1: PYTHON FOUNDATIONS (12 Topics)
  {
    id: 'py-variables',
    slug: 'variables',
    title: 'Variables & Data Types',
    category: 'python_foundations',
    levelNumber: 1,
    order: 1,
    description: 'Learn how to declare containers in memory to store text, numbers, and booleans.',
    estimatedMinutes: 10,
    xpReward: 50,
    icon: 'Variable',
    prerequisites: [],
    learnContent: {
      overview:
        'In Python, variables are dynamically typed labels that reference values in computer memory. You do not need to declare types explicitly like in C or Java.',
      keyPoints: [
        'Variable naming uses snake_case (e.g., player_score, hero_health).',
        'Core primitive types: int (42), float (3.14), str ("hello"), bool (True/False).',
        'Use type() to check what type of data a variable holds.',
        'Variables can be reassigned to any type anytime (dynamic typing).',
      ],
      codeSnippets: [
        {
          title: 'Creating and Printing Variables',
          code: `player_name = "Kaelen"\nlevel = 5\nhealth = 98.5\nis_alive = True\n\nprint(f"Hero {player_name} is level {level} with {health}% health!")`,
          explanation: 'f-strings (formatted string literals) provide the cleanest way to embed variable values.',
        },
      ],
      realWorldUse: 'Used in every game to track coordinates, inventory counts, player stats, and states.',
    },
    visualizerType: 'array',
    tryItCode: `# Experiment with variables!
hero = "Shadow Knight"
coins = 150
multiplier = 1.5

total_score = coins * multiplier
print(f"Champion: {hero}")
print(f"Total Score: {total_score}")
`,
    challengeId: 'ch-sum-two-numbers',
    quiz: [
      {
        question: 'Which of the following is a valid Python variable name?',
        options: ['2nd_player', 'player_score', 'player-score', 'class'],
        correctIndex: 1,
        explanation: 'Variable names cannot start with numbers, contain hyphens, or use reserved Python keywords like "class".',
      },
      {
        question: 'What is the data type of the expression: 10 / 2 in Python 3?',
        options: ['int', 'float', 'double', 'str'],
        correctIndex: 1,
        explanation: 'In Python 3, standard division "/" always produces a float (5.0), whereas integer division "//" yields an int.',
      },
    ],
  },
  {
    id: 'py-conditionals',
    slug: 'conditionals',
    title: 'Conditional Statements',
    category: 'python_foundations',
    levelNumber: 1,
    order: 2,
    description: 'Control your program decision tree using if, elif, and else statements.',
    estimatedMinutes: 12,
    xpReward: 50,
    icon: 'Split',
    prerequisites: ['py-variables'],
    learnContent: {
      overview:
        'Conditionals allow code execution paths to branch based on boolean expressions. Python uses indentation rather than curly brackets to denote scope.',
      keyPoints: [
        'if, elif, and else dictate branching logic.',
        'Comparison operators: ==, !=, <, >, <=, >=.',
        'Logical operators: and, or, not.',
        'Indentation (standard 4 spaces) defines the conditional block.',
      ],
      codeSnippets: [
        {
          title: 'Branching logic',
          code: `health = 35\n\nif health > 75:\n    print("Hero is healthy")\nelif health > 20:\n    print("Hero is wounded!")\nelse:\n    print("Critical danger!")`,
          explanation: 'Evaluates top to bottom, stopping at the first True branch.',
        },
      ],
      realWorldUse: 'Used for collision detection, game over triggers, access controls, and validation.',
    },
    visualizerType: 'code_flow',
    tryItCode: `mana = 80
spell_cost = 50

if mana >= spell_cost:
    mana -= spell_cost
    print(f"Spell cast! Remaining mana: {mana}")
else:
    print("Not enough mana!")
`,
    challengeId: 'ch-even-or-odd',
    quiz: [
      {
        question: 'What will print when x = 10, y = 5, and we check: if x > 5 and y < 3?',
        options: ['Branch runs', 'Branch does not run', 'Syntax error', 'None'],
        correctIndex: 1,
        explanation: 'Since "and" requires both operands to be true and y < 3 is False (5 < 3 is false), the whole condition is False.',
      },
    ],
  },
  {
    id: 'py-loops',
    slug: 'loops',
    title: 'Loops (While & For)',
    category: 'python_foundations',
    levelNumber: 1,
    order: 3,
    description: 'Automate repetitive tasks and iterate across sequence ranges.',
    estimatedMinutes: 15,
    xpReward: 50,
    icon: 'Repeat',
    prerequisites: ['py-conditionals'],
    learnContent: {
      overview:
        'Loops repeat a block of code. For loops iterate over iterables (range, lists, strings), while While loops execute as long as a condition holds true.',
      keyPoints: [
        'for item in iterable: iterates over each item.',
        'range(start, stop, step) generates sequences.',
        'while condition: repeats until condition becomes False.',
        'break exits the loop immediately; continue skips to next iteration.',
      ],
      codeSnippets: [
        {
          title: 'For loop with range',
          code: `for level in range(1, 4):\n    print(f"Stage {level} unlocked!")`,
          explanation: 'range(1, 4) produces 1, 2, and 3 (the stop value 4 is exclusive).',
        },
      ],
      realWorldUse: 'Game loops, rendering entities, traversing arrays, recalculating game physics.',
    },
    visualizerType: 'code_flow',
    tryItCode: `# Calculate total XP from 5 quest stages
total_xp = 0
for stage in range(1, 6):
    earned = stage * 20
    total_xp += earned
    print(f"Stage {stage}: +{earned} XP (Total: {total_xp})")
`,
    challengeId: 'ch-even-or-odd',
    quiz: [
      {
        question: 'How many times will: "for i in range(2, 8, 2)" execute?',
        options: ['3 times (2, 4, 6)', '4 times (2, 4, 6, 8)', '6 times', '2 times'],
        correctIndex: 0,
        explanation: 'It iterates over 2, 4, and 6. The next value 8 reaches the stop boundary.',
      },
    ],
  },
  {
    id: 'py-functions',
    slug: 'functions',
    title: 'Functions & Scope',
    category: 'python_foundations',
    levelNumber: 1,
    order: 4,
    description: 'Package reusable blocks of logic, pass arguments, and return values.',
    estimatedMinutes: 15,
    xpReward: 50,
    icon: 'Wrench',
    prerequisites: ['py-loops'],
    learnContent: {
      overview:
        'Functions are named blocks of code defined with def. They take parameters, execute statements, and return a result with the return statement.',
      keyPoints: [
        'def function_name(param1, param2): defines a function.',
        'Parameters can have default values: def attack(power=10):.',
        'Variables defined inside a function belong to local scope.',
        '*args and **kwargs handle arbitrary numbers of positional and keyword arguments.',
      ],
      codeSnippets: [
        {
          title: 'Defining a function',
          code: `def calculate_damage(attack, defense):\n    net_dmg = max(1, attack - defense)\n    return net_dmg\n\nprint("Damage dealt:", calculate_damage(45, 20))`,
          explanation: 'Returns the computed value to the caller.',
        },
      ],
      realWorldUse: 'Modular game mechanics, damage calculation, physics math, formatting.',
    },
    visualizerType: 'code_flow',
    tryItCode: `def heal_player(current_hp, potion_strength, max_hp=100):
    new_hp = min(max_hp, current_hp + potion_strength)
    return new_hp

print("Healed HP:", heal_player(45, 40))
print("Overheal test:", heal_player(90, 40))
`,
    challengeId: 'ch-sum-two-numbers',
    quiz: [
      {
        question: 'What does a Python function return if there is no explicit "return" statement?',
        options: ['0', 'None', 'False', 'Empty string'],
        correctIndex: 1,
        explanation: 'Python functions implicitly return None when execution reaches the end without a return.',
      },
    ],
  },
  {
    id: 'py-strings',
    slug: 'strings',
    title: 'Strings & Text Manipulation',
    category: 'python_foundations',
    levelNumber: 1,
    order: 5,
    description: 'Master immutable string sequences, slicing [start:stop:step], and formatting.',
    estimatedMinutes: 14,
    xpReward: 50,
    icon: 'Type',
    prerequisites: ['py-functions'],
    learnContent: {
      overview:
        'Strings in Python are immutable sequences of Unicode characters. Slicing with [start:stop:step] lets you slice, reverse, and extract text effortlessly.',
      keyPoints: [
        'Strings are indexed 0 to N-1, or negative indices -1 (last char) to -N.',
        'Slicing syntax: s[start:stop:step].',
        'Useful methods: .split(), .join(), .strip(), .lower(), .upper(), .replace().',
        'Strings cannot be modified in place (s[0] = "a" raises TypeError).',
      ],
      codeSnippets: [
        {
          title: 'Slicing and methods',
          code: `text = "Python Quest"\nprint(text[0:6])   # 'Python'\nprint(text[::-1])  # 'tseuQ nohtyP'\nwords = text.split(" ")\nprint("-".join(words)) # 'Python-Quest'`,
          explanation: 'text[::-1] uses a step of -1 to reverse the string.',
        },
      ],
      realWorldUse: 'Parsing text commands, dialogue systems, inventory names, user input sanitization.',
    },
    visualizerType: 'array',
    tryItCode: `message = "Hello Adventurer"
print("Length:", len(message))
print("First 5 chars:", message[:5])
print("Reversed:", message[::-1])
print("Uppercase:", message.upper())
`,
    challengeId: 'ch-reverse-string',
    quiz: [
      {
        question: 'What is the result of "python"[1:4]?',
        options: ['"pyt"', '"yth"', '"ytho"', '"tho"'],
        correctIndex: 1,
        explanation: 'Index 1 is "y", index 2 is "t", index 3 is "h". Stop index 4 is exclusive.',
      },
    ],
  },
  {
    id: 'py-lists',
    slug: 'lists',
    title: 'Lists & Sequences',
    category: 'python_foundations',
    levelNumber: 1,
    order: 6,
    description: 'Dynamic mutable sequences: append, pop, index, sort, and slice.',
    estimatedMinutes: 16,
    xpReward: 50,
    icon: 'ListFilter',
    prerequisites: ['py-strings'],
    learnContent: {
      overview:
        'Lists are ordered, mutable collections of elements. They can store mixed data types and grow or shrink dynamically.',
      keyPoints: [
        '.append(x) adds an item to the end in O(1) amortized time.',
        '.pop() removes and returns the last item in O(1).',
        '.insert(idx, x) inserts at index in O(N) time.',
        'Lists support indexing, negative indexing, and slicing.',
      ],
      codeSnippets: [
        {
          title: 'List operations',
          code: `inventory = ["Sword", "Shield", "Potion"]\ninventory.append("Bow")\ninventory.remove("Shield")\nprint("Inventory:", inventory)`,
          explanation: 'Demonstrates appending and element removal.',
        },
      ],
      realWorldUse: 'Player inventory, leaderboard ranks, queue of game events, history undo/redo.',
    },
    visualizerType: 'array',
    tryItCode: `heroes = ["Knight", "Mage", "Ranger"]
heroes.append("Rogue")
print("Party:", heroes)
print("Party size:", len(heroes))
heroes.sort()
print("Alphabetical:", heroes)
`,
    challengeId: 'ch-find-max-array',
    quiz: [
      {
        question: 'What is the time complexity of appending an element to the end of a Python list?',
        options: ['O(1) amortized', 'O(N)', 'O(log N)', 'O(N^2)'],
        correctIndex: 0,
        explanation: 'Appending to the end is O(1) amortized due to dynamic over-allocation.',
      },
    ],
  },

  // LEVEL 3: DSA FOUNDATIONS (Arrays, Stacks, Queues, Hash Tables, Searching, Sorting)
  {
    id: 'dsa-arrays',
    slug: 'arrays',
    title: 'Arrays & Memory Layout',
    category: 'dsa_foundations',
    levelNumber: 3,
    order: 1,
    description: 'Master contiguous memory, pointer offsets, index math, and in-place transformations.',
    estimatedMinutes: 20,
    xpReward: 80,
    icon: 'LayoutGrid',
    prerequisites: ['py-lists'],
    learnContent: {
      overview:
        'An array is a collection of items stored at contiguous memory locations. Because memory addresses are consecutive, accessing array[i] takes O(1) constant time via base_address + i * size.',
      keyPoints: [
        'Access by index: O(1) instant lookup.',
        'Search in unsorted array: O(N) linear time.',
        'Insertion/Deletion at arbitrary index: O(N) due to element shifting.',
        'Two-pointer techniques unlock fast in-place solutions (e.g., palindrome check, reverse array).',
      ],
      codeSnippets: [
        {
          title: 'Two Pointers Reversal',
          code: `def reverse_in_place(arr):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        arr[left], arr[right] = arr[right], arr[left]\n        left += 1\n        right -= 1\n    return arr\n\nprint(reverse_in_place([1, 2, 3, 4, 5]))`,
          explanation: 'Reverses an array in O(N) time with O(1) auxiliary space.',
        },
      ],
      realWorldUse: 'Screen pixel buffers, audio sample arrays, database contiguous block storage.',
    },
    visualizerType: 'array',
    tryItCode: `arr = [10, 20, 30, 40, 50]
# Insert 25 at index 2
arr.insert(2, 25)
print("After insert:", arr)

# Delete item at index 4
deleted = arr.pop(4)
print(f"Deleted {deleted}, current array:", arr)
`,
    challengeId: 'ch-find-max-array',
    quiz: [
      {
        question: 'Why does inserting an element at index 0 of an array of length N take O(N) time?',
        options: [
          'Because all N subsequent elements must be shifted right by one position',
          'Because array lookup is slow',
          'Because Python creates a new array every time',
          'It is actually O(1)',
        ],
        correctIndex: 0,
        explanation: 'Contiguous memory requires shifting elements over to open up index 0.',
      },
    ],
  },
  {
    id: 'dsa-stacks',
    slug: 'stacks',
    title: 'Stacks (LIFO)',
    category: 'dsa_foundations',
    levelNumber: 3,
    order: 2,
    description: 'Last-In, First-Out: call stacks, parentheses validation, and undo history.',
    estimatedMinutes: 20,
    xpReward: 80,
    icon: 'Layers',
    prerequisites: ['dsa-arrays'],
    learnContent: {
      overview:
        'A Stack is a linear data structure following the LIFO (Last In First Out) principle. The last element added is the first one removed.',
      keyPoints: [
        'Push: Adds an element to the top — O(1).',
        'Pop: Removes the top element — O(1).',
        'Peek/Top: Views the top element without removing it — O(1).',
        'Crucial for compiler syntax parsing, call stacks in recursion, and browser history.',
      ],
      codeSnippets: [
        {
          title: 'Stack with Python list',
          code: `stack = []\nstack.append("Page 1") # Push\nstack.append("Page 2")\nstack.append("Page 3")\nprint("Current top:", stack[-1]) # Peek\nback_page = stack.pop()          # Pop\nprint("Went back from:", back_page)`,
          explanation: 'Python lists provide native O(1) push (append) and pop.',
        },
      ],
      realWorldUse: 'Undo/Redo systems, syntax parsing in code editors, call stack execution in virtual machines.',
    },
    visualizerType: 'stack',
    tryItCode: `stack = []

def push(item):
    stack.append(item)
    print(f"Pushed: {item} -> Stack: {stack}")

def pop():
    if stack:
        val = stack.pop()
        print(f"Popped: {val} -> Stack: {stack}")
        return val
    print("Stack Underflow!")
    return None

push(10)
push(20)
push(30)
pop()
print("Top element is:", stack[-1] if stack else "Empty")
`,
    challengeId: 'ch-valid-parentheses',
    quiz: [
      {
        question: 'Which principle does a Stack follow?',
        options: ['LIFO (Last In First Out)', 'FIFO (First In First Out)', 'Random Access', 'Priority Queue'],
        correctIndex: 0,
        explanation: 'Stack items are removed in reverse chronological order of their addition.',
      },
    ],
  },
  {
    id: 'dsa-queues',
    slug: 'queues',
    title: 'Queues & Deques (FIFO)',
    category: 'dsa_foundations',
    levelNumber: 3,
    order: 3,
    description: 'First-In, First-Out: buffer pipelines, request handling, and BFS breadth queues.',
    estimatedMinutes: 20,
    xpReward: 80,
    icon: 'Clock',
    prerequisites: ['dsa-stacks'],
    learnContent: {
      overview:
        'A Queue is a linear data structure that follows the FIFO (First In First Out) principle. The first element enqueued is the first element dequeued.',
      keyPoints: [
        'Enqueue: Inserts an element at the rear — O(1).',
        'Dequeue: Removes an element from the front — O(1) with collections.deque.',
        'Using list.pop(0) is slow O(N) because all elements shift. Always use collections.deque for O(1) queue ops in Python.',
        'Foundational data structure for Breadth-First Search (BFS) graph traversals.',
      ],
      codeSnippets: [
        {
          title: 'Using collections.deque',
          code: `from collections import deque\nqueue = deque()\nqueue.append("Client A")  # Enqueue\nqueue.append("Client B")\nfirst_served = queue.popleft() # Dequeue in O(1)\nprint("Served:", first_served)`,
          explanation: 'deque.popleft() runs in O(1) time without shifting elements.',
        },
      ],
      realWorldUse: 'Printer spoolers, task scheduling queues (Celery/RabbitMQ), multiplayer matchmaking lobbies.',
    },
    visualizerType: 'queue',
    tryItCode: `from collections import deque

service_line = deque(["Customer #1", "Customer #2", "Customer #3"])
print("Initial line:", list(service_line))

# Add a newcomer to the back
service_line.append("Customer #4")

# Serve the first customer
served = service_line.popleft()
print(f"Now serving: {served}")
print("Remaining in queue:", list(service_line))
`,
    challengeId: 'ch-valid-parentheses',
    quiz: [
      {
        question: 'Why should you use collections.deque instead of list for queues in Python?',
        options: [
          'Because deque.popleft() is O(1) while list.pop(0) is O(N)',
          'Because lists cannot store strings',
          'Because deques are sorted automatically',
          'There is no performance difference',
        ],
        correctIndex: 0,
        explanation: 'list.pop(0) requires shifting all remaining elements left in memory, making it O(N).',
      },
    ],
  },
  {
    id: 'dsa-hash-tables',
    slug: 'hash-tables',
    title: 'Hash Tables & Dictionaries',
    category: 'dsa_foundations',
    levelNumber: 3,
    order: 4,
    description: 'O(1) average lookup via hashing functions, collision resolution, and key-value mapping.',
    estimatedMinutes: 22,
    xpReward: 90,
    icon: 'Hash',
    prerequisites: ['dsa-arrays'],
    learnContent: {
      overview:
        'Hash tables map keys to values using a mathematical hash function that computes an index into an array of buckets. They achieve O(1) average lookup, insert, and delete.',
      keyPoints: [
        'Average time complexity: O(1) for insert, search, delete.',
        'Worst-case time: O(N) when all keys hash to the same bucket (collision).',
        'Python dicts use an open-addressing compact hash table.',
        'Keys must be hashable and immutable (int, str, tuple; not lists or dicts).',
      ],
      codeSnippets: [
        {
          title: 'Frequency Counter Pattern',
          code: `words = ["sword", "shield", "sword", "potion", "sword"]\ncounts = {}\nfor item in words:\n    counts[item] = counts.get(item, 0) + 1\nprint(counts)`,
          explanation: 'Counts frequencies in O(N) total time.',
        },
      ],
      realWorldUse: 'Database indexing, caching (Redis), symbol tables in compilers, user authentication lookup.',
    },
    visualizerType: 'array',
    tryItCode: `loot_table = {
    "Dragon Blade": 95,
    "Elixir": 50,
    "Wooden Stick": 5
}

# O(1) lookup
print("Dragon Blade damage:", loot_table["Dragon Blade"])

# Check membership in O(1)
if "Elixir" in loot_table:
    print("Found Elixir in table!")
`,
    challengeId: 'ch-two-sum',
    quiz: [
      {
        question: 'What is the average time complexity to lookup a key in a Python dictionary?',
        options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
        correctIndex: 0,
        explanation: 'Hash functions calculate memory offsets directly in O(1) average time.',
      },
    ],
  },
  {
    id: 'dsa-searching',
    slug: 'searching',
    title: 'Searching: Linear vs Binary Search',
    category: 'dsa_foundations',
    levelNumber: 3,
    order: 5,
    description: 'Divide-and-conquer on sorted datasets: O(log N) binary search vs O(N) linear search.',
    estimatedMinutes: 20,
    xpReward: 90,
    icon: 'Search',
    prerequisites: ['dsa-arrays'],
    learnContent: {
      overview:
        'Searching is the algorithmic process of locating target elements. Linear search scans element by element O(N). If data is sorted, Binary Search cuts the search space in half each iteration: O(log N).',
      keyPoints: [
        'Linear Search works on unsorted collections in O(N) time.',
        'Binary Search requires a sorted collection and operates in O(log N) time.',
        'In 1,000,000 items, Linear Search takes up to 1,000,000 steps; Binary Search takes at most 20 steps!',
        'mid = (left + right) // 2.',
      ],
      codeSnippets: [
        {
          title: 'Binary Search Implementation',
          code: `def binary_search(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`,
          explanation: 'Halves the search boundaries on every iteration.',
        },
      ],
      realWorldUse: 'Git bisect to find bug commits, database B-tree lookups, dictionary word lookup.',
    },
    visualizerType: 'sorting',
    tryItCode: `nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target = 23

low, high = 0, len(nums) - 1
steps = 0

while low <= high:
    steps += 1
    mid = (low + high) // 2
    print(f"Step {steps}: checking index {mid} (value={nums[mid]})")
    if nums[mid] == target:
        print(f"Target {target} located at index {mid} in {steps} steps!")
        break
    elif nums[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
`,
    challengeId: 'ch-binary-search',
    quiz: [
      {
        question: 'What is the maximum number of comparisons Binary Search takes on a list of 1,024 elements?',
        options: ['10 or 11 comparisons (log2 1024 = 10)', '512', '1024', '1'],
        correctIndex: 0,
        explanation: 'log2(1024) = 10. Halving 1024 elements ten times leaves 1 element.',
      },
    ],
  },
  {
    id: 'dsa-sorting',
    slug: 'sorting',
    title: 'Sorting Algorithms',
    category: 'dsa_foundations',
    levelNumber: 3,
    order: 6,
    description: 'Compare O(N^2) algorithms (Bubble, Selection, Insertion) vs O(N log N) (Merge, Quick Sort).',
    estimatedMinutes: 25,
    xpReward: 100,
    icon: 'ArrowDownUp',
    prerequisites: ['dsa-searching'],
    learnContent: {
      overview:
        'Sorting rearranges data into monotonic order. Elementary algorithms like Bubble and Selection sort take O(N^2), whereas divide-and-conquer algorithms like Merge Sort and Quick Sort achieve O(N log N).',
      keyPoints: [
        'Bubble Sort: repeatedly steps through list, swapping adjacent out-of-order items — O(N^2).',
        'Selection Sort: repeatedly finds the minimum element and places it at the front — O(N^2).',
        'Merge Sort: recursively divides array in halves, sorts them, and merges them back — O(N log N) stable.',
        'Quick Sort: partitions array around a chosen pivot — O(N log N) average, O(N^2) worst case.',
      ],
      codeSnippets: [
        {
          title: 'Quick Sort in Python',
          code: `def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n\nprint(quicksort([38, 27, 43, 3, 9, 82, 10]))`,
          explanation: 'Elegant recursive partition-based sort.',
        },
      ],
      realWorldUse: 'Timsort in Python, e-commerce price/rating sorting, database index creation.',
    },
    visualizerType: 'sorting',
    tryItCode: `def bubble_sort(arr):
    n = len(arr)
    swaps = 0
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swaps += 1
    return arr, swaps

data = [64, 34, 25, 12, 22, 11, 90]
sorted_data, total_swaps = bubble_sort(data.copy())
print("Original:", data)
print("Sorted:", sorted_data)
print("Total swaps performed:", total_swaps)
`,
    challengeId: 'ch-find-max-array',
    quiz: [
      {
        question: 'Which sorting algorithm has a guaranteed worst-case time complexity of O(N log N)?',
        options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Insertion Sort'],
        correctIndex: 0,
        explanation: 'Merge Sort consistently divides in half and merges, guaranteeing O(N log N) even in the worst case.',
      },
    ],
  },

  // LEVEL 4: ADVANCED DSA (Trees, BST, Graphs, BFS, DFS, DP)
  {
    id: 'dsa-trees',
    slug: 'trees',
    title: 'Trees & Binary Search Trees',
    category: 'advanced_dsa',
    levelNumber: 4,
    order: 1,
    description: 'Hierarchical node structures, BST property (left < root < right), and tree traversals.',
    estimatedMinutes: 25,
    xpReward: 120,
    icon: 'GitFork',
    prerequisites: ['dsa-sorting'],
    learnContent: {
      overview:
        'A Tree is a hierarchical non-linear data structure consisting of nodes connected by edges. In a Binary Search Tree (BST), every left descendant has a value smaller than the root, and every right descendant has a value greater.',
      keyPoints: [
        'BST Property: Left child < Node < Right child.',
        'Search, Insert, Delete in balanced BST: O(log N).',
        'Inorder Traversal (Left, Root, Right) of a BST visits nodes in strictly sorted order!',
        'Preorder: Root, Left, Right. Postorder: Left, Right, Root.',
      ],
      codeSnippets: [
        {
          title: 'BST Node Definition & Inorder Traversal',
          code: `class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef inorder(root):\n    return inorder(root.left) + [root.val] + inorder(root.right) if root else []`,
          explanation: 'Recursive inorder traversal produces sorted list of values.',
        },
      ],
      realWorldUse: 'DOM tree in browsers, filesystem directory hierarchies, database B+ Trees, abstract syntax trees (ASTs).',
    },
    visualizerType: 'tree',
    tryItCode: `class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

root = Node(50)
root.left = Node(30)
root.right = Node(70)
root.left.left = Node(20)
root.left.right = Node(40)

def inorder(node):
    if not node:
        return []
    return inorder(node.left) + [node.val] + inorder(node.right)

print("Inorder sorted traversal:", inorder(root))
`,
    challengeId: 'ch-binary-search',
    quiz: [
      {
        question: 'Which traversal of a Binary Search Tree produces values in strictly sorted ascending order?',
        options: ['Inorder (Left -> Root -> Right)', 'Preorder (Root -> Left -> Right)', 'Postorder', 'Level-order'],
        correctIndex: 0,
        explanation: 'Inorder processes left smaller nodes, then the parent, then right larger nodes.',
      },
    ],
  },
  {
    id: 'dsa-graphs',
    slug: 'graphs',
    title: 'Graphs & BFS / DFS',
    category: 'advanced_dsa',
    levelNumber: 4,
    order: 2,
    description: 'Vertices and edges: Adjacency Lists, Breadth-First Search (Queue), and Depth-First Search (Stack).',
    estimatedMinutes: 28,
    xpReward: 130,
    icon: 'Share2',
    prerequisites: ['dsa-trees'],
    learnContent: {
      overview:
        'A Graph consists of a set of vertices (nodes) and edges connecting them. They can be directed, undirected, weighted, or unweighted. BFS finds the shortest path in unweighted graphs using a queue; DFS explores branches deeply using recursion or a stack.',
      keyPoints: [
        'Representations: Adjacency List (space O(V + E)) vs Adjacency Matrix (space O(V^2)).',
        'BFS uses a Queue to explore layer by layer; guarantees shortest unweighted path.',
        'DFS uses a Stack or Recursion; great for cycle detection, topological sort, maze solving.',
        'Always track a "visited" set to prevent infinite loops in cyclic graphs.',
      ],
      codeSnippets: [
        {
          title: 'BFS Traversal with Queue',
          code: `from collections import deque\ndef bfs(graph, start):\n    visited = {start}\n    queue = deque([start])\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph.get(node, []):\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return order`,
          explanation: 'Explores outwards layer by layer.',
        },
      ],
      realWorldUse: 'Social network friend connections, Google Maps road navigation, network packet routing.',
    },
    visualizerType: 'graph',
    tryItCode: `from collections import deque

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

def bfs_path(graph, start, target):
    queue = deque([[start]])
    visited = {start}
    while queue:
        path = queue.popleft()
        node = path[-1]
        if node == target:
            return path
        for nxt in graph[node]:
            if nxt not in visited:
                visited.add(nxt)
                queue.append(path + [nxt])
    return None

print("Shortest path from A to F:", bfs_path(graph, 'A', 'F'))
`,
    challengeId: 'ch-binary-search',
    quiz: [
      {
        question: 'Which algorithm is guaranteed to find the shortest path in an unweighted graph?',
        options: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Linear Search', 'Binary Search'],
        correctIndex: 0,
        explanation: 'BFS explores nodes in increasing order of their distance from the start node.',
      },
    ],
  },
  {
    id: 'dsa-dynamic-programming',
    slug: 'dynamic-programming',
    title: 'Dynamic Programming & Memoization',
    category: 'advanced_dsa',
    levelNumber: 4,
    order: 3,
    description: 'Transform exponential O(2^N) recursion into polynomial O(N) using optimal substructure and overlapping subproblems.',
    estimatedMinutes: 30,
    xpReward: 150,
    icon: 'Cpu',
    prerequisites: ['dsa-graphs'],
    learnContent: {
      overview:
        'Dynamic Programming solves complex problems by breaking them down into simpler subproblems, solving each subproblem once, and storing their solutions (memoization or tabulation) to avoid redundant recalculation.',
      keyPoints: [
        'Requires two properties: Overlapping Subproblems and Optimal Substructure.',
        'Top-Down: Memoized recursion (store computed results in a hash table / cache).',
        'Bottom-Up: Tabulation (iteratively fill a DP array from base cases up).',
        'Reduces exponential complexity (e.g., 2^N) down to linear O(N) or polynomial O(N^2).',
      ],
      codeSnippets: [
        {
          title: 'Fibonacci Tabulation vs Memoization',
          code: `def fib_dp(n):\n    if n <= 1: return n\n    dp = [0] * (n + 1)\n    dp[1] = 1\n    for i in range(2, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]\n\nprint("Fib(30):", fib_dp(30))`,
          explanation: 'Computes in O(N) time with O(N) space instead of 2^30 recursive operations.',
        },
      ],
      realWorldUse: 'Genome sequence alignment (Bioinformatics), GPS route calculation, financial portfolio optimization.',
    },
    visualizerType: 'code_flow',
    tryItCode: `# Climbing Stairs Problem: You can climb 1 or 2 steps.
# How many distinct ways to reach the top of step N?
def climb_stairs(n):
    if n <= 2:
        return n
    first, second = 1, 2
    for _ in range(3, n + 1):
        first, second = second, first + second
    return second

for steps in range(1, 8):
    print(f"{steps} stairs -> {climb_stairs(steps)} distinct ways")
`,
    challengeId: 'ch-fibonacci-dp',
    quiz: [
      {
        question: 'What are the two key characteristics required for a problem to be solved using Dynamic Programming?',
        options: [
          'Overlapping subproblems and optimal substructure',
          'Sorted inputs and hash tables',
          'Binary trees and queues',
          'Parallel threads and random access',
        ],
        correctIndex: 0,
        explanation: 'Dynamic Programming requires that subproblems recur repeatedly and optimal global solutions derive from optimal subproblem solutions.',
      },
    ],
  },
];
