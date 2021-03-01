import { User } from './../models/user.model';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor() { }

  storeToken(token: string) {
    sessionStorage.setItem("token", token);
  }

  storeUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    var user: User = JSON.parse(sessionStorage.getItem('user'))
    return user;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  deleteToken() {
    sessionStorage.removeItem("token");
  }
}