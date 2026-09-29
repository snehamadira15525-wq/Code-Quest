import { Response } from 'express';
import { db } from '../config/database.js';
import { AuthRequest } from '../middleware/auth.js';
import { calculateLevel, checkNewBadges } from './topicsController.js';
import { sanitizeUser } from './authController.js';

export function getGames(req: AuthRequest, res: Response) {
  const games = db.getAllGames();
  const user = req.user;

  const formatted = games.map((g) => ({
    ...g,
    highScore: user && user.completedGames ? user.completedGames[g.id] || 0 : 0,
    isCompleted: user && user.completedGames ? Boolean(user.completedGames[g.id]) : false,
  }));

  return res.json({ games: formatted });
}

export function getGameById(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const game = db.findGameById(id);

  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }

  const user = req.user;
  const highScore = user && user.completedGames ? user.completedGames[game.id] || 0 : 0;

  return res.json({
    game: {
      ...game,
      highScore,
      isCompleted: highScore > 0,
    },
  });
}

export function completeGame(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { score } = req.body;

  const game = db.findGameById(id);
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }

  const numericScore = typeof score === 'number' ? score : 1;

  if (!req.user) {
    return res.json({
      success: true,
      earnedXp: game.xpReward,
      earnedCoins: game.coinsReward,
      score: numericScore,
      message: 'Guest run complete! Log in to save high scores and badges.',
    });
  }

  const user = req.user;
  const previousHigh = user.completedGames[game.id] || 0;
  const isFirstTime = previousHigh === 0;

  // Base reward + score multiplier
  const earnedXp = isFirstTime ? game.xpReward : Math.floor(game.xpReward * 0.4);
  const earnedCoins = isFirstTime ? game.coinsReward : Math.floor(game.coinsReward * 0.5);

  const updatedGames = {
    ...user.completedGames,
    [game.id]: Math.max(previousHigh, numericScore),
  };

  const newXp = user.xp + earnedXp;
  const newCoins = user.coins + earnedCoins;
  const newLevel = calculateLevel(newXp);

  const newBadges: string[] = checkNewBadges({
    ...user,
    completedGames: updatedGames,
    xp: newXp,
  });

  // Check Arcade Champion badge if completed all 10 games
  const totalGamesCount = db.getAllGames().length;
  const userCompletedCount = Object.keys(updatedGames).length;
  if (userCompletedCount >= totalGamesCount && !user.badges.includes('game_champion')) {
    newBadges.push('game_champion');
  }

  const updatedUser = db.updateUser(user.id, {
    completedGames: updatedGames,
    xp: newXp,
    coins: newCoins,
    level: newLevel,
    badges: Array.from(new Set([...user.badges, ...newBadges])),
    gameStats: {
      ...user.gameStats,
      gamesPlayed: user.gameStats.gamesPlayed + 1,
    },
  });

  return res.json({
    success: true,
    earnedXp,
    earnedCoins,
    score: numericScore,
    isNewHighScore: numericScore > previousHigh,
    newLevel,
    newBadges,
    user: updatedUser ? sanitizeUser(updatedUser) : undefined,
  });
}
