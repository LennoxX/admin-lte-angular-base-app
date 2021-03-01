import { BaseResourceModel } from './base-resource-model.model';

export class User extends BaseResourceModel {
    constructor(
        public username?: string,
        public password?: string,
        public nivel?: string,
        public imagemPerfil?: string,
        public nome?: string,
        public telefone?: string,
        public email?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): User {
        return Object.assign(new User(), jsonData);
    }
}