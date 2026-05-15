import { Routes } from '@angular/router';
import { HomePage } from './features/home/home/home';
import { CrudSolicitudesComponent } from './features/appointments/pages/crud-solicitudes/crud-solicitudes';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'crud', component: CrudSolicitudesComponent },
  { path: '**', redirectTo: '' }
];
