import { Injectable, Injector } from '@angular/core';
import { Aluno } from '../models/aluno.model';
import { BaseResourceService } from './base-resource-service.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoService extends BaseResourceService<Aluno> {

  constructor(protected injector: Injector) {
    super('categorias', injector);
   }
}
