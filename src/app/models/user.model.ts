import { NivelEnum } from '../enums/NivelEnum.model';
import { BaseResourceModel } from './base-resource-model.model';

export class Usuario extends BaseResourceModel {
    constructor(
        public username?: string,
        public password?: string,
        public nivel?: NivelEnum,
        public imagemPerfil?: string,
        public ativo?: boolean
    ) {
        super();
    }

    static fromJson(jsonData: any): Usuario {
        return Object.assign(new Usuario(), jsonData);
    }
}