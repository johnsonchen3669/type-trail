import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home').then((module) => module.Home), title: '型旅 TypeTrail｜每天走深一點' },
  { path: 'day/:day', loadComponent: () => import('./quiz/day-page').then((module) => module.DayPage), title: '每日五問｜型旅 TypeTrail' },
  { path: '**', redirectTo: '' },
];
