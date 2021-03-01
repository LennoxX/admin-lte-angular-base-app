import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TokenService } from './services/token-service.service';
import { AuthService } from './services/auth-service.service';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { TitleCasePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [    
    HttpClientModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    
  ],
  providers: [
    AuthService,
    TokenService,
    MessageService,
    TitleCasePipe,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
