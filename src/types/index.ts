export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatar: string;
  level: number;
  xp: number;
  coins: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedTopics: string[];
  completedChallenges: string[];
  completedGames: { [gameId: string]: number };
  levelStars: { [levelId: string]: number }; // levelId -> 1..3 stars
  levelScores: { [levelId: string]: number }; // levelId -> high score
  unlockedLevel: number; // 1..10
  badges: string[];
  gameStats: {
    gamesPlayed: number;
    challengesSolved: number;
    quizzesCompleted: number;
    linesOfCodeRun: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderGameStep {
  id: string;
  text: string;
  correctIndex: number;
}

export interface MissingCodeGame {
  codeTemplate: string; // e.g. "for i in range(___1___):\n    if arr[i] ___2___ target:\n        return i"
  blanks: {
    id: string;
    correctAnswer: string;
    options: string[];
    hint: string;
  }[];
  explanation: string;
}

export interface OrderGame {
  prompt: string;
  steps: { id: string; code: string }[];
  correctOrder: string[]; // array of step IDs
  explanation: string;
}

export interface DSALevelTopic {
  levelNumber: number; // 1 to 10
  id: string;
  title: string;
  slug: string;
  realmName: string; // e.g. "Strawberry Steppes"
  themeColor: string; // e.g. "emerald", "pink", "purple", etc.
  icon: string;
  estimatedMinutes: number;
  xpReward: number;
  visualizerType: 'array' | 'stack' | 'queue' | 'tree' | 'graph' | 'sorting';
  
  // 1. Learning Concept
  learningConcept: {
    analogy: string;
    conceptOverview: string;
    keyMechanics: string[];
    complexity: {
      time: string;
      space: string;
    };
    codeSnippets: {
      title: string;
      code: string;
      explanation: string;
    }[];
  };

  // 2. Write Code & Give Answers Also
  codingChallenge: {
    problemStatement: string;
    constraints: string[];
    examples: { input: string; output: string; explanation?: string }[];
    starterCode: string;
    officialSolution: {
      code: string;
      explanation: string;
      keyTechnique: string;
    };
    testCases: { input: string; expectedOutput: string; isHidden?: boolean }[];
  };

  // 3. Mini-Game: Select Correct Order
  orderGame: OrderGame;

  // 4. Mini-Game: Missing Code Lines
  missingCodeGame: MissingCodeGame;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'milestone' | 'skill' | 'streak' | 'game';
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  xpReward: number;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: string;
  testCases: TestCase[];
}

export interface GameInfo {
  id: string;
  title: string;
  subtitle: string;
  category: 'Python' | 'DSA';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  coinsReward: number;
  icon: string;
  description: string;
  conceptCovered: string;
}

export interface DailyChallenge {
  id: string;
  date: string;
  challengeId: string;
  bonusXP: number;
  streakBonus: boolean;
}

export interface Submission {
  id: string;
  userId: string;
  challengeId: string;
  code: string;
  language: string;
  passed: boolean;
  passedTests: number;
  totalTests: number;
  runtimeMs: number;
  createdAt: string;
}
