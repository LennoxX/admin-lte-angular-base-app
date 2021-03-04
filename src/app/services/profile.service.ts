import { TokenService } from './token-service.service';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Usuario } from '../models/user.model';
import { Pessoa } from '../models/pessoa.model.ts';

@Injectable({
  providedIn: 'root'
})
export class ProfileService  {

  httpOptions = {
  
    observe: 'response' as 'response'
  };

  protected readonly API_PATH = `${environment.BASE_URL}`
  
  constructor(private http:HttpClient, private tokenService:TokenService, private router: Router) {
  }

  public getUser(): Observable<any> {
    return this.http.get(`${this.API_PATH}profile/user`);
  }


  update(resource: Pessoa): Observable<Pessoa> {
    const url = `${this.API_PATH}profile/user/update`;
    return this.http.put(url, resource).pipe(
      map(() => resource)
    );
  }

  
  

  
}
