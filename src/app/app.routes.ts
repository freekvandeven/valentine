import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./valentine/valentine.component').then(m => m.ValentineComponent)
  },
  {
    path: 'memory',
    loadComponent: () => import('./memory/memory.component').then(m => m.MemoryComponent)
  },
  {
    path: 'countdown',
    loadComponent: () => import('./countdown/countdown.component').then(m => m.CountdownComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
