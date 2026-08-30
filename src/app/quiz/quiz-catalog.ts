import { QuizDefinition } from './quiz.models';

export interface PublishedQuizEntry {
  readonly status: 'published';
  readonly day: number;
  readonly title: string;
  readonly articleUrl: string;
  readonly loadQuiz: () => Promise<QuizDefinition>;
}

export interface UpcomingQuizEntry {
  readonly status: 'coming-soon';
  readonly day: number;
  readonly title: string;
}

export type QuizCatalogEntry = PublishedQuizEntry | UpcomingQuizEntry;

// Publishing workflow:
// 1. Move the upcoming entry to published and add its article URL + lazy loader.
// 2. Add exactly one new coming-soon entry for the next article.
// Keeping unpublished quiz loaders out of this catalog prevents their questions
// from being included in the production application bundle.
export const quizCatalog: readonly QuizCatalogEntry[] = [
  {
    status: 'coming-soon',
    day: 1,
    title: 'AI 都會寫程式了，為什麼還要學 TypeScript？',
  },
];

export const publishedQuizzes = quizCatalog.filter(
  (entry): entry is PublishedQuizEntry => entry.status === 'published',
);

export const upcomingQuiz = quizCatalog.find(
  (entry): entry is UpcomingQuizEntry => entry.status === 'coming-soon',
) ?? null;

export function findQuizEntry(day: number): QuizCatalogEntry | null {
  return quizCatalog.find((entry) => entry.day === day) ?? null;
}

export function quizIdForDay(day: number): string {
  return `day-${day.toString().padStart(2, '0')}`;
}
