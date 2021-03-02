import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { BaseListComponent } from './base-list/base-list.component';
import { TitleCasePipe, CommonModule } from '@angular/common';
import { MenuPacienteComponent } from './menu-paciente/menu-paciente.component';


@NgModule({
  declarations: [NavComponent, MenuComponent, FooterComponent, BaseListComponent, MenuPacienteComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    NavComponent,
    MenuComponent,
    FooterComponent,
    MenuPacienteComponent
  ],
  providers: [
    TitleCasePipe
  ]
})
export class ComponentsModule { }
