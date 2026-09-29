import mongoose, { Schema, Document } from 'mongoose';

// GAME MODEL
export interface IGameDocument extends Document {
  id: string;
  title: string;
  subtitle: string;
  category: 'Python' | 'DSA';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  coinsReward: number;
  icon: string;
  description: string;
  conceptCovered: string;
}

const GameSchema = new Schema<IGameDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    category: { type: String, required: true, enum: ['Python', 'DSA'], index: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      index: true,
    },
    xpReward: { type: Number, default: 100 },
    coinsReward: { type: Number, default: 30 },
    icon: { type: String, default: 'Gamepad2' },
    description: { type: String, required: true },
    conceptCovered: { type: String, required: true },
  },
  { timestamps: true }
);

export const GameModel = mongoose.models.Game || mongoose.model<IGameDocument>('Game', GameSchema);

// SUBMISSION MODEL
export interface ISubmissionDocument extends Document {
  id: string;
  userId: string;
  challengeId: string;
  code: string;
  language: string;
  passed: boolean;
  passedTests: number;
  totalTests: number;
  runtimeMs: number;
}

const SubmissionSchema = new Schema<ISubmissionDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    challengeId: { type: String, required: true, index: true },
    code: { type: String, required: true },
    language: { type: String, default: 'python' },
    passed: { type: Boolean, required: true },
    passedTests: { type: Number, default: 0 },
    totalTests: { type: Number, default: 0 },
    runtimeMs: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SubmissionModel =
  mongoose.models.Submission ||
  mongoose.model<ISubmissionDocument>('Submission', SubmissionSchema);

// DAILY CHALLENGE MODEL
export interface IDailyChallengeDocument extends Document {
  id: string;
  date: string;
  challengeId: string;
  bonusXP: number;
  streakBonus: boolean;
}

const DailyChallengeSchema = new Schema<IDailyChallengeDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    date: { type: String, required: true, index: true },
    challengeId: { type: String, required: true },
    bonusXP: { type: Number, default: 100 },
    streakBonus: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const DailyChallengeModel =
  mongoose.models.DailyChallenge ||
  mongoose.model<IDailyChallengeDocument>('DailyChallenge', DailyChallengeSchema);

// BADGE MODEL
export interface IBadgeDocument extends Document {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

const BadgeSchema = new Schema<IBadgeDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Award' },
    category: { type: String, default: 'milestone' },
  },
  { timestamps: true }
);

export const BadgeModel =
  mongoose.models.Badge || mongoose.model<IBadgeDocument>('Badge', BadgeSchema);
