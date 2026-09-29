import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, RotateCcw, Send, Terminal, Clock } from 'lucide-react';
import { TestCase } from '../../types/index.js';
import { useAuth } from '../../context/AuthContext.js';

interface CodeEditorProps {
  initialCode?: string;
  challengeId?: string;
  testCases?: TestCase[];
  onSubmissionSuccess?: (result: any) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = `# Write your Python solution here\nprint("Hello World!")\n`,
  challengeId,
  testCases = [],
  onSubmissionSuccess,
}) => {
  const { token, updateUser, celebrate } = useAuth();
  const [code, setCode] = useState<string>(initialCode);
  const [customInput, setCustomInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'console' | 'testcases'>('console');
  const [stdout, setStdout] = useState<string>('');
  const [stderr, setStderr] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [runtimeMs, setRuntimeMs] = useState<number | null>(null);

  const lines = code.split('\n');

  const handleRun = async () => {
    setIsRunning(true);
    setStdout('');
    setStderr('');
    setActiveTab('console');

    try {
      const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/challenges/run', {
        method: 'POST',
        headers,
        body: JSON.stringify({ code, input: customInput }),
      });
      const data = await res.json();

      setStdout(data.stdout || '');
      setStderr(data.stderr || data.error || '');
      setRuntimeMs(data.executionTimeMs || 0);
    } catch (err: any) {
      setStderr(`Network error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!challengeId) {
      handleRun();
      return;
    }

    setIsSubmitting(true);
    setActiveTab('testcases');

    try {
      const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/challenges/${challengeId}/submit`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      setTestResults(data.results || []);
      setRuntimeMs(data.runtimeMs || 0);

      if (data.passed) {
        celebrate();
        if (data.user) updateUser(data.user);
        if (onSubmissionSuccess) onSubmissionSuccess(data);
      }
    } catch (err: any) {
      setStderr(`Submission failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Editor Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-medium text-slate-300">solution.py</span>
          <span className="text-[11px] text-slate-500 font-mono">Python 3.10</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCode(initialCode)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-800/80 rounded transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-slate-300" />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
          {challengeId && (
            <button
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/20 transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? 'Evaluating...' : 'Submit Solution'}
            </button>
          )}
        </div>
      </div>

      {/* Editor Area with Line Numbers */}
      <div className="flex flex-1 min-h-[220px] bg-slate-950 text-slate-100 font-mono text-xs overflow-hidden relative">
        {/* Line Numbers */}
        <div className="py-3 px-2 text-right bg-slate-950 select-none text-slate-600 font-mono border-r border-slate-900 w-10 flex flex-col">
          {lines.map((_, i) => (
            <span key={i} className="leading-6">
              {i + 1}
            </span>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 py-3 px-4 bg-transparent resize-none leading-6 outline-none font-mono text-slate-100 whitespace-pre"
        />
      </div>

      {/* Output Panel Tabs */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="flex items-center justify-between px-4 py-1.5 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('console')}
              className={`pb-1 font-medium transition-colors border-b-2 ${
                activeTab === 'console'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Console Output
            </button>
            {challengeId && (
              <button
                onClick={() => setActiveTab('testcases')}
                className={`pb-1 font-medium transition-colors border-b-2 ${
                  activeTab === 'testcases'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Test Cases ({testResults.filter((r) => r.passed).length}/{testResults.length || testCases.length})
              </button>
            )}
          </div>

          {runtimeMs !== null && (
            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
              <Clock className="w-3 h-3" />
              <span>{runtimeMs} ms</span>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-4 max-h-48 overflow-y-auto font-mono text-xs">
          {activeTab === 'console' ? (
            <div>
              {/* Optional Custom Input */}
              <div className="mb-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Custom standard input (stdin)..."
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-slate-300 text-[11px] outline-none focus:border-slate-700"
                />
              </div>

              {stderr ? (
                <pre className="text-rose-400 whitespace-pre-wrap">{stderr}</pre>
              ) : stdout ? (
                <pre className="text-emerald-300 whitespace-pre-wrap">{stdout}</pre>
              ) : (
                <span className="text-slate-500 italic">Run your code to view standard output.</span>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {testResults.length === 0 ? (
                <div className="text-slate-400 text-xs">
                  Click <strong>Submit Solution</strong> to run your code against all challenge test cases.
                </div>
              ) : (
                testResults.map((tc, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border flex flex-col gap-1 ${
                      tc.passed
                        ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-300'
                        : 'bg-rose-950/30 border-rose-900/50 text-rose-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5">
                        {tc.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                        )}
                        Test Case {idx + 1} {tc.isHidden ? '(Hidden)' : ''}
                      </span>
                      <span className="text-[10px] font-mono uppercase">
                        {tc.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </div>

                    {!tc.isHidden && (
                      <div className="text-[11px] grid grid-cols-2 gap-2 text-slate-400 mt-1">
                        <div>
                          <span className="text-slate-500 block">Input:</span>
                          <span className="text-slate-200">{tc.input || '(None)'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Expected:</span>
                          <span className="text-emerald-400">{tc.expectedOutput}</span>
                        </div>
                        {!tc.passed && tc.actualOutput && (
                          <div className="col-span-2">
                            <span className="text-rose-400 block">Got:</span>
                            <span className="text-rose-300">{tc.actualOutput}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
