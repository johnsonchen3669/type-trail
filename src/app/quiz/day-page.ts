import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, from, map, of, startWith, switchMap } from 'rxjs';
import { findQuizEntry, PublishedQuizEntry, UpcomingQuizEntry } from './quiz-catalog';
import { QuizDefinition } from './quiz.models';
import { QuizPage } from './quiz-page';

type DayPageState =
  | { readonly kind: 'loading' }
  | { readonly kind: 'published'; readonly entry: PublishedQuizEntry; readonly quiz: QuizDefinition }
  | { readonly kind: 'coming-soon'; readonly entry: UpcomingQuizEntry }
  | { readonly kind: 'unavailable' };

@Component({
  selector: 'app-day-page',
  imports: [NgTemplateOutlet, RouterLink, QuizPage],
  template: `
    @switch (state().kind) {
      @case ('published') {
        @if (publishedState(); as published) {
          <app-quiz-page [quiz]="published.quiz" [articleUrl]="published.entry.articleUrl" />
        }
      }
      @case ('coming-soon') {
        @if (upcomingState(); as upcoming) {
          <ng-container *ngTemplateOutlet="locked; context: { title: upcoming.entry.title, day: upcoming.entry.day }" />
        }
      }
      @case ('unavailable') {
        <ng-container *ngTemplateOutlet="locked" />
      }
      @default {
        <section class="grid min-h-[65vh] place-items-center px-5" aria-live="polite">
          <p class="font-mono text-sm text-[var(--muted)]">正在確認路線…</p>
        </section>
      }
    }

    <ng-template #locked let-title="title" let-day="day">
      <section class="relative isolate grid min-h-[65vh] place-items-center overflow-hidden px-5 py-16 text-center">
        <div class="trail-grid pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden="true"></div>
        <div class="pointer-events-none absolute left-1/2 top-0 -z-10 h-28 w-px bg-[var(--line)]" aria-hidden="true"></div>
        <div class="max-w-2xl">
          <div class="mx-auto grid size-20 place-items-center rounded-full border-2 border-dashed border-[var(--blue)] bg-[var(--paper)] font-mono text-sm font-bold text-[var(--blue)]">
            {{ day ? 'DAY ' + day.toString().padStart(2, '0') : 'NEXT' }}
          </div>
          <p class="mt-7 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--coral)]">Checkpoint locked</p>
          <h1 class="mt-4 text-4xl font-black tracking-[-0.045em] text-[var(--ink)] sm:text-6xl">這一站還在準備中</h1>
          @if (title) {
            <p class="mx-auto mt-6 max-w-xl text-lg font-bold leading-8 text-[var(--ink)]">{{ title }}</p>
          }
          <p class="mx-auto mt-4 max-w-lg leading-7 text-[var(--muted)]">文章發布後，這裡才會開放五題測驗。先回到路線圖看看目前能走到哪裡。</p>
          <a class="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--ink)] px-6 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]" routerLink="/">
            返回路線圖 <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly state = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const rawDay = params.get('day');
        const day = rawDay && /^\d+$/.test(rawDay) ? Number(rawDay) : Number.NaN;
        const entry = Number.isInteger(day) && day >= 1 && day <= 30 ? findQuizEntry(day) : null;

        if (!entry) return of<DayPageState>({ kind: 'unavailable' });
        if (entry.status === 'coming-soon') return of<DayPageState>({ kind: 'coming-soon', entry });

        return from(entry.loadQuiz()).pipe(
          map((quiz): DayPageState => ({ kind: 'published', entry, quiz })),
          startWith<DayPageState>({ kind: 'loading' }),
          catchError(() => of<DayPageState>({ kind: 'unavailable' })),
        );
      }),
    ),
    { initialValue: { kind: 'loading' } as DayPageState },
  );

  protected publishedState(): Extract<DayPageState, { kind: 'published' }> | null {
    const state = this.state();
    return state.kind === 'published' ? state : null;
  }

  protected upcomingState(): Extract<DayPageState, { kind: 'coming-soon' }> | null {
    const state = this.state();
    return state.kind === 'coming-soon' ? state : null;
  }
}
