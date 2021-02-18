import { AdminLayoutModule } from './../../layouts/admin-layout/admin-layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoRoutingModule } from './aluno-routing.module';
import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';

import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AlunoListComponent, AlunoFormComponent],
  imports: [
    CommonModule,
    AlunoRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    AdminLayoutModule
  ]
})
export class AlunoModule { }
