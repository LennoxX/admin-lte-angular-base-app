import { ProfileService } from './../../../services/profile.service';
import { Pessoa } from '../../../models/pessoa.model.ts';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BaseFormComponent } from 'src/app/components/base-form/base-form.component';
import { AuthService } from 'src/app/services/auth-service.service';
import { TokenService } from 'src/app/services/token-service.service';
import { UserService } from 'src/app/services/user-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent extends BaseFormComponent<Pessoa>{

  constructor(private injector: Injector, protected profileService: ProfileService,
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


    this.profileService.getUser().subscribe((res) => {
      this.resource = res;
      this.tokenService.storeUser(res);
      let tmpDate = (moment(res.dataNascimento, 'YYYY-MM-DD').format('yyyy-MM-DD'))
      res.dataNascimento = null;
      this.resourceForm.patchValue(res);
      this.resourceForm.controls['dataNascimento'].setValue(tmpDate)
      this.loading = false;
    })


  }

  protected setCurrentAction() {

  }



}
