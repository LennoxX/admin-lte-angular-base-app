
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HomeComponentComponent } from 'src/app/pages/home/home-component/home-component.component';


const routes: Routes = [
  {path: '', component: HomeComponentComponent },
  {path: 'aluno', loadChildren: ()=> import('./../../pages/aluno/aluno.module').then(m=>m.AlunoModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
