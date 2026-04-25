import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { CrudSolicitudesComponent } from './components/crud-solicitudes/crud-solicitudes';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'crud', component: CrudSolicitudesComponent },
  { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
