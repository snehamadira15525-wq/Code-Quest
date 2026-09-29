import { spawn } from 'child_process';
import { TestCase } from '../../src/types/index.js';

interface ExecutionResult {
  stdout: string;
  stderr: string;
  executionTimeMs: number;
  error?: string;
  success: boolean;
}

export interface TestResult {
  testIndex: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  error?: string;
  isHidden?: boolean;
}

export interface SubmissionEvaluationResult {
  allPassed: boolean;
  passedTests: number;
  totalTests: number;
  runtimeMs: number;
  results: TestResult[];
  error?: string;
}

const FORBIDDEN_PATTERNS = [
  /\bimport\s+os\b/,
  /\bimport\s+subprocess\b/,
  /\bimport\s+sys\b/,
  /\bimport\s+socket\b/,
  /\bimport\s+shutil\b/,
  /\bimport\s+pty\b/,
  /\bfrom\s+os\b/,
  /\bfrom\s+subprocess\b/,
  /\bfrom\s+sys\b/,
  /\bopen\s*\(/,
  /\b__import__\b/,
  /\beval\s*\(/,
  /\bexec\s*\(/,
];

export function checkSafety(code: string): { safe: boolean; reason?: string } {
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(code)) {
      return {
        safe: false,
        reason:
          'Security Sandbox Notice: System-level calls (os, subprocess, filesystem, sockets, eval) are restricted in this educational sandbox. Please solve the problem using standard Python data structures and functions.',
      };
    }
  }
  return { safe: true };
}

/**
 * Execute raw Python 3 code in an isolated child process with timeout protection
 */
export async function executePythonRaw(
  code: string,
  stdinInput: string = '',
  timeoutMs: number = 3000
): Promise<ExecutionResult> {
  const safety = checkSafety(code);
  if (!safety.safe) {
    return {
      stdout: '',
      stderr: safety.reason || 'Restricted code detected',
      executionTimeMs: 0,
      error: safety.reason,
      success: false,
    };
  }

  const startTime = Date.now();

  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    let isTimedOut = false;

    // Launch python3 process
    const child = spawn('python3', ['-u', '-c', code], {
      timeout: timeoutMs,
      env: { PYTHONUNBUFFERED: '1', PYTHONDONTWRITEBYTECODE: '1' },
    });

    const timer = setTimeout(() => {
      isTimedOut = true;
      try {
        child.kill('SIGKILL');
      } catch (e) {
        // ignore
      }
    }, timeoutMs);

    if (stdinInput && child.stdin) {
      child.stdin.write(stdinInput);
      child.stdin.end();
    }

    child.stdout.on('data', (data) => {
      stdout += data.toString();
      // Cap stdout to prevent memory flooding
      if (stdout.length > 50000) {
        stdout = stdout.substring(0, 50000) + '\n... [Output truncated: exceeded 50KB limit]';
        child.kill('SIGKILL');
      }
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
      if (stderr.length > 10000) {
        stderr = stderr.substring(0, 10000);
      }
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({
        stdout,
        stderr: err.message,
        executionTimeMs: Date.now() - startTime,
        error: `Process error: ${err.message}`,
        success: false,
      });
    });

    child.on('close', (exitCode) => {
      clearTimeout(timer);
      const executionTimeMs = Date.now() - startTime;

      if (isTimedOut) {
        return resolve({
          stdout,
          stderr: `Time Limit Exceeded (${timeoutMs}ms). Check for infinite loops or deep recursion!`,
          executionTimeMs,
          error: 'Time Limit Exceeded',
          success: false,
        });
      }

      resolve({
        stdout,
        stderr,
        executionTimeMs,
        error: exitCode !== 0 && !stderr ? `Process exited with code ${exitCode}` : stderr || undefined,
        success: exitCode === 0,
      });
    });
  });
}

/**
 * Clean and normalize string outputs for comparison
 */
function normalizeOutput(str: string): string {
  return str
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\s+$/gm, '');
}

/**
 * Evaluate code against multiple test cases
 */
export async function evaluatePythonSubmission(
  userCode: string,
  testCases: TestCase[]
): Promise<SubmissionEvaluationResult> {
  const safety = checkSafety(userCode);
  if (!safety.safe) {
    return {
      allPassed: false,
      passedTests: 0,
      totalTests: testCases.length,
      runtimeMs: 0,
      results: testCases.map((tc, idx) => ({
        testIndex: idx + 1,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: '',
        passed: false,
        error: safety.reason,
        isHidden: tc.isHidden,
      })),
      error: safety.reason,
    };
  }

  const results: TestResult[] = [];
  let totalRuntime = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    // Check if user defined a function or standard input/output
    // Wrap execution to inject inputs or run function test runner
    const runnerScript = `
import sys
${userCode}

# If the code didn't print output already, try evaluating with input
`;

    const execResult = await executePythonRaw(userCode, tc.input, 2500);
    totalRuntime += execResult.executionTimeMs;

    const actual = normalizeOutput(execResult.stdout);
    const expected = normalizeOutput(tc.expectedOutput);
    const passed = execResult.success && actual === expected;

    results.push({
      testIndex: i + 1,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: execResult.stdout,
      passed,
      error: execResult.stderr || (passed ? undefined : `Expected: ${tc.expectedOutput}, Got: ${actual}`),
      isHidden: tc.isHidden,
    });
  }

  const passedTests = results.filter((r) => r.passed).length;
  const allPassed = passedTests === testCases.length;

  return {
    allPassed,
    passedTests,
    totalTests: testCases.length,
    runtimeMs: totalRuntime,
    results,
  };
}
