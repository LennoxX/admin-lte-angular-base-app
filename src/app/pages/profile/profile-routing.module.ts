import { AlterarSenhaFormComponent } from './alterar-senha-form/alterar-senha-form.component';
import { AlterarDadosFormComponent } from './alterar-dados-form/alterar-dados-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileFormComponent } from './profile-form/profile-form.component';

const routes: Routes = [
  {path: '', component: ProfileFormComponent},
  {path: 'meus-dados', component: AlterarDadosFormComponent},
  {path: 'password', component: AlterarSenhaFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
