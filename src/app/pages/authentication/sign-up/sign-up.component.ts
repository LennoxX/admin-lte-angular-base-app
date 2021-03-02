import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { TokenService } from 'src/app/services/token-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    Nivel: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    let usuario =  Object.assign(new Usuario(), this.loginForm.value);
   
    usuario.nivel = "USUARIO"
    this.authService.signUp(usuario).subscribe((res: HttpResponse<any>) => {
      usuario(res)
      this.router.navigateByUrl("/auth/sign-in").then(()=> {
        this.messageService.add({
          key: 'toast-auth',
          severity: 'success',
          summary: 'Usuário Cadastrado com Sucesso',
          detail: 'Faça o login para continuar'
        });
      })
    },
      (error: HttpErrorResponse) => {
        usuario(error)
        this.loading = false;
        this.messageService.add({
          key: 'toast-auth',
          severity: 'error',
          summary: 'Erro ao Registrar',
          detail: error.error != null ? error.error.errors[0] : 'Tente novamente'
        });
      }
    )
  }
}
