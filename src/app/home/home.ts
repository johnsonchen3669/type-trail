import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { dayOneQuiz } from '../quiz/day-01.data';
import { QuizProgressStore } from '../quiz/quiz-progress.store';

@Component({ selector: 'app-home', imports: [RouterLink], templateUrl: './home.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class Home {
  private readonly progressStore = inject(QuizProgressStore);
  protected readonly quiz = dayOneQuiz;
  protected readonly progress = this.progressStore.load(dayOneQuiz.id);
}
