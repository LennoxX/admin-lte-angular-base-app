import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationLayoutRoutingModule } from './authentication-layout-routing.module';
import { AuthenticationLayoutComponent } from './authentication-layout.component';

@NgModule({
  declarations: [AuthenticationLayoutComponent],
  imports: [
    CommonModule,
    AuthenticationLayoutRoutingModule,
    ToastModule
  ]
})
export class AuthenticationLayoutModule { }
