import { Routes } from '@angular/router';
import { LibroListComponent } from './components/libro-list/libro-list.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';

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
  {
    path: 'libros/nuevo',
    component: LibroFormComponent,
  },
  {
    path: 'libros/editar/:id',
    component: LibroFormComponent,
  },
  {
    path: '**',
    redirectTo: 'libros',
  },
];
