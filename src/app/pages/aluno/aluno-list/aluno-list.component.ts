import { AlunoService } from './../../../services/aluno-service.service';
import { BaseListComponent } from './../../../components/base-list/base-list.component';
import { Component } from '@angular/core';
import { Aluno } from 'src/app/models/aluno.model';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { FilterMetadata } from 'primeng/api';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent extends BaseListComponent<Aluno>{
  loading: boolean = false;

  constructor(protected alunoService:AlunoService, protected confirmationService: ConfirmationService, protected messageService:MessageService) {
    super(alunoService, confirmationService, messageService);
  }

  ngOnInit(): void {
    super.ngOnInit()
  }



}
