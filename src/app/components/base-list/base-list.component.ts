import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseResourceService } from 'src/app/services/base-resource-service.service';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.css']
})
export class BaseListComponent<T> implements OnInit {

  resources: T[] = new Array();
  loading: boolean = false;
  constructor(protected resourceService: BaseResourceService<T>, protected confirmationService: ConfirmationService, protected messageService: MessageService) {

  }

  ngOnInit(): void {

    this.getResources();
  }

  protected getResources() {
    this.loading = true;
    this.resourceService.getAll().subscribe(
      pages => {
        this.resources = pages;
        this.loading = false;
      },
      error => {
        this.actionsForError(error);
        this.loading = false;
      }
    );



  }
  protected actionsForError(error: any) {
    if (error.status != 401 && error.status != 403) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Ocorreu um erro ao processar sua solicitação!' + error
      });
    }
  }

  protected actionsForSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Solicitação Processada com Sucesso!'
    });
  }

  public excluir(id: number) {
    this.confirmationService.confirm({
      accept: () => {
        this.resourceService.delete(id).subscribe((res) => {
          this.actionsForSuccess();
          this.getResources();
        })
      },

    });
  }
}
