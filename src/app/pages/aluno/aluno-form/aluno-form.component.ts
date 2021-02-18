import { AlunoService } from './../../../services/aluno-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Injector, AfterContentChecked } from '@angular/core';
import { Aluno } from 'src/app/models/aluno.model';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, AfterContentChecked {
  resource: Aluno = new Aluno();
  resourceForm: FormGroup;
  currentAction: string;
  pageTitle: string;
  loading: boolean = false;
  submittingForm = false;
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(private injector: Injector, private resourceService: AlunoService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.formBuilder = this.injector.get(FormBuilder);
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
  }
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  ngOnInit(): void {
    this.buildResourceForm();
    this.setCurrentAction();
    this.loadResource();
  }

  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Novo';
    } else {
      this.pageTitle = 'Edição';
    }
  }

  protected setCurrentAction() {
    console.log(this.route.snapshot.url[0].path)
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      sobrenome: [null, Validators.required],
      telefone: [null, Validators.required]
    });
  }

  protected loadResource() {

    if (this.currentAction === 'edit') {
      this.loading = true;
      setTimeout(() => {
        this.route.paramMap.pipe(
          switchMap(params => this.resourceService.findById(+params.get('id')))
        )
          .subscribe(
            (resource) => {
              this.resource = resource;
              console.log(this.resource)
              this.resourceForm.patchValue(this.resource);
              this.loading = false;
            },
            (error) => {

              this.router.navigateByUrl('/aluno').then(() =>
                this.messageService.add({
                  severity: 'error',
                  summary: 'Erro ao carregar os dados'
                })
              )
              this.loading = false;
            }
          );
      }, 1000);

    }
  }

  confirm() {
    this.confirmationService.confirm({
      accept: () => {
        this.submitForm()
      },

    });
  }

  submitForm() {


    this.submittingForm = true;


    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }

  }

  protected createResource() {
    const tmp: Aluno = new Aluno();
     Object.assign(tmp, this.resourceForm.value);
     tmp.id = 0; // .NET NÃO ACEITA NULL PARA INT
     console.log(tmp)
   
    this.resourceService.create(tmp).subscribe(
      () => this.actionsForSuccess(tmp),
      error => this.actionsForError(error)
    );
  }

  protected updateResource() {
    let tmp: Aluno = new Aluno();
    Object.assign(tmp, this.resourceForm.value);
    tmp.id = this.resource.id
    console.log(tmp);
    this.resourceService.update(tmp).subscribe(
      () => this.actionsForSuccess(tmp),
      error => this.actionsForError(error)
    );
  }

  protected actionsForSuccess(resource) {
   
    this.router.navigateByUrl('/aluno').then(
      () => this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Solicitação Processada com Sucesso!'
      }));
  }

  protected actionsForError(error) {
    console.log(error)
    const baseComponentPath: string = this.route.parent.snapshot.url[0].path;
    this.submittingForm = false;
    this.router.navigateByUrl(baseComponentPath).then(
      () => this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: error
      }));
  }


}
