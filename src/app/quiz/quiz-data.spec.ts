import { describe, expect, it } from 'vitest';
import { dayOneQuiz } from './day-01.data';
import { dayTwoQuiz } from './day-02.data';
import { dayThreeQuiz } from './day-03.data';
import { dayFourQuiz } from './day-04.data';
import { dayFiveQuiz } from './day-05.data';
import { daySixQuiz } from './day-06.data';
import { daySevenQuiz } from './day-07.data';
import { dayEightQuiz } from './day-08.data';
import { dayNineQuiz } from './day-09.data';
import { dayTenQuiz } from './day-10.data';
import { dayElevenQuiz } from './day-11.data';
import { dayTwelveQuiz } from './day-12.data';
import { dayThirteenQuiz } from './day-13.data';
import { dayFourteenQuiz } from './day-14.data';
import { dayFifteenQuiz } from './day-15.data';
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
      'day-03-03': 'A',
      'day-03-04': 'block scope',
      'day-03-05': 'attempts += 1;',
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
  [
    dayEightQuiz,
    {
      'day-08-01': 'B',
      'day-08-02': 'B',
      'day-08-03': 'B',
      'day-08-04': 'literal widening',
      'day-08-05': 'option.toUpperCase()',
    },
  ],
  [
    dayNineQuiz,
    {
      'day-09-01': 'B',
      'day-09-02': 'C',
      'day-09-03': 'A',
      'day-09-04': '?',
      'day-09-05': 'string[]',
    },
  ],
  [
    dayTenQuiz,
    {
      'day-10-01': 'C',
      'day-10-02': 'C',
      'day-10-03': 'B',
      'day-10-04': '|',
      'day-10-05': '"in-progress"',
    },
  ],
  [
    dayElevenQuiz,
    {
      'day-11-01': 'C',
      'day-11-02': 'B',
      'day-11-03': 'C',
      'day-11-04': 'in',
      'day-11-05': 'typeof score === "number"',
    },
  ],
  [
    dayTwelveQuiz,
    {
      'day-12-01': 'B',
      'day-12-02': 'B',
      'day-12-03': 'C',
      'day-12-04': 'status',
      'day-12-05': 'question.type === "choice"',
    },
  ],
  [
    dayThirteenQuiz,
    {
      'day-13-01': 'C',
      'day-13-02': 'B',
      'day-13-03': 'C',
      'day-13-04': 'never',
      'day-13-05': 'state',
    },
  ],
  [
    dayFourteenQuiz,
    {
      'day-14-01': 'B',
      'day-14-02': 'C',
      'day-14-03': 'D',
      'day-14-04': 'string',
      'day-14-05': 'instanceof',
    },
  ],
  [
    dayFifteenQuiz,
    {
      'day-15-01': 'B',
      'day-15-02': 'C',
      'day-15-03': 'A',
      'day-15-04': 'type',
      'day-15-05': 'extends',
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
