import { BaseResourceModel } from './base-resource-model.model';
import { Usuario } from './user.model';

export class Pessoa extends BaseResourceModel {
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

    static fromJson(jsonData: any): Pessoa {
        return Object.assign(new Pessoa(), jsonData);
    }
}