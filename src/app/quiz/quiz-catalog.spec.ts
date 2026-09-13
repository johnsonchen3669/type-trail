import { describe, expect, it } from 'vitest';
import { findQuizEntry, publishedQuizzes, quizCatalog, quizIdForDay, upcomingQuiz } from './quiz-catalog';

describe('quiz catalog', () => {
  it('derives published and next-upcoming entries from current statuses', () => {
    const expectedPublished = quizCatalog.filter((entry) => entry.status === 'published');
    const expectedUpcoming = quizCatalog.find((entry) => entry.status === 'coming-soon') ?? null;

    expect(publishedQuizzes).toEqual(expectedPublished);
    expect(upcomingQuiz).toBe(expectedUpcoming);
    expect(quizCatalog.every((entry) => typeof entry.loadQuiz === 'function')).toBe(true);
  });

  it('finds registered days and formats their progress ids', () => {
    expect(findQuizEntry(1)?.day).toBe(1);
    expect(findQuizEntry(2)?.day).toBe(2);
    expect(findQuizEntry(30)).toBeNull();
    expect(quizIdForDay(1)).toBe('day-01');
  });

  it('prepares quiz loaders before publication', async () => {
    const quizzes = await Promise.all(quizCatalog.map((entry) => entry.loadQuiz()));

    expect(quizzes.map((quiz) => quiz.day)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
    expect(quizzes.every((quiz) => quiz.questions.length === 5)).toBe(true);
  });
});
