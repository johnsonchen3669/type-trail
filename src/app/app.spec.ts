import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { App } from './app';
import { routes } from './app.routes';
import { publishedQuizzes } from './quiz/quiz-catalog';

describe('App routing', () => {
  it('renders the home page through the application router', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const pageText = (fixture.nativeElement as HTMLElement).textContent?.replace(/\s+/g, '');
    const latest = publishedQuizzes.at(-1);
    expect(pageText).toContain('每天走深一點');
    expect(latest).toBeTruthy();
    expect(pageText).toContain(`Latestday${latest!.day.toString().padStart(2, '0')}`);
    expect(pageText).toContain(latest!.title.replace(/\s+/g, ''));
    expect(pageText).toContain('開始測驗');
  });

  it('does not reveal metadata for an unregistered day', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/day/30');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const pageText = (fixture.nativeElement as HTMLElement).textContent?.replace(/\s+/g, '');
    expect(pageText).toContain('這一站還在準備中');
    expect(pageText).not.toContain('AI都會寫程式了');
  });
});
