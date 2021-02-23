import { BaseResourceModel } from './base-resource-model.model';

export class User extends BaseResourceModel {
    constructor(
        public username?: string,
        public password?: string,
        public nivel?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): User {
        return Object.assign(new User(), jsonData);
    }
}