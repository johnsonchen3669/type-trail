import { Injectable } from '@angular/core';
import { QuizAnswers, QuizProgress } from './quiz.models';

const STORAGE_PREFIX = 'type-trail:quiz:';

function isQuizProgress(value: unknown, quizId: string): value is QuizProgress {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<QuizProgress>;
  return candidate.version === 1 && candidate.quizId === quizId &&
    (candidate.status === 'in-progress' || candidate.status === 'submitted') &&
    typeof candidate.answers === 'object' && candidate.answers !== null;
}

@Injectable({ providedIn: 'root' })
export class QuizProgressStore {
  load(quizId: string): QuizProgress | null {
    try {
      const raw = globalThis.localStorage?.getItem(this.key(quizId));
      if (!raw) return null;
      const progress: unknown = JSON.parse(raw);
      if (isQuizProgress(progress, quizId)) return progress;
      this.clear(quizId);
      return null;
    } catch {
      this.clear(quizId);
      return null;
    }
  }

  saveDraft(quizId: string, answers: QuizAnswers): void {
    this.save({ version: 1, quizId, status: 'in-progress', answers });
  }

  saveSubmission(quizId: string, answers: QuizAnswers, score: number): void {
    this.save({ version: 1, quizId, status: 'submitted', answers, score, submittedAt: new Date().toISOString() });
  }

  clear(quizId: string): void {
    try { globalThis.localStorage?.removeItem(this.key(quizId)); } catch { /* Storage may be disabled. */ }
  }

  private save(progress: QuizProgress): void {
    try { globalThis.localStorage?.setItem(this.key(progress.quizId), JSON.stringify(progress)); } catch { /* Quiz still works in memory. */ }
  }

  private key(quizId: string): string { return `${STORAGE_PREFIX}${quizId}`; }
}
