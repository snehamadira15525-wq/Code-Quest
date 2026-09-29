import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Eye,
  Terminal,
  Swords,
  HelpCircle,
  ArrowLeft,
  CheckCircle2,
  Award,
  Sparkles,
  AlertCircle,
  Coins,
} from 'lucide-react';
import { Topic, Challenge } from '../types/index.js';
import { useAuth } from '../context/AuthContext.js';
import { ArrayVisualizer } from '../components/visualizers/ArrayVisualizer.js';
import { StackVisualizer } from '../components/visualizers/StackVisualizer.js';
import { QueueVisualizer } from '../components/visualizers/QueueVisualizer.js';
import { TreeVisualizer } from '../components/visualizers/TreeVisualizer.js';
import { SortingVisualizer } from '../components/visualizers/SortingVisualizer.js';
import { GraphVisualizer } from '../components/visualizers/GraphVisualizer.js';
import { CodeEditor } from '../components/common/CodeEditor.js';

interface TopicPageProps {
  topicId: string;
  onBack: () => void;
  onLaunchGame?: (gameId: string) => void;
}

export const TopicPage: React.FC<TopicPageProps> = ({ topicId, onBack, onLaunchGame }) => {
  const { user, token, updateUser, celebrate } = useAuth();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [activeTab, setActiveTab] = useState<'learn' | 'visualize' | 'try' | 'challenge' | 'quiz'>(
    'learn'
  );
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizFeedback, setQuizFeedback] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/topics/${topicId}`)
      .then((res) => res.json())
      .then((data) => {
        setTopic(data.topic);
        if (data.topic?.challengeId) {
          fetch(`/api/challenges/${data.topic.challengeId}`)
            .then((cRes) => cRes.json())
            .then((cData) => setChallenge(cData.challenge))
            .catch(() => {});
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load topic:', err);
        setLoading(false);
      });
  }, [topicId]);

  if (loading || !topic) {
    return (
      <div className="py-20 text-center text-slate-400 font-mono text-xs">
        Loading lesson &amp; interactive sandbox...
      </div>
    );
  }

  const renderVisualizer = () => {
    switch (topic.visualizerType) {
      case 'array':
        return <ArrayVisualizer />;
      case 'stack':
        return <StackVisualizer />;
      case 'queue':
        return <QueueVisualizer />;
      case 'tree':
        return <TreeVisualizer />;
      case 'graph':
        return <GraphVisualizer />;
      case 'sorting':
        return <SortingVisualizer />;
      default:
        return <ArrayVisualizer />;
    }
  };

  const handleQuizSubmit = async () => {
    const answersArray = topic.quiz.map((_, i) => selectedAnswers[i] ?? -1);

    try {
      const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/topics/${topic.id}/quiz`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ answers: answersArray }),
      });
      const data = await res.json();
      setQuizFeedback(data);
      setQuizSubmitted(true);

      if (data.passed) {
        celebrate();
        if (data.user) updateUser(data.user);
      }
    } catch (err: any) {
      console.error('Quiz submission failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button and Topic Banner */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Roadmap</span>
        </button>
        <span className="text-xs font-mono text-slate-500 uppercase">
          Level {topic.levelNumber} · {topic.category.replace('_', ' ')}
        </span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {topic.title}
            </h1>
            <p className="text-xs text-slate-400 mt-1">{topic.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-amber-400">
              +{topic.xpReward} XP Reward
            </span>
          </div>
        </div>

        {/* Lesson Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('learn')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'learn'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>1. Learn</span>
          </button>
          <button
            onClick={() => setActiveTab('visualize')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'visualize'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>2. Visualize</span>
          </button>
          <button
            onClick={() => setActiveTab('try')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'try'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Try It</span>
          </button>
          <button
            onClick={() => setActiveTab('challenge')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'challenge'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-rose-400" />
            <span>4. Challenge</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'quiz'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>5. Quiz</span>
          </button>
        </div>

        {/* Tab 1: Learn */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            <div className="prose prose-invert max-w-none text-xs leading-relaxed text-slate-300">
              <p className="text-sm font-medium text-slate-200">{topic.learnContent.overview}</p>
            </div>

            <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Key Algorithmic Concepts
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                {topic.learnContent.keyPoints.map((pt, i) => (
                  <li key={i} className="leading-relaxed">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {topic.learnContent.codeSnippets.map((snip, i) => (
              <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-xs font-bold text-emerald-400 block mb-2">{snip.title}</span>
                <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto mb-2 border border-slate-800">
                  {snip.code}
                </pre>
                <p className="text-xs text-slate-400">{snip.explanation}</p>
              </div>
            ))}

            <div className="p-4 bg-indigo-950/30 border border-indigo-800/40 rounded-xl text-xs text-indigo-200">
              <strong className="text-white block mb-1">Real-World Software Engineering Use:</strong>
              {topic.learnContent.realWorldUse}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setActiveTab('visualize')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
              >
                Proceed to Visualization ➔
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Visualize */}
        {activeTab === 'visualize' && (
          <div className="space-y-6">
            {renderVisualizer()}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveTab('learn')}
                className="text-xs text-slate-400 hover:text-white"
              >
                ← Back to Explanation
              </button>
              <button
                onClick={() => setActiveTab('try')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
              >
                Try Writing Code ➔
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Try It */}
        {activeTab === 'try' && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Experiment with this interactive Python sandbox. Tweak values, add functions, and run
              the code to see instant console output.
            </p>
            <div className="h-[380px]">
              <CodeEditor initialCode={topic.tryItCode} />
            </div>
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveTab('visualize')}
                className="text-xs text-slate-400 hover:text-white"
              >
                ← Back to Visualizer
              </button>
              <button
                onClick={() => setActiveTab('challenge')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
              >
                Take on Challenge ➔
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Challenge */}
        {activeTab === 'challenge' && (
          <div className="space-y-6">
            {challenge ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-400 font-bold">
                      {challenge.difficulty}
                    </span>
                    <span className="font-mono text-amber-400 font-bold">
                      +{challenge.xpReward} XP
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{challenge.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {challenge.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                      Examples:
                    </span>
                    {challenge.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono"
                      >
                        <div className="text-slate-400">Input: {ex.input}</div>
                        <div className="text-emerald-400">Output: {ex.output}</div>
                        {ex.explanation && (
                          <div className="text-[11px] text-slate-500 mt-1 font-sans">
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-slate-500">
                    <strong>Constraints:</strong> {challenge.constraints.join(', ')}
                  </div>
                </div>

                <div className="lg:col-span-7 h-[420px]">
                  <CodeEditor
                    initialCode={challenge.starterCode}
                    challengeId={challenge.id}
                    testCases={challenge.testCases}
                    onSubmissionSuccess={(res) => {
                      // Handled
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 py-10 text-center">
                Challenge loading or not available.
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveTab('try')}
                className="text-xs text-slate-400 hover:text-white"
              >
                ← Back to Try It
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
              >
                Take the Quiz ➔
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: Quiz */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="p-4 bg-purple-950/30 border border-purple-800/40 rounded-xl text-xs text-purple-200">
              Answer the multiple-choice questions correctly to prove your understanding and earn +
              {topic.xpReward} XP!
            </div>

            <div className="space-y-6">
              {topic.quiz.map((q, qIdx) => (
                <div key={qIdx} className="p-5 bg-slate-950 border border-slate-800 rounded-xl">
                  <h4 className="text-sm font-semibold text-white mb-3">
                    Question {qIdx + 1}: {q.question}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      const isCorrect = q.correctIndex === optIdx;

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() =>
                            setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))
                          }
                          className={`w-full text-left p-3 rounded-lg text-xs font-mono border transition-all ${
                            quizSubmitted
                              ? isCorrect
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                                : isSelected
                                ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                              : isSelected
                              ? 'bg-purple-600/30 border-purple-500 text-white font-medium'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="mr-2 font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="mt-3 text-xs text-slate-400 p-2.5 bg-slate-900/80 rounded border border-slate-800">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quiz Result Feedback */}
            {quizFeedback && (
              <div
                className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                  quizFeedback.passed
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    : 'bg-amber-950/60 border-amber-500 text-amber-300'
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {quizFeedback.passed ? 'Quiz Passed!' : 'Needs Review'}
                  </h4>
                  <p>{quizFeedback.message || `Score: ${quizFeedback.score}`}</p>
                </div>
                {quizFeedback.earnedXp > 0 && (
                  <div className="flex items-center gap-3 font-mono">
                    <span className="font-bold text-amber-400">+{quizFeedback.earnedXp} XP</span>
                    <span className="font-bold text-yellow-400">
                      +{quizFeedback.earnedCoins} Coins
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveTab('challenge')}
                className="text-xs text-slate-400 hover:text-white"
              >
                ← Back to Challenge
              </button>
              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
                >
                  Submit Quiz Answers
                </button>
              ) : (
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
                >
                  Return to Learning Path
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
