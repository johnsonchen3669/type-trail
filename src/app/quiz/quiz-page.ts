import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gradeQuiz } from './quiz-engine';
import { Question, QuestionId, QuizAnswers, QuizDefinition, QuizOption } from './quiz.models';
import { QuizProgressStore } from './quiz-progress.store';

@Component({
  selector: 'app-quiz-page',
  imports: [RouterLink],
  templateUrl: './quiz-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizPage implements OnInit {
  private readonly progressStore = inject(QuizProgressStore);
  readonly quiz = input.required<QuizDefinition>();
  readonly articleUrl = input.required<string>();
  protected readonly answers = signal<QuizAnswers>({});
  protected readonly submitted = signal(false);
  protected readonly triedToSubmit = signal(false);
  protected readonly answeredCount = computed(() =>
    this.quiz().questions.filter((question) => Boolean(this.answers()[question.id]?.trim())).length,
  );
  protected readonly missingIds = computed(() =>
    this.quiz().questions.filter((question) => !this.answers()[question.id]?.trim()).map((question) => question.id),
  );
  protected readonly result = computed(() => this.submitted() ? gradeQuiz(this.quiz(), this.answers()) : null);

  ngOnInit(): void {
    const restored = this.progressStore.load(this.quiz().id);
    this.answers.set(restored?.answers ?? {});
    this.submitted.set(restored?.status === 'submitted');
  }

  protected answerFor(questionId: string): string { return this.answers()[questionId] ?? ''; }
  protected optionsFor(question: Question): readonly QuizOption[] { return question.kind === 'choice' ? question.options : []; }
  protected expectedAnswer(question: Question): string {
    if (question.kind === 'choice') return question.correctAnswer;
    return question.acceptedAnswers[0] ?? '';
  }
  protected isCorrect(question: Question): boolean {
    return this.result()?.results.find((item) => item.questionId === question.id)?.isCorrect ?? false;
  }
  protected isMissing(questionId: QuestionId): boolean { return this.triedToSubmit() && this.missingIds().includes(questionId); }
  protected inputValue(event: Event): string { return (event.target as HTMLInputElement).value; }

  protected setAnswer(questionId: string, value: string): void {
    if (this.submitted()) return;
    const answers = { ...this.answers(), [questionId]: value };
    this.answers.set(answers);
    this.progressStore.saveDraft(this.quiz().id, answers);
  }

  protected submit(): void {
    this.triedToSubmit.set(true);
    const firstMissing = this.missingIds()[0];
    if (firstMissing) {
      globalThis.document?.querySelector<HTMLElement>(`[data-question-id="${firstMissing}"] input`)?.focus();
      return;
    }

    const result = gradeQuiz(this.quiz(), this.answers());
    this.submitted.set(true);
    this.progressStore.saveSubmission(this.quiz().id, this.answers(), result.score);
    globalThis.scrollTo?.({ top: 0, behavior: 'smooth' });
  }

  protected retake(): void {
    this.progressStore.clear(this.quiz().id);
    this.answers.set({});
    this.submitted.set(false);
    this.triedToSubmit.set(false);
    globalThis.scrollTo?.({ top: 0, behavior: 'smooth' });
  }
}
