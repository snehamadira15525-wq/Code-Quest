import mongoose, { Schema, Document } from 'mongoose';

export interface ITopicDocument extends Document {
  id: string;
  slug: string;
  title: string;
  category: 'python_foundations' | 'intermediate_python' | 'dsa_foundations' | 'advanced_dsa';
  levelNumber: number;
  order: number;
  description: string;
  estimatedMinutes: number;
  xpReward: number;
  icon: string;
  prerequisites: string[];
  learnContent: {
    overview: string;
    keyPoints: string[];
    codeSnippets: { title: string; code: string; explanation: string }[];
    realWorldUse: string;
  };
  visualizerType: string;
  tryItCode: string;
  challengeId: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

const TopicSchema = new Schema<ITopicDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['python_foundations', 'intermediate_python', 'dsa_foundations', 'advanced_dsa'],
      index: true,
    },
    levelNumber: { type: Number, required: true },
    order: { type: Number, required: true },
    description: { type: String, required: true },
    estimatedMinutes: { type: Number, default: 15 },
    xpReward: { type: Number, default: 50 },
    icon: { type: String, default: 'Code' },
    prerequisites: [{ type: String }],
    learnContent: {
      overview: { type: String, required: true },
      keyPoints: [{ type: String }],
      codeSnippets: [
        {
          title: String,
          code: String,
          explanation: String,
        },
      ],
      realWorldUse: String,
    },
    visualizerType: { type: String, default: 'array' },
    tryItCode: { type: String, default: '' },
    challengeId: { type: String, default: '' },
    quiz: [
      {
        question: String,
        options: [String],
        correctIndex: Number,
        explanation: String,
      },
    ],
  },
  { timestamps: true }
);

export const TopicModel =
  mongoose.models.Topic || mongoose.model<ITopicDocument>('Topic', TopicSchema);
