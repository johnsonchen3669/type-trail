import { describe, expect, it } from 'vitest';
import { dayOneQuiz } from './day-01.data';
import { gradeQuiz, isQuestionCorrect } from './quiz-engine';

describe('quiz engine', () => {
  it('grades all Day 1 answers correctly', () => {
    const result = gradeQuiz(dayOneQuiz, {
      'day-01-01': 'C', 'day-01-02': 'B', 'day-01-03': 'C', 'day-01-04': 'fill', 'day-01-05': 'Question',
    });
    expect(result.score).toBe(5);
    expect(result.total).toBe(5);
  });

  it('trims text answers but preserves case', () => {
    const textQuestion = dayOneQuiz.questions[3];
    expect(textQuestion && isQuestionCorrect(textQuestion, '  fill  ')).toBe(true);
    expect(textQuestion && isQuestionCorrect(textQuestion, 'Fill')).toBe(false);
  });

  it('counts missing and incorrect answers as incorrect', () => {
    expect(gradeQuiz(dayOneQuiz, { 'day-01-01': 'A' }).score).toBe(0);
  });
});
