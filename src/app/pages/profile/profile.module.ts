import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [ProfileFormComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class ProfileModule { }
