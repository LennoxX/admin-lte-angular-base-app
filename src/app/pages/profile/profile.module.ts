import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';
import { AlterarDadosFormComponent } from './alterar-dados-form/alterar-dados-form.component';
import { AlterarSenhaFormComponent } from './alterar-senha-form/alterar-senha-form.component';
import {FileUploadModule} from 'primeng/fileupload';

@NgModule({
  declarations: [ProfileFormComponent, AlterarDadosFormComponent, AlterarSenhaFormComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class ProfileModule { }
