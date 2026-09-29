import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatar: string;
  level: number;
  xp: number;
  coins: number;
  streak: number;
  lastActiveDate: string;
  completedTopics: string[];
  completedChallenges: string[];
  completedGames: Map<string, number>;
  badges: string[];
  gameStats: {
    gamesPlayed: number;
    challengesSolved: number;
    quizzesCompleted: number;
    linesOfCodeRun: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    avatar: { type: String, default: '🧙‍♂️' },
    level: { type: Number, default: 1, index: true },
    xp: { type: Number, default: 0, index: true },
    coins: { type: Number, default: 50 },
    streak: { type: Number, default: 1 },
    lastActiveDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    completedTopics: [{ type: String }],
    completedChallenges: [{ type: String }],
    completedGames: { type: Map, of: Number, default: {} },
    badges: [{ type: String }],
    gameStats: {
      gamesPlayed: { type: Number, default: 0 },
      challengesSolved: { type: Number, default: 0 },
      quizzesCompleted: { type: Number, default: 0 },
      linesOfCodeRun: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);
