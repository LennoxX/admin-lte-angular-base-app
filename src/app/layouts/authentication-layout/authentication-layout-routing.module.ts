import { SignUpComponent } from './../../pages/authentication/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from 'src/app/pages/authentication/sign-in/sign-in.component';

const routes: Routes = [
  {path: '', loadChildren: ()=> import('../../pages/authentication/authentication.module').then(m=>m.AuthenticationModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationLayoutRoutingModule { }
