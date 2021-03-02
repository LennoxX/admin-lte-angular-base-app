import { PacienteService } from './../../../services/paciente-service.service';
import { BaseListComponent } from '../../../components/base-list/base-list.component';
import { Component } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Paciente } from '../../../models/paciente.model';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css']
})
export class PacienteListComponent extends BaseListComponent<Paciente>{
  loading: boolean = false;

  constructor(protected pacienteService:PacienteService, protected confirmationService: ConfirmationService, protected messageService:MessageService) {
    super(pacienteService, confirmationService, messageService);
  }

  ngOnInit(): void {
    super.ngOnInit()
  }



}
