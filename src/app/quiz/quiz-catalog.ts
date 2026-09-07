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
  {
    status: 'published',
    day: 3,
    title: 'Scope 與 Closure：函式如何記住外部狀態？',
    loadQuiz: () => import('./day-03.data').then((module) => module.dayThreeQuiz),
  },
  {
    status: 'published',
    day: 4,
    title: 'Prototype、Class 與 this',
    loadQuiz: () => import('./day-04.data').then((module) => module.dayFourQuiz),
  },
  {
    status: 'published',
    day: 5,
    title: 'Promise、async/await 與 Event Loop',
    loadQuiz: () => import('./day-05.data').then((module) => module.dayFiveQuiz),
  },
  {
    status: 'published',
    day: 6,
    title: 'ES Module：現代 JavaScript 專案的邊界',
    loadQuiz: () => import('./day-06.data').then((module) => module.daySixQuiz),
  },
  {
    status: 'published',
    day: 7,
    title: '從 JavaScript 到 TypeScript：編譯時與執行時',
    loadQuiz: () => import('./day-07.data').then((module) => module.daySevenQuiz),
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
