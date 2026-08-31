import { QuizDefinition } from './quiz.models';

export interface PublishedQuizEntry {
  readonly status: 'published';
  readonly day: number;
  readonly title: string;
  readonly articleUrl?: string;
  readonly loadQuiz: () => Promise<QuizDefinition>;
}

export interface UpcomingQuizEntry {
  readonly status: 'coming-soon';
  readonly day: number;
  readonly title: string;
  readonly articleUrl?: string;
  readonly loadQuiz: () => Promise<QuizDefinition>;
}

export type QuizCatalogEntry = PublishedQuizEntry | UpcomingQuizEntry;

// Publishing workflow: change only the entry's status from coming-soon to published.
// articleUrl is optional, so a quiz can open before its article URL is available.
export const quizCatalog: readonly QuizCatalogEntry[] = [
  {
    status: 'published',
    day: 1,
    title: 'AI 都會寫程式了，為什麼還要學 TypeScript？',
    loadQuiz: () => import('./day-01.data').then((module) => module.dayOneQuiz),
  },
  {
    status: 'published',
    day: 2,
    title: 'JavaScript 是動態型別，問題到底出在哪裡？',
    loadQuiz: () => import('./day-02.data').then((module) => module.dayTwoQuiz),
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
