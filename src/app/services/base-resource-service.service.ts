import { environment } from './../../environments/environment';
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../models/response.model';

export abstract class BaseResourceService<T> {

  protected http: HttpClient;
  protected readonly API_PATH = `${environment.BASE_URL + this.path}`

  constructor(protected path: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    const url = `${this.API_PATH}`;
    return this.http.get(url).pipe(
      map(this.jsonDataToResources)
    );
  }

  findById(id: number): Observable<T> {
    const url = `${this.API_PATH}/${id}`;
    return this.http.get(url).pipe(
      map(this.jsonDataToResource)
    );
  }

  create(resource: T): Observable<T> {
    const url = `${this.API_PATH}`;
    return this.http.post(url, resource).pipe(
      map(this.jsonDataToResource)
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.API_PATH}`;
    return this.http.put(url, resource).pipe(
      map(() => resource)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.API_PATH}/${id}`;
    return this.http.delete(url).pipe(
      map(() => null)
    );
  }

  protected jsonDataToResources(jsonData: T[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(element as T));
    return resources;
  }

  protected jsonDataToResource(jsonData: T): T {
    return jsonData as T;
  }
  /* 
    protected jsonDataPagesToResources(jsonData: Response<Page<T>>): Page<T> {
      const resources = Object.assign(new Response(), jsonData.data);
      return resources;
    } */

  protected handleError(error: Response<T[]>) {
    throw (error);
  }

}