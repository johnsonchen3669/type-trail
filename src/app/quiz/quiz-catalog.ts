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
    articleUrl: 'https://johnsonchen.dev/blog/typescript/introduction/',
    loadQuiz: () => import('./day-01.data').then((module) => module.dayOneQuiz),
  },
  {
    status: 'published',
    day: 2,
    title: 'JavaScript 是動態型別，問題到底出在哪裡？',
    articleUrl: 'https://johnsonchen.dev/blog/typescript/javascript-dynamic-typing/',
    loadQuiz: () => import('./day-02.data').then((module) => module.dayTwoQuiz),
  },
  {
    status: 'published',
    day: 3,
    title: 'Scope 與 Closure：函式如何記住外部狀態？',
    articleUrl: 'https://johnsonchen.dev/blog/typescript/scope-and-closure/',
    loadQuiz: () => import('./day-03.data').then((module) => module.dayThreeQuiz),
  },
  {
    status: 'published',
    day: 4,
    title: 'Prototype、Class 與 this',
    articleUrl: 'https://johnsonchen.dev/blog/typescript/prototype-class-and-this/',
    loadQuiz: () => import('./day-04.data').then((module) => module.dayFourQuiz),
  },
  {
    status: 'published',
    day: 5,
    title: 'Promise、async/await 與事件迴圈',
    articleUrl: 'https://johnsonchen.dev/blog/typescript/promise-async-await-event-loop/',
    loadQuiz: () => import('./day-05.data').then((module) => module.dayFiveQuiz),
  },
  {
    status: 'published',
    day: 6,
    title: 'ES 模組：現代 JavaScript 專案的邊界',
    articleUrl: 'https://johnsonchen.dev/blog/typescript/es-modules/',
    loadQuiz: () => import('./day-06.data').then((module) => module.daySixQuiz),
  },
  {
    status: 'published',
    day: 7,
    title: '從 JavaScript 到 TypeScript：編譯時與執行時',
    articleUrl: 'https://johnsonchen.dev/blog/typescript/compile-time-runtime/',
    loadQuiz: () => import('./day-07.data').then((module) => module.daySevenQuiz),
  },
  {
    status: 'published',
    day: 8,
    title: '型別推論：讓 TypeScript 自己理解程式',
    articleUrl: 'https://johnsonchen.dev/blog/typescript/type-inference/',
    loadQuiz: () => import('./day-08.data').then((module) => module.dayEightQuiz),
  },
  {
    status: 'published',
    day: 9,
    title: '物件型別：從資料結構開始建模',
    articleUrl: 'https://johnsonchen.dev/blog/typescript/object-type/',
    loadQuiz: () => import('./day-09.data').then((module) => module.dayNineQuiz),
  },
  {
    status: 'published',
    day: 10,
    title: '字面值與聯集：用型別表達業務規則',
    articleUrl: 'https://johnsonchen.dev/blog/typescript/literal-and-union/',
    loadQuiz: () => import('./day-10.data').then((module) => module.dayTenQuiz),
  },
  {
    status: 'published',
    day: 11,
    title: '型別縮小：讓條件判斷幫忙確認型別',
    articleUrl: 'https://johnsonchen.dev/blog/typescript/type-narrowing/',
    loadQuiz: () => import('./day-11.data').then((module) => module.dayElevenQuiz),
  },
  {
    status: 'published',
    day: 12,
    title: '可辨識聯集：一個欄位決定要帶哪些資料',
    articleUrl: 'https://johnsonchen.dev/blog/typescript/discriminated-union/',
    loadQuiz: () => import('./day-12.data').then((module) => module.dayTwelveQuiz),
  },
  {
    status: 'published',
    day: 13,
    title: 'any、unknown、never：處理未知資料與遺漏分支',
    articleUrl: 'https://johnsonchen.dev/blog/typescript/any-unknown-never/',
    loadQuiz: () => import('./day-13.data').then((module) => module.dayThirteenQuiz),
  },
  {
    status: 'coming-soon',
    day: 14,
    title: '型別斷言：as 為什麼可能只是在欺騙自己？',
    loadQuiz: () => import('./day-14.data').then((module) => module.dayFourteenQuiz),
  },
  {
    status: 'coming-soon',
    day: 15,
    title: 'Interface vs Type：從使用目的判斷',
    loadQuiz: () => import('./day-15.data').then((module) => module.dayFifteenQuiz),
  },
  {
    status: 'coming-soon',
    day: 16,
    title: '結構型別：長得一樣就可能相容',
    loadQuiz: () => import('./day-16.data').then((module) => module.daySixteenQuiz),
  },
  {
    status: 'coming-soon',
    day: 17,
    title: 'Function Type：函式也是資料契約',
    loadQuiz: () => import('./day-17.data').then((module) => module.daySeventeenQuiz),
  },
  {
    status: 'coming-soon',
    day: 18,
    title: 'Generic：保留輸入與輸出的關係',
    loadQuiz: () => import('./day-18.data').then((module) => module.dayEighteenQuiz),
  },
  {
    status: 'coming-soon',
    day: 19,
    title: 'keyof、typeof 與 Indexed Access',
    loadQuiz: () => import('./day-19.data').then((module) => module.dayNineteenQuiz),
  },
  {
    status: 'coming-soon',
    day: 20,
    title: 'Utility Types：從既有型別產生新型別',
    loadQuiz: () => import('./day-20.data').then((module) => module.dayTwentyQuiz),
  },
  {
    status: 'coming-soon',
    day: 21,
    title: '映射型別與條件型別',
    loadQuiz: () => import('./day-21.data').then((module) => module.dayTwentyOneQuiz),
  },
  {
    status: 'coming-soon',
    day: 22,
    title: 'infer：理解函式庫如何推導型別',
    loadQuiz: () => import('./day-22.data').then((module) => module.dayTwentyTwoQuiz),
  },
  {
    status: 'coming-soon',
    day: 23,
    title: 'API 傳來的資料，TypeScript 知道嗎？',
    loadQuiz: () => import('./day-23.data').then((module) => module.dayTwentyThreeQuiz),
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
