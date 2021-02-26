import { Injectable, Injector } from '@angular/core';
import { Paciente } from '../models/paciente.model';
import { BaseResourceService } from './base-resource-service.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends BaseResourceService<Paciente> {

  constructor(protected injector: Injector) {
    super('pacientes', injector);
   }
}
