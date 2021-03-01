import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children:[{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m=>m.AdminLayoutModule)
    }]
  },
  {
    path: 'profile',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],    
    children:[{
      path: '',
      loadChildren: () => import('./pages/profile/profile.module').then(m=>m.ProfileModule)
    }]
  },
  {
    path: 'error',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],    
    children:[{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m=>m.AdminLayoutModule)
    }]
  },
  {
    path: 'auth',
    component: AuthenticationLayoutComponent,
    children:[{
      path:'',
      loadChildren: () => import('./layouts/authentication-layout/authentication-layout.module').then(m=>m.AuthenticationLayoutModule)
    }]
  },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
