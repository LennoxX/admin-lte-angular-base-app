import { TokenService } from './../services/token-service.service';
import { AuthService } from './../services/auth-service.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly API_PATH = `${environment.BASE_URL}`

  constructor(private authService: AuthService, private router: Router, private tokenService:TokenService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return new Observable<boolean>(obs => {


      this.authService.validate().subscribe(
        () => {               
            obs.next(true);
          }, err => {
            this.tokenService.deleteToken();
            this.router.navigateByUrl("/auth/sign-in")
            obs.next(false);
          }, 
     
        
      );

    });




  }
}
