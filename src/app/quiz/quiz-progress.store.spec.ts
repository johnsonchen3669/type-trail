import { beforeEach, describe, expect, it } from 'vitest';
import { QuizProgressStore } from './quiz-progress.store';

describe('QuizProgressStore', () => {
  const store = new QuizProgressStore();
  beforeEach(() => localStorage.clear());

  it('restores a draft', () => {
    store.saveDraft('day-01', { 'day-01-01': 'C' });
    expect(store.load('day-01')?.answers['day-01-01']).toBe('C');
    expect(store.load('day-01')?.status).toBe('in-progress');
  });

  it('restores a submitted result', () => {
    store.saveSubmission('day-01', { 'day-01-01': 'C' }, 1);
    expect(store.load('day-01')?.score).toBe(1);
    expect(store.load('day-01')?.submittedAt).toBeTruthy();
  });

  it('removes invalid persisted data', () => {
    localStorage.setItem('type-trail:quiz:day-01', '{broken');
    expect(store.load('day-01')).toBeNull();
    expect(localStorage.getItem('type-trail:quiz:day-01')).toBeNull();
  });
});
