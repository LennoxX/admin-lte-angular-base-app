import { TokenService } from './token-service.service';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  httpOptions = {
  
    observe: 'response' as 'response'
  };

  protected readonly API_PATH = `${environment.BASE_URL}`
  
  constructor(private http:HttpClient, private tokenService:TokenService, private router: Router) {
  }

  public signin(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.API_PATH}login`,usuario, {observe: 'response'});
  }

  public signUp(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.API_PATH}sign-up`,usuario, {observe: 'response'});
  }

  public validate() : Observable<any>{
    return this.http.get(`${this.API_PATH}auth/validate`);
  
  }


  public getUser(): Observable<any> {
    return this.http.get(`${this.API_PATH}auth/user`);
  }

  public signout(){
    this.tokenService.deleteToken();
    this.router.navigateByUrl("/auth/sign-in");
  }

  
  

  
}
