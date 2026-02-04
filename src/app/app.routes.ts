import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./valentine/valentine.component').then(m => m.ValentineComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
