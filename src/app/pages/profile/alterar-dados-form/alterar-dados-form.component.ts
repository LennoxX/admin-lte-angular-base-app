import { ProfileService } from './../../../services/profile.service';
import { ElementRef, Injector, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from 'src/app/models/pessoa.model.ts';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Usuario } from 'src/app/models/user.model';

@Component({
  selector: 'app-alterar-dados-form',
  templateUrl: './alterar-dados-form.component.html',
  styleUrls: ['./alterar-dados-form.component.css']
})


export class AlterarDadosFormComponent implements OnInit {
  @ViewChild('FileSelectInputDialog') FileSelectInputDialog: ElementRef;

  resource: Pessoa;
  resourceForm: FormGroup;
  currentAction: string;
  pageTitle: string;
  loading: boolean = false;
  submittingForm = false;
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
  constructor(private injector: Injector,
    private profileService: ProfileService,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,) {
    this.formBuilder = this.injector.get(FormBuilder);
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
  }

  public OpenAddFilesDialog() {
    const e: HTMLElement = this.FileSelectInputDialog.nativeElement;
    e.click();
  }

  ngOnInit(): void {
    this.buildResourceForm();
    this.loadResource();
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
      return true;
    }
    else {
      return false;
    }
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      sexo: [null, Validators.required],
      telefone: [],
      imagemPerfil: [],
      email: [],
      dataNascimento: [null, Validators.required]
    });
  }

  protected loadResource() {
    this.loading = true;
    this.profileService.getUser().subscribe((resource) => {
      this.resource = resource
      let tmpDate = (moment(resource.dataNascimento, 'YYYY-MM-DD').format('yyyy-MM-DD'))
      resource.dataNascimento = null;
      this.resourceForm.patchValue(resource);
      this.resourceForm.controls['dataNascimento'].setValue(tmpDate)
      this.loading = false;
    }, () => {
      this.loading = false;
    })
  }

  confirm() {
    if (this.resourceForm.valid) {
      this.confirmationService.confirm({
        accept: () => {
          this.updateResource()
        },
      });
    }
  }

  onFileSelected(event) {
    let file = event.target.files[0];
    if (this.validateFile(file.name)) {
      if (file != null) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.resource.usuario.imagemPerfil = reader.result.toString()
        };
      }

    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção!',
        detail: 'Por favor, escolha um formato de imagem válido!'
      });
    }
  }

  protected updateResource() {

    let tmp: Pessoa = new Pessoa();
    tmp.usuario = new Usuario();
    Object.assign(tmp, this.resourceForm.value);
    console.log("1", tmp.usuario)
    console.log("2", this.resource)
    tmp.id = this.resource.id;
    tmp.usuario.imagemPerfil = this.resource.usuario.imagemPerfil;
    this.profileService.update(tmp).subscribe(
      () => this.actionsForSuccess(),
      error => this.actionsForError(error)
    );
  }

  protected actionsForSuccess() {
    this.router.navigateByUrl(`/profile`).then(
      () => this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Solicitação Processada com Sucesso!'
      }));
  }

  protected actionsForError(error) {
    console.log(error)
    this.submittingForm = false;
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: error.message
    });

  }
}
