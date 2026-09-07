import { describe, expect, it } from 'vitest';
import { dayOneQuiz } from './day-01.data';
import { dayTwoQuiz } from './day-02.data';
import { dayThreeQuiz } from './day-03.data';
import { dayFourQuiz } from './day-04.data';
import { dayFiveQuiz } from './day-05.data';
import { daySixQuiz } from './day-06.data';
import { daySevenQuiz } from './day-07.data';
import { gradeQuiz } from './quiz-engine';
import { QuizDefinition } from './quiz.models';

const quizCases: readonly [QuizDefinition, Record<string, string>][] = [
  [
    dayOneQuiz,
    {
      'day-01-01': 'C',
      'day-01-02': 'B',
      'day-01-03': 'B',
      'day-01-04': 'fill',
      'day-01-05': 'Question',
    },
  ],
  [
    dayTwoQuiz,
    {
      'day-02-01': 'B',
      'day-02-02': 'B',
      'day-02-03': 'C',
      'day-02-04': 'NaN',
      'day-02-05': 'Number',
    },
  ],
  [
    dayThreeQuiz,
    {
      'day-03-01': 'B',
      'day-03-02': 'A',
      'day-03-03': 'B',
      'day-03-04': 'block scope',
      'day-03-05': 'score += points;',
    },
  ],
  [
    dayFourQuiz,
    {
      'day-04-01': 'A',
      'day-04-02': 'B',
      'day-04-03': 'C',
      'day-04-04': 'bind',
      'day-04-05': 'getPrototypeOf',
    },
  ],
  [
    dayFiveQuiz,
    {
      'day-05-01': 'B',
      'day-05-02': 'C',
      'day-05-03': 'B',
      'day-05-04': 'pending',
      'day-05-05': 'all',
    },
  ],
  [
    daySixQuiz,
    {
      'day-06-01': 'C',
      'day-06-02': 'B',
      'day-06-03': 'D',
      'day-06-04': 'module',
      'day-06-05': 'type',
    },
  ],
  [
    daySevenQuiz,
    {
      'day-07-01': 'B',
      'day-07-02': 'B',
      'day-07-03': 'A',
      'day-07-04': 'noEmitOnError',
      'day-07-05': 'string',
    },
  ],
];

describe('quiz data', () => {
  it.each(quizCases)('defines five ordered questions for %s', (quiz) => {
    expect(quiz.questions).toHaveLength(5);
    expect(quiz.questions.map((question) => question.number)).toEqual([1, 2, 3, 4, 5]);
    expect(new Set(quiz.questions.map((question) => question.id)).size).toBe(5);
    expect(quiz.questions.every((question) => question.id.startsWith(`${quiz.id}-`))).toBe(true);
    expect(quiz.questions.every((question) => question.hint.trim().length > 0)).toBe(true);
  });

  it.each(quizCases)('grades the specification answers for %s', (quiz, answers) => {
    const result = gradeQuiz(quiz, answers);

    expect(result.score).toBe(5);
    expect(result.total).toBe(5);
  });
});
