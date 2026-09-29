import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import {
  User,
  Topic,
  Challenge,
  GameInfo,
  Badge,
  Submission,
  DailyChallenge,
} from '../../src/types/index.js';
import {
  INITIAL_BADGES,
  INITIAL_CHALLENGES,
  INITIAL_GAMES,
  INITIAL_TOPICS,
} from '../seed/seedData.js';
import { isMongoConnected } from './mongo.js';
import { UserModel } from '../models/User.js';
import { SubmissionModel } from '../models/Game.js';

interface DatabaseSchema {
  users: User[];
  topics: Topic[];
  challenges: Challenge[];
  games: GameInfo[];
  badges: Badge[];
  submissions: Submission[];
  dailyChallenges: DailyChallenge[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

class DatabaseStore {
  private data: DatabaseSchema;

  constructor() {
    this.data = {
      users: [],
      topics: [],
      challenges: [],
      games: [],
      badges: [],
      submissions: [],
      dailyChallenges: [],
    };
    this.init();
  }

  private init() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(fileContent);
      } catch (err) {
        console.error('Error loading db.json, reinitializing default data', err);
        this.seedInitialData();
      }
    } else {
      this.seedInitialData();
    }

    // Always ensure curriculum topics, challenges, games, and badges exist
    if (!this.data.topics || this.data.topics.length === 0) {
      this.data.topics = INITIAL_TOPICS;
    }
    if (!this.data.challenges || this.data.challenges.length === 0) {
      this.data.challenges = INITIAL_CHALLENGES;
    }
    if (!this.data.games || this.data.games.length === 0) {
      this.data.games = INITIAL_GAMES;
    }
    if (!this.data.badges || this.data.badges.length === 0) {
      this.data.badges = INITIAL_BADGES;
    }

    // Ensure at least one daily challenge exists
    const todayStr = new Date().toISOString().split('T')[0];
    if (!this.data.dailyChallenges || this.data.dailyChallenges.length === 0) {
      this.data.dailyChallenges = [
        {
          id: 'dc-today',
          date: todayStr,
          challengeId: 'ch-valid-parentheses',
          bonusXP: 100,
          streakBonus: true,
        },
      ];
    }

    // Ensure sample demo user exists
    if (!this.data.users || this.data.users.length === 0) {
      const salt = bcrypt.genSaltSync(10);
      const demoHash = bcrypt.hashSync('password123', salt);
      const demoUser: User = {
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.data.users = [demoUser];
    }

    this.save();
  }

  private seedInitialData() {
    this.data.topics = INITIAL_TOPICS;
    this.data.challenges = INITIAL_CHALLENGES;
    this.data.games = INITIAL_GAMES;
    this.data.badges = INITIAL_BADGES;
    this.data.submissions = [];
  }

  public save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist database:', err);
    }
  }

  // --- USERS ---
  public findUserById(id: string): User | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  public findUserByEmail(email: string): User | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public createUser(user: User): User {
    this.data.users.push(user);
    this.save();
    if (isMongoConnected()) {
      UserModel.create(user).catch((err: any) => console.error('MongoDB sync user create error:', err.message));
    }
    return user;
  }

  public updateUser(id: string, updates: Partial<User>): User | undefined {
    const idx = this.data.users.findIndex((u) => u.id === id);
    if (idx === -1) return undefined;

    this.data.users[idx] = {
      ...this.data.users[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    if (isMongoConnected()) {
      UserModel.updateOne({ id }, { $set: updates }).catch((err: any) =>
        console.error('MongoDB sync user update error:', err.message)
      );
    }
    return this.data.users[idx];
  }

  public getAllUsers(): User[] {
    return this.data.users;
  }

  // --- TOPICS ---
  public getAllTopics(): Topic[] {
    return this.data.topics;
  }

  public findTopicById(id: string): Topic | undefined {
    return this.data.topics.find((t) => t.id === id || t.slug === id);
  }

  // --- CHALLENGES ---
  public getAllChallenges(): Challenge[] {
    return this.data.challenges;
  }

  public findChallengeById(id: string): Challenge | undefined {
    return this.data.challenges.find((c) => c.id === id || c.slug === id);
  }

  // --- GAMES ---
  public getAllGames(): GameInfo[] {
    return this.data.games;
  }

  public findGameById(id: string): GameInfo | undefined {
    return this.data.games.find((g) => g.id === id);
  }

  // --- BADGES ---
  public getAllBadges(): Badge[] {
    return this.data.badges;
  }

  // --- SUBMISSIONS ---
  public createSubmission(sub: Submission): Submission {
    this.data.submissions.push(sub);
    this.save();
    if (isMongoConnected()) {
      SubmissionModel.create(sub).catch((err: any) => console.error('MongoDB sync submission error:', err.message));
    }
    return sub;
  }

  public getUserSubmissions(userId: string): Submission[] {
    return this.data.submissions.filter((s) => s.userId === userId);
  }

  // --- DAILY CHALLENGE ---
  public getTodayChallenge(): { daily: DailyChallenge; challenge: Challenge } | null {
    const todayStr = new Date().toISOString().split('T')[0];
    let daily = this.data.dailyChallenges.find((d) => d.date === todayStr);
    if (!daily && this.data.dailyChallenges.length > 0) {
      daily = this.data.dailyChallenges[0];
    }
    if (!daily) return null;
    const challenge = this.findChallengeById(daily.challengeId);
    if (!challenge) return null;
    return { daily, challenge };
  }
}

export const db = new DatabaseStore();
