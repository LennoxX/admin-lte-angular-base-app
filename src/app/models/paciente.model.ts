import { BaseResourceModel } from './base-resource-model.model';
import { Usuario } from './user.model';

export class Paciente extends BaseResourceModel {
    constructor(
        public nome?: string,
        public email?: string,
        public telefone?: string,
        public dataNascimento?: Date,
        public sexo?: string,
        public usuario?: Usuario
    ) {
        super();
        usuario = new Usuario()
    }

    static fromJson(jsonData: any): Paciente {
        return Object.assign(new Paciente(), jsonData);
    }
}