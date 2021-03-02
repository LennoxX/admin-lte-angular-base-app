import { Pessoa } from './../models/pessoa.model.ts';
import { Usuario } from './../models/user.model';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor() { }

  storeToken(token: string) {
    sessionStorage.setItem("token", token);
  }

  storeUser(user: Usuario) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): Pessoa{
    var user: Pessoa = JSON.parse(sessionStorage.getItem('user'))
    
    return user;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  deleteToken() {
    sessionStorage.removeItem("token");
  }

  
  deleteUser() {
    sessionStorage.removeItem("user");
  }

  deleteAll(){
    this.deleteToken();
    this.deleteUser();
  }
}