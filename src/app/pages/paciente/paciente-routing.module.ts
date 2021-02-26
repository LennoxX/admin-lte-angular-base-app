import { PacienteFormComponent } from './paciente-form/paciente-form.component';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: PacienteListComponent},
  {path: 'new', component: PacienteFormComponent},
  {path: ':id', component: PacienteFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
