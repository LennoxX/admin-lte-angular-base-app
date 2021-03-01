import { Injector } from '@angular/core';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BaseResourceService } from './base-resource-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseResourceService<User> {

  constructor(protected injector: Injector) {
    super('auth', injector);
   }
}
