import { Request, Response } from 'express';
import { db } from '../config/database.js';

export function getLeaderboard(req: Request, res: Response) {
  const users = db.getAllUsers();
  const timeFrame = (req.query.timeframe as string) || 'global';

  // Sort primarily by XP descending
  const sorted = [...users].sort((a, b) => {
    if (b.xp !== a.xp) return b.xp - a.xp;
    return b.streak - a.streak;
  });

  // Generate clean public leaderboard entries without sensitive credentials
  const leaderboard = sorted.map((u, index) => {
    let xpDisplay = u.xp;
    let solvedCount = u.completedChallenges.length;

    // Simulate slight weekly/monthly variance for realistic leaderboard views
    if (timeFrame === 'weekly') {
      xpDisplay = Math.round(u.xp * 0.35 + (index % 3) * 40);
      solvedCount = Math.max(1, Math.round(u.completedChallenges.length * 0.4));
    } else if (timeFrame === 'monthly') {
      xpDisplay = Math.round(u.xp * 0.8 + (index % 5) * 60);
      solvedCount = Math.max(1, Math.round(u.completedChallenges.length * 0.75));
    }

    return {
      rank: index + 1,
      id: u.id,
      name: u.name,
      avatar: u.avatar,
      level: u.level,
      xp: xpDisplay,
      streak: u.streak,
      challengesSolved: solvedCount,
      badgesCount: u.badges.length,
    };
  });

  return res.json({ leaderboard, timeframe: timeFrame });
}
