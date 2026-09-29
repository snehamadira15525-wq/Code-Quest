import { Router } from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
} from '../controllers/authController.js';
import {
  getTopics,
  getTopicById,
  completeQuiz,
} from '../controllers/topicsController.js';
import {
  getChallenges,
  getChallengeById,
  runCode,
  submitChallenge,
} from '../controllers/challengesController.js';
import {
  getGames,
  getGameById,
  completeGame,
} from '../controllers/gamesController.js';
import { getLeaderboard } from '../controllers/leaderboardController.js';
import {
  getDailyChallenge,
  completeDailyChallenge,
} from '../controllers/dailyController.js';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth.js';
import { db } from '../config/database.js';

const router = Router();

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', authMiddleware, getMe);
router.put('/profile', authMiddleware, updateProfile);

// Topics routes
router.get('/topics', optionalAuthMiddleware, getTopics);
router.get('/topics/:id', optionalAuthMiddleware, getTopicById);
router.post('/topics/:id/quiz', authMiddleware, completeQuiz);

// Challenges routes
router.get('/challenges', optionalAuthMiddleware, getChallenges);
router.get('/challenges/:id', optionalAuthMiddleware, getChallengeById);
router.post('/challenges/run', optionalAuthMiddleware, runCode);
router.post('/challenges/:id/submit', optionalAuthMiddleware, submitChallenge);

// Games routes
router.get('/games', optionalAuthMiddleware, getGames);
router.get('/games/:id', optionalAuthMiddleware, getGameById);
router.post('/games/:id/complete', optionalAuthMiddleware, completeGame);

// Leaderboard & Daily
router.get('/leaderboard', getLeaderboard);
router.get('/daily-challenge', optionalAuthMiddleware, getDailyChallenge);
router.post('/daily-challenge/complete', authMiddleware, completeDailyChallenge);

// Badges list
router.get('/badges', (req, res) => {
  res.json({ badges: db.getAllBadges() });
});

export default router;
