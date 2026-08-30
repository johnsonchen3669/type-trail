import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { QuizPage } from './quiz-page';
import { dayOneQuiz } from './day-01.data';

describe('QuizPage', () => {
  beforeEach(async () => {
    localStorage.clear();
    vi.stubGlobal('scrollTo', vi.fn());
    await TestBed.configureTestingModule({
      imports: [QuizPage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('keeps answers hidden and marks unanswered questions', () => {
    const fixture = TestBed.createComponent(QuizPage);
    fixture.componentRef.setInput('quiz', dayOneQuiz);
    fixture.componentRef.setInput('articleUrl', 'https://example.com/day-1');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.textContent).not.toContain('正確答案：');
    element.querySelector<HTMLButtonElement>('button[type="button"]:last-of-type')?.click();
    fixture.detectChanges();

    expect(element.querySelectorAll('[data-question-id] .text-red-600')).toHaveLength(5);
    expect(element.textContent).not.toContain('正確答案：');
  });

  it('submits a perfect attempt and reveals all explanations', () => {
    const fixture = TestBed.createComponent(QuizPage);
    fixture.componentRef.setInput('quiz', dayOneQuiz);
    fixture.componentRef.setInput('articleUrl', 'https://example.com/day-1');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    const questionCards = element.querySelectorAll<HTMLElement>('[data-question-id]');
    for (const [index, answer] of ['C', 'B', 'C'].entries()) {
      questionCards[index]?.querySelector<HTMLInputElement>(`input[type="radio"][value="${answer}"]`)?.click();
      fixture.detectChanges();
    }

    const textInputs = element.querySelectorAll<HTMLInputElement>('input[type="text"]');
    textInputs[0]!.value = 'fill';
    textInputs[0]!.dispatchEvent(new Event('input'));
    textInputs[1]!.value = 'Question';
    textInputs[1]!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    element.querySelector<HTMLButtonElement>('button[type="button"]:last-of-type')?.click();
    fixture.detectChanges();

    expect(element.querySelectorAll('[data-question-id] .text-green-700')).toHaveLength(5);
    expect(element.textContent).toContain('這次走完了，來核對判斷。');
    expect(element.textContent?.match(/正確答案：/g)).toHaveLength(5);
  });
});
