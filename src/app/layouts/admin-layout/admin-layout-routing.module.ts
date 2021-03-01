
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from 'src/app/pages/home/home-component/home-component.component';


const routes: Routes = [
  {path: '', component: HomeComponentComponent},
  {path: 'error', loadChildren: () => import('./../../pages/errors/errors.module').then(m=>m.ErrorsModule)},
  {path: 'paciente', loadChildren: ()=> import('./../../pages/paciente/paciente.module').then(m=>m.PacienteModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
