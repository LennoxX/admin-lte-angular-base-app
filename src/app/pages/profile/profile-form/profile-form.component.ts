import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BaseFormComponent } from 'src/app/components/base-form/base-form.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { TokenService } from 'src/app/services/token-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent extends BaseFormComponent<User>{

  constructor(private injector: Injector, protected authService: AuthService, 
    protected resourceService: UserService, 
    protected messageService: MessageService, 
    protected confirmationService: ConfirmationService,
    private tokenService: TokenService) {
    super(resourceService, messageService, confirmationService);
    this.formBuilder = this.injector.get(FormBuilder);
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
  }


  ngOnInit(): void {
    super.ngOnInit();
  }
  protected createResource() {
    throw new Error('Method not implemented.');
  }
  protected updateResource() {
    throw new Error('Method not implemented.');
  }
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      username: [null, Validators.required],
      sexo: [null, Validators.required],
      telefone: [],
      email: [],
      dataNascimento: [null, Validators.required]
    });
  }
  protected loadResource() {
    if(this.tokenService.getUser() == null ) {
      this.authService.getUser().subscribe((res) => {
        this.resource = res;
        this.resourceForm.patchValue(this.resource);
        console.log(this.resourceForm.value)
      })
    }else {
      this.resource = this.tokenService.getUser();
    }
   
  }

  protected setCurrentAction() {

  }



}
