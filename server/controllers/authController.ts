import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';
import { AuthRequest, JWT_SECRET } from '../middleware/auth.js';
import { User } from '../../src/types/index.js';

export function sanitizeUser(user: User) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export function generateToken(user: User): string {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d',
  });
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: User = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      avatar: '🐍',
      level: 1,
      xp: 0,
      coins: 50,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedTopics: [],
      completedChallenges: [],
      completedGames: {},
      badges: ['first_steps'],
      gameStats: {
        gamesPlayed: 0,
        challengesSolved: 0,
        quizzesCompleted: 0,
        linesOfCodeRun: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.createUser(newUser);

    const token = generateToken(newUser);
    return res.status(201).json({
      message: 'Account created successfully',
      token,
      user: sanitizeUser(newUser),
    });
  } catch (err: any) {
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Update streak if active on new day
    const today = new Date().toISOString().split('T')[0];
    let newStreak = user.streak;
    if (user.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (user.lastActiveDate === yesterday) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
      db.updateUser(user.id, { lastActiveDate: today, streak: newStreak });
      user.streak = newStreak;
      user.lastActiveDate = today;
    }

    const token = generateToken(user);
    return res.json({
      message: 'Logged in successfully',
      token,
      user: sanitizeUser(user),
    });
  } catch (err: any) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
}

export function getMe(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  return res.json({ user: sanitizeUser(req.user) });
}

export function updateProfile(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { name, avatar } = req.body;
  const updates: Partial<User> = {};
  if (name && typeof name === 'string') updates.name = name.trim();
  if (avatar && typeof avatar === 'string') updates.avatar = avatar;

  const updated = db.updateUser(req.user.id, updates);
  if (!updated) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({ message: 'Profile updated', user: sanitizeUser(updated) });
}
