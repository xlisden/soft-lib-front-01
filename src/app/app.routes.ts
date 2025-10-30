import { Routes } from '@angular/router';
import { LibroListComponent } from './components/libro-list/libro-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/libros',
    pathMatch: 'full',
  },
  {
    path: 'libros',
    component: LibroListComponent,
  },
];
