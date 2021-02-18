import { BaseResourceModel } from './base-resource-model.model';

export class Aluno extends BaseResourceModel {
    constructor(
        public nome?: string,
        public sobrenome?: string,
        public telefone?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): Aluno {
        return Object.assign(new Aluno(), jsonData);
    }
}