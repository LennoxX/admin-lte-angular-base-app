import { User } from './../models/user.model';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor() {}

  storeToken(token: string) {
    sessionStorage.setItem("token", token);
  }

  storeUser(user: User) {
    sessionStorage.setItem('user', user.username);
  }

  getUser(): string{
    return sessionStorage.getItem('user');
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  deleteToken() {
    sessionStorage.removeItem("token");
  }
}