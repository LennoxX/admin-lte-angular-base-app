import { formatDate, TitleCasePipe } from "@angular/common";
import { Component, OnInit, AfterContentChecked, Injector } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { switchMap } from "rxjs/operators";
import { Paciente } from "../../../models/paciente.model";
import { PacienteService } from "../../../services/paciente-service.service";
import * as moment from 'moment';
import { BaseFormComponent } from "src/app/components/base-form/base-form.component";


@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css'],
  providers: [TitleCasePipe]
})
export class PacienteFormComponent extends BaseFormComponent<Paciente> {
 
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(private titleCasePipe: TitleCasePipe, private injector: Injector, protected resourceService: PacienteService, protected messageService: MessageService, protected confirmationService: ConfirmationService) {
    super(resourceService, messageService, confirmationService);
    this.formBuilder = this.injector.get(FormBuilder);
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
  }


  ngOnInit(): void {
    super.ngOnInit();
  }
  ngAfterContentChecked(): void {
    super.ngAfterContentChecked();
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
    }
  }

  protected createResource() {
    const tmp: Paciente = new Paciente();
    Object.assign(tmp, this.resourceForm.value);
    tmp.nome = this.titleCasePipe.transform(tmp.nome);
    this.resourceService.create(tmp).subscribe(
      () => this.actionsForSuccess(),
      error => this.actionsForError(error)
    );
  }

  protected updateResource() {
    let tmp: Paciente = new Paciente();
    Object.assign(tmp, this.resourceForm.value);
    tmp.id = this.resource.id
    this.resourceService.update(tmp).subscribe(
      () => this.actionsForSuccess(),
      error => this.actionsForError(error)
    );
  }
}
