import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { BaseListComponent } from './base-list/base-list.component';
import { TitleCasePipe, CommonModule } from '@angular/common';


@NgModule({
  declarations: [NavComponent, MenuComponent, FooterComponent, BaseListComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    NavComponent,
    MenuComponent,
    FooterComponent
  ],
  providers: [
    TitleCasePipe
  ]
})
export class ComponentsModule { }
