import { Response } from 'express';
import { db } from '../config/database.js';
import { AuthRequest } from '../middleware/auth.js';
import { sanitizeUser } from './authController.js';

export function calculateLevel(xp: number): number {
  // Progression curve: Level 1: 0, Level 2: 250, Level 3: 500, Level 4: 850, Level 5: 1250, etc.
  return Math.max(1, Math.floor(Math.sqrt(xp / 50)) + 1);
}

export function checkNewBadges(user: any): string[] {
  const newBadges: string[] = [];

  if (user.completedTopics.length >= 1 && !user.badges.includes('first_steps')) {
    newBadges.push('first_steps');
  }

  const pyFoundationsCompleted = user.completedTopics.filter((t: string) => t.startsWith('py-')).length;
  if (pyFoundationsCompleted >= 4 && !user.badges.includes('python_beginner')) {
    newBadges.push('python_beginner');
  }

  const dsaCompleted = user.completedTopics.filter((t: string) => t.startsWith('dsa-')).length;
  if (dsaCompleted >= 4 && !user.badges.includes('dsa_explorer')) {
    newBadges.push('dsa_explorer');
  }

  if (user.streak >= 7 && !user.badges.includes('week_warrior')) {
    newBadges.push('week_warrior');
  }

  if (user.completedChallenges.length >= 5 && !user.badges.includes('problem_solver')) {
    newBadges.push('problem_solver');
  }

  return newBadges;
}

export function getTopics(req: AuthRequest, res: Response) {
  const topics = db.getAllTopics();
  const user = req.user;

  const topicsWithStatus = topics.map((t) => {
    const isCompleted = user ? user.completedTopics.includes(t.id) : false;
    // Check if prerequisites are satisfied
    const prereqsMet =
      t.prerequisites.length === 0 ||
      (user && t.prerequisites.every((prereqId) => user.completedTopics.includes(prereqId)));
    
    return {
      ...t,
      isCompleted,
      isUnlocked: !user || prereqsMet || isCompleted,
    };
  });

  return res.json({ topics: topicsWithStatus });
}

export function getTopicById(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const topic = db.findTopicById(id);

  if (!topic) {
    return res.status(404).json({ message: 'Topic not found' });
  }

  const user = req.user;
  const isCompleted = user ? user.completedTopics.includes(topic.id) : false;

  return res.json({
    topic: {
      ...topic,
      isCompleted,
      isUnlocked: true,
    },
  });
}

export function completeQuiz(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const { id } = req.params;
  const { answers } = req.body; // array of selected indices

  const topic = db.findTopicById(id);
  if (!topic) {
    return res.status(404).json({ message: 'Topic not found' });
  }

  if (!Array.isArray(answers)) {
    return res.status(400).json({ message: 'Answers array required' });
  }

  let correctCount = 0;
  topic.quiz.forEach((q, idx) => {
    if (answers[idx] === q.correctIndex) {
      correctCount++;
    }
  });

  const totalQuestions = topic.quiz.length;
  const isPassed = correctCount >= Math.ceil(totalQuestions * 0.7);
  const isPerfect = correctCount === totalQuestions;

  let earnedXp = 0;
  let earnedCoins = 0;

  let user = req.user;
  const alreadyCompleted = user.completedTopics.includes(topic.id);

  if (isPassed && !alreadyCompleted) {
    earnedXp = topic.xpReward;
    earnedCoins = 25;
    const completedTopics = [...user.completedTopics, topic.id];
    const newXp = user.xp + earnedXp;
    const newCoins = user.coins + earnedCoins;
    const newLevel = calculateLevel(newXp);

    const badgesToAdd = checkNewBadges({
      ...user,
      completedTopics,
      xp: newXp,
    });

    if (isPerfect && !user.badges.includes('perfect_score')) {
      badgesToAdd.push('perfect_score');
    }

    const updatedUser = db.updateUser(user.id, {
      completedTopics,
      xp: newXp,
      coins: newCoins,
      level: newLevel,
      badges: Array.from(new Set([...user.badges, ...badgesToAdd])),
      gameStats: {
        ...user.gameStats,
        quizzesCompleted: user.gameStats.quizzesCompleted + 1,
      },
    });

    return res.json({
      success: true,
      passed: true,
      score: `${correctCount}/${totalQuestions}`,
      earnedXp,
      earnedCoins,
      newLevel,
      newBadges: badgesToAdd,
      user: updatedUser ? sanitizeUser(updatedUser) : undefined,
    });
  }

  return res.json({
    success: true,
    passed: isPassed,
    score: `${correctCount}/${totalQuestions}`,
    earnedXp: 0,
    earnedCoins: 0,
    alreadyCompleted,
    message: isPassed ? 'Quiz already completed previously' : 'Score too low to earn completion XP. Try again!',
  });
}
