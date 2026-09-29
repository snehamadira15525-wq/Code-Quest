import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User.js';
import { TopicModel } from '../models/Topic.js';
import { ChallengeModel } from '../models/Challenge.js';
import { GameModel, BadgeModel, DailyChallengeModel } from '../models/Game.js';
import {
  INITIAL_BADGES,
  INITIAL_CHALLENGES,
  INITIAL_GAMES,
  INITIAL_TOPICS,
} from '../seed/seedData.js';

let isConnected = false;

export function isMongoConnected(): boolean {
  return isConnected;
}

export async function connectMongoDB(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('[Database] MONGODB_URI not set. Running with built-in persistent document store.');
    return false;
  }

  try {
    console.log(`[Database] Attempting connection to MongoDB at: ${uri.replace(/\/\/.*@/, '//***@')}`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    isConnected = true;
    console.log('[Database] Successfully connected to MongoDB via Mongoose!');
    await seedMongoDatabase();
    return true;
  } catch (err: any) {
    console.warn(`[Database] MongoDB connection warning: ${err.message}. Seamlessly falling back to local persistent store.`);
    isConnected = false;
    return false;
  }
}

export async function seedMongoDatabase() {
  if (!isConnected) return;

  try {
    // Seed topics if empty
    const topicCount = await TopicModel.countDocuments();
    if (topicCount === 0) {
      await TopicModel.insertMany(INITIAL_TOPICS);
      console.log(`[Database] Seeded ${INITIAL_TOPICS.length} topics into MongoDB.`);
    }

    // Seed challenges if empty
    const challengeCount = await ChallengeModel.countDocuments();
    if (challengeCount === 0) {
      await ChallengeModel.insertMany(INITIAL_CHALLENGES);
      console.log(`[Database] Seeded ${INITIAL_CHALLENGES.length} challenges into MongoDB.`);
    }

    // Seed games if empty
    const gameCount = await GameModel.countDocuments();
    if (gameCount === 0) {
      await GameModel.insertMany(INITIAL_GAMES);
      console.log(`[Database] Seeded ${INITIAL_GAMES.length} games into MongoDB.`);
    }

    // Seed badges if empty
    const badgeCount = await BadgeModel.countDocuments();
    if (badgeCount === 0) {
      await BadgeModel.insertMany(INITIAL_BADGES);
      console.log(`[Database] Seeded ${INITIAL_BADGES.length} badges into MongoDB.`);
    }

    // Seed demo user if empty
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      const salt = bcrypt.genSaltSync(10);
      const demoHash = bcrypt.hashSync('password123', salt);
      const todayStr = new Date().toISOString().split('T')[0];

      await UserModel.create({
        id: 'usr_demo_alex',
        name: 'Alex Rivera',
        email: 'alex@example.com',
        passwordHash: demoHash,
        avatar: '🧙‍♂️',
        level: 7,
        xp: 1240,
        coins: 180,
        streak: 8,
        lastActiveDate: todayStr,
        completedTopics: ['py-variables', 'py-conditionals', 'py-loops', 'dsa-arrays'],
        completedChallenges: ['ch-sum-two-numbers', 'ch-even-or-odd', 'ch-find-max-array'],
        completedGames: { 'code-runner': 1, 'array-adventure': 2 },
        badges: ['first_steps', 'python_beginner'],
        gameStats: {
          gamesPlayed: 14,
          challengesSolved: 3,
          quizzesCompleted: 4,
          linesOfCodeRun: 85,
        },
      });
      console.log('[Database] Seeded demo user Alex Rivera into MongoDB.');
    }

    // Seed daily challenge
    const todayStr = new Date().toISOString().split('T')[0];
    const dailyCount = await DailyChallengeModel.countDocuments({ date: todayStr });
    if (dailyCount === 0) {
      await DailyChallengeModel.create({
        id: 'dc-today',
        date: todayStr,
        challengeId: 'ch-valid-parentheses',
        bonusXP: 100,
        streakBonus: true,
      });
    }
  } catch (err: any) {
    console.error('[Database] Failed to seed MongoDB:', err.message);
  }
}
