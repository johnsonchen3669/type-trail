import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { publishedQuizzes, quizIdForDay, upcomingQuiz } from '../quiz/quiz-catalog';
import { QuizProgressStore } from '../quiz/quiz-progress.store';

@Component({ selector: 'app-home', imports: [RouterLink], templateUrl: './home.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class Home {
  private readonly progressStore = inject(QuizProgressStore);
  protected readonly published = publishedQuizzes.map((entry) => ({
    entry,
    progress: this.progressStore.load(quizIdForDay(entry.day)),
  }));
  protected readonly latest = this.published.at(-1) ?? null;
  protected readonly previous = this.published.slice(0, -1).reverse();
  protected readonly upcoming = upcomingQuiz;
}
