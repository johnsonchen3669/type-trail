import { describe, expect, it } from 'vitest';
import { findQuizEntry, publishedQuizzes, quizCatalog, quizIdForDay, upcomingQuiz } from './quiz-catalog';

describe('quiz catalog', () => {
  it('exposes only one upcoming checkpoint and no unpublished loader', () => {
    const upcoming = quizCatalog.filter((entry) => entry.status === 'coming-soon');

    expect(upcoming).toHaveLength(1);
    expect(upcomingQuiz?.day).toBe(1);
    expect('loadQuiz' in upcoming[0]!).toBe(false);
    expect(publishedQuizzes).toHaveLength(0);
  });

  it('finds registered days and formats their progress ids', () => {
    expect(findQuizEntry(1)?.status).toBe('coming-soon');
    expect(findQuizEntry(30)).toBeNull();
    expect(quizIdForDay(1)).toBe('day-01');
  });
});
