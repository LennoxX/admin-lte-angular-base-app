import { Directive, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BaseResourceService } from 'src/app/services/base-resource-service.service';

@Directive()
export abstract class BaseFormComponent<T> implements OnInit {

  resource: T;
  resourceForm: FormGroup;
  currentAction: string;
  pageTitle: string;
  loading: boolean = false;
  submittingForm = false;
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(protected resourceService: BaseResourceService<T>, protected messageService: MessageService, protected confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.buildResourceForm();
    this.setCurrentAction();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }


  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Novo';
    } else {
      this.pageTitle = 'Edição';
    }
  }


  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }


  confirm() {
    if (this.resourceForm.valid) {
      this.confirmationService.confirm({
        accept: () => {
          this.submitForm()
        },
      });
    }
  }

  submitForm() {


    this.submittingForm = true;


    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }

  }


  protected actionsForSuccess() {
    const baseComponentPath: string = this.route.parent.snapshot.url[0].path;
    this.router.navigateByUrl(`/${baseComponentPath}`).then(
      () => this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Solicitação Processada com Sucesso!'
      }));
  }

  protected actionsForError(error) {
    const baseComponentPath: string = this.route.parent.snapshot.url[0].path;
    console.log(error)
    this.submittingForm = false;
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: error.message
    });
    /* this.router.navigateByUrl(baseComponentPath).then(
      () => this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: error
      })); */
  }

  protected abstract createResource();

  protected abstract updateResource();

  protected abstract buildResourceForm();

  protected abstract loadResource();

}
