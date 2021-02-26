import { formatDate, TitleCasePipe } from "@angular/common";
import { Component, OnInit, AfterContentChecked, Injector } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { switchMap } from "rxjs/operators";
import { Paciente } from "../../../models/paciente.model";
import { PacienteService } from "../../../services/paciente-service.service";
import * as moment from 'moment';


@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css'],
  providers: [TitleCasePipe]
})
export class PacienteFormComponent implements OnInit, AfterContentChecked {
  resource: Paciente = new Paciente();
  resourceForm: FormGroup;
  currentAction: string;
  pageTitle: string;
  loading: boolean = false;
  submittingForm = false;
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(private titleCasePipe: TitleCasePipe, private injector: Injector, private resourceService: PacienteService, private messageService: MessageService, private confirmationService: ConfirmationService) {
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
      sexo: [null, Validators.required],
      telefone: [],
      email: [],
      dataNascimento: [null, Validators.required]
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
              this.resource = resource
              let tmpDate = (moment(resource.dataNascimento, 'YYYY-MM-DD').format('yyyy-MM-DD'))
              resource.dataNascimento = null;
              this.resourceForm.patchValue(resource);
              this.resourceForm.controls['dataNascimento'].setValue(tmpDate)

              this.loading = false;
            },
            (error) => {
              if (error.status != 404) {
                this.router.navigateByUrl('/paciente').then(() =>
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao carregar os dados'
                  })
                )
                this.loading = false;
              }

            }
          );
      }, 1000);
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

  protected createResource() {
    const tmp: Paciente = new Paciente();
    Object.assign(tmp, this.resourceForm.value);

    tmp.nome = this.titleCasePipe.transform(tmp.nome);

    this.resourceService.create(tmp).subscribe(
      () => this.actionsForSuccess(tmp),
      error => this.actionsForError(error)
    );
  }

  protected updateResource() {
    let tmp: Paciente = new Paciente();
    Object.assign(tmp, this.resourceForm.value);
    tmp.id = this.resource.id
    console.log(tmp)

    this.resourceService.update(tmp).subscribe(
      () => this.actionsForSuccess(tmp),
      error => this.actionsForError(error)
    );
  }

  protected actionsForSuccess(resource) {

    this.router.navigateByUrl('/paciente').then(
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
    /*  this.router.navigateByUrl(baseComponentPath).then(
       () => this.messageService.add({
         severity: 'error',
         summary: 'Erro',
         detail: error
       })); */
  }


}
