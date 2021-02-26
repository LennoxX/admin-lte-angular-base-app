import { BaseResourceModel } from './base-resource-model.model';

export class Paciente extends BaseResourceModel {
    constructor(
        public nome?: string,
        public email?: string,
        public telefone?: string,
        public dataNascimento?: Date,
        public sexo?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): Paciente {
        return Object.assign(new Paciente(), jsonData);
    }
}