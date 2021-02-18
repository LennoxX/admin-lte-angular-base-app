import { TokenService } from './../services/token-service.service';


import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, catchError, map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router, private messageService: MessageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {
    let authRequest: any;
    authRequest = req.clone({
      setHeaders: {
        Authorization: `${this.tokenService.getToken()}`
      }
    });

    return next.handle(authRequest).pipe(

      tap((ev: any) => {
        if (ev instanceof HttpResponse)
          this.tokenService.storeToken(ev.headers.get('Authorization'))

      }),
      catchError((err: any) => {
        if (err.status === 403) {
          this.tokenService.deleteToken();
          this.router.navigateByUrl(`/auth/sign-in`).then(() => {
            this.messageService.add({
              severity: 'error',
              summary: 'Sessão Expirada',
              detail: 'Faça o Login Novamente'
            });
          }
          )
        }
        //log error 

        return of(err);
      })
    );

  }




}