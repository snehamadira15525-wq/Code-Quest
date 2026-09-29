import { Response } from 'express';
import { db } from '../config/database.js';
import { AuthRequest } from '../middleware/auth.js';
import { calculateLevel, checkNewBadges } from './topicsController.js';
import { sanitizeUser } from './authController.js';

export function getDailyChallenge(req: AuthRequest, res: Response) {
  const result = db.getTodayChallenge();
  if (!result) {
    return res.status(404).json({ message: 'No daily challenge active today' });
  }

  const { daily, challenge } = result;
  const isCompleted = req.user ? req.user.completedChallenges.includes(challenge.id) : false;

  return res.json({
    dailyChallenge: {
      id: daily.id,
      date: daily.date,
      bonusXP: daily.bonusXP,
      isCompleted,
      challenge: {
        id: challenge.id,
        title: challenge.title,
        difficulty: challenge.difficulty,
        category: challenge.category,
        xpReward: challenge.xpReward + daily.bonusXP,
        description: challenge.description,
        examples: challenge.examples,
        constraints: challenge.constraints,
        starterCode: challenge.starterCode,
      },
    },
  });
}

export function completeDailyChallenge(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const result = db.getTodayChallenge();
  if (!result) {
    return res.status(404).json({ message: 'No active daily challenge' });
  }

  const { daily, challenge } = result;
  const alreadyCompleted = req.user.completedChallenges.includes(challenge.id);

  if (alreadyCompleted) {
    return res.json({
      success: true,
      alreadyCompleted: true,
      message: 'Daily challenge already recorded for today!',
    });
  }

  const bonusXp = daily.bonusXP + challenge.xpReward;
  const bonusCoins = 50;
  const newXp = req.user.xp + bonusXp;
  const newCoins = req.user.coins + bonusCoins;
  const newStreak = req.user.streak + 1;
  const newLevel = calculateLevel(newXp);
  const completedChallenges = [...req.user.completedChallenges, challenge.id];

  const newBadges = checkNewBadges({
    ...req.user,
    completedChallenges,
    streak: newStreak,
    xp: newXp,
  });

  const updatedUser = db.updateUser(req.user.id, {
    completedChallenges,
    xp: newXp,
    coins: newCoins,
    streak: newStreak,
    level: newLevel,
    lastActiveDate: new Date().toISOString().split('T')[0],
    badges: Array.from(new Set([...req.user.badges, ...newBadges])),
    gameStats: {
      ...req.user.gameStats,
      challengesSolved: req.user.gameStats.challengesSolved + 1,
    },
  });

  return res.json({
    success: true,
    earnedXp: bonusXp,
    earnedCoins: bonusCoins,
    newStreak,
    newLevel,
    newBadges,
    user: updatedUser ? sanitizeUser(updatedUser) : undefined,
  });
}
