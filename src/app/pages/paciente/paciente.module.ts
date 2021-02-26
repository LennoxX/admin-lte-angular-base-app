import { AdminLayoutModule } from '../../layouts/admin-layout/admin-layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteListComponent } from './paciente-list/paciente-list.component';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';

import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputMaskModule} from 'primeng/inputmask';
import { NgxMaskModule, IConfig } from 'ngx-mask'


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;



@NgModule({
  declarations: [PacienteListComponent, PacienteFormComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    AdminLayoutModule,
    NgxMaskModule.forRoot(),
  ]
})
export class PacienteModule { }
