import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'task1'
  },
  {
    loadComponent: () => import('./task1/task1.component').then((x) => x.Task1Component),
    path: 'task1',
    title: 'Task 1'
  },
  {
    loadComponent: () => import('./task2/task2.component').then((x) => x.Task2Component),
    path: 'task2',
    title: 'Task 2'
  },
  {
    loadComponent: () => import('./task3/task3.component').then((x) => x.Task3Component),
    path: 'task3',
    title: 'Task 3'
  },
  {
    loadComponent: () => import('./task4/task4.component').then((x) => x.Task4Component),
    path: 'task4',
    title: 'Task 4'
  },
  {
    loadComponent: () => import('./task5/task5.component').then((x) => x.Task5Component),
    path: 'task5',
    title: 'Task 5'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'task1'
  },
];
