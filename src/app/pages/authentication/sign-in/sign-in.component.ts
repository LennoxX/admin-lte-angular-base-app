import { ProfileService } from './../../../services/profile.service';
import { MessageService } from 'primeng/api';
import { TokenService } from './../../../services/token-service.service';
import { AuthService } from './../../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    Username: new FormControl(),
    Password: new FormControl()
  });
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private tokenService: TokenService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;

    this.authService.signin(this.loginForm.value).subscribe((res: HttpResponse<any>) => {
      this.tokenService.storeToken(res.headers.get('Authorization'));
      this.profileService.getUser().subscribe((user) => {
        this.tokenService.storeUser(user);
        this.router.navigateByUrl("/");
      })

    },
      (error: HttpErrorResponse) => {
        this.loading = false;
      }
    )
  }
}
