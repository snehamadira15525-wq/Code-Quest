import mongoose, { Schema, Document } from 'mongoose';

export interface IChallengeDocument extends Document {
  id: string;
  topicId?: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  xpReward: number;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: string;
  solutionCode?: string;
  testCases: {
    input: string;
    expectedOutput: string;
    isHidden?: boolean;
  }[];
}

const ChallengeSchema = new Schema<IChallengeDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    topicId: { type: String },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'], index: true },
    category: { type: String, required: true, index: true },
    xpReward: { type: Number, default: 80 },
    description: { type: String, required: true },
    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    constraints: [{ type: String }],
    starterCode: { type: String, default: '' },
    solutionCode: { type: String },
    testCases: [
      {
        input: String,
        expectedOutput: String,
        isHidden: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export const ChallengeModel =
  mongoose.models.Challenge || mongoose.model<IChallengeDocument>('Challenge', ChallengeSchema);
