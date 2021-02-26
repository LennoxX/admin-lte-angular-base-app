import { TokenService } from './../services/token-service.service';


import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
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
      catchError((error: HttpErrorResponse) => {


        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

        }

        if (error.status === 401) {
          this.router.navigateByUrl('/auth/sign-in').then(() => {
            this.tokenService.deleteToken();
            this.messageService.add({
              key: 'toast-auth',
              severity: 'error',
              summary: error.error != null ? 'Erro ao autenticar' : 'Sessão Expirada',
              detail: error.error != null ? error.error.message : 'Faça o login novamente'
            });
          });
        } else if (error.status === 403) {
          this.router.navigateByUrl('/error/forbidden', { skipLocationChange: true });
        }
        else if (error.status === 404) {
          this.router.navigateByUrl('/error/not-found', { skipLocationChange: true });
        }


        return throwError(error);
      }
      )
    );

  }




}