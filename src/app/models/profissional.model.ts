import { Usuario } from 'src/app/models/usuario.model';
import { BaseResourceModel } from './base-resource-model.model';

export class Profissional extends BaseResourceModel {
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

    static fromJson(jsonData: any): Profissional {
        return Object.assign(new Profissional(), jsonData);
    }
}