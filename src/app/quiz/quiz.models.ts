export type QuestionId = `day-${string}-${string}`;

export interface QuizOption { readonly id: string; readonly label: string; }

interface BaseQuestion {
  readonly id: QuestionId;
  readonly number: number;
  readonly prompt: string;
  readonly learningGoal: string;
  readonly explanation: string;
  readonly code?: string;
}

export interface ChoiceQuestion extends BaseQuestion {
  readonly kind: 'choice';
  readonly options: readonly QuizOption[];
  readonly correctAnswer: string;
}

export interface ExactTextQuestion extends BaseQuestion {
  readonly kind: 'exact-text';
  readonly acceptedAnswers: readonly string[];
}

export interface CodeFillQuestion extends BaseQuestion {
  readonly kind: 'code-fill';
  readonly acceptedAnswers: readonly string[];
}

export type Question = ChoiceQuestion | ExactTextQuestion | CodeFillQuestion;

export interface QuizDefinition {
  readonly id: string;
  readonly day: number;
  readonly title: string;
  readonly estimatedMinutes: number;
  readonly questions: readonly Question[];
}

export type QuizAnswers = Readonly<Record<string, string>>;

export interface QuestionResult { readonly questionId: QuestionId; readonly isCorrect: boolean; }
export interface QuizResult { readonly score: number; readonly total: number; readonly results: readonly QuestionResult[]; }

export interface QuizProgress {
  readonly version: 1;
  readonly quizId: string;
  readonly status: 'in-progress' | 'submitted';
  readonly answers: QuizAnswers;
  readonly score?: number;
  readonly submittedAt?: string;
}
