import { BaseResourceModel } from './base-resource-model.model';

export class Usuario extends BaseResourceModel {
    constructor(
        public username?: string,
        public password?: string,
        public nivel?: string,
        public imagemPerfil?: string,
        public ativo?: boolean
    ) {
        super();
    }

    static fromJson(jsonData: any): Usuario {
        return Object.assign(new Usuario(), jsonData);
    }
}