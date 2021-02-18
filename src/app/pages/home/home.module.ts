import { HomeComponentComponent } from 'src/app/pages/home/home-component/home-component.component'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [HomeComponentComponent],
  imports: [
    CommonModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
