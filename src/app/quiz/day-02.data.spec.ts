import { describe, expect, it } from 'vitest';
import { dayTwoQuiz } from './day-02.data';
import { gradeQuiz } from './quiz-engine';

describe('Day 2 quiz data', () => {
  it('contains five ordered questions with unique Day 2 ids', () => {
    expect(dayTwoQuiz.questions).toHaveLength(5);
    expect(dayTwoQuiz.questions.map((question) => question.number)).toEqual([1, 2, 3, 4, 5]);
    expect(new Set(dayTwoQuiz.questions.map((question) => question.id)).size).toBe(5);
    expect(dayTwoQuiz.questions.every((question) => question.id.startsWith('day-02-'))).toBe(true);
    expect(dayTwoQuiz.questions.every((question) => question.hint.trim().length > 0)).toBe(true);
  });

  it('grades the specification answers as a perfect attempt', () => {
    const result = gradeQuiz(dayTwoQuiz, {
      'day-02-01': 'B',
      'day-02-02': 'B',
      'day-02-03': 'C',
      'day-02-04': 'NaN',
      'day-02-05': 'Number',
    });

    expect(result.score).toBe(5);
    expect(result.total).toBe(5);
  });

  it('keeps code answers case-sensitive', () => {
    const result = gradeQuiz(dayTwoQuiz, {
      'day-02-04': 'nan',
      'day-02-05': 'number',
    });

    expect(result.score).toBe(0);
  });
});
