import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommonModule } from '@angular/common';
import {ToastModule} from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    ComponentsModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressBarModule
    

  ],
  exports: [
    ProgressBarModule
  ]
 
})
export class AdminLayoutModule { }
