import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home').then((module) => module.Home), title: '型旅 TypeTrail｜每天走深一點' },
  { path: 'day/1', loadComponent: () => import('./quiz/quiz-page').then((module) => module.QuizPage), title: 'Day 1｜型旅 TypeTrail' },
  { path: '**', redirectTo: '' },
];
