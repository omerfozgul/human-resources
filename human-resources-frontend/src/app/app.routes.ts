import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'candidate-list',
    pathMatch: 'full',
  },
  {
    path: 'candidate-list',
    loadComponent: () => import('./pages/candidate-list/candidate-list.page').then( m => m.CandidateListPage)
  },
  {
    path: 'candidate-form',
    loadComponent: () => import('./pages/candidate-form/candidate-form.page').then( m => m.CandidateFormPage)
  },
  {
    path: 'candidates/new',
    loadComponent: () => import('./pages/candidate-form/candidate-form.page').then( m => m.CandidateFormPage)
  },
  {
    path: 'candidates/edit/:id',
    loadComponent: () => import('./pages/candidate-form/candidate-form.page').then( m => m.CandidateFormPage)
  },
];
