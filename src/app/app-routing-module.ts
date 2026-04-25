import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { CrudSolicitudesComponent } from './components/crud-solicitudes/crud-solicitudes';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'crud', component: CrudSolicitudesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
