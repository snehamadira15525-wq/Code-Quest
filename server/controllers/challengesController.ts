import { Response } from 'express';
import { db } from '../config/database.js';
import { AuthRequest } from '../middleware/auth.js';
import { executePythonRaw, evaluatePythonSubmission } from '../services/pythonRunner.js';
import { calculateLevel, checkNewBadges } from './topicsController.js';
import { sanitizeUser } from './authController.js';
import { Submission } from '../../src/types/index.js';

export function getChallenges(req: AuthRequest, res: Response) {
  const challenges = db.getAllChallenges();
  const user = req.user;

  const userCompleted = user ? new Set(user.completedChallenges) : new Set();

  const formatted = challenges.map((c) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    difficulty: c.difficulty,
    category: c.category,
    xpReward: c.xpReward,
    description: c.description,
    examples: c.examples,
    constraints: c.constraints,
    isSolved: userCompleted.has(c.id),
  }));

  return res.json({ challenges: formatted });
}

export function getChallengeById(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const challenge = db.findChallengeById(id);

  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }

  const user = req.user;
  const isSolved = user ? user.completedChallenges.includes(challenge.id) : false;

  // Filter out hidden test cases in response for fairness
  const publicTestCases = challenge.testCases.map((tc) => ({
    input: tc.input,
    expectedOutput: tc.expectedOutput,
    isHidden: tc.isHidden || false,
  }));

  return res.json({
    challenge: {
      ...challenge,
      testCases: publicTestCases,
      isSolved,
    },
  });
}

/**
 * Execute raw Python code without formal challenge submission
 */
export async function runCode(req: AuthRequest, res: Response) {
  const { code, input } = req.body;

  if (typeof code !== 'string') {
    return res.status(400).json({ message: 'Code string required' });
  }

  const result = await executePythonRaw(code, input || '');

  // Increment linesOfCodeRun if user is logged in
  if (req.user) {
    const linesCount = code.split('\n').filter((l) => l.trim().length > 0).length;
    db.updateUser(req.user.id, {
      gameStats: {
        ...req.user.gameStats,
        linesOfCodeRun: req.user.gameStats.linesOfCodeRun + linesCount,
      },
    });
  }

  return res.json(result);
}

/**
 * Submit challenge solution code to evaluate against all test cases
 */
export async function submitChallenge(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { code } = req.body;

  if (typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ message: 'Code cannot be empty' });
  }

  const challenge = db.findChallengeById(id);
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }

  const evalResult = await evaluatePythonSubmission(code, challenge.testCases);

  const submission: Submission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    userId: req.user ? req.user.id : 'guest',
    challengeId: challenge.id,
    code,
    language: 'python',
    passed: evalResult.allPassed,
    passedTests: evalResult.passedTests,
    totalTests: evalResult.totalTests,
    runtimeMs: evalResult.runtimeMs,
    createdAt: new Date().toISOString(),
  };

  db.createSubmission(submission);

  let earnedXp = 0;
  let earnedCoins = 0;
  let newLevel = req.user ? req.user.level : 1;
  let newBadges: string[] = [];
  let updatedUser = req.user;

  if (evalResult.allPassed && req.user) {
    const alreadySolved = req.user.completedChallenges.includes(challenge.id);
    if (!alreadySolved) {
      earnedXp = challenge.xpReward;
      earnedCoins = 30;
      const completedChallenges = [...req.user.completedChallenges, challenge.id];
      const newXp = req.user.xp + earnedXp;
      const newCoins = req.user.coins + earnedCoins;
      newLevel = calculateLevel(newXp);

      newBadges = checkNewBadges({
        ...req.user,
        completedChallenges,
        xp: newXp,
      });

      if (evalResult.runtimeMs < 1000 && !req.user.badges.includes('speed_coder')) {
        newBadges.push('speed_coder');
      }

      updatedUser = db.updateUser(req.user.id, {
        completedChallenges,
        xp: newXp,
        coins: newCoins,
        level: newLevel,
        badges: Array.from(new Set([...req.user.badges, ...newBadges])),
        gameStats: {
          ...req.user.gameStats,
          challengesSolved: req.user.gameStats.challengesSolved + 1,
        },
      });
    }
  }

  return res.json({
    passed: evalResult.allPassed,
    passedTests: evalResult.passedTests,
    totalTests: evalResult.totalTests,
    runtimeMs: evalResult.runtimeMs,
    results: evalResult.results,
    earnedXp,
    earnedCoins,
    newLevel,
    newBadges,
    user: updatedUser ? sanitizeUser(updatedUser) : undefined,
  });
}
