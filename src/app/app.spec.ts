import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { App } from './app';
import { routes } from './app.routes';

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
    expect(pageText).toContain('每天走深一點');
    expect(pageText).toContain('路線即將開始');
    expect(pageText).toContain('AI都會寫程式了，為什麼還要學TypeScript？');
    expect(pageText).not.toContain('開始測驗');
  });

  it('shows a preparation page for the next unpublished quiz', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/day/1');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const pageText = (fixture.nativeElement as HTMLElement).textContent?.replace(/\s+/g, '');
    expect(pageText).toContain('這一站還在準備中');
    expect(pageText).toContain('AI都會寫程式了，為什麼還要學TypeScript？');
    expect(pageText).not.toContain('正確答案');
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
